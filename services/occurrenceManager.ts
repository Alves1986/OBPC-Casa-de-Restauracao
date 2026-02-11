
import { RRule, rrulestr } from 'rrule';

/**
 * Motor de Sincronização de Ocorrências (OccurrenceManager)
 * 
 * Por que esta classe existe?
 * Calcular recorrências (RRULE) em tempo real no cliente é caro em termos de CPU.
 * Esta lógica roda no servidor para "materializar" as datas no banco.
 */
export class OccurrenceManager {
  /**
   * Sincroniza as ocorrências de um evento para os próximos 12 meses.
   */
  static async syncEvent(eventId: string, prisma: any) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { exceptions: true }
    });

    if (!event) return;

    // 1. Limpar ocorrências futuras para evitar duplicatas
    await prisma.eventOccurrence.deleteMany({
      where: { 
        eventId,
        occurrenceDate: { gte: new Date() }
      }
    });

    // 2. Se não for recorrente, cria apenas uma ocorrência
    if (!event.isRecurring || !event.rrule) {
      await prisma.eventOccurrence.create({
        data: {
          eventId,
          occurrenceDate: this.normalizeDate(event.startTime),
          startTime: event.startTime,
          endTime: event.endTime
        }
      });
      return;
    }

    // 3. Gerar datas via RRULE
    const rule = rrulestr(event.rrule, { dtstart: event.startTime });
    const now = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);

    const dates = rule.between(now, oneYearFromNow, true);

    // 4. Mapear ocorrências respeitando exceções
    const occurrences = dates.map(date => {
      const exception = event.exceptions.find(ex => 
        this.normalizeDate(ex.originalDate).getTime() === this.normalizeDate(date).getTime()
      );

      if (exception?.isCancelled) return null;

      return {
        eventId,
        occurrenceDate: this.normalizeDate(date),
        startTime: exception?.rescheduledTo || date,
        // Mantém a duração original se não houver nova data de fim na exceção
        endTime: new Date(date.getTime() + (event.endTime.getTime() - event.startTime.getTime()))
      };
    }).filter(Boolean);

    // 5. Batch insert para performance
    await prisma.eventOccurrence.createMany({ data: occurrences });
  }

  private static normalizeDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}

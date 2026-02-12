
import { rrulestr } from 'rrule';
import { ChurchEvent, EventOccurrence, EventException } from '../types';

export class OccurrenceManager {
  /**
   * Expande eventos (recorrentes ou não) em ocorrências reais dentro de um intervalo.
   */
  static expand(
    events: ChurchEvent[], 
    exceptions: EventException[], 
    startRange: Date, 
    endRange: Date
  ): EventOccurrence[] {
    const occurrences: EventOccurrence[] = [];

    events.forEach(event => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      const eventDuration = eventEnd.getTime() - eventStart.getTime();
      
      const eventExceptions = exceptions.filter(ex => ex.event_id === event.id);

      if (event.is_recurring && event.rrule) {
        try {
          const rule = rrulestr(event.rrule, { dtstart: eventStart });
          const dates = rule.between(startRange, endRange, true);

          dates.forEach(occDate => {
            // Verificar se existe uma exceção para esta data específica
            const exception = eventExceptions.find(ex => 
              this.isSameDay(new Date(ex.original_date), occDate)
            );

            if (exception?.is_cancelled) return;

            const finalStart = exception?.rescheduled_to 
              ? new Date(exception.rescheduled_to) 
              : occDate;
            
            occurrences.push({
              id: event.id,
              title: event.title,
              description: event.description,
              occurrence_date: occDate,
              start_time: finalStart,
              end_time: new Date(finalStart.getTime() + eventDuration),
              ministry_id: event.ministry_id,
              color: event.color
            });
          });
        } catch (e) {
          console.error(`Erro ao processar RRULE para evento: ${event.title}`, e);
        }
      } else {
        // Evento único
        if (eventStart >= startRange && eventStart <= endRange) {
          occurrences.push({
            id: event.id,
            title: event.title,
            description: event.description,
            occurrence_date: eventStart,
            start_time: eventStart,
            end_time: eventEnd,
            ministry_id: event.ministry_id,
            color: event.color
          });
        }
      }
    });

    return occurrences.sort((a, b) => a.start_time.getTime() - b.start_time.getTime());
  }

  private static isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    );
  }
}

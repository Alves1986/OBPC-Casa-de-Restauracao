
export enum MinistryCategory {
  GENERAL = 'Geral',
  YOUTH = 'Jovens (JUBRAC)',
  KIDS = 'Infantil (UFEBRAC)',
  LEADERS = 'Liderança',
}

export interface Ministry {
  id: string;
  name: string;
  category: MinistryCategory;
  color: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  rrule?: string;
  ministryId: string;
}

export interface EventInstance extends ChurchEvent {
  occurrenceDate: Date;
}

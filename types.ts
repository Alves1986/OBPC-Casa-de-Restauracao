
export enum MinistryCategory {
  GENERAL = 'Geral',
  YOUTH = 'Jovens (JUBRAC)',
  KIDS = 'Infantil (UFEBRAC)',
  LEADERS = 'Liderança',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
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
  description: string | null;
  start_date: string; // ISO String
  end_date: string;   // ISO String
  is_recurring: boolean;
  rrule: string | null;
  ministry_id: string;
  color: string | null;
  status: EventStatus;
  created_at: string;
}

export interface EventException {
  id: string;
  event_id: string;
  original_date: string;
  rescheduled_to: string | null;
  is_cancelled: boolean;
}

export interface EventOccurrence {
  id: string; // ID do evento original
  title: string;
  description: string | null;
  occurrence_date: Date;
  start_time: Date;
  end_time: Date;
  ministry_id: string;
  color: string | null;
}

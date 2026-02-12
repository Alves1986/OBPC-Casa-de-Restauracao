
import { Ministry, MinistryCategory, ChurchEvent, EventStatus } from '../types';

export const ministries: Ministry[] = [
  { id: 'm1', name: 'Geral', category: MinistryCategory.GENERAL, color: '#002B5B' },
  { id: 'm2', name: 'JUBRAC', category: MinistryCategory.YOUTH, color: '#FF5733' },
  { id: 'm3', name: 'Infantil', category: MinistryCategory.KIDS, color: '#33FF57' },
];

export const mockEvents: ChurchEvent[] = [
  {
    id: 'e1',
    title: 'Culto da Família',
    description: 'Um tempo de celebração e palavra para toda a família.',
    // Correcting field names and types according to ChurchEvent interface
    start_date: new Date(2024, 0, 1, 19, 0).toISOString(),
    end_date: new Date(2024, 0, 1, 21, 0).toISOString(),
    is_recurring: true,
    rrule: 'FREQ=WEEKLY;BYDAY=SU;INTERVAL=1',
    ministry_id: 'm1',
    color: null,
    status: EventStatus.PUBLISHED,
    created_at: new Date(2024, 0, 1).toISOString(),
  },
  {
    id: 'e2',
    title: 'Culto de Ensino',
    description: 'Aprofundamento na palavra de Deus.',
    // Correcting field names and types according to ChurchEvent interface
    start_date: new Date(2024, 0, 1, 20, 0).toISOString(),
    end_date: new Date(2024, 0, 1, 22, 0).toISOString(),
    is_recurring: true,
    rrule: 'FREQ=WEEKLY;BYDAY=WE;INTERVAL=1',
    ministry_id: 'm1',
    color: null,
    status: EventStatus.PUBLISHED,
    created_at: new Date(2024, 0, 1).toISOString(),
  },
  {
    id: 'e3',
    title: 'Encontro JUBRAC',
    description: 'Juventude unida para o reino.',
    // Correcting field names and types according to ChurchEvent interface
    start_date: new Date(2024, 0, 1, 19, 30).toISOString(),
    end_date: new Date(2024, 0, 1, 21, 30).toISOString(),
    is_recurring: true,
    rrule: 'FREQ=WEEKLY;BYDAY=SA;INTERVAL=1',
    ministry_id: 'm2',
    color: null,
    status: EventStatus.PUBLISHED,
    created_at: new Date(2024, 0, 1).toISOString(),
  },
];

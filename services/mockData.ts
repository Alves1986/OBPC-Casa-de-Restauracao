
import { Ministry, MinistryCategory, ChurchEvent } from '../types';

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
    startTime: new Date(2024, 0, 1, 19, 0),
    endTime: new Date(2024, 0, 1, 21, 0),
    isRecurring: true,
    rrule: 'FREQ=WEEKLY;BYDAY=SU;INTERVAL=1',
    ministryId: 'm1',
  },
  {
    id: 'e2',
    title: 'Culto de Ensino',
    description: 'Aprofundamento na palavra de Deus.',
    startTime: new Date(2024, 0, 1, 20, 0),
    endTime: new Date(2024, 0, 1, 22, 0),
    isRecurring: true,
    rrule: 'FREQ=WEEKLY;BYDAY=WE;INTERVAL=1',
    ministryId: 'm1',
  },
  {
    id: 'e3',
    title: 'Encontro JUBRAC',
    description: 'Juventude unida para o reino.',
    startTime: new Date(2024, 0, 1, 19, 30),
    endTime: new Date(2024, 0, 1, 21, 30),
    isRecurring: true,
    rrule: 'FREQ=WEEKLY;BYDAY=SA;INTERVAL=1',
    ministryId: 'm2',
  },
];

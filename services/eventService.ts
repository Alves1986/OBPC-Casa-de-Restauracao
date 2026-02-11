
import { RRule, rrulestr } from 'rrule';
import { ChurchEvent, EventInstance } from '../types';

export const expandEvents = (events: ChurchEvent[], startRange: Date, endRange: Date): EventInstance[] => {
  const instances: EventInstance[] = [];

  events.forEach(event => {
    if (event.isRecurring && event.rrule) {
      try {
        const rule = rrulestr(event.rrule, { dtstart: event.startTime });
        const occurrences = rule.between(startRange, endRange, true);

        occurrences.forEach(occ => {
          instances.push({
            ...event,
            occurrenceDate: occ,
          });
        });
      } catch (e) {
        console.error('Error parsing RRULE for event:', event.title, e);
      }
    } else {
      if (event.startTime >= startRange && event.startTime <= endRange) {
        instances.push({
          ...event,
          occurrenceDate: event.startTime,
        });
      }
    }
  });

  return instances.sort((a, b) => a.occurrenceDate.getTime() - b.occurrenceDate.getTime());
};

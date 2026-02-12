
import { useState, useEffect, useMemo } from 'react';
import { eventService } from '../services/eventService';
import { eventExceptionService } from '../services/eventExceptionService';
import { ministryService } from '../services/ministryService';
import { OccurrenceManager } from '../services/occurrenceManager';
import { EventOccurrence, Ministry, ChurchEvent, EventException } from '../types';

export function useEvents(startRange: Date, endRange: Date) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [exceptions, setExceptions] = useState<EventException[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [evs, exs, mins] = await Promise.all([
          eventService.getPublishedEvents(),
          eventExceptionService.getAll(),
          ministryService.getAll()
        ]);
        setEvents(evs);
        setExceptions(exs);
        setMinistries(mins);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const occurrences = useMemo(() => {
    if (loading || error) return [];
    return OccurrenceManager.expand(events, exceptions, startRange, endRange);
  }, [events, exceptions, loading, error, startRange, endRange]);

  return {
    occurrences,
    ministries,
    loading,
    error
  };
}

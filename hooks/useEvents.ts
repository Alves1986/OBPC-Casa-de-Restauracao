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
        const [evsRes, exsRes, minsRes] = await Promise.all([
          eventService.getPublishedEvents(),
          eventExceptionService.getAll(),
          ministryService.getAll()
        ]);

        setEvents(evsRes);
        
        // Em vez de throw, apenas registramos o erro se houver
        if (exsRes.error) {
          console.warn("Aviso: Falha ao carregar exceções:", exsRes.error);
        }
        if (minsRes.error) {
          console.warn("Aviso: Falha ao carregar ministérios:", minsRes.error);
        }

        setExceptions(exsRes.data || []);
        setMinistries(minsRes.data || []);
      } catch (err) {
        console.error("Erro no hook useEvents:", err);
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
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { EventException } from '../types';

export const eventExceptionService = {
  async getByEvent(eventId: string): Promise<{ data: EventException[]; error: any }> {
    if (!isSupabaseConfigured || !supabase) {
      return { data: [], error: 'Configuração do Supabase ausente' };
    }

    try {
      const { data, error } = await supabase
        .from('event_exceptions')
        .select('*')
        .eq('event_id', eventId);

      if (error) return { data: [], error };
      return { data: data || [], error: null };
    } catch (err) {
      return { data: [], error: err };
    }
  },

  async getAll(): Promise<{ data: EventException[]; error: any }> {
    if (!isSupabaseConfigured || !supabase) {
      return { data: [], error: 'Configuração do Supabase ausente' };
    }

    try {
      const { data, error } = await supabase
        .from('event_exceptions')
        .select('*');

      if (error) return { data: [], error };
      return { data: data || [], error: null };
    } catch (err) {
      return { data: [], error: err };
    }
  }
};
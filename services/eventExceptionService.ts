
import { supabase } from '../lib/supabase';
import { EventException } from '../types';

export const eventExceptionService = {
  async getByEvent(eventId: string): Promise<EventException[]> {
    const { data, error } = await supabase
      .from('event_exceptions')
      .select('*')
      .eq('event_id', eventId);

    if (error) throw error;
    return data || [];
  },

  async getAll(): Promise<EventException[]> {
    const { data, error } = await supabase
      .from('event_exceptions')
      .select('*');

    if (error) throw error;
    return data || [];
  }
};

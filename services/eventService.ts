
import { supabase } from '../lib/supabase';
import { ChurchEvent, EventStatus } from '../types';

export const eventService = {
  async getPublishedEvents(): Promise<ChurchEvent[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', EventStatus.PUBLISHED);

    if (error) {
      console.error('Erro ao buscar eventos publicados:', error);
      return [];
    }
    return data || [];
  },

  async getAllEvents(): Promise<ChurchEvent[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) throw error;
    return data || [];
  },

  async createEvent(event: Omit<ChurchEvent, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEvent(id: string, updates: Partial<ChurchEvent>) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

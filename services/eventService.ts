import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ChurchEvent, EventStatus } from '../types';

export const eventService = {
  async getPublishedEvents(): Promise<ChurchEvent[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', EventStatus.PUBLISHED);

      if (error) {
        console.error('Erro Supabase:', error);
        return [];
      }
      return data || [];
    } catch (e) {
      console.error('Falha na requisição de eventos:', e);
      return [];
    }
  },

  async getAllEvents(): Promise<ChurchEvent[]> {
    if (!isSupabaseConfigured || !supabase) return [];
    
    const { data, error } = await supabase.from('events').select('*');
    if (error) return [];
    return data || [];
  },

  async createEvent(event: Omit<ChurchEvent, 'id' | 'created_at'>) {
    if (!isSupabaseConfigured || !supabase) return { error: 'Supabase não configurado' };
    
    const { data, error } = await supabase.from('events').insert(event).select().single();
    if (error) return { error };
    return { data };
  },

  async updateEvent(id: string, updates: Partial<ChurchEvent>) {
    if (!isSupabaseConfigured || !supabase) return { error: 'Supabase não configurado' };
    
    const { data, error } = await supabase.from('events').update(updates).eq('id', id).select().single();
    if (error) return { error };
    return { data };
  },

  async deleteEvent(id: string) {
    if (!isSupabaseConfigured || !supabase) return { error: 'Supabase não configurado' };
    
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) return { error };
    return { success: true };
  }
};
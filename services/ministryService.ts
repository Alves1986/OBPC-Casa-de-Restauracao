import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Ministry } from '../types';

export const ministryService = {
  async getAll(): Promise<{ data: Ministry[]; error: any }> {
    if (!isSupabaseConfigured || !supabase) {
      return { data: [], error: 'Configuração do Supabase ausente' };
    }

    try {
      const { data, error } = await supabase
        .from('ministries')
        .select('*');

      if (error) return { data: [], error };
      return { data: data || [], error: null };
    } catch (err) {
      return { data: [], error: err };
    }
  }
};
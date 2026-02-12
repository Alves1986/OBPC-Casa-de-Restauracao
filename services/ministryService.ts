
import { supabase } from '../lib/supabase';
import { Ministry } from '../types';

export const ministryService = {
  async getAll(): Promise<Ministry[]> {
    const { data, error } = await supabase
      .from('ministries')
      .select('*');

    if (error) throw error;
    return data || [];
  }
};

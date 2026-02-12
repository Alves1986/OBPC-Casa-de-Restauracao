
import { createClient } from '@supabase/supabase-js';

// Fixed: Using process.env instead of import.meta.env to resolve TypeScript errors and match the environment's variable access pattern.
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

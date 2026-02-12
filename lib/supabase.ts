import { createClient } from '@supabase/supabase-js';

// Fixed: Replaced import.meta.env with process.env to resolve "Property 'env' does not exist on type 'ImportMeta'" errors.
// The execution environment is configured to provide environment variables via process.env.
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

// Auditoria de Inicialização em Console
/**
 * Correção Crítica: O erro "Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')" 
 * ocorria porque o objeto 'env' pode não estar presente no 'import.meta' em certos ambientes.
 * Usamos um fallback para um objeto vazio para garantir que a atribuição de constantes não cause crash.
 */
const meta = import.meta as any;
const env = meta.env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    "ERRO CRÍTICO: Variáveis de ambiente do Supabase não encontradas. " +
    "Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no seu arquivo .env ou dashboard da Vercel."
  );
}

/**
 * Inicializa o cliente apenas se as variáveis obrigatórias existirem.
 * Caso contrário, exporta null para que os services operem em modo degradado (retornando arrays vazios).
 * Isso impede o erro fatal "supabaseUrl is required" do SDK do Supabase durante a avaliação do módulo.
 */
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : null;
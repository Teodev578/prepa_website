import { createClient } from '@supabase/supabase-js';

// Cette fonction crée une connexion sécurisée à ta base de données Supabase
export const supabaseServer = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement Supabase sont manquantes.");
  }

  return createClient(supabaseUrl, supabaseKey);
};
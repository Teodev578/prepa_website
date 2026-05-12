// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("DEBUG SUPABASE CONFIG:", { url, key: key ? "OK (présente)" : "MANQUANTE" });

  if (!url || !key) {
    throw new Error("Supabase URL ou Key manquante dans les variables d'environnement !");
  }

  return createBrowserClient(url, key);
}
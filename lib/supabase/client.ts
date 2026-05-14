// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qhvkomzmofxecbdtmdgv.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_AyBahLfactiSbPtzKflMCg_x0dXEfu8';

  if (!url || !key) {
    throw new Error("Supabase URL ou Key manquante dans les variables d'environnement !");
  }

  return createBrowserClient(url, key);
}
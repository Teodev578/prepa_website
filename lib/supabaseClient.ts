import { createClient } from '@supabase/supabase-js';

// Tu trouveras ces clés dans Supabase > Project Settings > API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qhvkomzmofxecbdtmdgv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_AyBahLfactiSbPtzKflMCg_x0dXEfu8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
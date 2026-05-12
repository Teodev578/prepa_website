import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qhvkomzmofxecbdtmdgv.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_AyBahLfactiSbPtzKflMCg_x0dXEfu8';
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Check for auth token in cookies
  const authToken = req.cookies.get('sb-auth-token')?.value;
  
  // Si l'utilisateur n'est pas connecté et essaie d'accéder à /terminal-hq-77
  if (!authToken && req.nextUrl.pathname.startsWith('/terminal-hq-77')) {
    // On le redirige vers la page de login
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Configuration pour spécifier quelles routes sont protégées
export const config = {
  matcher: ['/terminal-hq-77/:path*'],
};
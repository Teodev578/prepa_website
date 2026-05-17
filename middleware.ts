import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // ✅ SÉCURITÉ : On récupère l'utilisateur complet via les cookies de session.
  // Cette méthode examine les cookies d'authentification envoyés par le navigateur.
  const { data: { user } } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === '/login';
  const isAuthApi = request.nextUrl.pathname.startsWith('/api/auth');

  // Si on cible une page protégée (ex: /terminal-hq-77)
  if (!isLoginPage && !isAuthApi) {
    
    // 1. L'utilisateur n'est pas connecté du tout
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // 2. L'utilisateur est connecté MAIS son email n'est pas confirmé
    // Dans ce cas, on bloque l'accès aux pages protégées et on redirige vers /login.
    if (!user.email_confirmed_at) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      // On passe un paramètre dans l'URL pour afficher un message personnalisé sur la page login
      url.searchParams.set('error', 'email_unverified');
      
      // Optionnel : On force la déconnexion côté serveur pour nettoyer ses cookies
      await supabase.auth.signOut();
      
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
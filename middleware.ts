import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Génère un nonce cryptographique unique par requête */
function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}

/** Construit la CSP avec nonce — unsafe-eval seulement en dev (requis par React DevTools) */
function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development';
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co https://api.resend.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

export async function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const csp = buildCsp(nonce);

  // Propager le nonce dans les headers de la requête (lisible par les Server Components via next/headers)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  let response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Appliquer la CSP dynamique sur la réponse
  response.headers.set('Content-Security-Policy', csp);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: requestHeaders } });
          response.headers.set('Content-Security-Policy', csp);
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: requestHeaders } });
          response.headers.set('Content-Security-Policy', csp);
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // 🛡️ Grâce au nouveau matcher, on SAIT que si on est ici, on est forcément sur une route admin.
  // Plus besoin de faire de vérification de chaîne de caractères lente sur le pathname.
  const { data: { user } } = await supabase.auth.getUser();

  // 1. L'utilisateur n'est pas connecté du tout
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. L'utilisateur est connecté mais son email n'est pas validé
  if (!user.email_confirmed_at) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('error', 'email_unverified');
    await supabase.auth.signOut();
    return NextResponse.redirect(url);
  }

  // 3. L'utilisateur est-il bien enregistré dans la table admin_users ?
  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (error || !adminUser) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('error', 'unauthorized_role');
    await supabase.auth.signOut(); 
    return NextResponse.redirect(url);
  }

  return response;
}

// 🛠️ L'OPTIMISATION DU MATCHER : On ne cible QUE le dossier d'administration
export const config = {
  matcher: [
    /*
     * Déclenche le middleware uniquement pour :
     * - Ton dossier secret d'administration /terminal-hq-77
     * - Tout ce qui commence par /admin
     * Cela évite de ralentir l'accès au portfolio, contact, et à la page d'accueil.
     */
    '/terminal-hq-77/:path*',
    '/admin/:path*',
  ],
};
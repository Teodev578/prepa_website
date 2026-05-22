import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
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
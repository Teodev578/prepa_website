import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Utilisation des variables d'environnement (similaire à la route notify)
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
    try {
        // Optionnel : sécurisation basique via un secret si on l'appelle depuis GitHub Actions ou Vercel Cron
        const authHeader = request.headers.get('authorization');
        const cronsSecret = process.env.CRON_SECRET;
        
        // Si CRON_SECRET est défini dans les variables d'environnement, on vérifie l'autorisation
        if (cronsSecret && authHeader !== `Bearer ${cronsSecret}`) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Requête légère pour réveiller la base de données
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('id')
            .limit(1);

        if (error) {
            console.error("Erreur lors du ping de la base de données:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, timestamp: new Date().toISOString() }, { status: 200 });

    } catch (error: any) {
        console.error("Erreur serveur lors du ping :", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

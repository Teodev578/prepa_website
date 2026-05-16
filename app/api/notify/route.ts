import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// On utilise le client Supabase standard pour le backend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clientEmail, formData, profile } = body;

        // 1. Récupérer la liste des emails actifs dans Supabase
        const { data: emailsData, error } = await supabase
            .from('notification_emails')
            .select('email')
            .eq('is_active', true);

        if (error || !emailsData || emailsData.length === 0) {
            return NextResponse.json({ message: "Aucun email configuré pour les notifications." }, { status: 200 });
        }

        // Extraire juste un tableau de chaînes de caractères ['email1@.com', 'email2@.com']
        const toEmails = emailsData.map(record => record.email);

        // 2. Construire l'email (Simple et pro)
        const emailHtml = `
            <h2>🚨 NOUVELLE DEMANDE DE DEVIS</h2>
            <p><strong>Profil :</strong> ${profile}</p>
            <p><strong>Email de contact :</strong> ${clientEmail}</p>
            <br/>
            <h3>Données saisies :</h3>
            <ul>
                ${Object.entries(formData).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
            </ul>
            <br/>
            <p><a href="https://ton-site.com/admin">Connectez-vous au panel admin pour le traiter.</a></p>
        `;

        // 3. Envoyer l'email via Resend
        await resend.emails.send({
            from: 'Notification Bot <onboarding@resend.dev>', // Modifie avec ton domaine vérifié plus tard
            to: toEmails,
            subject: `Nouveau devis reçu - ${clientEmail}`,
            html: emailHtml,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Erreur d'envoi d'email:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
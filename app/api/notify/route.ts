import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Variables serveur-only (sans NEXT_PUBLIC_ — jamais exposées au navigateur)
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction de nettoyage simple pour éviter les injections HTML
function escapeHtml(str: string): string {
    if (typeof str !== 'string') return String(str);
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    const allowedOrigins = [
        process.env.NEXT_PUBLIC_SITE_URL || '',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ].filter(Boolean);
    const isAllowedOrigin = allowedOrigins.some(o => origin.startsWith(o.replace(/\/$/, '')));

    if (!isAllowedOrigin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const notifySecret = request.headers.get('x-notify-secret');
    const expectedSecret = process.env.NOTIFY_API_SECRET;

    if (expectedSecret && notifySecret !== expectedSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 'unknown';

    const g = global as unknown as { _rateLimitNotify?: Map<string, number[]> };
    const rateLimitMap: Map<string, number[]> = g._rateLimitNotify ||= new Map();
    const now = Date.now();
    const windowMs = 60_000;
    const maxRequests = 5;

    const timestamps = rateLimitMap.get(ip) || [];
    const recent = timestamps.filter((t: number) => now - t < windowMs);
    if (recent.length >= maxRequests) {
        return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }
    recent.push(now);
    rateLimitMap.set(ip, recent);

    if (recent.length > 20) rateLimitMap.delete(ip);

    try {
        const body = await request.json();
        const { clientEmail, formData, profile } = body;

        if (!clientEmail || typeof clientEmail !== 'string' || !formData || typeof formData !== 'object') {
            return NextResponse.json({ error: "Données invalides." }, { status: 400 });
        }

        // 1. Récupérer la liste des emails actifs dans Supabase
        const { data: emailsData, error } = await supabase
            .from('notification_emails')
            .select('email')
            .eq('is_active', true);

        if (error) {
            console.error("Erreur lors de la récupération des emails de notification depuis Supabase:", error);
            return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
        }

        if (!emailsData || emailsData.length === 0) {
            console.log("Aucun email configuré ou actif dans 'notification_emails'. Envoi annulé.");
            return NextResponse.json({ message: "Aucun email configuré pour les notifications." }, { status: 200 });
        }

        // Extraire juste un tableau de chaînes de caractères ['email1@.com', 'email2@.com']
        const toEmails = emailsData.map(record => record.email);
        console.log("Envoi de la notification aux emails suivants :", toEmails);

        // 2. Construire l'email avec un design premium (Aesthetics: Bordeaux Accent, Technical Grid)
        const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f7f5f6;
      color: #201c1d;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #f7f5f6;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5e5;
      padding: 40px;
      border-radius: 2px;
    }
    .header {
      border-bottom: 2px solid #9B2C2C;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .label {
      font-family: "Courier New", Courier, monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #9B2C2C;
      font-weight: bold;
      display: block;
      margin-bottom: 6px;
    }
    .title {
      font-size: 26px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      margin: 0;
      color: #201c1d;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    }
    .meta-table td {
      padding: 14px;
      border: 1px solid #e5e5e5;
      font-size: 14px;
    }
    .meta-table td.label-cell {
      background-color: #f2f2f2;
      font-weight: bold;
      width: 35%;
      font-family: "Courier New", Courier, monospace;
      text-transform: uppercase;
      font-size: 11px;
      color: #666666;
      letter-spacing: 0.1em;
    }
    .meta-table td.value-cell {
      font-weight: 600;
    }
    .section-title {
      font-size: 16px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 8px;
      margin-top: 36px;
      margin-bottom: 20px;
      color: #201c1d;
    }
    .data-list {
      list-style: none;
      padding: 0;
      margin: 0 0 40px 0;
    }
    .data-item {
      padding: 14px 0;
      border-bottom: 1px dashed #e5e5e5;
    }
    .data-item:last-child {
      border-bottom: none;
    }
    .data-label {
      font-family: "Courier New", Courier, monospace;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      color: #666666;
      display: block;
      margin-bottom: 6px;
      letter-spacing: 0.05em;
    }
    .data-value {
      font-size: 15px;
      color: #201c1d;
      word-break: break-word;
      line-height: 1.5;
    }
    .btn-container {
      text-align: center;
      margin-top: 40px;
    }
    .btn {
      background-color: #201c1d;
      color: #ffffff !important;
      text-decoration: none;
      font-family: "Courier New", Courier, monospace;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      padding: 18px 36px;
      border-radius: 2px;
      display: inline-block;
    }
    .footer {
      margin-top: 48px;
      border-top: 1px solid #e5e5e5;
      padding-top: 20px;
      font-size: 10px;
      color: #888888;
      text-align: center;
      font-family: "Courier New", Courier, monospace;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="label">Notification Système</span>
        <h1 class="title">Nouveau Dossier Devis</h1>
      </div>
      
      <table class="meta-table">
        <tr>
          <td class="label-cell">Profil Client</td>
          <td class="value-cell">${profile === 'PARTICULIER' ? 'Particulier' : 'Professionnel / Entreprise'}</td>
        </tr>
        <tr>
          <td class="label-cell">Email Contact</td>
          <td class="value-cell"><a href="mailto:${escapeHtml(clientEmail)}" style="color: #9B2C2C; text-decoration: underline;">${escapeHtml(clientEmail)}</a></td>
        </tr>
      </table>
      
      <div class="section-title">Critères et Réponses</div>
      <div class="data-list">
        ${Object.entries(formData).map(([key, value]) => `
          <div class="data-item">
            <span class="data-label">${escapeHtml(key.replace(/_/g, ' '))}</span>
            <span class="data-value">${escapeHtml(value as string)}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="btn-container">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://lawcleancenter.fr'}/terminal-hq-77" class="btn">Accéder au Panel Admin</a>
      </div>
      
      <div class="footer">
        LAW CLEAN CENTER • PREPA WEBSITE AUTOMATED ALERTS
      </div>
    </div>
  </div>
</body>
</html>
        `;

        // 3. Envoyer l'email via Resend
        const sendResult = await resend.emails.send({
            from: 'Law Clean Center <onboarding@resend.dev>', // Doit être onboarding@resend.dev en mode sandbox Resend
            to: toEmails,
            subject: `🚨 Nouveau devis reçu [${profile}] - ${clientEmail}`,
            html: emailHtml,
        });

        if (sendResult.error) {
            console.error("Erreur retournée par Resend lors de l'envoi :", sendResult.error);
            return NextResponse.json({ error: sendResult.error.message || "Erreur Resend" }, { status: 500 });
        }

        console.log("Email envoyé avec succès par Resend. ID :", sendResult.data?.id);
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Erreur serveur lors de l'envoi de la notification :", error);
        return NextResponse.json({ error: error.message || "Erreur serveur interne" }, { status: 500 });
    }
}
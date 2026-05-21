"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type QuoteRequest = {
    id: string;
    client_email: string;
    form_data: Record<string, string>;
    status: 'NOUVEAU' | 'EN_COURS' | 'DEVIS_ENVOYÉ' | 'REFUSÉ';
    created_at: string;
};

export default function QuotesInbox() {
    const supabase = createClient();
    const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        setLoading(true);
        // 🛠️ NETTOYAGE : On récupère uniquement la table principale (plus besoin de jointures de services)
        const { data, error } = await supabase
            .from('quote_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError("❌ Échec du chargement des demandes : " + error.message);
        } else {
            setQuotes(data || []);
            if (data && data.length > 0) {
                setSelectedQuote(data[0]);
            }
        }
        setLoading(false);
    };

    const handleStatusChange = async (quoteId: string, newStatus: QuoteRequest['status']) => {
        const { error } = await supabase
            .from('quote_requests')
            .update({ status: newStatus })
            .eq('id', quoteId);

        if (error) {
            alert("Impossible de mettre à jour le statut : " + error.message);
        } else {
            const updatedQuotes = quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q);
            setQuotes(updatedQuotes);
            if (selectedQuote?.id === quoteId) {
                setSelectedQuote({ ...selectedQuote, status: newStatus });
            }
        }
    };

    const handleDeleteQuote = async (quoteId: string) => {
        if (!window.confirm("Supprimer définitivement cette demande de devis ?")) return;

        const { error } = await supabase.from('quote_requests').delete().eq('id', quoteId);

        if (error) {
            alert("Erreur lors de la suppression : " + error.message);
        } else {
            const filtered = quotes.filter(q => q.id !== quoteId);
            setQuotes(filtered);
            setSelectedQuote(filtered.length > 0 ? filtered[0] : null);
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'NOUVEAU': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'EN_COURS': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'DEVIS_ENVOYÉ': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'REFUSÉ': return 'bg-destructive/10 text-destructive border-destructive/20';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    // 🛠️ NOUVELLE FONCTION : Génère le lien de messagerie pré-rempli
    const getMailtoLink = (quote: QuoteRequest) => {
        const subject = encodeURIComponent("Votre demande de devis - Law Clean Center");
        const body = encodeURIComponent(
            `Bonjour,\n\nMerci pour votre demande sur notre site Law Clean Center.\nNous avons bien pris connaissance de vos informations.\n\n[Rédigez votre proposition commerciale ici]\n\nCordialement,\nL'équipe Law Clean Center`
        );
        return `mailto:${quote.client_email}?subject=${subject}&body=${body}`;
    };

    if (loading) {
        return <div className="p-8 text-muted-foreground animate-pulse">Chargement de votre boîte de réception... ⏳</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary mb-2">Demandes de devis reçues</h1>
                <p className="text-muted-foreground">Consultez et traitez les demandes envoyées par vos prospects depuis le formulaire de contact.</p>
            </div>

            {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md border">{error}</div>}

            {quotes.length === 0 ? (
                <div className="text-center p-12 bg-card border border-border rounded-lg">
                    <p className="text-4xl mb-4">📥</p>
                    <h3 className="text-lg font-bold">Boîte de réception vide</h3>
                    <p className="text-muted-foreground text-sm mt-1">Aucun client n'a encore soumis de formulaire de contact.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* COLONNE GAUCHE : LISTE DES DEMANDES */}
                    <div className="lg:col-span-5 space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                        {quotes.map((quote) => (
                            <div
                                key={quote.id}
                                onClick={() => setSelectedQuote(quote)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all text-left relative ${selectedQuote?.id === quote.id
                                        ? 'border-primary bg-primary/5 shadow-sm'
                                        : 'border-border bg-card hover:border-muted-foreground/40'
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-xs text-muted-foreground font-mono">
                                        {new Date(quote.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusStyles(quote.status)}`}>
                                        {quote.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <p className="font-bold text-foreground truncate">{quote.client_email}</p>
                                {/* 🛠️ SIMPLIFIÉ : On affiche un extrait des réponses du formulaire à la place des anciens services */}
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                    {Object.values(quote.form_data).filter(Boolean).slice(0, 2).join(' | ')}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* COLONNE DROITE : DÉTAIL COMPLET DE LA DEMANDE */}
                    <div className="lg:col-span-7 bg-card border border-border rounded-lg p-6 sticky top-24">
                        {selectedQuote ? (
                            <div className="space-y-6 text-left">
                                {/* Header du détail */}
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-mono">ID Dossier : {selectedQuote.id.slice(0, 8)}...</p>
                                        <h2 className="text-lg font-bold text-foreground mt-1">{selectedQuote.client_email}</h2>
                                    </div>

                                    {/* Sélecteur de statut */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">État du dossier</label>
                                        <select
                                            value={selectedQuote.status}
                                            onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as any)}
                                            className="border border-border p-2 rounded text-xs bg-background font-bold text-foreground focus:border-primary outline-none cursor-pointer"
                                        >
                                            <option value="NOUVEAU">🔵 NOUVEAU</option>
                                            <option value="EN_COURS">🟠 EN COURS</option>
                                            <option value="DEVIS_ENVOYÉ">🟢 DEVIS ENVOYÉ</option>
                                            <option value="REFUSÉ">🔴 REFUSÉ</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Réponses du formulaire client */}
                                <div>
                                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 border-b border-dashed pb-1">Détail des informations reçues</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-md border">
                                        {Object.entries(selectedQuote.form_data).map(([key, value]) => (
                                            <div key={key} className="flex flex-col gap-0.5 border-b border-border/40 pb-2 last:border-0">
                                                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
                                                <span className="text-sm font-semibold text-foreground uppercase">{value || '-'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 🛠️ AJOUT ACTION : Répondre directement au client par mail */}
                                <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <a
                                        href={getMailtoLink(selectedQuote)}
                                        onClick={() => {
                                            // Passe automatiquement le dossier en cours pour simplifier le suivi
                                            if (selectedQuote.status === 'NOUVEAU') {
                                                handleStatusChange(selectedQuote.id, 'EN_COURS');
                                            }
                                        }}
                                        className="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-sm px-6 py-3 rounded-md shadow-sm hover:bg-primary/90 transition-colors text-center"
                                    >
                                        📧 Répondre par e-mail
                                    </a>

                                    <button
                                        onClick={() => handleDeleteQuote(selectedQuote.id)}
                                        className="text-xs text-destructive hover:bg-destructive/10 px-4 py-2 rounded font-semibold transition-colors w-full sm:w-auto text-center"
                                    >
                                        Supprimer cette demande
                                    </button>
                                </div>

                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-12 font-mono text-xs">
                                Veuillez sélectionner une demande dans la colonne de gauche.
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}
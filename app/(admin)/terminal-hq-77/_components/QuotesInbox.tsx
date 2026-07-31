"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type QuoteStatus = 'NOUVEAU' | 'EN_COURS' | 'DEVIS_ENVOYÉ' | 'REFUSÉ';
type FilterOption = QuoteStatus | 'TOUTES'; // 🛠️ Nouveau type pour le filtre

type QuoteRequest = {
    id: string;
    client_email: string;
    form_data: Record<string, string>;
    status: QuoteStatus;
    created_at: string;
};

export default function QuotesInbox() {
    const supabase = createClient();
    const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 🛠️ NOUVEL ÉTAT : Le filtre actif
    const [activeFilter, setActiveFilter] = useState<FilterOption>('TOUTES');

    // ÉTATS NOTIFICATIONS EMAILS
    const [notificationEmails, setNotificationEmails] = useState<any[]>([]);
    const [newNotificationEmail, setNewNotificationEmail] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchQuotes();
        loadNotificationEmails();
        setStatus(null);
    }, []);

    const fetchQuotes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('quote_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError("Impossible de charger les demandes : " + error.message);
        } else {
            setQuotes(data || []);
            if (data && data.length > 0) {
                setSelectedQuote(data[0]);
            }
        }
        setLoading(false);
    };

    const loadNotificationEmails = async () => {
        const { data, error } = await supabase
            .from('notification_emails')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setNotificationEmails(data);
    };

    // === ACTIONS EMAILS ===
    const handleAddNotificationEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNotificationEmail) return;

        const { error } = await supabase.from('notification_emails').insert([{ email: newNotificationEmail.toLowerCase().trim() }]);
        if (error) {
            setStatus({ type: 'error', text: "Cet e-mail reçoit déjà les alertes." });
        } else {
            setNewNotificationEmail('');
            setStatus({ type: 'success', text: "Nouvelle adresse e-mail ajoutée !" });
            loadNotificationEmails();
        }
    };

    const handleToggleEmailActive = async (id: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;
        setNotificationEmails(prev => prev.map(item => item.id === id ? { ...item, is_active: nextStatus } : item));
        const { error } = await supabase.from('notification_emails').update({ is_active: nextStatus }).eq('id', id);
        if (error) setNotificationEmails(prev => prev.map(item => item.id === id ? { ...item, is_active: currentStatus } : item));
    };

    const handleDeleteNotificationEmail = async (id: string, email: string) => {
        if (!window.confirm(`Ne plus envoyer d'alertes à ${email} ?`)) return;
        await supabase.from('notification_emails').delete().eq('id', id);
        loadNotificationEmails();
    };

    const handleStatusChange = async (quoteId: string, newStatus: QuoteStatus) => {
        const { error } = await supabase
            .from('quote_requests')
            .update({ status: newStatus })
            .eq('id', quoteId);

        if (error) {
            alert("Erreur lors de la mise à jour : " + error.message);
        } else {
            const updatedQuotes = quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q);
            setQuotes(updatedQuotes);

            // Si on change le statut du devis sélectionné, on le met à jour
            if (selectedQuote?.id === quoteId) {
                setSelectedQuote({ ...selectedQuote, status: newStatus });
            }
        }
    };

    const handleDeleteQuote = async (quoteId: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette demande ?")) return;

        const { error } = await supabase.from('quote_requests').delete().eq('id', quoteId);

        if (error) {
            alert("Erreur lors de la suppression : " + error.message);
        } else {
            const filtered = quotes.filter(q => q.id !== quoteId);
            setQuotes(filtered);

            // On sélectionne le premier élément disponible après suppression, ou null
            const remainingInCurrentFilter = activeFilter === 'TOUTES'
                ? filtered
                : filtered.filter(q => q.status === activeFilter);

            setSelectedQuote(remainingInCurrentFilter.length > 0 ? remainingInCurrentFilter[0] : null);
        }
    };

    const getStatusStyles = (status: QuoteStatus) => {
        switch (status) {
            case 'NOUVEAU': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            case 'EN_COURS': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'DEVIS_ENVOYÉ': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            case 'REFUSÉ': return 'bg-destructive/10 text-destructive border-destructive/20';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        }).replace(':', 'h');
    };

    const getMailtoLink = (quote: QuoteRequest) => {
        const subject = encodeURIComponent("Votre demande de devis - Law Clean Center");
        const summary = Object.entries(quote.form_data)
            .map(([key, value]) => `• ${key.replace(/_/g, ' ').toUpperCase()} : ${value}`)
            .join('\n');

        const body = encodeURIComponent(
            `Bonjour,\n\nMerci pour votre demande sur notre site Law Clean Center.\nNous avons bien pris connaissance de vos informations :\n\n${summary}\n\n[Rédigez votre proposition commerciale ici]\n\nRestant à votre disposition,\nL'équipe Law Clean Center`
        );
        return `mailto:${quote.client_email}?subject=${subject}&body=${body}`;
    };

    // 🛠️ LOGIQUE DE FILTRAGE
    const filteredQuotes = activeFilter === 'TOUTES'
        ? quotes
        : quotes.filter(q => q.status === activeFilter);

    // Changer de filtre et sélectionner automatiquement le premier élément de la nouvelle liste
    const handleFilterClick = (filter: FilterOption) => {
        setActiveFilter(filter);
        const newFilteredList = filter === 'TOUTES' ? quotes : quotes.filter(q => q.status === filter);
        setSelectedQuote(newFilteredList.length > 0 ? newFilteredList[0] : null);
    };

    // Fonction pour compter les éléments par statut (pour les badges)
    const getCount = (status: FilterOption) => {
        if (status === 'TOUTES') return quotes.length;
        return quotes.filter(q => q.status === status).length;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="font-medium animate-pulse">Chargement de la boîte de réception...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">Demandes de devis</h1>
                <p className="text-muted-foreground">Gérez, répondez et suivez les demandes entrantes de vos futurs clients.</p>
            </div>

            {status && (
                <div className={`p-4 rounded shadow-lg fixed bottom-5 right-5 z-50 text-sm font-medium border bg-card ${status.type === 'error' ? 'text-destructive border-destructive/20' : 'text-green-600 border-green-500/20'}`}>
                    {status.text}
                </div>
            )}

            {/* SECTION: RÉCEPTION DES DEMANDES DE DEVIS */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm mb-8">
                <h2 className="text-xl font-bold mb-2">Réception des demandes de devis</h2>
                <p className="text-sm text-muted-foreground mb-6">Ajoutez les adresses e-mails de votre équipe. Dès qu'un client remplira un formulaire sur votre site, une alerte sera envoyée.</p>

                <div className="space-y-3 mb-6">
                    {notificationEmails.length === 0 ? (
                        <div className="p-4 bg-muted/50 border border-border rounded-lg text-center text-sm text-muted-foreground">
                            Aucune adresse e-mail configurée. Vous ne recevrez pas d'alerte.
                        </div>
                    ) : (
                        notificationEmails.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background border border-border rounded-lg gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${item.is_active ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                                    <span className={`font-medium ${item.is_active ? 'text-foreground' : 'text-muted-foreground line-through'}`}>{item.email}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button type="button"
                                        onClick={() => handleToggleEmailActive(item.id, item.is_active)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors border ${item.is_active ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                    >
                                        {item.is_active ? 'Recevoir les alertes' : 'Alerte désactivée'}
                                    </button>

                                    <button type="button" onClick={() => handleDeleteNotificationEmail(item.id, item.email)} className="text-muted-foreground hover:text-destructive text-sm px-2 py-1 transition-colors">
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleAddNotificationEmail} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <input
                        type="email"
                        value={newNotificationEmail}
                        onChange={e => setNewNotificationEmail(e.target.value)}
                        placeholder="Ajouter une adresse (ex: contact@monentreprise.com)"
                        className="flex-1 border border-border p-3 rounded-lg bg-background text-sm outline-none focus:border-primary"
                        required
                    />
                    <button type="submit" className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 rounded-lg text-sm font-bold transition-colors shadow-sm">
                        Ajouter l'e-mail
                    </button>
                </form>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 font-medium">
                    {error}
                </div>
            )}

            {quotes.length === 0 ? (
                <div className="text-center py-20 bg-card border border-border rounded-xl shadow-sm">
                    <span className="text-5xl mb-4 block">📥</span>
                    <h3 className="text-xl font-bold text-foreground">Boîte de réception vide</h3>
                    <p className="text-muted-foreground mt-2">Aucun client n'a encore soumis de formulaire de contact.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* COLONNE GAUCHE : LISTE DES DEMANDES */}
                    <div className="lg:col-span-4 xl:col-span-5 flex flex-col gap-3">

                        {/* 🛠️ BARRE DE FILTRAGE */}
                        <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                            {(['TOUTES', 'NOUVEAU', 'EN_COURS', 'DEVIS_ENVOYÉ', 'REFUSÉ'] as FilterOption[]).map((filter) => (
                                <button type="button"
                                    key={filter}
                                    onClick={() => handleFilterClick(filter)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap border ${activeFilter === filter
                                            ? 'bg-foreground text-background border-foreground shadow-sm'
                                            : 'bg-card text-muted-foreground border-border hover:bg-muted/50'
                                        }`}
                                >
                                    {filter.replace('_', ' ')}
                                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${activeFilter === filter
                                            ? 'bg-background/20'
                                            : 'bg-muted-foreground/10'
                                        }`}>
                                        {getCount(filter)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* LISTE DES DEMANDES FILTRÉES */}
                        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredQuotes.length === 0 ? (
                                <div className="text-center p-8 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
                                    Aucun dossier dans cette catégorie.
                                </div>
                            ) : (
                                filteredQuotes.map((quote) => (
                                    <div
                                        key={quote.id}
                                        onClick={() => setSelectedQuote(quote)}
                                        className={`p-5 border rounded-xl cursor-pointer transition-all duration-200 text-left relative group ${selectedQuote?.id === quote.id
                                                ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                                                : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {formatDate(quote.created_at)}
                                            </span>
                                            <span className={`text-[10px] font-bold border px-2.5 py-1 rounded-md uppercase tracking-wider ${getStatusStyles(quote.status)}`}>
                                                {quote.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="font-bold text-foreground truncate text-sm md:text-base">{quote.client_email}</p>

                                        <div className="text-xs text-muted-foreground mt-2 truncate flex gap-2 items-center">
                                            <span className="truncate">
                                                {Object.values(quote.form_data).filter(Boolean).slice(0, 2).join(' • ')}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* COLONNE DROITE : DÉTAIL DE LA DEMANDE */}
                    <div className="lg:col-span-8 xl:col-span-7 bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm sticky top-24">
                        {selectedQuote ? (
                            <div className="space-y-8 text-left">
                                {/* Header du détail */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border pb-6">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-mono mb-1">Réf: {selectedQuote.id.slice(0, 8).toUpperCase()}</p>
                                        <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">{selectedQuote.client_email}</h2>
                                    </div>

                                    {/* Sélecteur de statut */}
                                    <div className="flex flex-col gap-1.5 w-full sm:w-auto shrink-0">
                                        <label htmlFor="qi-status" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Statut du dossier</label>
                                        <select
                                            id="qi-status"
                                            value={selectedQuote.status}
                                            onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as QuoteStatus)}
                                            className="border border-border py-2 px-3 rounded-lg text-sm bg-background font-bold text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer shadow-sm transition-[border-color,box-shadow]"
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
                                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Informations transmises</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background border border-border/50 p-5 rounded-lg shadow-inner">
                                        {Object.entries(selectedQuote.form_data).map(([key, value]) => (
                                            <div key={key} className="flex flex-col gap-1 border-b border-border/40 pb-3 last:border-0 sm:[&:nth-last-child(-n+2)]:border-0 sm:[&:nth-last-child(-n+2)]:pb-0">
                                                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
                                                <span className="text-sm font-medium text-foreground">{value || <span className="italic text-muted-foreground">Non renseigné</span>}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <a
                                        href={getMailtoLink(selectedQuote)}
                                        onClick={() => {
                                            if (selectedQuote.status === 'NOUVEAU') {
                                                handleStatusChange(selectedQuote.id, 'EN_COURS');
                                            }
                                        }}
                                        className="w-full sm:w-auto bg-foreground text-background font-bold text-sm px-8 py-3 rounded-lg shadow-md hover:bg-foreground/90 hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        Répondre par e-mail
                                    </a>

                                    <button type="button"
                                        onClick={() => handleDeleteQuote(selectedQuote.id)}
                                        className="text-xs text-destructive hover:bg-destructive/10 px-4 py-2.5 rounded-md font-semibold transition-colors w-full sm:w-auto text-center"
                                    >
                                        Supprimer le dossier
                                    </button>
                                </div>

                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full min-h-75 text-center text-muted-foreground font-medium">
                                Sélectionnez un dossier dans la liste pour afficher ses détails.
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}
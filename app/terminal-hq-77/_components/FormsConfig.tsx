"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FormsConfig() {
    const supabase = createClient();
    
    // ÉTATS GESTION FORMULAIRES DYNAMIQUES
    const [activeProfile, setActiveProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const [currentFormId, setCurrentFormId] = useState<string | null>(null);
    const [formFields, setFormFields] = useState<any[]>([]);
    const [newField, setNewField] = useState({
        field_label: '', field_type: 'text', options: '', is_required: true
    });

    // 🚨 NOUVEAUX ÉTATS POUR LA GESTION DES NOTIFICATIONS EMAILS
    const [notificationEmails, setNotificationEmails] = useState<any[]>([]);
    const [newNotificationEmail, setNewNotificationEmail] = useState('');

    // ÉTATS DE STATUT / LOADING
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{type: 'success' | 'error', text: string} | null>(null);

    // === CHARGEMENT CONFIGURATION DU FORMULAIRE ===
    const loadFormConfig = useCallback(async () => {
        try {
            let { data: form, error: fetchError } = await supabase.from('forms').select('id').eq('profile_type', activeProfile).single();

            if (!form) {
                const { data: newForm } = await supabase.from('forms').insert([
                    { profile_type: activeProfile, title: `Formulaire ${activeProfile}`, is_active: true }
                ]).select('id').single();
                form = newForm;
            }

            if (form) {
                setCurrentFormId(form.id);
                const { data: fields } = await supabase.from('form_fields')
                    .select('*').eq('form_id', form.id).order('display_order', { ascending: true });
                setFormFields(fields || []);
            }
        } catch (err) {
            console.error(err);
        }
    }, [activeProfile, supabase]);

    // 🚨 NOUVELLE FONCTION : CHARGER LES EMAILS DE NOTIFICATION
    const loadNotificationEmails = useCallback(async () => {
        const { data, error } = await supabase
            .from('notification_emails')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) {
            setNotificationEmails(data);
        }
    }, [supabase]);

    useEffect(() => {
        loadFormConfig();
        loadNotificationEmails();
        setStatus(null);
    }, [loadFormConfig, loadNotificationEmails]);

    // === ACTIONS SUR LE FORMULAIRE DYNAMIQUE ===
    const handleAddField = async () => {
        if (!newField.field_label) {
            setStatus({ type: 'error', text: "Veuillez donner un titre à votre question." });
            return;
        }
        setIsSubmitting(true);
        const fieldName = newField.field_label.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const optionsJson = newField.field_type === 'select' ? newField.options.split(',').map(o => o.trim()).filter(Boolean) : null;

        const { error } = await supabase.from('form_fields').insert([{
            form_id: currentFormId,
            field_name: fieldName,
            field_label: newField.field_label.toUpperCase(),
            field_type: newField.field_type,
            options: optionsJson,
            is_required: newField.is_required,
            display_order: formFields.length + 1
        }]);

        if (!error) {
            setNewField({ field_label: '', field_type: 'text', options: '', is_required: true });
            setStatus({ type: 'success', text: "Question ajoutée avec succès !" });
            loadFormConfig();
        }
        setIsSubmitting(false);
    };

    const handleDeleteField = async (id: string, label: string) => {
        if (!window.confirm(`Retirer la question "${label}" ?`)) return;
        await supabase.from('form_fields').delete().eq('id', id);
        loadFormConfig();
    };

    // 🚨 ACTIONS DE NOTIFICATION EMAIL (AJOUT / TOGGLE / SUPPRESSION)
    const handleAddNotificationEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNotificationEmail) return;

        const { error } = await supabase
            .from('notification_emails')
            .insert([{ email: newNotificationEmail.toLowerCase().trim() }]);

        if (error) {
            setStatus({ type: 'error', text: "Cet e-mail existe déjà ou est invalide." });
        } else {
            setNewNotificationEmail('');
            setStatus({ type: 'success', text: "Nouvel e-mail de notification enregistré !" });
            loadNotificationEmails();
        }
    };

    const handleToggleEmailActive = async (id: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;
        setNotificationEmails(prev => prev.map(item => item.id === id ? { ...item, is_active: nextStatus } : item));

        const { error } = await supabase
            .from('notification_emails')
            .update({ is_active: nextStatus })
            .eq('id', id);

        if (error) {
            setNotificationEmails(prev => prev.map(item => item.id === id ? { ...item, is_active: currentStatus } : item));
        }
    };

    const handleDeleteNotificationEmail = async (id: string, email: string) => {
        if (!window.confirm(`Supprimer définitivement l'alerte pour l'adresse ${email} ?`)) return;
        await supabase.from('notification_emails').delete().eq('id', id);
        loadNotificationEmails();
    };

    const getTypeLabel = (type: string) => {
        switch(type) {
            case 'text': return 'Texte court';
            case 'email': return 'Adresse Email';
            case 'select': return 'Liste déroulante';
            default: return type;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 text-foreground text-left space-y-16">
            
            {/* BLOC NOTIFICATIONS GÉNÉRALES */}
            {status && (
                <div className={`p-4 rounded text-sm font-medium border fixed bottom-5 right-5 z-50 shadow-lg bg-card ${status.type === 'error' ? 'text-destructive border-destructive/20' : 'text-green-600 border-green-500/20'}`}>
                    {status.text}
                </div>
            )}

            {/* ======================================================================= */}
            {/* SECTION 1 : CONFIGURATION DES NOTIFICATIONS EMAIL (Nouveau !)          */}
            {/* ======================================================================= */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h1 className="text-xl font-bold text-foreground mb-1">Alertes & Notifications</h1>
                <p className="text-sm text-muted-foreground mb-6">Gérez les adresses e-mail qui seront notifiées instantanément dès qu'un devis est soumis.</p>

                {/* Liste des adresses mails abonnées */}
                <div className="space-y-3 mb-6">
                    {notificationEmails.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic font-mono">[ AUCUNE ADRESSE ENREGISTRÉE : AUCUN E-MAIL NE SERA ENVOYÉ ]</p>
                    ) : (
                        notificationEmails.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3.5 bg-background border border-border rounded-md">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${item.is_active ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/40'}`} />
                                    <span className={`text-sm font-semibold ${item.is_active ? 'text-foreground' : 'text-muted-foreground line-through'}`}>{item.email}</span>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    {/* Interrupteur On/Off */}
                                    <button 
                                        onClick={() => handleToggleEmailActive(item.id, item.is_active)}
                                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded transition-colors border ${item.is_active ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {item.is_active ? 'Actif' : 'En pause'}
                                    </button>
                                    
                                    {/* Bouton supprimer */}
                                    <button 
                                        onClick={() => handleDeleteNotificationEmail(item.id, item.email)}
                                        className="text-muted-foreground hover:text-destructive text-xs transition-colors"
                                    >
                                        Retirer
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Formulaire rapide pour ajouter un mail */}
                <form onSubmit={handleAddNotificationEmail} className="flex flex-col sm:flex-row gap-3">
                    <input 
                        type="email" 
                        value={newNotificationEmail}
                        onChange={e => setNewNotificationEmail(e.target.value)}
                        placeholder="Ex: collaborateur@entreprise.com"
                        className="flex-1 border border-border p-3 rounded bg-background text-sm outline-none focus:border-primary"
                        required
                    />
                    <button type="submit" className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 rounded text-sm font-bold transition-colors">
                        Ajouter un destinataire
                    </button>
                </form>
            </div>

            {/* ======================================================================= */}
            {/* SECTION 2 : CONFIGURATION DU FORMULAIRE DYNAMIQUE (Ton ancien code épuré) */}
            {/* ======================================================================= */}
            <div>
                <h1 className="text-xl font-bold text-foreground mb-1">Champs & Questions du formulaire</h1>
                <p className="text-sm text-muted-foreground mb-6">Ajoutez ou supprimez les variables collectées auprès des clients.</p>

                {/* Sélecteur de profil */}
                <div className="flex bg-muted p-1 rounded-md w-fit mb-8 border border-border">
                    {['PARTICULIER', 'ENTREPRISE'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setActiveProfile(p as any)}
                            className={`px-5 py-2 text-xs font-bold rounded transition-colors ${activeProfile === p ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Profil {p}
                        </button>
                    ))}
                </div>

                {/* Liste des questions */}
                <div className="space-y-3 mb-8">
                    {formFields.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic font-mono">[ AUCUNE QUESTION POUR CE FORMULAIRE ]</p>
                    ) : (
                        formFields.map((field, index) => (
                            <div key={field.id} className="flex items-center justify-between gap-4 border border-border bg-card p-4 rounded">
                                <div className="flex items-start gap-4">
                                    <span className="text-xs font-bold text-muted-foreground/60 mt-0.5">0{index + 1}</span>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-foreground text-sm uppercase tracking-tight">{field.field_label}</span>
                                            {field.is_required && <span className="text-[9px] bg-destructive/10 text-destructive font-bold px-1.5 py-0.5 rounded uppercase">Requis</span>}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">Format : {getTypeLabel(field.field_type)}</p>
                                        {field.field_type === 'select' && field.options && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {field.options.map((opt: string) => (
                                                    <span key={opt} className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground border border-border/60">{opt}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteField(field.id, field.field_label)} className="text-xs text-muted-foreground hover:text-destructive font-semibold px-2 py-1 transition-colors">
                                    Retirer
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Bloc d'ajout de question */}
                <div className="border border-border bg-card/60 p-6 rounded-lg">
                    <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Créer une nouvelle question</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase">Titre de la question</label>
                            <input type="text" value={newField.field_label} onChange={e => setNewField({ ...newField, field_label: e.target.value })} className="border border-border p-3 text-sm bg-background rounded outline-none focus:border-primary uppercase" placeholder="EX: KILOMÉTRAGE ACTUEL" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase">Type de réponse</label>
                            <select value={newField.field_type} onChange={e => setNewField({ ...newField, field_type: e.target.value })} className="border border-border p-3 text-sm bg-background rounded outline-none focus:border-primary cursor-pointer">
                                <option value="text">Texte libre</option>
                                <option value="email">Adresse Email</option>
                                <option value="select">Liste déroulante (Choix multiples)</option>
                            </select>
                        </div>

                        <div className="flex items-center mt-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={newField.is_required} onChange={e => setNewField({ ...newField, is_required: e.target.checked })} className="w-5 h-5 accent-primary rounded border-border bg-background" />
                                <span className="text-xs font-bold text-foreground uppercase">Réponse obligatoire</span>
                            </label>
                        </div>
                    </div>

                    {newField.field_type === 'select' && (
                        <div className="mb-4 flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase">Options proposées (séparées par des virgules)</label>
                            <input type="text" value={newField.options} onChange={e => setNewField({ ...newField, options: e.target.value })} className="border border-border p-3 text-sm bg-background rounded outline-none focus:border-primary uppercase" placeholder="Option 1, Option 2, Option 3" />
                        </div>
                    )}

                    <button onClick={handleAddField} disabled={isSubmitting} className="mt-4 bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50">
                        Intégrer au formulaire
                    </button>
                </div>
            </div>

        </div>
    );
}
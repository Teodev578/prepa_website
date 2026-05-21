"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FormsConfig() {
    const supabase = createClient();

    // ÉTATS GESTION FORMULAIRES
    const [activeProfile, setActiveProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const [currentFormId, setCurrentFormId] = useState<string | null>(null);
    const [formFields, setFormFields] = useState<any[]>([]);

    // 🛠️ ÉTATS MODE ÉDITION
    const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null); // Pour scroller automatiquement vers le formulaire lors d'une modification

    const [newField, setNewField] = useState({
        field_label: '', field_type: 'text', options: '', is_required: true
    });

    // ÉTATS NOTIFICATIONS EMAILS
    const [notificationEmails, setNotificationEmails] = useState<any[]>([]);
    const [newNotificationEmail, setNewNotificationEmail] = useState('');

    // ÉTATS UI
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // === CHARGEMENT CONFIGURATION ===
    const loadFormConfig = useCallback(async () => {
        try {
            const { data: forms } = await supabase
                .from('forms')
                .select('id')
                .eq('profile_type', activeProfile)
                .order('created_at', { ascending: true });

            let activeFormId = null;

            if (!forms || forms.length === 0) {
                const { data: newForm } = await supabase
                    .from('forms')
                    .insert([{ profile_type: activeProfile, title: `Formulaire ${activeProfile}`, is_active: true }])
                    .select('id')
                    .single();
                if (newForm) activeFormId = newForm.id;
            } else {
                activeFormId = forms[0].id;
            }

            if (activeFormId) {
                setCurrentFormId(activeFormId);
                const allFormIds = forms && forms.length > 0 ? forms.map(f => f.id) : [activeFormId];
                const { data: fields } = await supabase
                    .from('form_fields')
                    .select('*')
                    .in('form_id', allFormIds)
                    .order('display_order', { ascending: true });

                setFormFields(fields || []);

                if (forms && forms.length > 1) {
                    const duplicateIds = forms.slice(1).map(f => f.id);
                    await supabase.from('form_fields').update({ form_id: activeFormId }).in('form_id', duplicateIds);
                    await supabase.from('forms').delete().in('id', duplicateIds);
                }
            }
        } catch (err) {
            console.error("Erreur:", err);
        }
    }, [activeProfile, supabase]);

    const loadNotificationEmails = useCallback(async () => {
        const { data, error } = await supabase
            .from('notification_emails')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setNotificationEmails(data);
    }, [supabase]);

    useEffect(() => {
        loadFormConfig();
        loadNotificationEmails();
        setStatus(null);
        handleCancelEdit(); // Réinitialise l'édition quand on change d'onglet
    }, [loadFormConfig, loadNotificationEmails]);

    // === 🛠️ ACTIONS SUR LES QUESTIONS DU FORMULAIRE ===
    const handleSaveField = async () => {
        if (!newField.field_label.trim()) {
            setStatus({ type: 'error', text: "Veuillez poser une question." });
            return;
        }
        setIsSubmitting(true);
        const fieldName = newField.field_label.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const optionsJson = newField.field_type === 'select' ? newField.options.split(',').map(o => o.trim()).filter(Boolean) : null;

        if (editingFieldId) {
            // MODE MISE À JOUR
            const { error } = await supabase.from('form_fields').update({
                field_label: newField.field_label,
                field_type: newField.field_type,
                options: optionsJson,
                is_required: newField.is_required
            }).eq('id', editingFieldId);

            if (!error) {
                setStatus({ type: 'success', text: "Question mise à jour avec succès !" });
                handleCancelEdit();
                loadFormConfig();
            }
        } else {
            // MODE CRÉATION
            const { error } = await supabase.from('form_fields').insert([{
                form_id: currentFormId,
                field_name: fieldName,
                field_label: newField.field_label,
                field_type: newField.field_type,
                options: optionsJson,
                is_required: newField.is_required,
                display_order: formFields.length + 1
            }]);

            if (!error) {
                setNewField({ field_label: '', field_type: 'text', options: '', is_required: true });
                setStatus({ type: 'success', text: "Question ajoutée au formulaire !" });
                loadFormConfig();
            }
        }
        setIsSubmitting(false);
    };

    const handleEditClick = (field: any) => {
        setEditingFieldId(field.id);
        setNewField({
            field_label: field.field_label,
            field_type: field.field_type,
            options: field.options ? field.options.join(', ') : '',
            is_required: field.is_required
        });
        // Scroll doucement vers la zone d'édition
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleCancelEdit = () => {
        setEditingFieldId(null);
        setNewField({ field_label: '', field_type: 'text', options: '', is_required: true });
    };

    const handleDeleteField = async (id: string, label: string) => {
        if (!window.confirm(`Voulez-vous vraiment retirer la question "${label}" du formulaire ?`)) return;
        await supabase.from('form_fields').delete().eq('id', id);

        // Si on supprime la question en cours d'édition, on annule l'édition
        if (editingFieldId === id) handleCancelEdit();

        loadFormConfig();
    };

    // 🛠️ GESTION DU CHANGEMENT D'ORDRE (FLÈCHES HAUT/BAS)
    const handleMoveField = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === formFields.length - 1) return;

        const newFields = [...formFields];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        // 1. Échange la position des éléments dans le tableau
        [newFields[index], newFields[swapIndex]] = [newFields[swapIndex], newFields[index]];

        // 2. Met à jour l'ordre d'affichage (display_order) logiquement
        newFields.forEach((field, i) => {
            field.display_order = i + 1;
        });

        // 3. Mise à jour instantanée de l'interface (Optimistic UI)
        setFormFields(newFields);

        // 4. Enregistrement en base de données pour les deux éléments inversés
        await Promise.all([
            supabase.from('form_fields').update({ display_order: newFields[index].display_order }).eq('id', newFields[index].id),
            supabase.from('form_fields').update({ display_order: newFields[swapIndex].display_order }).eq('id', newFields[swapIndex].id)
        ]);
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

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'text': return 'Le client tapera un texte';
            case 'email': return 'Le client donnera un e-mail';
            case 'select': return 'Le client choisira dans une liste';
            default: return type;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 text-foreground text-left space-y-12">

            {status && (
                <div className={`p-4 rounded shadow-lg fixed bottom-5 right-5 z-50 text-sm font-medium border bg-card ${status.type === 'error' ? 'text-destructive border-destructive/20' : 'text-green-600 border-green-500/20'}`}>
                    {status.text}
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-black text-primary uppercase tracking-tighter mb-2">Paramètres de contact</h1>
                <p className="text-muted-foreground text-lg">Gérez ici comment les clients vous contactent et qui reçoit leurs demandes.</p>
            </div>

            {/* SECTION 1 : QUI REÇOIT LES MAILS ? */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-2">1. Réception des demandes de devis</h2>
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
                                    <button
                                        onClick={() => handleToggleEmailActive(item.id, item.is_active)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors border ${item.is_active ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                    >
                                        {item.is_active ? 'Recevoir les alertes' : 'Alerte désactivée'}
                                    </button>

                                    <button onClick={() => handleDeleteNotificationEmail(item.id, item.email)} className="text-muted-foreground hover:text-destructive text-sm px-2 py-1 transition-colors">
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

            {/* SECTION 2 : LE FORMULAIRE DU CLIENT */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-2">2. Le formulaire rempli par le client</h2>
                <p className="text-sm text-muted-foreground mb-8">Quelles informations avez-vous besoin de demander à vos clients pour pouvoir leur faire un devis précis ?</p>

                <div className="flex bg-muted p-1 rounded-lg w-fit mb-8 border border-border">
                    {['PARTICULIER', 'ENTREPRISE'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setActiveProfile(p as any)}
                            className={`px-6 py-2.5 text-sm font-bold rounded-md transition-all ${activeProfile === p ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Pour les {p === 'PARTICULIER' ? 'Particuliers' : 'Entreprises (B2B)'}
                        </button>
                    ))}
                </div>

                <h3 className="text-sm font-bold text-foreground mb-4">Questions actuellement posées :</h3>
                <div className="space-y-3 mb-10">
                    {formFields.length === 0 ? (
                        <div className="p-6 bg-muted/30 border border-dashed border-border rounded-lg text-center text-sm text-muted-foreground">
                            Ce formulaire est vide. Ajoutez votre première question ci-dessous.
                        </div>
                    ) : (
                        formFields.map((field, index) => (
                            <div key={field.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border p-4 rounded-lg shadow-sm transition-colors ${editingFieldId === field.id ? 'bg-primary/5 ring-1 ring-primary border-primary' : 'bg-background'}`}>

                                <div className="flex items-start gap-4">
                                    {/* 🛠️ CONTRÔLES DE RÉORGANISATION (FLÈCHES) */}
                                    <div className="flex flex-col gap-1 items-center bg-muted/50 p-1 rounded border border-border/50">
                                        <button
                                            onClick={() => handleMoveField(index, 'up')}
                                            disabled={index === 0}
                                            className="text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground p-0.5"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                        </button>
                                        <span className="text-[10px] font-black text-primary/40 leading-none">{(index + 1).toString().padStart(2, '0')}</span>
                                        <button
                                            onClick={() => handleMoveField(index, 'down')}
                                            disabled={index === formFields.length - 1}
                                            className="text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground p-0.5"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </button>
                                    </div>

                                    <div className="pt-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="font-bold text-foreground">{field.field_label}</span>
                                            {field.is_required && <span className="text-[10px] bg-red-500/10 text-red-600 font-bold px-2 py-0.5 rounded-full uppercase">Obligatoire</span>}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{getTypeLabel(field.field_type)}</p>

                                        {field.field_type === 'select' && field.options && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {field.options.map((opt: string) => (
                                                    <span key={opt} className="text-xs bg-muted px-2.5 py-1 rounded-md text-muted-foreground border border-border">{opt}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 🛠️ BOUTONS D'ACTION (MODIFIER / SUPPRIMER) */}
                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                    <button
                                        onClick={() => handleEditClick(field)}
                                        className="text-xs font-semibold px-3 py-2 transition-colors rounded bg-muted hover:bg-foreground hover:text-background border border-border"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteField(field.id, field.field_label)}
                                        className="text-xs text-muted-foreground hover:text-destructive font-semibold px-3 py-2 transition-colors rounded hover:bg-destructive/5"
                                    >
                                        Supprimer
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                </div>

                {/* 🛠️ BLOC DE CRÉATION / ÉDITION DYNAMIQUE */}
                <div ref={formRef} className={`p-6 md:p-8 rounded-xl border transition-colors duration-300 ${editingFieldId ? 'border-primary bg-primary/10 shadow-md' : 'border-primary/20 bg-primary/5'}`}>
                    <h3 className="text-lg font-bold text-primary mb-2">
                        {editingFieldId ? 'Modification de la question' : 'Ajouter une nouvelle question'}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-6">
                        {editingFieldId ? 'Mettez à jour les informations ci-dessous puis validez.' : 'Créez une nouvelle étape dans le formulaire de devis.'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-sm font-bold text-foreground">Quelle est votre question ?</label>
                            <input
                                type="text"
                                value={newField.field_label}
                                onChange={e => setNewField({ ...newField, field_label: e.target.value })}
                                className="border border-border p-3.5 text-base bg-background rounded-lg outline-none focus:border-primary shadow-sm"
                                placeholder="Exemple : Quel est le modèle de votre véhicule ?"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-foreground">Type de réponse attendue</label>
                            <select
                                value={newField.field_type}
                                onChange={e => setNewField({ ...newField, field_type: e.target.value })}
                                className="border border-border p-3.5 text-sm bg-background rounded-lg outline-none focus:border-primary cursor-pointer shadow-sm"
                            >
                                <option value="text">Texte libre (Le client tape ce qu'il veut)</option>
                                <option value="email">Adresse E-mail (Vérifie le format @)</option>
                                <option value="select">Choix multiples (Le client choisit dans une liste)</option>
                            </select>
                        </div>

                        <div className="flex items-center mt-2 md:mt-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={newField.is_required}
                                    onChange={e => setNewField({ ...newField, is_required: e.target.checked })}
                                    className="w-5 h-5 accent-primary rounded border-border bg-background cursor-pointer"
                                />
                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Le client est obligé de répondre</span>
                            </label>
                        </div>
                    </div>

                    {newField.field_type === 'select' && (
                        <div className="mb-6 p-5 bg-background border border-border rounded-lg shadow-sm">
                            <label className="text-sm font-bold text-foreground block mb-1">Les choix proposés au client</label>
                            <p className="text-xs text-muted-foreground mb-4">Séparez chaque option par une virgule. Le client pourra choisir une seule de ces options dans le menu déroulant.</p>
                            <input
                                type="text"
                                value={newField.options}
                                onChange={e => setNewField({ ...newField, options: e.target.value })}
                                className="w-full border border-border p-3.5 text-sm bg-background rounded-lg outline-none focus:border-primary"
                                placeholder="Exemple : Citadine, Berline, SUV, Utilitaire"
                            />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleSaveField}
                            disabled={isSubmitting}
                            className="bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 flex-1 sm:flex-none text-center"
                        >
                            {editingFieldId ? 'Mettre à jour la question' : 'Enregistrer cette question'}
                        </button>

                        {editingFieldId && (
                            <button
                                onClick={handleCancelEdit}
                                disabled={isSubmitting}
                                className="bg-muted text-foreground border border-border font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-muted/80 transition-colors flex-1 sm:flex-none text-center"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FormsConfig() {
    const supabase = createClient();
    const [activeProfile, setActiveProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const [currentFormId, setCurrentFormId] = useState<string | null>(null);
    const [formFields, setFormFields] = useState<any[]>([]);
    
    // États pour le formulaire d'ajout
    const [newField, setNewField] = useState({
        field_label: '', field_type: 'text', options: '', is_required: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const loadFormConfig = useCallback(async () => {
        try {
            let { data: form, error: fetchError } = await supabase.from('forms').select('id').eq('profile_type', activeProfile).single();

            // Si le formulaire n'existe pas encore en BDD pour ce profil, on le crée
            if (!form) {
                const { data: newForm, error: insertError } = await supabase.from('forms').insert([
                    { profile_type: activeProfile, title: `Formulaire ${activeProfile}`, is_active: true }
                ]).select('id').single();

                if (insertError) {
                    setStatus({ type: 'error', text: "Impossible d'initialiser le formulaire." });
                    return;
                }
                form = newForm;
            }

            if (form) {
                setCurrentFormId(form.id);
                const { data: fields } = await supabase.from('form_fields')
                    .select('*').eq('form_id', form.id).order('display_order', { ascending: true });
                setFormFields(fields || []);
            }
        } catch (err: any) {
            console.error("Erreur de chargement:", err);
        }
    }, [activeProfile, supabase]);

    useEffect(() => {
        loadFormConfig();
        setStatus(null); // Réinitialise les messages d'erreur au changement d'onglet
    }, [loadFormConfig]);

    const handleAddField = async () => {
        if (!newField.field_label) {
            setStatus({ type: 'error', text: "Veuillez donner un titre à votre question." });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        // On crée un nom technique propre pour la base de données en arrière-plan
        const fieldName = newField.field_label.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        // On prépare les options si c'est une liste déroulante
        const optionsJson = newField.field_type === 'select'
            ? newField.options.split(',').map(o => o.trim()).filter(o => o)
            : null;

        if (newField.field_type === 'select' && (!optionsJson || optionsJson.length === 0)) {
            setStatus({ type: 'error', text: "Veuillez ajouter au moins une option pour la liste déroulante." });
            setIsSubmitting(false);
            return;
        }

        const { error } = await supabase.from('form_fields').insert([{
            form_id: currentFormId,
            field_name: fieldName,
            field_label: newField.field_label.toUpperCase(), // Toujours en majuscule sur le site
            field_type: newField.field_type,
            options: optionsJson,
            is_required: newField.is_required,
            display_order: formFields.length + 1
        }]);

        if (!error) {
            setNewField({ field_label: '', field_type: 'text', options: '', is_required: true });
            setStatus({ type: 'success', text: "Question ajoutée avec succès !" });
            loadFormConfig();
            setTimeout(() => setStatus(null), 3000);
        } else {
            setStatus({ type: 'error', text: "Erreur lors de l'ajout : " + error.message });
        }
        setIsSubmitting(false);
    };

    const handleDeleteField = async (id: string, label: string) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir retirer la question "${label}" du formulaire ?`)) return;
        
        await supabase.from('form_fields').delete().eq('id', id);
        setStatus({ type: 'success', text: "Question retirée du formulaire." });
        loadFormConfig();
        setTimeout(() => setStatus(null), 3000);
    };

    // Traduction visuelle des types pour l'interface
    const getTypeLabel = (type: string) => {
        switch(type) {
            case 'text': return 'Texte court';
            case 'email': return 'Adresse Email';
            case 'select': return 'Liste déroulante';
            default: return type;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-card border border-border rounded-lg shadow-lg relative text-foreground">
            <h1 className="text-2xl font-bold text-primary mb-2">Configuration du formulaire de devis</h1>
            <p className="text-muted-foreground mb-8">Personnalisez les questions qui seront posées à vos clients lorsqu'ils demanderont un devis sur le site.</p>

            {/* SÉLECTEUR DE PROFIL */}
            <div className="flex bg-muted p-1 rounded-md w-fit mb-10 border border-border">
                {['PARTICULIER', 'ENTREPRISE'].map((p) => (
                    <button
                        key={p}
                        onClick={() => setActiveProfile(p as any)}
                        className={`px-6 py-2.5 text-sm font-bold rounded transition-colors ${activeProfile === p ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Profil {p.charAt(0) + p.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* NOTIFICATIONS */}
            {status && (
                <div className={`mb-6 p-4 rounded text-sm font-medium border ${status.type === 'error' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}`}>
                    {status.text}
                </div>
            )}

            {/* LISTE DES QUESTIONS ACTUELLES */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                    <h2 className="text-lg font-semibold text-foreground">Questions actuellement posées</h2>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{formFields.length} question(s)</span>
                </div>

                {formFields.length === 0 ? (
                    <div className="text-center p-12 bg-background/50 border border-dashed border-border rounded-lg">
                        <p className="text-3xl mb-3">📝</p>
                        <p className="font-bold text-foreground">Ce formulaire est vide</p>
                        <p className="text-sm text-muted-foreground mt-1">Ajoutez votre première question ci-dessous.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {formFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-background p-4 rounded hover:border-primary/50 transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-muted text-muted-foreground font-bold w-8 h-8 rounded flex items-center justify-center shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-bold text-foreground">{field.field_label}</p>
                                            {field.is_required && (
                                                <span className="text-[10px] font-bold uppercase bg-destructive/10 text-destructive px-2 py-0.5 rounded">Obligatoire</span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                                                {getTypeLabel(field.field_type)}
                                            </span>
                                        </div>

                                        {field.field_type === 'select' && field.options && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {field.options.map((opt: string) => (
                                                    <span key={opt} className="text-[10px] bg-muted border border-border px-2 py-1 rounded text-foreground">{opt}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDeleteField(field.id, field.field_label)} 
                                    className="text-xs font-bold text-destructive hover:bg-destructive/10 px-3 py-2 rounded transition-colors self-end sm:self-center opacity-100 sm:opacity-50 sm:group-hover:opacity-100"
                                >
                                    Retirer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FORMULAIRE D'AJOUT */}
            <div className="bg-background/50 border border-border p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-foreground mb-6">➕ Ajouter une nouvelle question</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Nom de la question */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-bold text-foreground">Quelle question voulez-vous poser ?</label>
                        <input 
                            type="text" 
                            value={newField.field_label} 
                            onChange={e => setNewField({ ...newField, field_label: e.target.value })} 
                            className="border border-border p-3 rounded bg-background focus:border-primary transition-colors" 
                            placeholder="Ex: Quelle est la plaque d'immatriculation du véhicule ?" 
                        />
                        <p className="text-xs text-muted-foreground">Ce texte apparaîtra exactement tel quel sur le site web.</p>
                    </div>

                    {/* Type de réponse */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-foreground">Type de réponse attendue</label>
                        <select 
                            value={newField.field_type} 
                            onChange={e => setNewField({ ...newField, field_type: e.target.value })} 
                            className="border border-border p-3 rounded bg-background text-foreground focus:border-primary transition-colors cursor-pointer"
                        >
                            <option value="text">Texte libre (Le client tape ce qu'il veut)</option>
                            <option value="email">Adresse Email (Vérifie le format @)</option>
                            <option value="select">Choix multiple (Liste déroulante)</option>
                        </select>
                    </div>

                    {/* Obligatoire ou non */}
                    <div className="flex items-center mt-2 md:mt-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${newField.is_required ? 'bg-primary border-primary' : 'bg-background border-border group-hover:border-primary'}`}>
                                {newField.is_required && <span className="text-primary-foreground text-xs font-bold">✓</span>}
                            </div>
                            <input 
                                type="checkbox" 
                                checked={newField.is_required} 
                                onChange={e => setNewField({ ...newField, is_required: e.target.checked })} 
                                className="hidden" 
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">Rendre cette question obligatoire</span>
                                <span className="text-xs text-muted-foreground">Le client ne pourra pas envoyer sa demande sans répondre.</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Options (Uniquement si select) */}
                {newField.field_type === 'select' && (
                    <div className="mb-6 p-4 bg-muted border border-border rounded">
                        <label className="text-sm font-bold text-foreground block mb-2">Choix proposés au client</label>
                        <input 
                            type="text" 
                            value={newField.options} 
                            onChange={e => setNewField({ ...newField, options: e.target.value })} 
                            className="border border-border p-3 rounded bg-background focus:border-primary transition-colors w-full" 
                            placeholder="Ex: Véhicule neuf, Véhicule usagé, Véhicule de collection" 
                        />
                        <p className="text-xs text-muted-foreground mt-2 font-medium">⚠️ Séparez chaque option par une virgule.</p>
                    </div>
                )}

                {/* Bouton de validation */}
                <button 
                    onClick={handleAddField} 
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-primary text-primary-foreground font-bold py-3 px-8 rounded hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
                >
                    {isSubmitting ? 'Ajout en cours...' : 'Ajouter cette question au formulaire'}
                </button>
            </div>
        </div>
    );
}
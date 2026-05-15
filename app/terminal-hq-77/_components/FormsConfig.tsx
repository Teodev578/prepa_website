"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FormsConfig() {
    const supabase = createClient();
    const [activeProfile, setActiveProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const [currentFormId, setCurrentFormId] = useState<string | null>(null);
    const [formFields, setFormFields] = useState<any[]>([]);
    const [newField, setNewField] = useState({
        field_label: '', field_type: 'text', options: '', is_required: true
    });

    const loadFormConfig = useCallback(async () => {
        try {
            let { data: form, error: fetchError } = await supabase.from('forms').select('id').eq('profile_type', activeProfile).single();

            if (!form) {
                const { data: newForm, error: insertError } = await supabase.from('forms').insert([
                    { profile_type: activeProfile, title: `Formulaire ${activeProfile}`, is_active: true }
                ]).select('id').single();

                if (insertError) {
                    console.error(insertError);
                    alert("ERREUR : Impossible de créer le formulaire en Base de données.");
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
    }, [loadFormConfig]);

    const handleAddField = async () => {
        if (!newField.field_label) return;

        const fieldName = newField.field_label.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const optionsJson = newField.field_type === 'select'
            ? newField.options.split(',').map(o => o.trim()).filter(o => o)
            : null;

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
            loadFormConfig();
        } else {
            alert("Erreur lors de l'ajout : " + error.message);
        }
    };

    const handleDeleteField = async (id: string) => {
        if (!window.confirm("Supprimer cette variable ?")) return;
        await supabase.from('form_fields').delete().eq('id', id);
        loadFormConfig();
    };

    return (
        <div className="max-w-5xl mx-auto border-technical p-8 bg-card relative shadow-2xl">
            <div className="tech-corner absolute top-0 left-0" />
            <h1 className="text-card-title text-primary mb-2">CONFIG_FORMULAIRES</h1>
            <p className="text-detail text-muted-foreground mb-8">MODIFICATION DYNAMIQUE DES VARIABLES CLIENTS (PAGE DEVIS)</p>

            <div className="flex border bg-muted w-fit rounded-none mb-8 p-1">
                {['PARTICULIER', 'ENTREPRISE'].map((p) => (
                    <button
                        key={p}
                        onClick={() => setActiveProfile(p as any)}
                        className={`px-6 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${activeProfile === p ? 'bg-primary text-background font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <div className="mb-12">
                <h2 className="font-mono text-sm text-primary mb-4 border-b border-primary/20 pb-2">VARIABLES ACTUELLES [{activeProfile}]</h2>

                {formFields.length === 0 ? (
                    <p className="text-muted-foreground font-mono text-xs italic">AUCUNE VARIABLE ENREGISTRÉE POUR CE PROFIL.</p>
                ) : (
                    <div className="space-y-3">
                        {formFields.map((field, index) => (
                            <div key={field.id} className="flex items-center justify-between border border-border bg-background/50 p-4 hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-6">
                                    <span className="text-muted-foreground font-mono text-xs opacity-50">0{index + 1}</span>
                                    <div>
                                        <p className="font-mono text-sm text-foreground font-bold tracking-widest">{field.field_label} <span className="text-primary text-[10px] ml-2">[{field.field_type.toUpperCase()}]</span></p>
                                        <p className="font-mono text-[10px] text-muted-foreground mt-1">SYS_NAME: {field.field_name} | REQUIS: {field.is_required ? 'OUI' : 'NON'}</p>
                                        {field.field_type === 'select' && field.options && (
                                            <p className="font-mono text-[9px] text-muted-foreground mt-1 bg-muted px-2 py-1 inline-block">OPT: {field.options.join(' / ')}</p>
                                        )}
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteField(field.id)} className="text-destructive hover:bg-destructive/10 px-3 py-2 font-mono text-xs transition-colors">
                                    [ SUPPRIMER ]
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border border-primary/20 bg-primary/5 p-6 relative">
                <h2 className="font-mono text-sm text-primary mb-6">AJOUTER UNE NOUVELLE VARIABLE</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="col-span-2">
                        <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] block mb-2">LABEL AFFICHÉ (ex: SIRET_ID)</label>
                        <input type="text" value={newField.field_label} onChange={e => setNewField({ ...newField, field_label: e.target.value })} className="border border-border p-3 text-sm bg-background w-full outline-none focus:border-primary font-mono uppercase" placeholder="NOM DU CHAMP" />
                    </div>

                    <div>
                        <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] block mb-2">TYPE DE DONNÉE</label>
                        <select value={newField.field_type} onChange={e => setNewField({ ...newField, field_type: e.target.value })} className="border border-border p-3 text-sm bg-background w-full outline-none focus:border-primary font-mono cursor-pointer">
                            <option value="text">TEXTE LIBRE</option>
                            <option value="email">ADRESSE EMAIL</option>
                            <option value="select">SÉLECTEUR (CHOIX)</option>
                        </select>
                    </div>

                    <div className="flex items-end pb-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={newField.is_required} onChange={e => setNewField({ ...newField, is_required: e.target.checked })} className="w-5 h-5 accent-primary border-border bg-background" />
                            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">CHAMP REQUIS</span>
                        </label>
                    </div>
                </div>

                {newField.field_type === 'select' && (
                    <div className="mb-6">
                        <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] block mb-2">OPTIONS POSSIBLES (Séparées par des virgules)</label>
                        <input type="text" value={newField.options} onChange={e => setNewField({ ...newField, options: e.target.value })} className="border border-border p-3 text-sm bg-background w-full outline-none focus:border-primary font-mono uppercase" placeholder="NEUF_FACTORY, USAGE_MODERE, RESTAURATION" />
                    </div>
                )}

                <button onClick={handleAddField} className="btn-primary w-full md:w-auto mt-4">
                    <span>[+] INTÉGRER AU FORMULAIRE</span>
                </button>
            </div>
        </div>
    );
}
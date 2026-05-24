"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/lib/client';

const cubicBezier = [0.22, 1, 0.36, 1] as const;

const maskReveal = {
    initial: { clipPath: 'inset(100% 0 0 0)' },
    whileInView: { clipPath: 'inset(0 0 0 0)' },
    viewport: { once: true },
    transition: { duration: 1.2, ease: cubicBezier }
};

interface FormField {
    id: string;
    field_name: string;
    field_label: string;
    field_type: string;
    options: string[] | null;
    is_required: boolean;
}

const Contact = () => {
    const [profile, setProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const profiles = ['PARTICULIER', 'ENTREPRISE'] as const;

    const [formId, setFormId] = useState<string | null>(null);
    const [fields, setFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    useEffect(() => {
        const supabase = createClient();
        const fetchConfig = async () => {
            setIsLoadingData(true);

            const { data: forms } = await supabase
                .from('forms')
                .select('id')
                .eq('profile_type', profile)
                .order('created_at', { ascending: true })
                .limit(1);

            const form = forms && forms.length > 0 ? forms[0] : null;

            if (form) {
                setFormId(form.id);
                const { data: formFields } = await supabase
                    .from('form_fields')
                    .select('*')
                    .eq('form_id', form.id)
                    .order('display_order', { ascending: true });

                setFields(formFields || []);
            }

            setFormData({});
            setIsLoadingData(false);
        };

        fetchConfig();
    }, [profile]);

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const supabase = createClient();
        e.preventDefault();
        setStatusMessage(null);

        for (const field of fields) {
            if (field.is_required && !formData[field.field_name]?.trim()) {
                setStatusMessage({ type: 'error', text: `Veuillez remplir le champ obligatoire : ${field.field_label}` });
                return;
            }
        }

        setIsSubmitting(true);

        const clientEmail = Object.entries(formData).find(([key]) =>
            key.toLowerCase().includes('email') || key.toLowerCase().includes('mail')
        )?.[1] || 'Non renseigné';

        const { error: quoteError } = await supabase
            .from('quote_requests')
            .insert([{
                form_id: formId,
                client_email: clientEmail,
                form_data: formData,
                status: 'NOUVEAU'
            }]);

        if (quoteError) {
            console.error("Supabase insert error details:", quoteError);
            setStatusMessage({ type: 'error', text: `Impossible d'envoyer votre demande pour le moment. Erreur : ${quoteError.message || JSON.stringify(quoteError)}` });
        } else {
            setStatusMessage({ type: 'success', text: "Votre demande de devis a bien été transmise ! Nous revenons vers vous sous 24h." });
            
            fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientEmail,
                    formData,
                    profile,
                }),
            }).then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    console.warn("Erreur de notification par email :", res.status, errorText);
                } else {
                    console.log("Notification email déclenchée avec succès.");
                }
            }).catch(err => {
                console.error("Erreur réseau lors de la notification email :", err);
            });

            setFormData({});
        }

        setIsSubmitting(false);
    };

    return (
        <section className="bg-background text-foreground min-h-screen pt-16 md:pt-24 pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-12 md:mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="font-mono text-primary uppercase tracking-widest text-[11px]">ÉTABLIR UN PROJET</span>
                    </motion.div>
                    
                    <motion.h1
                        {...maskReveal}
                        className="text-5xl sm:text-6xl md:text-7xl text-primary leading-tight font-black uppercase tracking-tighter"
                    >
                        DEMANDE <br /> DE DEVIS
                    </motion.h1>

                    {/* 🛠️ AJOUT DE LA PHRASE D'ACCROCHE ICI */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: cubicBezier }}
                        className="text-muted-foreground text-base md:text-lg max-w-xl mt-6 leading-relaxed"
                    >
                        Remplissez le formulaire ci-dessous afin de nous aider à comprendre vos besoins.
                    </motion.p>
                </div>

                {/* Sélecteur de profil (Particulier / Entreprise) */}
                <div className="flex relative gap-0 border bg-muted mb-12 md:mb-16 p-1 w-fit rounded-[var(--radius)]">
                    {profiles.map((p) => (
                        <button
                            key={p}
                            onClick={() => setProfile(p)}
                            className="px-6 py-2.5 md:px-8 md:py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative z-10 focus:outline-none"
                        >
                            <span className={profile === p ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}>
                                {p === 'PARTICULIER' ? 'Particulier' : 'Professionnel / Entreprise'}
                            </span>
                            {profile === p && (
                                <motion.div
                                    layoutId="profileSelector"
                                    className="absolute inset-0 bg-primary rounded-[calc(var(--radius)-0.25rem)]"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Formulaire Unique et Linéaire */}
                <form onSubmit={handleSubmit} className="space-y-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-10 relative min-h-[150px]">
                        {isLoadingData ? (
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground animate-pulse">
                                Chargement des critères du formulaire...
                            </div>
                        ) : fields.length === 0 ? (
                            <div className="col-span-full text-sm text-muted-foreground italic">
                                Aucune question n'est configurée pour ce profil actuellement.
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {fields.map((field) => (
                                    <motion.div
                                        key={field.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col gap-2 w-full"
                                    >
                                        <label className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                            {/* INTÉGRATION SECONDAIRE : L'astérisque attire l'œil avec la couleur secondaire */}
                                            {field.field_label} {field.is_required && <span className="text-secondary">*</span>}
                                        </label>

                                        {field.field_type === 'select' && field.options ? (
                                            <select
                                                /* INTÉGRATION SECONDAIRE : focus:border-secondary */
                                                className="w-full bg-background border-0 border-b border-border py-2.5 focus:ring-0 focus:border-secondary transition-colors font-sans text-base outline-none cursor-pointer text-foreground"
                                                value={formData[field.field_name] || ''}
                                                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                                                required={field.is_required}
                                            >
                                                <option value="" disabled className="text-muted-foreground">Cliquez pour choisir...</option>
                                                {field.options.map(opt => (
                                                    <option key={opt} value={opt} className="text-foreground">{opt}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.field_type === 'email' ? 'email' : 'text'}
                                                /* INTÉGRATION SECONDAIRE : focus:border-secondary */
                                                className="w-full bg-background border-0 border-b border-border py-2.5 focus:ring-0 focus:border-secondary transition-colors font-sans text-base outline-none placeholder:text-muted-foreground/40 placeholder:normal-case text-foreground"
                                                placeholder={field.is_required ? "Champ obligatoire" : "Facultatif"}
                                                value={formData[field.field_name] || ''}
                                                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                                                required={field.is_required}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Zone de notification de statut et d'envoi */}
                    <div className="pt-8">
                        {statusMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-4 border text-sm font-medium text-center rounded-lg ${statusMessage.type === 'error' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}`}
                            >
                                {statusMessage.text}
                            </motion.div>
                        )}

                        {/* INTÉGRATION SECONDAIRE : Le bouton principal passe en secondary pour un vrai Call to Action contrasté */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoadingData}
                            className="w-full border-2 border-secondary bg-secondary text-secondary-foreground p-5 md:p-6 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:bg-transparent hover:text-secondary font-bold rounded-lg shadow-md disabled:opacity-50 disabled:hover:bg-secondary disabled:hover:text-secondary-foreground"
                        >
                            <span className="text-lg md:text-xl">
                                {isSubmitting ? 'Transmission de votre dossier...' : 'Envoyer ma demande de devis'}
                            </span>
                            {!isSubmitting && (
                                <span className="font-mono text-[10px] tracking-widest text-secondary-foreground/70 uppercase">
                                    Une réponse vous sera apportée sous 24h
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer pratique */}
                <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 border-t border-border font-mono text-[11px] text-muted-foreground uppercase tracking-widest relative">
                    {/* Le trait décoratif reste primaire pour encadrer symétriquement la section */}
                    <div className="absolute -top-[1px] left-0 w-12 h-[1px] bg-primary" />
                    <div className="space-y-2">
                        <span className="text-primary font-black">Zone d'intervention</span><br />
                        Région Île-de-France<br />
                        Déplacements sur site & parcs
                    </div>
                    <div className="space-y-2">
                        <span className="text-primary font-black">Garanties Pro</span><br />
                        Assurance spécifique incluse<br />
                        Convoyages & Préparations sécurisés
                    </div>
                    <div className="space-y-2 text-left md:text-right">
                        <span className="text-primary font-black">Contact direct</span><br />
                        lawcleancenter@outlook.com<br />
                        SIRET: 922 386 131 00010
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
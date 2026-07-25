"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/lib/client';

const customEase = [0.16, 1, 0.3, 1] as const;

const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
        y: "0%",
        opacity: 1,
        transition: { duration: 1.2, ease: customEase }
    }
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.2, ease: customEase }
    }
};

interface FormField {
    id: string;
    field_name: string;
    field_label: string;
    field_type: string;
    options: string[] | null;
    is_required: boolean;
}

interface ProfileData {
    formId: string | null;
    fields: FormField[];
}

type ProfileCache = Partial<Record<'PARTICULIER' | 'ENTREPRISE', ProfileData>>;

const Contact = () => {
    const [profile, setProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const profiles = ['PARTICULIER', 'ENTREPRISE'] as const;

    const cacheRef = useRef<ProfileCache>({});
    const [currentData, setCurrentData] = useState<ProfileData>({ formId: null, fields: [] });
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    const fetchProfile = async (profileType: 'PARTICULIER' | 'ENTREPRISE'): Promise<ProfileData> => {
        // Retourner depuis le cache si disponible
        if (cacheRef.current[profileType]) {
            return cacheRef.current[profileType]!;
        }

        const supabase = createClient();

        const { data: forms } = await supabase
            .from('forms')
            .select('id')
            .eq('profile_type', profileType)
            .order('created_at', { ascending: true })
            .limit(1);

        const form = forms && forms.length > 0 ? forms[0] : null;

        if (!form) {
            const result = { formId: null, fields: [] };
            cacheRef.current[profileType] = result;
            return result;
        }

        const { data: formFields } = await supabase
            .from('form_fields')
            .select('*')
            .eq('form_id', form.id)
            .order('display_order', { ascending: true });

        const result = { formId: form.id, fields: formFields || [] };
        cacheRef.current[profileType] = result;
        return result;
    };

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoadingData(true);

            // Charger le profil actif en priorité
            const data = await fetchProfile(profile);

            if (!cancelled) {
                setCurrentData(data);
                setIsLoadingData(false);

                // Pré-charger l'autre profil en arrière-plan
                const other = profile === 'PARTICULIER' ? 'ENTREPRISE' : 'PARTICULIER';
                fetchProfile(other).catch(() => {});
            }
        };

        load();
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    const handleProfileChange = (p: 'PARTICULIER' | 'ENTREPRISE') => {
        setProfile(p);
        setFormData({});
        setStatusMessage(null);
        // Si déjà en cache, afficher instantanément
        if (cacheRef.current[p]) {
            setCurrentData(cacheRef.current[p]!);
            setIsLoadingData(false);
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const supabase = createClient();
        e.preventDefault();
        setStatusMessage(null);

        for (const field of currentData.fields) {
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
                form_id: currentData.formId,
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientEmail, formData, profile }),
            }).catch(err => {
                console.error("Erreur réseau lors de la notification email :", err);
            });

            setFormData({});
        }

        setIsSubmitting(false);
    };

    const fields = currentData.fields;
    const formId = currentData.formId;

    return (
        <section className="bg-background text-foreground h-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* 🛠️ HEADER */}
                <div className="mb-12 sm:mb-16 relative">
                    <div className="mb-4 flex items-center gap-3 sm:gap-4">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 1, ease: customEase }}
                            className="w-8 sm:w-12 h-[1px] bg-primary/40 origin-left"
                        />
                        <span className="text-muted-foreground font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] break-words">
                            ÉTABLIR UN PROJET
                        </span>
                    </div>

                    <div className="overflow-hidden py-2">
                        <motion.h1
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-50px" }}
                            className="font-black text-[13vw] sm:text-[9vw] md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-foreground leading-[0.85] mb-6 md:mb-8 uppercase tracking-tighter"
                        >
                            DEMANDE <br /> 
                            DE DEVIS <span className="text-foreground inline-block transform translate-y-1 md:translate-y-2 opacity-30"></span>
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                        <motion.p
                            variants={paragraphVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-50px" }}
                            className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed border-l-[3px] border-border/50 pl-4 sm:pl-6 mt-4 sm:mt-6"
                        >
                            Remplissez le formulaire ci-dessous afin de nous aider à comprendre vos besoins et à agir en conséquence.
                        </motion.p>
                    </div>
                </div>

                {/* Sélecteur de profil */}
                <div className="flex relative gap-0 border bg-muted mb-12 sm:mb-16 p-1 w-fit rounded-[var(--radius)]">
                    {profiles.map((p) => (
                        <button
                            key={p}
                            onClick={() => handleProfileChange(p)}
                            className="px-6 py-2.5 md:px-8 md:py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative z-10 focus:outline-none"
                        >
                            <span className={`relative z-20 transition-colors duration-300 ${profile === p ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                                {p === 'PARTICULIER' ? 'Particulier' : 'Professionnel / Entreprise'}
                            </span>
                            {profile === p && (
                                <motion.div
                                    layoutId="profileSelector"
                                    className="absolute inset-0 bg-primary rounded-[calc(var(--radius)-0.25rem)] shadow-sm"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-10 relative min-h-[150px]">
                        {isLoadingData ? (
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] sm:text-xs text-muted-foreground/60 animate-pulse uppercase tracking-widest text-center">
                                Chargement...
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
                                            {field.field_label} {field.is_required && <span className="text-secondary opacity-40 ml-1">*</span>}
                                        </label>

                                        {field.field_type === 'select' && field.options ? (
                                            <select
                                                className="w-full bg-background border-0 border-b border-border py-2.5 focus:ring-0 focus:border-foreground transition-colors font-sans text-base outline-none cursor-pointer text-foreground"
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
                                                className="w-full bg-background border-0 border-b border-border py-2.5 focus:ring-0 focus:border-foreground transition-colors font-sans text-base outline-none placeholder:text-muted-foreground/40 placeholder:normal-case text-foreground"
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

                    <div className="pt-8">
                        {statusMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-4 border text-sm font-medium text-center rounded-[var(--radius)] ${statusMessage.type === 'error' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}`}
                            >
                                {statusMessage.text}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoadingData}
                            className="btn-secondary w-full md:w-auto md:min-w-[300px] flex flex-col items-center justify-center gap-1.5 opacity-100 disabled:opacity-50 mx-0"
                        >
                            <span className="text-sm md:text-base tracking-widest uppercase">
                                {isSubmitting ? 'Transmission...' : 'Envoyer ma demande'}
                            </span>
                            {!isSubmitting && (
                                <span className="font-mono text-[8px] md:text-[9px] tracking-widest opacity-70 uppercase">
                                    Une réponse vous sera apportée sous 24h
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer pratique */}
                <div className="mt-24 sm:mt-32 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8 sm:pt-12 border-t border-border font-mono text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest relative">
                    <div className="absolute top-0 left-0 w-8 sm:w-12 h-[1px] bg-primary/40" />
                    
                    <div className="space-y-1.5 sm:space-y-2">
                        <span className="text-foreground font-bold flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/50 rounded-full"></span> Zone d'intervention
                        </span>
                        <div>
                            Région Île-de-France<br />
                            Déplacements sur site &amp; parcs
                        </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                        <span className="text-foreground font-bold flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/50 rounded-full"></span> Garanties Pro
                        </span>
                        <div>
                            Assurance spécifique incluse<br />
                            Convoyages &amp; Préparations sécurisés
                        </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-left md:text-right">
                        <span className="text-foreground font-bold">Contact direct</span><br />
                        <span className="break-all">lawcleancenter@outlook.com</span><br />
                        SIRET: 922 386 131 00010
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
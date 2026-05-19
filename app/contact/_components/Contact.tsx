"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/lib/client';

const cubicBezier = [0.22, 1, 0.36, 1] as any;

const maskReveal = {
  initial: { clipPath: 'inset(100% 0 0 0)' },
  whileInView: { clipPath: 'inset(0 0 0 0)' },
  viewport: { once: true },
  transition: { duration: 1.2, ease: cubicBezier }
};

// Types basés sur ta base de données
interface FormField {
    id: string;
    field_name: string;
    field_label: string;
    field_type: string;
    options: string[] | null;
    is_required: boolean;
}

interface Service {
    id: string;
    label: string;
}

const Contact = () => {
    const [profile, setProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const profiles = ['PARTICULIER', 'ENTREPRISE'] as const;

    // États de données BDD
    const [formId, setFormId] = useState<string | null>(null);
    const [fields, setFields] = useState<FormField[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    
    // États du formulaire utilisateur
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    
    // États de l'interface
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    // 1. CHARGEMENT DES SERVICES ET DU FORMULAIRE AU MONTAGE / CHANGEMENT DE PROFIL
    useEffect(() => {
        const supabase = createClient();
        const fetchConfig = async () => {
            setIsLoadingData(true);
            
            // Récupérer les services actifs (une seule fois ou à chaque changement, peu importe)
            const { data: servicesData } = await supabase
                .from('services')
                .select('id, label')
                .eq('is_active', true);
            if (servicesData) setServices(servicesData);

            // Récupérer le formulaire lié au profil
            const { data: form } = await supabase
                .from('forms')
                .select('id')
                .eq('profile_type', profile)
                .single();

            if (form) {
                setFormId(form.id);
                // Récupérer les variables/champs de ce formulaire
                const { data: formFields } = await supabase
                    .from('form_fields')
                    .select('*')
                    .eq('form_id', form.id)
                    .order('display_order', { ascending: true });
                
                setFields(formFields || []);
            }
            
            // On nettoie les anciennes données saisies quand on change de profil
            setFormData({});
            setIsLoadingData(false);
        };

        fetchConfig();
    }, [profile]);

    // 2. GESTION DES SAISIES
    const handleInputChange = (fieldName: string, value: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev => 
            prev.includes(serviceId) 
                ? prev.filter(id => id !== serviceId) 
                : [...prev, serviceId]
        );
    };

    // 3. SOUMISSION DU DEVIS
    const handleSubmit = async (e: React.FormEvent) => {
        const supabase = createClient();
        e.preventDefault();
        setStatusMessage(null);

        // Validation basique
        if (selectedServices.length === 0) {
            setStatusMessage({ type: 'error', text: "ERREUR: VEUILLEZ SÉLECTIONNER AU MOINS UN PROTOCOLE." });
            return;
        }

        // Vérification des champs requis
        for (const field of fields) {
            if (field.is_required && !formData[field.field_name]) {
                setStatusMessage({ type: 'error', text: `ERREUR: LA VARIABLE [${field.field_label}] EST REQUISE.` });
                return;
            }
        }

        setIsSubmitting(true);

        // Essayer de trouver une adresse email dans le JSON (utile pour le contact rapide dans ta BDD)
        // On cherche une clé qui s'appelle 'email', 'mail', ou 'canal_comm'
        const clientEmail = Object.entries(formData).find(([key]) => key.toLowerCase().includes('email') || key.toLowerCase().includes('mail') || key === 'canal_comm')?.[1] || 'Non renseigné';

        // Étape 1 : Créer la requête de devis
        const { data: quote, error: quoteError } = await supabase
            .from('quote_requests')
            .insert([{
                form_id: formId,
                client_email: clientEmail,
                form_data: formData,
                status: 'NOUVEAU'
            }])
            .select('id')
            .single();

        if (quoteError || !quote) {
            setStatusMessage({ type: 'error', text: "ERREUR BDD: ÉCHEC DE LA TRANSMISSION." });
            setIsSubmitting(false);
            return;
        }

        // Étape 2 : Lier les protocoles sélectionnés au devis
        const quoteServicesData = selectedServices.map(serviceId => ({
            quote_id: quote.id,
            service_id: serviceId
        }));

        const { error: linkError } = await supabase
            .from('quote_services')
            .insert(quoteServicesData);

        if (linkError) {
            setStatusMessage({ type: 'error', text: "ERREUR DE LIAISON PROTOCOLE. CONTACTEZ L'ADMINISTRATEUR." });
        } else {
            setStatusMessage({ type: 'success', text: "UPLINK TERMINÉ. NOUS ANALYSONS VOS DONNÉES." });
            setFormData({}); // Vider le formulaire
            setSelectedServices([]);
        }

        setIsSubmitting(false);
    };

    return (
        <section className="bg-background text-foreground min-h-screen pt-24 md:pt-32 pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-24 relative">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="font-mono text-primary uppercase tracking-widest md:tracking-[0.3em] text-[10px]">DOC_REF: ORD_2026_PREPA_V2</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        className="text-5xl sm:text-6xl md:text-8xl text-primary leading-tight md:leading-[0.85]"
                    >
                        BON DE <br /> COMMANDE
                    </motion.h1>
                </div>

                {/* Profile Selector */}
                <div className="flex relative gap-0 border bg-muted mb-16 md:mb-20 p-1 w-fit rounded-[var(--radius)]">
                    {profiles.map((p) => (
                        <button
                            key={p}
                            onClick={() => setProfile(p)}
                            className="px-4 py-2 md:px-8 md:py-3 font-mono text-[11px] md:text-[10px] uppercase tracking-wider transition-colors duration-300 relative z-10"
                        >
                            <span className={profile === p ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}>
                                {p}
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

                {/* Technical Form */}
                <form onSubmit={handleSubmit} className="space-y-16 md:space-y-20">
                    
                    {/* Section 01: Champs dynamiques (Fusion ID + Specs) */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="flex items-center gap-4 md:gap-6">
                            <span className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 font-black">01</span>
                            <h2 className="text-xl md:text-2xl relative">
                                DATA_&_SPÉCIFICATIONS
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12 relative min-h-[200px]">
                            {isLoadingData ? (
                                <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground animate-pulse">
                                    SYS.FETCHING_PROFILE_DATA...
                                </div>
                            ) : fields.length === 0 ? (
                                <div className="col-span-full font-mono text-xs text-muted-foreground">
                                    AUCUNE VARIABLE SYSTÈME CONFIGURÉE POUR CE PROFIL.
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {fields.map((field) => (
                                        <motion.div 
                                            key={field.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col gap-3"
                                        >
                                            <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">
                                                {field.field_label} {field.is_required && '*'}
                                            </label>
                                            
                                            {field.field_type === 'select' && field.options ? (
                                                <select 
                                                    className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm"
                                                    value={formData[field.field_name] || ''}
                                                    onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                                                    required={field.is_required}
                                                >
                                                    <option value="" disabled className="bg-card text-muted-foreground">SÉLECTIONNER...</option>
                                                    {field.options.map(opt => (
                                                        <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input 
                                                    type={field.field_type === 'email' ? 'email' : 'text'} 
                                                    className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm placeholder:text-muted-foreground/60" 
                                                    placeholder="SAISIE REQUISE"
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
                    </div>

                    {/* Section 02: Sélection Protocole (Dynamique) */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="flex items-center gap-4 md:gap-6">
                            <span className="font-mono text-xs bg-foreground text-background px-3 py-1 font-black">02</span>
                            <h2 className="text-xl md:text-2xl relative">
                                CONFIG_PROTOCOLE
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {services.length === 0 && !isLoadingData ? (
                                <div className="col-span-full font-mono text-xs text-muted-foreground">
                                    AUCUN PROTOCOLE ACTIF EN BASE DE DONNÉES.
                                </div>
                            ) : (
                                services.map((service) => (
                                    <label key={service.id} className="flex items-center justify-between p-4 md:p-5 border hover:bg-muted cursor-pointer transition-colors group rounded-[var(--radius)]">
                                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground">{service.label}</span>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedServices.includes(service.id)}
                                            onChange={() => toggleService(service.id)}
                                            className="w-5 h-5 rounded-none border accent-primary focus:ring-0 focus:ring-offset-0 bg-transparent shrink-0" 
                                        />
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Submit Button & Status */}
                    <div className="pt-16 md:pt-20">
                        {statusMessage && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className={`mb-6 p-4 border font-mono text-xs uppercase tracking-widest text-center ${statusMessage.type === 'error' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}`}
                            >
                                {statusMessage.text}
                            </motion.div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isSubmitting || isLoadingData}
                            className="w-full relative group overflow-hidden border border-primary p-6 md:p-8 flex flex-col items-center justify-center gap-2 transition-colors duration-300 hover:bg-primary rounded-[var(--radius)] disabled:opacity-50 disabled:hover:bg-transparent"
                        >
                            <span className="relative z-10 text-xl md:text-2xl text-primary group-hover:text-primary-foreground transition-colors duration-300">
                                {isSubmitting ? 'TRANSMISSION EN COURS...' : 'VALIDER LE PROTOCOLE'}
                            </span>
                            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-muted-foreground group-hover:text-primary-foreground/70 transition-colors duration-300">
                                TRANSMIT_DATA_TO_WORKSHOP
                            </span>
                        </button>
                    </div>
                </form>

                {/* Footer Technical Metadata */}
                <div className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-16 border-t font-mono text-[10px] text-muted-foreground uppercase tracking-widest relative">
                    <div className="absolute -top-[1px] left-0 w-12 h-[1px] bg-primary" />
                    <div className="space-y-3">
                        <span className="text-primary font-black">STATION_DE_TRAVAIL</span><br />
                        75 AVENUE DES CHAMPS-ÉLYSÉES<br />
                        PARIS_UNIT.01 / FR
                    </div>
                    <div className="space-y-3">
                        <span className="text-primary font-black">PROTOCOLE_SÉCURISÉ</span><br />
                        ENCRYPTION: AES_256_ACTIVE<br />
                        DATA_STATION: P2P_SYNC
                    </div>
                    <div className="space-y-3 text-left md:text-right">
                        <span className="text-primary font-black">LOG_AUTH_CERT</span><br />
                        CERT_ID: #4582-PC-2026<br />
                        STATUS: READY_FOR_UPLINK
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
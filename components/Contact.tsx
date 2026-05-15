"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const cubicBezier = [0.22, 1, 0.36, 1] as any;

const maskReveal = {
  initial: { clipPath: 'inset(100% 0 0 0)' },
  whileInView: { clipPath: 'inset(0 0 0 0)' },
  viewport: { once: true },
  transition: { duration: 1.2, ease: cubicBezier }
};

const Contact = () => {
    const [profile, setProfile] = React.useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const profiles = ['PARTICULIER', 'ENTREPRISE'] as const;

    return (
        // MODIFIÉ: Ajout de padding responsive pour les côtés
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
                        // MODIFIÉ: Taille de police et hauteur de ligne adaptatives
                        className="text-5xl sm:text-6xl md:text-8xl text-primary leading-tight md:leading-[0.85]"
                    >
                        BON DE <br /> COMMANDE
                    </motion.h1>
                </div>

                {/* Profile Selector */}
                {/* MODIFIÉ: Padding responsive pour être moins large sur mobile */}
                <div className="flex relative gap-0 border bg-muted mb-16 md:mb-20 p-1 w-fit rounded-[var(--radius)]">
                    {profiles.map((p) => (
                        <button
                            key={p}
                            onClick={() => setProfile(p)}
                            // MODIFIÉ: Padding responsive, taille de police légèrement augmentée sur mobile
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
                {/* MODIFIÉ: Espacement entre sections réduit sur mobile */}
                <form className="space-y-16 md:space-y-20">
                    {/* Section 01: Identification */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="flex items-center gap-4 md:gap-6">
                            <span className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 font-black">01</span>
                            {/* MODIFIÉ: Taille de police responsive */}
                            <h2 className="text-xl md:text-2xl relative">
                                IDENTIFICATION_CLIENT
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        {/* MODIFIÉ: Espacement de la grille (gap) rendu responsive */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12">
                            <AnimatePresence mode="popLayout">
                                {profile === 'ENTREPRISE' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: cubicBezier }}
                                        className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12 overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-3">
                                            {/* MODIFIÉ: Taille de label responsive pour meilleure lisibilité mobile */}
                                            <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">SOCIÉTÉ_NAME</label>
                                            <input type="text" className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm placeholder:text-muted-foreground/60" placeholder="RAISON SOCIALE" />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">SIRET_ID</label>
                                            <input type="text" className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm placeholder:text-muted-foreground/60" placeholder="14 CHIFFRES" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">REP_NOM</label>
                                <input type="text" className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm placeholder:text-muted-foreground/60" placeholder="NOM COMPLET" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">CANAL_COMM</label>
                                <input type="email" className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm placeholder:text-muted-foreground/60" placeholder="EMAIL@WORK.FR" />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Spécifications Unité (avec les mêmes modifications) */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="flex items-center gap-4 md:gap-6">
                            <span className="font-mono text-xs bg-foreground text-background px-3 py-1 font-black">02</span>
                            <h2 className="text-xl md:text-2xl relative">
                                UNIT_SPECIFICATIONS
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12">
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">MARQUE_MODÈLE</label>
                                <input type="text" className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm placeholder:text-muted-foreground/60" placeholder="EX: PORSCHE 911" />
                            </div>

                        <div className="flex flex-col gap-3">
                            <label className="font-mono text-[10px] md:text-[9px] text-primary uppercase tracking-[0.2em] font-bold">ÉTAT_INITIAL</label>
                            <select className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm">
                                {/* On ajoute des classes pour que les options suivent le thème */}
                                <option className="bg-card text-foreground">NEUF_FACTORY</option>
                                <option className="bg-card text-foreground">USAGE_MODÉRE</option>
                                <option className="bg-card text-foreground">RESTAURATION_REQUISE</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    {/* Section 03: Sélection Protocole */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="flex items-center gap-4 md:gap-6">
                            <span className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 font-black">03</span>
                            <h2 className="text-xl md:text-2xl relative">
                                CONFIG_PROTOCOLE
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {[
                                { id: 'CER_9H', label: 'CERAMIC_COATING_9H' },
                                { id: 'COR_ST3', label: 'PAINT_CORRECTION_ST3' },
                                { id: 'PPF_FULL', label: 'PPF_FULL_BODY_SHIELD' },
                                { id: 'INT_PRO', label: 'INTERIOR_REMASTER_PRO' }
                            ].map((service) => (
                                // MODIFIÉ: Padding responsive et taille de police augmentée
                                <label key={service.id} className="flex items-center justify-between p-4 md:p-5 border hover:bg-muted cursor-pointer transition-colors group rounded-[var(--radius)]">
                                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground">{service.label}</span>
                                    <input type="checkbox" className="w-5 h-5 rounded-none border accent-primary focus:ring-0 focus:ring-offset-0 bg-transparent shrink-0" />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-16 md:pt-20">
                        {/* MODIFIÉ: Padding, tailles de police et tracking responsives */}
                        <button type="submit" className="w-full relative group overflow-hidden border border-primary p-6 md:p-8 flex flex-col items-center justify-center gap-2 transition-colors duration-300 hover:bg-primary rounded-[var(--radius)]">
                            <span className="relative z-10 text-xl md:text-2xl text-primary group-hover:text-primary-foreground transition-colors duration-300">
                                VALIDER LE PROTOCOLE
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
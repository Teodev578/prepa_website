"use client";
import React from "react";
import { motion } from "framer-motion";

const cubicBezier = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: cubicBezier }
};

const maskReveal = {
  initial: { clipPath: 'inset(100% 0 0 0)' },
  whileInView: { clipPath: 'inset(0 0 0 0)' },
  viewport: { once: true },
  transition: { duration: 1.2, ease: cubicBezier }
};

import { AnimatePresence } from "framer-motion";

const Contact = () => {
    const [profile, setProfile] = React.useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');

    return (
        <section className="bg-white text-foreground min-h-screen pt-32 pb-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-24 relative">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-[#9B2C2C]" />
                        <span className="font-mono text-[#9B2C2C] uppercase tracking-[0.3em] text-[10px]">DOC_REF: ORD_2026_PREPA_V2</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        className="font-black text-6xl md:text-9xl text-[#9B2C2C] uppercase leading-[0.85] tracking-tighter"
                    >
                        BON DE <br /> COMMANDE
                    </motion.h1>
                </div>

                {/* Profile Selector */}
                <div className="flex gap-0 border-[0.5px] border-border mb-20 p-1 bg-neutral-50 w-fit">
                    {(['PARTICULIER', 'ENTREPRISE'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setProfile(p)}
                            className={`px-8 py-3 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                                profile === p 
                                ? 'bg-[#9B2C2C] text-white' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Technical Form */}
                <form className="space-y-20">
                    {/* Section 01: Identification */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <span className="font-mono text-xs bg-[#9B2C2C] text-white px-3 py-1 font-black">01</span>
                            <h2 className="font-black text-2xl uppercase tracking-tight relative">
                                IDENTIFICATION_CLIENT
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                            <AnimatePresence mode="popLayout">
                                {profile === 'ENTREPRISE' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: cubicBezier }}
                                        className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 pb-12 overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-[0.2em] font-bold">SOCIÉTÉ_NAME</label>
                                            <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm placeholder:text-neutral-200" placeholder="RAISON SOCIALE" />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-[0.2em] font-bold">SIRET_ID</label>
                                            <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans text-sm placeholder:text-neutral-200" placeholder="14 CHIFFRES" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-[0.2em] font-bold">REP_NOM</label>
                                <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm placeholder:text-neutral-200" placeholder="NOM COMPLET" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-[0.2em] font-bold">CANAL_COMM</label>
                                <input type="email" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans text-sm placeholder:text-neutral-200" placeholder="EMAIL@WORK.FR" />
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Spécifications Unité */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <span className="font-mono text-xs bg-[#201c1d] text-white px-3 py-1 font-black">02</span>
                            <h2 className="font-black text-2xl uppercase tracking-tight relative">
                                UNIT_SPECIFICATIONS
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-[0.2em] font-bold">MARQUE_MODÈLE</label>
                                <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm placeholder:text-neutral-200" placeholder="EX: PORSCHE 911" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-[0.2em] font-bold">ÉTAT_INITIAL</label>
                                <select className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm">
                                    <option>NEUF_FACTORY</option>
                                    <option>USAGE_MODÉRE</option>
                                    <option>RESTAURATION_REQUISE</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 03: Sélection Protocole */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <span className="font-mono text-xs bg-[#9B2C2C] text-white px-3 py-1 font-black">03</span>
                            <h2 className="font-black text-2xl uppercase tracking-tight relative">
                                CONFIG_PROTOCOLE
                                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-border" />
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: 'CER_9H', label: 'CERAMIC_COATING_9H' },
                                { id: 'COR_ST3', label: 'PAINT_CORRECTION_ST3' },
                                { id: 'PPF_FULL', label: 'PPF_FULL_BODY_SHIELD' },
                                { id: 'INT_PRO', label: 'INTERIOR_REMASTER_PRO' }
                            ].map((service) => (
                                <label key={service.id} className="flex items-center justify-between p-5 border-[0.5px] border-border hover:bg-neutral-50 cursor-pointer transition-all group">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground">{service.label}</span>
                                    <input type="checkbox" className="w-4 h-4 rounded-none border-[0.5px] border-border text-[#9B2C2C] focus:ring-0 focus:ring-offset-0" />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button - Order Form Style */}
                    <div className="pt-20">
                        <button type="submit" className="w-full relative group overflow-hidden border border-[#9B2C2C] p-8 flex flex-col items-center justify-center gap-2 transition-all duration-500 hover:bg-[#9B2C2C]">
                            <span className="relative z-10 font-black text-2xl uppercase tracking-tighter text-[#9B2C2C] group-hover:text-white transition-colors duration-500">
                                VALIDER LE PROTOCOLE
                            </span>
                            <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.5em] text-muted-foreground group-hover:text-white/60 transition-colors duration-500">
                                TRANSMIT_DATA_TO_WORKSHOP
                            </span>
                        </button>
                    </div>
                </form>

                {/* Footer Technical Metadata */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t-[0.5px] border-border font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em] relative">
                    <div className="absolute -top-[1px] left-0 w-12 h-[1px] bg-[#9B2C2C]" />
                    <div className="space-y-3">
                        <span className="text-[#9B2C2C] font-black">STATION_DE_TRAVAIL</span><br />
                        75 AVENUE DES CHAMPS-ÉLYSÉES<br />
                        PARIS_UNIT.01 / FR
                    </div>
                    <div className="space-y-3">
                        <span className="text-[#9B2C2C] font-black">PROTOCOLE_SÉCURISÉ</span><br />
                        ENCRYPTION: AES_256_ACTIVE<br />
                        DATA_STATION: P2P_SYNC
                    </div>
                    <div className="space-y-3 md:text-right">
                        <span className="text-[#9B2C2C] font-black">LOG_AUTH_CERT</span><br />
                        CERT_ID: #4582-PC-2026<br />
                        STATUS: READY_FOR_UPLINK
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

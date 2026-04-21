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

const Contact = () => {
    return (
        <section className="bg-white text-foreground min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-24 border-b-[0.5px] border-border pb-12">
                    <motion.div {...fadeInUp} className="mb-4">
                        <span className="font-mono text-[#9B2C2C] uppercase tracking-widest text-xs">DOC_REF: ORD_2026_PREPA</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        className="font-black text-5xl md:text-8xl text-[#9B2C2C] uppercase leading-[0.85] tracking-tighter"
                    >
                        PROTOCOLE <br /> DE COMMANDE
                    </motion.h1>
                </div>

                {/* Technical Form */}
                <form className="space-y-16">
                    {/* Section 01: Identification */}
                    <motion.div {...fadeInUp} className="space-y-12">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs bg-[#9B2C2C] text-white px-2 py-1">01</span>
                            <h2 className="font-black text-xl uppercase tracking-widest">IDENTIFICATION CLIENT</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-widest">NOM_CLIENT</label>
                                <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm" placeholder="NOM COMPLET" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-widest">EMAIL_STATION</label>
                                <input type="email" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans text-sm" placeholder="ADRESSE@LOG.COM" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 02: Spécifications Véhicule */}
                    <motion.div {...fadeInUp} className="space-y-12 pt-12 border-t-[0.5px] border-border">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs bg-[#9B2C2C] text-white px-2 py-1">02</span>
                            <h2 className="font-black text-xl uppercase tracking-widest">UNIT_IDENTIFICATION</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-widest">MARQUE_MODELE</label>
                                <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm" placeholder="EX: PORSCHE 992 GT3" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[9px] text-[#9B2C2C] uppercase tracking-widest">CHASSIS_VIN</label>
                                <input type="text" className="bg-transparent border-0 border-b-[0.5px] border-border py-2 focus:ring-0 focus:border-[#9B2C2C] transition-all font-sans uppercase text-sm" placeholder="LONGITUDINAL_CODE" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 03: Sélection Services */}
                    <motion.div {...fadeInUp} className="space-y-12 pt-12 border-t-[0.5px] border-border">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs bg-[#9B2C2C] text-white px-2 py-1">03</span>
                            <h2 className="font-black text-xl uppercase tracking-widest">PROTOCOLE_REQUIS</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['CERAMIC_COATING_9H', 'PAINT_CORRECTION_ST3', 'PPF_FULL_BODY', 'INTERIOR_REMASTER'].map((service) => (
                                <label key={service} className="flex items-center gap-4 group cursor-pointer border-[0.5px] border-border p-4 hover:border-[#9B2C2C] transition-all">
                                    <input type="checkbox" className="w-4 h-4 rounded-none border-[0.5px] border-border text-[#9B2C2C] focus:ring-0" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest">{service}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    {/* Section 04: Validation */}
                    <motion.div {...fadeInUp} className="pt-24">
                        <button type="submit" className="w-full bg-[#9B2C2C] text-white py-6 font-black uppercase text-xl tracking-tighter hover:bg-[#802424] transition-all flex items-center justify-center gap-4">
                            TRANSMETTRE LA COMMANDE 
                            <span className="font-mono text-xs opacity-50 underline">[PUSH_DATA]</span>
                        </button>
                    </motion.div>
                </form>

                {/* Footer Technical Metadata */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t-[0.5px] border-border font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                    <div className="space-y-2">
                        <span className="text-[#9B2C2C]">Workshop_Location:</span><br />
                        75 AVENUE DES CHAMPS-ÉLYSÉES<br />
                        PARIS 75008 / FR
                    </div>
                    <div className="space-y-2">
                        <span className="text-[#9B2C2C]">Encrypted_Channel:</span><br />
                        +33 1 23 45 67 89<br />
                        P2P_VOICE_ACTIVE
                    </div>
                    <div className="space-y-2 text-right">
                        <span className="text-[#9B2C2C]">Security_Token:</span><br />
                        PREP_AUTH_CERT_OFFICIAL<br />
                        VALID_UNTIL: 2027.TC
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

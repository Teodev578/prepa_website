"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TechnicalServices = () => {
    const titleLines = ["INGÉNIERIE", "DU DETAILING."];

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: BEZIER } 
        }
    };

    return (
        <section className="bg-background text-foreground relative border-y border-border mt-12 overflow-hidden w-full max-w-[100vw]">
            {/* Huge Title Area */}
            <div className="py-16 md:py-32 px-4 md:px-8 border-b border-border relative">
                {/* Crosshairs + Decor */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute top-0 left-0 -translate-x-[0.5px] -translate-y-[0.5px] text-primary font-mono text-lg leading-none hidden md:block"
                >
                    +
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="absolute top-0 right-0 translate-x-[0.5px] -translate-y-[0.5px] text-primary font-mono text-lg leading-none hidden md:block"
                >
                    +
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="absolute bottom-0 left-0 -translate-x-[0.5px] translate-y-[0.5px] text-primary font-mono text-lg leading-none hidden md:block"
                >
                    +
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="absolute bottom-0 right-0 translate-x-[0.5px] translate-y-[0.5px] text-primary font-mono text-lg leading-none hidden md:block"
                >
                    +
                </motion.div>
                
                <h2 className="font-sans font-black text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.8] tracking-tighter uppercase max-w-full break-words relative z-10">
                    {titleLines.map((line, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.div
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: BEZIER }}
                            >
                                {line}
                            </motion.div>
                        </div>
                    ))}
                </h2>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, ease: BEZIER }}
                    className="absolute top-8 right-8 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                >
                    <span>SYS.01.ACTIVE // VERSION_3.0</span>
                    <span>COORD: 45.NX // 09.TY</span>
                    <div className="flex gap-px mt-4 items-end h-6">
                        {/* Barcode UI */}
                        {[1, 3, 1, 2, 1, 4, 1, 2, 1, 5].map((w, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ height: 0 }}
                                whileInView={{ height: idx % 3 === 0 ? "100%" : (idx % 2 === 0 ? "70%" : "50%") }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + idx * 0.03, duration: 0.4, ease: BEZIER }}
                                className="bg-foreground" 
                                style={{ width: `${w}px` }}
                            ></motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Services Grid (Affiche Style) */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ staggerChildren: 0.15 }}
                className="flex flex-col md:flex-row w-full"
            >
                {/* ---------- CARD 01 ---------- */}
                <motion.div variants={cardVariants} className="flex-1 border-b md:border-b-0 md:border-r border-border p-6 md:p-10 relative group">
                    <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground bg-muted px-2 py-1">SEC.01</div>
                    <div className="mb-12">
                        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">ENTRÉE // BASIC</span>
                        <h3 className="font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter">ESSENTIEL.</h3>
                    </div>
                    
                    <div className="space-y-8 font-mono text-xs md:text-sm">
                        {/* Subtitle: Spécifications */}
                        <div>
                            <div className="flex justify-between items-end border-b border-border pb-2 mb-3">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Spécifications</span>
                                <span className="text-primary font-bold bg-primary/10 px-2 py-1">149 EUR</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-3"><span className="text-primary">■</span> Lavage extérieur à la main (PH neutre)</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Décontamination ferreuse des jantes</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Aspiration approfondie de l'habitacle</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Nettoyage des vitres intérieures</li>
                            </ul>
                        </div>
                        
                        {/* Subtitle: Matériaux */}
                        <div>
                            <div className="border-b border-border pb-2 mb-3">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Matériaux (Base)</span>
                            </div>
                            <p className="opacity-80">Shampoing polymère avancé, Cire express hydrophobe en spray.</p>
                        </div>
                        
                        {/* Subtitle: Durabilité */}
                        <div>
                            <div className="flex justify-between items-end pb-2 mb-2">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Durabilité / Impact</span>
                                <span>LVL. 30</span>
                            </div>
                            <div className="w-full h-2 bg-muted relative overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "30%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5, ease: BEZIER }}
                                    className="absolute top-0 left-0 h-full bg-primary group-hover:brightness-125 transition-all"
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ---------- CARD 02 (INVERTED / HERO PACKAGE) ---------- */}
                <motion.div variants={cardVariants} className="flex-1 border-b md:border-b-0 md:border-r border-border p-6 md:p-10 relative group bg-foreground text-background">
                    {/* Highlighter Line */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-0 w-full md:w-[2px] h-[2px] md:h-full bg-primary z-10 origin-left"
                    ></motion.div>
                    
                    <div className="absolute top-4 right-4 font-mono text-xs text-background/50 bg-background/10 px-2 py-1">SEC.02</div>
                    <div className="mb-12">
                        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-1">ÉQUILIBRE // POPULAR</span>
                        <h3 className="font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter text-background leading-[0.9]">ÉCLAT.</h3>
                    </div>
                    
                    <div className="space-y-8 font-mono text-xs md:text-sm">
                        <div>
                            <div className="flex justify-between items-end border-b border-background/20 pb-2 mb-3">
                                <span className="uppercase text-background/50 tracking-widest font-bold">Spécifications</span>
                                <span className="text-primary font-bold bg-primary/20 px-2 py-1">399 EUR</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-3"><span className="text-primary">■</span> Décontamination carrosserie complète</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Polissage One-Step (correction modérée)</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Cire de protection haute performance</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Nettoyage vapeur approfondi sièges/tissus</li>
                            </ul>
                        </div>
                        
                        <div>
                            <div className="border-b border-background/20 pb-2 mb-3">
                                <span className="uppercase text-background/50 tracking-widest font-bold">Matériaux (Pro)</span>
                            </div>
                            <p className="text-background/80">Compound abrasif micro-fin, Cire naturelle de Carnauba Grade A.</p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-end pb-2 mb-2">
                                <span className="uppercase text-background/50 tracking-widest font-bold">Durabilité / Impact</span>
                                <span>LVL. 70</span>
                            </div>
                            <div className="w-full h-2 bg-background/20 relative overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "70%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.6, ease: BEZIER }}
                                    className="absolute top-0 left-0 h-full bg-primary"
                                ></motion.div>
                                {/* Technical indicators on gauge */}
                                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-foreground/50"></div>
                                <div className="absolute top-0 left-2/4 h-full w-[1px] bg-foreground/50"></div>
                                <div className="absolute top-0 left-3/4 h-full w-[1px] bg-foreground/50"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ---------- CARD 03 ---------- */}
                <motion.div variants={cardVariants} className="flex-1 p-6 md:p-10 relative group bg-card">
                    <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground bg-muted px-2 py-1">SEC.03</div>
                    <div className="mb-12">
                        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">MAXIMUM // ULTIMATE</span>
                        <h3 className="font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter">ÉLITE.</h3>
                    </div>
                    
                    <div className="space-y-8 font-mono text-xs md:text-sm">
                        <div>
                            <div className="flex justify-between items-end border-b border-border pb-2 mb-3">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Spécifications</span>
                                <span className="text-primary font-bold bg-primary/10 px-2 py-1">899 EUR</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-3"><span className="text-primary">■</span> Correction peinture multi-étapes (95%+)</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Traitement Céramique 9H (Carrosserie)</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Protection céramique jantes & vitres</li>
                                <li className="flex gap-3"><span className="text-primary">■</span> Détail chirurgical compartiment moteur</li>
                            </ul>
                        </div>
                        
                        <div>
                            <div className="border-b border-border pb-2 mb-3">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Matériaux (Nanotech)</span>
                            </div>
                            <p className="opacity-80">Revêtement Nano-Céramique 9H enrichi au Graphène (2 ans de protection).</p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-end pb-2 mb-2">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Durabilité / Impact</span>
                                <span className="text-primary animate-pulse">LVL. 99+</span>
                            </div>
                            <div className="w-full h-2 bg-muted relative overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "98%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.7, ease: BEZIER }}
                                    className="absolute top-0 left-0 h-full bg-primary"
                                ></motion.div>
                                {/* Technical indicators on gauge */}
                                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-background"></div>
                                <div className="absolute top-0 left-2/4 h-full w-[1px] bg-background"></div>
                                <div className="absolute top-0 left-3/4 h-full w-[1px] bg-background"></div>
                                <div className="absolute top-0 left-[90%] h-full w-[1px] bg-background"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            
            {/* Footer Diagram Elements */}
            <div className="h-4 border-t border-border flex">
                <div className="w-1/3 border-r border-border h-full flex items-center px-2">
                   <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: BEZIER }}
                    className="w-full h-[1px] bg-muted-foreground/30 origin-left"
                   ></motion.div>
                </div>
                <div className="w-1/3 border-r border-border h-full flex items-center justify-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest"
                    >
                        SYSTEM_READY
                    </motion.span>
                </div>
                <div className="w-1/3 h-full flex items-center px-2">
                   <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: BEZIER }}
                    className="w-full h-[1px] bg-muted-foreground/30 origin-right"
                   ></motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalServices;

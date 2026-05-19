"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BEZIER = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ExcellencePhilosophy = () => {
    // 🚀 BUSINESS : Des arguments concrets tirés du cahier des charges (Fini le jargon technique)
    const metrics = [
        { title: "-3 À -7 JOURS", subtitle: "DE DÉLAI DE MISE EN VENTE" },
        { title: "FORCES DE FRAPPE", subtitle: "RENFORT IMMÉDIAT SUR SITE" },
        { title: "COÛTS 100% VARIABLES", subtitle: "FACTURATION À L'UNITÉ OU FORFAIT" },
        { title: "SÉCURITÉ TOTALE", subtitle: "ASSURANCE CONVOYAGE & PRÉPARATION" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: BEZIER } }
    };

    return (
        <section className="bg-background text-foreground relative border-b border-border w-full max-w-[100vw] overflow-hidden h-auto">
            
            {/* Grille d'indicateurs de performance commerciale */}
            <div className="flex flex-col md:flex-row border-b border-border">
                <div className="md:w-16 border-b md:border-b-0 md:border-r border-border flex items-center justify-center font-mono text-[9px] text-muted-foreground p-3 md:p-0 md:rotate-180 md:[writing-mode:vertical-rl] tracking-widest uppercase bg-muted/10 font-bold select-none">
                    PERFORMANCES_PARTENAIRES
                </div>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full"
                >
                    {metrics.map((metric, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            className={`border-border p-6 md:p-8 flex flex-col justify-center gap-2 h-28 md:h-36 bg-card hover:bg-muted/40 transition-colors relative ${
                                idx < 3 ? 'border-b sm:border-b-0 sm:border-r' : ''
                            }`}
                        >
                            <h4 className="font-sans font-black text-xl md:text-2xl text-primary tracking-tight">{metric.title}</h4>
                            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">{metric.subtitle}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Contenu de présentation de la philosophie d'entreprise */}
            <div className="px-6 py-16 md:px-12 lg:px-24 md:py-24 relative max-w-7xl mx-auto">
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    
                    {/* Colonne gauche : Le Titre accrocheur */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5 font-bold">VALEURS</span>
                            <div className="w-16 h-[1px] bg-border" />
                        </div>
                        <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] uppercase tracking-tighter leading-[0.95] text-foreground">
                            NOTRE VISION <br />
                            <span className="text-primary">DE LA COOPÉRATION.</span>
                        </h2>
                    </div>

                    {/* Colonne droite : Les explications orientées bénéfices business */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm md:text-base text-muted-foreground leading-relaxed pt-2 lg:pt-12">
                        <div className="space-y-4">
                            {/* 🚀 SEO : Remplacement du <p> par un véritable <h3> sémantique contenant des mots-clés forts */}
                            <h3 className="font-sans font-bold text-foreground uppercase tracking-tight text-xs border-b pb-1 border-border/60">
                                Fluidifier votre logistique interne
                            </h3>
                            <p className="text-sm">
                                La gestion des équipes de préparation est un défi quotidien. Entre les congés, le recrutement et les variations d'activité, maintenir un flux constant est un casse-tête. LAW CLEAN CENTER élimine cette rigidité en devenant votre force de frappe externe.
                            </p>
                        </div>
                        
                        <div className="space-y-4 flex flex-col justify-between h-full">
                            <div>
                                {/* 🚀 SEO : Idem ici, transformation en <h3> pour indexer "Rentabiliser chaque véhicule en parc" */}
                                <h3 className="font-sans font-bold text-foreground uppercase tracking-tight text-xs border-b pb-1 border-border/60">
                                    Rentabiliser chaque véhicule en parc
                                </h3>
                                <p className="text-sm mb-6">
                                    En déléguant la remise à neuf esthétique et le convoyage de vos véhicules neufs et d'occasion, vous transformez une masse salariale fixe en une charge variable à l'unité, maximisant ainsi la marge brute par véhicule vendu.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full sm:w-auto">
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative border border-primary px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-between gap-4 rounded-[var(--radius)]"
                                >
                                    <span>PROGRAMMER UN FORFAIT TEST</span>
                                    <span className="text-primary group-hover:text-primary-foreground transition-colors">→</span>
                                </motion.div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExcellencePhilosophy;
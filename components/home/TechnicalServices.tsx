"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RevealText from '@/components/RevealText';

const BEZIER = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Hoisted to module scope — static data, no local state
const titleLines = ["NOS FORFAITS", "PARTENAIRES."];

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: BEZIER } 
    }
};

const TechnicalServices = () => {
    return (
        <section className="bg-background text-foreground relative border-y border-border mt-0 overflow-hidden w-full max-w-[100vw] h-auto">
            {/* Zone du Grand Titre de la Section */}
            <div className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-border relative">
                
                {/* 🚀 FIXED : Animation simplifiée et blindée qui ignore les conflits d'héritage parent */}
                <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tighter uppercase max-w-full break-words relative z-10 text-foreground">
                    <RevealText text="NOS FORFAITS PARTENAIRES." delay={0.1} />
                </h2>
                
                {/* Métadonnées épurées et professionnelles */}
                <div className="absolute top-8 right-6 md:right-12 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-widest select-none">
                    <span className="text-primary font-bold">OFFRES EN FLUX TENDUS</span>
                    <span>ZONE D'INTERVENTION : ÎLE-DE-FRANCE</span>
                </div>
            </div>

            {/* Grille des Forfaits B2B */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                transition={{ staggerChildren: 0.1 }}
                className="flex flex-col lg:flex-row w-full items-stretch"
            >
                {/* ---------- CARTE 01 : PONCTUEL / URGENCE ---------- */}
                <motion.article variants={cardVariants} className="flex-1 border-b lg:border-b-0 lg:border-r border-border p-8 md:p-10 flex flex-col justify-between bg-card group">
                    <div>
                        <div className="mb-10">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-2 font-bold">// BESOIN IMMÉDIAT</span>
                            <h3 className="font-sans font-black text-3xl lg:text-4xl uppercase tracking-tighter text-foreground">FORFAIT URGENCE</h3>
                        </div>
                        
                        <div className="space-y-6 font-sans text-sm text-muted-foreground">
                            <p className="text-foreground/90 font-medium leading-relaxed">
                                Idéal pour pallier une absence imprévue dans vos équipes ou absorber un pic d'activité soudain.
                            </p>
                            <ul className="space-y-3 pt-4 border-t border-border/60">
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Renfort opérationnel au pied levé</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Remplacement immédiat sur site</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Préparation esthétique de vos lots urgents</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Tarification flexible sur devis selon volume</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10">
                        <Link href="/contact" className="w-full block text-center border border-border py-3 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-foreground group-hover:text-background transition-colors rounded-[var(--radius)]">
                            DEMANDER UN RENFORCEMENT
                        </Link>
                    </div>
                </motion.article>

                {/* ---------- CARTE 02 : CONTRAT CADRE FLEXIBILITÉ ---------- */}
                <motion.article variants={cardVariants} className="flex-1 border-b lg:border-b-0 lg:border-r border-border p-8 md:p-10 flex flex-col justify-between bg-foreground text-background relative group">
                    <div>
                        <div className="mb-10">
                            <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block mb-2 font-bold">// CONTRAT CADRE 6 MOIS</span>
                            <h3 className="font-sans font-black text-3xl lg:text-4xl uppercase tracking-tighter text-background">FLEXIBILITÉ</h3>
                        </div>
                        
                        <div className="space-y-6 font-sans text-sm text-background/80">
                            <p className="text-background font-medium leading-relaxed">
                                Conçu pour les parcs automobiles nécessitant un suivi régulier à moyen terme sans embauche fixe.
                            </p>
                            <ul className="space-y-3 pt-4 border-t border-background/20">
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Engagement structuré sur une période de 6 mois</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Volume de 10 jours d'intervention par mois</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Préparation esthétique complète (VN / VO)</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Intégration de la logistique & convoyage inter-sites</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10">
                        <Link href="/contact" className="w-full block text-center border border-background/30 py-3 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-background text-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-[background-color,color] rounded-[var(--radius)]">
                            ÉTABLIR UN CONTRAT 6 MOIS
                        </Link>
                    </div>
                </motion.article>

                {/* ---------- CARTE 03 : CONTRAT CADRE EXPERT ---------- */}
                <motion.article variants={cardVariants} className="flex-1 p-8 md:p-10 flex flex-col justify-between bg-card group">
                    <div>
                        <div className="mb-10">
                            <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-2 font-bold">// PARTENARIAT RECURRENT 12 MOIS</span>
                            <h3 className="font-sans font-black text-3xl lg:text-4xl uppercase tracking-tighter text-foreground">FORFAIT EXPERT</h3>
                        </div>
                        
                        <div className="space-y-6 font-sans text-sm text-muted-foreground">
                            <p className="text-foreground/90 font-medium leading-relaxed">
                                L'externalisation totale et permanente de votre pôle préparation pour une visibilité financière parfaite.
                            </p>
                            <ul className="space-y-3 pt-4 border-t border-border/60">
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Engagement long terme (minimum 12 mois)</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Présence mensuelle garantie de 21 jours</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Prise en charge intégrale du flux et reporting rigoureux</li>
                                <li className="flex gap-3 items-start"><span className="text-primary">■</span> Optimisation maximale de la marge par véhicule</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10">
                        <Link href="/contact" className="w-full block text-center border border-border py-3 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-primary group-hover:text-primary-foreground transition-colors rounded-[var(--radius)]">
                            ACTIVER LA COUVERTURE TOTALE
                        </Link>
                    </div>
                </motion.article>
            </motion.div>
            
            {/* Ligne de fermeture technique basse */}
            <div className="h-4 border-t border-border bg-muted/5"></div>
        </section>
    );
};

export default TechnicalServices;
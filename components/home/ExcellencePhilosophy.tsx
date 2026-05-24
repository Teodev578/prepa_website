"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ExcellencePhilosophy = () => {
    return (
        <section className="bg-background text-foreground relative border-b border-border w-full max-w-[100vw] overflow-hidden h-auto">
            
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
                            <h3 className="font-sans font-bold text-foreground uppercase tracking-tight text-xs border-b pb-1 border-border/60">
                                Fluidifier votre logistique interne
                            </h3>
                            <p className="text-sm">
                                La gestion des équipes de préparation est un défi quotidien. Entre les congés, le recrutement et les variations d'activité, maintenir un flux constant est un casse-tête. LAW CLEAN CENTER élimine cette rigidité en devenant votre force de frappe externe.
                            </p>
                        </div>
                        
                        <div className="space-y-4 flex flex-col justify-between h-full">
                            <div>
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
                                    className="group relative border border-secondary px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-between gap-4 rounded-[var(--radius)] cursor-pointer"
                                  >
                                    <span>PROGRAMMER UN FORFAIT TEST</span>
                                    <span className="text-secondary group-hover:text-secondary-foreground transition-colors">→</span>
                                </motion.div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* 🚀 NOUVEAU BLOC : GRILLE DE RÉALISATIONS (FILMSTRIP) POUR INCITER AU CLIC */}
            <div className="w-full border-t border-border grid grid-cols-2 md:grid-cols-4">
                
                {/* Image 1 */}
                <div className="relative aspect-square md:aspect-auto md:h-[40vh] border-b md:border-b-0 border-r border-border group overflow-hidden">
                    <Image 
                        src="/images/1.jpeg" 
                        fill 
                        alt="Préparation esthétique automobile - Réalisation 1" 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                        #OP_01
                    </div>
                </div>

                {/* Image 2 */}
                <div className="relative aspect-square md:aspect-auto md:h-[40vh] border-b md:border-b-0 border-r md:border-r border-border group overflow-hidden">
                    <Image 
                        src="/images/2.jpeg" 
                        fill 
                        alt="Préparation esthétique automobile - Réalisation 2" 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                        #OP_02
                    </div>
                </div>

                {/* Image 3 */}
                <div className="relative aspect-square md:aspect-auto md:h-[40vh] border-r border-border group overflow-hidden">
                    <Image 
                        src="/images/3.jpeg" 
                        fill 
                        alt="Préparation esthétique automobile - Réalisation 3" 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                        #OP_03
                    </div>
                </div>

                {/* Bloc 4 : Call To Action Massif (Redirection Portfolio) */}
                <Link href="/portfolio" className="relative aspect-square md:aspect-auto md:h-[40vh] bg-secondary text-secondary-foreground group flex flex-col items-center justify-center p-6 text-center transition-colors hover:bg-foreground hover:text-background overflow-hidden">
                    {/* Décoration technique animée */}
                    <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-current opacity-50 group-hover:animate-ping" />
                    
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold mb-4 opacity-80">
                        // DÉCOUVREZ NOS RAPPORTS
                    </span>
                    <h3 className="font-sans font-black text-2xl lg:text-3xl uppercase tracking-tighter leading-tight mb-6">
                        VOIR TOUTES NOS <br/>RÉALISATIONS
                    </h3>
                    
                    {/* Bouton flèche */}
                    <div className="w-12 h-12 border-2 border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl -mt-1 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

            </div>

        </section>
    );
};

export default ExcellencePhilosophy;
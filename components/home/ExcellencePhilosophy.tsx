"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ExcellencePhilosophy = () => {
    return (
        <section className="bg-background text-foreground relative border-b border-border w-full max-w-[100vw] overflow-hidden">
            
            <div className="flex flex-col lg:flex-row w-full">
                
                {/* 📝 COLONNE GAUCHE : TEXTE (Prend 1/3 de l'écran sur PC) */}
                <div className="w-full lg:w-1/3 xl:w-4/12 px-6 py-16 md:px-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border z-10 bg-background">
                    
                    {/* Titre */}
                    <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-[0.95] text-foreground mb-10 mt-4 lg:mt-0">
                        NOTRE EXPERTISE <br />
                        EN IMAGES.
                    </h2>
                    {/* Sous-titre */}
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        De la simple remise à neuf au nettoyage extrême, parcourez nos récentes interventions et constatez par vous-même l&apos;impact de notre savoir-faire.
                    </p>
                    {/* Paragraphes */}
                    <div className="flex flex-col gap-8 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {/*
                        <div className="space-y-3">
                            <h3 className="font-sans font-bold text-foreground uppercase tracking-tight text-xs border-b pb-1 border-border/60 inline-block w-full">
                                La qualité au premier regard
                            </h3>
                            <p className="text-sm">
                                Ne nous croyez pas sur parole, jugez sur pièces. Notre niveau d&apos;exigence se reflète instantanément dans chaque véhicule préparé par les équipes LAW CLEAN CENTER.
                            </p>
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="font-sans font-bold text-foreground uppercase tracking-tight text-xs border-b pb-1 border-border/60 inline-block w-full">
                                L&apos;exigence du détail
                            </h3>
                            <p className="text-sm">
                                De la simple remise à neuf au nettoyage extrême, parcourez nos récentes interventions et constatez par vous-même l&apos;impact de notre savoir-faire.
                            </p>
                        </div>
                        */}
                    </div>

                </div>

                {/* 🖼️ COLONNE DROITE : GRILLE D'IMAGES (Prend 2/3 de l'écran sur PC - 3 colonnes x 2 lignes) */}
                <div className="w-full lg:w-2/3 xl:w-8/12 grid grid-cols-2 lg:grid-cols-3 auto-rows-fr h-auto min-h-[60vh] lg:min-h-full">
                    
                    {/* Image 1 */}
                    <div className="relative border-b border-r border-border group overflow-hidden h-[25vh] lg:h-[35vh] min-h-[200px]">
                        <Image 
                            src="/images/6.jpeg" 
                            fill 
                            alt="Préparation esthétique automobile - Réalisation 1" 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                            #OP_01
                        </div>
                    </div>

                    {/* Image 2 */}
                    <div className="relative border-b lg:border-r border-border group overflow-hidden h-[25vh] lg:h-[35vh] min-h-[200px]">
                        <Image 
                            src="/images/7.jpeg" 
                            fill 
                            alt="Préparation esthétique automobile - Réalisation 2" 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                            #OP_02
                        </div>
                    </div>

                    {/* Image 3 */}
                    <div className="relative border-b border-r lg:border-r-0 border-border group overflow-hidden h-[25vh] lg:h-[35vh] min-h-[200px]">
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

                    {/* Image 4 */}
                    <div className="relative border-b lg:border-b-0 lg:border-r border-border group overflow-hidden h-[25vh] lg:h-[35vh] min-h-[200px]">
                        <Image 
                            src="/images/4.jpeg" 
                            fill 
                            alt="Préparation esthétique automobile - Réalisation 4" 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                            #OP_04
                        </div>
                    </div>

                    {/* Image 5 */}
                    <div className="relative border-r border-border group overflow-hidden h-[25vh] lg:h-[35vh] min-h-[200px]">
                        <Image 
                            src="/images/5.jpeg" 
                            fill 
                            alt="Préparation esthétique automobile - Réalisation 5" 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                            #OP_05
                        </div>
                    </div>

                    {/* Bloc 6 : Call To Action Massif (Redirection Portfolio) */}
                    <Link href="/portfolio" className="relative bg-primary text-primary-foreground group flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-secondary hover:text-secondary-foreground overflow-hidden h-[25vh] lg:h-[35vh] min-h-[200px]">
                        {/* Décoration technique animée */}
                        <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-current opacity-50 group-hover:animate-ping" />
                        
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold mb-3 opacity-80">
                            {"// GALERIE COMPLÈTE"}
                        </span>
                        <h3 className="font-sans font-black text-lg xl:text-xl uppercase tracking-tighter leading-tight mb-4">
                            VOIR TOUTES NOS <br/>RÉALISATIONS
                        </h3>
                        
                        {/* Bouton flèche */}
                        <div className="w-10 h-10 border-2 border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-lg -mt-0.5 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>

                </div>

            </div>
        </section>
    );
};

export default ExcellencePhilosophy;
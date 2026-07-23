"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import RevealText from '@/components/RevealText';

const ExcellencePhilosophy = () => {
    // Basic parallax effect for images
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section className="bg-background text-foreground relative border-b border-border w-full max-w-[100vw] overflow-hidden">
            
            <div className="flex flex-col lg:flex-row w-full">
                
                {/* 📝 COLONNE GAUCHE : TEXTE (Prend 1/3 de l'écran sur PC) */}
                <div className="w-full lg:w-1/3 xl:w-4/12 px-6 py-16 md:px-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border z-10 bg-background">
                    
                    {/* Titre */}
                    <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-[0.95] text-foreground mb-10 mt-4 lg:mt-0">
                        <RevealText text={"NOTRE EXPERTISE \n EN IMAGES."} delay={0.2} />
                    </h2>
                    {/* Sous-titre */}
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        De la simple remise à neuf au nettoyage extrême, parcourez nos récentes interventions et constatez par vous-même l&apos;impact de notre savoir-faire.
                    </p>

                </div>

                {/* 🖼️ COLONNE DROITE : GRILLE BENTO (Prend 2/3 de l'écran sur PC) */}
                <div className="w-full lg:w-2/3 xl:w-8/12 bg-muted/20 p-2 md:p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-2 md:gap-4 h-[80vh] md:h-[70vh] min-h-[500px]">
                        
                        {/* Image 1 - Large Rectangle */}
                        <div className="relative border border-border group overflow-hidden rounded-[var(--radius)] col-span-2 md:col-span-2 row-span-2 md:row-span-2">
                            <motion.div style={{ y: yParallax, height: "120%", marginTop: "-10%" }} className="w-full absolute inset-0">
                                <Image 
                                    src="/images/6.jpeg" 
                                    fill 
                                    alt="Préparation esthétique automobile - Réalisation 1" 
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold">
                                #OP_01
                            </div>
                        </div>

                        {/* Image 2 - Square */}
                        <div className="relative border border-border group overflow-hidden rounded-[var(--radius)] col-span-1 md:col-span-1 row-span-1 md:row-span-1">
                            <motion.div style={{ y: yParallax, height: "120%", marginTop: "-10%" }} className="w-full absolute inset-0">
                                <Image 
                                    src="/images/7.jpeg" 
                                    fill 
                                    alt="Préparation esthétique automobile - Réalisation 2" 
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold hidden sm:block">
                                #OP_02
                            </div>
                        </div>

                        {/* Image 3 - Square */}
                        <div className="relative border border-border group overflow-hidden rounded-[var(--radius)] col-span-1 md:col-span-1 row-span-1 md:row-span-1">
                            <motion.div style={{ y: yParallax, height: "120%", marginTop: "-10%" }} className="w-full absolute inset-0">
                                <Image 
                                    src="/images/3.jpeg" 
                                    fill 
                                    alt="Préparation esthétique automobile - Réalisation 3" 
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold hidden sm:block">
                                #OP_03
                            </div>
                        </div>

                        {/* Image 4 - Tall Rectangle */}
                        <div className="relative border border-border group overflow-hidden rounded-[var(--radius)] col-span-2 md:col-span-1 row-span-2 md:row-span-2">
                            <motion.div style={{ y: yParallax, height: "120%", marginTop: "-10%" }} className="w-full absolute inset-0">
                                <Image 
                                    src="/images/4.jpeg" 
                                    fill 
                                    alt="Préparation esthétique automobile - Réalisation 4" 
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold hidden sm:block">
                                #OP_04
                            </div>
                        </div>

                        {/* Image 5 - Square */}
                        <div className="relative border border-border group overflow-hidden rounded-[var(--radius)] col-span-1 md:col-span-1 row-span-1 md:row-span-1">
                            <motion.div style={{ y: yParallax, height: "120%", marginTop: "-10%" }} className="w-full absolute inset-0">
                                <Image 
                                    src="/images/5.jpeg" 
                                    fill 
                                    alt="Préparation esthétique automobile - Réalisation 5" 
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border z-10 text-foreground font-bold hidden sm:block">
                                #OP_05
                            </div>
                        </div>

                        {/* Bloc 6 : Call To Action Massif (Redirection Portfolio) */}
                        <Link href="/portfolio" className="relative bg-primary text-primary-foreground group flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-secondary hover:text-secondary-foreground overflow-hidden rounded-[var(--radius)] col-span-1 md:col-span-2 row-span-1 md:row-span-1">
                            {/* Décoration technique animée */}
                            <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-current opacity-50" />
                            
                            <span className="font-mono text-[9px] uppercase tracking-widest font-bold mb-3 opacity-80 hidden md:block">
                                {"// GALERIE COMPLÈTE"}
                            </span>
                            <h3 className="font-sans font-black text-sm md:text-lg xl:text-xl uppercase tracking-tighter leading-tight md:mb-4">
                                VOIR TOUTES NOS <br className="hidden md:block" />RÉALISATIONS
                            </h3>
                            
                            {/* Bouton flèche */}
                            <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mt-2 md:mt-0">
                                <span className="text-sm md:text-lg -mt-0.5 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default ExcellencePhilosophy;
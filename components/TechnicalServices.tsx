"use client";

import React from 'react';

const TechnicalServices = () => {
    return (
        <section className="bg-background text-foreground relative border-y border-border mt-12 overflow-hidden w-full max-w-[100vw]">
            {/* Huge Title Area */}
            <div className="py-16 md:py-32 px-4 md:px-8 border-b border-border relative">
                {/* Crosshairs + Decor */}
                <div className="absolute top-0 left-0 -translate-x-[0.5px] -translate-y-[0.5px] text-pink-500 font-mono text-lg leading-none">+</div>
                <div className="absolute top-0 right-0 translate-x-[0.5px] -translate-y-[0.5px] text-pink-500 font-mono text-lg leading-none">+</div>
                <div className="absolute bottom-0 left-0 -translate-x-[0.5px] translate-y-[0.5px] text-pink-500 font-mono text-lg leading-none">+</div>
                <div className="absolute bottom-0 right-0 translate-x-[0.5px] translate-y-[0.5px] text-pink-500 font-mono text-lg leading-none">+</div>
                
                <h2 className="font-sans font-black text-6xl md:text-[11vw] leading-[0.8] tracking-tighter uppercase max-w-full break-words relative z-10">
                    INGÉNIERIE<br /> DU DETAILING.
                </h2>
                
                <div className="absolute top-8 right-8 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    <span>SYS.01.ACTIVE // VERSION_3.0</span>
                    <span>COORD: 45.NX // 09.TY</span>
                    <div className="flex gap-px mt-4 items-end h-6">
                        {/* Barcode UI */}
                        <div className="w-[1px] h-full bg-foreground"></div>
                        <div className="w-[3px] h-full bg-foreground"></div>
                        <div className="w-[1px] h-full bg-foreground"></div>
                        <div className="w-[2px] h-[70%] bg-foreground"></div>
                        <div className="w-[1px] h-full bg-foreground"></div>
                        <div className="w-[4px] h-[50%] bg-foreground"></div>
                        <div className="w-[1px] h-full bg-foreground"></div>
                        <div className="w-[2px] h-[90%] bg-foreground"></div>
                        <div className="w-[1px] h-full bg-foreground"></div>
                        <div className="w-[5px] h-full bg-foreground"></div>
                    </div>
                </div>
            </div>

            {/* Services Grid (Affiche Style) */}
            <div className="flex flex-col md:flex-row w-full">
                {/* ---------- CARD 01 ---------- */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-border p-6 md:p-10 relative group">
                    <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground bg-muted px-2 py-1">SEC.01</div>
                    <div className="mb-12">
                        <span className="font-mono text-xs text-pink-500 uppercase tracking-widest block mb-2">ENTRÉE // BASIC</span>
                        <h3 className="font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter">ESSENTIEL.</h3>
                    </div>
                    
                    <div className="space-y-8 font-mono text-[11px] lg:text-xs">
                        {/* Subtitle: Spécifications */}
                        <div>
                            <div className="flex justify-between items-end border-b border-border pb-2 mb-3">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Spécifications</span>
                                <span className="text-pink-500 font-bold bg-pink-500/10 px-2 py-1">149 EUR</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Lavage extérieur à la main (PH neutre)</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Décontamination ferreuse des jantes</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Aspiration approfondie de l'habitacle</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Nettoyage des vitres intérieures</li>
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
                                <div className="absolute top-0 left-0 h-full w-[30%] bg-pink-500 transition-all duration-1000 group-hover:w-[35%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- CARD 02 (INVERTED / HERO PACKAGE) ---------- */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-border p-6 md:p-10 relative group bg-foreground text-background">
                    {/* Highlighter Line */}
                    <div className="absolute top-0 left-0 w-full md:w-[2px] h-[2px] md:h-full bg-pink-500 z-10"></div>
                    
                    <div className="absolute top-4 right-4 font-mono text-xs text-background/50 bg-background/10 px-2 py-1">SEC.02</div>
                    <div className="mb-12">
                        <span className="font-mono text-xs text-pink-500 uppercase tracking-widest block mb-2">ÉQUILIBRE // POPULAR</span>
                        <h3 className="font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter text-background">ÉCLAT.</h3>
                    </div>
                    
                    <div className="space-y-8 font-mono text-[11px] lg:text-xs">
                        <div>
                            <div className="flex justify-between items-end border-b border-background/20 pb-2 mb-3">
                                <span className="uppercase text-background/50 tracking-widest font-bold">Spécifications</span>
                                <span className="text-pink-500 font-bold bg-pink-500/20 px-2 py-1">399 EUR</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Décontamination carrosserie complète</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Polissage One-Step (correction modérée)</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Cire de protection haute performance</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Nettoyage vapeur approfondi sièges/tissus</li>
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
                                <div className="absolute top-0 left-0 h-full w-[70%] bg-pink-500 transition-all duration-1000 group-hover:w-[75%]"></div>
                                {/* Technical indicators on gauge */}
                                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-foreground/50"></div>
                                <div className="absolute top-0 left-2/4 h-full w-[1px] bg-foreground/50"></div>
                                <div className="absolute top-0 left-3/4 h-full w-[1px] bg-foreground/50"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- CARD 03 ---------- */}
                <div className="flex-1 p-6 md:p-10 relative group bg-card">
                    <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground bg-muted px-2 py-1">SEC.03</div>
                    <div className="mb-12">
                        <span className="font-mono text-xs text-pink-500 uppercase tracking-widest block mb-2">MAXIMUM // ULTIMATE</span>
                        <h3 className="font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter">ÉLITE.</h3>
                    </div>
                    
                    <div className="space-y-8 font-mono text-[11px] lg:text-xs">
                        <div>
                            <div className="flex justify-between items-end border-b border-border pb-2 mb-3">
                                <span className="uppercase text-muted-foreground tracking-widest font-bold">Spécifications</span>
                                <span className="text-pink-500 font-bold bg-pink-500/10 px-2 py-1">899 EUR</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Correction peinture multi-étapes (95%+)</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Traitement Céramique 9H (Carrosserie)</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Protection céramique jantes & vitres</li>
                                <li className="flex gap-3"><span className="text-pink-500">■</span> Détail chirurgical compartiment moteur</li>
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
                                <span className="text-pink-500 animate-pulse">LVL. 99+</span>
                            </div>
                            <div className="w-full h-2 bg-muted relative overflow-hidden">
                                <div className="absolute top-0 left-0 h-full w-[98%] bg-pink-500"></div>
                                {/* Technical indicators on gauge */}
                                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-background"></div>
                                <div className="absolute top-0 left-2/4 h-full w-[1px] bg-background"></div>
                                <div className="absolute top-0 left-3/4 h-full w-[1px] bg-background"></div>
                                <div className="absolute top-0 left-[90%] h-full w-[1px] bg-background"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer Diagram Elements */}
            <div className="h-4 border-t border-border flex">
                <div className="w-1/3 border-r border-border h-full flex items-center px-2">
                   <div className="w-full h-[1px] bg-muted-foreground/30"></div>
                </div>
                <div className="w-1/3 border-r border-border h-full flex items-center justify-center">
                    <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">SYSTEM_READY</span>
                </div>
                <div className="w-1/3 h-full flex items-center px-2">
                   <div className="w-full h-[1px] bg-muted-foreground/30"></div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalServices;

"use client";

import React from 'react';

const ExcellencePhilosophy = () => {
    return (
        <section className="bg-background text-foreground relative border-b border-border w-full max-w-[100vw] overflow-hidden">
            {/* Top row with technical metrics */}
            <div className="flex flex-col md:flex-row border-b border-border">
                <div className="md:w-16 border-b md:border-b-0 md:border-r border-border flex items-center justify-center font-mono text-[10px] text-muted-foreground p-2 md:p-0 md:rotate-180 md:[writing-mode:vertical-rl] tracking-widest uppercase">
                    SYSTEM.METRICS
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 w-full">
                    <div className="border-r border-b md:border-b-0 border-border p-4 md:p-8 flex flex-col justify-between h-28 md:h-40 group hover:bg-muted transition-colors relative">
                        <span className="font-mono text-[10px] text-pink-500 uppercase tracking-widest">SYS.01</span>
                        <div>
                            <h4 className="font-sans font-bold text-lg md:text-2xl uppercase tracking-tighter">9H Hardness</h4>
                            <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground mt-1">CERTIFIED COATINGS</p>
                        </div>
                    </div>
                    
                    <div className="border-b md:border-b-0 md:border-r border-border p-4 md:p-8 flex flex-col justify-between h-28 md:h-40 group hover:bg-muted transition-colors relative">
                        <span className="font-mono text-[10px] text-pink-500 uppercase tracking-widest">SYS.02</span>
                        <div>
                            <h4 className="font-sans font-bold text-lg md:text-2xl uppercase tracking-tighter">Machined</h4>
                            <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground mt-1">SWISS INSTRUMENTS</p>
                        </div>
                    </div>
                    
                    <div className="border-r border-border p-4 md:p-8 flex flex-col justify-between h-28 md:h-40 group hover:bg-muted transition-colors relative">
                        <span className="font-mono text-[10px] text-pink-500 uppercase tracking-widest">SYS.03</span>
                        <div>
                            <h4 className="font-sans font-bold text-lg md:text-2xl uppercase tracking-tighter">Rapid</h4>
                            <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground mt-1">24H TURNAROUND</p>
                        </div>
                    </div>
                    
                    <div className="p-4 md:p-8 flex flex-col justify-between h-28 md:h-40 group hover:bg-muted transition-colors relative">
                        <span className="font-mono text-[10px] text-pink-500 uppercase tracking-widest">SYS.04</span>
                        <div>
                            <h4 className="font-sans font-bold text-lg md:text-2xl uppercase tracking-tighter">Warranty</h4>
                            <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground mt-1">LIFE-LONG SUPPORT</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Poster Layout / Huge Text block */}
            <div className="px-6 py-16 md:px-20 md:py-32 relative">
                
                {/* Background immense watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full text-center">
                    <span className="font-sans font-black text-[30vw] leading-none uppercase">APEX</span>
                </div>
                
                <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left: The Massive Title */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="font-mono text-xs text-pink-500 border border-pink-500 px-2 py-1">PH-01</div>
                            <div className="w-12 h-[1px] bg-foreground"></div>
                        </div>
                        <h2 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter mb-8 leading-[0.85]">
                            LA PHILOSOPHIE<br/> DE L'<span className="text-pink-500">EXCELLENCE</span>.
                        </h2>
                    </div>

                    {/* Right: The Technical Description */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 font-mono text-[11px] lg:text-xs leading-relaxed uppercase pt-4 lg:pt-24 border-t lg:border-t-0 border-border">
                        <div>
                            {/* Barcode separator */}
                            <div className="flex gap-px mb-6 items-end h-6 opacity-30">
                                <div className="w-[1px] h-full bg-foreground"></div>
                                <div className="w-[3px] h-[70%] bg-foreground"></div>
                                <div className="w-[2px] h-full bg-foreground"></div>
                                <div className="w-[1px] h-[40%] bg-foreground"></div>
                                <div className="w-[4px] h-[90%] bg-foreground"></div>
                            </div>
                            <p className="mb-6 opacity-80">
                                Chaque intervention suit un protocole d'ingénierie stricte. Nous ne considérons pas le detailing comme un simple nettoyage d'apparat, mais comme une science appliquée à la préservation ultime de l'automobile.
                            </p>
                        </div>
                        <div>
                            <p className="mb-8 opacity-80">
                                Les processus de correction des vernis et de pose des protections nanotechnologiques sont exécutés sous un éclairage professionnel calibré, utilisant des instruments garantissant des tolérances microscopiques.
                            </p>
                            
                            {/* Geometric Button */}
                            <button className="group relative border border-border px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all w-full md:w-auto">
                                <div className="absolute top-0 left-0 w-2 h-[1px] bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>// LANCER LE PROTOCOLE</span>
                                    <span className="text-pink-500 group-hover:text-background">→</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Bottom technical lines */}
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end font-mono text-[8px] text-muted-foreground uppercase opacity-50">
                    <span>COORD_SET_02</span>
                    <div className="flex gap-1 h-2 items-end">
                        <div className="w-1 h-full bg-foreground"></div>
                        <div className="w-1 h-[40%] bg-foreground"></div>
                        <div className="w-1 h-[80%] bg-foreground"></div>
                    </div>
                    <span>READY_FOR_DEPLOYMENT</span>
                </div>
            </div>
        </section>
    );
};

export default ExcellencePhilosophy;

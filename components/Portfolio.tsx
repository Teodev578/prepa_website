"use client";
import React, { useState } from 'react';

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('Tout');
    const filters = ['Tout', 'Sportives', 'Classiques', 'SUVs de Luxe'];

    return (
        <section id="portfolio" className="relative bg-surface py-20 overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col gap-4 mb-12 md:mb-20">
                    <span className="hidden md:block font-label text-primary tracking-[0.2em] uppercase text-xs">Archives d'Excellence</span>
                    <h2 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white uppercase italic">
                        PORTFOLIO<span className="text-primary">.</span>
                    </h2>
                    <div className="md:hidden h-1 w-20 bg-primary mt-2"></div>
                    <p className="font-body text-secondary text-sm md:text-lg max-w-2xl mt-4 md:mt-6 uppercase tracking-widest md:tracking-normal md:normal-case">
                        <span className="md:hidden leading-relaxed">
                            ENGINEERED PRECISION. <br/> AESTHETIC PERFECTION.
                        </span>
                        <span className="hidden md:inline">
                            Découvrez une sélection de nos plus prestigieuses réalisations. Chaque véhicule confié à PRECISION AUTO bénéficie d'un traitement méticuleux, alliant ingénierie de pointe et passion artisanale.
                        </span>
                    </p>
                </div>
            </div>

            {/* Filter Component */}
            <div className="sticky top-16 md:top-20 z-40 bg-surface/90 backdrop-blur-md px-6 md:px-12 py-6 border-y border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
                    <div className="flex gap-4 md:gap-10 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
                        {filters.map((filter) => (
                            <button 
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`font-label text-xs uppercase whitespace-nowrap tracking-widest py-1 transition-all ${
                                    activeFilter === filter 
                                    ? "text-primary border-l-2 border-primary pl-4 font-bold" 
                                    : "text-secondary hover:text-primary"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="hidden md:flex gap-10">
                        <button className="font-label text-[10px] uppercase tracking-widest text-secondary/60 hover:text-secondary transition-all">Correction Peinture</button>
                        <button className="font-label text-[10px] uppercase tracking-widest text-secondary/60 hover:text-secondary transition-all">Protection Céramique</button>
                        <button className="font-label text-[10px] uppercase tracking-widest text-secondary/60 hover:text-secondary transition-all">Detailing Intérieur</button>
                    </div>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="px-6 md:px-12 py-12 md:py-24 bg-surface max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-px gap-12 md:bg-white/5">
                    
                    {/* Project 1: Featured Large (Porsche) */}
                    <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low md:bg-surface-container aspect-[4/5] md:aspect-auto md:h-[600px]">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 opacity-80 md:group-hover:opacity-100 grayscale md:grayscale-0 group-hover:grayscale-0" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN3_gMl0NK-wbDiKmokNA6eNw6BPbwtIP92jmUrCcNDf0pRCCPu15-AEBUVpavISesh0YKYP6tPNDqd-pxexWqiKR-fVHiI2TKWr-6ntw-V-0L9eLf-7xHIvLgMPIntJtaqcyMypmCblB7FS9KoApPbjvpb8SJPRcsrge9HnWTvLXA2_el4ONsKX5NOjU7B6sAziVlVAxgmEpdB2-GxaEzU8-8zpsIzHClJTMlMUzZyhd1MN4I_ZetIDRjQSr4WaRRYmD2qWp3E2w"
                            alt="Porsche 911 GT3 RS"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 md:hidden"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:bg-gradient-to-t md:from-background md:to-transparent">
                            <div className="flex flex-col gap-1 md:gap-2">
                                <div className="flex items-center gap-4">
                                    <span className="hidden md:inline-block bg-primary/20 text-primary px-3 py-1 text-[10px] font-label tracking-tighter uppercase">Sportive</span>
                                    <span className="text-primary md:text-secondary text-[10px] font-label uppercase tracking-widest font-bold md:font-normal">Correction de Peinture Stage 3</span>
                                </div>
                                <h3 className="font-headline text-3xl md:text-4xl font-bold uppercase text-white tracking-tighter">Porsche 911 GT3 RS</h3>
                                <p className="hidden md:block font-body text-secondary/80 max-w-md text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    Restauration complète du vernis et application d'un traitement céramique multicouches 9H pour une profondeur de noir absolue.
                                </p>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 md:top-6 md:right-6">
                            <div className="md:w-12 md:h-12 px-3 py-1 md:p-0 flex items-center justify-center bg-primary text-on-primary font-label text-[10px] md:text-base font-bold uppercase">
                                <span className="hidden md:block material-symbols-outlined">fullscreen</span>
                                <span className="md:hidden">9H HARDNESS</span>
                            </div>
                        </div>
                    </div>

                    {/* Project 2: Ferrari */}
                    <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-low aspect-[4/5] md:aspect-auto md:h-[600px]">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 opacity-80 md:group-hover:opacity-100 grayscale md:grayscale-0 group-hover:grayscale-0" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9tG6DNvg4rDr3lpuiIZRsvKL5djO3CdqFOHsvRE4d_8VpWmmUR-Pa2bKPC4-f4IVx_3vETcYcXEaRi2XB37VDAx1KSs1bKHr17OLrAMXOFW6RGVL8CjKVUFzqmBBA1ke2dhBxUp8BKvlnUeQRrikj-3Xlj21wsuFFRE-ue_c6g5C4UQ_mugw0IzetQ-b3gggalzfNReUk6vnorj-HwKXOr7H9i-OyWzH1OgaJTmZ6PdiAo2Tn6HRiOStABUdShTXJKvVmecxdWBU"
                            alt="Ferrari 488 Pista"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 md:bg-primary/20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 md:bg-gradient-to-t md:from-background/90 md:to-transparent">
                            <span className="text-primary text-[10px] font-label uppercase tracking-widest mb-1 font-bold md:font-normal">Signature Ceramic</span>
                            <h3 className="font-headline text-3xl md:text-2xl font-bold uppercase text-white tracking-tighter">Ferrari 488 Pista</h3>
                            <div className="md:h-0 md:group-hover:h-12 transition-all duration-300 overflow-hidden hidden md:block">
                                <p className="font-body text-secondary text-xs mt-2 uppercase tracking-tighter">Pose de Film de Protection (PPF) Intégral</p>
                            </div>
                        </div>
                    </div>

                    {/* Project 3: Corvette / Classic */}
                    <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-low aspect-[4/5] md:aspect-auto md:h-[400px]">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 opacity-80 md:group-hover:opacity-100 grayscale md:grayscale-0 group-hover:grayscale-0" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATpxd7h0xdIrl5d-q7OKLQ4MUqQSn6KiXQr23qfi5NNJQdSjm5yBpuAy--cPXJZMn7J_sn9nQ51TJMxJKMhBdUacOrhEHSRaTA_AAYnkFpzeTVxcA3cigvSFzEI0ylV3HlcRzq4bkYdIqGc6823L1idtvKb0E8iF9wUKHGDJAgrPGflcCvRH5zJzlTW_ATyvHaJXHQGwQNe54Wyx0cZwiy67M94I9CBxChU_jqqahvazUyx9yWjeIHYQkddxYceeAM_j_kcO6VbhU"
                            alt="Corvette Stingray"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 md:hidden"></div>
                        <div className="absolute inset-0 hidden md:flex items-center justify-center bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="border border-primary text-primary px-6 py-2 font-label text-[10px] tracking-widest uppercase">Voir Détails</span>
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                            <div className="flex flex-col gap-1">
                                <span className="font-label text-[10px] tracking-widest text-primary uppercase font-bold md:font-normal">Deep Restoration</span>
                                <h3 className="font-headline text-3xl md:text-xl font-bold tracking-tighter uppercase text-white">Corvette Stingray</h3>
                            </div>
                        </div>
                    </div>

                    {/* Desktop additional project 4 */}
                    <div className="hidden md:block md:col-span-4 group relative overflow-hidden bg-surface-container h-[400px]">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA04WPz5gtkaNTDK6EdJIcT3BFvVp5aiybOUQMyPt96DvlmoO-18mQ-_f5TarPTa0SY4gRVA-1C5D-AlninxYE_3o-62DYCXZK4IyvOi7ERTa0s2a4O9JrXEHLsGx_6Jl_Jv9rHjoqOTUhu3pnNowsl9kcQ1iX6qzveD9n9aoGdfBL4zMlYyTwp-_EMTCBTjhbiKg-3m8hNdVSQDlxKwGTk_1GgbgwZR_Xq2naftGtl8GbX6Udo9zQrH5SLh90K4dooR-9ybN1eGHg"
                            alt="Aston Martin DBS"
                        />
                         <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="border border-primary text-primary px-6 py-2 font-label text-[10px] tracking-widest uppercase">Voir Détails</span>
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-background/90 to-transparent">
                            <h3 className="font-headline text-xl font-bold uppercase text-white tracking-tighter">Aston Martin DBS</h3>
                            <span className="text-primary text-[10px] font-label uppercase tracking-widest">Detailing Intérieur</span>
                        </div>
                    </div>

                    {/* Desktop additional project 5 */}
                    <div className="hidden md:block md:col-span-4 group relative overflow-hidden bg-surface-container-highest h-[400px]">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyMYjdQMK34G-Ul_SHKc9guz-kFW81BcwPI6mHqQXKBsbN4U-6YEZMkpKVBvCkiuDoMvW65C-fLe1cTLWxZgAcTazbRx9a4SGkBganiwV7X5I_Lw2NZ0xx6PUzNPqUqIEo4lcAyWebKSWrqueQ4PbIR85YUKBRNTfpBql_RxVpEb_e-TRmO4LUbsN7qNmy1ezFLU7bkZFaBFnahfY15TYK5yZyAnlDeXJ3jc46ME-5Ok6SOsr35IGFZoilRjQQKeqbSJolR8hj5QA"
                            alt="E-Type Restauration"
                        />
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-surface-container/60 backdrop-blur-md">
                            <h3 className="font-headline text-xl font-bold uppercase text-white tracking-tighter">E-Type Restauration</h3>
                            <p className="font-body text-primary text-[10px] font-bold uppercase mt-1">Concours d'élégance prep</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* CTA Section for Mobile */}
            <div className="md:hidden mt-8 px-6">
                <div className="bg-surface-container-low p-10 flex flex-col items-center text-center border-t border-primary/20">
                    <h2 className="font-headline text-2xl font-bold tracking-tighter uppercase mb-4 text-on-surface">Ready to elevate your machine?</h2>
                    <p className="font-body text-sm text-secondary mb-8 leading-relaxed uppercase tracking-wide">Secure your slot in our precision detailing queue.</p>
                    <button className="w-full bg-gradient-to-r from-primary to-primary-container px-8 py-5 text-on-primary font-body font-extrabold uppercase tracking-[0.1em] text-xs">
                        Réserver une consultation
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

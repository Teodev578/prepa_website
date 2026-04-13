"use client";
import React from 'react';

const Services = () => {
    return (
        <div className="bg-surface text-on-surface min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[300px] md:h-[614px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 hidden md:block">
                    <img 
                        alt="Automotive detail" 
                        className="w-full h-full object-cover opacity-40" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjdpRwt6nlrzk0W0ImbPSSyJMaMQxY6nELQ_EAwpPPk-iZRpUofGYSeQ0h7ykUf-wwJ2oyW36Eg3F0sLXMhBQxjldJNAgZs8q8KbJ4r86WpFWfM3t439VeEzlerLWqiGCnG69sCbfeRAuK11nLeWbZw10-LiCGgy2WudvpHvCO7EKjqaUloNz-O4i1zSJC-CS4Mh3FWeAqg-jtWKxta14ISBG0pNfFifNVjUVEAB9c90SVfwV6c7q2TTgVILQgwgwM1JX4R8mDia8"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface to-surface"></div>
                </div>

                {/* Mobile Hero View (Smaller image block) */}
                <div className="absolute inset-0 z-0 md:hidden flex flex-col justify-start">
                    <div className="relative w-full h-48 overflow-hidden group">
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1T4d3treezpVxQW9LRZ5OTXSnj2qkTnmp-9gzrRmq7n9x_mV8SK7CDDpk7A-b6d1dBFqN7LrKVIWd9Mg3Ufrg7sJl0M73C4UKsxItvyV7_DZChuaIW8k0HBpK5tZ9DPvGv6-zgHaA7em0vnGLVyexEENImiDJSBQxy-0xbjEv5nvRbp6OPeBLIRGP3tJJ3IPPoR5YvizdzdKxipVk7BO0e4H-q5d5dcTROwTdKegxEgibaVXIMQ2TmHoBHtZS0yKWV9COhxYaJSI"
                            alt="Mobile Hero"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                    </div>
                </div>

                <div className="relative z-10 text-left md:text-center px-6 mt-32 md:mt-0 w-full md:w-auto">
                    <span className="hidden md:block font-label text-primary uppercase tracking-[0.3em] text-xs mb-4">PRESTATIONS &amp; INGÉNIERIE</span>
                    <h1 className="font-headline text-5xl md:text-8xl font-extrabold md:font-black tracking-tighter text-white uppercase md:italic leading-none">
                        NOS FORFAITS <br className="md:hidden" />
                        <span className="text-primary">DÉTAILLÉS</span>
                    </h1>
                    <p className="max-w-2xl mx-auto mt-4 md:mt-6 text-on-surface-variant font-body text-sm md:text-lg tracking-wide md:tracking-normal">
                        <span className="md:hidden">Une ingénierie de précision appliquée à l'esthétique automobile. Choisissez le niveau de protection adapté à votre véhicule.</span>
                        <span className="hidden md:inline">Une précision chirurgicale appliquée à chaque centimètre carré de votre véhicule. Choisissez le niveau d'excellence adapté à vos exigences.</span>
                    </p>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="px-6 md:px-12 py-12 md:py-24 bg-surface max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-0 md:border border-outline-variant/20">
                    
                    {/* Package: ESSENTIEL */}
                    <article className="bg-surface-container-low md:bg-surface-container-lowest flex flex-col p-8 md:p-12 md:border-b lg:border-b-0 lg:border-r border-outline-variant/10 border-l-2 md:border-l-0 border-outline-variant">
                        <div className="mb-8 md:mb-12">
                            <span className="font-label text-secondary uppercase tracking-[0.2em] md:tracking-widest text-[10px] font-bold md:font-normal">
                                <span className="md:hidden">Niveau 01</span>
                                <span className="hidden md:inline">BASIC CARE</span>
                            </span>
                            
                            <div className="md:hidden flex justify-between items-start mt-1">
                                <h3 className="font-headline text-3xl font-bold uppercase text-white">ESSENTIEL</h3>
                                <div className="text-right">
                                    <span className="font-headline text-2xl font-bold text-primary">149€</span>
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <h2 className="font-headline text-4xl font-black text-white mt-2 uppercase italic">ESSENTIEL</h2>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="font-headline text-4xl font-bold text-primary italic tracking-tighter">€149</span>
                                    <span className="font-label text-on-secondary-container text-xs uppercase tracking-widest">À PARTIR DE</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-4 md:space-y-8 mb-8 md:mb-0">
                            <ul className="space-y-4">
                                {/* Mobile bullets */}
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Lavage extérieur à la main (PH neutre)
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Nettoyage complet des jantes et pneus
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Aspiration approfondie de l'habitacle
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Nettoyage des vitres intérieures
                                </li>

                                {/* Desktop bullets */}
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">water_drop</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Lavage Premium</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Technique des deux seaux, décontamination ferreuse des jantes.</p>
                                    </div>
                                </li>
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">vacuum</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Intérieur Focus</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Aspiration profonde, nettoyage des surfaces et vitres.</p>
                                    </div>
                                </li>
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">tire_repair</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Finition Brillance</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Dressage des pneus et protection rapide hydrophobe.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="md:mt-12">
                            <button className="w-full py-4 border md:border-outline/30 border-outline-variant bg-transparent md:bg-transparent font-label md:font-headline text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high md:hover:bg-white md:hover:text-surface transition-all duration-300">
                                SÉLECTIONNER
                            </button>
                        </div>
                    </article>

                    {/* Package: ÉCLAT (Featured) */}
                    <article className="bg-surface-container-highest flex flex-col p-8 md:p-12 relative md:border-b lg:border-b-0 lg:border-r border-outline-variant/10 overflow-hidden md:overflow-visible">
                        <div className="md:hidden absolute top-0 right-0 bg-primary px-4 py-1">
                            <span className="font-label text-[9px] font-black tracking-widest text-on-primary uppercase">RECOMMANDÉ</span>
                        </div>
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                        
                        <div className="mb-8 md:mb-12">
                            <div className="flex justify-between items-start">
                                <span className="font-label text-primary uppercase tracking-[0.2em] md:tracking-widest text-[10px] font-bold md:font-normal">
                                    <span className="md:hidden">Niveau 02</span>
                                    <span className="hidden md:inline">MOST POPULAR</span>
                                </span>
                            </div>
                            
                            <div className="md:hidden flex justify-between items-start mt-1">
                                <h3 className="font-headline text-3xl font-bold uppercase text-white">ÉCLAT</h3>
                                <div className="text-right">
                                    <span className="font-headline text-2xl font-bold text-primary">399€</span>
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <h2 className="font-headline text-4xl font-black text-white mt-2 uppercase italic">ÉCLAT</h2>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="font-headline text-4xl font-bold text-primary italic tracking-tighter">€399</span>
                                    <span className="font-label text-on-secondary-container text-xs uppercase tracking-widest">À PARTIR DE</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-4 md:space-y-8 mb-8 md:mb-0">
                            <p className="hidden md:block text-on-surface-variant text-sm border-l-2 border-primary/30 pl-4 py-2 italic">Correction modérée des défauts et rehaussement de la brillance.</p>
                            <ul className="space-y-4">
                                {/* Mobile bullets */}
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                    Tout le forfait <span className="font-bold">Essentiel</span>
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Décontamination ferreuse de la carrosserie
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Polissage de finition (One-step)
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Cire de protection haute performance
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Nettoyage vapeur des cuirs/tissus
                                </li>

                                {/* Desktop bullets */}
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Polissage 1 Étape</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Élimination des micro-rayures légères (swirls).</p>
                                    </div>
                                </li>
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">cleaning_services</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Lustrage Haute Définition</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Application d'un compound de finition pour un effet miroir.</p>
                                    </div>
                                </li>
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">shield</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Cire de Carnauba</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Protection naturelle haut de gamme (durée 3-6 mois).</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="md:mt-12">
                            <button className="w-full py-4 md:bg-[linear-gradient(135deg,#00daf3_0%,#009fb2_100%)] bg-[linear-gradient(135deg,#00daf3_0%,#009fb2_100%)] text-on-primary font-label md:font-headline text-xs font-bold tracking-widest uppercase hover:brightness-110 md:hover:shadow-[0_0_20px_rgba(0,218,243,0.3)] shadow-[0_0_20px_rgba(0,218,243,0.2)] md:shadow-none transition-all duration-300">
                                <span className="md:hidden">RÉSERVER MAINTENANT</span>
                                <span className="hidden md:inline">SÉLECTIONNER</span>
                            </button>
                        </div>
                    </article>

                    {/* Package: ÉLITE */}
                    <article className="bg-surface-container-low md:bg-surface-container-lowest flex flex-col p-8 md:p-12 border-l-2 md:border-l-0 border-outline-variant md:border-transparent">
                        <div className="mb-8 md:mb-12">
                            <span className="font-label text-secondary uppercase tracking-[0.2em] md:tracking-widest text-[10px] font-bold md:font-normal">
                                <span className="md:hidden">Niveau 03</span>
                                <span className="hidden md:inline">ULTIMATE PROTECTION</span>
                            </span>
                            
                            <div className="md:hidden flex justify-between items-start mt-1">
                                <h3 className="font-headline text-3xl font-bold uppercase text-white">ÉLITE</h3>
                                <div className="text-right">
                                    <span className="font-headline text-2xl font-bold text-primary">899€</span>
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <h2 className="font-headline text-4xl font-black text-white mt-2 uppercase italic">ÉLITE</h2>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="font-headline text-4xl font-bold text-primary italic tracking-tighter">€899</span>
                                    <span className="font-label text-on-secondary-container text-xs uppercase tracking-widest">À PARTIR DE</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-4 md:space-y-8 mb-8 md:mb-0">
                            <ul className="space-y-4">
                                {/* Mobile bullets */}
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
                                    Tout le forfait <span className="font-bold">Éclat</span>
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Correction de peinture multi-étapes
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Traitement Céramique 9H (2 ans)
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Détail complet du compartiment moteur
                                </li>
                                <li className="md:hidden flex items-center gap-3 text-sm font-body text-on-surface-variant">
                                    <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    Protection hydrophobe des vitres
                                </li>

                                {/* Desktop bullets */}
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">layers</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Protection Céramique 9H</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Traitement nanotechnologique multicouche permanent.</p>
                                    </div>
                                </li>
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">precision_manufacturing</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Correction Multi-Étapes</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Restauration complète du vernis (jusqu'à 95% de correction).</p>
                                    </div>
                                </li>
                                <li className="hidden md:flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-xl">diamond</span>
                                    <div>
                                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-tight">Pack Full Protection</h4>
                                        <p className="text-on-surface-variant text-xs mt-1">Céramique sur jantes, vitres et cuirs incluse.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="md:mt-12">
                            <button className="w-full py-4 border border-outline-variant md:border-outline/30 bg-transparent font-label md:font-headline text-xs font-bold tracking-widest uppercase hover:bg-surface-container-high md:hover:bg-white md:hover:text-surface transition-all duration-300">
                                <span className="md:hidden">DEVIS PERSONNALISÉ</span>
                                <span className="hidden md:inline">SÉLECTIONNER</span>
                            </button>
                        </div>
                    </article>

                </div>
            </section>

            {/* Quality Assurance Section (Mobile) & Technical Specs (Desktop) */}
            <section className="bg-surface md:bg-surface-container-low py-12 md:py-24 px-6 md:px-12 border-t border-outline-variant/10 md:border-t-0">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Mobile Only: 2x2 Grid Assurance */}
                    <div className="md:hidden">
                        <h4 className="font-headline text-sm font-bold tracking-[0.3em] uppercase text-primary mb-10 text-center">NOTRE ENGAGEMENT QUALITÉ</h4>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-container-high">
                                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                                </div>
                                <span className="font-label text-[10px] font-bold tracking-widest uppercase text-white">9H HARDNESS</span>
                                <p className="text-[9px] text-on-surface-variant mt-1">CERTIFIED COATINGS</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-container-high">
                                    <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
                                </div>
                                <span className="font-label text-[10px] font-bold tracking-widest uppercase text-white">MACHINED</span>
                                <p className="text-[9px] text-on-surface-variant mt-1">SWISS INSTRUMENTS</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-container-high">
                                    <span className="material-symbols-outlined text-primary text-3xl">shutter_speed</span>
                                </div>
                                <span className="font-label text-[10px] font-bold tracking-widest uppercase text-white">RAPID SERVICE</span>
                                <p className="text-[9px] text-on-surface-variant mt-1">24H TURNAROUND</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-container-high">
                                    <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
                                </div>
                                <span className="font-label text-[10px] font-bold tracking-widest uppercase text-white">WARRANTY</span>
                                <p className="text-[9px] text-on-surface-variant mt-1">LIFE-LONG SUPPORT</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Only: Technical Specs Layering */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="font-headline text-4xl font-black text-white uppercase italic tracking-tight leading-tight">
                                PROCESSUS DE <br/><span className="text-primary">PRÉCISION</span> CERTIFIÉ
                            </h3>
                            <p className="mt-6 text-on-surface-variant leading-relaxed">
                                Chaque intervention suit un protocole strict. Nous n'utilisons que des produits biodégradables de grade professionnel et des techniques de polissage qui respectent l'épaisseur de votre vernis d'origine.
                            </p>
                            <div className="mt-12 grid grid-cols-2 gap-6">
                                <div className="p-6 bg-surface-container-highest border-l-4 border-primary">
                                    <div className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">DURETÉ</div>
                                    <div className="font-headline text-2xl font-bold text-white italic">9H RATING</div>
                                </div>
                                <div className="p-6 bg-surface-container-highest border-l-4 border-secondary">
                                    <div className="font-label text-secondary text-[10px] uppercase tracking-widest mb-2">CURING</div>
                                    <div className="font-headline text-2xl font-bold text-white italic">24H INFRARED</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                            <img 
                                alt="Detailing process" 
                                className="relative w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0U0x4hzR96AOt_1IlXvf5DuKtwVitoBPpyhk-HyxdVZImg-3SOTSrQHNaastioPijN--UxOzkz8Y6-hbsJiV8Efmsxb4eYKd4-pKmGPgVd9MLn_gumrp4dSmC_wx-4P8TX3iVc9ofCrnNJmxfa76C1NRHMHhHLAl7T_YhfEeDkmxHLeZXb8sbHAAS1JSN_pCaOPBbw_lu3nYHFAoM97R5jxOlPUuB8OLyGGphgpF1mAFNWEybQmobYP3kG_I8wOujwBXcOwZCIcI"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;

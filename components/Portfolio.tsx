"use client";
import React from 'react';
import { motion } from 'framer-motion';

// On garde l'import de ton slider
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const cubicBezier = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: cubicBezier }
};

const maskReveal = {
    initial: { clipPath: 'inset(100% 0 0 0)' },
    whileInView: { clipPath: 'inset(0 0 0 0)' },
    viewport: { once: true },
    transition: { duration: 1.2, ease: cubicBezier }
};

const Portfolio = () => {
    // Les données restent inchangées
    const projects = [
        {
            id: 'PROJ_001',
            title: 'PORSCHE 911 GT3 RS',
            treatment: 'RESTAURATION_VER_STAGE_3',
            date: '2026.03.14',
            model: '992_GT3_RS',
            imgBefore: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN3_gMl0NK-wbDiKmokNA6eNw6BPbwtIP92jmUrCcNDf0pRCCPu15-AEBUVpavISesh0YKYP6tPNDqd-pxexWqiKR-fVHiI2TKWr-6ntw-V-0L9eLf-7xHIvLgMPIntJtaqcyMypmCblB7FS9KoApPbjvpb8SJPRcsrge9HnWTvLXA2_el4ONsKX5NOjU7B6sAziVlVAxgmEpdB2-GxaEzU8-8zpsIzHClJTMlMUzZyhd1MN4I_ZetIDRjQSr4WaRRYmD2qWp3E2w',
            imgAfter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN3_gMl0NK-wbDiKmokNA6eNw6BPbwtIP92jmUrCcNDf0pRCCPu15-AEBUVpavISesh0YKYP6tPNDqd-pxexWqiKR-fVHiI2TKWr-6ntw-V-0L9eLf-7xHIvLgMPIntJtaqcyMypmCblB7FS9KoApPbjvpb8SJPRcsrge9HnWTvLXA2_el4ONsKX5NOjU7B6sAziVlVAxgmEpdB2-GxaEzU8-8zpsIzHClJTMlMUzZyhd1MN4I_ZetIDRjQSr4WaRRYmD2qWp3E2w',
            techData: {
                time: '48H',
                products: 'KAMIKAZE_COLLECTION',
                defect: 'HEAVY_SWIRLING'
            },
            size: 'large'
        },
        {
            id: 'PROJ_002',
            title: 'FERRARI 488 PISTA',
            treatment: 'CERAMIC_COATING_9H',
            date: '2026.02.28',
            model: 'F142M2_PISTA',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9tG6DNvg4rDr3lpuiIZRsvKL5djO3CdqFOHsvRE4d_8VpWmmUR-Pa2bKPC4-f4IVx_3vETcYcXEaRi2XB37VDAx1KSs1bKHr17OLrAMXOFW6RGVL8CjKVUFzqmBBA1ke2dhBxUp8BKvlnUeQRrikj-3Xlj21wsuFFRE-ue_c6g5C4UQ_mugw0IzetQ-b3gggalzfNReUk6vnorj-HwKXOr7H9i-OyWzH1OgaJTmZ6PdiAo2Tn6HRiOStABUdShTXJKvVmecxdWBU',
            techData: {
                time: '24H',
                products: 'GTECHNIQ_ULTRA',
                defect: 'LIGHT_OXIDATION'
            },
            size: 'small'
        },
        {
            id: 'PROJ_003',
            title: 'CORVETTE STINGRAY',
            treatment: 'DEEP_CLEANING_EXT',
            date: '2026.02.10',
            model: 'C3_STINGRAY',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATpxd7h0xdIrl5d-q7OKLQ4MUqQSn6KiXQr23qfi5NNJQdSjm5yBpuAy--cPXJZMn7J_sn9nQ51TJMxJKMhBdUacOrhEHSRaTA_AAYnkFpzeTVxcA3cigvSFzEI0ylV3HlcRzq4bkYdIqGc6823L1idtvKb0E8iF9wUKHGDJAgrPGflcCvRH5zJzlTW_ATyvHaJXHQGwQNe54Wyx0cZwiy67M94I9CBxChU_jqqahvazUyx9yWjeIHYQkddxYceeAM_j_kcO6VbhU',
            techData: {
                time: '12H',
                products: 'SWISSVAX_BOS',
                defect: 'CONTAMINATION'
            },
            size: 'small'
        },
        {
            id: 'PROJ_004',
            title: 'ASTON MARTIN DBS',
            treatment: 'INTERIOR_DETAILING_PRO',
            date: '2026.01.25',
            model: 'DBS_SUPERLEGGERA',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA04WPz5gtkaNTDK6EdJIcT3BFvVp5aiybOUQMyPt96DvlmoO-18mQ-_f5TarPTa0SY4gRVA-1C5D-AlninxYE_3o-62DYCXZK4IyvOi7ERTa0s2a4O9JrXEHLsGx_6Jl_Jv9rHjoqOTUhu3pnNowsl9kcQ1iX6qzveD9n9aoGdfBL4zMlYyTwp-_EMTCBTjhbiKg-3m8hNdVSQDlxKwGTk_1GgbgwZR_Xq2naftGtl8GbX6Udo9zQrH5SLh90K4dooR-9ybN1eGHg',
            techData: {
                time: '36H',
                products: 'COLOUR_LOCK_PRO',
                defect: 'LEATHER_DRYNESS'
            },
            size: 'medium'
        }
    ];

    return (
        <section className="bg-background text-foreground min-h-screen pt-32 pb-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        {/* Utilisation de bg-primary au lieu de #9B2C2C */}
                        <div className="w-12 h-[1px] bg-primary" />
                        {/* Utilisation de text-primary et de la classe utilitaire text-label */}
                        <span className="text-primary text-label">LOGISTIQUE_RÉALISATIONS_V4</span>
                    </motion.div>

                    <motion.h1
                        {...maskReveal}
                        /* Utilisation de text-display et text-primary. Les styles de base h1 gèrent déjà font-black et uppercase */
                        className="text-display text-primary leading-[0.85]"
                    >
                        ARCHIVES <br /> TECHNIQUES
                    </motion.h1>

                    {/* Decorative Technical Coordinates */}
                    <div className="absolute top-0 right-0 text-label text-muted-foreground opacity-40 hidden md:block">
                        LAT: 48.8566° N<br />
                        LON: 2.3522° E<br />
                        ALT: 35.0 M
                    </div>
                </div>

                {/* Portfolio Grid - Asymmetric */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                            className={`relative group ${project.size === 'large' ? 'md:col-span-12' :
                                    project.size === 'medium' ? 'md:col-span-12' : 'md:col-span-6'
                                }`}
                        >
                            {/* Visual Component */}
                            {project.size === 'large' && project.imgBefore ? (
                                <div className="border-technical p-1 bg-card">
                                    {/* J'ai encapsulé ton slider dans un conteneur technique pour la cohérence */}
                                    <BeforeAfterSlider
                                        beforeImg={project.imgBefore}
                                        afterImg={project.imgAfter!}
                                    />
                                </div>
                            ) : (
                                /* Utilisation de border-technical au lieu des classes manuelles */
                                <div className="relative border-technical overflow-hidden bg-card p-1">
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 object-cover aspect-video md:aspect-auto md:h-[600px]"
                                    />

                                    {/* Technical Markers Layer */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="absolute top-10 left-10 text-primary text-detail opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">+ PT_04</div>
                                        <div className="absolute bottom-10 right-10 text-primary text-detail opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">+ PT_09</div>
                                    </div>

                                    {/* Technical Annotations - Border Labels */}
                                    <div className="absolute top-4 left-4 text-label text-primary bg-background/90 px-2 py-1 border border-border">
                                        ID: {project.id}
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-label text-primary-foreground bg-primary px-2 py-1">
                                        {project.date}
                                    </div>
                                </div>
                            )}

                            {/* Project Info & Technical Data */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-border pb-8 relative">

                                {/* Ajout de ton utilitaire tech-corner sur la data */}
                                <div className="tech-corner pl-4">
                                    {/* Utilisation de text-card-title (h3 car sémantiquement c'est un titre de carte) */}
                                    <h3 className="text-card-title mb-3">{project.title}</h3>

                                    <div className="flex items-center gap-4">
                                        <span className="text-detail text-muted-foreground">MODÈLE: {project.model}</span>
                                        <div className="w-1 h-1 bg-primary" />
                                        <span className="text-label text-primary font-bold">{project.treatment}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 md:text-right">
                                    <div className="flex flex-col">
                                        <span className="text-label text-muted-foreground mb-1">TEMPS_PASSÉ</span>
                                        <span className="text-detail font-black">{project.techData.time}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-label text-muted-foreground mb-1">PRODUITS_USÉS</span>
                                        <span className="text-detail font-black">{project.techData.products.split('_')[0]}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-label text-muted-foreground mb-1">DÉFAUT_TYPE</span>
                                        <span className="text-detail font-black text-primary">{project.techData.defect.split('_')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Grid Footer Annotations */}
                <div className="mt-40 border-t border-border pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-label text-muted-foreground">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">TOTAL_ARCHIVE:</span>
                            <span className="text-foreground">1,420 UNITS_LOGGED</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">PRECISION_RATE:</span>
                            <span className="text-foreground">99.98% CONFORMITY</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">CERT_STATUS:</span>
                            <span className="text-foreground">VERIFIED_DETailing_LABS</span>
                        </div>
                        <div className="flex flex-col gap-2 md:text-right">
                            <span className="text-primary font-bold">LAST_UPDATE:</span>
                            <span className="text-foreground">2026.04.21_12:06</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
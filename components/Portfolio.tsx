"use client";
import React from 'react';
import { motion } from 'framer-motion';

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
    const projects = [
        {
            id: 'PROJ_001',
            title: 'Porsche 911 GT3 RS',
            treatment: 'RESTAURATION_VER_STAGE_3',
            date: '2026.03.14',
            model: '992_GT3_RS',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN3_gMl0NK-wbDiKmokNA6eNw6BPbwtIP92jmUrCcNDf0pRCCPu15-AEBUVpavISesh0YKYP6tPNDqd-pxexWqiKR-fVHiI2TKWr-6ntw-V-0L9eLf-7xHIvLgMPIntJtaqcyMypmCblB7FS9KoApPbjvpb8SJPRcsrge9HnWTvLXA2_el4ONsKX5NOjU7B6sAziVlVAxgmEpdB2-GxaEzU8-8zpsIzHClJTMlMUzZyhd1MN4I_ZetIDRjQSr4WaRRYmD2qWp3E2w',
            size: 'large'
        },
        {
            id: 'PROJ_002',
            title: 'Ferrari 488 Pista',
            treatment: 'CERAMIC_COATING_9H',
            date: '2026.02.28',
            model: 'F142M2_PISTA',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9tG6DNvg4rDr3lpuiIZRsvKL5djO3CdqFOHsvRE4d_8VpWmmUR-Pa2bKPC4-f4IVx_3vETcYcXEaRi2XB37VDAx1KSs1bKHr17OLrAMXOFW6RGVL8CjKVUFzqmBBA1ke2dhBxUp8BKvlnUeQRrikj-3Xlj21wsuFFRE-ue_c6g5C4UQ_mugw0IzetQ-b3gggalzfNReUk6vnorj-HwKXOr7H9i-OyWzH1OgaJTmZ6PdiAo2Tn6HRiOStABUdShTXJKvVmecxdWBU',
            size: 'small'
        },
        {
            id: 'PROJ_003',
            title: 'Corvette Stingray',
            treatment: 'DEEP_CLEANING_EXT',
            date: '2026.02.10',
            model: 'C3_STINGRAY',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATpxd7h0xdIrl5d-q7OKLQ4MUqQSn6KiXQr23qfi5NNJQdSjm5yBpuAy--cPXJZMn7J_sn9nQ51TJMxJKMhBdUacOrhEHSRaTA_AAYnkFpzeTVxcA3cigvSFzEI0ylV3HlcRzq4bkYdIqGc6823L1idtvKb0E8iF9wUKHGDJAgrPGflcCvRH5zJzlTW_ATyvHaJXHQGwQNe54Wyx0cZwiy67M94I9CBxChU_jqqahvazUyx9yWjeIHYQkddxYceeAM_j_kcO6VbhU',
            size: 'small'
        },
        {
            id: 'PROJ_004',
            title: 'Aston Martin DBS',
            treatment: 'INTERIOR_DETAILING_PRO',
            date: '2026.01.25',
            model: 'DBS_SUPERLEGGERA',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA04WPz5gtkaNTDK6EdJIcT3BFvVp5aiybOUQMyPt96DvlmoO-18mQ-_f5TarPTa0SY4gRVA-1C5D-AlninxYE_3o-62DYCXZK4IyvOi7ERTa0s2a4O9JrXEHLsGx_6Jl_Jv9rHjoqOTUhu3pnNowsl9kcQ1iX6qzveD9n9aoGdfBL4zMlYyTwp-_EMTCBTjhbiKg-3m8hNdVSQDlxKwGTk_1GgbgwZR_Xq2naftGtl8GbX6Udo9zQrH5SLh90K4dooR-9ybN1eGHg',
            size: 'medium'
        }
    ];

    return (
        <section className="bg-background text-foreground min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24">
                    <motion.div {...fadeInUp} className="mb-4">
                        <span className="font-mono text-[#9B2C2C] uppercase tracking-widest text-xs">LOGISTIQUE RÉALISATIONS</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        className="font-black text-6xl md:text-9xl text-[#9B2C2C] uppercase leading-[0.85] tracking-tighter"
                    >
                        ARCHIVES <br /> RÉALISATIONS
                    </motion.h1>
                </div>

                {/* Portfolio Grid - Asymmetric */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                            className={`relative group ${
                                project.size === 'large' ? 'md:col-span-12' : 
                                project.size === 'medium' ? 'md:col-span-7' : 'md:col-span-5'
                            }`}
                        >
                            {/* Precise Frame */}
                            <div className="relative border-[0.5px] border-border overflow-hidden bg-white p-2">
                                <img 
                                    src={project.img} 
                                    alt={project.title}
                                    className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover aspect-video md:aspect-auto md:h-[500px]"
                                />
                                
                                {/* Technical Annotations - Border Labels */}
                                <div className="absolute top-4 left-4 font-mono text-[9px] text-[#9B2C2C] bg-white/90 px-2 py-1 uppercase tracking-widest border-[0.5px] border-border">
                                    ID: {project.id}
                                </div>
                                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white bg-[#9B2C2C] px-2 py-1 uppercase tracking-widest">
                                    {project.date}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-[0.5px] border-border pb-4">
                                <div>
                                    <h2 className="font-black text-2xl uppercase">{project.title}</h2>
                                    <p className="font-mono text-[10px] text-muted-foreground uppercase mt-1">MODÈLE: {project.model}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono text-[10px] text-[#9B2C2C] uppercase tracking-widest mb-1">TYPE_TRAITEMENT</div>
                                    <div className="font-black text-sm uppercase">{project.treatment}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Grid Footer Annotations */}
                <div className="mt-32 flex flex-wrap gap-12 font-mono text-[9px] text-muted-foreground uppercase tracking-widest border-t-[0.5px] border-border pt-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[#9B2C2C]">Total_Archive</span>
                        <span>1,420 UNITS</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[#9B2C2C]">Precison_Rate</span>
                        <span>99.98% OK</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[#9B2C2C]">Storage_Location</span>
                        <span>SECURE_DATA_CENTER_04</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

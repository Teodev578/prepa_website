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

const Services = () => {
    const services = [
        {
            id: '01',
            title: 'ESSENTIEL',
            subtitle: 'BASIC CARE',
            price: '149€',
            details: [
                'Lavage extérieur à la main (PH neutre)',
                'Nettoyage complet des jantes et pneus',
                'Aspiration approfondie de l\'habitacle',
                'Nettoyage des vitres intérieures'
            ]
        },
        {
            id: '02',
            title: 'ÉCLAT',
            subtitle: 'MOST POPULAR',
            price: '399€',
            details: [
                'Tout le forfait Essentiel',
                'Décontamination ferreuse carrosserie',
                'Polissage de finition (One-step)',
                'Cire de protection haute performance',
                'Nettoyage vapeur des cuirs/tissus'
            ]
        },
        {
            id: '03',
            title: 'ÉLITE',
            subtitle: 'ULTIMATE PROTECTION',
            price: '899€',
            details: [
                'Tout le forfait Éclat',
                'Correction peinture multi-étapes',
                'Traitement Céramique 9H (2 ans)',
                'Détail complet compartiment moteur',
                'Protection hydrophobe des vitres'
            ]
        }
    ];

    return (
        <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
            {/* Header Section */}
            <section className="px-6 md:px-12 mb-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="mb-4">
                        <span className="font-mono text-[#9B2C2C] uppercase tracking-widest text-xs">PRESTATIONS & INGÉNIERIE</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        className="font-black text-6xl md:text-9xl text-[#9B2C2C] uppercase leading-[0.85] tracking-tighter"
                    >
                        NOS <br /> PROTOCOLES
                    </motion.h1>
                </div>
            </section>

            {/* Fiches Techniques Grid */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service, index) => (
                        <motion.article 
                            key={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: cubicBezier }}
                            className="relative border-[0.5px] border-border p-8 md:p-10 flex flex-col h-full bg-white group"
                        >
                            {/* Technical Corners */}
                            <div className="absolute -top-[5px] -left-[5px] text-[#9B2C2C] font-mono text-lg">+</div>
                            <div className="absolute -top-[5px] -right-[5px] text-[#9B2C2C] font-mono text-lg">+</div>
                            <div className="absolute -bottom-[5px] -left-[5px] text-[#9B2C2C] font-mono text-lg">+</div>
                            <div className="absolute -bottom-[5px] -right-[5px] text-[#9B2C2C] font-mono text-lg">+</div>

                            <div className="flex justify-between items-start mb-12">
                                <div className="font-mono text-xs text-muted-foreground">
                                    SERVICE_ID: {service.id}
                                </div>
                                <div className="font-mono text-xs text-[#9B2C2C] font-bold">
                                    {service.price}
                                </div>
                            </div>

                            <div className="mb-10">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">{service.subtitle}</span>
                                <h2 className="font-black text-4xl uppercase leading-none">{service.title}</h2>
                            </div>

                            <ul className="flex-grow space-y-4 mb-12">
                                {service.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="font-mono text-[10px] text-[#9B2C2C] mt-1.5">—</span>
                                        <span className="font-sans text-sm text-muted-foreground leading-snug">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 border-[0.5px] border-border font-mono text-[10px] uppercase tracking-widest hover:bg-[#9B2C2C] hover:text-white hover:border-[#9B2C2C] transition-all duration-300">
                                SÉLECTIONNER_PROTOCOLE
                            </button>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Quality Standard */}
            <section className="px-6 md:px-12 mt-32 max-w-7xl mx-auto">
                <div className="border-t-[0.5px] border-border pt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                    <motion.div {...fadeInUp}>
                        <h3 className="font-black text-4xl uppercase leading-none mb-6">STANDARD DE <br /> <span className="text-[#9B2C2C]">PRÉCISION</span></h3>
                        <p className="font-sans text-muted-foreground text-sm max-w-md leading-relaxed">
                            Chaque intervention est documentée via un rapport technique. Nous utilisons exclusivement des instruments de mesure certifiés pour garantir l'intégrité de votre surface.
                        </p>
                    </motion.div>
                    <motion.div {...fadeInUp} className="flex flex-col md:items-end gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        <div>REF_SPEC: ISO_9001_DETailing</div>
                        <div>TOLERANCE: +/- 0.05 MICRONS</div>
                        <div>AUTH: PRECISION_AUTO_LABS</div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;

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
            id: 'PI-01',
            title: 'INTÉRIEUR',
            subtitle: 'HABITACLE_PRECISION',
            price: '149€',
            details: [
                'Nettoyage vapeur haute pression',
                'Désinfection des circuits A/C',
                'Traitement des cuirs et textiles',
                'Aspiration micro-particules'
            ]
        },
        {
            id: 'PE-02',
            title: 'EXTÉRIEUR',
            subtitle: 'SURFACE_INTEGRITY',
            price: '399€',
            details: [
                'Décontamination chimique/ferreuse',
                'Polissage de finition (One-step)',
                'Cire de protection hydrophobe',
                'Nettoyage technique des jantes'
            ]
        },
        {
            id: 'PC-03',
            title: 'FORMULE COMPLÈTE',
            subtitle: 'FULL_FACTORY_RESET',
            price: '549€',
            details: [
                'Combinaison Protocoles PI-01 & PE-02',
                'Traitement compartiment moteur',
                'Protection céramique temporaire',
                'Rapport technique de conformité'
            ]
        }
    ];

    return (
        <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
            {/* Header Section */}
            <section className="px-6 md:px-12 mb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-[#9B2C2C]" />
                        <span className="font-mono text-[#9B2C2C] uppercase tracking-[0.3em] text-[10px]">PROTOCOLE_INDUSTRIEL_V2.6</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        className="font-black text-6xl md:text-9xl text-[#9B2C2C] uppercase leading-[0.85] tracking-tighter"
                    >
                        NOS <br /> PRESTATIONS
                    </motion.h1>
                </div>
            </section>

            {/* Fiches Techniques Grid */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[0.5px] border-border">
                    {services.map((service, index) => (
                        <motion.article 
                            key={service.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: cubicBezier }}
                            className="relative p-10 flex flex-col h-full bg-white border-[0.5px] border-border group hover:bg-neutral-50 transition-colors duration-500"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div className="font-mono text-[9px] text-muted-foreground tracking-widest">
                                    PROCEDURE_ID: <span className="text-[#9B2C2C] font-bold">{service.id}</span>
                                </div>
                                <div className="font-mono text-[10px] text-foreground font-black border-b border-[#9B2C2C] pb-1">
                                    {service.price}
                                </div>
                            </div>

                            <div className="mb-12">
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9B2C2C] block mb-2">{service.subtitle}</span>
                                <h2 className="font-black text-4xl uppercase leading-none text-foreground">{service.title}</h2>
                            </div>

                            <ul className="flex-grow space-y-5 mb-16">
                                {service.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="w-1 h-1 bg-[#9B2C2C] mt-2 shrink-0" />
                                        <span className="font-mono text-[11px] text-muted-foreground uppercase leading-tight tracking-tight">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-5 border-[0.5px] border-border font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#9B2C2C] hover:text-white transition-all duration-500 relative overflow-hidden group/btn">
                                <span className="relative z-10 text-xs font-black">SÉLECTIONNER_UNITÉ</span>
                            </button>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Prestations Spécifiques - Diagram Section */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <motion.div {...fadeInUp} className="mb-16">
                    <h3 className="font-black text-5xl uppercase leading-none mb-2">TRAVAUX DE <br /><span className="text-[#9B2C2C]">HAUTE PRÉCISION</span></h3>
                    <div className="w-24 h-1 bg-[#9B2C2C] mt-4" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div 
                        {...fadeInUp}
                        className="border-technical p-12 bg-white flex flex-col gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground vertical-text uppercase">DIAGRAM_REF: HD_POLISH_01</div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border border-border flex items-center justify-center font-mono text-xl text-[#9B2C2C] font-bold">01</div>
                            <div>
                                <h4 className="font-black text-2xl uppercase">POLISSAGE OPTIQUE</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b border-border w-fit">CLEAR_VISION_PROTOCOL</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                            Restauration moléculaire du polycarbonate. Suppression de l'oxydation UV et application d'un vernis de protection nanochimique.
                        </p>
                        <div className="mt-auto pt-6 border-t border-border flex justify-between items-center font-mono text-[10px]">
                            <span className="text-[#9B2C2C]">TIME_REQ: 120min</span>
                            <span className="text-muted-foreground">TOLERANCE: 0.01%</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="border-technical p-12 bg-[#201c1d] text-white flex flex-col gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-neutral-500 vertical-text uppercase">DIAGRAM_REF: NANO_CERT_04</div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border border-neutral-800 flex items-center justify-center font-mono text-xl text-[#fe3333] font-bold">02</div>
                            <div>
                                <h4 className="font-black text-2xl uppercase">TRAITEMENT JANTES</h4>
                                <p className="font-mono text-[10px] text-neutral-500 uppercase py-1 border-b border-neutral-800 w-fit">THERMAL_RESISTANCE_SHIELD</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                            Application robotisée de protection céramique haute température (800°C+). Résistance accrue aux poussières de frein corrosives.
                        </p>
                        <div className="mt-auto pt-6 border-t border-neutral-800 flex justify-between items-center font-mono text-[10px]">
                            <span className="text-[#fe3333]">TIME_REQ: 180min</span>
                            <span className="text-neutral-500">THICKNESS: 2μm</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quality Standard */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <div className="border-t-[0.5px] border-border pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                    <motion.div {...fadeInUp}>
                        <h3 className="font-black text-5xl uppercase leading-[0.9] mb-8">CERTIFICATION DE <br /> <span className="text-[#9B2C2C]">CONFORMITÉ</span></h3>
                        <p className="font-sans text-muted-foreground text-sm max-w-lg leading-relaxed">
                            Toutes nos prestations sont soumises à une inspection multi-points. Un rapport technique digitalisé (PDF) est généré en fin de protocole, garantissant la qualité de l'exécution selon les normes ISO-DETAILING.
                        </p>
                    </motion.div>
                    <motion.div {...fadeInUp} className="flex flex-col md:items-end gap-6 font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-4">
                            <span className="text-[#9B2C2C]">REF_SPEC:</span>
                            <span className="bg-neutral-100 px-2 py-1 border border-border">ISO_9001_LABS_01</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[#9B2C2C]">TOLERANCE:</span>
                            <span className="bg-neutral-100 px-2 py-1 border border-border">SIGMA_6_CERTIFIED</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[#9B2C2C]">AUTH_KEY:</span>
                            <span className="bg-neutral-100 px-2 py-1 border border-border">PRECISION_AUTO_ROOT_01</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;

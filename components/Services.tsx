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
        // MODIFIÉ : Utilisation des classes de base pour le fond et le texte
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
                        {/* MODIFIÉ : Utilisation de bg-primary et text-primary */}
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="font-mono text-primary uppercase tracking-[0.3em] text-[10px]">PROTOCOLE_INDUSTRIEL_V2.6</span>
                    </motion.div>
                    <motion.h1 
                        {...maskReveal}
                        // MODIFIÉ : Simplifié car le style vient de @layer base, ajout de text-primary
                        className="text-6xl md:text-9xl text-primary"
                    >
                        NOS <br /> PRESTATIONS
                    </motion.h1>
                </div>
            </section>

            {/* Fiches Techniques Grid */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                {/* MODIFIÉ : Utilisation de la classe `border` standard du thème */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border">
                    {services.map((service, index) => (
                        <motion.article 
                            key={service.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: cubicBezier }}
                            // MODIFIÉ : Utilisation de bg-card, border, hover:bg-muted pour la sémantique et le dark mode
                            className="relative p-10 flex flex-col h-full bg-card border group hover:bg-muted transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div className="font-mono text-[9px] text-muted-foreground tracking-widest">
                                    {/* MODIFIÉ : text-primary */}
                                    PROCEDURE_ID: <span className="text-primary font-bold">{service.id}</span>
                                </div>
                                <div className="font-mono text-[10px] text-foreground font-black border-b border-primary pb-1">
                                    {service.price}
                                </div>
                            </div>

                            <div className="mb-12">
                                {/* MODIFIÉ : text-primary */}
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary block mb-2">{service.subtitle}</span>
                                <h2 className="text-4xl text-foreground">{service.title}</h2>
                            </div>

                            <ul className="flex-grow space-y-5 mb-16">
                                {service.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        {/* MODIFIÉ : bg-primary */}
                                        <div className="w-1 h-1 bg-primary mt-2 shrink-0" />
                                        <span className="font-mono text-[11px] text-muted-foreground uppercase leading-tight tracking-normal">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* MODIFIÉ : Bouton entièrement thémé */}
                            <button className="w-full py-5 border font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-colors duration-300 rounded-[var(--radius)]">
                                <span className="relative z-10 text-xs font-black">SÉLECTIONNER_UNITÉ</span>
                            </button>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Prestations Spécifiques - Diagram Section */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <motion.div {...fadeInUp} className="mb-16">
                    {/* MODIFIÉ : Utilisation de la sémantique h3 et text-primary */}
                    <h3 className="text-5xl">TRAVAUX DE <br /><span className="text-primary">HAUTE PRÉCISION</span></h3>
                    <div className="w-24 h-1 bg-primary mt-4" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* MODIFIÉ : Carte claire thémée */}
                    <motion.div 
                        {...fadeInUp}
                        className="border-technical p-12 bg-card flex flex-col gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground vertical-text uppercase">DIAGRAM_REF: HD_POLISH_01</div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border flex items-center justify-center font-mono text-xl text-primary font-bold">01</div>
                            <div>
                                <h4 className="text-2xl">POLISSAGE OPTIQUE</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b w-fit">CLEAR_VISION_PROTOCOL</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                            Restauration moléculaire du polycarbonate. Suppression de l'oxydation UV et application d'un vernis de protection nanochimique.
                        </p>
                        <div className="mt-auto pt-6 border-t flex justify-between items-center font-mono text-[10px]">
                            <span className="text-primary">TIME_REQ: 120min</span>
                            <span className="text-muted-foreground">TOLERANCE: 0.01%</span>
                        </div>
                    </motion.div>

                    {/* MODIFIÉ : Cette carte est maintenant aussi "claire" et passera en sombre automatiquement grâce au thème. Plus de couleurs en dur ! */}
                    <motion.div 
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="border-technical p-12 bg-card flex flex-col gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground vertical-text uppercase">DIAGRAM_REF: NANO_CERT_04</div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border flex items-center justify-center font-mono text-xl text-primary font-bold">02</div>
                            <div>
                                <h4 className="text-2xl">TRAITEMENT JANTES</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b w-fit">THERMAL_RESISTANCE_SHIELD</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                            Application robotisée de protection céramique haute température (800°C+). Résistance accrue aux poussières de frein corrosives.
                        </p>
                        <div className="mt-auto pt-6 border-t flex justify-between items-center font-mono text-[10px]">
                            <span className="text-primary">TIME_REQ: 180min</span>
                            <span className="text-muted-foreground">THICKNESS: 2μm</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quality Standard */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <div className="border-t pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                    <motion.div {...fadeInUp}>
                        <h3 className="text-5xl mb-8">CERTIFICATION DE <br /> <span className="text-primary">CONFORMITÉ</span></h3>
                        <p className="font-sans text-muted-foreground text-sm max-w-lg leading-relaxed">
                            Toutes nos prestations sont soumises à une inspection multi-points. Un rapport technique digitalisé (PDF) est généré en fin de protocole, garantissant la qualité de l'exécution selon les normes ISO-DETAILING.
                        </p>
                    </motion.div>
                    {/* MODIFIÉ : bg-muted et text-primary */}
                    <motion.div {...fadeInUp} className="flex flex-col md:items-end gap-6 font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-4">
                            <span className="text-primary">REF_SPEC:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">ISO_9001_LABS_01</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-primary">TOLERANCE:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">SIGMA_6_CERTIFIED</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-primary">AUTH_KEY:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">PRECISION_AUTO_ROOT_01</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
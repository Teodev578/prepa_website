"use client";
import React from 'react';
import { motion } from 'framer-motion';

// ... (les constantes de framer-motion restent les mêmes)
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
    // Le contenu B2B reste le même
    const services = [
        {
            id: 'RO-01',
            title: 'RENFORT OPÉRATIONNEL',
            subtitle: 'VOTRE EXPERT SUR SITE',
            price: 'SUR DEVIS',
            details: [
                'Remplacement au pied levé d\'un préparateur absent',
                'Gestion des pics d\'activité (livraisons, événements)',
                'Aucun processus de recrutement à gérer',
                'Continuité de service 100% garantie'
            ],
            cta: 'PLANIFIER UN RENFORT'
        },
        {
            id: 'GF-02',
            title: 'GESTION DE FLOTTE',
            subtitle: 'OPTIMISATION LOGISTIQUE',
            price: 'ABONNEMENT',
            details: [
                'Audit complet de vos flux de préparation',
                'Mise en place de process standardisés',
                'Pilotage de la performance (KPIs)',
                'Optimisation des coûts de produits'
            ],
            cta: 'DEMANDER UN AUDIT'
        },
        {
            id: 'EC-03',
            title: 'EXTERNALISATION COMPLÈTE',
            subtitle: 'SÉRÉNITÉ TOTALE',
            price: 'SUR MESURE',
            details: [
                'Prise en charge intégrale de votre atelier',
                'Management des équipes dédié',
                'Garantie de résultat et de délai',
                'Maintenance préventive du matériel'
            ],
            cta: 'ÉTUDIER VOTRE PROJET'
        }
    ];

    return (
        // Le style de fond est déjà sémantique, c'est parfait
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
                        <div className="w-12 h-[1px] bg-primary" />
                        {/* CHANGÉ : Utilisation de la nouvelle classe .text-label */}
                        <span className="text-label text-primary">FLEXIBILITÉ_RÉACTIVITÉ_RENTABILITÉ</span>
                    </motion.div>
                    {/* CHANGÉ : Utilisation de H1 et de .text-display pour une sémantique HTML et CSS parfaite */}
                    <motion.h1
                        {...maskReveal}
                        className="text-display text-primary"
                    >
                        NOS SERVICES <br />
                    </motion.h1>
                </div>
            </section>

            {/* Fiches Techniques Grid */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border">
                    {services.map((service, index) => (
                        <motion.article
                            key={service.id}
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                            className="relative p-10 flex flex-col h-full bg-card border group hover:bg-muted transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-16">
                                {/* Le style ici est très spécifique, on peut le laisser ou créer une classe .text-meta */}
                                <div className="font-mono text-[9px] text-muted-foreground tracking-widest">
                                    SOLUTION_ID: <span className="text-primary font-bold">{service.id}</span>
                                </div>
                                <div className="font-mono text-[10px] text-foreground font-black border-b border-primary pb-1">
                                    {service.price}
                                </div>
                            </div>

                            <div className="mb-12">
                                {/* CHANGÉ : Utilisation de la classe .text-label */}
                                <span className="text-label text-primary block mb-2">{service.subtitle}</span>
                                {/* CHANGÉ : Utilisation de H2 et de la classe .text-card-title */}
                                <h2 className="text-card-title text-foreground">{service.title}</h2>
                            </div>

                            <ul className="flex-grow space-y-5 mb-16">
                                {service.details?.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="w-1 h-1 bg-primary mt-2 shrink-0" />
                                        {/* CHANGÉ : Utilisation de la classe .text-detail */}
                                        <span className="text-detail text-muted-foreground">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CHANGÉ : Utilisation de la classe .btn-primary */}
                            <button className="btn-primary">
                                <span className="relative z-10">{service.cta}</span>
                            </button>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Services Stratégiques */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <motion.div {...fadeInUp} className="mb-16">
                    {/* CHANGÉ : Utilisation de H3 et de la classe .text-section-title */}
                    <h3 className="text-section-title">NOS SERVICES <br /><span className="text-primary">STRATÉGIQUES</span></h3>
                    <div className="w-24 h-1 bg-primary mt-4" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Carte Logistique & Convoyage */}
                    <motion.div
                        {...fadeInUp}
                        // La classe .border-technical vient déjà de votre CSS, c'est parfait
                        className="border-technical p-12 bg-card flex flex-col gap-8 relative overflow-hidden"
                    >
                        {/* ... (contenu de la carte) */}
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border flex items-center justify-center font-mono text-xl text-primary font-bold">01</div>
                            <div>
                                {/* CHANGÉ : Utilisation de H4. Le style vient du @layer base */}
                                <h4>LOGISTIQUE & CONVOYAGE</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b w-fit">FLUX_SÉCURISÉ_ET_MAÎTRISÉ</p>
                            </div>
                        </div>
                        {/* CHANGÉ : La balise <p> hérite du style de base */}
                        <p className="text-muted-foreground">
                            Prise en charge de vos véhicules entre parcs, concessions et ateliers. Notre assurance spécifique couvre chaque déplacement pour une tranquillité d'esprit totale.
                        </p>
                        {/* ... (footer de la carte) */}
                    </motion.div>

                    {/* Carte Formation du Personnel */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="border-technical p-12 bg-card flex flex-col gap-8 relative overflow-hidden"
                    >
                        {/* ... (contenu de la carte) */}
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border flex items-center justify-center font-mono text-xl text-primary font-bold">02</div>
                            <div>
                                {/* CHANGÉ : Utilisation de H4 */}
                                <h4>FORMATION DU PERSONNEL</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b w-fit">MONTÉE_EN_COMPÉTENCE_INTERNE</p>
                            </div>
                        </div>
                        {/* CHANGÉ : La balise <p> hérite du style de base */}
                        <p className="text-muted-foreground">
                            Nous transmettons nos méthodes et notre rigueur à vos équipes pour standardiser la qualité de votre préparation en interne et valoriser votre capital humain.
                        </p>
                        {/* ... (footer de la carte) */}
                    </motion.div>
                </div>
            </section>

            {/* Notre Engagement Partenaire */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <div className="border-t pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                    <motion.div {...fadeInUp}>
                        {/* CHANGÉ : Utilisation de H3 et .text-section-title */}
                        <h3 className="text-section-title mb-8">NOTRE ENGAGEMENT <br /> <span className="text-primary">PARTENAIRE</span></h3>
                        {/* CHANGÉ : La balise <p> hérite du style de base */}
                        <p className="text-muted-foreground max-w-lg">
                            Chaque collaboration est encadrée par des méthodes de gestion rigoureuses. Nous fournissons des reportings clairs qui vous permettent de suivre nos interventions et de mesurer précisément le retour sur investissement de notre partenariat.
                        </p>
                    </motion.div>
                    {/* ... (le reste est déjà bien structuré) */}
                </div>
            </section>
        </div>
    );
};

export default Services;
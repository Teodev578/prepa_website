"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // 🚀 Crucial pour le SEO : navigation sémantique

const customEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: customEase }
    }
};

const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
        y: "0%",
        opacity: 1,
        transition: { duration: 1.2, ease: customEase }
    }
};

const Services = () => {
    const services = [
        {
            id: 'RO-01',
            title: 'VOTRE PRÉPARATEUR EN RENFORT',
            subtitle: 'VOTRE EXPERT DIRECTEMENT SUR SITE',
            price: 'SUR DEVIS',
            details: [
                'Vous avez besoin d\'un préparateur expert ?',
                'Nous intervenons pour gérer vos pics d\'activité, livraisons ou événements.',
                'Aucune contrainte de recrutement, une flexibilité totale.',
                'Votre activité ne s\'arrête jamais, la nôtre non plus.'
            ],
            cta: 'OBTENIR DU RENFORT'
        },
        {
            id: 'GF-02',
            title: 'ACCÉLÉREZ VOS VENTES',
            subtitle: 'DÉSENGORGEZ VOTRE PARC AUTOMOBILE',
            price: 'SUR DEVIS',
            details: [
                'Votre parc de véhicules d\'occasion est saturé ?',
                'Nous prenons en charge la préparation de vos lots de véhicules en un temps record.',
                'Accélérez vos mises en vente et libérez de la trésorerie.',
                'Nous appliquons un standard de qualité unique pour valoriser chaque véhicule.'
            ],
            cta: 'OPTIMISER MON FLUX DE VÉHICULES'
        },
        {
            id: 'EC-03',
            title: 'DÉLÉGUEZ EN TOUTE CONFIANCE',
            subtitle: 'VOTRE PÔLE PRÉPARATION PARTENAIRE',
            price: 'SUR DEVIS',
            details: [
                'Et si vous nous confiez l\'intégralité de votre pôle préparation ?',
                'Transformez vos charges fixes en un coût 100% variable et maîtrisé.',
                'Gagnez en visibilité grâce à un suivi clair et transparent de nos actions.',
                'Libérez vos équipes pour qu\'elles se concentrent sur leur cœur de métier : la vente.'
            ],
            cta: 'DEVENIR PARTENAIRE'
        }
    ];

    return (
        <div className="bg-background text-foreground min-h-screen pt-20 md:pt-32 pb-16 md:pb-24">

            {/* Header Section */}
            <section className="px-6 md:px-12 mb-12 md:mb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4 flex items-center gap-4">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: customEase }}
                            className="w-12 h-[1px] bg-primary origin-left"
                        />
                        <span className="text-label text-primary">
                            FLEXIBILITÉ_RÉACTIVITÉ_RENTABILITÉ
                        </span>
                    </div>
                    <div className="overflow-hidden py-2">
                        <motion.h1
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-display text-primary"
                        >
                            NOS SERVICES
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* Fiches Techniques Grid */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l"
                >
                    {services.map((service) => (
                        <motion.article
                            variants={itemVariants}
                            key={service.id}
                            className="relative p-10 flex flex-col h-full bg-card border-r border-b group hover:bg-muted transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div className="font-mono text-[9px] text-muted-foreground tracking-widest">
                                    SOLUTION_ID: <span className="text-primary font-bold">{service.id}</span>
                                </div>
                                <div className="font-mono text-[10px] text-foreground font-black border-b border-primary pb-1">
                                    {service.price}
                                </div>
                            </div>

                            <div className="mb-12">
                                <span className="text-label text-primary block mb-2">{service.subtitle}</span>
                                <h2 className="text-card-title text-foreground">{service.title}</h2>
                            </div>

                            <ul className="flex-grow space-y-5 mb-16">
                                {service.details?.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="w-1 h-1 bg-primary mt-2 shrink-0" />
                                        <span className="text-detail text-muted-foreground">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* 🚀 CHANGEMENT : Le bouton devient un vrai lien Link sémantique vers ton formulaire */}
                            <Link 
                                href="/contact" 
                                className="btn-primary flex items-center justify-center text-center group"
                            >
                                <span className="relative z-10">{service.cta}</span>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>
            </section>

            {/* Services Stratégiques */}
            <section className="px-6 md:px-12 mt-24 md:mt-40 max-w-7xl mx-auto">
                <div className="mb-16">
                    <div className="overflow-hidden">
                        <motion.h3
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="show"
                            className="text-section-title pb-2"
                        >
                            NOS SERVICES <br /><span className="text-primary">STRATÉGIQUES</span>
                        </motion.h3>
                    </div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: customEase }}
                        className="w-24 h-1 bg-primary mt-4 origin-left"
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Logistique & Convoyage */}
                    <motion.div variants={itemVariants} className="border-technical tech-corner p-12 bg-card flex flex-col gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground vertical-text uppercase">SERVICE_REF: LC_CONVOYAGE_01</div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border flex items-center justify-center font-mono text-xl text-primary font-bold">01</div>
                            <div>
                                <h4 className="text-2xl">LOGISTIQUE & CONVOYAGE</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b w-fit">VOS VÉHICULES, NOTRE RESPONSABILITÉ</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                            Le déplacement de vos véhicules est un casse-tête logistique qui mobilise vos équipes de vente ? Déléguez-nous le convoyage entre vos différents sites. Nous garantissons une prise en charge complète et sécurisée, le tout couvert par notre assurance professionnelle spécifique.
                        </p>
                        <div className="mt-auto pt-6 border-t flex justify-between items-center font-mono text-[10px] flex-wrap gap-2">
                            <span className="text-primary">PÉRIMÈTRE D'ACTION: ÎLE-DE-FRANCE</span>
                            <span className="text-muted-foreground">TRANQUILLITÉ D'ESPRIT: ASSURANCE SPÉCIFIQUE</span>
                        </div>
                    </motion.div>

                    {/* Formation du Personnel */}
                    <motion.div variants={itemVariants} className="border-technical tech-corner p-12 bg-card flex flex-col gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground vertical-text uppercase">SERVICE_REF: LC_FORMATION_02</div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 border flex items-center justify-center font-mono text-xl text-primary font-bold">02</div>
                            <div>
                                <h4 className="text-2xl">FORMATION DU PERSONNEL</h4>
                                <p className="font-mono text-[10px] text-muted-foreground uppercase py-1 border-b w-fit">TRANSFORMEZ VOS ÉQUIPES EN EXPERTS</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                            La qualité de votre préparation en interne est inégale et dépend de la personne en poste ? Nous formons vos collaborateurs à nos méthodes rigoureuses pour standardiser vos processus, garantir un résultat impeccable à chaque fois et valoriser durablement votre personnel.
                        </p>
                        <div className="mt-auto pt-6 border-t flex justify-between items-center font-mono text-[10px] flex-wrap gap-2">
                            <span className="text-primary">NOTRE MÉTHODE: SAVOIR-FAIRE D'EXPERT</span>
                            <span className="text-muted-foreground">VOTRE RÉSULTAT: ÉQUIPE 100% AUTONOME</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Notre Engagement Partenaire */}
            <section className="px-6 md:px-12 mt-24 md:mt-40 max-w-7xl mx-auto overflow-hidden">
                <div className="border-t pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                    <div>
                        <div className="overflow-hidden mb-8">
                            <motion.h3
                                variants={textRevealVariants}
                                initial="hidden"
                                whileInView="show"
                                className="text-section-title pb-2"
                            >
                                UN PARTENARIAT BASÉ SUR <br /> <span className="text-primary">LA CONFIANCE</span>
                            </motion.h3>
                        </div>
                        <p className="font-sans text-muted-foreground text-sm max-w-lg leading-relaxed">
                            Pour nous, un partenariat réussi repose sur une confiance totale. C'est pourquoi la transparence est au cœur de notre méthode. Fini le flou sur les prestations : grâce à nos reportings clairs, vous suivez chaque intervention, maîtrisez vos coûts et mesurez concrètement le retour sur investissement.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, margin: "-50px" }}
                        className="flex flex-col md:items-end gap-6 font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span className="text-primary">PRINCIPE N°1:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">QUALITÉ CONSTANTE</span>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span className="text-primary">TRANSPARENCE:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">REPORTING DÉTAILLÉ</span>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span className="text-primary">SÉCURITÉ:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">CONTRAT PARTENAIRE</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
                'D\'un simple coup d\'aspirateur à une remise à neuf complète, on s\'adapte.',
                "Profitez d'un service flexible, rapide et sans prise de tête.",
                "Retrouvez le plaisir de rouler dans une voiture impeccable."
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
            cta: 'OPTIMISER MON FLUX'
        },
        {
            id: 'EC-03',
            title: 'DÉLÉGUEZ EN TOUTE CONFIANCE',
            subtitle: 'VOTRE PÔLE PRÉPARATION PARTENAIRE',
            price: 'SUR DEVIS',
            details: [
                'Et si vous nous confions l\'intégralité de votre pôle préparation ?',
                'Transformez vos charges fixes en un coût variable et maîtrisé.',
                'Gagnez en visibilité grâce à un suivi clair de nos actions.',
                'Libérez vos équipes pour la vente.'
            ],
            cta: 'DEVENIR PARTENAIRE'
        }
    ];

    return (
          <div className="bg-background text-foreground min-h-screen pb-16 md:pb-24">

            {/* Header Section */}
            <section className="pt-16 md:pt-24 px-6 md:px-12 mb-12 md:mb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4 flex items-center gap-4">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: customEase }}
                            className="w-12 h-[1px] bg-primary origin-left"
                        />
                        <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">
                            FLEXIBILITÉ_RÉACTIVITÉ_RENTABILITÉ
                        </span>
                    </div>
                    <div className="overflow-hidden py-2">
                        <motion.h1
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-foreground uppercase"
                        >
                            NOS <span className="text-primary">SERVICES.</span>
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
                    className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l border-border"
                >
                    {services.map((service) => (
                        <motion.article
                            variants={itemVariants}
                            key={service.id}
                            className="relative flex flex-col h-full bg-card border-r border-b border-border group hover:bg-muted/50 transition-colors duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Contenu Texte */}
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="font-mono text-[9px] text-muted-foreground tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        {service.id}
                                    </div>
                                    <div className="font-mono text-[10px] text-foreground font-black border-b border-primary pb-1">
                                        {service.price}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <span className="font-mono text-[10px] text-primary block mb-3 uppercase tracking-wider">{service.subtitle}</span>
                                    <h2 className="text-2xl font-sans font-black uppercase tracking-tight text-foreground leading-tight">{service.title}</h2>
                                </div>

                                <ul className="flex-grow space-y-4 mb-12">
                                    {service.details?.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 bg-primary/50 mt-1.5 shrink-0 rounded-sm" />
                                            <span className="text-sm font-sans text-muted-foreground leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Bouton */}
                                <Link 
                                    href="/contact" 
                                    className="mt-auto border border-secondary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-between group/btn rounded-[var(--radius)]"
                                >
                                    <span>{service.cta}</span>
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </section>

            {/* Services Stratégiques */}
            <section className="px-6 md:px-12 mt-24 md:mt-40 max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="overflow-hidden">
                            <motion.h3
                                variants={textRevealVariants}
                                initial="hidden"
                                whileInView="show"
                                className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase leading-none pb-2"
                            >
                                NOS SERVICES <br /><span className="text-primary">STRATÉGIQUES.</span>
                            </motion.h3>
                        </div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: customEase }}
                            className="w-24 h-1 bg-primary mt-6 origin-left"
                        />
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Logistique & Convoyage */}
                    <motion.div variants={itemVariants} className="border border-border p-8 md:p-12 bg-card flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground [writing-mode:vertical-rl] uppercase tracking-widest">REF: LC_CONVOYAGE_01</div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-12 h-12 border border-secondary flex items-center justify-center font-mono text-lg text-secondary font-bold shrink-0">01</div>
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tight">LOGISTIQUE & CONVOYAGE</h4>
                                <p className="font-mono text-[9px] text-primary uppercase mt-1">VOS VÉHICULES, NOTRE RESPONSABILITÉ</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed relative z-10">
                            Le déplacement de vos véhicules est un casse-tête logistique qui mobilise vos équipes de vente ? Déléguez-nous le convoyage entre vos différents sites. Nous garantissons une prise en charge complète et sécurisée, le tout couvert par notre assurance professionnelle spécifique.
                        </p>
                    </motion.div>

                    {/* Formation du Personnel */}
                    <motion.div variants={itemVariants} className="border border-border p-8 md:p-12 bg-card flex flex-col gap-8 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground [writing-mode:vertical-rl] uppercase tracking-widest">REF: LC_FORMATION_02</div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-12 h-12 border border-secondary flex items-center justify-center font-mono text-lg text-secondary font-bold shrink-0">02</div>
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tight">FORMATION DU PERSONNEL</h4>
                                <p className="font-mono text-[9px] text-primary uppercase mt-1">TRANSFORMEZ VOS ÉQUIPES EN EXPERTS</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed relative z-10">
                            La qualité de votre préparation en interne est inégale et dépend de la personne en poste ? Nous formons vos collaborateurs à nos méthodes rigoureuses pour standardiser vos processus, garantir un résultat impeccable à chaque fois et valoriser durablement votre personnel.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Notre Engagement Partenaire */}
            <section className="px-6 md:px-12 mt-24 md:mt-32 max-w-7xl mx-auto overflow-hidden">
                <div className="border-t border-border pt-16">
                    <div className="max-w-3xl">
                        <div className="overflow-hidden mb-8">
                            <motion.h3
                                variants={textRevealVariants}
                                initial="hidden"
                                whileInView="show"
                                className="text-3xl md:text-4xl font-sans font-black tracking-tighter uppercase leading-[1.1]"
                            >
                                UN PARTENARIAT BASÉ <br /> SUR <span className="text-primary">LA CONFIANCE.</span>
                            </motion.h3>
                        </div>
                        <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-10">
                            Pour nous, un partenariat réussi repose sur une confiance totale. C'est pourquoi la transparence est au cœur de notre méthode. Fini le flou sur les prestations : grâce à nos reportings clairs, vous suivez chaque intervention, maîtrisez vos coûts et mesurez concrètement le retour sur investissement.
                        </p>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-50px" }}
                            className="flex flex-col gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span>QUALITÉ CONSTANTE GARANTIE</span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                <span>REPORTING INTERVENTION DÉTAILLÉ</span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-secondary rounded-full" />
                                <span className="text-foreground font-bold">COUVERTURE ASSURANCE PRO</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
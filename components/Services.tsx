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
    // === CONTENU MODIFIÉ AVEC LE NOUVEAU TON ===
    const services = [
        {
            id: 'RO-01',
            title: 'VOTRE PRÉPARATEUR EN RENFORT',
            subtitle: 'VOTRE EXPERT DIRECTEMENT SUR SITE',
            price: 'SUR DEVIS',
            details: [
                ' Vous avez besoin d\'un préparateur expert ?',
                'Nous intervenons pour gérer vos pics d\'activité, livraisons ou événements.',
                'Aucune contrainte de recrutement, une flexibilité totale.',
                'Votre activité ne s\'arrête jamais, la nôtre non plus.'
            ],
            cta: 'NOUS SOMMES LÀ POUR VOUS'
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
                    <h3 className="text-5xl">NOS SERVICES <br /><span className="text-primary">STRATÉGIQUES</span></h3>
                    <div className="w-24 h-1 bg-primary mt-4" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* === CARTE MODIFIÉE : Logistique & Convoyage === */}
                    <motion.div
                        {...fadeInUp}
                        className="border-technical p-12 bg-card flex flex-col gap-8 relative overflow-hidden"
                    >
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
                        <div className="mt-auto pt-6 border-t flex justify-between items-center font-mono text-[10px]">
                            <span className="text-primary">PÉRIMÈTRE D'ACTION: ÎLE-DE-FRANCE</span>
                            <span className="text-muted-foreground">TRANQUILLITÉ D'ESPRIT: ASSURANCE SPÉCIFIQUE</span>
                        </div>
                    </motion.div>

                    {/* === CARTE MODIFIÉE : Formation du Personnel === */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="border-technical p-12 bg-card flex flex-col gap-8 relative overflow-hidden"
                    >
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
                        <div className="mt-auto pt-6 border-t flex justify-between items-center font-mono text-[10px]">
                            <span className="text-primary">NOTRE MÉTHODE: SAVOIR-FAIRE D'EXPERT</span>
                            <span className="text-muted-foreground">VOTRE RÉSULTAT: ÉQUIPE 100% AUTONOME</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Notre Engagement Partenaire */}
            <section className="px-6 md:px-12 mt-40 max-w-7xl mx-auto">
                <div className="border-t pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                    <motion.div {...fadeInUp}>
                        {/* === TITRE MODIFIÉ === */}
                        <h3 className="text-5xl mb-8">UN PARTENARIAT BASÉ SUR <br /> <span className="text-primary">LA CONFIANCE</span></h3>
                        {/* === DESCRIPTION MODIFIÉE === */}
                        <p className="font-sans text-muted-foreground text-sm max-w-lg leading-relaxed">
                            Pour nous, un partenariat réussi repose sur une confiance totale. C'est pourquoi la transparence est au cœur de notre méthode. Fini le flou sur les prestations : grâce à nos reportings clairs, vous suivez chaque intervention, maîtrisez vos coûts et mesurez concrètement le retour sur investissement.
                        </p>
                    </motion.div>
                    {/* === TAGS MODIFIÉS === */}
                    <motion.div {...fadeInUp} className="flex flex-col md:items-end gap-6 font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-4">
                            <span className="text-primary">PRINCIPE N°1:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">QUALITÉ CONSTANTE</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-primary">TRANSPARENCE:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">REPORTING DÉTAILLÉ</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-primary">SÉCURITÉ:</span>
                            <span className="bg-muted px-2 py-1 border rounded-[var(--radius)]">CONTRAT PARTENAIRE</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
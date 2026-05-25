"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// Ajout des icônes Lucide
import { Sparkles, Gauge, ShieldCheck } from 'lucide-react'; 

const customEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: customEase }
    }
};

const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
        y: "0%",
        opacity: 1,
        transition: { duration: 1, ease: customEase }
    }
};

export default function Services() {
    const services = [
        {
            id: 'RO-01',
            icon: Sparkles, // Icône pour le nettoyage/esthétique
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
            icon: Gauge, // Icône pour la vitesse/flux
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
            icon: ShieldCheck, // Icône pour la confiance/partenariat
            title: 'DÉLÉGUEZ EN TOUTE CONFIANCE',
            subtitle: 'VOTRE PÔLE PRÉPARATION PARTENAIRE',
            price: 'SUR DEVIS',
            details: [
                'Et si vous nous confiez l\'intégralité de votre pôle préparation ?',
                'Transformez vos charges fixes en un coût variable et maîtrisé.',
                'Gagnez en visibilité grâce à un suivi clair de nos actions.',
                'Libérez vos équipes pour la vente.'
            ],
            cta: 'DEVENIR PARTENAIRE'
        }
    ];

    return (
        <div className="bg-background text-foreground min-h-screen pb-16 md:pb-24 relative">
            <div className="absolute inset-0 pointer-events-none bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />

            {/* Header Section */}
            <section className="pt-16 md:pt-24 px-6 md:px-12 mb-12 md:mb-20 overflow-hidden relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <div className="mb-6 flex items-center gap-4">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: customEase }}
                                className="w-16 h-[1px] bg-primary origin-left"
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
                                className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-foreground uppercase leading-[0.9]"
                            >
                                NOS <br className="hidden md:block" /><span className="text-primary">SERVICES.</span>
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fiches Techniques Grid */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l border-border relative"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        
                        return (
                            <motion.article
                                variants={itemVariants}
                                key={service.id}
                                className="relative flex flex-col h-full bg-card border-r border-b border-border group hover:bg-muted/30 transition-colors duration-500 cursor-pointer overflow-hidden"
                            >
                                {/* Ligne d'accentuation au hover */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                                <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="font-mono text-[10px] text-muted-foreground tracking-widest flex items-center gap-3">
                                            <span className="font-bold text-foreground">0{index + 1}</span>
                                            <span className="w-px h-3 bg-border" />
                                            {service.id}
                                        </div>
                                        <div className="font-mono text-[10px] text-secondary font-black bg-secondary/10 px-2 py-1 rounded-sm">
                                            {service.price}
                                        </div>
                                    </div>

                                    {/* Intégration de l'icône à côté du titre */}
                                    <div className="flex items-start justify-between gap-4 mb-8">
                                        <div>
                                            <span className="font-mono text-[10px] text-primary block mb-4 uppercase tracking-wider">{service.subtitle}</span>
                                            <h2 className="text-2xl font-sans font-black uppercase tracking-tight text-foreground leading-[1.1]">{service.title}</h2>
                                        </div>
                                        
                                        {/* Bloc Icône Tech */}
                                        <div className="w-12 h-12 border border-border shrink-0 flex items-center justify-center relative overflow-hidden group-hover:border-secondary/50 transition-colors duration-500 rounded-sm">
                                            <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                            <Icon 
                                                className="w-5 h-5 text-muted-foreground group-hover:text-secondary relative z-10 transition-colors duration-500" 
                                                strokeWidth={1.5} 
                                            />
                                        </div>
                                    </div>

                                    <ul className="flex-grow space-y-5 mb-12">
                                        {service.details?.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-4">
                                                <div className="font-mono text-[8px] text-secondary mt-1.5 shrink-0 opacity-70">++</div>
                                                <span className="text-sm font-sans text-muted-foreground leading-relaxed">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link 
                                        href="/contact" 
                                        className="mt-auto border border-border px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:border-secondary hover:text-secondary transition-all flex items-center justify-between group/btn rounded-sm"
                                    >
                                        <span>{service.cta}</span>
                                        <span className="group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </section>

            {/* Services Stratégiques */}
            <section className="px-6 md:px-12 mt-24 md:mt-40 max-w-7xl mx-auto relative z-10">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="overflow-hidden">
                            <motion.h3
                                variants={textRevealVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase leading-[0.9] pb-2"
                            >
                                NOS SERVICES <br /><span className="text-primary opacity-50">STRATEGIQUES.</span>
                            </motion.h3>
                        </div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: customEase }}
                            className="w-24 h-[2px] bg-primary mt-8 origin-left"
                        />
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {/* Logistique & Convoyage */}
                    <motion.div variants={itemVariants} className="border border-border p-8 md:p-12 bg-card flex flex-col gap-8 relative overflow-hidden group hover:bg-muted/20 transition-colors duration-500">
                        <div className="absolute -right-16 -top-16 w-32 h-32 border border-border rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground [writing-mode:vertical-rl] uppercase tracking-widest">REF: LC_CONVOYAGE_01</div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-14 h-14 border border-secondary/50 flex items-center justify-center font-mono text-xl text-secondary font-black shrink-0 relative overflow-hidden">
                                <span className="relative z-10">01</span>
                                <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tight text-foreground">LOGISTIQUE & CONVOYAGE</h4>
                                <p className="font-mono text-[9px] text-primary uppercase mt-2 tracking-wider">VOS VÉHICULES, NOTRE RESPONSABILITÉ</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed relative z-10">
                            Le déplacement de vos véhicules est un casse-tête logistique qui mobilise vos équipes de vente ? Déléguez-nous le convoyage entre vos différents sites. Nous garantissons une prise en charge complète et sécurisée, le tout couvert par notre assurance professionnelle spécifique.
                        </p>
                    </motion.div>

                    {/* Formation du Personnel */}
                    <motion.div variants={itemVariants} className="border border-border p-8 md:p-12 bg-card flex flex-col gap-8 relative overflow-hidden group hover:bg-muted/20 transition-colors duration-500">
                        <div className="absolute -right-16 -top-16 w-32 h-32 border border-border rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground [writing-mode:vertical-rl] uppercase tracking-widest">REF: LC_FORMATION_02</div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-14 h-14 border border-secondary/50 flex items-center justify-center font-mono text-xl text-secondary font-black shrink-0 relative overflow-hidden">
                                <span className="relative z-10">02</span>
                                <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tight text-foreground">FORMATION DU PERSONNEL</h4>
                                <p className="font-mono text-[9px] text-primary uppercase mt-2 tracking-wider">TRANSFORMEZ VOS ÉQUIPES EN EXPERTS</p>
                            </div>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed relative z-10">
                            La qualité de votre préparation en interne est inégale et dépend de la personne en poste ? Nous formons vos collaborateurs à nos méthodes rigoureuses pour standardiser vos processus, garantir un résultat impeccable à chaque fois et valoriser durablement votre personnel.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Notre Engagement Partenaire */}
            <section className="px-6 md:px-12 mt-24 md:mt-32 max-w-7xl mx-auto overflow-hidden relative z-10">
                <div className="border-t border-border pt-16 md:pt-24 flex flex-col md:flex-row gap-12 md:gap-24">
                    <div className="max-w-2xl flex-1">
                        <div className="overflow-hidden mb-8">
                            <motion.h3
                                variants={textRevealVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-sans font-black tracking-tighter uppercase leading-[0.9]"
                            >
                                UN PARTENARIAT BASÉ <br /> SUR <span className="text-primary">LA CONFIANCE.</span>
                            </motion.h3>
                        </div>
                        <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex flex-col gap-6 font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest border-l border-border pl-6 md:pl-10 py-4"
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-6">
                                <span className="font-bold text-foreground opacity-30">01</span>
                                <span className="w-8 h-[1px] bg-border" />
                                <span>QUALITÉ CONSTANTE GARANTIE</span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex items-center gap-6">
                                <span className="font-bold text-foreground opacity-30">02</span>
                                <span className="w-8 h-[1px] bg-border" />
                                <span>REPORTING INTERVENTION DÉTAILLÉ</span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex items-center gap-6">
                                <span className="font-bold text-secondary">03</span>
                                <span className="w-12 h-[1px] bg-secondary" />
                                <span className="text-secondary font-bold">COUVERTURE ASSURANCE PRO</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
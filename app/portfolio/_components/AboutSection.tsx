"use client";
import React from 'react';
import { motion } from 'framer-motion';

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

export default function AboutSection() {
    return (
        <section className="bg-background text-foreground py-16 md:py-24 px-6 md:px-12 border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* En-tête de la section */}
                <div className="mb-16 md:mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1, ease: customEase }}
                            className="w-12 h-[1px] bg-primary origin-left" 
                        />
                        <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">NOTRE_ADN_&_VISION</span>
                    </div>
                    
                    <div className="overflow-hidden py-2">
                        <motion.h2 
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground max-w-4xl leading-[0.9]"
                        >
                            A propos de nous
                            <br className="hidden md:block"/>
                            {/* Soulignement primaire conservé pour la structure principale */}
                            <span className="text-primary border-b-4 border-primary">LAW CLEAN CENTER</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* Colonne Texte (Histoire & Proposition de valeur) */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, margin: "-50px" }}
                        className="lg:col-span-7 space-y-10"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-4">Le constat du terrain</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Law Clean Center est née d’un constat simple : la gestion du personnel dédié à la préparation automobile est un défi quotidien. Entre les pics de livraison, les congés, et la complexité du recrutement, maintenir un flux constant de véhicules prêts à la location et à la vente est un véritable casse-tête financier pour les professionnels.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            {/* INTÉGRATION SECONDAIRE : La "réponse" se démarque du "constat" */}
                            <h3 className="font-mono text-sm font-bold text-secondary uppercase tracking-widest mb-4">Notre réponse stratégique</h3>
                            <p className="text-lg text-foreground font-medium leading-relaxed">
                                Nous nous positionnons comme votre partenaire privilégié, mobilisable selon vos réels besoins. En nous déléguant la préparation de vos véhicules, vous transformez une masse salariale rigide en une charge 100 % variable.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                                L'objectif est clair : accélérer les ventes de vos véhicules d'occasion et valoriser vos véhicules neufs grâce à une externalisation complète de votre préparation esthétique et de votre convoyage, le tout piloté par un reporting rigoureux.
                            </p>
                        </motion.div>

                        {/* Les 3 Piliers avec Stagger */}
                        <motion.div 
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border mt-8"
                        >
                            <motion.div variants={itemVariants} className="space-y-2">
                                {/* INTÉGRATION SECONDAIRE : Numérotation d'impact */}
                                <span className="text-2xl block text-secondary font-black mb-2">01.</span>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Constante Qualité</h4>
                                <p className="text-xs text-muted-foreground font-mono">Standards d'excellence maintenus sur chaque unité.</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <span className="text-2xl block text-secondary font-black mb-2">02.</span>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Flexibilité Totale</h4>
                                <p className="text-xs text-muted-foreground font-mono">Intervention sur site ou sur parc selon les flux.</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <span className="text-2xl block text-secondary font-black mb-2">03.</span>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Optimisation Coûts</h4>
                                <p className="text-xs text-muted-foreground font-mono">Facturation à l'unité, aucune charge fixe inutile.</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Colonne Visuels (Espaces prévus pour les photos du brief) */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, margin: "-50px" }}
                        className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
                    >
                        <motion.div variants={itemVariants} className="aspect-[3/4] bg-muted relative rounded-sm overflow-hidden border border-border group">
                            {/* TODO: Remplacer le src par la photo "En tenue pro" */}
                            <img src="/placeholder-pro.jpg" alt="Équipe Law Clean Center en tenue professionnelle" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            {/* INTÉGRATION SECONDAIRE : Étiquette style industriel */}
                            <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur font-mono text-[9px] font-bold text-secondary uppercase px-2 py-1 border border-secondary shadow-sm">ÉQUIPE_SUR_SITE</div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <div className="aspect-square bg-muted relative rounded-sm overflow-hidden border border-border group">
                                {/* TODO: Remplacer le src par la photo "Matériel / Voiture Allemande" */}
                                <img src="/placeholder-materiel.jpg" alt="Matériel professionnel de polissage" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                {/* INTÉGRATION SECONDAIRE : Étiquette style industriel */}
                                <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur font-mono text-[9px] font-bold text-secondary uppercase px-2 py-1 border border-secondary shadow-sm">MATÉRIEL_TECH.</div>
                            </div>
                            {/* INTÉGRATION SECONDAIRE : Encart partenaire pour équilibrer la couleur */}
                            <div className="flex-1 bg-secondary/5 border border-secondary/20 flex flex-col items-center justify-center p-6 text-center rounded-sm transition-colors hover:bg-secondary/10 cursor-default">
                                <span className="font-mono text-secondary font-bold text-xs uppercase tracking-widest mb-2">Partenaire</span>
                                <span className="font-black text-foreground uppercase tracking-tight text-xl leading-none">Esthétique<br/>Automobile</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
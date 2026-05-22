"use client";
import React from 'react';
import { motion } from 'framer-motion';

const cubicBezier = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: cubicBezier }
};

export default function AboutSection() {
    return (
        <section className="bg-background text-foreground py-16 md:py-24 px-6 md:px-12 border-b border-border">
            <div className="max-w-7xl mx-auto">
                
                {/* En-tête de la section */}
                <div className="mb-16 md:mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">NOTRE_ADN_&_VISION</span>
                    </motion.div>
                    
                    <motion.h2 
                        {...fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground max-w-4xl leading-[0.9]"
                    >
                        Qui <span className="text-primary border-b-4 border-primary">sommes-nous</span>?
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* Colonne Texte (Histoire & Proposition de valeur) */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div {...fadeInUp} transition={{ delay: 0.1, duration: 0.8, ease: cubicBezier }}>
                            <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-4">Le constat du terrain</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Law Clean Center est née d’un constat simple : la gestion du personnel dédié à la préparation automobile est un défi quotidien. Entre les pics de livraison, les congés, et la complexité du recrutement, maintenir un flux constant de véhicules prêts à la location et à la vente est un véritable casse-tête financier pour les professionnels.
                            </p>
                        </motion.div>

                        <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.8, ease: cubicBezier }}>
                            <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-4">Notre réponse stratégique</h3>
                            <p className="text-lg text-foreground font-medium leading-relaxed">
                                Nous nous positionnons comme votre partenaire privilégié, mobilisable selon vos réels besoins. En nous déléguant la préparation de vos véhicules, vous transformez une masse salariale rigide en une charge 100 % variable.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                                L'objectif est clair : accélérer les ventes de vos véhicules d'occasion et valoriser vos véhicules neufs grâce à une externalisation complète de votre préparation esthétique et de votre convoyage, le tout piloté par un reporting rigoureux.
                            </p>
                        </motion.div>

                        {/* Les 3 Piliers */}
                        <motion.div 
                            {...fadeInUp} transition={{ delay: 0.3, duration: 0.8, ease: cubicBezier }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border mt-8"
                        >
                            <div className="space-y-2">
                                <span className="text-2xl block text-primary mb-2">01.</span>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Constante Qualité</h4>
                                <p className="text-xs text-muted-foreground font-mono">Standards d'excellence maintenus sur chaque unité.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-2xl block text-primary mb-2">02.</span>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Flexibilité Totale</h4>
                                <p className="text-xs text-muted-foreground font-mono">Intervention sur site ou sur parc selon les flux.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-2xl block text-primary mb-2">03.</span>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Optimisation Coûts</h4>
                                <p className="text-xs text-muted-foreground font-mono">Facturation à l'unité, aucune charge fixe inutile.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Colonne Visuels (Espaces prévus pour les photos du brief) */}
                    <motion.div 
                        {...fadeInUp} transition={{ delay: 0.4, duration: 0.8, ease: cubicBezier }}
                        className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
                    >
                        <div className="aspect-[3/4] bg-muted relative rounded-sm overflow-hidden border border-border group">
                            {/* TODO: Remplacer le src par la photo "En tenue pro" */}
                            <img src="/placeholder-pro.jpg" alt="Équipe Law Clean Center en tenue professionnelle" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border">ÉQUIPE_SUR_SITE</div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="aspect-square bg-muted relative rounded-sm overflow-hidden border border-border group">
                                {/* TODO: Remplacer le src par la photo "Matériel / Voiture Allemande" */}
                                <img src="/placeholder-materiel.jpg" alt="Matériel professionnel de polissage" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur font-mono text-[9px] uppercase px-2 py-1 border border-border">MATÉRIEL_TECH.</div>
                            </div>
                            <div className="flex-1 bg-primary/5 border border-primary/20 flex flex-col items-center justify-center p-6 text-center rounded-sm">
                                <span className="font-mono text-primary text-xs uppercase tracking-widest mb-2">Partenaire</span>
                                <span className="font-black text-foreground uppercase tracking-tight text-xl leading-none">Esthétique<br/>Automobile</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
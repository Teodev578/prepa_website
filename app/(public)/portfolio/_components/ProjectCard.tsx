"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';
import CarouselSlider from './CarouselSlider';

const customEase = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" }, 
    transition: { duration: 1, ease: customEase }
};

// 🛠️ DESIGN : On retire les hauteurs fixes (h-[...]) qui cassaient les proportions
const sizeConfig = {
    small: { colSpan: 'col-span-1 md:col-span-6' },
    medium: { colSpan: 'col-span-1 md:col-span-8' },
    large: { colSpan: 'col-span-1 md:col-span-12' }
};

export default function ProjectCard({ project, index }: { project: any, index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const config = sizeConfig[project.size as 'small' | 'medium' | 'large'] || sizeConfig.small;
    const displayImage = project.img || project.imgAfter || project.imgBefore;

    const hasTime = Boolean(project.techData.time && project.techData.time !== '-');
    const hasProducts = Boolean(project.techData.products && project.techData.products !== '-');
    const hasDefect = Boolean(project.techData.defect && project.techData.defect !== '-');
    const hasAnyMetric = hasTime || hasProducts || hasDefect;

    const hasContext = Boolean(project.details.context && project.details.context !== '-');
    const hasWorkDone = Boolean(project.details.workDone && project.details.workDone.length > 0 && project.details.workDone[0] !== '-');
    const hasResult = Boolean(project.details.result && project.details.result !== '-');
    const hasAnyDetail = hasContext || hasWorkDone || hasResult;

    return (
        <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: (index % 4) * 0.1 }}
            className={`relative group flex flex-col ${config.colSpan}`}
        >
            {/* --- COMPOSANT VISUEL EN 4:3 --- */}
            {/* 🛠️ DESIGN : Ajout de aspect-4/3 pour verrouiller le format de l'image */}
            <div className={`border-technical overflow-hidden bg-card p-1 relative w-full aspect-4/3 ${project.size === 'large' ? 'md:aspect-video' : ''}`}>
                {project.carouselImages && project.carouselImages.length > 0 ? (
                    <CarouselSlider images={project.carouselImages} />
                ) : project.imgBefore && project.imgAfter ? (
                    <BeforeAfterSlider
                        beforeImg={project.imgBefore}
                        afterImg={project.imgAfter}
                    />
                ) : displayImage ? (
                    <img
                        src={displayImage}
                        alt={`Réalisation ${project.title} : ${project.treatment} sur objet ${project.model}`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        loading="lazy" 
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                        [ AUCUNE_IMAGE_SOURCE ]
                    </div>
                )}

                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest text-primary bg-background/90 px-3 py-1.5 border border-border backdrop-blur-sm z-10 shadow-sm">
                    REF: {project.id}
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 z-10 shadow-sm">
                    {project.date}
                </div>
            </div>

            {/* --- INFORMATIONS DU PROJET --- */}
            <div className="mt-8 border-b border-border pb-8 relative flex-1 flex flex-col justify-between">
                <div className={`grid gap-8 mb-4 ${project.size === 'large' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    
                    <div className="tech-corner pl-6 border-l-2 border-primary/30">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">{project.title}</h2>
                        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs md:text-sm uppercase tracking-wider">
                            <span className="text-muted-foreground">PROJET: {project.model}</span>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full hidden sm:block" />
                            <span className="text-primary font-bold">{project.treatment}</span>
                        </div>

                        {hasAnyDetail && (
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center gap-3 px-5 py-3 border border-border bg-card font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 focus:outline-none group/btn shadow-sm"
                            >
                                <span className="font-black text-base leading-none transition-transform group-hover/btn:rotate-180">{isOpen ? '-' : '+'}</span>
                                <span>{isOpen ? 'MASQUER_LES_TRAVAUX' : 'DÉTAILS_DES_TRAVAUX'}</span>
                            </button>
                        )}
                    </div>

                    {/* Grille de métriques */}
                    {hasAnyMetric && (
                        <div className={`grid gap-6 ${project.size === 'small' ? 'grid-cols-2 mt-4' : 'grid-cols-3 lg:text-right'} items-end`}>
                            {hasTime && (
                                <div className="flex flex-col">
                                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5">RÉACTIVITÉ</span>
                                    <span className="font-mono text-sm md:text-base font-black uppercase">{project.techData.time}</span>
                                </div>
                            )}
                            {hasProducts && (
                                <div className="flex flex-col">
                                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5">NOTRE_SOLUTION</span>
                                    <span className="font-mono text-sm md:text-base font-black uppercase">{project.techData.products.split('_')[0]}</span>
                                </div>
                            )}
                            {hasDefect && (
                                <div className={`flex flex-col ${project.size === 'small' && (!hasTime || !hasProducts) ? 'col-span-2' : ''}`}>
                                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5">IMPACT_CLIENT</span>
                                    <span className="font-mono text-base md:text-lg font-black uppercase text-secondary">{project.techData.defect.split('_')[0]}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* --- ACCORDÉON DES DÉTAILS --- */}
                <AnimatePresence>
                    {isOpen && hasAnyDetail && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: customEase }}
                            className="overflow-hidden"
                        >
                            <div className={`pt-10 pb-4 grid gap-8 mt-6 border-t border-dashed border-border/50 ${project.size === 'large' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
                                
                                {hasContext && (
                                    <div className="border-l-2 border-primary/20 pl-5">
                                        <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">01. CONTEXTE CLIENT</h3>
                                        <p className="text-base text-foreground/90 leading-relaxed">{project.details.context}</p>
                                    </div>
                                )}

                                {hasWorkDone && (
                                    <div className="border-l-2 border-primary/20 pl-5">
                                        <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">02. TRAVAUX EFFECTUÉS</h3>
                                        <ul className="flex flex-col gap-3 text-base text-foreground/90">
                                            {project.details.workDone.map((work: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="text-primary font-mono text-sm mt-0.5">►</span>
                                                    <span className="leading-relaxed">{work}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {hasResult && (
                                    <div className="border-l-2 border-primary/20 pl-5">
                                        <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">03. RÉSULTAT B2B</h3>
                                        <p className="text-base md:text-lg text-secondary font-bold leading-relaxed">{project.details.result}</p>
                                    </div>
                                )}
                                
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
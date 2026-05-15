"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

import BeforeAfterSlider from '../components/BeforeAfterSlider';

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

interface Project {
    id: string;
    title: string;
    treatment: string;
    date: string;
    model: string;
    img?: string;
    imgBefore?: string;
    imgAfter?: string;
    techData: {
        time: string;
        products: string;
        defect: string;
    };
    size: string;
    details: {
        context: string;
        workDone: string[];
        result: string;
    };
}

const Portfolio = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                const formattedProjects: Project[] = data.map((p: any) => ({
                    id: p.ref_id,
                    title: p.title,
                    treatment: p.treatment,
                    date: p.date_tag,
                    model: p.model,
                    img: p.img_single,
                    imgBefore: p.img_before,
                    imgAfter: p.img_after,
                    techData: { 
                        time: p.time_spent || '-', 
                        products: p.solution || '-', 
                        defect: p.impact || '-' 
                    },
                    size: p.size || 'small',
                    details: {
                        context: p.context || '',
                        workDone: p.work_done || [],
                        result: p.result || ''
                    }
                }));
                setProjects(formattedProjects);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const toggleAccordion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-primary text-label animate-pulse">
                SYS.CHARGEMENT_DES_ARCHIVES...
            </div>
        );
    }

    return (
        <section className="bg-background text-foreground min-h-screen pt-32 pb-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="text-primary text-label">CAS_CONCRETS_&_PERFORMANCES</span>
                    </motion.div>

                    <motion.h1
                        {...maskReveal}
                        className="text-display text-primary leading-[0.85]"
                    >
                        NOS <br /> RÉALISATIONS
                    </motion.h1>

                    <div className="absolute top-0 right-0 text-label text-muted-foreground opacity-40 hidden md:block text-right">
                        LAT: 49.0974° N<br />
                        LON: 2.5065° E<br />
                        SECTEUR: IDF
                    </div>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12 grid-flow-row-dense">
                    {projects.map((project, index) => {
                        const isOpen = expandedId === project.id;
                        
                        // 1. GESTION DES TAILLES
                        const isSmall = project.size === 'small';
                        const isMedium = project.size === 'medium';
                        const isLarge = project.size === 'large';

                        // Définition de la hauteur
                        let imgHeightClass = 'h-[300px] md:h-[450px]'; 
                        if (isMedium) imgHeightClass = 'h-[400px] md:h-[550px]';
                        if (isLarge) imgHeightClass = 'h-[500px] md:h-[700px]';

                        // 2. CORRECTION DU BUG D'IMAGE (Fallback)
                        const displayImage = project.img || project.imgAfter || project.imgBefore;

                        return (
                            <motion.div
                                key={project.id}
                                {...fadeInUp}
                                transition={{ ...fadeInUp.transition, delay: (index % 4) * 0.1 }}
                                className={`relative group flex flex-col ${
                                    isSmall ? 'md:col-span-6' : 'md:col-span-12'
                                }`}
                            >
                                {/* --- COMPOSANT VISUEL --- */}
                                {project.imgBefore && project.imgAfter ? (
                                    <div className={`border-technical p-1 bg-card w-full ${imgHeightClass}`}>
                                        <BeforeAfterSlider
                                            beforeImg={project.imgBefore}
                                            afterImg={project.imgAfter}
                                        />
                                    </div>
                                ) : (
                                    <div className="border-technical overflow-hidden bg-card p-1">
                                        {displayImage ? (
                                            <img
                                                src={displayImage}
                                                alt={project.title}
                                                className={`w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ${imgHeightClass}`}
                                            />
                                        ) : (
                                            <div className={`w-full bg-muted flex items-center justify-center text-muted-foreground text-label ${imgHeightClass}`}>
                                                [ AUCUNE_IMAGE_SOURCE ]
                                            </div>
                                        )}

                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <div className="absolute top-8 left-8 text-primary text-label opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">+ RENTABILITÉ</div>
                                            <div className="absolute bottom-8 right-8 text-primary text-label opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">+ QUALITÉ</div>
                                        </div>

                                        <div className="absolute top-4 left-4 text-label text-primary bg-background/90 px-2 py-1 border border-border backdrop-blur-sm">
                                            REF: {project.id}
                                        </div>
                                        <div className="absolute bottom-4 right-4 text-label text-primary-foreground bg-primary px-2 py-1">
                                            {project.date}
                                        </div>
                                    </div>
                                )}

                                {/* --- INFORMATIONS DU PROJET --- */}
                                <div className="mt-8 border-b border-border pb-8 relative flex-1">
                                    <div className={`grid gap-8 mb-4 ${isSmall ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                                        
                                        {/* Utilisation de .tech-corner ici */}
                                        <div className="tech-corner pl-4 border-l border-primary/30">
                                            <h3 className="text-card-title mb-2">{project.title}</h3>
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-label text-muted-foreground">PROJET: {project.model}</span>
                                                <div className="w-1 h-1 bg-primary rounded-full" />
                                                <span className="text-label text-primary font-bold">{project.treatment}</span>
                                            </div>

                                            <button
                                                onClick={() => toggleAccordion(project.id)}
                                                className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-card text-label text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus:outline-none group/btn"
                                            >
                                                <span className="font-black text-sm leading-none transition-transform group-hover/btn:rotate-180">{isOpen ? '-' : '+'}</span>
                                                <span>{isOpen ? 'MASQUER_LES_TRAVAUX' : 'DÉTAILS_DES_TRAVAUX'}</span>
                                            </button>
                                        </div>

                                        <div className={`grid gap-4 ${isSmall ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-3 lg:text-right'} items-end`}>
                                            <div className="flex flex-col">
                                                <span className="text-label text-muted-foreground mb-1">RÉACTIVITÉ</span>
                                                <span className="text-detail font-black">{project.techData.time}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-label text-muted-foreground mb-1">NOTRE_SOLUTION</span>
                                                <span className="text-detail font-black">{project.techData.products.split('_')[0]}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-label text-muted-foreground mb-1">IMPACT_CLIENT</span>
                                                <span className="text-detail font-black text-primary">{project.techData.defect.split('_')[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- ACCORDÉON DES DÉTAILS --- */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: cubicBezier }}
                                                className="overflow-hidden"
                                            >
                                                <div className={`pt-8 pb-4 grid gap-8 mt-6 border-t border-dashed border-border/50 ${isSmall ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                                                    
                                                    <div className="border-l-2 border-primary/20 pl-4">
                                                        <h4 className="text-label text-muted-foreground mb-3">01. CONTEXTE CLIENT</h4>
                                                        <p className="text-sm text-foreground/90 leading-relaxed">{project.details.context}</p>
                                                    </div>

                                                    <div className="border-l-2 border-primary/20 pl-4">
                                                        <h4 className="text-label text-muted-foreground mb-3">02. TRAVAUX EFFECTUÉS</h4>
                                                        <ul className="flex flex-col gap-2 text-sm text-foreground/90">
                                                            {project.details.workDone.map((work, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-primary text-label mt-0.5">►</span>
                                                                    <span className="leading-relaxed">{work}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className={`border-l-2 border-primary/20 pl-4 ${isSmall ? 'sm:col-span-2' : ''}`}>
                                                        <h4 className="text-label text-muted-foreground mb-3">03. RÉSULTAT B2B</h4>
                                                        <p className="text-sm text-primary font-bold leading-relaxed">{project.details.result}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Annotations */}
                <div className="mt-40 border-t border-border pt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-label">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">PERFORMANCE:</span>
                            <span className="text-muted-foreground">JUSQU'À -7 JOURS DE STOCKAGE</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">MODÈLE_ÉCONOMIQUE:</span>
                            <span className="text-muted-foreground">CHARGES 100% VARIABLES</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">ZONE_D_INTERVENTION:</span>
                            <span className="text-muted-foreground">RÉGION_ÎLE_DE_FRANCE</span>
                        </div>
                        <div className="flex flex-col gap-2 md:text-right">
                            <span className="text-primary font-bold">CONTACT_TECHNIQUE:</span>
                            <span className="text-foreground">LAWCLEANCENTER@OUTLOOK.COM</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
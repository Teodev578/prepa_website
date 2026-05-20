"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/client';
import BeforeAfterSlider from './BeforeAfterSlider';

// Typage strict de la transition sans 'any'
const cubicBezier = [0.22, 1, 0.36, 1] as const;

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
    size: 'small' | 'medium' | 'large';
    details: {
        context: string;
        workDone: string[];
        result: string;
    };
}

// Configuration clean des classes responsive selon la taille
const sizeConfig = {
    small: { colSpan: 'col-span-1 md:col-span-6', height: 'h-[300px] md:h-[400px]' },
    medium: { colSpan: 'col-span-1 md:col-span-8', height: 'h-[350px] md:h-[500px]' },
    large: { colSpan: 'col-span-1 md:col-span-12', height: 'h-[400px] md:h-[650px]' }
};

const Portfolio = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Erreur lors de la récupération du portfolio:", error);
            } else if (data) {
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
                    size: (p.size as 'small' | 'medium' | 'large') || 'small',
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

    return (
        <section className="bg-background text-foreground h-auto py-16 md:py-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cubicBezier }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-primary" />
                        {/* ⬆️ AGRANDI : text-xs au lieu de text-label (9px) */}
                        <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">CAS_CONCRETS_&_PERFORMANCES</span>
                    </motion.div>

                    <motion.h1
                        {...maskReveal}
                        className="text-display text-primary leading-[0.85] mb-8"
                    >
                        NOS <br /> RÉALISATIONS
                    </motion.h1>

                    {/* ⬆️ AGRANDI : text-lg md:text-xl au lieu de text-base md:text-lg */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: cubicBezier }}
                        className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-primary/30 pl-6 mt-6"
                    >
                        [ACCÈS_PUBLIC] : Vous trouverez ici une sélection de nos interventions clés, classées par typologie de traitement, documentées par des métriques réelles de terrain et d'impact financier B2B.
                    </motion.p>

                    {/* ⬆️ AGRANDI : text-[10px] md:text-xs au lieu de text-label */}
                    <div className="absolute top-0 right-0 font-mono text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground opacity-50 hidden md:block text-right leading-relaxed">
                        LAT: 49.0974° N<br />
                        LON: 2.5065° E<br />
                        SECTEUR: IDF
                    </div>
                </div>

                {loading ? (
                    <div className="min-h-[400px] w-full flex flex-col items-center justify-center text-primary font-mono text-xs uppercase tracking-widest border border-dashed border-border/60 bg-card/10 rounded-sm p-12">
                        <div className="w-8 h-8 border-t-2 border-r-2 border-primary rounded-full animate-spin mb-4" />
                        <span className="animate-pulse">SYS.RECUPERATION_DES_DONNEES_SERVEUR...</span>
                        <span className="text-[10px] text-muted-foreground mt-2 opacity-50">FLUX_DB_SECURED_ACTIVE</span>
                    </div>
                ) : (
                    /* Portfolio Grid */
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8 lg:gap-x-12 grid-flow-row-dense animate-fadeIn">
                        {projects.map((project, index) => {
                            const isOpen = expandedId === project.id;
                            const config = sizeConfig[project.size] || sizeConfig.small;
                            const displayImage = project.img || project.imgAfter || project.imgBefore;

                            return (
                                <motion.div
                                    key={project.id}
                                    {...fadeInUp}
                                    transition={{ ...fadeInUp.transition, delay: (index % 4) * 0.1 }}
                                    className={`relative group flex flex-col ${config.colSpan}`}
                                >
                                    {/* --- COMPOSANT VISUEL --- */}
                                    <div className={`border-technical overflow-hidden bg-card p-1 relative w-full ${config.height}`}>
                                        {project.imgBefore && project.imgAfter ? (
                                            <BeforeAfterSlider
                                                beforeImg={project.imgBefore}
                                                afterImg={project.imgAfter}
                                            />
                                        ) : displayImage ? (
                                            <img
                                                src={displayImage}
                                                alt={project.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                                                [ AUCUNE_IMAGE_SOURCE ]
                                            </div>
                                        )}

                                        <div className="absolute inset-0 pointer-events-none z-10">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <div className="absolute top-8 left-8 text-primary font-mono text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">+ RENTABILITÉ</div>
                                            <div className="absolute bottom-8 right-8 text-primary font-mono text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">+ QUALITÉ</div>
                                        </div>

                                        <div className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest text-primary bg-background/90 px-3 py-1.5 border border-border backdrop-blur-sm z-10">
                                            REF: {project.id}
                                        </div>
                                        <div className="absolute bottom-4 right-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 z-10">
                                            {project.date}
                                        </div>
                                    </div>

                                    {/* --- INFORMATIONS DU PROJET --- */}
                                    <div className="mt-8 border-b border-border pb-8 relative flex-1 flex flex-col justify-between">
                                        <div className={`grid gap-8 mb-4 ${project.size === 'large' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                                            
                                            <div className="tech-corner pl-6 border-l-2 border-primary/30">
                                                <h3 className="text-3xl md:text-4xl font-black uppercase mb-3">{project.title}</h3>
                                                {/* ⬆️ AGRANDI : text-xs md:text-sm au lieu de text-label */}
                                                <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs md:text-sm uppercase tracking-wider">
                                                    <span className="text-muted-foreground">PROJET: {project.model}</span>
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full hidden sm:block" />
                                                    <span className="text-primary font-bold">{project.treatment}</span>
                                                </div>

                                                {/* ⬆️ AGRANDI : Bouton plus lisible et plus grand */}
                                                <button
                                                    onClick={() => toggleAccordion(project.id)}
                                                    className="inline-flex items-center gap-3 px-5 py-3 border border-border bg-card font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus:outline-none group/btn shadow-sm"
                                                >
                                                    <span className="font-black text-base leading-none transition-transform group-hover/btn:rotate-180">{isOpen ? '-' : '+'}</span>
                                                    <span>{isOpen ? 'MASQUER_LES_TRAVAUX' : 'DÉTAILS_DES_TRAVAUX'}</span>
                                                </button>
                                            </div>

                                            {/* ⬆️ AGRANDI : Grille de métriques qui "claque" (text-sm et text-base/lg) */}
                                            <div className={`grid gap-6 ${project.size === 'small' ? 'grid-cols-2 mt-4' : 'grid-cols-3 lg:text-right'} items-end`}>
                                                <div className="flex flex-col">
                                                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5">RÉACTIVITÉ</span>
                                                    <span className="font-mono text-sm md:text-base font-black uppercase">{project.techData.time}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5">NOTRE_SOLUTION</span>
                                                    <span className="font-mono text-sm md:text-base font-black uppercase">{project.techData.products.split('_')[0]}</span>
                                                </div>
                                                <div className={`flex flex-col ${project.size === 'small' ? 'col-span-2' : ''}`}>
                                                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5">IMPACT_CLIENT</span>
                                                    <span className="font-mono text-base md:text-lg font-black uppercase text-primary">{project.techData.defect.split('_')[0]}</span>
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
                                                    <div className={`pt-10 pb-4 grid gap-8 mt-6 border-t border-dashed border-border/50 ${project.size === 'large' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
                                                        
                                                        <div className="border-l-2 border-primary/20 pl-5">
                                                            {/* ⬆️ AGRANDI : text-xs font-bold au lieu de text-label */}
                                                            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">01. CONTEXTE CLIENT</h4>
                                                            <p className="text-base text-foreground/90 leading-relaxed">{project.details.context}</p>
                                                        </div>

                                                        <div className="border-l-2 border-primary/20 pl-5">
                                                            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">02. TRAVAUX EFFECTUÉS</h4>
                                                            <ul className="flex flex-col gap-3 text-base text-foreground/90">
                                                                {project.details.workDone.map((work, i) => (
                                                                    <li key={i} className="flex items-start gap-3">
                                                                        <span className="text-primary font-mono text-sm mt-0.5">►</span>
                                                                        <span className="leading-relaxed">{work}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="border-l-2 border-primary/20 pl-5">
                                                            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">03. RÉSULTAT B2B</h4>
                                                            <p className="text-base md:text-lg text-primary font-bold leading-relaxed">{project.details.result}</p>
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
                )}

                {/* Footer Annotations */}
                <div className="mt-40 border-t border-border pt-12">
                    {/* ⬆️ AGRANDI : text-xs au lieu de text-label */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 font-mono text-[10px] md:text-xs tracking-widest uppercase">
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
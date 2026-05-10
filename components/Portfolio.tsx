"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient'; // Ajout de l'import

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
    const [projects, setProjects] = useState<Project[]>([]); // État typé au départ
    const [loading, setLoading] = useState(true);

    // Fonction pour récupérer les données de Supabase au chargement de la page
    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('created_at', { ascending: false }); // Les plus récents en premier

            if (data) {
                // On mappe les données pour qu'elles correspondent à la structure attendue par le reste du composant
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
                        time: p.time_spent, 
                        products: p.solution, 
                        defect: p.impact 
                    },
                    size: p.size,
                    details: {
                        context: p.context,
                        workDone: p.work_done,
                        result: p.result
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
            <div className="min-h-screen bg-background flex items-center justify-center text-primary text-label">
                CHARGEMENT_DES_ARCHIVES...
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

                    <div className="absolute top-0 right-0 text-label text-muted-foreground opacity-40 hidden md:block">
                        LAT: 49.0974° N<br />
                        LON: 2.5065° E<br />
                        SECTEUR: IDF
                    </div>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
                    {projects.map((project, index) => {
                        const isOpen = expandedId === project.id;

                        return (
                            <motion.div
                                key={project.id}
                                {...fadeInUp}
                                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                                className={`relative group ${project.size === 'large' ? 'md:col-span-12' :
                                    project.size === 'medium' ? 'md:col-span-12' : 'md:col-span-6'
                                    }`}
                            >
                                {/* Visual Component */}
                                {project.size === 'large' && project.imgBefore ? (
                                    <div className="border-technical p-1 bg-card">
                                        <BeforeAfterSlider
                                            beforeImg={project.imgBefore}
                                            afterImg={project.imgAfter!}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative border-technical overflow-hidden bg-card p-1">
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 object-cover aspect-video md:aspect-auto md:h-[600px]"
                                        />

                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <div className="absolute top-10 left-10 text-primary text-detail opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">+ RENTABILITÉ</div>
                                            <div className="absolute bottom-10 right-10 text-primary text-detail opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">+ QUALITÉ</div>
                                        </div>

                                        <div className="absolute top-4 left-4 text-label text-primary bg-background/90 px-2 py-1 border border-border">
                                            REF: {project.id}
                                        </div>
                                        <div className="absolute bottom-4 right-4 text-label text-primary-foreground bg-primary px-2 py-1">
                                            {project.date}
                                        </div>
                                    </div>
                                )}

                                {/* Project Info & Technical Data */}
                                <div className="mt-8 border-b border-border pb-8 relative">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                                        <div className="tech-corner pl-4">
                                            <h3 className="text-card-title mb-2">{project.title}</h3>

                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-detail text-muted-foreground">PROJET: {project.model}</span>
                                                <div className="w-1 h-1 bg-primary" />
                                                <span className="text-label text-primary font-bold">{project.treatment}</span>
                                            </div>

                                            {/* ACCORDÉON DÉPLACÉ DANS LE BLOC TITRE */}
                                            <button
                                                onClick={() => toggleAccordion(project.id)}
                                                className="inline-flex items-center gap-2 px-3 py-2 border border-border bg-card text-label text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none"
                                            >
                                                <span className="font-black text-[12px] leading-none">{isOpen ? '-' : '+'}</span>
                                                <span>{isOpen ? 'MASQUER_LES_TRAVAUX' : 'DÉTAILS_DES_TRAVAUX_EFFECTUÉS'}</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 md:text-right">
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

                                    {/* CONTENU DE L'ACCORDÉON */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: cubicBezier }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 border-t border-dashed border-border">
                                                    {/* Colonne 1 : Le problème du client */}
                                                    <div className="border-l border-primary pl-4">
                                                        <h4 className="text-label text-muted-foreground mb-3">01. CONTEXTE CLIENT</h4>
                                                        <p className="text-sm text-foreground">{project.details.context}</p>
                                                    </div>

                                                    {/* Colonne 2 : Le travail exact (Liste à puces) */}
                                                    <div className="border-l border-primary pl-4">
                                                        <h4 className="text-label text-muted-foreground mb-3">02. TRAVAUX EFFECTUÉS</h4>
                                                        <ul className="flex flex-col gap-2 text-sm text-foreground">
                                                            {project.details.workDone.map((work, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-primary font-mono text-[10px] mt-1">►</span>
                                                                    <span>{work}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Colonne 3 : Ce que ça a rapporté au client */}
                                                    <div className="border-l border-primary pl-4">
                                                        <h4 className="text-label text-muted-foreground mb-3">03. RÉSULTAT B2B</h4>
                                                        <p className="text-sm text-foreground font-bold">{project.details.result}</p>
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

                {/* Grid Footer Annotations */}
                <div className="mt-40 border-t border-border pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-label text-muted-foreground">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">PERFORMANCE:</span>
                            <span className="text-foreground">JUSQU'À -7 JOURS DE STOCKAGE</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">MODÈLE_ÉCONOMIQUE:</span>
                            <span className="text-foreground">CHARGES 100% VARIABLES</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-primary font-bold">ZONE_D_INTERVENTION:</span>
                            <span className="text-foreground">RÉGION_ÎLE_DE_FRANCE</span>
                        </div>
                        <div className="flex flex-col gap-2 md:text-right">
                            <span className="text-primary font-bold">POUR_VOS_VÉHICULES:</span>
                            <span className="text-foreground">LAWCLEANCENTER@OUTLOOK.COM</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
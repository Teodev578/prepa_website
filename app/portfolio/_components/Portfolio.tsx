"use client"; // 🛠️ Requis pour synchroniser les animations fluides au scroll (once: false) sur les titres

import React from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/client';
import ProjectCard from './ProjectCard';

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

const customEase = [0.16, 1, 0.3, 1] as const;

const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
        y: "0%",
        opacity: 1,
        transition: { duration: 1.2, ease: customEase }
    }
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.2, ease: customEase }
    }
};

export default function Portfolio() {
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const supabase = createClient();
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Erreur lors de la récupération du portfolio:", error);
            } else if (data) {
                const formatted: Project[] = data.map((p: any) => ({
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
                setProjects(formatted);
            }
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    return (
        <section className="bg-background text-foreground h-auto py-16 md:py-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* 🛠️ ALIGNEMENT DES ANIMATIONS DU HEADER (Comme la section services) */}
                <div className="mb-16 relative">
                    <div className="mb-4 flex items-center gap-4">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 1, ease: customEase }}
                            className="w-12 h-[1px] bg-primary origin-left"
                        />
                        <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">
                            CAS_CONCRETS_&_PERFORMANCES
                        </span>
                    </div>

                    <div className="overflow-hidden py-2">
                        <motion.h1
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-50px" }}
                            className="text-display text-primary leading-[0.85] mb-8 uppercase font-black tracking-tighter"
                        >
                            NOS <br /> RÉALISATIONS
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden">
                        <motion.p
                            variants={paragraphVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-50px" }}
                            className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-primary/30 pl-6 mt-6"
                        >
                            Découvrez les coulisses de nos interventions. Nous documentons chaque chantier en toute transparence, avec des photos avant/après et les résultats concrets obtenus pour nos clients.
                        </motion.p>
                    </div>

                    <div className="absolute top-0 right-0 font-mono text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground opacity-50 hidden md:block text-right leading-relaxed">
                        LAT: 49.0974° N<br />
                        LON: 2.5065° E<br />
                        SECTEUR: IDF
                    </div>
                </div>

                {/* Grid des projets */}
                {isLoading ? (
                    <div className="min-h-[300px] flex items-center justify-center text-muted-foreground font-mono text-xs animate-pulse">
                        CHARGEMENT DES RAPPORTS DE TERRAIN...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8 lg:gap-x-12 grid-flow-row-dense">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                )}

                {/* Footer Annotations */}
                <div className="mt-40 border-t border-border pt-12">
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
}
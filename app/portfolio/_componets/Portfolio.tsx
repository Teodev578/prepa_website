import React from 'react';
import * as motion from 'framer-motion/m'; // Framer motion léger pour Server Components si supporté, ou simple divs pour le conteneur statique
import { createClient } from '@/lib/client'; // 🛠️ IMPORTANT : Basculer sur ton client Supabase SERVEUR
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

// Composant asynchrone qui s'exécute exclusivement sur le serveur
export default async function Portfolio() {
    const supabase = createClient();
    
    // 🛠️ SEO : Les données sont récupérées au moment de la génération de la page par le serveur
    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erreur lors de la récupération du portfolio:", error);
    }

    const formattedProjects: Project[] = data ? data.map((p: any) => ({
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
    })) : [];

    return (
        <section className="bg-background text-foreground h-auto py-16 md:py-24 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-16 relative">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-primary" />
                        <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">CAS_CONCRETS_&_PERFORMANCES</span>
                    </div>

                    {/* 🛠️ SEO : Ton titre principal de section (H1) visible par les robots */}
                    <h1 className="text-display text-primary leading-[0.85] mb-8 uppercase font-black tracking-tighter">
                        NOS <br /> REALISATIONS
                    </h1>

                    {/* Dans ton fichier Portfolio.tsx au niveau du Header */}
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-primary/30 pl-6 mt-6">
                        Découvrez les coulisses de nos interventions. Nous documentons chaque chantier en toute transparence, avec des photos avant/après et les résultats concrets obtenus pour nos clients.
                    </p>

                    <div className="absolute top-0 right-0 font-mono text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground opacity-50 hidden md:block text-right leading-relaxed">
                        LAT: 49.0974° N<br />
                        LON: 2.5065° E<br />
                        SECTEUR: IDF
                    </div>
                </div>

                {/* Portfolio Grid : Plus aucun état de chargement visuel en scintillement (FCP instantané) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8 lg:gap-x-12 grid-flow-row-dense">
                    {formattedProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

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
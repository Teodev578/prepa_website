"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// On définit la structure d'un projet pour aider TypeScript
type Project = {
    id: string;
    ref_id: string;
    title: string;
    treatment: string;
    model: string;
    img_single: string;
    img_before: string;
    img_after: string;
    created_at: string;
};

export default function PortfolioList() {
    const supabase = createClient();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // === CHARGEMENT DES DONNÉES ===
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .order('created_at', { ascending: false }); // Les plus récents en premier

        if (error) {
            setError("❌ Impossible de charger les projets : " + error.message);
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    // === SUPPRESSION D'UN PROJET ===
    const handleDelete = async (project: Project) => {
        const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}" ? Cette action est définitive.`);
        if (!confirmDelete) return;

        // 1. Supprimer physiquement les images du Storage pour libérer de l'espace
        const imagesToDelete = [project.img_single, project.img_before, project.img_after]
            .filter(Boolean) // On ne garde que les URL qui existent
            .map(url => url.split('/').pop()); // On extrait juste le nom du fichier à la fin de l'URL

        if (imagesToDelete.length > 0) {
            // Le "as string[]" rassure TypeScript sur le fait qu'il n'y a pas de valeurs nulles
            await supabase.storage.from('portfolio-images').remove(imagesToDelete as string[]);
        }

        // 2. Supprimer la ligne dans la base de données
        const { error } = await supabase
            .from('portfolio_projects')
            .delete()
            .eq('id', project.id);

        if (error) {
            alert("❌ Erreur lors de la suppression : " + error.message);
        } else {
            // 3. Mettre à jour l'affichage en retirant le projet supprimé
            setProjects(projects.filter(p => p.id !== project.id));
        }
    };

    if (loading) {
        return <div className="p-8 text-muted-foreground animate-pulse">Chargement de vos réalisations... ⏳</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-2">Vos Réalisations</h1>
                    <p className="text-muted-foreground">Gérez les projets visibles sur votre site internet.</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-md font-bold text-sm border border-primary/20">
                    Total : {projects.length} projet{projects.length > 1 ? 's' : ''}
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md">
                    {error}
                </div>
            )}

            {projects.length === 0 && !error ? (
                <div className="text-center p-12 bg-card border border-border rounded-lg shadow-sm">
                    <p className="text-4xl mb-4">📭</p>
                    <h3 className="text-lg font-bold mb-2">Aucun projet trouvé</h3>
                    <p className="text-muted-foreground text-sm">Vous n'avez pas encore publié de réalisation. Utilisez l'onglet "Ajout Portfolio" pour commencer.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => {
                        // Déterminer l'image principale à afficher (la single, ou sinon l'image "Après")
                        const displayImage = project.img_single || project.img_after || project.img_before;
                        
                        return (
                            <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-md flex flex-col group transition-all hover:border-primary/50 hover:shadow-lg">
                                {/* Zone Image */}
                                <div className="h-48 w-full bg-muted relative border-b border-border">
                                    {displayImage ? (
                                        <img src={displayImage} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                            Aucune image
                                        </div>
                                    )}
                                    {/* Petit badge indiquant s'il y a un Avant/Après */}
                                    {(project.img_before || project.img_after) && !project.img_single && (
                                        <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase px-2 py-1 rounded backdrop-blur-sm">
                                            Avant / Après
                                        </div>
                                    )}
                                </div>

                                {/* Zone Infos */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
                                        <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded border border-border whitespace-nowrap">
                                            {new Date(project.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-primary font-medium mb-1">{project.treatment}</p>
                                    <p className="text-xs text-muted-foreground mb-4 flex-1">{project.model}</p>

                                    {/* Zone Actions */}
                                    <div className="pt-4 border-t border-border flex justify-end">
                                        <button 
                                            onClick={() => handleDelete(project)}
                                            className="text-xs text-destructive hover:bg-destructive/10 px-3 py-2 rounded transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
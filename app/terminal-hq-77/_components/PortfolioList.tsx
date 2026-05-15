"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Structure complète du projet (alignée avec votre base de données)
type Project = {
    id: string;
    ref_id: string;
    title: string;
    treatment: string;
    model: string;
    img_single: string;
    img_before: string;
    img_after: string;
    time_spent: string;
    solution: string;
    impact: string;
    context: string;
    work_done: string[]; // En BDD c'est un tableau de textes
    result: string;
    size: string;
    created_at: string;
};

export default function PortfolioList() {
    const supabase = createClient();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // === ÉTATS POUR LA MODIFICATION ===
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editFormData, setEditFormData] = useState<any>({});
    const [isUpdating, setIsUpdating] = useState(false);

    // === CHARGEMENT DES DONNÉES ===
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError("❌ Impossible de charger les projets : " + error.message);
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    // === SUPPRESSION ===
    const handleDelete = async (project: Project) => {
        const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}" ? Cette action est définitive.`);
        if (!confirmDelete) return;

        const imagesToDelete = [project.img_single, project.img_before, project.img_after]
            .filter(Boolean)
            .map(url => url.split('/').pop());

        if (imagesToDelete.length > 0) {
            await supabase.storage.from('portfolio-images').remove(imagesToDelete as string[]);
        }

        const { error } = await supabase.from('portfolio_projects').delete().eq('id', project.id);

        if (error) {
            alert("❌ Erreur lors de la suppression : " + error.message);
        } else {
            setProjects(projects.filter(p => p.id !== project.id));
        }
    };

    // === OUVERTURE DE LA MODIFICATION ===
    const handleEditClick = (project: Project) => {
        setEditingProject(project);
        // On pré-remplit le formulaire. 
        // On transforme le tableau 'work_done' en texte avec virgules pour l'éditer facilement.
        setEditFormData({
            ...project,
            work_done: project.work_done ? project.work_done.join(', ') : ''
        });
    };

    // === GESTION DE LA SAISIE (MODIFICATION) ===
    const handleEditChange = (e: any) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    // === SAUVEGARDE DE LA MODIFICATION ===
    const handleUpdateProject = async () => {
        setIsUpdating(true);

        // On re-transforme le texte en tableau pour Supabase
        const workArray = typeof editFormData.work_done === 'string' 
            ? editFormData.work_done.split(',').map((item: string) => item.trim()).filter(Boolean)
            : editFormData.work_done;

        const updatedData = {
            title: editFormData.title.toUpperCase(),
            treatment: editFormData.treatment.toUpperCase(),
            model: editFormData.model,
            time_spent: editFormData.time_spent,
            solution: editFormData.solution,
            impact: editFormData.impact,
            context: editFormData.context,
            work_done: workArray,
            result: editFormData.result,
            size: editFormData.size,
        };

        const { error } = await supabase
            .from('portfolio_projects')
            .update(updatedData)
            .eq('id', editingProject!.id);

        if (error) {
            alert("❌ Erreur lors de la modification : " + error.message);
        } else {
            // Mise à jour immédiate de l'interface locale sans recharger la page
            setProjects(projects.map(p => p.id === editingProject!.id ? { ...p, ...updatedData } as Project : p));
            setEditingProject(null); // Ferme la modale
        }
        setIsUpdating(false);
    };

    if (loading) {
        return <div className="p-8 text-muted-foreground animate-pulse">Chargement de vos réalisations... ⏳</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 relative">
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
                        const displayImage = project.img_single || project.img_after || project.img_before;
                        
                        return (
                            <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-md flex flex-col group transition-all hover:border-primary/50 hover:shadow-lg">
                                <div className="h-48 w-full bg-muted relative border-b border-border">
                                    {displayImage ? (
                                        <img src={displayImage} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                            Aucune image
                                        </div>
                                    )}
                                    {(project.img_before || project.img_after) && !project.img_single && (
                                        <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase px-2 py-1 rounded backdrop-blur-sm">
                                            Avant / Après
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
                                        <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded border border-border whitespace-nowrap">
                                            {new Date(project.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-primary font-medium mb-1">{project.treatment}</p>
                                    <p className="text-xs text-muted-foreground mb-4 flex-1">{project.model}</p>

                                    {/* ACTIONS : Modifier & Supprimer */}
                                    <div className="pt-4 border-t border-border flex justify-between items-center">
                                        <button 
                                            onClick={() => handleEditClick(project)}
                                            className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-2 rounded transition-colors"
                                        >
                                            Modifier
                                        </button>
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

            {/* === MODALE DE MODIFICATION === */}
            {editingProject && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        
                        {/* Header Modale */}
                        <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-card z-10">
                            <h2 className="text-xl font-bold text-primary">Modifier : {editingProject.title}</h2>
                            <button onClick={() => setEditingProject(null)} className="text-muted-foreground hover:text-foreground">
                                ✖
                            </button>
                        </div>

                        {/* Corps Modale (Scrollable) */}
                        <div className="p-6 overflow-y-auto space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase">Nom du projet</label>
                                    <input className="border border-border p-3 rounded bg-background" name="title" value={editFormData.title} onChange={handleEditChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase">Service réalisé</label>
                                    <input className="border border-border p-3 rounded bg-background" name="treatment" value={editFormData.treatment} onChange={handleEditChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase">Modèle</label>
                                    <input className="border border-border p-3 rounded bg-background" name="model" value={editFormData.model} onChange={handleEditChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase">Temps passé</label>
                                    <input className="border border-border p-3 rounded bg-background" name="time_spent" value={editFormData.time_spent || ''} onChange={handleEditChange} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Travaux effectués (séparés par des virgules)</label>
                                <textarea className="border border-border p-3 rounded bg-background h-20" name="work_done" value={editFormData.work_done} onChange={handleEditChange} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Résultat final</label>
                                <textarea className="border border-border p-3 rounded bg-background h-20" name="result" value={editFormData.result || ''} onChange={handleEditChange} />
                            </div>
                        </div>

                        {/* Footer Modale */}
                        <div className="p-6 border-t border-border flex justify-end gap-3 bg-card sticky bottom-0">
                            <button 
                                onClick={() => setEditingProject(null)} 
                                disabled={isUpdating}
                                className="px-6 py-2 rounded font-bold text-muted-foreground hover:bg-muted transition-colors"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={handleUpdateProject} 
                                disabled={isUpdating}
                                className="px-6 py-2 rounded font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {isUpdating ? 'Sauvegarde...' : 'Enregistrer les modifications'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
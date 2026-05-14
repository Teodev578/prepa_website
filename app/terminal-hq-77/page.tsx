"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client'; 
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    // ✅ 1. LE CLIENT DOIT ÊTRE INITIALISÉ DANS LE COMPOSANT DANS NEXT.JS
    const supabase = createClient();
    const router = useRouter();
    
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        ref_id: 'REA_005', title: '', treatment: '', date_tag: 'ÉTUDE_DE_CAS', model: '',
        time_spent: '', solution: '', impact: '', context: '', work_done: '', result: '',
        size: 'small', img_single: '', img_before: '', img_after: ''
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                // On ajoute la gestion d'erreur au cas où Supabase ne répondrait pas
                const { data: { user }, error } = await supabase.auth.getUser();
                
                if (error || !user) {
                    console.warn("Utilisateur non détecté, redirection vers /login...");
                    router.push('/login');
                } else {
                    // Si on a un utilisateur, on arrête le chargement
                    setLoading(false);
                }
            } catch (err) {
                console.error("Erreur fatale lors de la vérification :", err);
                router.push('/login');
            }
        };
        
        checkSession();
    }, [router, supabase]); 

    const handleTextChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fonction gérant l'upload d'image (Glisser-Déposer ou Clic)
    const handleFileUpload = async (e: any, fieldName: string) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setStatus(`UPLOAD EN COURS... (${fieldName})`);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // 1. Upload dans le Storage Supabase
        const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(filePath, file);

        if (uploadError) {
            setStatus('ERREUR UPLOAD: ' + uploadError.message);
            setUploading(false);
            return;
        }

        // 2. Récupération de l'URL publique
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);

        setFormData(prev => ({ ...prev, [fieldName]: data.publicUrl }));
        setStatus(`UPLOAD TERMINÉ (${fieldName})`);
        setUploading(false);
    };

    // Envoi des données dans la base de données
    const handleSubmit = async () => {
        setStatus('SAUVEGARDE EN BASE DE DONNÉES...');
        const workArray = formData.work_done.split(',').map(item => item.trim());

        const { error } = await supabase.from('portfolio_projects').insert([
            {
                ref_id: formData.ref_id, title: formData.title.toUpperCase(), treatment: formData.treatment.toUpperCase(),
                date_tag: formData.date_tag.toUpperCase(), model: formData.model.toUpperCase(),
                time_spent: formData.time_spent.toUpperCase(), solution: formData.solution.toUpperCase(), impact: formData.impact.toUpperCase(),
                context: formData.context, work_done: workArray, result: formData.result, size: formData.size,
                img_single: formData.img_single, img_before: formData.img_before, img_after: formData.img_after
            }
        ]);

        if (error) setStatus('ERREUR BDD: ' + error.message);
        else setStatus('RÉALISATION PUBLIÉE AVEC SUCCÈS !');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p className="text-primary font-mono animate-pulse">INITIALISATION_SESSION...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            <div className="max-w-4xl mx-auto border-technical p-8 bg-card relative">
                <div className="tech-corner absolute top-0 left-0" />
                <h1 className="text-card-title text-primary mb-2">TERMINAL D'ARCHIVAGE</h1>
                <p className="text-detail text-muted-foreground mb-8">AJOUT DE NOUVELLES RÉALISATIONS (DRAG & DROP)</p>

                {/* ZONE DE DRAG & DROP DES IMAGES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {['img_single', 'img_before', 'img_after'].map((field) => (
                        <div key={field} className="relative border border-dashed border-primary bg-background p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer group">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleFileUpload(e, field)}
                                disabled={uploading}
                            />
                            <div className="pointer-events-none flex flex-col items-center gap-2">
                                <span className="text-primary text-[24px]">⇪</span>
                                <span className="text-label text-primary group-hover:text-foreground">
                                    {(formData as any)[field] ? 'IMAGE CHARGÉE' : `GLISSER ${field.toUpperCase()}`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FORMULAIRE TEXTE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <input className="border border-border p-3 text-sm bg-background w-full" name="title" placeholder="Titre (ex: FLOTTE V.O)" onChange={handleTextChange} />
                    <input className="border border-border p-3 text-sm bg-background w-full" name="treatment" placeholder="Traitement (ex: DÉSENGORGEMENT)" onChange={handleTextChange} />
                    <input className="border border-border p-3 text-sm bg-background w-full" name="model" placeholder="Modèle / Cible" onChange={handleTextChange} />

                    <select className="border border-border p-3 text-sm bg-background w-full text-muted-foreground" name="size" onChange={handleTextChange} defaultValue="small">
                        <option value="small">Taille Standard (Petite)</option>
                        <option value="medium">Taille Intermédiaire (Moyenne)</option>
                        <option value="large">Pleine Largeur (Pour Avant/Après)</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <input className="border border-border p-3 text-sm bg-background w-full" name="time_spent" placeholder="Réactivité (ex: 48H)" onChange={handleTextChange} />
                    <input className="border border-border p-3 text-sm bg-background w-full" name="solution" placeholder="Solution" onChange={handleTextChange} />
                    <input className="border border-border p-3 text-sm bg-background w-full" name="impact" placeholder="Impact Client" onChange={handleTextChange} />
                </div>

                <textarea className="border border-border p-3 text-sm bg-background w-full h-20 mb-4" name="context" placeholder="01. Contexte Client" onChange={handleTextChange} />
                <textarea className="border border-border p-3 text-sm bg-background w-full h-20 mb-4" name="work_done" placeholder="02. Travaux effectués (Séparés par des virgules)" onChange={handleTextChange} />
                <textarea className="border border-border p-3 text-sm bg-background w-full h-20 mb-8" name="result" placeholder="03. Résultat B2B Obtenu" onChange={handleTextChange} />

                {status && <div className="mb-4 text-label text-primary">{status}</div>}

                <button onClick={handleSubmit} disabled={uploading} className="btn-primary">
                    <span>ENREGISTRER LA RÉALISATION</span>
                </button>
            </div>
        </div>
    );
}
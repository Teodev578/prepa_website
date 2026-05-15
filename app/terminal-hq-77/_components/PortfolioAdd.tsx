"use client";
import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PortfolioAdd() {
    const supabase = createClient();
    
    // Valeurs par défaut pour la réinitialisation
    const initialFormState = {
        ref_id: `REA_${Math.floor(Math.random() * 1000)}`, // Génère un ID un peu plus unique par défaut
        title: '', treatment: '', date_tag: 'ÉTUDE_DE_CAS', model: '',
        time_spent: '', solution: '', impact: '', context: '', work_done: '', result: '',
        size: 'small', img_single: '', img_before: '', img_after: ''
    };

    const [uploading, setUploading] = useState(false);
    const [imageStatus, setImageStatus] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [formData, setFormData] = useState(initialFormState);

    const handleTextChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileUpload = async (e: any, fieldName: string) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setUploading(true);
        setImageStatus('Chargement de la photo en cours... ⏳');
        setSubmitStatus('');

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);

        if (error) {
            setImageStatus("❌ Oups, impossible de charger l'image : " + error.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
        setFormData(prev => ({ ...prev, [fieldName]: data.publicUrl }));
        setImageStatus(''); 
        setUploading(false);
    };

    const handleRemoveImage = (fieldName: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: '' }));
        setImageStatus('');
    };

    // === ENREGISTREMENT ET RÉINITIALISATION ===
    const handleSubmitPortfolio = async () => {
        setSubmitStatus('Enregistrement de votre projet en cours... ⏳');
        
        const workArray = formData.work_done.split(',').map(item => item.trim()).filter(Boolean);
        
        const { error } = await supabase.from('portfolio_projects').insert([{
            ...formData,
            work_done: workArray,
            title: formData.title.toUpperCase(),
            treatment: formData.treatment.toUpperCase()
        }]);

        if (error) {
            setSubmitStatus("❌ Erreur : " + error.message);
        } else {
            setSubmitStatus('✅ Super ! Votre projet a bien été publié sur le site.');
            
            // --- C'EST ICI QUE LE FORMULAIRE SE VIDE ---
            setFormData(initialFormState); 
            
            // Optionnel : Effacer le message de succès après 5 secondes
            setTimeout(() => setSubmitStatus(''), 5000);
        }
    };

    const hasSingleImage = !!formData.img_single;
    const hasBeforeAfter = !!formData.img_before || !!formData.img_after;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-card border border-border rounded-lg shadow-lg relative text-foreground">
            <h1 className="text-2xl font-bold text-primary mb-2">Ajouter un nouveau projet</h1>
            <p className="text-muted-foreground mb-8">Remplissez les informations ci-dessous pour montrer votre travail à vos clients.</p>

            {/* --- ÉTAPE 1 : LES PHOTOS --- */}
            <div className="mb-10 bg-background/50 p-6 rounded-md border border-border">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">1. Les photos du projet</h2>
                    <p className="text-sm text-muted-foreground">Choisissez soit de mettre une seule belle photo, soit un avant/après.</p>
                </div>

                {imageStatus && (
                    <div className={`mb-6 p-3 rounded text-sm font-medium border ${imageStatus.includes('❌') ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}>
                        {imageStatus}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`flex flex-col gap-2 ${hasBeforeAfter ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <label className="text-sm font-bold">Photo Unique</label>
                        {!formData.img_single ? (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'img_single')} disabled={uploading || hasBeforeAfter} />
                                <span className="text-primary text-sm font-medium">➕ Ajouter une photo</span>
                            </div>
                        ) : (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
                                <img src={formData.img_single} alt="Aperçu" className="w-full h-full object-cover" />
                                <button onClick={() => handleRemoveImage('img_single')} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">Retirer</button>
                            </div>
                        )}
                    </div>

                    <div className={`flex flex-col gap-2 ${hasSingleImage ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <label className="text-sm font-bold">Photo "Avant"</label>
                        {!formData.img_before ? (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'img_before')} disabled={uploading || hasSingleImage} />
                                <span className="text-primary text-sm font-medium">➕ Photo Avant</span>
                            </div>
                        ) : (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
                                <img src={formData.img_before} alt="Aperçu Avant" className="w-full h-full object-cover" />
                                <button onClick={() => handleRemoveImage('img_before')} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">Retirer</button>
                            </div>
                        )}
                    </div>

                    <div className={`flex flex-col gap-2 ${hasSingleImage ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <label className="text-sm font-bold">Photo "Après"</label>
                        {!formData.img_after ? (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'img_after')} disabled={uploading || hasSingleImage} />
                                <span className="text-primary text-sm font-medium">➕ Photo Après</span>
                            </div>
                        ) : (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
                                <img src={formData.img_after} alt="Aperçu Après" className="w-full h-full object-cover" />
                                <button onClick={() => handleRemoveImage('img_after')} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">Retirer</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- ÉTAPE 2 : INFORMATIONS DE BASE --- */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">2. Informations principales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Nom du projet</label>
                        <input className="border border-border p-3 rounded bg-background" name="title" value={formData.title} placeholder="Ex: Rénovation Peugeot 208" onChange={handleTextChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Service réalisé</label>
                        <input className="border border-border p-3 rounded bg-background" name="treatment" value={formData.treatment} placeholder="Ex: Polissage" onChange={handleTextChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Modèle ou Objet</label>
                        <input className="border border-border p-3 rounded bg-background" name="model" value={formData.model} placeholder="Ex: Berline noire" onChange={handleTextChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Taille d'affichage</label>
                        <select className="border border-border p-3 rounded bg-background" name="size" value={formData.size} onChange={handleTextChange}>
                            <option value="small">Taille normale</option>
                            <option value="medium">Taille moyenne</option>
                            <option value="large">Grande taille</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* --- ÉTAPE 3 : LES DÉTAILS --- */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">3. Les petits détails</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Temps passé</label>
                        <input className="border border-border p-3 rounded bg-background" name="time_spent" value={formData.time_spent} placeholder="Ex: 4 heures" onChange={handleTextChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Action phare</label>
                        <input className="border border-border p-3 rounded bg-background" name="solution" value={formData.solution} placeholder="Ex: Nettoyage vapeur" onChange={handleTextChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Bénéfice</label>
                        <input className="border border-border p-3 rounded bg-background" name="impact" value={formData.impact} placeholder="Ex: Aspect neuf" onChange={handleTextChange} />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <textarea className="border border-border p-3 rounded bg-background h-24" name="context" value={formData.context} placeholder="Problème de départ ?" onChange={handleTextChange} />
                    <textarea className="border border-border p-3 rounded bg-background h-24" name="work_done" value={formData.work_done} placeholder="Travaux (virgule entre chaque étape)" onChange={handleTextChange} />
                    <textarea className="border border-border p-3 rounded bg-background h-24" name="result" value={formData.result} placeholder="Résultat final ?" onChange={handleTextChange} />
                </div>
            </div>

            {submitStatus && (
                <div className={`mb-4 p-4 rounded text-sm font-medium ${submitStatus.includes('❌') ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'}`}>
                    {submitStatus}
                </div>
            )}
            
            <button 
                onClick={handleSubmitPortfolio} 
                disabled={uploading} 
                className="w-full md:w-auto bg-primary text-primary-foreground font-bold py-3 px-8 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
                {uploading ? 'Photo en cours...' : 'Publier ce projet'}
            </button>
        </div>
    );
}
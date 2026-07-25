"use client";
import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// 🛡️ 1. Définition stricte de la structure des données du formulaire
interface PortfolioFormData {
    ref_id: string;
    title: string;
    treatment: string;
    date_tag: string;
    model: string;
    time_spent: string;
    solution: string;
    impact: string;
    context: string;
    work_done: string;
    result: string;
    size: 'small' | 'medium' | 'large';
    img_single: string;
    img_before: string;
    img_after: string;
    carousel_images: string[];
}

const getInitialState = (): PortfolioFormData => ({
    ref_id: `REA_${Date.now()}`,
    title: '', treatment: '', date_tag: 'ÉTUDE_DE_CAS', model: '',
    time_spent: '', solution: '', impact: '', context: '', work_done: '', result: '',
    size: 'small', img_single: '', img_before: '', img_after: '', carousel_images: []
});

export default function PortfolioAdd() {
    const supabase = createClient();
    
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [imageStatus, setImageStatus] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [formData, setFormData] = useState<PortfolioFormData>(getInitialState());

    // 🛡️ 2. Typage précis de l'événement de modification textuelle
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // 🛡️ 3. Typage de l'événement d'upload et sécurisation du fichier
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Pick<PortfolioFormData, 'img_single' | 'img_before' | 'img_after'>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            setImageStatus("❌ Veuillez sélectionner une image valide (JPG, PNG...).");
            return;
        }
        if (file.size > 5 * 1024 * 1024) { 
            setImageStatus("❌ L'image est trop lourde (5 Mo maximum).");
            return;
        }
        
        setUploading(true);
        setImageStatus('Chargement de la photo en cours... ⏳');
        setSubmitStatus('');

        // Extraction propre de l'extension sans paramètres parasites
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        
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

    // 🛡️ 4. Nettoyage sécurisé des images (ignore les query params d'URL)
    const handleRemoveImage = async (fieldName: keyof Pick<PortfolioFormData, 'img_single' | 'img_before' | 'img_after'>) => {
        const imageUrl = formData[fieldName];
        if (imageUrl) {
            // On nettoie l'URL d'éventuels paramètres '?t=...' avant d'isoler le nom du fichier
            const cleanUrl = imageUrl.split('?')[0];
            const fileName = cleanUrl.split('/').pop(); 
            if (fileName) {
                await supabase.storage.from('portfolio-images').remove([fileName]);
            }
        }

        setFormData(prev => ({ ...prev, [fieldName]: '' }));
        setImageStatus('');
    };

    // 🛡️ 5. Gestion spécifique du carrousel
    const handleCarouselUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        
        if (formData.carousel_images.length + files.length > 5) {
            setImageStatus("❌ Vous ne pouvez ajouter que 5 photos maximum au carrousel.");
            return;
        }

        setUploading(true);
        setImageStatus(`Chargement de ${files.length} photo(s) en cours... ⏳`);
        setSubmitStatus('');

        const newUrls: string[] = [];
        let hasError = false;

        for (const file of files) {
            if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
                hasError = true;
                continue;
            }

            const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
            const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
            
            const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
            if (!error) {
                const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
                newUrls.push(data.publicUrl);
            } else {
                hasError = true;
            }
        }

        if (newUrls.length > 0) {
            setFormData(prev => ({ ...prev, carousel_images: [...prev.carousel_images, ...newUrls] }));
            setImageStatus(hasError ? '⚠️ Certaines images ont échoué ou étaient invalides.' : '');
        } else {
            setImageStatus("❌ Erreur lors du chargement des images.");
        }
        setUploading(false);
    };

    const handleRemoveCarouselImage = async (indexToRemove: number) => {
        const imageUrl = formData.carousel_images[indexToRemove];
        if (imageUrl) {
            const cleanUrl = imageUrl.split('?')[0];
            const fileName = cleanUrl.split('/').pop(); 
            if (fileName) {
                await supabase.storage.from('portfolio-images').remove([fileName]);
            }
        }

        setFormData(prev => ({
            ...prev,
            carousel_images: prev.carousel_images.filter((_, i) => i !== indexToRemove)
        }));
        setImageStatus('');
    };

    const handleSubmitPortfolio = async () => {
        if (!formData.title.trim()) {
            setSubmitStatus("❌ Veuillez au moins donner un nom au projet.");
            return;
        }
        if (!formData.img_single && !formData.img_before && formData.carousel_images.length === 0) {
            setSubmitStatus("❌ Veuillez ajouter au moins une photo, un avant/après ou un carrousel pour ce projet.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('Enregistrement de votre projet en cours... ⏳');
        
        const workArray = formData.work_done.split(',').map(item => item.trim()).filter(Boolean);
        
        const { error } = await supabase.from('portfolio_projects').insert([{
            ...formData,
            work_done: workArray,
            title: formData.title.trim().toUpperCase(),
            treatment: formData.treatment.trim().toUpperCase()
        }]);

        if (error) {
            setSubmitStatus("❌ Erreur : " + error.message);
            setIsSubmitting(false);
        } else {
            setSubmitStatus('✅ Super ! Votre projet a bien été publié sur le site.');
            setFormData(getInitialState()); 
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(''), 5000);
        }
    };

    const hasSingleImage = !!formData.img_single;
    const hasBeforeAfter = !!formData.img_before || !!formData.img_after;
    const hasCarousel = formData.carousel_images.length > 0;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-card border border-border rounded-lg shadow-lg relative text-foreground">
            <h1 className="text-2xl font-bold text-primary mb-2">Ajouter un nouveau projet</h1>
            <p className="text-muted-foreground mb-8">Remplissez les informations ci-dessous pour montrer votre travail à vos clients.</p>

            {/* --- ÉTAPE 1 : LES PHOTOS --- */}
            <div className="mb-10 bg-background/50 p-6 rounded-md border border-border">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">1. Les photos du projet</h2>
                    <p className="text-sm text-muted-foreground">Choisissez soit de mettre une seule belle photo, un avant/après, ou un carrousel (jusqu'à 5 photos).</p>
                </div>

                {imageStatus && (
                    <div className={`mb-6 p-3 rounded text-sm font-medium border ${imageStatus.includes('❌') ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}>
                        {imageStatus}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className={`flex flex-col gap-2 ${hasBeforeAfter || hasCarousel ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <label className="text-sm font-bold">Photo Unique</label>
                        {!formData.img_single ? (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'img_single')} disabled={uploading || hasBeforeAfter || hasCarousel || isSubmitting} />
                                <span className="text-primary text-sm font-medium">➕ Ajouter une photo</span>
                            </div>
                        ) : (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
                                <img src={formData.img_single} alt="Aperçu" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveImage('img_single')} disabled={isSubmitting} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">Retirer</button>
                            </div>
                        )}
                    </div>

                    <div className={`flex flex-col gap-2 ${hasSingleImage || hasCarousel ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <label className="text-sm font-bold">Photo "Avant"</label>
                        {!formData.img_before ? (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'img_before')} disabled={uploading || hasSingleImage || hasCarousel || isSubmitting} />
                                <span className="text-primary text-sm font-medium">➕ Photo Avant</span>
                            </div>
                        ) : (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
                                <img src={formData.img_before} alt="Aperçu Avant" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveImage('img_before')} disabled={isSubmitting} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">Retirer</button>
                            </div>
                        )}
                    </div>

                    <div className={`flex flex-col gap-2 ${hasSingleImage || hasCarousel ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                        <label className="text-sm font-bold">Photo "Après"</label>
                        {!formData.img_after ? (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'img_after')} disabled={uploading || hasSingleImage || hasCarousel || isSubmitting} />
                                <span className="text-primary text-sm font-medium">➕ Photo Après</span>
                            </div>
                        ) : (
                            <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
                                <img src={formData.img_after} alt="Aperçu Après" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveImage('img_after')} disabled={isSubmitting} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">Retirer</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`flex flex-col gap-2 ${hasSingleImage || hasBeforeAfter ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                    <label className="text-sm font-bold">Carrousel de Photos (Max 5)</label>
                    <div className="flex flex-wrap gap-4">
                        {formData.carousel_images.map((img, i) => (
                            <div key={i} className="relative h-32 w-32 rounded-lg overflow-hidden border border-border group">
                                <img src={img} alt={`Carrousel ${i}`} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveCarouselImage(i)} disabled={isSubmitting} className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded shadow-md">X</button>
                            </div>
                        ))}
                        {formData.carousel_images.length < 5 && (
                            <div className="relative border-2 border-dashed border-primary/40 rounded-lg h-32 w-32 flex items-center justify-center bg-background hover:bg-primary/5 transition-colors cursor-pointer">
                                <input type="file" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleCarouselUpload} disabled={uploading || hasSingleImage || hasBeforeAfter || isSubmitting} />
                                <span className="text-primary text-xs font-medium text-center px-2">➕ Ajouter</span>
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
                        <label htmlFor="pa-title" className="text-xs font-semibold text-muted-foreground uppercase">Nom du projet *</label>
                        <input id="pa-title" className="border border-border p-3 rounded bg-background" name="title" value={formData.title} placeholder="Ex: Rénovation Peugeot 208" onChange={handleTextChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pa-treatment" className="text-xs font-semibold text-muted-foreground uppercase">Service réalisé</label>
                        <input id="pa-treatment" className="border border-border p-3 rounded bg-background" name="treatment" value={formData.treatment} placeholder="Ex: Polissage" onChange={handleTextChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pa-model" className="text-xs font-semibold text-muted-foreground uppercase">Modèle ou Objet</label>
                        <input id="pa-model" className="border border-border p-3 rounded bg-background" name="model" value={formData.model} placeholder="Ex: Berline noire" onChange={handleTextChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pa-size" className="text-xs font-semibold text-muted-foreground uppercase">Taille d'affichage</label>
                        <select id="pa-size" className="border border-border p-3 rounded bg-background" name="size" value={formData.size} onChange={handleTextChange} disabled={isSubmitting}>
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
                        <label htmlFor="pa-time-spent" className="text-xs font-semibold text-muted-foreground uppercase">Temps passé</label>
                        <input id="pa-time-spent" className="border border-border p-3 rounded bg-background" name="time_spent" value={formData.time_spent} placeholder="Ex: 4 heures" onChange={handleTextChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pa-solution" className="text-xs font-semibold text-muted-foreground uppercase">Action phare</label>
                        <input id="pa-solution" className="border border-border p-3 rounded bg-background" name="solution" value={formData.solution} placeholder="Ex: Nettoyage vapeur" onChange={handleTextChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pa-impact" className="text-xs font-semibold text-muted-foreground uppercase">Bénéfice</label>
                        <input id="pa-impact" className="border border-border p-3 rounded bg-background" name="impact" value={formData.impact} placeholder="Ex: Aspect neuf" onChange={handleTextChange} disabled={isSubmitting} />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <textarea aria-label="Problème de départ" className="border border-border p-3 rounded bg-background h-24" name="context" value={formData.context} placeholder="Problème de départ ?" onChange={handleTextChange} disabled={isSubmitting} />
                    <textarea aria-label="Travaux réalisés" className="border border-border p-3 rounded bg-background h-24" name="work_done" value={formData.work_done} placeholder="Travaux (virgule entre chaque étape)" onChange={handleTextChange} disabled={isSubmitting} />
                    <textarea aria-label="Résultat final" className="border border-border p-3 rounded bg-background h-24" name="result" value={formData.result} placeholder="Résultat final ?" onChange={handleTextChange} disabled={isSubmitting} />
                </div>
            </div>

            {submitStatus && (
                <div className={`mb-4 p-4 rounded text-sm font-medium ${submitStatus.includes('❌') ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'}`}>
                    {submitStatus}
                </div>
            )}
            
            <button 
                type="button"
                onClick={handleSubmitPortfolio} 
                disabled={uploading || isSubmitting} 
                className="w-full md:w-auto bg-primary text-primary-foreground font-bold py-3 px-8 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
                {uploading ? 'Photo en cours...' : isSubmitting ? 'Publication en cours...' : 'Publier ce projet'}
            </button>
        </div>
    );
}
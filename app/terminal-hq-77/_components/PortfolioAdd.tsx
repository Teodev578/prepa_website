"use client";
import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PortfolioAdd() {
    const supabase = createClient();
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        ref_id: 'REA_005', title: '', treatment: '', date_tag: 'ÉTUDE_DE_CAS', model: '',
        time_spent: '', solution: '', impact: '', context: '', work_done: '', result: '',
        size: 'small', img_single: '', img_before: '', img_after: ''
    });

    const handleTextChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileUpload = async (e: any, fieldName: string) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setStatus(`UPLOAD EN COURS... (${fieldName})`);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);

        if (error) {
            setStatus('ERREUR: ' + error.message);
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
        setFormData(prev => ({ ...prev, [fieldName]: data.publicUrl }));
        setStatus(`UPLOAD TERMINÉ (${fieldName})`);
        setUploading(false);
    };

    const handleSubmitPortfolio = async () => {
        setStatus('SAUVEGARDE...');
        const workArray = formData.work_done.split(',').map(item => item.trim());
        const { error } = await supabase.from('portfolio_projects').insert([{
            ...formData,
            work_done: workArray,
            title: formData.title.toUpperCase(),
            treatment: formData.treatment.toUpperCase()
        }]);

        if (error) setStatus('ERREUR BDD: ' + error.message);
        else setStatus('RÉALISATION PUBLIÉE AVEC SUCCÈS !');
    };

    return (
        <div className="max-w-4xl mx-auto border-technical p-8 bg-card relative shadow-2xl">
            <div className="tech-corner absolute top-0 left-0" />
            <h1 className="text-card-title text-primary mb-2">TERMINAL D'ARCHIVAGE</h1>
            <p className="text-detail text-muted-foreground mb-8">AJOUT DE NOUVELLES RÉALISATIONS (DRAG & DROP)</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {['img_single', 'img_before', 'img_after'].map((field) => (
                    <div key={field} className="relative border border-dashed border-primary/50 bg-background/50 p-6 text-center hover:bg-primary/10 transition-colors cursor-pointer group">
                        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, field)} disabled={uploading} />
                        <div className="pointer-events-none flex flex-col items-center gap-2">
                            <span className="text-primary text-[24px]">⇪</span>
                            <span className="text-label text-primary group-hover:text-foreground">{(formData as any)[field] ? 'IMAGE CHARGÉE' : `GLISSER ${field.toUpperCase()}`}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input className="border border-border p-3 text-sm bg-background/50 w-full" name="title" placeholder="Titre (ex: FLOTTE V.O)" onChange={handleTextChange} />
                <input className="border border-border p-3 text-sm bg-background/50 w-full" name="treatment" placeholder="Traitement (ex: DÉSENGORGEMENT)" onChange={handleTextChange} />
                <input className="border border-border p-3 text-sm bg-background/50 w-full" name="model" placeholder="Modèle / Cible" onChange={handleTextChange} />
                <select className="border border-border p-3 text-sm bg-background/50 w-full text-muted-foreground" name="size" onChange={handleTextChange} defaultValue="small">
                    <option value="small">Taille Standard (Petite)</option>
                    <option value="medium">Taille Intermédiaire (Moyenne)</option>
                    <option value="large">Pleine Largeur (Pour Avant/Après)</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <input className="border border-border p-3 text-sm bg-background/50 w-full" name="time_spent" placeholder="Réactivité (ex: 48H)" onChange={handleTextChange} />
                <input className="border border-border p-3 text-sm bg-background/50 w-full" name="solution" placeholder="Solution" onChange={handleTextChange} />
                <input className="border border-border p-3 text-sm bg-background/50 w-full" name="impact" placeholder="Impact Client" onChange={handleTextChange} />
            </div>

            <textarea className="border border-border p-3 text-sm bg-background/50 w-full h-20 mb-4" name="context" placeholder="01. Contexte Client" onChange={handleTextChange} />
            <textarea className="border border-border p-3 text-sm bg-background/50 w-full h-20 mb-4" name="work_done" placeholder="02. Travaux effectués (Séparés par des virgules)" onChange={handleTextChange} />
            <textarea className="border border-border p-3 text-sm bg-background/50 w-full h-20 mb-8" name="result" placeholder="03. Résultat B2B Obtenu" onChange={handleTextChange} />

            {status && <div className="mb-4 text-label text-primary">{status}</div>}
            <button onClick={handleSubmitPortfolio} disabled={uploading} className="btn-primary w-full md:w-auto">
                <span>ENREGISTRER LA RÉALISATION</span>
            </button>
        </div>
    );
}
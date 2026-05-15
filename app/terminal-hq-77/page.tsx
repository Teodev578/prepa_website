"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type AdminView = 'PORTFOLIO_ADD' | 'PORTFOLIO_LIST' | 'QUOTES_INBOX' | 'FORMS_CONFIG' | 'SERVICES_CATALOG';

export default function AdminPage() {
    const supabase = createClient();
    const router = useRouter();

    // --- ÉTATS GLOBAUX ---
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<AdminView>('PORTFOLIO_ADD');

    // ==========================================
    // 📁 MODULE 1 : PORTFOLIO
    // ==========================================
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
        if (error) { setStatus('ERREUR: ' + error.message); setUploading(false); return; }
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
        setFormData(prev => ({ ...prev, [fieldName]: data.publicUrl }));
        setStatus(`UPLOAD TERMINÉ (${fieldName})`);
        setUploading(false);
    };

    const handleSubmitPortfolio = async () => {
        setStatus('SAUVEGARDE...');
        const workArray = formData.work_done.split(',').map(item => item.trim());
        const { error } = await supabase.from('portfolio_projects').insert([{
            ...formData, work_done: workArray, title: formData.title.toUpperCase(), treatment: formData.treatment.toUpperCase()
        }]);
        if (error) setStatus('ERREUR BDD: ' + error.message);
        else setStatus('RÉALISATION PUBLIÉE AVEC SUCCÈS !');
    };

    // ==========================================
    // ⚙️ MODULE 2 : CONFIG FORMULAIRES
    // ==========================================
    const [activeProfile, setActiveProfile] = useState<'PARTICULIER' | 'ENTREPRISE'>('PARTICULIER');
    const [currentFormId, setCurrentFormId] = useState<string | null>(null);
    const [formFields, setFormFields] = useState<any[]>([]);
    const [newField, setNewField] = useState({
        field_label: '', field_type: 'text', options: '', is_required: true
    });

    useEffect(() => {
        if (currentView === 'FORMS_CONFIG') {
            loadFormConfig();
        }
    }, [currentView, activeProfile]);

    const loadFormConfig = async () => {
        try {
            // 1. Chercher le formulaire correspondant au profil
            let { data: form, error: fetchError } = await supabase.from('forms').select('id').eq('profile_type', activeProfile).single();

            // Sécurité : Si le formulaire n'existe pas en DB, on le crée (Auto-initialisation)
            if (!form) {
                const { data: newForm, error: insertError } = await supabase.from('forms').insert([
                    { profile_type: activeProfile, title: `Formulaire ${activeProfile}`, is_active: true }
                ]).select('id').single();

                if (insertError) {
                    console.error(insertError);
                    alert("ERREUR : Impossible de créer le formulaire en Base de données. RLS est-il désactivé sur la table 'forms' ?");
                    return;
                }
                form = newForm;
            }

            if (form) {
                setCurrentFormId(form.id);
                // 2. Charger les champs associés
                const { data: fields } = await supabase.from('form_fields')
                    .select('*').eq('form_id', form.id).order('display_order', { ascending: true });

                setFormFields(fields || []);
            }
        } catch (err: any) {
            console.error("Erreur de chargement:", err);
        }
    };

    const handleAddField = async () => {
        if (!newField.field_label) return;

        const fieldName = newField.field_label.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const optionsJson = newField.field_type === 'select'
            ? newField.options.split(',').map(o => o.trim()).filter(o => o)
            : null;

        const { error } = await supabase.from('form_fields').insert([{
            form_id: currentFormId,
            field_name: fieldName,
            field_label: newField.field_label.toUpperCase(),
            field_type: newField.field_type,
            options: optionsJson,
            is_required: newField.is_required,
            display_order: formFields.length + 1
        }]);

        if (!error) {
            setNewField({ field_label: '', field_type: 'text', options: '', is_required: true });
            loadFormConfig();
        } else {
            alert("Erreur lors de l'ajout : " + error.message);
        }
    };

    const handleDeleteField = async (id: string) => {
        if (!window.confirm("Supprimer cette variable ?")) return;
        await supabase.from('form_fields').delete().eq('id', id);
        loadFormConfig();
    };

    // ==========================================
    // 🔒 AUTHENTIFICATION
    // ==========================================
    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push('/login');
            else setLoading(false);
        };
        checkSession();
    }, [router, supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-primary font-mono animate-pulse text-xl">SYS.INIT_SESSION...</p></div>;

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">

            {/* 🖥️ NAVIGATION DRAWER (SIDEBAR) */}
            <aside className="w-64 border-r border-primary/20 bg-card/30 flex flex-col justify-between hidden md:flex relative">
                <div className="tech-corner absolute top-0 right-0" />
                <div className="p-6">
                    <h2 className="text-primary font-mono text-xl mb-8 tracking-widest border-b border-primary/20 pb-4">SYS.ADMIN_HQ</h2>
                    <nav className="space-y-2 font-mono text-sm">
                        <p className="text-muted-foreground text-xs mb-2 mt-6">/// GESTION VISUELLE</p>
                        <button onClick={() => setCurrentView('PORTFOLIO_ADD')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'PORTFOLIO_ADD' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[+] AJOUT PORTFOLIO</button>
                        <button onClick={() => setCurrentView('PORTFOLIO_LIST')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'PORTFOLIO_LIST' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[=] LISTE ARCHIVES</button>

                        <p className="text-muted-foreground text-xs mb-2 mt-8">/// GESTION COMMERCIALE</p>
                        <button onClick={() => setCurrentView('QUOTES_INBOX')} className={`w-full text-left px-3 py-2 transition-all flex justify-between ${currentView === 'QUOTES_INBOX' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>
                            <span>[{'>'}] INBOX DEVIS</span><span className="bg-destructive text-destructive-foreground px-1.5 text-[10px] flex items-center justify-center rounded-none animate-pulse">NEW</span>
                        </button>
                        <button onClick={() => setCurrentView('SERVICES_CATALOG')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'SERVICES_CATALOG' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[*] PROTOCOLES & PRIX</button>

                        <p className="text-muted-foreground text-xs mb-2 mt-8">/// SYSTÈME</p>
                        <button onClick={() => setCurrentView('FORMS_CONFIG')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'FORMS_CONFIG' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[⚙] CONFIG FORMULAIRES</button>
                    </nav>
                </div>
                <div className="p-6 border-t border-primary/20">
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-muted-foreground hover:text-destructive transition-colors font-mono text-sm">[X] DÉCONNEXION</button>
                </div>
            </aside>

            {/* 🖥️ MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto p-6 md:p-12 relative bg-grid-pattern">

                {/* ========================================== */}
                {/* VUE 1 : AJOUT DE PORTFOLIO                 */}
                {/* ========================================== */}
                {currentView === 'PORTFOLIO_ADD' && (
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
                        <button onClick={handleSubmitPortfolio} disabled={uploading} className="btn-primary w-full md:w-auto"><span>ENREGISTRER LA RÉALISATION</span></button>
                    </div>
                )}

                {/* ========================================== */}
                {/* VUE 2 : CONFIGURATION DES FORMULAIRES      */}
                {/* ========================================== */}
                {currentView === 'FORMS_CONFIG' && (
                    <div className="max-w-5xl mx-auto border-technical p-8 bg-card relative shadow-2xl">
                        <div className="tech-corner absolute top-0 left-0" />
                        <h1 className="text-card-title text-primary mb-2">CONFIG_FORMULAIRES</h1>
                        <p className="text-detail text-muted-foreground mb-8">MODIFICATION DYNAMIQUE DES VARIABLES CLIENTS (PAGE DEVIS)</p>

                        <div className="flex border bg-muted w-fit rounded-none mb-8 p-1">
                            {['PARTICULIER', 'ENTREPRISE'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setActiveProfile(p as any)}
                                    className={`px-6 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${activeProfile === p ? 'bg-primary text-background font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <div className="mb-12">
                            <h2 className="font-mono text-sm text-primary mb-4 border-b border-primary/20 pb-2">VARIABLES ACTUELLES [{activeProfile}]</h2>

                            {formFields.length === 0 ? (
                                <p className="text-muted-foreground font-mono text-xs italic">AUCUNE VARIABLE ENREGISTRÉE POUR CE PROFIL.</p>
                            ) : (
                                <div className="space-y-3">
                                    {formFields.map((field, index) => (
                                        <div key={field.id} className="flex items-center justify-between border border-border bg-background/50 p-4 hover:border-primary/50 transition-colors">
                                            <div className="flex items-center gap-6">
                                                <span className="text-muted-foreground font-mono text-xs opacity-50">0{index + 1}</span>
                                                <div>
                                                    <p className="font-mono text-sm text-foreground font-bold tracking-widest">{field.field_label} <span className="text-primary text-[10px] ml-2">[{field.field_type.toUpperCase()}]</span></p>
                                                    <p className="font-mono text-[10px] text-muted-foreground mt-1">SYS_NAME: {field.field_name} | REQUIS: {field.is_required ? 'OUI' : 'NON'}</p>
                                                    {field.field_type === 'select' && field.options && (
                                                        <p className="font-mono text-[9px] text-muted-foreground mt-1 bg-muted px-2 py-1 inline-block">OPT: {field.options.join(' / ')}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteField(field.id)} className="text-destructive hover:bg-destructive/10 px-3 py-2 font-mono text-xs transition-colors">
                                                [ SUPPRIMER ]
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border border-primary/20 bg-primary/5 p-6 relative">
                            <h2 className="font-mono text-sm text-primary mb-6">AJOUTER UNE NOUVELLE VARIABLE</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="col-span-2">
                                    <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] block mb-2">LABEL AFFICHÉ (ex: SIRET_ID)</label>
                                    <input type="text" value={newField.field_label} onChange={e => setNewField({ ...newField, field_label: e.target.value })} className="border border-border p-3 text-sm bg-background w-full outline-none focus:border-primary font-mono uppercase" placeholder="NOM DU CHAMP" />
                                </div>

                                <div>
                                    <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] block mb-2">TYPE DE DONNÉE</label>
                                    <select value={newField.field_type} onChange={e => setNewField({ ...newField, field_type: e.target.value })} className="border border-border p-3 text-sm bg-background w-full outline-none focus:border-primary font-mono cursor-pointer">
                                        <option value="text">TEXTE LIBRE</option>
                                        <option value="email">ADRESSE EMAIL</option>
                                        <option value="select">SÉLECTEUR (CHOIX)</option>
                                    </select>
                                </div>

                                <div className="flex items-end pb-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={newField.is_required} onChange={e => setNewField({ ...newField, is_required: e.target.checked })} className="w-5 h-5 accent-primary border-border bg-background" />
                                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">CHAMP REQUIS</span>
                                    </label>
                                </div>
                            </div>

                            {newField.field_type === 'select' && (
                                <div className="mb-6">
                                    <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] block mb-2">OPTIONS POSSIBLES (Séparées par des virgules)</label>
                                    <input type="text" value={newField.options} onChange={e => setNewField({ ...newField, options: e.target.value })} className="border border-border p-3 text-sm bg-background w-full outline-none focus:border-primary font-mono uppercase" placeholder="NEUF_FACTORY, USAGE_MODERE, RESTAURATION" />
                                </div>
                            )}

                            <button onClick={handleAddField} className="btn-primary w-full md:w-auto mt-4">
                                <span>[+] INTÉGRER AU FORMULAIRE</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ========================================== */}
                {/* VUES FUTURES (MODULES NON ACTIFS)          */}
                {/* ========================================== */}
                {!['PORTFOLIO_ADD', 'FORMS_CONFIG'].includes(currentView) && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <div className="text-primary text-6xl mb-4">🚧</div>
                        <h2 className="text-xl font-mono text-primary mb-2">MODULE EN DÉVELOPPEMENT</h2>
                        <p className="text-muted-foreground font-mono text-sm max-w-md">La section <span className="text-foreground font-bold">[{currentView}]</span> n'est pas encore connectée à la base de données.</p>
                    </div>
                )}

            </main>
        </div>
    );
}
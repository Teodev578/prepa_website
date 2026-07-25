"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Service = {
    id: string;
    label: string;
    description: string;
    base_price: number;
    is_active: boolean;
};

export default function ServicesCatalog() {
    const supabase = createClient();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // États pour l'ajout / édition
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isModaleOpen, setIsModaleOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '', label: '', description: '', base_price: 0, is_active: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            setError("❌ Impossible de charger le catalogue : " + error.message);
        } else {
            setServices(data || []);
        }
        setLoading(false);
    };

    // ⚡ TOGGLE ACTIF / INACTIF INSTANTANÉ
    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;
        
        // Mise à jour optimiste locale pour une interface fluide
        setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: nextStatus } : s));

        const { error } = await supabase
            .from('services')
            .update({ is_active: nextStatus })
            .eq('id', id);

        if (error) {
            alert("Erreur lors de la modification du statut : " + error.message);
            // Annulation du changement local en cas d'erreur
            setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: currentStatus } : s));
        }
    };

    // Ouvrir la modale en mode création
    const handleOpenCreate = () => {
        setEditingService(null);
        setFormData({ id: '', label: '', description: '', base_price: 0, is_active: true });
        setIsModaleOpen(true);
    };

    // Ouvrir la modale en mode édition
    const handleOpenEdit = (service: Service) => {
        setEditingService(service);
        setFormData({
            id: service.id,
            label: service.label,
            description: service.description || '',
            base_price: service.base_price || 0,
            is_active: service.is_active
        });
        setIsModaleOpen(true);
    };

    // Enregistrer (Création ou Modification)
    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const serviceData = {
            label: formData.label.toUpperCase(),
            description: formData.description,
            base_price: Number(formData.base_price),
            is_active: formData.is_active
        };

        if (editingService) {
            // MODE ÉDITION
            const { error } = await supabase
                .from('services')
                .update(serviceData)
                .eq('id', editingService.id);

            if (error) {
                alert("Erreur lors de la modification : " + error.message);
            } else {
                setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...serviceData } : s));
                setIsModaleOpen(false);
            }
        } else {
            // MODE CRÉATION
            const formattedId = formData.id.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
            const { error } = await supabase
                .from('services')
                .insert([{ id: formattedId, ...serviceData }]);

            if (error) {
                alert("Erreur lors de l'ajout : " + error.message);
            } else {
                setServices(prev => [...prev, { id: formattedId, ...serviceData }]);
                setIsModaleOpen(false);
            }
        }
        setIsSubmitting(false);
    };

    if (loading) {
        return <div className="p-8 text-muted-foreground animate-pulse">Chargement de votre catalogue de prestations... ⏳</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 text-left">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-2">Prestations & Tarifs</h1>
                    <p className="text-muted-foreground">Configurez vos services de detailing et vos grilles tarifaires.</p>
                </div>
                <button type="button" 
                    onClick={handleOpenCreate}
                    className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded hover:bg-primary/90 transition-colors text-sm self-start sm:self-center"
                >
                    ➕ Ajouter une prestation
                </button>
            </div>

            {error && <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20">{error}</div>}

            {services.length === 0 ? (
                <div className="text-center p-12 bg-card border border-border rounded-lg">
                    <p className="text-4xl mb-4">🛠️</p>
                    <h3 className="text-lg font-bold">Catalogue vide</h3>
                    <p className="text-muted-foreground text-sm mt-1">Vous n'avez pas encore configuré de services de detailing en base de données.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => (
                        <div 
                            key={service.id} 
                            className={`p-5 rounded-lg border bg-card flex flex-col justify-between transition-all ${
                                service.is_active ? 'border-border' : 'border-border/40 opacity-60'
                            }`}
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <span className="text-[10px] font-mono tracking-widest text-muted-foreground block mb-0.5">CODE : {service.id}</span>
                                        <h3 className="font-bold text-base text-foreground leading-tight">{service.label}</h3>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-bold text-primary text-lg">{service.base_price} €</p>
                                        <span className="text-[10px] text-muted-foreground font-medium block">Prix de base</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3 mt-3 mb-6 leading-relaxed">
                                    {service.description || "Aucune description fournie pour ce protocole."}
                                </p>
                            </div>

                            {/* Actions en bas de carte */}
                            <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ${service.is_active ? 'bg-primary' : 'bg-muted border'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ${service.is_active ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={service.is_active} 
                                        onChange={() => handleToggleActive(service.id, service.is_active)}
                                        className="hidden" 
                                    />
                                    <span className="text-xs font-semibold text-foreground/80 group-hover:text-foreground">
                                        {service.is_active ? 'Visible sur le site' : 'Masqué'}
                                    </span>
                                </label>

                                <button type="button" 
                                    onClick={() => handleOpenEdit(service)}
                                    className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded transition-colors"
                                >
                                    Modifier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* === MODALE D'AJOUT ET DE MODIFICATION === */}
            {isModaleOpen && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSaveService} className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-border flex justify-between items-center bg-card">
                            <h2 className="text-lg font-bold text-primary">
                                {editingService ? `Modifier : ${editingService.label}` : 'Ajouter une nouvelle prestation'}
                            </h2>
                            <button type="button" onClick={() => setIsModaleOpen(false)} className="text-muted-foreground hover:text-foreground">✖</button>
                        </div>

                        <div className="p-6 space-y-4 overflow-y-auto">
                            {/* CODE ID - Uniquement en création */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="sc-id" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Code technique unique</label>
                                <input 
                                    id="sc-id"
                                    type="text" 
                                    disabled={!!editingService}
                                    value={formData.id}
                                    onChange={e => setFormData({ ...formData, id: e.target.value })}
                                    className="border border-border p-3 rounded bg-background text-sm font-mono focus:border-primary disabled:opacity-50 disabled:bg-muted" 
                                    placeholder="Ex: CER_9H (Pas d'espaces)"
                                    required
                                />
                            </div>

                            {/* LIBELLÉ */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="sc-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nom affiché sur le site</label>
                                <input 
                                    id="sc-label"
                                    type="text" 
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    className="border border-border p-3 rounded bg-background text-sm focus:border-primary" 
                                    placeholder="Ex: Traitement Céramique Intégral"
                                    required
                                />
                            </div>

                            {/* PRIX */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="sc-price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Prix estimatif de base (€)</label>
                                <input 
                                    id="sc-price"
                                    type="number" 
                                    value={formData.base_price}
                                    onChange={e => setFormData({ ...formData, base_price: Number(e.target.value) })}
                                    className="border border-border p-3 rounded bg-background text-sm focus:border-primary font-semibold" 
                                    placeholder="Ex: 450"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="sc-description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description technique de la prestation</label>
                                <textarea 
                                    id="sc-description"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="border border-border p-3 rounded bg-background text-sm focus:border-primary h-28 resize-none leading-relaxed" 
                                    placeholder="Détaillez ici ce que comprend ce forfait..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-border flex justify-end gap-3 bg-card">
                            <button
                                type="button" 
                                onClick={() => setIsModaleOpen(false)}
                                className="px-5 py-2 rounded font-semibold text-muted-foreground hover:bg-muted transition-colors text-sm"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit" 
                                disabled={isSubmitting}
                                className="px-5 py-2 rounded font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sauvegarde...' : 'Enregistrer la prestation'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
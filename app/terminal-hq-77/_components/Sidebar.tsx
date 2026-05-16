"use client";
import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { AdminView } from '../types';
import { useTheme } from '@/components/ThemeProvider';

interface SidebarProps {
    currentView: AdminView;
    setCurrentView: (view: AdminView) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
    const supabase = createClient();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const handleViewChange = (view: AdminView) => {
        setCurrentView(view);
        setIsOpen(false); 
    };

    return (
        <>
            {/* 📱 BARRE SUPÉRIEURE MOBILE */}
            <div className="md:hidden flex items-center justify-between bg-card border-b border-border p-4 sticky top-0 z-40">
                <span className="font-bold tracking-tight text-foreground text-sm uppercase">Espace Admin</span>
                
                <div className="flex items-center gap-2">
                    {/* Commutateur de Thème */}
                    <button 
                        onClick={toggleTheme} 
                        className="p-2 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
                        aria-label="Changer de thème"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>

                    {/* Menu Hamburger */}
                    <button 
                        onClick={() => setIsOpen(true)} 
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* 📱 CALQUE DE FOND MOBILE */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 🖥️ COMPOSANT BARRE LATÉRALE */}
            <aside className={`
                fixed inset-y-0 right-0 z-50 w-64 bg-card flex flex-col justify-between
                border-l border-border md:border-l-0 md:border-r 
                transform transition-transform duration-300 ease-in-out
                md:relative md:left-0 md:translate-x-0
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                
                <div className="p-6 overflow-y-auto">
                    {/* En-tête principal */}
                    <div className="flex justify-between items-center mb-8 border-b border-border pb-5">
                        <h2 className="text-foreground text-sm font-bold tracking-wider uppercase">Tableau de bord</h2>
                        <button onClick={() => setIsOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Navigation principale */}
                    <nav className="space-y-6 text-sm">
                        
                        {/* Section Réalisations */}
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-semibold text-[10px] tracking-wider uppercase mb-2 pl-2">Portfolio</p>
                            
                            <button onClick={() => handleViewChange('PORTFOLIO_ADD')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-left ${currentView === 'PORTFOLIO_ADD' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/80 hover:bg-muted'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                <span>Nouveau projet</span>
                            </button>
                            
                            <button onClick={() => handleViewChange('PORTFOLIO_LIST')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-left ${currentView === 'PORTFOLIO_LIST' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/80 hover:bg-muted'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 16V12"></path><path d="M12 8h.01"></path></svg>
                                <span>Vos réalisations</span>
                            </button>
                        </div>

                        {/* Section Activité */}
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-semibold text-[10px] tracking-wider uppercase mb-2 pl-2">Activité commerciale</p>
                            
                            <button onClick={() => handleViewChange('QUOTES_INBOX')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors text-left ${currentView === 'QUOTES_INBOX' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/80 hover:bg-muted'}`}>
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <span>Demandes de devis</span>
                                </div>
                                {/*<span className="bg-destructive text-destructive-foreground px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-full animate-pulse">NEW</span>*/}
                            </button>
                            
                            <button onClick={() => handleViewChange('SERVICES_CATALOG')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-left ${currentView === 'SERVICES_CATALOG' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/80 hover:bg-muted'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                <span>Prestations & Tarifs</span>
                            </button>
                        </div>

                        {/* Section Configuration */}
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-semibold text-[10px] tracking-wider uppercase mb-2 pl-2">CONTACT</p>
                            
                            <button onClick={() => handleViewChange('FORMS_CONFIG')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-left ${currentView === 'FORMS_CONFIG' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/80 hover:bg-muted'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                <span>Informations du formulaire</span>
                            </button>
                        </div>
                    </nav>
                </div>
                
                {/* Pied de la barre latérale */}
                <div className="p-4 border-t border-border flex items-center justify-between bg-background/30">
                    <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Déconnexion</span>
                    </button>
                    
                    {/* Commutateur de Thème de Bureau */}
                    <button 
                        onClick={toggleTheme} 
                        className="hidden md:flex p-2 text-muted-foreground hover:text-primary transition-colors items-center justify-center rounded hover:bg-muted"
                        aria-label="Changer de thème"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
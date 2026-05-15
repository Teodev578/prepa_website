"use client";
import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { AdminView } from '../types';
import { useTheme } from '@/components/ThemeProvider'; // <-- Import du ThemeProvider

interface SidebarProps {
    currentView: AdminView;
    setCurrentView: (view: AdminView) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
    const supabase = createClient();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme(); // <-- Récupération du thème et de la fonction
    
    // 📱 ÉTAT POUR LE MOBILE
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // 📱 FONCTION POUR CHANGER DE VUE ET FERMER LE MENU SUR MOBILE
    const handleViewChange = (view: AdminView) => {
        setCurrentView(view);
        setIsOpen(false); 
    };

    return (
        <>
            {/* 📱 TOP BAR MOBILE (Visible uniquement sur petits écrans) */}
            <div className="md:hidden flex items-center justify-between bg-card border-b border-primary/20 p-4 sticky top-0 z-40">
                <span className="text-primary font-mono text-lg tracking-widest font-bold">SYS.ADMIN_HQ</span>
                
                <div className="flex items-center gap-2">
                    {/* Bouton Thème Mobile */}
                    <button 
                        onClick={toggleTheme} 
                        className="p-2 text-foreground hover:text-primary transition-colors flex items-center justify-center"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>

                    {/* Bouton Burger */}
                    <button 
                        onClick={() => setIsOpen(true)} 
                        className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* 📱 CALQUE SOMBRE (OVERLAY) POUR MOBILE */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 🖥️ NAVIGATION DRAWER (SIDEBAR) */}
            <aside className={`
                fixed inset-y-0 right-0 z-50 w-64 bg-card flex flex-col justify-between
                border-l border-primary/20 md:border-l-0 md:border-r 
                transform transition-transform duration-300 ease-in-out
                md:relative md:left-0 md:translate-x-0
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="tech-corner absolute top-0 right-0 hidden md:block" />
                
                <div className="p-6 overflow-y-auto">
                    {/* En-tête de la sidebar */}
                    <div className="flex justify-between items-center mb-8 border-b border-primary/20 pb-4">
                        <h2 className="text-primary font-mono text-xl tracking-widest">SYS.ADMIN_HQ</h2>
                        <button onClick={() => setIsOpen(false)} className="md:hidden text-muted-foreground hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-2 font-mono text-sm">
                        <p className="text-muted-foreground text-xs mb-2 mt-6">/// GESTION PORTFOLIO</p>
                        <button onClick={() => handleViewChange('PORTFOLIO_ADD')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'PORTFOLIO_ADD' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[+] AJOUT PORTFOLIO</button>
                        <button onClick={() => handleViewChange('PORTFOLIO_LIST')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'PORTFOLIO_LIST' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[=] REALISATIONS</button>

                        <p className="text-muted-foreground text-xs mb-2 mt-8">/// GESTION COMMERCIALE</p>
                        <button onClick={() => handleViewChange('QUOTES_INBOX')} className={`w-full text-left px-3 py-2 transition-all flex justify-between ${currentView === 'QUOTES_INBOX' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>
                            <span>[{'>'}] INBOX DEVIS</span><span className="bg-destructive text-destructive-foreground px-1.5 text-[10px] flex items-center justify-center rounded-none animate-pulse">NEW</span>
                        </button>
                        <button onClick={() => handleViewChange('SERVICES_CATALOG')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'SERVICES_CATALOG' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[*] PROTOCOLES & PRIX</button>

                        <p className="text-muted-foreground text-xs mb-2 mt-8">/// SYSTÈME</p>
                        <button onClick={() => handleViewChange('FORMS_CONFIG')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'FORMS_CONFIG' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[⚙] CONFIG FORMULAIRES</button>
                    </nav>
                </div>
                
                {/* Pied de la sidebar (Déconnexion + Thème pour Desktop) */}
                <div className="p-6 border-t border-primary/20 flex items-center justify-between">
                    <button onClick={handleLogout} className="text-left px-2 py-2 text-muted-foreground hover:text-destructive transition-colors font-mono text-sm">
                        [X] DÉCONNEXION
                    </button>
                    
                    {/* Bouton Thème Desktop (Caché sur mobile car déjà dans la top bar) */}
                    <button 
                        onClick={toggleTheme} 
                        className="hidden md:flex p-2 text-muted-foreground hover:text-primary transition-colors items-center justify-center"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
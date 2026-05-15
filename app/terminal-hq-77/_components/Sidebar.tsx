"use client";
import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { AdminView } from '../types';

interface SidebarProps {
    currentView: AdminView;
    setCurrentView: (view: AdminView) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <aside className="w-64 border-r border-primary/20 bg-card/30 flex flex-col justify-between hidden md:flex relative">
            <div className="tech-corner absolute top-0 right-0" />
            <div className="p-6">
                <h2 className="text-primary font-mono text-xl mb-8 tracking-widest border-b border-primary/20 pb-4">
                    SYS.ADMIN_HQ
                </h2>
                <nav className="space-y-2 font-mono text-sm">
                    <p className="text-muted-foreground text-xs mb-2 mt-6">/// GESTION PORTFOLIO</p>
                    <button onClick={() => setCurrentView('PORTFOLIO_ADD')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'PORTFOLIO_ADD' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[+] AJOUT PORTFOLIO</button>
                    <button onClick={() => setCurrentView('PORTFOLIO_LIST')} className={`w-full text-left px-3 py-2 transition-all ${currentView === 'PORTFOLIO_LIST' ? 'bg-primary text-background font-bold' : 'text-primary hover:bg-primary/10'}`}>[=] REALISATIONS</button>

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
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-muted-foreground hover:text-destructive transition-colors font-mono text-sm">
                    [X] DÉCONNEXION
                </button>
            </div>
        </aside>
    );
}
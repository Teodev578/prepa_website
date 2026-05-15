"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { AdminView } from './types';

import Sidebar from './_components/Sidebar';
import PortfolioAdd from './_components/PortfolioAdd';
import PortfolioList from './_components/PortfolioList';
import FormsConfig from './_components/FormsConfig';

export default function AdminPage() {
    const supabase = createClient();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<AdminView>('PORTFOLIO_ADD');

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push('/login');
            else setLoading(false);
        };
        checkSession();
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-primary font-mono animate-pulse text-xl">SYS.INIT_SESSION...</p>
            </div>
        );
    }

    return (
        // 🛠️ CHANGEMENT ICI : On utilise flex-col sur mobile, et flex-row sur PC
        <div className="flex flex-col md:flex-row h-screen bg-background text-foreground overflow-hidden">
            
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

            <main className="flex-1 overflow-y-auto p-4 md:p-12 relative bg-grid-pattern">
                {currentView === 'PORTFOLIO_ADD' && <PortfolioAdd />}
                {currentView === 'PORTFOLIO_LIST' && <PortfolioList />} {/* <-- NOUVELLE LIGNE */}
                {currentView === 'FORMS_CONFIG' && <FormsConfig />}

                {/* Mettez à jour la liste des vues exclues du mode "En développement" */}
                {!['PORTFOLIO_ADD', 'PORTFOLIO_LIST', 'FORMS_CONFIG'].includes(currentView) && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50 pt-20 md:pt-0">
                        <div className="text-primary text-6xl mb-4">🚧</div>
                        <h2 className="text-xl font-mono text-primary mb-2">MODULE EN DÉVELOPPEMENT</h2>
                        <p className="text-muted-foreground font-mono text-sm max-w-md">
                            La section <span className="text-foreground font-bold">[{currentView}]</span> n'est pas encore connectée.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
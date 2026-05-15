"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { AdminView } from './types';

// Sous-composants
import Sidebar from './_components/Sidebar';
import PortfolioAdd from './_components/PortfolioAdd';
import FormsConfig from './_components/FormsConfig';

export default function AdminPage() {
    const supabase = createClient();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<AdminView>('PORTFOLIO_ADD');

    // 🔒 AUTHENTIFICATION
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
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* 🖥️ NAVIGATION DRAWER (SIDEBAR) */}
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

            {/* 🖥️ MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto p-6 md:p-12 relative bg-grid-pattern">

                {currentView === 'PORTFOLIO_ADD' && <PortfolioAdd />}
                {currentView === 'FORMS_CONFIG' && <FormsConfig />}

                {/* VUES FUTURES (MODULES NON ACTIFS) */}
                {!['PORTFOLIO_ADD', 'FORMS_CONFIG'].includes(currentView) && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
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
"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError('ERREUR_AUTHENTIFICATION: ' + error.message);
        } else {
            // Redirige vers la page admin après une connexion réussie
            router.push('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
            <div className="max-w-md w-full border-technical p-8 bg-card relative">
                <div className="tech-corner absolute top-0 left-0" />
                <h1 className="text-card-title text-primary mb-2">AUTH_TERMINAL</h1>
                <p className="text-detail text-muted-foreground mb-8">ACCÈS_ZONE_SÉCURISÉE</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">AUTH_ID</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans uppercase text-sm placeholder:text-muted-foreground/60" 
                            placeholder="ADMIN@WORK.FR" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">PASSKEY_AUTH</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm placeholder:text-muted-foreground/60" 
                            placeholder="••••••••••••" 
                            required 
                        />
                    </div>
                    
                    {error && <div className="text-label text-red-500">{error}</div>}

                    <button type="submit" className="w-full relative group overflow-hidden border border-primary p-4 flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-primary rounded-[var(--radius)]">
                        <span className="relative z-10 text-xl text-primary group-hover:text-primary-foreground transition-colors duration-300">
                            INITIATE_SESSION
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}
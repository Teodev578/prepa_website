"use client";

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // Utilise le créateur de client
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // État pour la visibilité
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        // On initialise le client ici pour être sûr de lire les variables .env
        const supabase = createClient();

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError(authError.message);
                setLoading(false);
            } else {
                router.refresh();
                router.push('/terminal-hq-77');
            }
        } catch (err) {
            setError("Une erreur inattendue est survenue.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 font-mono">
            <div className="max-w-md w-full border border-slate-800 p-8 bg-slate-900 shadow-2xl relative">
                
                {/* Header Style Terminal */}
                <div className="mb-8 border-b border-slate-800 pb-4">
                    <h1 className="text-xl font-bold tracking-tighter text-emerald-500">
                        &gt; SYSTEM_AUTH_REQUIRED
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
                        Accès restreint au Terminal HQ-77
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-slate-400">Identifiant Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="admin@terminal.io"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-slate-400">Code d'accès</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Type dynamique
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors pr-20"
                                placeholder="••••••••"
                            />
                            {/* Bouton Toggle pour le mot de passe */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 text-slate-400 border border-slate-700 transition-all uppercase tracking-tighter"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 p-3 text-xs text-red-400 animate-pulse">
                            <span className="font-bold">ERROR:</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 text-sm font-bold uppercase tracking-widest transition-all
                            ${loading 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-[0.98]'
                            }`}
                    >
                        {loading ? 'INITIALISATION...' : 'EXÉCUTER CONNEXION'}
                    </button>
                </form>

                <div className="mt-8 text-[10px] text-slate-600 flex justify-between border-t border-slate-800/50 pt-4 uppercase">
                    <span>Node: v20.x</span>
                    <span>Status: {loading ? 'Processing...' : 'Encrypted'}</span>
                </div>
            </div>
        </div>
    );
}
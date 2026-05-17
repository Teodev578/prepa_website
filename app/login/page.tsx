"use client";

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState(''); // Code à 6 chiffres
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Gestion des étapes : 'credentials' (email/pass) ou 'mfa' (code de sécurité)
    const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
    const [mfaInfo, setMfaInfo] = useState<{ factorId: string; challengeId: string } | null>(null);

    const router = useRouter();
    const supabase = createClient();

    // ÉTAPE 1 : Connexion standard
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const startTime = Date.now();
        
        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                // ... gestion erreur
                await applyAntiBruteForceDelay(startTime);
                setError(authError.message);
                setLoading(false);
                return;
            } else {
                // FORCE L'ÉTAPE 2 POUR LE TEST VISUEL
                setStep('mfa');
                setLoading(false);
            }

            // Vérification si la double authentification est requise pour ce compte
            const { data: assurance, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

            if (assuranceError) {
                setError("Erreur de protocole de sécurité.");
                setLoading(false);
                return;
            }

            // Si 'nextLevel' est aal2, le compte possède une MFA activée
            if (assurance.nextLevel === 'aal2' && assurance.currentLevel === 'aal1') {
                // On récupère le facteur d'authentification (TOTP)
                const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
                
                if (factorsError || !factors.all || factors.all.length === 0) {
                    setError("Impossible de charger les facteurs MFA.");
                    setLoading(false);
                    return;
                }

                const verifiedFactor = factors.all.find(f => f.status === 'verified');
                if (!verifiedFactor) {
                    setError("Aucun facteur MFA vérifié trouvé.");
                    setLoading(false);
                    return;
                }

                // On lance le "Challenge" (génération du défi de vérification)
                const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
                    factorId: verifiedFactor.id
                });

                if (challengeError) {
                    setError("Échec de l'initialisation du challenge MFA.");
                    setLoading(false);
                    return;
                }

                // Passage à l'étape MFA
                setMfaInfo({ factorId: verifiedFactor.id, challengeId: challenge.id });
                setStep('mfa');
                setLoading(false);
            } else {
                // Pas de MFA activée sur ce compte, accès direct au QG
                router.refresh();
                router.push('/terminal-hq-77');
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Une erreur inattendue est survenue.");
            setLoading(false);
        }
    };

    // ÉTAPE 2 : Vérification du code TOTP
    const handleMfaVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mfaInfo) return;

        setLoading(true);
        setError(null);
        const startTime = Date.now();

        try {
            const { error: verifyError } = await supabase.auth.mfa.verify({
                factorId: mfaInfo.factorId,
                challengeId: mfaInfo.challengeId,
                code: mfaCode.trim()
            });

            if (verifyError) {
                await applyAntiBruteForceDelay(startTime);
                setError("CODE D'ACCÈS INVALIDE OU EXPIRÉ.");
                setLoading(false);
                return;
            }

            // Succès absolu (AAL2 validé)
            router.refresh();
            router.push('/terminal-hq-77');
        } catch (err) {
            setError("Erreur lors de la validation MFA.");
            setLoading(false);
        }
    };

    // Helper pour maintenir ton délai anti brute-force
    const applyAntiBruteForceDelay = async (startTime: number) => {
        const elapsed = Date.now() - startTime;
        const minDelay = 1500;
        if (elapsed < minDelay) {
            await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 font-mono">
            <div className="max-w-md w-full border border-slate-800 p-8 bg-slate-900 shadow-2xl relative">
                
                {/* Header Style Terminal */}
                <div className="mb-8 border-b border-slate-800 pb-4">
                    <h1 className="text-xl font-bold tracking-tighter text-emerald-500">
                        {step === 'credentials' ? '> SYSTEM_AUTH_REQUIRED' : '> MFA_CHALLENGE_REQUIRED'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
                        {step === 'credentials' 
                            ? 'Accès restreint au Terminal HQ-77' 
                            : 'Entrez le code généré par votre application d\'authentification'}
                    </p>
                </div>

                {/* FORMULAIRE ÉTAPE 1 : IDENTIFIANTS */}
                {step === 'credentials' && (
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
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors pr-20"
                                    placeholder="••••••••"
                                />
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
                )}

                {/* FORMULAIRE ÉTAPE 2 : CODE DOUBLE AUTH (MFA) */}
                {step === 'mfa' && (
                    <form onSubmit={handleMfaVerify} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider mb-2 text-emerald-400 animate-pulse">
                                🔐 Clé d'authentification TOTP (6 chiffres)
                            </label>
                            <input
                                type="text"
                                maxLength={6}
                                value={mfaCode}
                                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))} // Autorise uniquement les chiffres
                                required
                                autoFocus
                                className="w-full bg-slate-950 border border-emerald-800 p-3 text-center text-xl tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                                placeholder="000000"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-500/50 p-3 text-xs text-red-400 animate-pulse">
                                <span className="font-bold">SECURITY_ALERT:</span> {error}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => { setStep('credentials'); setError(null); }}
                                className="w-1/3 py-3 px-2 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                            >
                                RETOUR
                            </button>
                            <button
                                type="submit"
                                disabled={loading || mfaCode.length !== 6}
                                className={`w-2/3 py-3 px-4 text-sm font-bold uppercase tracking-widest transition-all
                                    ${loading || mfaCode.length !== 6
                                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                        : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-[0.98]'
                                    }`}
                            >
                                {loading ? 'VÉRIFICATION...' : 'VALIDER LE CODE'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-8 text-[10px] text-slate-600 flex justify-between border-t border-slate-800/50 pt-4 uppercase">
                    <span>Node: v20.x</span>
                    <span>Security: {step === 'credentials' ? 'Level 1 (AAL1)' : 'Level 2 (AAL2)'}</span>
                </div>
            </div>
        </div>
    );
}
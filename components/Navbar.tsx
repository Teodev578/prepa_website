"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import Logo from '@/components/Logo';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const links = [
        { label: "ACCUEIL", href: "/" },
        { label: "SERVICES", href: "/services" },
        { label: "À PROPOS", href: "/portfolio" },
        { label: "CONTACT", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-background border-b border-border h-20 md:h-24">
            {/* ======================================================================= */}
            {/* DESIGN DESKTOP CONFIGURÉ EN CELLULES DE GRILLE TECHNIQUE                */}
            {/* ======================================================================= */}
            <div className="hidden lg:flex w-full h-full items-stretch">
                
                {/* BLOC GAUCHE : Identité de marque */}
                <div className="w-1/2 h-full flex items-stretch border-r border-border">
                    {/* Badge d'archive vertical */}
                    <div className="w-16 xl:w-20 shrink-0 h-full border-r border-border flex items-center justify-center bg-muted/20">
                        <span className="font-mono text-[9px] uppercase font-black tracking-[0.25em] -rotate-90 whitespace-nowrap text-muted-foreground">
                            REV. 2026
                        </span>
                    </div>
                    {/* Logo centralisé */}
                    <div className="flex-grow flex items-center pl-8 xl:pl-12">
                        <Link href="/" className="group" onClick={() => setIsMenuOpen(false)} aria-label="LAW CLEAN CENTER - Accueil">
                            <Logo />
                        </Link>
                    </div>
                </div>

                {/* BLOC DROIT : Navigation et Utilitaires Systèmes */}
                <div className="w-1/2 h-full flex items-stretch justify-between bg-background">
                    
                    {/* Liens de navigation principaux */}
                    <nav className="h-full flex items-stretch pl-8 xl:pl-12" aria-label="Navigation principale">
                        <ul className="flex gap-1 text-xs font-mono uppercase tracking-widest font-bold h-full">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.label} className="h-full flex items-stretch">
                                        <Link
                                            href={link.href}
                                            className={`group flex items-center px-4 xl:px-5 h-full relative transition-colors ${
                                                isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                                            }`}
                                        >
                                            {/* Micro-indicateur d'action technique */}
                                            <span className={`text-primary font-black mr-2 transition-transform duration-200 ${
                                                isActive ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                            }`}>
                                                {'>'}
                                            </span>
                                            <span>{link.label}</span>
                                            
                                            {/* Ligne de focus inférieure discrète pour l'onglet actif */}
                                            {isActive && (
                                                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Cellules utilitaires du coin droit */}
                    <div className="flex items-stretch h-full">
                        
                        {/* Métadonnées d'exploitation B2B (Ajoute du poids visuel et du sérieux) */}
                        <div className="hidden xl:flex flex-col justify-center px-6 border-l border-border font-mono text-[9px] text-muted-foreground tracking-wider leading-relaxed bg-muted/5 uppercase select-none">
                            <div>PORTAL_B2B // <span className="text-green-500 font-bold animate-pulse">ONLINE</span></div>
                            {/*<div className="text-foreground/60">REGION: ÎLE-DE-FRANCE</div>*/}
                        </div>

                        {/* Bouton de Thème encadré dans sa cellule dédiée */}
                        <button 
                            id="theme-toggle" 
                            className="w-20 h-full border-l border-border flex items-center justify-center hover:bg-muted/40 text-foreground hover:text-primary transition-colors focus:outline-none" 
                            onClick={toggleTheme} 
                            aria-label="Changer le mode de couleur"
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* ======================================================================= */}
            {/* DESIGN MOBILE & TABLETTE (Conservé à l'identique pour la stabilité)    */}
            {/* ======================================================================= */}
            <div className="lg:hidden flex items-center justify-between w-full h-full px-6 bg-background relative z-[102]">
                <Link href="/" onClick={() => setIsMenuOpen(false)} aria-label="LAW CLEAN CENTER - Accueil">
                    <Logo className="scale-90 origin-left" />
                </Link>

                <div className="flex items-center gap-2">
                    <button id="theme-toggle-mobile" className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-primary transition-none text-foreground" onClick={toggleTheme} aria-label="Changer le mode de couleur sur mobile">
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="min-w-[44px] min-h-[44px] flex flex-col justify-center items-end gap-1.5 cursor-pointer focus:outline-none"
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        <div className={`h-[1.5px] bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'w-[26px] translate-y-[7.5px] rotate-45' : 'w-8'}`}></div>
                        <div className={`h-[1.5px] bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'w-0 opacity-0' : 'w-6'}`}></div>
                        <div className={`h-[1.5px] bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'w-[26px] -translate-y-[7.5px] -rotate-45' : 'w-8'}`}></div>
                    </button>
                </div>
            </div>

            {/* Menu plein écran mobile */}
            <div className={`fixed left-0 top-20 md:top-24 w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-6rem)] bg-background lg:hidden transition-all duration-500 overflow-hidden flex flex-col z-[101] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex-1 flex flex-col justify-center px-8 relative" aria-label="Navigation mobile">
                    <ul className="flex flex-col gap-6 text-3xl sm:text-5xl font-mono uppercase tracking-widest font-bold">
                        {links.map((link, index) => (
                            <li key={link.label} className="overflow-hidden">
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`group flex items-center w-full min-h-[44px] py-2 transition-transform duration-500 translate-y-0 hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-foreground'}`}
                                    style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                                >
                                    <span className={`text-primary font-bold mr-4 transition-opacity duration-300 ${pathname === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                        {'>'}
                                    </span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="px-8 pb-12 mt-auto flex flex-col gap-8 text-[10px] font-mono font-bold text-muted-foreground uppercase opacity-50 tracking-[0.2em]">
                    <div className="w-12 h-[1px] bg-border"></div>
                    <div>LAW CLEAN CENTER // READY_FOR_DEPLOYMENT</div>
                </div>
            </div>
        </header>
    );
}
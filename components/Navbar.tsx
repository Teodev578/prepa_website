"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import Logo from '@/components/Logo';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setIsScrolled(latest > 20);
    });

    const links = [
        { label: "ACCUEIL", href: "/" },
        { label: "SERVICES", href: "/services" },
        { label: "PORTFOLIO", href: "/portfolio" },
        { label: "CONTACT", href: "/contact" },
    ];

    return (
        <motion.header 
            variants={{
                visible: { y: 0 },
                hidden: { y: "-150%" }
            }}
            animate={isHidden && !isMenuOpen ? "hidden" : "visible"}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 md:top-4 left-0 md:left-4 right-0 md:right-4 z-[100] transition-all duration-300 md:max-w-7xl md:mx-auto md:rounded-lg ${
                isScrolled ? 'bg-background/85 backdrop-blur-md border-b md:border border-border/50 shadow-sm' : 'bg-transparent border-transparent'
            }`}
        >
            <div className="h-20 md:h-20 hidden lg:flex w-full items-stretch overflow-hidden md:rounded-lg">
                
                {/* BLOC GAUCHE : Identité de marque */}
                <div className="w-1/2 h-full flex items-center pl-6 xl:pl-8">
                    <Link href="/" className="group flex items-center" onClick={() => setIsMenuOpen(false)} aria-label="LAW CLEAN CENTER - Accueil">
                        <Logo />
                    </Link>
                </div>

                {/* BLOC DROIT : Navigation et Utilitaires Systèmes */}
                <div className="w-1/2 h-full flex items-stretch justify-end">
                    
                    {/* Liens de navigation principaux */}
                    <nav className="h-full flex items-stretch" aria-label="Navigation principale">
                        <ul className="flex gap-2 text-[10px] xl:text-xs font-mono uppercase tracking-widest font-bold h-full">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.label} className="h-full flex items-stretch">
                                        <Link
                                            href={link.href}
                                            className={`group flex items-center px-4 h-full relative transition-colors ${
                                                isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                                            }`}
                                        >
                                            <span className={`text-primary font-black mr-2 transition-transform duration-200 ${
                                                isActive ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                            }`}>
                                                {'>'}
                                            </span>
                                            <span>{link.label}</span>
                                            
                                            {isActive && (
                                                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-stretch h-full ml-4">
                        <div className="hidden xl:flex flex-col justify-center px-6 border-l border-border/20 font-mono text-[9px] text-muted-foreground tracking-wider leading-relaxed uppercase select-none">
                            <div className="flex items-center gap-2">ESPACE PRO <span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-80" /></div>
                        </div>

                        <button 
                            id="theme-toggle" 
                            className="w-16 xl:w-20 h-full border-l border-border/20 flex items-center justify-center hover:bg-muted/40 text-foreground hover:text-primary transition-colors focus:outline-none" 
                            onClick={toggleTheme} 
                            aria-label="Changer le mode de couleur"
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* ======================================================================= */}
            {/* DESIGN MOBILE & TABLETTE                                               */}
            {/* ======================================================================= */}
            <div className={`lg:hidden flex items-center justify-between w-full h-20 px-6 relative z-[102] ${isMenuOpen ? 'bg-background' : ''}`}>
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
            <div className={`fixed left-0 top-0 w-full h-[100dvh] bg-background lg:hidden transition-all duration-500 overflow-hidden flex flex-col pt-20 z-[101] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
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
                    <div>EST. 2026</div>
                </div>
            </div>
        </motion.header>
    );
}
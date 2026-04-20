"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
    const [lang, setLang] = useState('fr');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const headerRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        headerRef.current.style.setProperty('--mouse-x', `${x}px`);
    };

    // Gestion du scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border py-4' : 'bg-transparent py-6'} custom-header ${isScrolled ? 'scrolled' : ''}`}
            ref={headerRef}
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-6 lg:px-12 header-container flex justify-between items-center relative z-[101]">
                <Link href="/" className="logo flex items-center gap-4 text-foreground font-sans font-black tracking-tighter uppercase text-xl" onClick={() => setIsMenuOpen(false)}>
                    <span>PRECISION AUTO</span>
                </Link>

                <div className="header-right hidden md:flex items-center gap-8">
                    <nav className={`main-nav ${isMenuOpen ? 'nav-active' : ''}`} id="main-nav">
                        <ul className="nav-links flex gap-6 text-xs font-mono uppercase tracking-[0.2em] font-bold">
                            <li><Link href="/" onClick={(e) => handleLinkClick(e, '#accueil')} className="hover:text-primary transition-colors">HOME</Link></li>
                            <li><Link href="/services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-primary transition-colors">SERVICES</Link></li>
                            <li><Link href="/portfolio" onClick={(e) => handleLinkClick(e, '#projets')} className="hover:text-primary transition-colors">PORTFOLIO</Link></li>
                            <li><Link href="/about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-primary transition-colors">ABOUT</Link></li>
                            <li><Link href="/contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-primary transition-colors">CONTACT</Link></li>
                        </ul>
                    </nav>

                    <div className="header-actions flex items-center gap-4">
                        <div className="language-switcher flex gap-2 text-[10px] font-mono font-bold text-muted-foreground uppercase">
                            <button className={`lang-link transition-colors ${lang === 'fr' ? 'text-primary' : 'hover:text-foreground'}`} onClick={() => setLang('fr')}>FR</button>
                            <span className="opacity-50">/</span>
                            <button className={`lang-link transition-colors ${lang === 'en' ? 'text-primary' : 'hover:text-foreground'}`} onClick={() => setLang('en')}>EN</button>
                        </div>

                        <button id="theme-toggle" className="theme-toggle hover:text-primary transition-colors text-foreground p-1" onClick={toggleTheme} aria-label="Changer le thème">
                            {theme === 'dark' ? (
                                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Burger Menu block */}
                <div className="md:hidden flex items-center gap-6">
                    <button id="theme-toggle-mobile" className="theme-toggle hover:text-primary transition-colors text-foreground" onClick={toggleTheme}>
                        {theme === 'dark' ? (
                            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
                    
                    <div className={`burger-menu w-6 h-4 flex flex-col justify-between cursor-pointer ${isMenuOpen ? 'toggle' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className={`line1 w-full h-[1.5px] bg-foreground transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-[40deg] w-[26px]' : ''}`}></div>
                        <div className={`line2 w-full h-[1.5px] bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`line3 w-full h-[1.5px] bg-foreground transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-[40deg] w-[26px]' : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`absolute top-full left-0 w-full bg-background border-b border-border shadow-xl md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen py-8 opacity-100 border-t' : 'max-h-0 py-0 opacity-0 border-t-0'}`}>
                <ul className="nav-links flex flex-col gap-6 px-8 text-sm font-mono uppercase tracking-[0.2em] font-bold">
                    <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="block w-full border-b border-border/50 pb-2">HOME</Link></li>
                    <li><Link href="/services" onClick={() => setIsMenuOpen(false)} className="block w-full border-b border-border/50 pb-2">SERVICES</Link></li>
                    <li><Link href="/portfolio" onClick={() => setIsMenuOpen(false)} className="block w-full border-b border-border/50 pb-2">PORTFOLIO</Link></li>
                    <li><Link href="/about" onClick={() => setIsMenuOpen(false)} className="block w-full border-b border-border/50 pb-2">ABOUT</Link></li>
                    <li><Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full border-b border-border/50 pb-2">CONTACT</Link></li>
                </ul>
                <div className="px-8 mt-8 language-switcher flex gap-4 text-xs font-mono font-bold text-muted-foreground uppercase">
                    <button className={`lang-link transition-colors ${lang === 'fr' ? 'text-primary' : ''}`} onClick={() => setLang('fr')}>FR</button>
                    <span className="opacity-50">/</span>
                    <button className={`lang-link transition-colors ${lang === 'en' ? 'text-primary' : ''}`} onClick={() => setLang('en')}>EN</button>
                </div>
            </div>
        </header>
    );
}

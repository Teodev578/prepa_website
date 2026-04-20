"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
    const [lang, setLang] = useState('fr');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const links = [
        { label: "HOME", href: "/" },
        { label: "SERVICES", href: "/services" },
        { label: "PORTFOLIO", href: "/portfolio" },
        { label: "ABOUT", href: "/about" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-background border-b border-border h-20 md:h-24">
            {/* Desktop Header */}
            <div className="hidden lg:flex w-full h-full">
                {/* Left Block: Match 50% exactly and border right */}
                <div className="w-1/2 h-full flex items-stretch border-r border-border">
                    {/* Responsive spacer matching Hero's left Edge Menu */}
                    <div className="w-16 xl:w-20 shrink-0 h-full border-r border-border flex items-center justify-center">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap text-foreground">
                            REV. 2026
                        </span>
                    </div>
                    {/* Logo Space */}
                    <div className="flex-grow flex items-center pl-6">
                        <Link href="/" className="text-foreground font-sans font-black tracking-tighter uppercase text-3xl">
                            PRECISION AUTO
                        </Link>
                    </div>
                </div>

                {/* Right Block: Match 50% exactly, with internal padding from Hero */}
                <div className="w-1/2 h-full flex items-center justify-between lg:px-24 bg-background">
                    {/* Navigation */}
                    <nav className="h-full flex items-center">
                        <ul className="flex gap-6 xl:gap-8 text-xs font-mono uppercase tracking-widest font-bold h-full">
                            {links.map((link) => (
                                <li key={link.label} className="h-full flex items-center">
                                    <Link 
                                        href={link.href} 
                                        className={`group flex items-center h-full transition-none ${pathname === link.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                                    >
                                        <span className={`text-primary font-bold mr-1.5 transition-none ${pathname === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            {'>'}
                                        </span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Technical Actions Toolbar */}
                    <div className="flex items-center text-xs font-mono text-foreground font-bold uppercase tracking-widest">
                        {/* Selector FR / EN */}
                        <div className="flex gap-1 items-center">
                            <button className={`transition-none ${lang === 'fr' ? 'text-primary' : 'hover:text-primary'}`} onClick={() => setLang('fr')}>FR</button>
                            <span className="text-border px-1">/</span>
                            <button className={`transition-none ${lang === 'en' ? 'text-primary' : 'hover:text-primary'}`} onClick={() => setLang('en')}>EN</button>
                        </div>

                        <span className="text-border px-4">|</span>

                        {/* Contact Link */}
                        <Link 
                            href="/contact"
                            className={`group flex items-center transition-none ${pathname === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                        >
                            <span className={`text-primary font-bold mr-1 transition-none opacity-0 group-hover:opacity-100`}>
                                {'>'}
                            </span>
                            CONTACT
                        </Link>

                        <span className="text-border px-4">|</span>

                        {/* Theme Toggle */}
                        <button id="theme-toggle" className="hover:text-primary transition-none text-foreground flex items-center" onClick={toggleTheme} aria-label="Toggle Theme">
                            {theme === 'dark' ? (
                                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile / Tablet Header */}
            <div className="lg:hidden flex items-center justify-between w-full h-full px-6 bg-background relative z-[101]">
                <Link href="/" className="logo text-foreground font-sans font-black tracking-tighter uppercase text-xl md:text-2xl" onClick={() => setIsMenuOpen(false)}>
                    PRECISION AUTO
                </Link>
                
                <div className="flex items-center gap-6">
                    <button id="theme-toggle-mobile" className="hover:text-primary transition-none text-foreground" onClick={toggleTheme} aria-label="Toggle Theme Mobile">
                        {theme === 'dark' ? (
                            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
                    
                    {/* Minimal Burger Menu */}
                    <div className="w-8 h-4 flex flex-col justify-between cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className={`w-full h-[1.5px] bg-foreground transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-[40deg] w-[26px]' : ''}`}></div>
                        <div className={`w-full h-[1.5px] bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-full h-[1.5px] bg-foreground transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-[40deg] w-[26px]' : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`absolute top-full left-0 w-full bg-background border-b border-border lg:hidden transition-all duration-300 overflow-hidden z-[100] ${isMenuOpen ? 'max-h-screen py-8 border-t opacity-100' : 'max-h-0 py-0 border-t-0 opacity-0'}`}>
                <ul className="flex flex-col gap-6 px-8 text-sm font-mono uppercase tracking-widest font-bold">
                    {[...links, { label: "CONTACT", href: "/contact" }].map((link) => (
                        <li key={link.label}>
                            <Link 
                                href={link.href} 
                                onClick={() => setIsMenuOpen(false)} 
                                className={`group flex items-center w-full border-b border-border/20 pb-4 transition-none ${pathname === link.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                            >
                                <span className={`text-primary font-bold mr-2 transition-none ${pathname === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    {'>'}
                                </span>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="px-8 mt-10 flex gap-4 text-xs font-mono font-bold text-foreground uppercase tracking-widest">
                    <span>LANG:</span>
                    <button className={`transition-none ${lang === 'fr' ? 'text-primary' : 'hover:text-primary'}`} onClick={() => setLang('fr')}>FR</button>
                    <span className="text-border">/</span>
                    <button className={`transition-none ${lang === 'en' ? 'text-primary' : 'hover:text-primary'}`} onClick={() => setLang('en')}>EN</button>
                </div>
            </div>
        </header>
    );
}

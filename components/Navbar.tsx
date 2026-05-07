"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import Logo from '@/components/Logo';

export default function Navbar() {
    const [lang, setLang] = useState('fr');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const links = [
        { label: "HOME", href: "/" },
        { label: "SERVICES", href: "/services" },
        { label: "PORTFOLIO", href: "/portfolio" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-background border-b border-border h-20 md:h-24">
            {/* Desktop Header */}
            <div className="hidden lg:flex w-full h-full">
                {/* Left Block */}
                <div className="w-1/2 h-full flex items-stretch border-r border-border">
                    <div className="w-16 xl:w-20 shrink-0 h-full border-r border-border flex items-center justify-center">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap text-foreground">
                            REV. 2026
                        </span>
                    </div>
                    <div className="flex-grow flex items-center pl-10 md:pl-16">
                        <Link href="/" className="group" onClick={() => setIsMenuOpen(false)}>
                            <Logo />
                        </Link>
                    </div>
                </div>

                {/* Right Block */}
                <div className="w-1/2 h-full flex items-center justify-between lg:px-24 bg-background">
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

                    <div className="flex items-center text-xs font-mono text-foreground font-bold uppercase tracking-widest">
                        <Link href="/contact" className={`group flex items-center transition-none ${pathname === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                            <span className={`text-primary font-bold mr-1 transition-none opacity-0 group-hover:opacity-100`}>
                                {'>'}
                            </span>
                            CONTACT
                        </Link>

                        <span className="text-border px-4">|</span>

                        <div className="flex gap-1 items-center">
                            <button className={`min-w-[44px] min-h-[44px] transition-none ${lang === 'fr' ? 'text-primary' : 'hover:text-primary'}`} onClick={() => setLang('fr')}>FR</button>
                            <span className="text-border px-1">/</span>
                            <button className={`min-w-[44px] min-h-[44px] transition-none ${lang === 'en' ? 'text-primary' : 'hover:text-primary'}`} onClick={() => setLang('en')}>EN</button>
                        </div>

                        <span className="text-border px-4">|</span>

                        <button id="theme-toggle" className="min-w-[44px] min-h-[44px] justify-center hover:text-primary transition-none text-foreground flex items-center" onClick={toggleTheme} aria-label="Toggle Theme">
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
            <div className="lg:hidden flex items-center justify-between w-full h-full px-6 bg-background relative z-[102]">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Logo className="scale-90 origin-left" />
                </Link>

                <div className="flex items-center gap-2">
                    {/* Selector FR / EN Mobile */}
                    <div className="flex gap-2 items-center font-mono text-[10px] font-bold px-2 border-r border-border/50">
                        <button className={`transition-none ${lang === 'fr' ? 'text-primary' : 'text-foreground/50 hover:text-primary'}`} onClick={() => setLang('fr')}>FR</button>
                        <span className="text-border/30">/</span>
                        <button className={`transition-none ${lang === 'en' ? 'text-primary' : 'text-foreground/50 hover:text-primary'}`} onClick={() => setLang('en')}>EN</button>
                    </div>

                    <button id="theme-toggle-mobile" className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-primary transition-none text-foreground" onClick={toggleTheme} aria-label="Toggle Theme Mobile">
                        {theme === 'dark' ? (
                            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>

                    {/* Animated Burger Menu */}
                    <div className="min-w-[44px] min-h-[44px] flex flex-col justify-center items-end gap-1.5 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className={`h-[1.5px] bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'w-[26px] translate-y-[7.5px] rotate-45' : 'w-8'}`}></div>
                        <div className={`h-[1.5px] bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'w-0 opacity-0' : 'w-6'}`}></div>
                        <div className={`h-[1.5px] bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? 'w-[26px] -translate-y-[7.5px] -rotate-45' : 'w-8'}`}></div>
                    </div>
                </div>
            </div>

            {/* Mobile Full-Screen Menu (Now stays perfectly below the main header) */}
            <div className={`fixed left-0 top-20 md:top-24 w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-6rem)] bg-background lg:hidden transition-all duration-500 overflow-hidden flex flex-col z-[101] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex-1 flex flex-col justify-center px-8 relative">
                    <ul className="flex flex-col gap-6 text-3xl sm:text-5xl font-mono uppercase tracking-widest font-bold">
                        {[...links, { label: "CONTACT", href: "/contact" }].map((link, index) => (
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
                </div>

                <div className="px-8 pb-12 mt-auto flex flex-col gap-8 text-[10px] font-mono font-bold text-muted-foreground uppercase opacity-50 tracking-[0.2em]">
                    <div className="w-12 h-[1px] bg-border"></div>
                    <div>SEC.AUTH_V3.0 // READY_FOR_DEPLOYMENT</div>
                </div>
            </div>
        </header>
    );
}
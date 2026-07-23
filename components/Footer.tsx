"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

// 🛠️ HARMONISATION : Reprise de la courbe de Bézier commune à tout le site
const customEase = [0.16, 1, 0.3, 1] as const;

const Footer = () => {
    const navLinks = [
        { label: "ACCUEIL", href: "/" },
        { label: "SERVICES", href: "/services" },
        { label: "PORTFOLIO", href: "/portfolio" },
        { label: "CONTACT", href: "/contact" },
    ];

    const legalLinks = [
        { label: "MENTIONS LÉGALES", href: "/mentions-legales" },
        { label: "POLITIQUE DE CONFIDENTIALITÉ", href: "/politique-confidentialite" },
    ];

    const technicalData = [
        { label: "MAIL_PRO", value: "lawcleancenter@outlook.com" },
        { label: "SIRET_ID", value: "922 386 131 00010" },
        { label: "LOCATION", value: "49.0974° N, 2.5065° E" },
    ];

    // 🛠️ CONFIGURATION DYNAMIQUE : Apparition en cascade ultra-propre
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: customEase }
        }
    };

    return (
        <footer className="relative w-full bg-background border-t border-border overflow-hidden pt-16 md:pt-24 flex flex-col justify-between">
            
            {/* Main Content Grid : 4 Colonnes minimalistes */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mb-16 md:mb-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-40px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
                >
                    {/* Colonne 1 : Identité */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-6">
                        <Logo />
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-xs mt-2">
                            Votre partenaire d’esthétique automobile : flexibilité, réactivité, rentabilité.
                        </p>
                    </motion.div>

                    {/* Colonne 2 : Navigation */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-mono text-[10px] text-primary/70 mb-6 tracking-[0.2em] uppercase">
                            Navigation
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                                    >
                                        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-primary font-bold">{">"}</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Colonne 3 : Légal */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-mono text-[10px] text-primary/70 mb-6 tracking-[0.2em] uppercase">
                            Légal
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                                    >
                                        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-primary font-bold">{">"}</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Colonne 4 : Data Technique */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-mono text-[10px] text-primary/70 mb-6 tracking-[0.2em] uppercase">
                            Informations
                        </h3>
                        <div className="flex flex-col gap-5">
                            {technicalData.map((data) => (
                                <div key={data.label} className="flex flex-col gap-1 border-b border-border/50 pb-2">
                                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{data.label}</span>
                                    <span className="font-mono text-[10px] font-bold uppercase text-foreground">{data.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Final Strip : Ultra clean */}
            <div className="border-t border-border py-6 px-6 md:px-12 bg-card">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.3, ease: customEase }}
                        className="flex items-center gap-4"
                    >
                        <span>&copy; {new Date().getFullYear()} LAW CLEAN CENTER</span>
                        <span className="hidden sm:inline w-1 h-1 bg-border rounded-full"></span>
                        <span className="hidden sm:inline">2 RUE LOUISE MICHEL, 95470 FOSSES</span>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline">PROTOCOL_FOOTER_v1.0.4</span>
                        <span className="text-secondary/80 font-bold tracking-widest">[ STATUS: OPTIMAL ]</span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
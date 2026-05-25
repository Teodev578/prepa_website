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
        { label: "MENTIONS LÉGALES", href: "#" },
        { label: "POLITIQUE DE CONFIDENTIALITÉ", href: "#" },
    ];

    const technicalData = [
        { label: "MAIL_PRO", value: "lawcleancenter@outlook.com" },
        { label: "SIRET_ID", value: "922 386 131 00010" },
        { label: "ASSURANCE", value: "COUVERTURE_COMPLÈTE_ACTIVE" },
        { label: "LOCATION", value: "49.0974° N, 2.5065° E" },
    ];

    // 🛠️ CONFIGURATION DYNAMIQUE : On passe once à false et on adapte le timing
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 65, damping: 15, mass: 0.9 }
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0 },
        show: {
            scaleX: 1,
            transition: { type: "spring" as const, stiffness: 80, damping: 16, mass: 0.8 }
        }
    };

    return (
        <footer className="relative w-full bg-background border-t border-border overflow-hidden">
            {/* Background Watermark */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 0.05, x: 0 }}
                viewport={{ once: false, margin: "-20px" }}
                transition={{ duration: 1.5, ease: customEase }}
                className="absolute right-0 bottom-0 pointer-events-none select-none"
            >
                <span className="font-sans font-black text-[25vw] leading-none uppercase text-primary/20">
                    2026
                </span>
            </motion.div>

            {/* Main Content Grid */}
            <div className="relative z-10 max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row">

                    {/* Left Block: Identity & Massive Text */}
                    <div className="lg:w-2/3 p-6 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, margin: "-40px" }}
                        >
                            <div className="flex items-center gap-4 mb-12">
                                <Logo />
                                <motion.div
                                    variants={lineVariants}
                                    className="h-px bg-border flex-1 origin-left"
                                ></motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="max-w-xl mt-8 md:mt-16">
                                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-4">
                                    Votre partenaire d’esthétique automobile : flexibilité, réactivité, rentabilité.
                                </h2>
                                <p className="text-muted-foreground font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed border-l-2 border-primary/30 pl-4 mt-6">
                                    Nous accélérons les ventes de vos véhicules d'occasion et valorisons vos véhicules neufs grâce à une externalisation complète de la préparation.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 items-end mt-16 md:mt-32">
                                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                    &copy; {new Date().getFullYear()} LAW CLEAN CENTER
                                </div>
                                <div className="hidden md:block h-8 w-px bg-border"></div>
                                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                    2 RUE LOUISE MICHEL, 95470 FOSSES
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Block: Navigation & Technical Info */}
                    <div className="lg:w-1/3 flex flex-col">

                        {/* Navigation Section */}
                        <div className="p-6 md:p-12 border-b border-border flex-1">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, margin: "-40px" }}
                                className="grid grid-cols-2 gap-8"
                            >
                                <div>
                                    <h3 className="font-mono text-[10px] text-secondary mb-6 tracking-[0.2em] uppercase">Navigation</h3>
                                    <ul className="flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <motion.li key={link.label} variants={itemVariants}>
                                                <Link
                                                    href={link.href}
                                                    className="font-mono text-xs uppercase tracking-widest hover:text-secondary transition-colors inline-flex items-center group"
                                                >
                                                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-secondary font-bold">{">"}</span>
                                                    {link.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-mono text-[10px] text-secondary mb-6 tracking-[0.2em] uppercase">Entreprise</h3>
                                    <ul className="flex flex-col gap-4">
                                        {legalLinks.map((link) => (
                                            <motion.li key={link.label} variants={itemVariants}>
                                                <Link
                                                    href={link.href}
                                                    className="font-mono text-xs uppercase tracking-widest hover:text-secondary transition-colors inline-flex items-center group"
                                                >
                                                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-secondary font-bold">{">"}</span>
                                                    {link.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>

                        {/* Technical Metadata Section */}
                        <div className="p-6 md:p-12 bg-muted/30">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, margin: "-40px" }}
                                className="flex flex-col gap-5"
                            >
                                {technicalData.map((data) => (
                                    <motion.div key={data.label} variants={itemVariants} className="flex justify-between items-end border-b border-border pb-2 group">
                                        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{data.label}</span>
                                        <span className="font-mono text-[10px] font-bold uppercase transition-colors group-hover:text-secondary">{data.value}</span>
                                    </motion.div>
                                ))}

                                {/* Technical Corner Decoration */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="font-mono text-[10px] text-secondary">+</div>
                                    <div className="h-px bg-border flex-1 mx-4 opacity-50"></div>
                                    <div className="font-mono text-[10px] text-secondary">+</div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Final Strip */}
            <div className="border-t border-border py-4 px-6 md:px-12 bg-card">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-[0.3em]">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.5, ease: customEase }}
                    >
                        PROTOCOL_FOOTER_v1.0.4 // B2B_SERVICES_ACTIVE
                    </motion.span>
                    <div className="flex gap-4">
                        <span className="hidden sm:inline">RÉGION_IDF_SUPPORT_OK</span>
                        <span className="text-secondary/70">[ STATUS: OPTIMAL ]</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
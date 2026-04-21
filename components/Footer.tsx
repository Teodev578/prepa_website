"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

const Footer = () => {
    const navLinks = [
        { label: "SERVICES", href: "/services" },
        { label: "RÉALISATIONS", href: "/portfolio" },
        { label: "À PROPOS", href: "/about" },
        { label: "CONTACT", href: "/contact" },
    ];

    const socialLinks = [
        { label: "INSTAGRAM", href: "https://instagram.com" },
    ];

    const technicalData = [
        { label: "LOCATION", value: "6.1375° N, 1.2123° E" },
        { label: "BUILD", value: "REV. 1.0.4" },
        { label: "LICENSE", value: "EXCELLENCE" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: BEZIER } 
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: { 
            scaleX: 1, 
            transition: { duration: 1, ease: BEZIER } 
        }
    };

    return (
        <footer className="relative w-full bg-background border-t border-border overflow-hidden">
            {/* Background Watermark */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 0.05, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: BEZIER }}
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
                    <div className="lg:w-2/3 p-6 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-border">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
                                <Logo />
                                <motion.div 
                                    variants={lineVariants}
                                    className="h-px bg-border flex-1 origin-left"
                                ></motion.div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 items-end mt-12">
                                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                    &copy; 2026 PRECISION AUTO - L'ART DE L'INGÉNIERIE
                                </div>
                                <div className="hidden md:block h-8 w-px bg-border"></div>
                                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                    LOMÉ, TOGO
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
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-8"
                            >
                                <div>
                                    <h3 className="font-mono text-[10px] text-primary mb-6 tracking-[0.2em] uppercase">Navigation</h3>
                                    <ul className="flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <motion.li key={link.label} variants={itemVariants}>
                                                <Link 
                                                    href={link.href}
                                                    className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors inline-flex items-center group"
                                                >
                                                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-primary font-bold">{">"}</span>
                                                    {link.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-mono text-[10px] text-primary mb-6 tracking-[0.2em] uppercase">Social</h3>
                                    <ul className="flex flex-col gap-4">
                                        {socialLinks.map((link) => (
                                            <motion.li key={link.label} variants={itemVariants}>
                                                <a 
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors inline-flex items-center group"
                                                >
                                                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-primary font-bold">{">"}</span>
                                                    {link.label}
                                                </a>
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
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col gap-6"
                            >
                                {technicalData.map((data) => (
                                    <motion.div key={data.label} variants={itemVariants} className="flex justify-between items-end border-b border-border pb-2 group">
                                        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{data.label}</span>
                                        <span className="font-mono text-[10px] font-bold uppercase transition-colors group-hover:text-primary">{data.value}</span>
                                    </motion.div>
                                ))}
                                
                                {/* Technical Corner Decoration */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="font-mono text-[10px] text-primary">+</div>
                                    <div className="h-px bg-border flex-1 mx-4 opacity-50"></div>
                                    <div className="font-mono text-[10px] text-primary">+</div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Final Strip */}
            <div className="border-t border-border py-4 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-[0.3em]">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                    >
                        PROTOCOL_FOOTER_v1.0.4 // READY
                    </motion.span>
                    <div className="flex gap-4">
                        <span className="hidden sm:inline">TERMINAL_OK</span>
                        <span>[ STATUS: OPTIMAL ]</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ExcellencePhilosophy = () => {
    const metrics = [
        { id: "SYS.01", title: "9H Hardness", subtitle: "CERTIFIED COATINGS" },
        { id: "SYS.02", title: "Machined", subtitle: "SWISS INSTRUMENTS" },
        { id: "SYS.03", title: "Rapid", subtitle: "24H TURNAROUND" },
        { id: "SYS.04", title: "Warranty", subtitle: "LIFE-LONG SUPPORT" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: BEZIER } }
    };

    const flickerVariants = {
        initial: { opacity: 0 },
        visible: {
            opacity: [0, 1, 0.3, 1, 0.8],
            transition: {
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "linear" as const,
            }
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: { 
            scaleX: 1, 
            transition: { duration: 0.8, ease: BEZIER } 
        }
    };

    return (
        <section className="bg-background text-foreground relative border-b border-border w-full max-w-[100vw] overflow-hidden">
            {/* Top row with technical metrics */}
            <div className="flex flex-col md:flex-row border-b border-border">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:w-16 border-b md:border-b-0 md:border-r border-border flex items-center justify-center font-mono text-[10px] text-muted-foreground p-2 md:p-0 md:rotate-180 md:[writing-mode:vertical-rl] tracking-widest uppercase"
                >
                    SYSTEM.METRICS
                </motion.div>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex-1 grid grid-cols-2 md:grid-cols-4 w-full"
                >
                    {metrics.map((metric, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            className={`border-border p-4 md:p-8 flex flex-col justify-between h-28 md:h-40 group hover:bg-muted transition-colors relative ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b md:border-b-0' : 'md:border-r'}`}
                        >
                            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{metric.id}</span>
                            <div>
                                <h4 className="font-sans font-bold text-lg md:text-2xl uppercase tracking-tighter">{metric.title}</h4>
                                <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground mt-1">{metric.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Poster Layout / Huge Text block */}
            <div className="px-6 py-16 md:px-20 md:py-32 relative">
                
                {/* Background immense watermark */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 0.03, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: BEZIER }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center"
                >
                    <span className="font-sans font-black text-[30vw] leading-none uppercase">APEX</span>
                </motion.div>
                
                <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left: The Massive Title */}
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: [0, 1, 0.5, 1] }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="font-mono text-xs text-primary border border-primary px-2 py-1">PH-01</div>
                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={lineVariants}
                                className="h-[1px] bg-foreground origin-left"
                            ></motion.div>
                        </motion.div>
                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="font-sans font-black text-[clamp(2.5rem,10vw,6rem)] sm:text-[clamp(3.5rem,10vw,6.5rem)] md:text-[8vw] lg:text-[6rem] uppercase tracking-tighter mb-8 leading-[0.8] text-foreground relative"
                        >
                            {["LA PHILOSOPHIE", "DE L'EXCELLENCE."].map((line, i) => (
                                <div key={i} className="overflow-hidden relative">
                                    <motion.span
                                        variants={{
                                            hidden: { y: "110%" },
                                            visible: { y: 0 }
                                        }}
                                        transition={{ duration: 0.7, delay: i * 0.1, ease: BEZIER }}
                                        className="block"
                                    >
                                        {line.includes("EXCELLENCE") ? (
                                            <>DE L'<span className="text-primary cursor-default">EXCELLENCE</span>.</>
                                        ) : line}
                                    </motion.span>
                                </div>
                            ))}
                        </motion.h2>
                    </div>

                    {/* Right: The Technical Description */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 font-mono text-xs md:text-sm lg:text-base leading-relaxed uppercase pt-4 lg:pt-24 border-t lg:border-t-0 border-border">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5, ease: BEZIER }}
                        >
                            {/* Barcode separator */}
                            <div className="hidden md:flex gap-px mb-6 items-end h-6 opacity-30">
                                {[1, 3, 2, 1, 4].map((w, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: idx % 2 === 0 ? "100%" : "70%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7 + idx * 0.05, duration: 0.4 }}
                                        className="bg-foreground" 
                                        style={{ width: `${w}px` }}
                                    ></motion.div>
                                ))}
                            </div>
                            <p className="mb-6 opacity-80 md:mt-2">
                                Chaque intervention suit un protocole d'ingénierie stricte. Nous ne considérons pas le detailing comme un simple nettoyage d'apparat, mais comme une science appliquée à la préservation ultime de l'automobile.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: BEZIER }}
                        >
                            <p className="mb-8 opacity-80">
                                Les processus de correction des vernis et de pose des protections nanotechnologiques sont exécutés sous un éclairage professionnel calibré, utilisant des instruments garantissant des tolérances microscopiques.
                            </p>
                            {/* Geometric Button */}
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group min-h-[48px] relative border border-border px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all w-full md:w-auto mt-4"
                            >
                                <div className="absolute top-0 left-0 w-2 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>// LANCER LE PROTOCOLE</span>
                                    <span className="text-primary group-hover:text-primary-foreground">→</span>
                                </div>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
                
                {/* Bottom technical lines */}
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end font-mono text-[8px] text-muted-foreground uppercase opacity-50">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                    >COORD_SET_02</motion.span>
                    <div className="flex gap-1 h-2 items-end">
                        {[1, 1, 1].map((_, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: i === 0 ? "100%" : (i === 1 ? "40%" : "80%") }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.1 + i * 0.1, duration: 0.3 }}
                                className="w-1 bg-foreground"
                            ></motion.div>
                        ))}
                    </div>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.4 }}
                    >READY_FOR_DEPLOYMENT</motion.span>
                </div>
            </div>
        </section>
    );
};

export default ExcellencePhilosophy;


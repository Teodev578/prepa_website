"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TESTIMONIALS = [
  {
    quote: "Le résultat sur ma Porsche est bluffant. La peinture a retrouvé une profondeur incroyable, bien plus belle qu'à sa sortie d'usine.",
    author: "Julien L.",
    title: "PORSCHE 911 GT3",
    initials: "JL",
  },
  {
    quote: "Un professionnalisme rare. Chaque détail est inspecté à la loupe. Le traitement céramique facilite énormément mes lavages hebdomadaires.",
    author: "Marc A.",
    title: "FERRARI 488",
    initials: "MA",
  },
  {
    quote: "Prestation intérieure incroyable. J'avais des taches tenaces sur mes cuirs clairs qui ont totalement disparu. Comme neuf.",
    author: "Sophie D.",
    title: "RANGE ROVER VOGUE",
    initials: "SD",
  },
  {
    quote: "Le soin apporté aux jantes et aux étriers de freins est exceptionnel. On sent la passion du détail à chaque étape du nettoyage.",
    author: "Thomas B.",
    title: "BMW M4 COMPETITION",
    initials: "TB",
  },
  {
    quote: "C'est simple, ils ont redonné vie à ma carrosserie. L'équipe est super chaleureuse et prodigue d'excellents conseils pour l'entretien.",
    author: "Emma R.",
    title: "MERCEDES A45 AMG",
    initials: "ER",
  },
  {
    quote: "Polissage parfait, les micro-rayures ont totalement disparu. La voiture est resplendissante et protégée avec la céramique.",
    author: "Antoine V.",
    title: "TESLA MODEL 3",
    initials: "AV",
  },
];

export default function Testimonials() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const smoothX = useSpring(x, { stiffness: 400, damping: 90 });

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

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden">
        {/* Background Decor */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: BEZIER }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center z-0"
        >
          <span className="font-sans font-black text-[35vw] leading-none uppercase">LOGS</span>
        </motion.div>

        <div className="flex flex-col w-full">
          <div className="px-6 md:px-12 lg:px-24 mb-12 relative z-10">
             {/* Header - Poster Style */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: BEZIER }}
                className="flex items-center gap-4 mb-4"
              >
                <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-2 py-1">
                  SYS.LOG.03
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: BEZIER }}
                  className="h-[1px] bg-foreground opacity-20"
                ></motion.div>
              </motion.div>
              
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[5rem] font-sans font-black text-foreground tracking-tighter uppercase leading-[0.85] mb-6 relative"
              >
                {["RAPPORTS", "CLIENTS."].map((line, i) => (
                  <div key={i} className="overflow-hidden relative">
                    <motion.div
                      variants={{
                        hidden: { y: "110%" },
                        visible: { y: 0 }
                      }}
                      transition={{ duration: 0.7, delay: 0.1 + (i * 0.1), ease: BEZIER }}
                    >
                      {line.includes("CLIENTS") ? (
                        <span className="text-primary">{line}</span>
                      ) : line}
                    </motion.div>
                  </div>
                ))}
              </motion.h2>
            </div>
          </div>

          <motion.div style={{ x: smoothX }} className="flex gap-6 pl-6 md:pl-12 lg:pl-24">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] bg-card border border-border group relative overflow-hidden flex flex-col"
              >
                {/* Top Accent line & ID */}
                <div className="flex items-center justify-between px-6 py-2 border-b border-border bg-muted/50">
                  <motion.span 
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={flickerVariants}
                    className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest"
                  >
                    ID: {testimonial.initials}-{index.toString().padStart(4, '0')}
                  </motion.span>
                  <span className="font-mono text-[9px] text-primary uppercase tracking-widest leading-none">
                    {"// VALIDATED"}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-8 md:p-10 flex-1">
                  <p className="mb-8 font-sans font-medium text-lg md:text-xl lg:text-2xl leading-tight text-foreground uppercase tracking-tight">
                    <span className="text-primary font-black mr-2">"</span>
                    {testimonial.quote}
                    <span className="text-primary font-black ml-2">"</span>
                  </p>

                  <div className="mt-auto pt-6 border-t border-border border-dashed font-mono uppercase">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="block text-[8px] tracking-[0.2em] text-muted-foreground mb-1">COMMANDITAIRE</span>
                        <span className="font-black text-xs md:text-sm text-foreground tracking-widest">
                          {testimonial.author}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] tracking-[0.2em] text-muted-foreground mb-1">UNITÉ</span>
                        <span className="font-bold text-[10px] text-primary tracking-wider">
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Small status bar on hover */}
                <div className="w-full h-1 bg-border relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1, delay: 0.3, ease: BEZIER }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

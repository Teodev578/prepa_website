"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const BEZIER = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false); // 🚀 Sécurité pour ne pas casser le SSR

  useEffect(() => {
    const updateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
      // On n'active l'effet de scroll forcé que sur grand écran (> 1024px)
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateRange();
    
    const observer = new ResizeObserver(() => updateRange());
    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }
    
    window.addEventListener("resize", updateRange);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: isDesktop ? targetRef : undefined, // Désactivé si mobile pour libérer le processeur
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const smoothX = useSpring(x, { stiffness: 280, damping: 85, mass: 0.9, restDelta: 0.0001 });

  const flickerVariants = {
    initial: { opacity: 0 },
    visible: {
        opacity: [0, 1, 0.3, 1, 0.8],
        transition: { duration: 0.5, ease: "linear" as const }
    }
  };

  return (
    // 🚀 SEO : Utilisation de h-auto sur mobile (évite le vide noir de 300vh) et h-[300vh] uniquement sur desktop
    <section 
      ref={targetRef} 
      className={`relative bg-background ${isDesktop ? 'h-[300vh]' : 'h-auto py-16 md:py-24'}`}
    >
      {/* On utilise une structure standard "sticky" uniquement sur PC */}
      <div className={`${isDesktop ? 'sticky top-0 h-[100dvh] flex items-center overflow-hidden' : 'w-full'}`}>
        
        {/* Background Decor - Caché sur mobile pour la lisibilité */}
        {isDesktop && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center z-0 select-none opacity-[0.02]">
            <span className="font-sans font-black text-[35vw] leading-none uppercase">LOGS</span>
          </div>
        )}

        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="px-6 md:px-12 lg:px-24 mb-12 relative z-10">
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-2 py-1">
                  SYS.LOG.03
                </span>
                <div className="w-24 h-[1px] bg-foreground opacity-20"></div>
              </div>
              
              {/* 🚀 SEO : Titre H2 sémantique clair pour les moteurs */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-sans font-black text-foreground tracking-tighter uppercase leading-[0.9] mb-6">
                AVIS & <span className="text-primary">RAPPORTS CLIENTS</span>
              </h2>
            </div>
          </div>

          {/* 🚀 RESPONSIVE & SEO GRID : 
              Sur Desktop: Défilé horizontal propulsé par Framer Motion.
              Sur Mobile: Véritable grille de lecture verticale native, 100% accessible et indexable. */}
          <motion.div 
            ref={scrollRef}
            style={isDesktop ? { x: smoothX } : undefined} 
            className={`flex ${
              isDesktop 
                ? 'gap-6 pl-24 pr-24 flex-row w-max' 
                : 'grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12'
            }`}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <article
                key={index}
                className={`flex-shrink-0 bg-card border border-border group relative overflow-hidden flex flex-col rounded-[var(--radius)] ${
                  isDesktop ? 'w-[35vw]' : 'w-full'
                }`}
              >
                {/* Top Accent line & ID */}
                <div className="flex items-center justify-between px-6 py-2 border-b border-border bg-muted/50">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                    ID: {testimonial.initials}-{index.toString().padStart(4, '0')}
                  </span>
                  <span className="font-mono text-[9px] text-primary uppercase tracking-widest leading-none">
                    {"// VERIFIED_LOG"}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-10 flex-1 flex flex-col justify-between">
                  {/* blockquote est la balise HTML sémantique officielle pour les citations (surpuissant pour Google) */}
                  <blockquote className="mb-8 font-sans font-medium text-lg md:text-xl lg:text-2xl leading-tight text-foreground uppercase tracking-tight">
                    <span className="text-primary font-black mr-2">"</span>
                    {testimonial.quote}
                    <span className="text-primary font-black ml-2">"</span>
                  </blockquote>

                  <div className="mt-auto pt-6 border-t border-border border-dashed font-mono uppercase">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className="block text-[8px] tracking-[0.2em] text-muted-foreground mb-1">COMMANDITAIRE</span>
                        <span className="font-black text-xs md:text-sm text-foreground tracking-widest">
                          {testimonial.author}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] tracking-[0.2em] text-muted-foreground mb-1">UNITÉ SPEC.</span>
                        <span className="font-bold text-[10px] text-primary tracking-wider">
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover line indicators */}
                <div className="w-full h-1 bg-border relative">
                  <div className="absolute top-0 left-0 h-full bg-primary w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </article>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
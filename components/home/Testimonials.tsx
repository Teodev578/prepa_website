"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "L'externalisation de notre pôle préparation à LAW CLEAN CENTER a transformé notre logistique. Les véhicules d'occasion (VO) sont livrés irréprochables, dans des délais records.",
    author: "Marc A. - Dir. Ventes",
    title: "CONCESSION PORSCHE",
    initials: "MA",
    rating: 5,
  },
  {
    quote: "Le résultat sur ma carrosserie est bluffant. La peinture a retrouvé une profondeur incroyable, bien plus belle qu'à sa sortie d'usine. Le traitement céramique est une merveille.",
    author: "Julien L.",
    title: "PORSCHE 911 GT3",
    initials: "JL",
    rating: 5,
  },
  {
    quote: "Une régularité chirurgicale. Que ce soit pour une simple remise à neuf ou un detailing complet sur un véhicule de direction, leur niveau d'exigence ne baisse jamais.",
    author: "Thomas B. - Fleet Manager",
    title: "PARC AUTOMOBILE PRO",
    initials: "TB",
    rating: 5,
  },
  {
    quote: "Prestation intérieure incroyable. J'avais des taches tenaces sur mes cuirs clairs qui ont totalement disparu. Le véhicule sent le neuf. Un professionnalisme rare.",
    author: "Sophie D.",
    title: "RANGE ROVER VOGUE",
    initials: "SD",
    rating: 5,
  },
  {
    quote: "Un gain de temps et de rentabilité massif pour notre garage. Transformer cette masse salariale fixe en prestation à la demande a sauvé notre marge sur les ventes.",
    author: "Antoine V. - Gérant",
    title: "RÉSEAU MULTIMARQUES",
    initials: "AV",
    rating: 5,
  },
  {
    quote: "Le soin apporté aux jantes et aux étriers de freins est exceptionnel. On sent la passion du détail à chaque étape. L'équipe est super chaleureuse et prodigue d'excellents conseils.",
    author: "Emma R.",
    title: "MERCEDES A45 AMG",
    initials: "ER",
    rating: 5,
  },
];

export default function Testimonials() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // PERF: matchMedia pour isDesktop = pas de re-render au simple resize
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);

    const updateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    updateRange();

    const observer = new ResizeObserver(updateRange);
    if (scrollRef.current) observer.observe(scrollRef.current);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      updateRange();
    };
    mq.addEventListener("change", handler);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", handler);
    };
  }, []);

  // useScroll toujours appelé (règles des hooks)
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Syntaxe standard, compatible toutes versions framer-motion
  const x = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -scrollRange : 0]);
  const smoothX = useSpring(x, { stiffness: 200, damping: 40, mass: 0.6, restDelta: 0.5 });

  return (
    <section 
      ref={targetRef} 
      className={`relative bg-background ${isDesktop ? 'h-[300vh]' : 'h-auto py-16 md:py-24'}`}
    >
      <div className={`${isDesktop ? 'sticky top-0 h-dvh flex items-center overflow-hidden' : 'w-full'}`}>
        
        {/* Typographie géante en arrière-plan */}
        {isDesktop && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center z-0 select-none opacity-[0.02] mix-blend-overlay">
            <span className="font-sans font-black text-[35vw] leading-none uppercase tracking-tighter">TRUST</span>
          </div>
        )}

        <div className="flex flex-col w-full">
          {/* En-tête de section */}
          <div className="px-6 md:px-12 lg:px-24 mb-10 relative z-10">
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-widest border border-secondary/30 bg-secondary/5 px-2 py-1">
                  SYS.LOG.03 // FEEDBACK
                </span>
                <div className="w-16 h-px bg-border"></div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-sans font-black text-foreground tracking-tighter uppercase leading-[0.95] mb-6">
                AVIS & <br className="hidden md:block" />
                <span className="text-primary">RAPPORTS CLIENTS.</span>
              </h2>
            </div>
          </div>

          {/* Grille / Slider */}
          <motion.div 
            ref={scrollRef}
            style={isDesktop ? { x: smoothX } : undefined} 
            className={`flex ${
              isDesktop 
                ? 'gap-8 pl-24 pr-24 flex-row w-max pb-12' 
                : 'grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12'
            }`}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <article
                key={testimonial.initials}
                className={`shrink-0 bg-background border border-border hover:border-primary/50 transition-colors duration-500 group relative overflow-hidden flex flex-col ${
                  isDesktop ? 'w-[32vw] min-w-100' : 'w-full'
                }`}
              >
                {/* Filigrane Guillemet géant */}
                <div className="absolute -top-10 -right-4 text-[12rem] font-serif text-primary opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500">
                  "
                </div>

                {/* Top Accent line & ID */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/20">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse"></span>
                    ID: {testimonial.initials}-{index.toString().padStart(4, '0')}
                  </span>
                  
                  {/* Note étoiles technique */}
                  <span className="font-mono text-[10px] text-foreground font-bold flex items-center gap-2">
                    <span className="text-primary flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </span>
                    <span className="opacity-50">[{testimonial.rating}.0]</span>
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between relative z-10">
                  
                  {/* Le texte repasse en casse normale pour une lisibilité parfaite */}
                  <blockquote className="mb-10 font-sans text-base md:text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Footer de la carte */}
                  <div className="mt-auto pt-5 border-t border-border border-dashed font-mono uppercase">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className="block text-[8px] tracking-[0.2em] text-muted-foreground mb-1.5">
                          COMMANDITAIRE
                        </span>
                        <span className="font-bold text-xs md:text-sm text-foreground tracking-wider">
                          {testimonial.author}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] tracking-[0.2em] text-muted-foreground mb-1.5">
                          UNITÉ / PROJET
                        </span>
                        <span className="font-bold text-[10px] text-secondary tracking-widest bg-secondary/10 px-2 py-1 rounded-sm">
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover line bottom */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent">
                  <div className="absolute top-0 left-0 h-full bg-primary w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
              </article>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
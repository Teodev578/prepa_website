"use client";

import { motion } from "framer-motion";

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
  return (
    <section className="w-full py-20 lg:py-32 bg-background relative border-b border-border overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none w-full text-center z-0">
        <span className="font-sans font-black text-[35vw] leading-none uppercase">LOGS</span>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header - Poster Style */}
        <div className="mb-16 md:mb-24 relative">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-2 py-1">
              SYS.LOG.03
            </span>
            <div className="h-[1px] w-24 bg-foreground opacity-20"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-sans font-black text-foreground tracking-tighter uppercase leading-[0.85] mb-6">
            RAPPORTS <br/> <span className="text-primary">CLIENTS.</span>
          </h2>
          
          <div className="flex gap-1 items-end h-6 opacity-30 mb-8">
            <div className="w-[2px] h-[50%] bg-foreground"></div>
            <div className="w-[1px] h-full bg-foreground"></div>
            <div className="w-[3px] h-[80%] bg-foreground"></div>
            <div className="w-[1px] h-[30%] bg-foreground"></div>
          </div>

          <p className="font-mono text-[11px] md:text-xs text-muted-foreground w-full max-w-[400px] leading-relaxed uppercase tracking-wider">
            Extractions des retours de télémetrie client post-intervention. Satisfaction validée avec un taux de réussite de 99.8%.
          </p>
        </div>

        {/* Diagnostic Layout Grid / Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="mb-6 break-inside-avoid bg-card border border-border group relative overflow-hidden flex flex-col"
            >
              {/* Top Accent line & ID */}
              <div className="flex items-center justify-between px-6 py-2 border-b border-border bg-muted/50">
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  ID: {testimonial.initials}-{index.toString().padStart(4, '0')}
                </span>
                <span className="font-mono text-[9px] text-primary uppercase tracking-widest">
                  {"// VALIDATED"}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 flex-1">
                <p className="mb-8 font-sans font-medium text-sm md:text-base leading-relaxed text-foreground uppercase tracking-tight">
                  <span className="text-primary font-black mr-2">"</span>
                  {testimonial.quote}
                  <span className="text-primary font-black ml-2">"</span>
                </p>

                {/* Patient / Vehicle data terminal format */}
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
              
              {/* Corner cross (technical style) */}
              <div className="absolute top-1/2 -right-2 text-primary font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </div>
              
              {/* Small status bar on hover */}
              <div className="w-full h-1 bg-border relative">
                <div className="absolute top-0 left-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

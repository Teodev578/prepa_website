"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/image_2.png",
  "/images/image_3.jpeg",
  "/images/image_4.jpeg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-background h-[100dvh] w-full flex flex-col overflow-hidden relative border-b border-border">
      <div className="flex flex-col lg:flex-row w-full h-full">

        {/* Left Column : Image (Mobile: Top, Desktop: Left) */}
        <div className="w-full lg:w-1/2 relative flex items-stretch border-b lg:border-b-0 lg:border-r border-technical h-[35vh] lg:h-full">

          {/* Edge Menu/Annotations (Desktop left border) */}
          <div className="hidden lg:flex w-16 xl:w-20 shrink-0 flex-col justify-between items-center py-10 border-r border-technical bg-background relative z-10">
            <div className="absolute top-0 right-0 tech-corner"></div>
            
            <div className="font-mono text-xs uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap mt-32 text-foreground">
              GPS: 48°52'5.6"N 2°19'59.5"E
            </div>

            {/* Minimal burger menu hint */}
            <div className="flex flex-col gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
              <div className="w-6 h-[1.5px] bg-foreground"></div>
              <div className="w-4 h-[1.5px] bg-foreground"></div>
              <div className="w-8 h-[1.5px] bg-foreground"></div>
            </div>

            <div className="font-mono text-xs uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap mb-20 text-foreground">
              SPEC. 01
            </div>

            <div className="absolute bottom-0 right-0 tech-corner"></div>
          </div>

          <div className="flex-grow relative overflow-hidden bg-background">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover"
                alt={`Precision Auto Technical - ${currentIndex + 1}`}
              />
            </AnimatePresence>
            
            {/* Technical Overlay - Minimal Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-20">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-12 h-[2px] transition-colors duration-500 ${idx === currentIndex ? 'bg-primary' : 'bg-foreground/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column : Typography (Mobile: Bottom, Desktop: Right) */}
        <div className="w-full lg:w-1/2 relative bg-background flex flex-col justify-center px-6 md:px-16 lg:px-24 py-10 lg:py-0 border-technical h-[65vh] lg:h-full">
          <div className="absolute top-0 left-0 tech-corner hidden lg:block"></div>

          {/* Massive Cutoff Number (Edge Right) */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[35%] lg:translate-x-[40%] text-[60vw] lg:text-[35vw] font-sans font-black text-primary leading-none pointer-events-none z-0 select-none opacity-10">
            01
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="lg:hidden font-mono text-xs uppercase font-bold tracking-widest text-foreground mb-6 flex justify-between w-full">
              <span>GPS: 48°52'5.6"N 2°19'59.5"E</span>
              <span>SPEC. 01</span>
            </div>

            <h1 className="font-sans font-black text-[clamp(2.2rem,9vw,7rem)] tracking-tighter uppercase text-foreground leading-[0.8] mb-6 md:mb-10 relative">
              LA MAÎTRISE<br />
              TECHNIQUE<br />
              EST NOTRE<br />
              CULTURE.
            </h1>

            <p className="text-foreground font-medium text-sm md:text-base leading-relaxed mb-8 md:mb-12 lg:max-w-[400px]">
              Ici, aucun compromis. Le travail bien fait nous importe plus que tout, afin que votre véhicule ne reparte jamais le même de notre atelier.
            </p>

            {/* Buttons Technical Pattern */}
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-widest font-bold">
              <button className="relative px-8 py-5 bg-primary text-primary-foreground group overflow-hidden flex items-center justify-center rounded-[var(--radius)]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  DÉCOUVRIR NOS SERVICES
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </span>
              </button>

              <button className="px-8 py-5 border border-primary bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group flex items-center justify-center gap-3 rounded-[var(--radius)]">
                <span className="w-1.5 h-1.5 bg-primary group-hover:bg-primary-foreground block rounded-full transition-colors"></span>
                NOTRE PORTFOLIO
              </button>
            </div>
          </div>

          {/* Subtle menu or corner indication top right */}
          <div className="absolute top-10 right-10 font-mono text-xs font-bold tracking-widest text-foreground uppercase hidden lg:block hover:opacity-70 cursor-pointer transition-opacity">
            EST. 2026
          </div>
          <div className="absolute bottom-0 right-0 tech-corner hidden lg:block"></div>
        </div>

      </div>
    </section>
  );
}

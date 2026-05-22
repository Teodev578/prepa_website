"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";

const images = [
  "/images/image_2.png",
  "/images/image_3.jpeg",
  "/images/image_4.jpeg",
];

// 🛠️ ALIGNEMENT : La courbe de Bézier "signature" de ton site
const customEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax: Image moves slower
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const smoothYParallax = useSpring(yParallax, { stiffness: 300, damping: 90 });

  // Hero Exit Fade
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.98]);
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 400, damping: 90 });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startTimer = () => {
      timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 6000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) clearInterval(timer);
      else startTimer();
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 🛠️ ANIMATIONS GLOBALES HARMONISÉES
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // 🛠️ Amplitude augmentée (40px au lieu de 15px)
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: customEase } },
  };

  const textRevealVariants = {
    hidden: { y: "110%" },
    show: {
      y: "0%",
      transition: { duration: 1.2, ease: customEase }
    }
  };

  const flickerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0.3, 1, 0.8],
      transition: { duration: 0.5, ease: "linear", delay: 1 }
    }
  };

  const titleLines = ["NUMERO.", "#1."];

  return (
    <section 
      ref={sectionRef}
      className="bg-background min-h-[100dvh] h-auto lg:h-[100dvh] box-border w-full flex flex-col overflow-hidden relative border-b border-border"
    >
      <motion.div
        style={{ opacity: smoothHeroOpacity, scale: heroScale }}
        className="flex flex-col md:flex-row w-full h-full flex-grow origin-bottom"
      >

        {/* ========================================================= */}
        {/* COLONNE GAUCHE : IMAGE & ANNOTATIONS TECHNIQUES           */}
        {/* ========================================================= */}
        <div className="w-full h-[45vh] md:h-full md:w-1/2 relative flex items-stretch border-b md:border-b-0 md:border-r border-border shrink-0 overflow-hidden">
          
          {/* Menu latéral technique Desktop */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show" 
            className="hidden md:flex w-16 xl:w-20 shrink-0 flex-col justify-between items-center py-10 border-r border-border bg-background relative z-10 select-none"
          >
            <motion.div variants={flickerVariants} initial="initial" animate="animate" className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground opacity-50"></motion.div>

            <motion.div variants={itemVariants} className="font-mono text-[9px] uppercase font-bold tracking-[0.2em] -rotate-90 whitespace-nowrap mt-32 text-muted-foreground">
              GPS: 49.0974° N 2.5065° E
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <div className="w-6 h-[1px] bg-foreground/50"></div>
              <div className="w-4 h-[1px] bg-foreground/50"></div>
              <div className="w-8 h-[1px] bg-foreground/50"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="font-mono text-[9px] uppercase font-bold tracking-[0.2em] -rotate-90 whitespace-nowrap mb-20 text-muted-foreground">
              IDF_OPERATIONAL
            </motion.div>
          </motion.div>

          {/* Wrapper Image Parallax */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: customEase }}
            style={{ y: smoothYParallax }}
            className="flex-grow relative overflow-hidden bg-background h-full w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                // 🛠️ EFFET PREMIUM : Le léger zoom en plus du fondu
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2, ease: customEase }}
                className="w-full h-full absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  fill
                  className="object-cover"
                  alt={`Véhicule en préparation par Law Clean Center - Illustration ${currentIndex + 1}`}
                  priority={currentIndex === 0}
                  sizes="(max-w-768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Jauge de slider */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex gap-2 z-20 mix-blend-difference">
              {images.map((_, idx) => (
                <div key={idx} className="h-[2px] w-8 md:w-12 bg-white/30 overflow-hidden relative">
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="activeSlide"
                      className="absolute top-0 left-0 h-full w-full bg-white"
                      transition={{ duration: 0.8, ease: customEase }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* COLONNE DROITE : TYPOGRAPHIE & CALL TO ACTIONS            */}
        {/* ========================================================= */}
        <div className="flex-1 w-full md:w-1/2 relative bg-background flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 md:py-0">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
            className="absolute top-1/2 right-0 -translate-y-1/2 text-[40vw] md:text-[35vw] font-sans font-black text-foreground leading-none pointer-events-none select-none overflow-hidden"
          >
            #1
          </motion.div>

          {/* 🛠️ Stagger sur le contenu texte */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show" 
            className="relative z-10 max-w-xl w-full"
          >
            
            <motion.div variants={itemVariants} className="md:hidden font-mono text-[9px] uppercase font-bold tracking-widest text-muted-foreground mb-6 flex justify-between w-full">
              <span>GPS: 49.0974° N 2.5065° E</span>
              <span>EST. 2026</span>
            </motion.div>

            <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-[4.5rem] lg:text-[6.5rem] xl:text-[7.5rem] tracking-tighter uppercase text-foreground leading-[0.9] mb-6 md:mb-8 relative z-20">
              <span className="sr-only">Law Clean Center - Préparation Esthétique B2B & Convoyage de Véhicules en Île-de-France</span>
              {titleLines.map((line, i) => (
                <div key={i} className="overflow-hidden relative pb-4 -mb-4">
                  {/* 🛠️ TEXT REVEAL : On applique le variant ici avec un léger délai d'index */}
                  <motion.div
                    variants={textRevealVariants}
                    transition={{ ...textRevealVariants.show.transition, delay: 0.1 + (i * 0.15) }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </h1>

            <motion.p
              variants={itemVariants}
              className="text-foreground/80 font-medium text-sm sm:text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-[90%] md:max-w-md relative z-20"
            >
              Externalisez la préparation esthétique et le convoyage de vos véhicules. Transformez vos charges fixes en coûts 100% variables et accélérez vos ventes.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 font-mono text-[10px] uppercase tracking-widest font-bold w-full relative z-20"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-h-[52px] relative px-8 py-4 bg-primary text-primary-foreground group overflow-hidden flex items-center justify-center rounded-[var(--radius)] transition-transform"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    DÉCOUVRIR NOS SERVICES
                    <span className="text-primary-foreground transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </motion.div>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-h-[52px] relative px-8 py-4 border border-primary bg-transparent text-foreground group overflow-hidden flex items-center justify-center gap-3 rounded-[var(--radius)] transition-transform"
                >
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="w-1.5 h-1.5 bg-primary group-hover:bg-background block rounded-full transition-colors relative z-10"></span>
                  <span className="relative z-10 group-hover:text-primary-foreground transition-colors">NOUS CONTACTER</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div variants={flickerVariants} initial="initial" animate="animate" className="absolute top-10 right-10 font-mono text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase hidden md:block select-none">
            EST. 2026
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
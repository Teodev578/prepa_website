"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

const images = [
  "/images/8.jpeg",
  "/images/2.jpeg",
  "/images/1.jpeg",
];

const customEase = [0.16, 1, 0.3, 1] as const;

// Hoisted to module scope — no local state captured
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.8 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } },
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // PERF: une seule spring (fond), le texte reste statique
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const smoothYParallax = useSpring(yParallax, {
    stiffness: 150,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const startTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 8000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-background h-dvh w-full relative overflow-hidden -mt-20"
    >
      {/* BACKGROUND IMAGE WITH PARALLAX — calque GPU uniquement */}
      <motion.div
        style={{ y: isDesktop ? smoothYParallax : 0, opacity: heroOpacity, willChange: "transform, opacity" }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            // PERF: scale supprimé — opacity uniquement = pas de reflow, 100% GPU
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
            style={{ willChange: "opacity" }}
          >
            <Image
              src={images[currentIndex]}
              fill
              className="object-cover"
              alt={`Véhicule en préparation par Law Clean Center - Illustration ${currentIndex + 1}`}
              priority={currentIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/70 dark:bg-background/70 z-10" />
      </motion.div>

      {/* FOREGROUND CONTENT
          PERF: style y supprimé — le texte avant-plan reste statique au scroll */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-20 w-full h-full pt-20 pb-8 sm:pt-24 sm:pb-10 flex flex-col items-start justify-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
          <motion.div variants={itemVariants} className="font-mono text-[10px] sm:text-xs uppercase font-semibold tracking-widest text-primary mb-3 sm:mb-4 md:mb-5 flex items-center gap-3 sm:gap-4">
            <span className="w-8 h-px bg-primary"></span>
            SPÉCIALISTE ÎLE-DE-FRANCE
          </motion.div>

        <h1 className="font-sans font-black text-[9.5vw] sm:text-[8vw] md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] 2xl:text-[6.5rem] tracking-tighter uppercase text-foreground leading-[1.03] sm:leading-[1.01] md:leading-[0.98] mb-4 sm:mb-6 md:mb-8 relative w-full">
          <span className="sr-only">Law Clean Center - Préparation Esthétique B2B</span>
          <RevealText text={"L'EXCELLENCE\nAUTO SANS\nCONTRAINTE."} delay={0.4} />
        </h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl lg:max-w-2xl"
        >
          Avec <strong className="text-foreground font-bold">Law Clean Center</strong>, vous n&apos;avez plus à vous soucier de la préparation ou du déplacement de vos véhicules. On gère tout, à la carte, selon vos besoins.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold w-full sm:w-auto"
        >
          <Magnetic magneticPull={0.1} className="w-full sm:w-auto">
            <Link href="/contact" className="w-full block">
              <motion.div
                className="w-full min-h-12 sm:min-h-13 relative px-6 sm:px-8 py-3 sm:py-3.5 bg-primary text-primary-foreground group overflow-hidden flex items-center justify-center rounded-(--radius) transition-colors"
              >
                <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-background transition-colors duration-300">
                  FAITES VOTRE DEVIS
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </motion.div>
            </Link>
          </Magnetic>

          <Magnetic magneticPull={0.1} className="w-full sm:w-auto">
            <Link href="/services" className="w-full block">
              <motion.div
                className="w-full min-h-12 sm:min-h-13 relative px-6 sm:px-8 py-3 sm:py-3.5 border border-border bg-transparent text-foreground group overflow-hidden flex items-center justify-center rounded-(--radius) transition-colors hover:border-foreground"
              >
                <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-background transition-colors duration-300 text-center">DÉCOUVRIR NOS SERVICES</span>
              </motion.div>
            </Link>
          </Magnetic>
        </motion.div>
        </div>
      </motion.div>
      
      {/* SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-6 md:left-12 z-20 flex-col items-center gap-2 hidden md:flex"
      >
        <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground rotate-90 origin-left translate-y-6 translate-x-1">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 md:h-10 bg-foreground/60"
        />
      </motion.div>

    </section>
  );
}
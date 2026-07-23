"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";

const images = [
  "/images/8.jpeg",
  "/images/2.jpeg",
  "/images/1.jpeg",
];

const customEase = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const smoothYParallax = useSpring(yParallax, { stiffness: 220, damping: 92, mass: 1, restDelta: 0.0001 });

  const textYParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const smoothTextYParallax = useSpring(textYParallax, { stiffness: 220, damping: 92, mass: 1, restDelta: 0.0001 });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    images.forEach((src) => { const img = document.createElement("img"); img.src = src; });
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

  return (
    <section 
      ref={sectionRef}
      className="bg-background min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* BACKGROUND IMAGE WITH PARALLAX */}
      <motion.div
        style={{ y: smoothYParallax, opacity: heroOpacity }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: customEase }}
            className="w-full h-full absolute inset-0"
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
        <div className="absolute inset-0 bg-background/85 dark:bg-background/85 z-10" />
      </motion.div>

      {/* FOREGROUND CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ y: smoothTextYParallax }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full mt-20"
      >
        <motion.div variants={itemVariants} className="font-mono text-[10px] sm:text-xs uppercase font-semibold tracking-widest text-primary mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-primary"></span>
          SPÉCIALISTE ÎLE-DE-FRANCE
        </motion.div>

        <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] tracking-tighter uppercase text-foreground leading-[0.85] mb-8 relative w-full">
          <span className="sr-only">Law Clean Center - Préparation Esthétique B2B</span>
          <RevealText text={"PREPA.\nAUTO."} delay={0.4} />
        </h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground font-medium text-base sm:text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
        >
          Avec <strong className="text-foreground font-bold">Law Clean Center</strong>, vous n'avez plus à vous soucier de la préparation ou du déplacement de vos véhicules. On gère tout, à la carte, selon vos besoins.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-widest font-bold mt-4"
        >
          <Magnetic magneticPull={0.1}>
            <Link href="/services" className="w-full sm:w-auto block">
              <motion.div
                className="w-full sm:w-auto min-h-[60px] relative px-8 py-4 bg-primary text-primary-foreground group overflow-hidden flex items-center justify-center rounded-[var(--radius)] transition-colors"
              >
                <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-background transition-colors duration-300">
                  DÉCOUVRIR NOS SERVICES
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </motion.div>
            </Link>
          </Magnetic>

          <Magnetic magneticPull={0.1}>
            <Link href="/contact" className="w-full sm:w-auto block">
              <motion.div
                className="w-full sm:w-auto min-h-[60px] relative px-8 py-4 border border-border bg-transparent text-foreground group overflow-hidden flex items-center justify-center rounded-[var(--radius)] transition-colors hover:border-foreground"
              >
                <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-background transition-colors duration-300">FAITES VOTRE DEVIS</span>
              </motion.div>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>
      
      {/* SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-6 md:left-12 z-20 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground rotate-90 origin-left translate-y-8 translate-x-1.5">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-foreground"
        />
      </motion.div>

    </section>
  );
}
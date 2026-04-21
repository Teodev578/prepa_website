"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";

const images = [
  "/images/image_2.png",
  "/images/image_3.jpeg",
  "/images/image_4.jpeg",
];

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax: Image moves slower
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const smoothYParallax = useSpring(yParallax, { stiffness: 400, damping: 90 });

  // Hero Exit Fade
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: BEZIER }
    },
  };

  const flickerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0.3, 1, 0.8],
      transition: {
        duration: 0.5,
        times: [0, 0.2, 0.4, 0.6, 1],
        ease: "linear",
      }
    }
  };

  const titleLines = [
    "LE CHOIX",
    "NUMERO #1",
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-background min-h-[100dvh] h-[100dvh] box-border w-full flex flex-col overflow-hidden relative border-b border-border pt-20 md:pt-0"
    >
      <motion.div
        style={{ opacity: smoothHeroOpacity, scale: heroScale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row w-full h-full flex-grow origin-bottom"
      >

        {/* Left Column : Image (Mobile: Top, Desktop: Left) */}
        <div className="w-full h-[45%] md:h-full md:w-1/2 relative flex items-stretch border-b md:border-b-0 md:border-r border-technical box-border p-4 md:p-0 shrink-0 md:shrink overflow-hidden">

          {/* Edge Menu/Annotations (Desktop left border) */}
          <div className="hidden md:flex w-16 xl:w-20 shrink-0 flex-col justify-between items-center py-10 border-r border-technical bg-background relative z-10">
            <motion.div
              variants={flickerVariants}
              initial="initial"
              animate="animate"
              className="absolute top-0 right-0 tech-corner"
            ></motion.div>

            <motion.div
              variants={itemVariants}
              className="font-mono text-xs uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap mt-32 text-foreground"
            >
              GPS: 48°52'5.6"N 2°19'59.5"E
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ opacity: 0.7 }}
              className="flex flex-col gap-1.5 cursor-pointer transition-opacity"
            >
              <div className="w-6 h-[1.5px] bg-foreground"></div>
              <div className="w-4 h-[1.5px] bg-foreground"></div>
              <div className="w-8 h-[1.5px] bg-foreground"></div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="font-mono text-xs uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap mb-20 text-foreground"
            >
              SPEC. 01
            </motion.div>

            <motion.div
              variants={flickerVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 right-0 tech-corner"
            ></motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: BEZIER }}
            style={{ y: smoothYParallax }}
            className="flex-grow relative overflow-hidden bg-background h-full w-full"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover scale-110" // scale-110 to allow parallax headroom
                alt={`Precision Auto Technical - ${currentIndex + 1}`}
              />
            </AnimatePresence>

            {/* Technical Overlay - Minimal Indicators */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 z-20">
              {images.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.4, ease: BEZIER }}
                  className={`h-[2px] transition-colors duration-500 ${idx === currentIndex ? 'bg-primary' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column : Typography (Mobile: Bottom, Desktop: Right) */}
        <div className="flex-1 w-full md:w-1/2 relative bg-background flex flex-col justify-center px-6 md:px-16 lg:px-24 py-4 md:py-0 border-technical box-border">
          <motion.div 
            variants={flickerVariants}
            initial="initial"
            animate="animate"
            className="absolute top-0 left-0 tech-corner hidden md:block"
          ></motion.div>

          {/* Massive Cutoff Number (Aligned with Content) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: BEZIER }}
            className="absolute top-1/2 left-6 md:left-16 lg:left-24 -translate-y-1/2 text-[45vw] md:text-[35vw] font-sans font-black text-primary leading-none pointer-events-none z-0 select-none opacity-10"
          >
            #1
          </motion.div>

          <div className="relative z-10 max-w-xl">
            <motion.div
              variants={itemVariants}
              className="md:hidden font-mono text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-4 flex justify-between w-full"
            >
              <motion.span variants={flickerVariants}>GPS: 48°52'5.6"N 2°19'59.5"E</motion.span>
              <motion.span variants={flickerVariants}>SPEC. 01</motion.span>
            </motion.div>

            <h1 className="font-sans font-black text-[clamp(2.5rem,10vw,6rem)] md:text-[clamp(4.5rem,7vw,7.5rem)] tracking-tighter uppercase text-foreground leading-[0.8] mb-6 md:mb-10 relative">
              {titleLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + (i * 0.12),
                      ease: BEZIER
                    }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </h1>

            <motion.p
              variants={itemVariants}
              className="text-foreground/80 font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-14 lg:max-w-[500px]"
            >
              La perfection n'est pas une option. Notre protocole de restauration et de protection vise un seul objectif : le standard d'usine, ou mieux.
            </motion.p>

            {/* Buttons Technical Pattern */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-widest font-bold w-full"
            >
              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto min-h-[52px] relative px-8 py-4 bg-primary text-primary-foreground group overflow-hidden flex items-center justify-center rounded-[var(--radius)]"
              >
                {/* Fill effect background */}
                <motion.div 
                   className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  DÉCOUVRIR NOS SERVICES
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </span>
                {/* Border stretch */}
                <motion.div 
                  variants={{
                    hover: { width: "100%", opacity: 1 },
                    initial: { width: "0%", opacity: 0 }
                  }}
                  className="absolute bottom-0 left-0 h-[2px] bg-white z-20"
                />
              </motion.button>

              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto min-h-[52px] relative px-8 py-4 border border-primary bg-transparent text-foreground group overflow-hidden flex items-center justify-center gap-3 rounded-[var(--radius)]"
              >
                <motion.div 
                   className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <span className="w-1.5 h-1.5 bg-primary group-hover:bg-background block rounded-full transition-colors relative z-10"></span>
                <span className="relative z-10 group-hover:text-white transition-colors">NOTRE PORTFOLIO</span>
              </motion.button>
            </motion.div>
          </div>

          {/* EST. 2026 annotation */}
          <motion.div
            variants={flickerVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.5 }}
            className="absolute top-10 right-10 font-mono text-xs font-bold tracking-widest text-foreground uppercase hidden md:block hover:opacity-70 cursor-pointer transition-opacity"
          >
            EST. 2026
          </motion.div>
          <motion.div
            variants={flickerVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.8 }}
            className="absolute bottom-0 right-0 tech-corner hidden md:block"
          ></motion.div>
        </div>

      </motion.div>
    </section>
  );
}


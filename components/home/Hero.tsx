"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/image_2.png",
  "/images/image_3.jpeg",
  "/images/image_4.jpeg",
];

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: BEZIER }
    },
  };

  const titleLines = [
    "LE CHOIX",
    "NUMERO #1",
  ];

  return (
    <section className="bg-background min-h-[100dvh] lg:h-[100dvh] w-full flex flex-col overflow-hidden relative border-b border-border pt-20 lg:pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row w-full h-full flex-grow"
      >

        {/* Left Column : Image (Mobile: Top, Desktop: Left) */}
        <div className="w-full lg:w-1/2 relative flex items-stretch border-b lg:border-b-0 lg:border-r border-technical min-h-[40vh] lg:min-h-0 lg:h-full p-6 lg:p-0">

          {/* Edge Menu/Annotations (Desktop left border) */}
          <div className="hidden lg:flex w-16 xl:w-20 shrink-0 flex-col justify-between items-center py-10 border-r border-technical bg-background relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 0.4, delay: 0.6 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="absolute bottom-0 right-0 tech-corner"
            ></motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: BEZIER }}
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
                className="w-full h-full object-cover"
                alt={`Precision Auto Technical - ${currentIndex + 1}`}
              />
            </AnimatePresence>

            {/* Technical Overlay - Minimal Indicators */}
            <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 flex gap-2 z-20">
              {images.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.4, ease: BEZIER }}
                  className={`h-[2px] transition-colors duration-500 ${idx === currentIndex ? 'bg-primary' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column : Typography (Mobile: Bottom, Desktop: Right) */}
        <div className="w-full lg:w-1/2 relative bg-background flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 lg:py-0 border-technical flex-grow lg:h-full">
          <div className="absolute top-0 left-0 tech-corner hidden lg:block"></div>

          {/* Massive Cutoff Number (Aligned with Content) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: BEZIER }}
            className="absolute top-1/2 left-6 md:left-16 lg:left-24 -translate-y-1/2 text-[60vw] lg:text-[35vw] font-sans font-black text-primary leading-none pointer-events-none z-0 select-none opacity-10"
          >
            #1
          </motion.div>

          <div className="relative z-10 max-w-xl">
            <motion.div
              variants={itemVariants}
              className="md:hidden font-mono text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-4 flex justify-between w-full"
            >
              <span>GPS: 48°52'5.6"N 2°19'59.5"E</span>
              <span>SPEC. 01</span>
            </motion.div>

            <h1 className="font-sans font-black text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[clamp(4.5rem,7vw,7.5rem)] tracking-tighter uppercase text-foreground leading-[0.8] mb-8 md:mb-10 relative">
              {titleLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + (i * 0.1),
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
              className="text-foreground/80 font-medium text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-12 lg:max-w-[500px]"
            >
              La perfection n'est pas une option. Notre protocole de restauration et de protection vise un seul objectif : le standard d'usine, ou mieux.
            </motion.p>

            {/* Buttons Technical Pattern */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-widest font-bold w-full"
            >
              <motion.button
                whileHover={{ backgroundColor: "var(--primary)", color: "white" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto min-h-[48px] relative px-6 py-4 bg-primary text-primary-foreground group overflow-hidden flex items-center justify-center rounded-[var(--radius)] transition-colors duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  DÉCOUVRIR NOS SERVICES
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </span>
                {/* Visual border stretch effect on hover (optional enhancement) */}
                <div className="absolute inset-0 border border-primary-foreground/20 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto min-h-[48px] px-6 py-4 border border-primary bg-transparent text-foreground group flex items-center justify-center gap-3 rounded-[var(--radius)] transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 bg-primary group-hover:bg-background block rounded-full transition-colors"></span>
                NOTRE PORTFOLIO
              </motion.button>
            </motion.div>
          </div>

          {/* EST. 2026 annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, repeat: 0 }}
            className="absolute top-10 right-10 font-mono text-xs font-bold tracking-widest text-foreground uppercase hidden lg:block hover:opacity-70 cursor-pointer transition-opacity"
          >
            <motion.span
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              EST. 2026
            </motion.span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="absolute bottom-0 right-0 tech-corner hidden lg:block"
          ></motion.div>
        </div>

      </motion.div>
    </section>
  );
}


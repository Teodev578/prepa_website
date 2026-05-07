"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function CTA() {
  const titleLines = ["Vous aussi faites partie", "de nos nombreux clients", "satisfaits."];

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
    <section className="py-32 md:py-52 px-6 bg-background relative border-b border-border overflow-hidden flex justify-center items-center">
      {/* Technical background marks (Corners) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[
          { pos: "top-10 left-10", delay: 0.1 },
          { pos: "top-10 right-10", delay: 0.2 },
          { pos: "bottom-10 left-10", delay: 0.3 },
          { pos: "bottom-10 right-10", delay: 0.4 },
        ].map((marker, i) => (
          <motion.div
            key={i}
            initial="initial"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={flickerVariants}
            transition={{ delay: marker.delay }}
            className={`absolute ${marker.pos} text-primary font-mono text-xl opacity-50`}
          >
            +
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start text-left">
        
        {/* Subtle Tech ID */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: BEZIER }}
          // MODIFIÉ ICI : Espacement des lettres rendu responsive
          className="font-mono text-[10px] md:text-xs text-muted-foreground tracking-widest md:tracking-[0.3em] uppercase mb-6 md:mb-8 block"
        >
          // INITIATION_DE_CONTACT
        </motion.span>

        {/* Massive Animated Title */}
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans font-bold tracking-tight mb-10 md:mb-16 leading-[0.9] relative"
        >
          {titleLines.map((line, i) => (
            <div key={i} className="overflow-hidden relative pb-2 md:pb-0">
              <motion.div
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: 0 }
                }}
                transition={{ duration: 0.7, delay: 0.1 + (i * 0.1), ease: BEZIER }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </motion.h2>

        {/* Reusable Hero Button wrapped in a Next.js Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: BEZIER }}
        >
          <Link href="/contact" className="block w-full">
            <motion.div
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto min-h-[52px] md:min-h-[64px] relative px-10 py-5 border border-primary bg-transparent text-foreground group overflow-hidden flex items-center justify-center gap-4 rounded-[var(--radius)] cursor-pointer"
            >
              {/* Fill effect background */}
              <div 
                className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              
              {/* Animated Dot */}
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary group-hover:bg-background block rounded-full transition-colors relative z-10"></span>
              
              {/* Text */}
              {/* MODIFIÉ ICI : Espacement des lettres rendu responsive */}
              <span className="relative z-10 group-hover:text-white transition-colors font-mono text-sm md:text-base font-bold uppercase tracking-wider md:tracking-[0.2em]">
                CONTACTEZ-NOUS
              </span>
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
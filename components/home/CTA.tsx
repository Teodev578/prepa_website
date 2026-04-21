"use client";

import { motion } from "framer-motion";

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function CTA() {
  const titleLines = ["PRÊT POUR", "L'EXCELLENCE."];

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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
        scaleX: 1, 
        transition: { duration: 0.8, ease: BEZIER } 
    }
  };

  return (
    <section className="py-32 px-6 md:px-20 bg-background text-foreground relative border-b border-border overflow-hidden">
      {/* Technical background marks */}
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
            className={`absolute ${marker.pos} text-primary font-mono text-xl`}
          >
            +
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Massive Text Area */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: BEZIER }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 uppercase tracking-widest">
              STATUS: READY
            </span>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={lineVariants}
              className="h-[1px] bg-foreground opacity-30 origin-left w-16"
            ></motion.div>
          </motion.div>
          
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6rem] font-sans font-black uppercase tracking-tighter mb-6 leading-[0.85] relative"
          >
            {titleLines.map((line, i) => (
              <div key={i} className="overflow-hidden relative">
                <motion.div
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: 0 }
                  }}
                  transition={{ duration: 0.7, delay: 0.1 + (i * 0.1), ease: BEZIER }}
                >
                  {line.includes("EXCELLENCE") ? (
                    <>L'<span className="text-primary">EXCELLENCE</span>.</>
                  ) : line}
                </motion.div>
              </div>
            ))}
          </motion.h2>
          
          <div className="flex gap-px items-end h-8 opacity-40 mb-8">
            {[1, 3, 1, 4, 2].map((w, idx) => (
              <motion.div 
                key={idx}
                initial={{ height: 0 }}
                whileInView={{ height: idx === 0 || idx === 2 ? "100%" : (idx === 1 ? "70%" : (idx === 3 ? "40%" : "90%")) }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                className="bg-foreground" 
                style={{ width: `${w}px` }}
              ></motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: BEZIER }}
            className="font-mono text-xs md:text-sm lg:text-base text-muted-foreground max-w-md uppercase leading-relaxed tracking-wide"
          >
            Déclenchez le protocole d'ingénierie. Entrez vos coordonnées ci-contre pour une analyse complète de votre véhicule. Devis calibré sous 24h.
          </motion.p>
        </div>

        {/* Input & Action Area - Terminal feeling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4, ease: BEZIER }}
          className="flex-1 w-full max-w-lg"
        >
          <div className="border border-border bg-foreground text-background p-1 relative group">
            {/* Corner technical accents on input wrapper */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row w-full h-full">
              <div className="flex-grow flex items-center px-4 py-2 min-h-[48px] border-b md:border-b-0 md:border-r border-background/20">
                <span className="font-mono text-primary text-sm mr-4">{">"}</span>
                <input
                  className="w-full h-full bg-transparent border-none text-background font-mono text-xs placeholder:text-background/40 focus:ring-0 outline-none uppercase tracking-widest"
                  placeholder="VOTRE_ADRESSE_EMAIL"
                  type="email"
                />
              </div>
              <motion.button 
                whileHover={{ backgroundColor: "var(--primary-hover, #a11d33)" }} // Assuming primary hover color
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground min-h-[48px] font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 transition-colors flex items-center justify-center gap-2"
              >
                TRANSMETTRE
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </motion.button>
            </div>
            
            {/* Terminal decorative bottom border */}
            <motion.div 
              initial="initial"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={flickerVariants}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 right-0 font-mono text-[8px] text-muted-foreground tracking-widest uppercase"
            >
              SECURE_CONN_ESTABLISHED
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


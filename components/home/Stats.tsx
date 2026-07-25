"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-10px" });
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // ease out quart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeProgress * (to - from) + from);
        
        if (nodeRef.current) {
          nodeRef.current.textContent = currentCount.toString() + suffix;
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

// Hoisted to module scope — static data, no local state
const stats = [
  { value: 150, suffix: "+", label: "VÉHICULES/MOIS", description: "Capacité de traitement actuelle sur nos sites d'intervention en Île-de-France." },
  { value: 24, suffix: "H", label: "DÉLAI MOYEN", description: "Rotation ultra-rapide pour maximiser la rentabilité de votre parc." },
  { value: 100, suffix: "%", label: "CHARGES VARIABLES", description: "Transformez vos coûts fixes en flexibilité totale." },
  { value: 5, suffix: "", label: "CONCESSIONS PARTENAIRES", description: "Des leaders du marché nous font confiance au quotidien." }
];

export default function Stats() {
  return (
    <section className="py-24 bg-background border-b border-border relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col relative"
            >
              <div className="font-mono text-primary font-bold text-5xl md:text-6xl mb-4">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              
              <h3 className="font-sans font-black uppercase text-lg mb-3 tracking-tighter">
                {stat.label}
              </h3>
              
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                {stat.description}
              </p>
              
              <div className="absolute top-0 -left-6 w-[2px] h-0 bg-primary group-hover:h-full transition-[height]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

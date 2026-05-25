"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tickerItems = [
  "PRÉPARATION ESTHÉTIQUE B2B",
  "CONVOYAGE SÉCURISÉ",
  "CHARGES 100% VARIABLES",
  "ZÉRO CONTRAINTE LOGISTIQUE",
  "INTERVENTION ÎLE-DE-FRANCE",
  "NETTOYAGE CLINIQUE",
];

export default function ServiceTicker() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-12 border-b border-border bg-background w-full" />;

  return (
    <div className="w-full border-b border-border bg-background overflow-hidden relative flex items-center py-3 md:py-4 select-none">
      
      {/* Effet d'ombre sur les bords pour une apparition fluide du texte */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Petit indicateur "Live" fixe à gauche */}
      <div className="absolute left-4 md:left-8 z-20 flex items-center gap-2 hidden sm:flex bg-background px-2">
        <motion.div 
          animate={{ opacity: [1, 0.3, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-1.5 h-1.5 rounded-full bg-secondary"
        />
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-secondary">
          SYS_ACTIVE
        </span>
      </div>

      <motion.div
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35, // Ajuste cette valeur pour modifier la vitesse du défilement
        }}
      >
        {/* On double le tableau pour créer un effet de boucle infinie sans coupure */}
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/80 hover:text-foreground transition-colors duration-300">
              {item}
            </span>
            <span className="mx-6 md:mx-10 text-border">
              {/* Le séparateur technique style "slash" */}
              <span className="text-secondary/50 font-black italic">/</span>
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
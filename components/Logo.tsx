"use client";

import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 ${className} text-muted-foreground hover:text-foreground transition-colors duration-500`}>
      {/* Symbol - Style Réticule / Crosshair technique */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 md:h-7 w-auto flex-shrink-0"
      >
        {/* Traits fins */}
        <path d="M16 2V30" stroke="currentColor" strokeWidth="0.25" strokeLinecap="square"/>
        <path d="M2 16H30" stroke="currentColor" strokeWidth="0.25" strokeLinecap="square"/>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="0.25"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="0.25"/>
        
        {/* Point central de focus (utilise la couleur primary du thème pour cohérence) */}
        <circle cx="16" cy="16" r="1.5" fill="var(--primary)"/>
      </svg>

      {/* Text Logo - 🚀 Mise à jour du nom de marque & léger ajustement de l'espacement */}
      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold overflow-hidden whitespace-nowrap text-foreground">
        LAW CLEAN CENTER
      </span>
    </div>
  );
};

export default Logo;
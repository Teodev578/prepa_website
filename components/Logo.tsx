"use client";

import React from 'react';
import Image from 'next/image';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 ${className} text-muted-foreground hover:text-foreground transition-colors duration-500`}>
      
      {/* Conteneur de l'image du logo */}
      {/* Les tailles h-6 md:h-8 gardent la même proportion que ton ancien logo */}
      <div className="relative h-6 w-6 md:h-8 md:w-8 flex-shrink-0">
        <Image 
          src="/logo.png" /* ⚠️ REMPLACE "/logo.png" PAR LE NOM EXACT DE TON FICHIER */
          alt="Logo Law Clean Center"
          fill
          className="object-contain"
          priority /* Très important pour le SEO et LCP : charge le logo instantanément */
        />
      </div>

      {/* Text Logo - Le nom de marque */}
      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold overflow-hidden whitespace-nowrap text-foreground">
        LAW CLEAN CENTER
      </span>
    </div>
  );
};

export default Logo;
"use client";

import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 ${className} text-muted-foreground hover:text-foreground transition-colors duration-500`}>
      {/* Symbol */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 md:h-7 w-auto flex-shrink-0"
      >
        {/* Traits fins - Crosshair style */}
        <path d="M16 2V30" stroke="currentColor" strokeWidth="0.25" strokeLinecap="square"/>
        <path d="M2 16H30" stroke="currentColor" strokeWidth="0.25" strokeLinecap="square"/>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="0.25"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="0.25"/>
        
        {/* Point central bordeaux */}
        <circle cx="16" cy="16" r="1.5" fill="#9b2c2c"/>
      </svg>

      {/* Text Logo */}
      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium overflow-hidden whitespace-nowrap">
        PRECISION AUTO
      </span>
    </div>
  );
};

export default Logo;

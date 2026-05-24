"use client";
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
    beforeImg: string;
    afterImg: string;
    beforeLabel?: string;
    afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
    beforeImg, 
    afterImg, 
    beforeLabel = "AVANT", 
    afterLabel = "APRÈS" 
}) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Calcule la position en pourcentage en bloquant entre 0 et 100
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPos(percent);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    };

    // Arrête le glissement si on lâche le clic n'importe où sur l'écran
    useEffect(() => {
        const handleUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchend', handleUp);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full overflow-hidden border border-border bg-card p-1 select-none group"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseLeave={() => setIsDragging(false)} // Sécurité si la souris sort du cadre
        >
            {/* Image APRÈS (Fond) */}
            <img 
                src={afterImg} 
                className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover" 
                alt="After" 
            />

            {/* Image AVANT (Masque de découpe) */}
            <div 
                className="absolute inset-1 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <img 
                    src={beforeImg} 
                    className="absolute inset-0 w-full h-full object-cover grayscale" 
                    alt="Before" 
                />
                
                {/* Étiquette AVANT - Reste primaire/neutre pour le constat de base */}
                <div className="absolute top-4 left-4 font-mono text-[10px] md:text-xs font-bold text-primary bg-background/90 backdrop-blur-sm px-3 py-1.5 uppercase tracking-widest border border-border shadow-sm">
                    {beforeLabel}
                </div>
            </div>

            {/* Étiquette APRÈS - INTÉGRATION SECONDAIRE : Met en valeur le résultat */}
            <div className="absolute top-4 right-4 font-mono text-[10px] md:text-xs font-bold text-secondary-foreground bg-secondary px-3 py-1.5 uppercase tracking-widest z-10 pointer-events-none shadow-sm">
                {afterLabel}
            </div>

            {/* Zone de glissement (Hitbox) */}
            <div 
                className="absolute top-0 bottom-0 w-10 -ml-5 z-20 cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
            >
                {/* La fine ligne visuelle - INTÉGRATION SECONDAIRE */}
                <div className="absolute top-1 bottom-1 w-[1px] bg-secondary pointer-events-none shadow-[0_0_5px_rgba(0,0,0,0.3)]" />

                {/* Poignée centrale - INTÉGRATION SECONDAIRE : Appelle à l'interaction */}
                <div className={`w-10 h-10 rounded-full border-2 border-secondary bg-background flex items-center justify-center shadow-lg transition-transform pointer-events-none ${isDragging ? 'scale-90' : 'scale-100 group-hover:scale-110'}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                        <path d="m9 18-6-6 6-6"/>
                        <path d="m15 18 6-6-6-6"/>
                    </svg>
                </div>
            </div>

            {/* Calque de données (Textes naturels et vendeurs) */}
            <div className="absolute inset-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                {/* Texte incitatif - INTÉGRATION SECONDAIRE pour attirer l'œil */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[9px] font-bold text-secondary bg-background/95 px-3 py-1 uppercase tracking-[0.3em] border border-secondary/30 shadow-sm backdrop-blur-sm">
                    GLISSEZ POUR COMPARER
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
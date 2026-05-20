"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
            className="relative w-full aspect-video overflow-hidden border-[0.5px] border-border bg-white p-1 select-none cursor-ew-resize"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <img 
                src={afterImg} 
                className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover" 
                alt="After" 
            />

            {/* Before Image (Overlay with Clip) */}
            <div 
                className="absolute inset-1 overflow-hidden transition-all duration-75"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <img 
                    src={beforeImg} 
                    className="absolute inset-0 w-full h-full object-cover grayscale" 
                    alt="Before" 
                />
                
                {/* Visual Label Before */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-[#9B2C2C] bg-white/90 px-2 py-1 uppercase tracking-widest border-[0.5px] border-border">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle Line */}
            <div 
                className="absolute top-1 bottom-1 w-[1px] bg-[#9B2C2C] z-20 pointer-events-none"
                style={{ left: `calc(${sliderPos}% - 0.5px)` }}
            >
                {/* Handle Center Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#9B2C2C] bg-white flex items-center justify-center shadow-lg">
                    <div className="flex gap-1">
                        <div className="w-[1px] h-2 bg-[#9B2C2C]" />
                        <div className="w-[1px] h-2 bg-[#9B2C2C]" />
                    </div>
                </div>
            </div>

            {/* After Label */}
            <div className="absolute top-4 right-4 font-mono text-[9px] text-white bg-[#9B2C2C] px-2 py-1 uppercase tracking-widest z-10">
                {afterLabel}
            </div>

            {/* Technical Grid/Markers Overlay */}
            <div className="absolute inset-1 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/4 text-[#9B2C2C] font-mono text-[8px]">+ 48.2%_REFL</div>
                <div className="absolute bottom-1/3 right-1/4 text-[#9B2C2C] font-mono text-[8px]">+ 0.02μm_DIFF</div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-muted-foreground uppercase tracking-[0.4em]">ANALYSIS_GRID_ACTIVE</div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;

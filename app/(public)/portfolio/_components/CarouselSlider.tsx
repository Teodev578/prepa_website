"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarouselSlider({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-full group overflow-hidden bg-muted">
            <AnimatePresence initial={false} mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Carrousel image ${currentIndex + 1}`}
                        className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset }) => {
                            if (offset.x < -40) {
                                handleNext();
                            } else if (offset.x > 40) {
                                handlePrev();
                            }
                        }}
                    />
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 text-foreground border border-border p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-20"
                        aria-label="Image précédente"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 text-foreground border border-border p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-20"
                        aria-label="Image suivante"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-4' : 'bg-background/60 hover:bg-background/90'}`}
                                aria-label={`Aller à l'image ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

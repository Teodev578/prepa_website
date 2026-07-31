"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 bg-background flex flex-col items-center justify-center text-foreground" style={{ zIndex: 9999 }}
        >
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="flex flex-col items-center"
          >
            <div className="font-sans font-black text-4xl tracking-tighter uppercase mb-4">
              LAW CLEAN CENTER
            </div>
            
            <div className="w-48 h-1 overflow-hidden relative bg-muted">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-primary"
              />
            </div>
            
            <div className="font-mono text-[10px] mt-4 tracking-widest uppercase text-muted-foreground">
              INITIALIZING_SYSTEM...
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  const lines = text.split("\n");
  let wordIndexCounter = 0;

  return (
    <span className={`inline-flex flex-col ${className}`}>
      {lines.map((line, lineIdx) => {
        const words = line.trim().split(/\s+/).filter(Boolean);
        return (
          <span key={lineIdx} className="inline-flex flex-wrap items-baseline">
            {words.map((word) => {
              const currentDelay = delay + wordIndexCounter * 0.05;
              wordIndexCounter++;
              return (
                <span
                  key={`${lineIdx}-${word}-${wordIndexCounter}`}
                  className="overflow-hidden py-[0.18em] -my-[0.18em] px-[0.1em] -mx-[0.1em] mr-[0.25em]"
                >
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: currentDelay,
                    }}
                    className="inline-block origin-bottom-left"
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  // Allow for forcing line breaks by using '\n'
  const words = text.split(" ");
  
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => {
        if (word === "\n") {
          return <br key={wordIndex} className="w-full" />;
        }
        return (
          <span key={wordIndex} className="overflow-hidden pb-[0.15em] -mb-[0.15em] mr-[0.25em]">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + (wordIndex * 0.05)
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
}

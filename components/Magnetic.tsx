"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  magneticPull?: number;
  magneticPullX?: number;
  magneticPullY?: number;
}

export default function Magnetic({
  children,
  className = "",
  magneticPull = 0.3,
  magneticPullX,
  magneticPullY,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const pullX = magneticPullX !== undefined ? magneticPullX : magneticPull;
  const pullY = magneticPullY !== undefined ? magneticPullY : magneticPull;

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * pullX, y: middleY * pullY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

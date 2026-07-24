"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Enable smooth scrolling only on desktop (prevent JS scroll hijack on mobile)
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

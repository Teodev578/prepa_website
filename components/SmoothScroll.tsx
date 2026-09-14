"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/useDevice";

/** Buttery smooth scrolling — disabled for reduced-motion users. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Expose for anchor scrolling
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}

/** Scroll to target using Lenis when available, native otherwise. */
export function scrollToTarget(selector: string) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

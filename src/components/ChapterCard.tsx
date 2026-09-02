"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ChapterCardProps {
  scene: string;
  title: string;
  sub?: string;
}

/**
 * Full-screen chapter interstitial — a "film slate" that pins briefly.
 * Letterbox bars slide in during the pin for the cinema-cut feel.
 */
export default function ChapterCard({ scene, title, sub }: ChapterCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Slate lives in the middle portion of the pinned range
  const slateOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
  const slateScale = useTransform(scrollYProgress, [0.15, 0.45, 0.85], [0.92, 1, 1.06]);
  const slateY = useTransform(scrollYProgress, [0.15, 0.85], [40, -40]);

  // Letterbox bars slide in/out during the scene
  const barTop = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.9], ["-12vh", "0vh", "0vh", "-12vh"]);
  const barBottom = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.9], ["12vh", "0vh", "0vh", "12vh"]);
  const lineGrow = useTransform(scrollYProgress, [0.25, 0.55], ["0%", "100%"]);

  if (reduced) {
    return (
      <div className="py-24 px-6 text-center">
        <p className="mono-label text-accent mb-2">{scene}</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
        {sub && <p className="mono-label text-muted-foreground mt-3">{sub}</p>}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[220vh]" aria-label={`Scene: ${title}`}>
      {/* Letterbox bars */}
      <motion.div style={{ top: barTop }} className="fixed left-0 right-0 h-[12vh] bg-black z-30 pointer-events-none" aria-hidden="true" />
      <motion.div style={{ bottom: barBottom }} className="fixed left-0 right-0 h-[12vh] bg-black z-30 pointer-events-none" aria-hidden="true" />

      {/* Sticky slate */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: slateOpacity, scale: slateScale, y: slateY }} className="text-center px-6">
          <p className="mono-label text-accent mb-4">{scene}</p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">{title}</h2>
          <motion.div style={{ width: lineGrow }} className="h-px bg-accent/60 mx-auto mt-6 max-w-xs" aria-hidden="true" />
          {sub && <p className="mono-label text-muted-foreground mt-6">{sub}</p>}
        </motion.div>
      </div>
    </div>
  );
}

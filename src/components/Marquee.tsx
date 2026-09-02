"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/** Infinite tech ticker. Pauses on hover; static under reduced motion. */
export default function Marquee({ items, reverse = false, className }: MarqueeProps) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className={`relative overflow-hidden border-y border-border bg-background/40 py-4 ${className ?? ""}`}
      aria-label={`${items.join(", ")}`}>
      <motion.div
        className="flex w-max gap-0 whitespace-nowrap will-change-transform"
        animate={reduced ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={reduced ? { transform: reverse ? "translateX(-50%)" : undefined } : undefined}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 mono-label text-muted-foreground/80 hover:text-accent transition-colors">
            {item}
            <span className="text-accent/60" aria-hidden="true">✦</span>
          </span>
        ))}
      </motion.div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { charStagger, charReveal } from "@/lib/motion";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Trigger immediately on mount rather than in view */
  immediate?: boolean;
}

/** Character-by-character kinetic reveal. */
export default function KineticText({ text, className, delay = 0, immediate = false }: KineticTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  let charIndex = 0;

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={charStagger}
      custom={delay}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true } })}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((char, ci) => {
            charIndex += 1;
            return (
              <motion.span key={ci} variants={charReveal} className="inline-block will-change-transform">
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

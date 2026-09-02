"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { blurReveal, viewportOnce } from "@/lib/motion";

const WORDS = ["I", "BUILD", "INTELLIGENT", "SYSTEMS"];

/** Scroll-driven kinetic typography statement. */
export default function KineticStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xShift = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const glow = useTransform(scrollYProgress, [0.3, 0.55, 0.8], [0, 1, 0]);

  return (
    <section ref={ref} aria-label="I build intelligent systems"
      className="relative py-28 lg:py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-backdrop opacity-60" aria-hidden="true" />

      <motion.div style={reduced ? {} : { x: xShift }} className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-baseline gap-x-[0.35em] gap-y-2">
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              variants={blurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={i}
              className={`font-bold tracking-tight leading-[1.05] ${i === 3 ? "text-accent" : "text-foreground"}`}
              style={{
                fontSize: `clamp(2.6rem, ${5 + i}vw, ${4.2 + i * 0.6}rem)`,
                textShadow: i === 3 ? "0 0 40px rgba(59,130,246,0.35)" : undefined,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div style={{ opacity: glow }} aria-hidden="true"
          className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <motion.p variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={4}
          className="mono-label text-muted-foreground mt-10">
          AGENTIC AI × FULL STACK × CLOUD — ADUSUMALLI SAI PAVAN
        </motion.p>
      </motion.div>
    </section>
  );
}

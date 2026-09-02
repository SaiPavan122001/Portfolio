"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

const WORDS = ["I ANALYZE", "I ORCHESTRATE", "I AUTOMATE", "I BUILD"];

/**
 * Pinned big-word scene — each word takes over the screen,
 * scaling/fading like title cards as you scroll.
 */
export default function BigWords() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const finalGlowOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  if (reduced) {
    return (
      <div className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          I ANALYZE · I ORCHESTRATE ·<br />
          <span className="text-accent">I AUTOMATE · I BUILD</span>
        </h2>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[400vh]" aria-label="I analyze, orchestrate, automate, and build">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {WORDS.map((word, i) => (
          <WordCard key={word} word={word} index={i} total={WORDS.length} progress={scrollYProgress} />
        ))}
        {/* Final frame accent */}
        <motion.div style={{ opacity: finalGlowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(59,130,246,0.10),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function WordCard({ word, index, total, progress }: {
  word: string; index: number; total: number; progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;

  const opacity = useTransform(progress, [start, start + seg * 0.22, end - seg * 0.22, end],
    index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [0.7, index === total - 1 ? 1.1 : 1.35]);
  const blur = useTransform(progress, [start, start + seg * 0.2, end - seg * 0.2, end],
    index === total - 1 ? ["blur(14px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);
  const y = useTransform(progress, [start, end], [60, -60]);
  const isLast = index === total - 1;

  return (
    <motion.div
      style={{ opacity, scale, filter: blur, y }}
      className={`absolute font-bold tracking-tight text-center px-6 leading-none
        ${isLast ? "text-accent text-glow" : "text-foreground"}`}
      aria-hidden="true"
    >
      <span className="block text-[13vw] sm:text-[10vw] lg:text-[8.5vw]">{word}</span>
      {isLast && (
        <span className="block mt-6 text-sm sm:text-base font-normal tracking-normal text-muted-foreground">
          INTELLIGENT SYSTEMS THAT SOLVE REAL PROBLEMS
        </span>
      )}
    </motion.div>
  );
}

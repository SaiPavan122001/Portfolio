"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/data/portfolio";

const BOOT = ["INITIALIZING", "AI SYSTEMS — READY", "FULL STACK — READY", "CLOUD — READY", "SYSTEM ONLINE"];

/** Shared flag so the hero can skip its own boot when the preloader ran. */
export const preloadFlags = { done: false };

/**
 * Cinematic preloader: 0→100 counter, boot lines, then curtain wipe.
 * Skipped entirely for reduced-motion users.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) { preloadFlags.done = true; setDone(true); return; }
    document.body.style.overflow = "hidden";

    let value = 0;
    const tick = setInterval(() => {
      value = Math.min(100, value + Math.random() * 14 + 4);
      setProgress(Math.floor(value));
      if (value >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          setDone(true);
          preloadFlags.done = true;
          window.dispatchEvent(new Event("preloader:done"));
          setTimeout(() => { document.body.style.overflow = ""; }, 1200);
        }, 450);
      }
    }, 120);

    return () => { clearInterval(tick); document.body.style.overflow = ""; };
  }, [reduced]);

  const lineIdx = Math.min(BOOT.length - 1, Math.floor((progress / 100) * BOOT.length));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
          role="status" aria-label="Loading portfolio"
          exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.9 }}>

          {/* Curtain panels */}
          <motion.div aria-hidden="true" className="absolute left-0 top-0 h-full w-1/2 bg-[#050505]"
            exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} />
          <motion.div aria-hidden="true" className="absolute right-0 top-0 h-full w-1/2 bg-[#050505]"
            exit={{ y: "100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} />

          {/* Content */}
          <motion.div className="relative z-10 text-center px-6"
            exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
            <p className="mono-label text-muted-foreground mb-4">INITIALIZING PORTFOLIO</p>
            <p className="text-6xl sm:text-8xl font-bold tabular-nums tracking-tight text-foreground">
              {String(progress).padStart(3, "0")}
              <span className="text-accent text-3xl sm:text-5xl">%</span>
            </p>
            <div className="mt-6 h-px w-56 sm:w-72 mx-auto bg-border overflow-hidden" aria-hidden="true">
              <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <p className="mono-label text-accent mt-5">{BOOT[lineIdx]}<span className="animate-pulse">...</span></p>
            <p className="mono-label text-muted-foreground/60 mt-10 text-[10px]">{profile.name.toUpperCase()} — {profile.title.toUpperCase()}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

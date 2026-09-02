"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { profile } from "@/data/portfolio";
import AINetwork from "@/components/AINetwork";
import Magnetic from "@/components/Magnetic";
import KineticText from "@/components/KineticText";
import { scrollToTarget } from "@/components/SmoothScroll";
import { preloadFlags } from "@/components/Preloader";
import { blurReveal, fadeUp } from "@/lib/motion";

export default function Hero() {
  const reduced = useReducedMotion();
  // The preloader plays the boot sequence — hero enters right after its curtain wipe.
  const [booted, setBooted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const finish = () => setBooted(true);
    if (reduced || preloadFlags.done) { finish(); return; }
    window.addEventListener("preloader:done", finish, { once: true });
    return () => window.removeEventListener("preloader:done", finish);
  }, [reduced]);

  const scrollToProjects = () => scrollToTarget("#projects");

  const show = booted || reduced;
  const d = (i: number) => (reduced ? 0 : i);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Aurora + grid backdrop */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora aurora-1 -top-32 -left-24" />
        <div className="aurora aurora-2 bottom-0 right-0" />
      </div>
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.09),transparent_70%)]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center relative z-10">
        <motion.div style={{ y: yText, opacity }} className="order-2 lg:order-1">
          {!show ? (
            // The preloader's boot sequence covers the screen while `show` is false
            <div aria-hidden="true" className="mono-label text-muted-foreground invisible select-none">
              INITIALIZING...
            </div>
          ) : (
            <>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d(0.1) }} className="mono-label text-accent mb-5">
                ▸ SYSTEM ONLINE — {profile.location.toUpperCase()}
              </motion.p>

              <h1 className="text-[2.6rem] leading-[1.05] md:text-6xl lg:text-7xl font-bold tracking-tight mb-5">
                <KineticText text="Adusumalli" immediate delay={d(0.2)} className="block" />
                <KineticText text="Sai Pavan" immediate delay={d(0.45)} className="block text-accent text-glow" />
              </h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d(0.9), duration: 0.7 }}
                className="text-lg md:text-xl text-foreground/90 font-medium mb-3">
                Agentic AI <span className="text-accent">×</span> Full Stack Engineering
              </motion.p>

              <motion.p variants={blurReveal} initial="hidden" animate="visible" custom={d(5)}
                className="text-muted-foreground max-w-xl mb-9 leading-relaxed">
                {profile.summary}
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={d(6)} className="flex flex-wrap gap-4 mb-10">
                <Magnetic>
                  <button onClick={scrollToProjects} data-cursor="open"
                    className="px-7 py-3.5 bg-accent text-white rounded-md font-medium hover:bg-accent/90 transition-colors flex items-center gap-2 shadow-[0_0_24px_rgba(59,130,246,0.35)]">
                    Explore My Work <ArrowDown size={17} />
                  </button>
                </Magnetic>
                <Magnetic>
                  <a href="/resume.pdf" target="_blank" data-cursor="read"
                    className="px-7 py-3.5 border border-border rounded-md font-medium text-foreground hover:border-accent/60 hover:bg-accent/5 transition-colors flex items-center gap-2">
                    <Download size={17} /> Download Resume
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={d(7)} className="flex gap-3">
                {[
                  { href: profile.github, icon: Github, label: "GitHub" },
                  { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="p-3 border border-border rounded-full text-muted-foreground hover:text-accent hover:border-accent/50 hover:-translate-y-0.5 transition-all">
                    <s.icon size={18} />
                  </a>
                ))}
              </motion.div>

            </>
          )}
        </motion.div>

        <motion.div style={{ y: yVisual }} className="order-1 lg:order-2 relative h-[300px] sm:h-[380px] lg:h-[520px]"
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: d(0.3) }}>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_65%)]" aria-hidden="true" />
          <AINetwork />
        </motion.div>
      </div>

      <motion.button onClick={() => scrollToTarget("#about")} aria-label="Scroll to about"
        initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
        <span className="mono-label text-[10px]">SCROLL</span>
        <motion.span animate={reduced ? {} : { y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>

    </section>
  );
}

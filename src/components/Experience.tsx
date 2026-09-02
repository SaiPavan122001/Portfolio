"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, MoveRight } from "lucide-react";
import { experience, Experience as Job } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import { EASE, viewportOnce } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useDevice";
import { scrollToTarget } from "@/components/SmoothScroll";

/** Chronological order: earliest first. */
const timeline = [...experience].reverse();

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 px-0">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading index="02" title="Experience" description="Four years across AI engineering, full-stack delivery, and cloud-native verification." />
      </div>
      <FilmStrip jobs={timeline} />
    </section>
  );
}

/** Desktop: pinned horizontal film strip. Mobile: vertical timeline. */
function FilmStrip({ jobs }: { jobs: Job[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [range, setRange] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const x = useTransform(smooth, [0.04, 0.96], [0, -range]);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, [isMobile]);

  if (isMobile || reduced) {
    return (
      <div className="px-6">
        <VerticalTimeline jobs={jobs} />
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${jobs.length * 70 + 30}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Film sprocket rails */}
        <div className="absolute top-[9vh] left-0 right-0 h-6 opacity-30 flex items-center gap-4 overflow-hidden px-6" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => <span key={i} className="w-3 h-3 rounded-[2px] border border-border flex-shrink-0" />)}
        </div>
        <div className="absolute bottom-[9vh] left-0 right-0 h-6 opacity-30 flex items-center gap-4 overflow-hidden px-6" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => <span key={i} className="w-3 h-3 rounded-[2px] border border-border flex-shrink-0" />)}
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-8 pl-[8vw] pr-24 will-change-transform">
          {jobs.map((job, i) => (
            <FilmCard key={job.id} job={job} index={i} />
          ))}
          {/* End frame */}
          <div className="flex-shrink-0 w-[340px] flex items-center justify-center">
            <button onClick={() => scrollToTarget("#featured")} data-cursor="open"
              className="group flex flex-col items-center gap-4 p-10 border border-dashed border-accent/40 rounded-xl hover:bg-accent/5 transition-colors">
              <span className="mono-label text-accent">NEXT SCENE</span>
              <span className="text-2xl font-bold group-hover:text-accent transition-colors">Featured System</span>
              <MoveRight size={28} className="text-accent group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Progress hint */}
        <div className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 flex items-center gap-3 mono-label text-muted-foreground/60 text-[10px]">
          <span>SCROLL</span>
          <div className="w-40 h-px bg-border relative overflow-hidden">
            <motion.div style={{ scaleX: smooth }} className="absolute inset-0 bg-accent origin-left" />
          </div>
          <span>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

/** Film-frame styled experience card. */
function FilmCard({ job, index }: { job: Job; index: number }) {
  const year = job.duration.slice(0, 4);
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      className="group flex-shrink-0 w-[480px] lg:w-[560px] rounded-xl border border-border bg-background/70 backdrop-blur-sm
        hover:border-accent/50 hover:shadow-[0_12px_60px_rgba(59,130,246,0.10)] transition-all duration-300 overflow-hidden"
    >
      {/* Clapper header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-accent/5">
        <span className="mono-label text-accent">FRAME {String(index + 1).padStart(2, "0")}</span>
        <span className="mono-label text-muted-foreground">{year}</span>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{job.company}</h3>
        <p className="text-accent mt-1.5 font-medium">{job.position}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar size={13} />{job.duration}</span>
          {job.location && <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>}
        </div>

        <ul className="mt-5 space-y-2.5 min-h-[150px]">
          {job.responsibilities.map((resp, j) => (
            <li key={j} className="text-sm text-muted-foreground flex gap-2.5">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
              {resp}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/70">
          {job.technologies.map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-[11px] mono-label bg-accent/5 border border-border rounded text-muted-foreground group-hover:border-accent/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/** Vertical timeline — mobile & reduced-motion fallback. */
function VerticalTimeline({ jobs }: { jobs: Job[] }) {
  return (
    <div className="relative pl-10 max-w-2xl mx-auto">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
      <div className="space-y-12">
        {jobs.map((job) => (
          <motion.div key={job.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }} className="relative">
            <span aria-hidden="true" className="absolute -left-10 top-1.5 w-[15px] flex justify-center">
              <span className="w-3 h-3 rounded-full border-2 border-accent bg-background shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </span>
            <div className="p-6 border border-border rounded-xl bg-background/60">
              <h3 className="text-xl font-semibold">{job.company}</h3>
              <p className="text-accent mt-1 text-sm font-medium">{job.position}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar size={13} />{job.duration}</span>
                {job.location && <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>}
              </div>
              <ul className="mt-4 space-y-2">
                {job.responsibilities.map((resp, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex gap-2.5">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />{resp}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-[11px] mono-label bg-accent/5 border border-border rounded text-muted-foreground">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce} className="flex items-center">
          <span className="absolute -left-10 w-[15px] flex justify-center" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
          </span>
          <span className="mono-label text-accent">▸ NOW — OPEN TO NEXT SYSTEM</span>
        </motion.div>
      </div>
    </div>
  );
}


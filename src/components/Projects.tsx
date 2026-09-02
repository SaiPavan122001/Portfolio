"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import CaseStudyModal from "@/components/CaseStudyModal";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useDevice";
import { viewportOnce, EASE } from "@/lib/motion";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="05" title="Project Gallery" description="Systems built across enterprise AI, knowledge automation, and full-stack platforms." />

        <div className="grid md:grid-cols-2 gap-5">
          {others.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} onOpen={() => setSelected(project)} />
          ))}
        </div>

        {selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}
      </div>
    </section>
  );
}

/** Card with subtle 3D tilt + mouse-tracked border glow. */
function TiltCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });
  const interactive = !isTouch && !reduced;

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 5, ry: (px - 0.5) * 7 });
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => { setTilt({ rx: 0, ry: 0 }); setGlow((g) => ({ ...g, on: false })); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 2) * 0.1 }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
        role="button"
        tabIndex={0}
        data-cursor="view"
        aria-label={`Open case study: ${project.name}`}
        className="relative h-full p-6 border border-border rounded-xl bg-background/60 backdrop-blur-sm
          transition-[border-color,box-shadow] duration-300 hover:border-accent/50 cursor-pointer"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: interactive ? "transform 0.18s ease-out" : undefined,
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500"
          style={{ opacity: glow.on ? 1 : 0, background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.07), transparent 60%)` }}
          aria-hidden="true" />

        <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <motion.span key={tech}
              whileHover={interactive ? { y: -2, borderColor: "rgba(59,130,246,0.5)" } : {}}
              className="px-2.5 py-1 text-[11px] mono-label bg-border/40 border border-border/60 rounded text-muted-foreground">
              {tech}
            </motion.span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm text-accent">
          Read case study <ArrowUpRight size={14} />
        </span>
      </div>

    </motion.div>
  );
}

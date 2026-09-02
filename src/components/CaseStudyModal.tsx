"use client";

import { motion } from "framer-motion";
import { X, Github, Target, Lightbulb, Layers, Wrench } from "lucide-react";
import type { Project } from "@/data/portfolio";

/** Immersive slide-in case study drawer. */
export default function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [
    { icon: Target, title: "PROBLEM", body: project.problem },
    { icon: Lightbulb, title: "SOLUTION", body: project.solution },
    {
      icon: Layers, title: "ARCHITECTURE",
      body: "Components compose through REST boundaries: UI → API → orchestration → retrieval → reasoning. Each layer stays independently deployable and observable.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-stretch justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
    >
      <motion.aside
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-xl h-full bg-background border-l border-border overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background/90 backdrop-blur border-b border-border">
          <span className="mono-label text-accent">CASE STUDY</span>
          <button onClick={onClose} aria-label="Close case study" className="p-2 rounded-md hover:bg-border transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <motion.h3 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-2xl font-bold mb-3">
            {project.name}
          </motion.h3>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="text-muted-foreground text-sm mb-8 leading-relaxed">
            {project.description}
          </motion.p>

          <div className="space-y-7">
            {sections.map((section, i) => (
              <motion.section key={section.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}>
                <h4 className="flex items-center gap-2 mono-label text-accent mb-2">
                  <section.icon size={14} /> {section.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
              </motion.section>
            ))}

            <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              <h4 className="flex items-center gap-2 mono-label text-accent mb-3"><Wrench size={14} /> TECHNOLOGIES</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs mono-label bg-accent/10 text-accent border border-accent/25 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          {project.github && project.github !== "#" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-10">
              <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="view"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent/90 transition-colors">
                <Github size={17} /> View Repository
              </a>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </motion.div>
  );
}

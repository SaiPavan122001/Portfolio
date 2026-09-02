"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import CopilotArchitecture from "@/components/CopilotArchitecture";
import { blurReveal, viewportOnce, EASE } from "@/lib/motion";

const featured = projects.find((p) => p.featured)!;

const STORY = [
  {
    title: "The Problem",
    body: "Enterprise operations teams investigating production failures must manually cross-reference incidents, logs, and deployment changes scattered across systems — slow, error-prone, and dependent on deep domain knowledge.",
  },
  {
    title: "The Approach",
    body: "An end-to-end operational copilot built with FastAPI, React, LangGraph, and Qdrant. A multi-agent diagnostic workflow deploys specialized agents that evaluate telemetry logs and isolate operational faults automatically.",
  },
  {
    title: "The Intelligence Layer",
    body: "LangGraph orchestrates specialized agents — incident, log, deployment, and root-cause — while RAG pipelines over Qdrant ground every answer in real enterprise knowledge, and natural language makes live production metrics accessible to non-technical stakeholders.",
  },
  {
    title: "The Engineering Layer",
    body: "A React dashboard exposes the system to operators; FastAPI handles orchestration and API contracts; vector search enables context-aware retrieval across production data sources.",
  },
  {
    title: "The Result",
    body: "Root cause analysis that once required hours of manual investigation is delivered as an automated, explainable diagnosis — direct from my production work at Hinfinity Solutions.",
  },
];

export default function FeaturedProject() {
  return (
    <section id="featured" className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_30%,rgba(59,130,246,0.06),transparent_70%)]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading index="04" title="Featured System" description="The project that defines how I engineer — an AI copilot for production operations." />

        <motion.div variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={1} className="mb-12">
          <span className="mono-label text-accent border border-accent/40 bg-accent/5 rounded-full px-4 py-1.5 inline-block">
            ★ ENTERPRISE AI OPERATIONS COPILOT
          </span>
          <p className="text-muted-foreground mt-4 max-w-2xl">{featured.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: scroll-driven architecture */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8, ease: EASE }}>
            <CopilotArchitecture />
          </motion.div>

          {/* Right: story */}
          <div className="space-y-8">
            {STORY.map((chapter, i) => (
              <motion.article key={chapter.title}
                initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                className="relative pl-6 border-l border-border hover:border-accent/60 transition-colors group">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-background border-2 border-border group-hover:border-accent transition-colors" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-3">
                  <span className="mono-label text-accent/60 text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  {chapter.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{chapter.body}</p>
              </motion.article>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6 }}
              className="pt-2">
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.technologies.map((tech, i) => (
                  <motion.span key={tech} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="px-3 py-1.5 text-xs mono-label bg-accent/10 text-accent border border-accent/25 rounded">
                    {tech}
                  </motion.span>
                ))}
              </div>
              {featured.github && featured.github !== "#" && (
                <a href={featured.github} target="_blank" rel="noopener noreferrer" data-cursor="view"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md font-medium hover:border-accent/60 hover:bg-accent/5 transition-all group">
                  <Github size={17} />
                  View Source
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

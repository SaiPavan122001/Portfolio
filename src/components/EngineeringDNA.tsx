"use client";

import { motion } from "framer-motion";
import { profile, professionalSnapshot } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import { EASE, viewportOnce, blurReveal } from "@/lib/motion";

const BRANCHES = [
  { title: "AI SYSTEMS", techs: ["AGENTS", "RAG", "MCP", "LLMS", "LANGGRAPH", "LANGFUSE"] },
  { title: "FULL STACK", techs: ["REACT", "JAVA", "PYTHON", "FASTAPI", "SPRING BOOT", "NODE.JS"] },
  { title: "CLOUD", techs: ["AWS", "DOCKER", "K8S", "OPENSHIFT", "CI/CD", "HELM"] },
];

const lineGrow = (delay: number) => ({
  initial: { scaleY: 0 },
  whileInView: { scaleY: 1 },
  viewport: viewportOnce,
  transition: { duration: 0.7, ease: EASE, delay },
});

const branchGrow = (delay: number) => ({
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: viewportOnce,
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function EngineeringDNA() {
  return (
    <section id="about" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" title="About Me" description={profile.summary} />

        {/* Engineering DNA tree */}
        <div className="mb-24" aria-label="Engineering DNA capability map">
          {/* Root */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce}
            className="mx-auto w-fit px-8 py-3 border border-accent/50 rounded-md bg-accent/5 text-center shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <span className="mono-label text-accent">SAI PAVAN</span>
          </motion.div>

          {/* Trunk */}
          <div className="flex justify-center">
            <motion.div {...lineGrow(0.2)} className="w-px h-10 bg-gradient-to-b from-accent/70 to-accent/30 origin-top" aria-hidden="true" />
          </div>

          {/* Horizontal split */}
          <div className="hidden md:flex justify-center">
            <motion.div {...branchGrow(0.5)} className="w-2/3 h-px bg-accent/30 origin-center" aria-hidden="true" />
          </div>

          {/* Branch columns */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 mt-8 md:mt-0">
            {BRANCHES.map((branch, i) => (
              <motion.div key={branch.title} className="group relative flex flex-col items-center"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE, delay: 0.6 + i * 0.15 }}>
                {/* Drop line */}
                <motion.div {...lineGrow(0.7 + i * 0.15)} className="hidden md:block w-px h-8 bg-accent/30 origin-top" aria-hidden="true" />

                <div className="w-full max-w-xs p-5 border border-border rounded-lg bg-background/60 backdrop-blur-sm
                  hover:border-accent/60 hover:shadow-[0_0_36px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <h3 className="mono-label text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:shadow-[0_0_10px_rgba(59,130,246,0.9)] transition-shadow" />
                    {branch.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {branch.techs.map((tech, j) => (
                      <motion.span key={tech}
                        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce}
                        transition={{ delay: 0.9 + i * 0.15 + j * 0.05, duration: 0.35 }}
                        className="px-2.5 py-1 text-[11px] mono-label bg-border/40 border border-border/60 rounded text-muted-foreground
                          group-hover:text-foreground group-hover:border-accent/40 transition-colors duration-300">
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={3}
            className="text-center mono-label text-muted-foreground mt-10">
            CONNECTED CAPABILITIES — ONE ENGINEERING MIND
          </motion.p>
        </div>

        {/* Professional snapshot */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {professionalSnapshot.map((item) => (
            <div key={item.label} className="bg-background p-6 text-center hover:bg-accent/5 transition-colors">
              <p className="text-2xl md:text-3xl font-bold text-accent">{item.value}</p>
              <p className="mono-label text-muted-foreground mt-2">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

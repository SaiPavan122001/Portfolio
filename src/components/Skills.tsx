"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import { viewportOnce, EASE } from "@/lib/motion";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="03" title="Technical Arsenal" description="Tools and technologies I reach for when engineering intelligent systems." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <motion.div key={skill.category}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group p-6 border border-border rounded-xl bg-background/60 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_8px_40px_rgba(59,130,246,0.07)] transition-all duration-300">
              <h3 className="mono-label text-accent mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <motion.span key={item}
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce}
                    transition={{ delay: 0.2 + (i % 3) * 0.08 + j * 0.04, duration: 0.3 }}
                    className="px-3 py-1.5 text-xs mono-label bg-border/40 border border-border/60 rounded text-muted-foreground
                      group-hover:border-accent/30 group-hover:text-foreground transition-colors duration-300">
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

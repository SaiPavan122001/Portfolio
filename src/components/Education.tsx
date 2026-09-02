"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import { viewportOnce, EASE } from "@/lib/motion";

export default function Education() {
  return (
    <section id="education" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading index="07" title="Education" />

        <div className="space-y-5">
          {education.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="group p-6 border border-border rounded-xl bg-background/60 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-shadow">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-accent mt-1 text-sm">{edu.institution}</p>
                    </div>
                    {edu.cgpa && (
                      <div className="px-4 py-2 bg-accent/10 border border-accent/25 rounded-lg flex-shrink-0">
                        <span className="text-accent font-semibold text-sm">{edu.cgpa}<span className="text-muted-foreground">/10</span></span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-muted-foreground">
                    <span className="mono-label text-[11px]">{edu.duration}</span>
                    <span>{edu.specialization}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

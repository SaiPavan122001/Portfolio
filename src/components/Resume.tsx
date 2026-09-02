"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { blurReveal, viewportOnce } from "@/lib/motion";

export default function Resume() {
  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(59,130,246,0.06),transparent_70%)]" aria-hidden="true" />
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={0}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Want the complete story?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Full resume with detailed experience, projects, and certifications — one click away.
          </p>
        </motion.div>

        <motion.div variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={1}
          className="flex flex-wrap justify-center gap-4">
          <Magnetic>
            <a href="/resume.pdf" target="_blank" data-cursor="read"
              className="px-8 py-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center gap-2.5 shadow-[0_0_28px_rgba(59,130,246,0.3)]">
              <FileText size={19} /> View Resume
            </a>
          </Magnetic>
          <Magnetic>
            <a href="/resume.pdf" download data-cursor="read"
              className="px-8 py-4 border border-border rounded-lg font-medium text-foreground hover:border-accent/60 hover:bg-accent/5 transition-colors flex items-center gap-2.5">
              <Download size={19} /> Download Resume
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

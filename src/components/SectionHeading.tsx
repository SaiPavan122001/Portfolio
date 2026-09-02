"use client";

import { motion } from "framer-motion";
import { blurReveal, viewportOnce } from "@/lib/motion";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 lg:mb-20">
      <motion.div variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={0}
        className="flex items-center gap-4 mb-4">
        <span className="mono-label text-accent">{index}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="mono-label text-muted-foreground">SECTION</span>
      </motion.div>
      <motion.h2 variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={1}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={2}
          className="text-muted-foreground mt-4 max-w-2xl">
          {description}
        </motion.p>
      )}
    </div>
  );
}

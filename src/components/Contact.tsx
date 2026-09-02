"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile, socialLinks } from "@/data/portfolio";
import Magnetic from "@/components/Magnetic";
import KineticText from "@/components/KineticText";
import SectionHeading from "@/components/SectionHeading";
import { blurReveal, viewportOnce, EASE } from "@/lib/motion";

export default function Contact() {
  const channels = [
    { href: `mailto:${profile.email}`, icon: Mail, label: profile.email },
    { href: socialLinks.github, icon: Github, label: "GitHub", external: true },
    { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn", external: true },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading index="09" title="Contact" />

        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <KineticText text="Let's Build Something" />
            <span className="block text-accent text-glow"><KineticText text="Intelligent." delay={0.4} /></span>
          </h2>
          <motion.p variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={2}
            className="text-muted-foreground mb-12 max-w-lg mx-auto">
            Open to discussing new systems, hard problems, and opportunities where AI meets real engineering.
          </motion.p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12">
            {channels.map((channel, i) => (
              <motion.div key={channel.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}>
                <Magnetic strength={0.2}>
                  <a href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}
                    className="px-6 py-3.5 border border-border rounded-lg hover:border-accent/60 hover:bg-accent/5 transition-all flex items-center gap-3 group">
                    <channel.icon size={18} className="text-accent" />
                    <span className="text-sm">{channel.label}</span>
                    {channel.external && <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
                  </a>
                </Magnetic>
              </motion.div>
            ))}
          </div>

          <motion.p variants={blurReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} custom={3}
            className="mono-label text-muted-foreground">
            ▸ RESPONSE TIME: FAST
          </motion.p>
        </div>
      </div>
    </section>
  );
}

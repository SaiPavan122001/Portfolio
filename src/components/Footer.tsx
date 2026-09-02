"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

/** Footer revealed from behind the page as the final "closing shot". */
export default function Footer() {
  const reduced = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bottom-0 left-0 right-0 border-t border-border bg-[#070707] ${reduced ? "relative" : "fixed z-0"}`}>
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-semibold flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" aria-hidden="true" />
              {profile.name}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{profile.title} — Andhra Pradesh, India</p>
          </div>

          <div className="flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="p-2 text-muted-foreground hover:text-accent hover:-translate-y-0.5 transition-all"><Github size={19} /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="p-2 text-muted-foreground hover:text-accent hover:-translate-y-0.5 transition-all"><Linkedin size={19} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"
              className="p-2 text-muted-foreground hover:text-accent hover:-translate-y-0.5 transition-all"><Mail size={19} /></a>
          </div>

          <div className="mono-label text-muted-foreground/70 text-[10px]">
            © {currentYear} — END OF REEL
          </div>
        </div>
      </div>
    </footer>
  );
}

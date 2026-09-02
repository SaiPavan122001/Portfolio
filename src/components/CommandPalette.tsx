"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, FolderGit2, Cpu, Briefcase, GraduationCap, Mail, Github, Linkedin, X } from "lucide-react";
import { scrollToTarget } from "@/components/SmoothScroll";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: typeof Search;
  action: string;
  external?: boolean;
}

const COMMANDS: Command[] = [
  { id: "exp", label: "Experience", hint: "Timeline 2022 → Now", icon: Briefcase, action: "#experience" },
  { id: "feat", label: "AI Operations Copilot", hint: "Featured system", icon: Cpu, action: "#featured" },
  { id: "proj", label: "Projects", hint: "Case studies", icon: FolderGit2, action: "#projects" },
  { id: "edu", label: "Education", hint: "KLEF · B.Tech ECE", icon: GraduationCap, action: "#education" },
  { id: "resume", label: "Resume", hint: "View / download PDF", icon: FileText, action: "/resume.pdf", external: true },
  { id: "contact", label: "Contact", hint: "Get in touch", icon: Mail, action: "#contact" },
  { id: "gh", label: "GitHub", hint: "@SaiPavan122001", icon: Github, action: "https://github.com/SaiPavan122001", external: true },
  { id: "li", label: "LinkedIn", hint: "Profile", icon: Linkedin, action: "https://www.linkedin.com/in/adusumalli-sai-pavan-111836208", external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.hint.toLowerCase().includes(query.toLowerCase()));

  const close = useCallback(() => { setOpen(false); setQuery(""); setActiveIdx(0); }, []);

  const run = useCallback((cmd: Command) => {
    close();
    if (cmd.external) {
      window.open(cmd.action, "_blank", "noopener");
    } else {
      // Delay slightly so the palette exit animation doesn't jank the scroll
      setTimeout(() => scrollToTarget(cmd.action), 120);
    }
  }, [close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(results.length - 1, i + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(0, i - 1)); }
    if (e.key === "Enter" && results[activeIdx]) { e.preventDefault(); run(results[activeIdx]); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={close} role="dialog" aria-modal="true" aria-label="Command palette">
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Search size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                onKeyDown={onKeyDown}
                placeholder="Navigate the portfolio..."
                aria-label="Search commands"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
              />
              <button onClick={close} aria-label="Close palette" className="p-1 rounded hover:bg-border transition-colors">
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">No matching commands</p>
              )}
              {results.map((cmd, i) => (
                <button
                  key={cmd.id}
                  role="option"
                  aria-selected={i === activeIdx}
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${i === activeIdx ? "bg-accent/10 text-foreground" : "text-muted-foreground hover:bg-border/40"}`}
                >
                  <cmd.icon size={15} className={i === activeIdx ? "text-accent" : ""} />
                  <span className="text-sm font-medium flex-1">{cmd.label}</span>
                  <span className="text-[11px] text-muted-foreground/70">{cmd.hint}</span>
                </button>
              ))}
            </div>

            <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[10px] mono-label text-muted-foreground/70">
              <span>↑↓ NAVIGATE</span><span>↵ SELECT</span><span>ESC CLOSE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

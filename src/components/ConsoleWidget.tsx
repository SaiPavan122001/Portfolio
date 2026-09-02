"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TerminalSquare } from "lucide-react";

const SUBSYSTEMS = [
  { label: "AI SYSTEMS", status: "ONLINE" },
  { label: "RAG", status: "ONLINE" },
  { label: "MULTI-AGENTS", status: "ONLINE" },
  { label: "MCP", status: "ONLINE" },
  { label: "FULL STACK", status: "ONLINE" },
  { label: "CLOUD", status: "ONLINE" },
];

const STACK = ["Python", "Java", "React", "FastAPI", "Spring Boot", "AWS"];

/** Floating "SYSTEM ONLINE" pill → Engineering Console Easter egg. */
export default function ConsoleWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        onClick={() => setOpen(true)}
        aria-label="Open engineering console"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full border border-accent/40 bg-background/85 backdrop-blur-md shadow-[0_0_24px_rgba(59,130,246,0.18)] hover:border-accent/70 transition-all"
      >
        <motion.span
          animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]"
          aria-hidden="true"
        />
        <span className="mono-label text-[10px] text-foreground/90">SYSTEM ONLINE</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-start sm:justify-center p-4 sm:p-6"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Engineering console"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border border-border bg-[#0c0e12] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/60">
                <span className="flex items-center gap-2 mono-label text-accent">
                  <TerminalSquare size={14} /> ENGINEERING CONSOLE
                </span>
                <button onClick={() => setOpen(false)} aria-label="Close console" className="p-1.5 rounded hover:bg-border transition-colors">
                  <X size={14} />
                </button>
              </div>

              <div className="p-5 font-mono text-xs space-y-1.5">
                {SUBSYSTEMS.map((sys, i) => (
                  <motion.div key={sys.label}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center justify-between">
                    <span className="text-muted-foreground">{sys.label}</span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.07 }}
                      className="text-green-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" aria-hidden="true" />
                      {sys.status}
                    </motion.span>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="pt-4 mt-2 border-t border-border">
                  <p className="mono-label text-muted-foreground mb-2.5">STACK</p>
                  <div className="flex flex-wrap gap-1.5">
                    {STACK.map((tech, i) => (
                      <motion.span key={tech}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.05 }}
                        className="px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/25 text-[11px]">
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                  className="pt-4 text-[11px] text-muted-foreground/60">
                  ▸ ALL SUBSYSTEMS OPERATIONAL — BUILT BY SAI PAVAN
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

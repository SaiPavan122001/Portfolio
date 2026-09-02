"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, experience } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import { useInView } from "@/hooks/useInView";

interface Line { cmd: string; output: string[]; }

const SCRIPT: Line[] = [
  { cmd: "whoami", output: [profile.name, `${profile.title} — ${profile.location}`] },
  {
    cmd: "expertise",
    output: ["> Agentic AI · RAG · Multi-Agent Systems · MCP", "> Full Stack · Python · Java · React", "> Cloud & DevOps · AWS · Docker · Kubernetes"],
  },
  { cmd: "experience", output: experience.map((e) => `> ${e.company} — ${e.position} (${e.duration})`) },
  { cmd: "status", output: ["> OPEN TO NEXT SYSTEM", "> READY TO BUILD"] },
];

export default function Terminal() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [done, setDone] = useState(false);
  const started = reduced || inView;
  const handleDone = useCallback(() => setDone(true), []);

  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading index="06" title="Engineering Console" />

        <motion.div ref={ref}
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-xl border border-border bg-[#0c0e12] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" aria-hidden="true" />
            <span className="mono-label text-muted-foreground ml-3">saipavan@systems: ~</span>
          </div>

          <div className="p-5 sm:p-6 font-mono text-[13px] leading-6 min-h-[300px]">
            {started ? <TerminalBody reduced={!!reduced} onDone={handleDone} /> : null}
            {done && <span className="caret" aria-hidden="true" />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TerminalBody({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"cmd" | "out">("cmd");

  useEffect(() => {
    if (reduced) { onDone(); return; }
    if (lineIdx >= SCRIPT.length) { onDone(); return; }

    const current = SCRIPT[lineIdx];
    if (phase === "cmd") {
      if (charIdx < current.cmd.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 45 + Math.random() * 55);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { setPhase("out"); setCharIdx(0); }, 350);
      return () => clearTimeout(t);
    }
    // output phase: reveal lines progressively
    if (charIdx < current.output.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 220);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLineIdx((l) => l + 1); setPhase("cmd"); setCharIdx(0); }, 500);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, phase, reduced, onDone]);

  // Reduced motion: print everything at once
  if (reduced) {
    return (
      <div aria-label="Terminal transcript">
        {SCRIPT.map((line) => (
          <div key={line.cmd} className="mb-4">
            <p>
              <span className="text-accent">saipavan@systems</span>
              <span className="text-muted-foreground">:~$ </span>
              {line.cmd}
            </p>
            {line.output.map((o, i) => <p key={i} className="text-muted-foreground">{o}</p>)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div aria-label="Terminal transcript" aria-live="polite">
      {SCRIPT.slice(0, lineIdx + 1).map((line, li) => {
        const isCurrent = li === lineIdx;
        return (
          <div key={line.cmd} className="mb-4">
            <p>
              <span className="text-accent">saipavan@systems</span>
              <span className="text-muted-foreground">:~$ </span>
              {isCurrent && phase === "cmd" ? (
                <> {line.cmd.slice(0, charIdx)}<span className="caret" aria-hidden="true" /></>
              ) : (
                line.cmd
              )}
            </p>
            {(!isCurrent || phase === "out") && (
              <div>
                {line.output.slice(0, isCurrent ? charIdx : line.output.length).map((o, oi) => (
                  <p key={oi} className="text-muted-foreground">{o}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

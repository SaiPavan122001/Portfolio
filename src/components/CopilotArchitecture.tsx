"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { AlertTriangle, User, LayoutDashboard, Server, Workflow, GitBranch, Bot, Database, Brain, FileSearch } from "lucide-react";
import { EASE } from "@/lib/motion";

export interface Stage {
  id: string;
  label: string;
  sub?: string;
  desc: string;
  icon?: typeof User;
}

export const STAGES: Stage[] = [
  { id: "incident", label: "PRODUCTION INCIDENT", sub: "DETECTED", desc: "A failure event appears across production telemetry.", icon: AlertTriangle },
  { id: "user", label: "USER", desc: "An operations engineer asks a natural language question.", icon: User },
  { id: "react", label: "REACT DASHBOARD", desc: "Interactive dashboard for querying live production metrics in natural language.", icon: LayoutDashboard },
  { id: "fastapi", label: "FASTAPI", desc: "Python backend API handling requests and orchestration.", icon: Server },
  { id: "langgraph", label: "LANGGRAPH", desc: "Multi-agent workflow orchestration engine.", icon: Workflow },
  { id: "router", label: "AGENT ROUTER", desc: "Routes the query to specialized diagnostic agents.", icon: GitBranch },
  { id: "agents", label: "SPECIALIZED AGENTS", sub: "INCIDENT · LOG · DEPLOYMENT · RCA", desc: "Specialized agents evaluate telemetry logs and isolate operational faults.", icon: Bot },
  { id: "rag", label: "RAG / QDRANT", desc: "Hybrid vector retrieval over enterprise knowledge repositories.", icon: Database },
  { id: "llm", label: "LLM", desc: "LLM reasoning over the retrieved context.", icon: Brain },
  { id: "rca", label: "ROOT CAUSE ANALYSIS", desc: "Automated diagnosis delivered to the operator.", icon: FileSearch },
];

/** Scroll-driven architecture animation for the Enterprise AI Operations Copilot. */
export default function CopilotArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<Stage | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.7", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const stageF = useTransform(smooth, [0.05, 0.95], [0, STAGES.length - 1]);
  const flowOpacity = useTransform(smooth, [0.1, 0.4], [0, 1]);

  useMotionValueEvent(stageF, "change", (v) => {
    const next = Math.min(STAGES.length - 1, Math.max(0, Math.floor(v + 0.001)));
    setActiveStage((prev) => (prev === next ? prev : next));
  });

  const isActive = (i: number) => i <= activeStage;

  return (
    <div ref={containerRef} className="relative">
      {/* Alert banner */}
      <motion.div
        initial={{ opacity: 0, y: -14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-10 flex items-center gap-3 px-4 py-3 rounded-lg border border-red-500/40 bg-red-500/5">
        <motion.span animate={reduced ? {} : { opacity: [1, 0.35, 1] }} transition={{ duration: 1.4, repeat: Infinity }} aria-hidden="true">
          <AlertTriangle size={16} className="text-red-400" />
        </motion.span>
        <span className="mono-label text-red-400">Production incident detected — telemetry anomaly across services</span>
        <motion.span animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="ml-auto text-[10px] mono-label text-red-400/70" aria-hidden="true">LIVE</motion.span>
      </motion.div>

      {/* Architecture chain */}
      <div className="relative max-w-md mx-auto lg:mx-0">
        <div className="absolute left-[27px] top-6 bottom-6 w-px bg-border" aria-hidden="true" />
        <motion.div style={{ scaleY: smooth, opacity: flowOpacity }} aria-hidden="true"
          className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-accent via-accent to-accent/20 origin-top shadow-[0_0_10px_rgba(59,130,246,0.7)]" />

        <ul className="space-y-4">
          {STAGES.map((stage, i) => (
            <StageRow key={stage.id} stage={stage} index={i} isActive={isActive}
              selectedId={selected?.id}
              onSelect={() => setSelected(selected?.id === stage.id ? null : stage)} />
          ))}
        </ul>

        {/* Explanation panel */}
        <div className="mt-6 min-h-[76px] px-5 py-4 rounded-lg border border-border bg-background/70" role="status" aria-live="polite">
          <StageDesc stage={selected ?? STAGES[activeStage]} />
        </div>
      </div>

    </div>
  );
}

function StageRow({ stage, index, isActive, selectedId, onSelect }: {
  stage: Stage; index: number; isActive: (i: number) => boolean; selectedId?: string; onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isActive(index);
  const Icon = stage.icon!;
  const isIncident = stage.id === "incident";

  return (
    <li className="relative">
      {index > 0 && (
        <motion.span initial={false} animate={{ opacity: active ? 1 : 0.25 }}
          className="absolute -top-4 left-[23px] w-px h-4 bg-accent/60" aria-hidden="true" />
      )}
      <button
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={selectedId === stage.id}
        className={`w-full flex items-center gap-4 text-left group ${isIncident ? "pointer-events-none" : ""}`}
      >
        <motion.span
          animate={{
            borderColor: isIncident ? "rgba(239,68,68,0.5)" : active ? "rgb(59,130,246)" : "rgb(38,38,38)",
            backgroundColor: isIncident ? "rgba(239,68,68,0.08)" : active ? "rgba(59,130,246,0.12)" : "rgba(10,10,10,0.6)",
            scale: hovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative z-10 w-14 h-14 flex-shrink-0 rounded-lg border flex items-center justify-center"
        >
          <Icon size={20} className={isIncident ? "text-red-400" : active ? "text-accent" : "text-muted-foreground"} />
        </motion.span>

        <motion.div animate={{ opacity: active ? 1 : 0.4, x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }} className="flex-1 min-w-0">
          <p className={`text-sm font-semibold tracking-wide ${isIncident ? "text-red-400" : active ? "text-foreground" : "text-muted-foreground"}`}>
            {stage.label}
            {stage.sub && <span className="block text-[10px] mono-label text-accent/80 mt-0.5">{stage.sub}</span>}
          </p>
        </motion.div>

        {active && !isIncident && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] text-accent" aria-hidden="true">●</motion.span>
        )}
      </button>
    </li>
  );
}

function StageDesc({ stage }: { stage: Stage }) {
  return (
    <motion.div key={stage.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <p className="mono-label text-accent mb-1">{stage.label}</p>
      <p className="text-sm text-muted-foreground">{stage.desc}</p>
    </motion.div>
  );
}


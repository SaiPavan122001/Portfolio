"use client";

import { useEffect, useRef } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useDevice";

interface Node { x: number; y: number; vx: number; vy: number; label: string; r: number; phase: number; }

const NODES: { label: string; angle: number }[] = [
  { label: "AGENTIC AI", angle: -90 }, { label: "RAG", angle: -40 },
  { label: "MULTI-AGENT", angle: 10 }, { label: "MCP", angle: 55 },
  { label: "LLMS", angle: 105 }, { label: "REACT", angle: 150 },
  { label: "PYTHON", angle: -140 }, { label: "JAVA", angle: -175 },
  { label: "FASTAPI", angle: 160 }, { label: "SPRING BOOT", angle: 35 },
  { label: "CLOUD", angle: 80 }, { label: "DEVOPS", angle: -115 },
];

/**
 * Interactive engineering network canvas.
 * DPR capped, rAF rendering, pauses off-screen, static when reduced motion.
 */
export default function AINetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0; let running = false; let width = 0; let height = 0;
    let nodes: Node[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = width / 2, cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      nodes = NODES.map((n, i) => {
        const r = radius * (0.92 + (i % 3) * 0.05);
        const rad = (n.angle * Math.PI) / 180;
        return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r, vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14, label: n.label, r: 5, phase: Math.random() * Math.PI * 2 };
      });
      nodes.push({ x: cx, y: cy, vx: 0, vy: 0, label: "SAI PAVAN", r: 8, phase: 0 });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2;
      const hub = nodes[nodes.length - 1];
      const m = mouseRef.current;

      if (!reduced) {
        for (let i = 0; i < nodes.length - 1; i++) {
          const n = nodes[i];
          n.x += n.vx; n.y += n.vy;
          const dx = n.x - cx, dy = n.y - cy;
          const dist = Math.hypot(dx, dy);
          const max = Math.min(width, height) * 0.42;
          if (dist > max || dist < max * 0.7) { n.vx *= -1; n.vy *= -1; }
        }
      }

      for (let i = 0; i < nodes.length - 1; i++) {
        const n = nodes[i];
        const prox = Math.max(0, 1 - Math.hypot(n.x - m.x, n.y - m.y) / 140);
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y); ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 + prox * 0.35})`;
        ctx.lineWidth = 1 + prox * 0.8;
        ctx.stroke();
      }
      for (let i = 0; i < nodes.length - 1; i += 3) {
        const a = nodes[i];
        const b = nodes[(i + 4) % (nodes.length - 1)];
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"; ctx.lineWidth = 1; ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const prox = Math.max(0, 1 - Math.hypot(n.x - m.x, n.y - m.y) / 140);
        const pulse = reduced ? 1 : 1 + Math.sin(t / 900 + n.phase) * 0.12;
        const rr = n.r * pulse * (1 + prox * 0.5);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rr * 3.2);
        grad.addColorStop(0, `rgba(59, 130, 246, ${0.35 + prox * 0.4})`);
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.beginPath(); ctx.arc(n.x, n.y, rr * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = i === nodes.length - 1 ? "#3b82f6" : prox > 0.35 ? "#93c5fd" : "#60a5fa";
        ctx.fill();
        ctx.font = `${i === nodes.length - 1 ? "600 10px" : "9px"} ui-monospace, Menlo, monospace`;
        ctx.fillStyle = `rgba(250, 250, 250, ${0.45 + prox * 0.55})`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + rr + 14);
      }

      if (!reduced) {
        const count = isTouch ? 4 : 8;
        for (let i = 0; i < count; i++) {
          const ang = (t / 3200) * (i % 2 === 0 ? 1 : -1) + (i * Math.PI * 2) / count;
          const orb = Math.min(width, height) * 0.22;
          const px = cx + Math.cos(ang) * orb;
          const py = cy + Math.sin(ang) * orb * 0.85;
          ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(147, 197, 253, 0.7)"; ctx.fill();
        }
      }
    };

    const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop); };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    build();
    if (reduced) { draw(0); return () => stop(); }

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(canvas);
    const parent = canvas.parentElement!;
    const onMouse = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    parent.addEventListener("mousemove", onMouse, { passive: true });
    parent.addEventListener("mouseleave", onLeave);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { build(); }, 150); };
    window.addEventListener("resize", onResize);

    return () => { stop(); io.disconnect(); parent.removeEventListener("mousemove", onMouse); parent.removeEventListener("mouseleave", onLeave); window.removeEventListener("resize", onResize); };
  }, [isTouch, reduced]);

  return (
    <div className="relative w-full h-full" aria-label="Interactive network of engineering capabilities">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}

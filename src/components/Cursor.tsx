"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useDevice";

type CursorState = "default" | "hover" | "label";
const LABELS = ["view", "open", "read"];

export default function Cursor() {
  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  const active = !isTouch && !reducedMotion;

  useEffect(() => {
    if (!active) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, [data-cursor]");
      if (interactive) {
        const dataLabel = (interactive as HTMLElement).dataset.cursor;
        if (dataLabel && LABELS.includes(dataLabel)) {
          setState("label");
          setLabel(dataLabel);
        } else {
          setState("hover");
          setLabel("");
        }
      } else {
        setState("default");
        setLabel("");
      }
    };

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      setEnabled(false);
    };
  }, [active]);

  if (!active || !enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`cursor-ring ${state === "hover" ? "cursor-hover" : ""} ${state === "label" ? "cursor-label" : ""}`}
      >
        {state === "label" ? <span>{label}</span> : null}
      </div>
    </>
  );
}

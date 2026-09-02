"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useDevice";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Subtle magnetic attraction toward the cursor. Desktop only. */
export default function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

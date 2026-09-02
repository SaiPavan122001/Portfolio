"use client";

import { ReactNode } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Wraps content and applies a subtle skew based on scroll velocity.
 * The "alive" feel — capped so it stays classy.
 */
export default function VelocitySkew({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 50 });
  const skew = useTransform(smoothVelocity, [-2200, 0, 2200], [-2.2, 0, 2.2], { clamp: true });

  if (reduced) return <>{children}</>;

  return <motion.div style={{ skewY: skew }}>{children}</motion.div>;
}

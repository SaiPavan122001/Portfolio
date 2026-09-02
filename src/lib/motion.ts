"use client";

import type { Variants } from "framer-motion";

/**
 * Central motion language for the portfolio.
 * All animations are transform/opacity based (GPU friendly).
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: i * 0.08 },
  }),
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.1 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Character stagger for kinetic typography */
export const charStagger: Variants = {
  hidden: {},
  visible: (i: number = 0) => ({
    transition: { staggerChildren: 0.025, delayChildren: i * 0.1 },
  }),
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, ease: "easeInOut", delay: i * 0.3 }, opacity: { duration: 0.01, delay: i * 0.3 } },
  }),
};

export const viewportOnce = { once: true, margin: "-80px" } as const;

"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, revealViewport, withDelay } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  variants?: Variants;
  /** Extra transition delay in seconds, for manually staggering siblings. */
  delay?: number;
  className?: string;
};

/** Generic scroll-reveal wrapper: fades/slides an element in once it enters
 * the viewport, then never re-animates it (viewport.once). Reduced-motion
 * users are handled globally by <MotionConfig reducedMotion="user"> in the
 * root layout, which turns the transform/opacity animation into an
 * effectively instant one. */
export default function Reveal({ children, variants = fadeUp, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={delay ? withDelay(variants, delay) : variants}
    >
      {children}
    </motion.div>
  );
}

import type { Variants } from "framer-motion";

/** Default viewport config for scroll-triggered reveals: animate once, a bit
 * before the element is fully in view so the motion reads as anticipatory
 * rather than laggy. */
export const revealViewport = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Larger-throw variants for a whole row/block sliding in from off-canvas —
 * distinct from slideInLeft/slideInRight's small 32px nudge. The offset is
 * a percentage of the element's own width, so it always starts fully
 * off-screen to that side regardless of viewport size, then settles at 0
 * and stays there (paired with revealViewport's `once: true`, it plays
 * exactly once and never loops). */
export const rowSlideInRight: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export const rowSlideInLeft: Variants = {
  hidden: { opacity: 0, x: "-100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Wraps a group of children with a staggered reveal of their siblings. */
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Clones a variants object, injecting an extra transition delay into its
 * "visible" state. Used to hand-stagger items rendered outside a
 * staggerContainer (e.g. grid cards revealed via IntersectionObserver at
 * slightly different times). Only supports our object-based variants above,
 * not function variants. */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (visible && typeof visible === "object") {
    return {
      ...variants,
      visible: {
        ...visible,
        transition: { ...(visible as Record<string, unknown>).transition as object, delay },
      },
    };
  }
  return variants;
}

/** Per-index delay step for manually staggered lists. */
export const staggerDelay = (index: number, step = 0.1, base = 0) => base + index * step;

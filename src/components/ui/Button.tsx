"use client";

import Link, { type LinkProps } from "next/link";
import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-bg)] hover:bg-[var(--color-accent-ink)]",
  secondary:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)]/60 hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]",
  ghost:
    "bg-transparent text-[var(--color-ink)] px-0 hover:text-[var(--color-accent-ink)]",
  /** For use on top of a dark/photo background (e.g. the closing CTA band). */
  light: "bg-white text-[var(--color-ink)] hover:bg-white/85",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm min-h-[42px] font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

function classesFor(variant: ButtonVariant, className: string) {
  const ghostPad = variant === "ghost" ? "rounded-none px-0" : "";
  return `${baseClasses} ${variantClasses[variant]} ${ghostPad} ${className}`.trim();
}

type ConflictingHandlers =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> & {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/** A real <button>, for in-page actions (form submit, menu toggle, etc). */
export function Button({ children, variant = "primary", className = "", ...rest }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classesFor(variant, className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

type LinkButtonProps = Omit<LinkProps, "className"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    children: ReactNode;
    variant?: ButtonVariant;
    className?: string;
  };

/** A styled next/link, for navigation CTAs. Hover/tap scale lives on a
 * wrapping motion.div so the focus ring stays on the real, focusable <a>. */
export function LinkButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: LinkButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link className={classesFor(variant, className)} {...rest}>
        {children}
      </Link>
    </motion.div>
  );
}

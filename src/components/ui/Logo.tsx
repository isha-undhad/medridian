import type { ReactNode } from "react";

type LogoProps = {
  variant?: "mark" | "full";
  className?: string;
};

/** Circular monogram badge — a thin bordered circle with a centered serif
 * capital "M". Exported (not just used internally by `Logo`) so Footer.tsx
 * can render its own standalone floating badge from this same shape/style
 * instead of duplicating the markup — the one thing Footer.tsx still adds
 * itself is a solid background fill (`bg-[var(--color-bg)]`, via the
 * `className` prop), since its badge needs to visually interrupt the
 * border line running behind it, which this component doesn't assume.
 *
 * Border and text color use `currentColor` (not fixed --color-line/
 * --color-ink tokens) so it can adapt to context: the navbar toggles
 * between a white treatment over the transparent hero and a dark one once
 * solid, and a fixed light border would disappear in the white state.
 * Size/text-size are passed in via `className` so each caller scales it to
 * its own context while sharing this exact style. */
export function MonogramBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-full border border-current ${className}`}>
      <span className="font-serif leading-none">M</span>
    </span>
  );
}

/** The "MERIDIAN" wordmark's typography — font-serif + tracking-wide, same
 * as Footer.tsx's Brand-column wordmark. Takes `children` rather than
 * hardcoding the text so Footer.tsx can keep driving it from `brand.short`
 * (the data/nav.ts source of truth) while still sharing this styling. */
export function LogoWordmark({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-serif tracking-wide ${className}`}>{children}</span>;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark") {
    return <MonogramBadge className={`h-10 w-10 text-base ${className}`} />;
  }

  // No monogram badge in the "full" variant — wordmark only. Sized down
  // (text-lg) from the footer's text-2xl to fit the navbar's compact
  // height; same font/tracking either way. `className` (color, hover,
  // transition) lands directly on this span since there's no wrapper to
  // put it on anymore.
  return <LogoWordmark className={`text-lg ${className}`}>MERIDIAN</LogoWordmark>;
}

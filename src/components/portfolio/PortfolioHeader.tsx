"use client";

import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { portfolioCategories } from "@/data/portfolio";

export type PortfolioHeaderProps = {
  label?: string;
  heading?: string;
  /** Filter tab labels, in display order. Defaults to every category in the
   * portfolio data set. */
  categories?: readonly string[];
  /** Controlled — the parent owns which category is active so it can filter
   * the grid alongside these tabs. */
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

/**
 * Centered portfolio page header: small eyebrow label, a big serif title
 * (the page's one <h1> — nothing above this on the Portfolio page currently
 * has one), and a row of category filter tabs underneath. Purely
 * presentational/controlled — the active tab and the click handler are
 * owned by whichever parent also filters the grid (see PortfolioBrowser).
 */
export default function PortfolioHeader({
  label = "Signature Work",
  heading = "The Portfolio",
  categories = portfolioCategories,
  activeCategory,
  onCategoryChange,
}: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <Reveal variants={fadeUp} className="flex flex-col items-center gap-5">
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-muted)] uppercase">
          {label}
        </span>
        <h1 className="font-serif text-4xl tracking-tight text-[var(--color-ink)] uppercase sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
      </Reveal>

      {/* Horizontal scroll (not wrap) on narrow screens — with only a
          handful of tabs, a scrollable single row keeps the centered look
          intact instead of the tabs re-centering awkwardly across two
          wrapped lines. */}
      <Reveal
        variants={fadeUp}
        delay={0.1}
        className="mt-1 flex flex-wrap justify-center gap-4 sm:gap-10 overflow-hidden"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              suppressHydrationWarning
              className={`shrink-0 border-b-2 pb-1.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 sm:text-sm ${
                isActive
                  ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </Reveal>
    </div>
  );
}

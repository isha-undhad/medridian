"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

/** Fisher-Yates — unbiased in-place shuffle, returns a new array. */
function shuffleItems(items: PortfolioItem[]): PortfolioItem[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type Shape = "square" | "portrait" | "landscape";

/** Real photos are essentially never pixel-perfect square, so orientation is
 * just width vs height; "square" grid slots want a portrait photo (a
 * portrait frame crops into a square far more naturally than a landscape one). */
function orientationOf(item: PortfolioItem): "portrait" | "landscape" {
  return item.width > item.height ? "landscape" : "portrait";
}

/** Reorders `items` so the item at each position matches `shapes[position % shapes.length]`
 * — a "square" or "portrait" slot draws from the portrait pool, a "landscape" slot from the
 * landscape pool. If one pool runs dry the other fills in, so every photo still gets placed
 * and the layout never breaks even when the portrait/landscape split is uneven. */
function orderByShape(items: PortfolioItem[], shapes: Shape[]): PortfolioItem[] {
  const portraits = items.filter((item) => orientationOf(item) === "portrait");
  const landscapes = items.filter((item) => orientationOf(item) === "landscape");
  let pIdx = 0;
  let lIdx = 0;
  const result: PortfolioItem[] = [];

  for (let i = 0; i < items.length; i++) {
    const wantsLandscape = shapes[i % shapes.length] === "landscape";
    if (wantsLandscape && lIdx < landscapes.length) {
      result.push(landscapes[lIdx++]);
    } else if (!wantsLandscape && pIdx < portraits.length) {
      result.push(portraits[pIdx++]);
    } else if (pIdx < portraits.length) {
      result.push(portraits[pIdx++]);
    } else {
      result.push(landscapes[lIdx++]);
    }
  }

  return result;
}

const DESKTOP_SLOT_SHAPES: Shape[] = ["square", "square", "portrait", "square", "landscape", "portrait"];
const MOBILE_PATTERN_A_SHAPES: Shape[] = ["square", "square", "portrait", "landscape"];
const MOBILE_PATTERN_B_SHAPES: Shape[] = ["portrait", "square", "square", "landscape"];

/** Builds the per-index shape schedule mobile renders (patterns A/B alternate
 * every 4 items). Any items past the last full chunk of 4 are trimmed before
 * rendering (see `mobileCount` below), so the schedule only needs to cover
 * complete chunks. */
function mobileShapeSchedule(total: number): Shape[] {
  const schedule: Shape[] = [];
  for (let i = 0; i < total; i += 4) {
    const pattern = (i / 4) % 2 === 1 ? MOBILE_PATTERN_B_SHAPES : MOBILE_PATTERN_A_SHAPES;
    schedule.push(...pattern.slice(0, Math.min(4, total - i)));
  }
  return schedule;
}

type PortfolioGridProps = {
  /** Defaults to the full portfolio data set; pass a custom array to reuse
   * this grid for a different collection (e.g. a filtered category view). */
  items?: PortfolioItem[];
  /** Show only the first N items (used on the home page preview). */
  limit?: number;
  layout?: string;
};

type MosaicSlot = {
  gridClass: string;
  sizes: string;
};

// ============================================================================
// DESKTOP: 3-column x 3-row mosaic matching desktop specification (UNTOUCHED)
// ============================================================================
const DESKTOP_SLOTS: MosaicSlot[] = [
  // 0: Column 1, Row 1 — square-ish cell
  {
    gridClass: "md:col-start-1 md:row-start-1 md:row-span-1 md:col-span-1",
    sizes: "(min-width: 1280px) 420px, 33vw",
  },
  // 1: Column 1, Row 2 — square-ish cell directly below it
  {
    gridClass: "md:col-start-1 md:row-start-2 md:row-span-1 md:col-span-1",
    sizes: "(min-width: 1280px) 420px, 33vw",
  },
  // 2: Column 2, Rows 1–2 — one tall cell spanning rows 1–2
  {
    gridClass: "md:col-start-2 md:row-start-1 md:row-span-2 md:col-span-1",
    sizes: "(min-width: 1280px) 420px, 33vw",
  },
  // 3: Column 3, Row 1 — short cell
  {
    gridClass: "md:col-start-3 md:row-start-1 md:row-span-1 md:col-span-1",
    sizes: "(min-width: 1280px) 420px, 33vw",
  },
  // 4: Columns 1–2, Row 3 — one wide cell spanning columns 1–2
  {
    gridClass: "md:col-start-1 md:row-start-3 md:row-span-1 md:col-span-2",
    sizes: "(min-width: 1280px) 840px, 66vw",
  },
  // 5: Column 3, Rows 2–3 — tall cell spanning rows 2–3 continuing alongside the wide cell
  {
    gridClass: "md:col-start-3 md:row-start-2 md:row-span-2 md:col-span-1",
    sizes: "(min-width: 1280px) 420px, 33vw",
  },
];

// ============================================================================
// MOBILE: Alternating 4-cell blocks matching user's mobile diagram:
// - Pattern A: 2 stacked left (rows 1-2) + 1 tall right (rows 1-2) + 1 wide bottom (row 3)
// - Pattern B: 1 tall left (rows 1-2) + 2 stacked right (rows 1-2) + 1 wide bottom (row 3)
// ============================================================================
const MOBILE_PATTERN_A: string[] = [
  "col-start-1 row-start-1",
  "col-start-1 row-start-2",
  "col-start-2 row-start-1 row-span-2",
  "col-start-1 col-span-2 row-start-3",
];

const MOBILE_PATTERN_B: string[] = [
  "col-start-1 row-start-1 row-span-2",
  "col-start-2 row-start-1",
  "col-start-2 row-start-2",
  "col-start-1 col-span-2 row-start-3",
];

export default function PortfolioGrid({
  items = portfolioItems,
  limit,
}: PortfolioGridProps) {
  // Randomize grid order once per page load, client-side only. `shuffled`
  // starts as `null` so the very first render (both the server's and the
  // client's pre-hydration render) uses `items` in its original order —
  // identical output on both sides, so hydration never mismatches. Right
  // after mount, the effect below shuffles once and swaps it in; a plain
  // `useMemo(() => shuffle(items), [])` was deliberately avoided here since
  // that runs during render (including on the server), and the server and
  // client would each pick their own random order independently — exactly
  // the hydration mismatch this needs to avoid.
  const [shuffled, setShuffled] = useState<PortfolioItem[] | null>(null);

  useEffect(() => {
    setShuffled(shuffleItems(items));
    // `items` is a stable (useMemo'd) reference from PortfolioBrowser, so
    // this effect only re-runs if the actual item set changes — not on
    // every re-render — which is what makes this a once-per-load shuffle.
  }, [items]);

  const orderedItems = shuffled ?? items;
  const visible = typeof limit === "number" ? orderedItems.slice(0, limit) : orderedItems;

  // Re-order (independently per breakpoint, since their slot shapes and chunk
  // sizes differ) so the item landing in each grid cell matches that cell's
  // shape: portrait photos in portrait/square cells, landscape in landscape cells.
  const desktopOrdered = orderByShape(visible, DESKTOP_SLOT_SHAPES);
  const mobileOrdered = orderByShape(visible, mobileShapeSchedule(visible.length));

  // Each chunk's row/column template is a fixed-size mosaic (6 slots on
  // desktop, 4 on mobile) — a trailing chunk with fewer items than that would
  // reserve rows/columns nothing fills, showing up as blank space at the end
  // of the grid. Trimming to the nearest full chunk keeps every rendered row
  // completely filled, at every breakpoint, no matter how many photos there are.
  const desktopCount = Math.floor(desktopOrdered.length / 6) * 6;
  const mobileCount = Math.floor(mobileOrdered.length / 4) * 4;

  // Split into groups of 6 for desktop
  const desktopChunks: PortfolioItem[][] = [];
  for (let i = 0; i < desktopCount; i += 6) {
    desktopChunks.push(desktopOrdered.slice(i, i + 6));
  }

  // Split into groups of 4 for mobile alternating blocks
  const mobileChunks: PortfolioItem[][] = [];
  for (let i = 0; i < mobileCount; i += 4) {
    mobileChunks.push(mobileOrdered.slice(i, i + 4));
  }

  return (
    <>
      {/* ===================================================================
          MOBILE VIEW (< md): 2-Column Alternating Mosaic Matching Diagram
          - Images never stretch or cut (object-cover with top-center focal point)
          - Ultra-minimal 2px hairline spacing between cells and blocks
          =================================================================== */}
      <div className="block md:hidden space-y-[2px]">
        {mobileChunks.map((chunk, chunkIdx) => {
          const isPatternB = chunkIdx % 2 === 1;
          const pattern = isPatternB ? MOBILE_PATTERN_B : MOBILE_PATTERN_A;

          return (
            <div
              key={`mob-${chunkIdx}`}
              className="grid grid-cols-2 grid-rows-[140px_140px_160px] min-[360px]:grid-rows-[150px_150px_175px] min-[400px]:grid-rows-[165px_165px_195px] gap-[2px]"
            >
              {chunk.map((item, idx) => {
                const cellClass = pattern[idx] || "col-span-1";
                const isPriority = chunkIdx === 0 && idx < 2;

                return (
                  <Reveal
                    key={item.id}
                    variants={fadeUp}
                    delay={idx * 0.04}
                    className={`${cellClass} h-full w-full`}
                  >
                    <div className="relative block w-full h-full overflow-hidden rounded-none bg-[var(--color-line)]/20">
                      <Link
                        href={`/portfolio#${item.id}`}
                        className="block w-full h-full relative cursor-pointer outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/60"
                      >
                        <Image
                          src={item.image}
                          alt={item.title || "Wedding photograph"}
                          fill
                          priority={isPriority}
                          loading="eager"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                          style={{ objectPosition: item.mobileObjectPosition || item.objectPosition || "center" }}
                        />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ===================================================================
          DESKTOP VIEW (>= md): 3-Column Mosaic Matching Previous Desktop Grid
          =================================================================== */}
      <div className="hidden md:block space-y-[2px]">
        {desktopChunks.map((chunk, chunkIdx) => (
          <div
            key={`desk-${chunkIdx}`}
            className="grid md:grid-cols-3 md:[grid-template-columns:repeat(3,minmax(0,1fr))] md:grid-rows-[minmax(250px,1fr)_minmax(290px,1.15fr)_minmax(250px,1fr)] lg:grid-rows-[minmax(290px,1fr)_minmax(340px,1.15fr)_minmax(290px,1fr)] xl:grid-rows-[minmax(320px,1fr)_minmax(380px,1.15fr)_minmax(320px,1fr)] gap-[2px]"
          >
            {chunk.map((item, slotIdx) => {
              const slot = DESKTOP_SLOTS[slotIdx % DESKTOP_SLOTS.length];
              const isPriority = chunkIdx === 0 && slotIdx < 2;

              return (
                <Reveal
                  key={item.id}
                  variants={fadeUp}
                  delay={slotIdx * 0.05}
                  className={`${slot.gridClass} h-full w-full`}
                >
                  <div className="relative block w-full h-full overflow-hidden rounded-none bg-[var(--color-line)]/20">
                    <Link
                      href={`/portfolio#${item.id}`}
                      className="block w-full h-full relative cursor-pointer outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/60"
                    >
                      <Image
                        src={item.image}
                        alt={item.title || "Wedding photograph"}
                        fill
                        priority={isPriority}
                        loading="eager"
                        sizes={slot.sizes}
                        className="object-cover"
                        style={{ objectPosition: item.objectPosition || "center" }}
                      />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

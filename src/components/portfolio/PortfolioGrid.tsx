import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

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
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;

  // Split visible items into groups of 6 for desktop
  const desktopChunks: PortfolioItem[][] = [];
  for (let i = 0; i < visible.length; i += 6) {
    desktopChunks.push(visible.slice(i, i + 6));
  }

  // Split visible items into groups of 4 for mobile alternating blocks
  const mobileChunks: PortfolioItem[][] = [];
  for (let i = 0; i < visible.length; i += 4) {
    mobileChunks.push(visible.slice(i, i + 4));
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
                const isPriority = chunkIdx === 0 && idx < 3;

                return (
                  <Reveal
                    key={item.id}
                    variants={fadeUp}
                    delay={idx * 0.04}
                    className={`${cellClass} h-full w-full`}
                  >
                    <div className="group relative block w-full h-full overflow-hidden rounded-none bg-[var(--color-line)]/20">
                      <Link
                        href={`/portfolio#${item.id}`}
                        className="block w-full h-full relative cursor-pointer"
                      >
                        <Image
                          src={item.image}
                          alt={item.title || "Wedding photograph"}
                          fill
                          priority={isPriority}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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
              const isPriority = chunkIdx === 0 && slotIdx < 3;

              return (
                <Reveal
                  key={item.id}
                  variants={fadeUp}
                  delay={slotIdx * 0.05}
                  className={`${slot.gridClass} h-full w-full`}
                >
                  <div className="group relative block w-full h-full overflow-hidden rounded-none bg-[var(--color-line)]/20">
                    <Link
                      href={`/portfolio#${item.id}`}
                      className="block w-full h-full relative cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        alt={item.title || "Wedding photograph"}
                        fill
                        priority={isPriority}
                        sizes={slot.sizes}
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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

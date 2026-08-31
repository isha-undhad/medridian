"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

type Tile = {
  src: string;
  alt: string;
  /** Tile's flex-grow weight *within its row, from md: up only* — the thing
   * that produces the asymmetric widths once rows actually become
   * horizontal. Higher = wider. */
  grow: number;
  /** Tile's own height below md: (Tailwind height class, e.g. "h-64").
   * Below md every row is a plain stacked column with no shared row
   * height, so each tile needs its own explicit mobile height rather than
   * inheriting a fraction of one — sizing nested flex-grow by dividing a
   * single fixed row height across two or three levels of nesting is what
   * produced unusably short slivers on mobile before this. */
  mobileHeight: string;
  delay?: number;
  imageClassName?: string;
};

// Tailwind's `flex-[<value>]` sets the `flex` shorthand directly (a bare
// number = that grow weight, shrink 1, basis 0%). md:-prefixed so it only
// governs width once a row is actually flex-row (from md: up) — below that
// every tile is a full-width block in a stacked column instead, sized by
// `mobileHeight` alone.
const growClass: Record<number, string> = {
  2: "md:flex-[2]",
  3: "md:flex-[3]",
  4: "md:flex-[4]",
  5: "md:flex-[5]",
};

/** One photo tile: real aspect ratio is irrelevant here (every tile is
 * cropped via object-cover to whatever box its flex-grow weight and its
 * row's fixed height produce) — the same "crop to the composition"
 * approach PageHeader already uses for portrait photos in a landscape
 * banner. Hover: slow scale matching the scale-105/duration-700 treatment
 * already used on PortfolioSection and PortfolioCard. */
function EditorialTile({ src, alt, grow, mobileHeight, delay = 0, imageClassName = "" }: Tile) {
  return (
    <Reveal
      variants={fadeUp}
      delay={delay}
      className={`group relative w-full min-h-0 overflow-hidden rounded-sm bg-[var(--color-line)] ${mobileHeight} md:h-full ${growClass[grow]}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 100vw"
        className={`object-cover transition-transform duration-700 ease-out ${
          imageClassName ? imageClassName : "group-hover:scale-105"
        }`}
      />
    </Reveal>
  );
}

/**
 * Asymmetric editorial photo composition for the Experience page — sits
 * between the Dream Stories Timeline and the Instagram section.
 *
 * Deliberately wider than the rest of the page's content sections: this
 * <Section> uses max-w-[1400px] instead of the site's usual max-w-6xl
 * (1152px) so the gallery reads as a major visual moment rather than a
 * narrow centered column — SectionHeading's own subtitle already caps
 * itself at max-w-xl internally, so widening this container doesn't
 * stretch the intro copy, only the gallery rows below it.
 *
 * From md: up, each row is a fixed-height flex row (flex's default
 * `align-items: stretch` makes every tile in it fill that height), with
 * tiles sized by flex-grow weight rather than equal thirds. Below md:,
 * rows/sub-rows collapse to plain stacked columns with no shared height —
 * see EditorialTile's `mobileHeight`. Every one of the 9 photos lives
 * inside one of these rows; there's deliberately no image floating
 * standalone below the composition.
 */
export default function EditorialExperience() {
  return (
    // pt-0 at every breakpoint Section itself uses: the Timeline section
    // right above this one already ends in its own bottom padding via the
    // same shared <Section>, so stacking this one's default top padding on
    // top of that would double the gap — same fix applied elsewhere on the
    // Contact/Services/Portfolio pages. The bottom side keeps its default
    // padding, since InstagramFollow right after this was deliberately
    // reverted to *not* zero its own top padding — that's the intentional
    // "required spacing around Instagram" gap.
    <Section className="mx-auto max-w-7xl px-6 pt-0 sm:px-10 md:pt-0 lg:pt-0">
      <SectionHeading
        eyebrow="The Dream Stories Experience"
        title="A collection of moments, thoughtfully preserved."
        subtitle="From quiet preparations to unforgettable celebrations, every photograph is part of a larger story. We believe the experience should feel as intentional, effortless, and meaningful as the images themselves."
      />

      <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 flex flex-col gap-3 sm:gap-4 lg:gap-5">
        {/* Row 1 — large landscape feature (~55%) beside a nested column:
            two portraits side by side on top, one medium landscape spanning
            underneath them. */}
        <div className="flex flex-col gap-3 sm:gap-4 md:h-[600px] md:flex-row lg:h-[680px] lg:gap-5">
          <EditorialTile
            grow={5}
            mobileHeight="h-80 sm:h-96"
            src="/home/couple.webp"
            alt="Newlyweds kissing at the end of the aisle, red-rock desert ceremony in the background"
          />
          <div className="flex flex-col gap-3 sm:gap-4 md:h-full md:flex-[4] lg:gap-5">
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-[3] md:flex-row lg:gap-5">
              <EditorialTile
                grow={2}
                mobileHeight="h-56 sm:h-64"
                delay={0.08}
                src="/home/about1.jpg"
                alt="Bride and groom sharing a quiet moment beneath a flowing veil, in black and white"
              />
              <EditorialTile
                grow={2}
                mobileHeight="h-56 sm:h-64"
                delay={0.16}
                src="/portfolio/7.jpeg"
                alt="Wedding guests toasting and laughing together at an outdoor reception"
              />
            </div>
            <EditorialTile
              grow={2}
              mobileHeight="h-56 sm:h-64"
              delay={0.24}
              src="/home/catagory1.jpg"
              alt="Bride and groom walking hand in hand across an open field under soft, overcast light"
            />
          </div>
        </div>

        {/* Row 2 — wide feature, a portrait, and a small supporting tile. */}
        <div className="flex flex-col gap-3 sm:gap-4 md:h-[420px] md:flex-row lg:h-[460px] lg:gap-5">
          <EditorialTile
            grow={5}
            mobileHeight="h-72 sm:h-80"
            src="/home/about3.jpg"
            alt="Bride laughing as her groom lifts her mid-embrace at golden hour"
            imageClassName="scale-[1.14] group-hover:scale-[1.18]"
          />
          <EditorialTile
            grow={4}
            mobileHeight="h-72 sm:h-80"
            delay={0.08}
            src="/home/portfolio3.jpg"
            alt="Bride twirling in her gown beside a horse in an open field"
          />
          <EditorialTile
            grow={2}
            mobileHeight="h-56 sm:h-64"
            delay={0.16}
            src="/portfolio/2.jpeg"
            alt="Bride and groom laughing together as they exit through a shaded, ivy-covered doorway"
          />
        </div>

        {/* Row 3 — medium portrait beside a taller supporting portrait. */}
        <div className="flex flex-col gap-3 sm:gap-4 md:h-[440px] md:flex-row lg:h-[480px] lg:gap-5">
          <EditorialTile
            grow={3}
            mobileHeight="h-64 sm:h-72"
            src="/home/about4.jpg"
            alt="Bride and groom dancing together beneath a candlelit wall sconce"
          />
          <EditorialTile
            grow={2}
            mobileHeight="h-64 sm:h-72"
            delay={0.08}
            src="/home/portfolio2.jpg"
            alt="Groom dipping his bride mid-dance in a wood-paneled ballroom"
          />
        </div>
      </div>

      <Reveal
        variants={fadeUp}
        className="mx-auto mt-8 sm:mt-10 md:mt-12 max-w-lg text-center font-serif text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-ink)] italic leading-relaxed text-pretty"
      >
        The photographs are only part of the experience. The rest is how it feels.
      </Reveal>
    </Section>
  );
}

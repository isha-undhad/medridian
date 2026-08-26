"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import Reveal from "@/components/ui/Reveal";
import { fadeUp, rowSlideInLeft, rowSlideInRight } from "@/lib/motion";

/**
 * Self-contained font loading so this component can be dropped into any
 * Next.js App Router page as-is (same reasoning as the other home
 * components). `Dancing_Script` is only used here, for the small cursive
 * "Explore" line — nowhere else on the site needs a script face.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--explore-font-serif",
});

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--explore-font-script",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--explore-font-sans",
});

const CATEGORY_ROTATE_MS = 2800;

export type ExploreImage = {
  src: string;
  alt: string;
};

export interface ExploreSectionProps {
  /** Small cursive line above the category, e.g. "Explore". */
  scriptText?: string;
  /** Large bold category word(s) — cycles through these if more than one is
   * given (fades/slides between them every ~2.8s); renders statically if
   * only one is provided. */
  categories?: string[];
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  /** Top row — slides in once from the right on scroll-into-view, then
   * stays put (no loop). */
  topRowImages?: ExploreImage[];
  /** Bottom row — slides in once from the left on scroll-into-view, then
   * stays put (no loop). */
  bottomRowImages?: ExploreImage[];
}

const defaultCategories = ["WEDDINGS", "PORTRAITS", "EDITORIAL", "BRANDS"];

// Real files already in /public/home — the 5 category photos (top row) tie
// directly to the rotating headline above them; the bottom row picks 4
// distinct portraits not already used by the neighboring sections on this
// page, so nothing repeats back-to-back down the page.
const defaultTopRowImages: ExploreImage[] = [
  { src: "/home/catagory1.jpg", alt: "Wedding photography showcase" },
  { src: "/home/catagory2.jpg", alt: "Portrait photography showcase" },
  { src: "/home/catagory3.jpg", alt: "Editorial photography showcase" },
  { src: "/home/catagory4.jpg", alt: "Brand photography showcase" },
  { src: "/home/catagory5.jpg", alt: "Wedding photography showcase" },
];

const defaultBottomRowImages: ExploreImage[] = [
  { src: "/home/about2.jpeg", alt: "Ava Bennett on location" },
  { src: "/home/about3.jpg", alt: "Ava Bennett on location" },
  { src: "/home/about4.jpg", alt: "Ava Bennett on location" },
  {
    src: "/home/slider4.jpg",
    alt: "Bride and groom running across a lawn in front of an ornate stone building",
  },
];

/** One tile, shared by both rows so every image renders in an identically
 * sized container regardless of which row it's in. */
function SliderTile({ image }: { image: ExploreImage }) {
  return (
    <div className="relative h-[100px] w-[78px] shrink-0 overflow-hidden rounded-sm shadow-lg shadow-black/40 sm:h-[130px] sm:w-[100px] md:h-[150px] md:w-[116px] lg:h-[170px] lg:w-[132px]">
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 132px, 100px" className="object-cover" />
    </div>
  );
}

export default function ExploreSection({
  scriptText = "Explore",
  categories = defaultCategories,
  subtext = "Your story deserves to be documented in an honest way.",
  ctaText = "Browse the Work",
  ctaLink = "/portfolio",
  topRowImages = defaultTopRowImages,
  bottomRowImages = defaultBottomRowImages,
}: ExploreSectionProps) {
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Rotates through the category words when more than one is given; static
  // otherwise (per the brief's "if multiple categories exist" condition).
  // Empty dependency array — mirrors the proven rotation in
  // OfferingsHeadline.tsx exactly, so the interval is created once on mount
  // and never torn down/recreated (and never leaked: cleanup still clears
  // it on unmount).
  useEffect(() => {
    if (categories.length <= 1) return;
    const id = setInterval(() => {
      setCategoryIndex((value) => (value + 1) % categories.length);
    }, CATEGORY_ROTATE_MS);
    return () => clearInterval(id);
  }, [categories.length]);

  return (
    <section
      className={`${inter.variable} ${playfair.variable} ${script.variable} relative flex h-dvh min-h-[560px] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-neutral-900 py-6 sm:gap-8 sm:py-8 md:gap-10`}
    >
      {/* Top row — 5 images, same-size containers, slides in once from the
          right as it scrolls into view (Reveal's viewport.once means it
          never re-triggers/loops — it settles and stays). */}
      <Reveal variants={rowSlideInRight} className="w-full overflow-hidden">
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
          {topRowImages.map((image) => (
            <SliderTile key={image.src} image={image} />
          ))}
        </div>
      </Reveal>

      {/* Content — centered, full section width. */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal variants={fadeUp}>
          <div className="flex flex-col items-center">
            <span className={`${script.className} text-3xl text-white/90 sm:text-4xl`}>{scriptText}</span>

            {/* Rotating category word: every category is rendered, absolutely
                stacked on top of each other in a fixed-height box, with only
                the active one's opacity/translate toggled on — the same
                proven crossfade recipe as the photo layer in
                OfferingsHeadline.tsx, just for text instead of images.
                Plain CSS transitions only (no mount/unmount timing to get
                wrong), so the fade is guaranteed to run on every tick. */}
            <div className="relative mt-3 sm:mt-4 md:mt-5 h-[3.2rem] w-full sm:h-[4rem] md:h-[4.8rem] lg:h-[6.3rem]">
              {categories.map((category, index) => (
                <h2
                  key={category}
                  aria-hidden={index !== categoryIndex}
                  className={`${playfair.className} absolute inset-0 flex items-center justify-center text-5xl leading-[1.05] font-bold tracking-tight text-white uppercase transition-all duration-500 ease-in-out sm:text-6xl md:text-7xl lg:text-8xl ${index === categoryIndex ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                    }`}
                >
                  {category}
                </h2>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.15}>
          <p className={`${inter.className} mt-6 max-w-md text-sm sm:text-base leading-relaxed text-white font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]`}>
            {subtext}
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.3}>
          <Link
            href={ctaLink}
            className={`${inter.className} mt-8 inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-white hover:text-black`}
          >
            {ctaText}
          </Link>
        </Reveal>
      </div>

      {/* Bottom row — 4 images, same-size containers as the top row, slides
          in once from the left, then stays. */}
      <Reveal variants={rowSlideInLeft} className="w-full overflow-hidden">
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
          {bottomRowImages.map((image) => (
            <SliderTile key={image.src} image={image} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/**
 * Example usage — drop straight into the Home page, right after
 * AboutPhotographerSection:
 *
 *   import ExploreSection from "@/components/home/ExploreSection";
 *
 *   // Zero-config: renders with the defaults above (rotates through the
 *   // four offering categories; 5 images top, 4 bottom).
 *   <ExploreSection />
 *
 *   // Static category, custom copy and images:
 *   <ExploreSection
 *     categories={["WEDDINGS"]}
 *     subtext="Every gallery is composed like an heirloom."
 *     ctaText="View the Gallery"
 *     ctaLink="/portfolio"
 *     topRowImages={[{ src: "/home/catagory1.jpg", alt: "..." }]}
 *     bottomRowImages={[{ src: "/home/about2.jpeg", alt: "..." }]}
 *   />
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--explore-font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--explore-font-sans",
});

const CATEGORY_ROTATE_MS = 2800;

export type ExploreTile = {
  src: string;
  alt: string;
  className?: string;
};

export interface ExploreWeddingsGridProps {
  scriptText?: string;
  categories?: string[];
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  topRow?: ExploreTile[];
  bottomRow?: ExploreTile[];
}

const defaultCategories = ["WEDDINGS", "PORTRAITS", "EDITORIAL", "BRANDS"];

// 19 images from /public/image/explore_slider (exact filenames, casing, and actual image orientation)
const EXPLORE_SLIDER_IMAGES: Array<{ num: number; src: string; alt: string; className: string }> = [
  { num: 1, src: "/image/explore_slider/1.jpg", alt: "Wedding celebration showcase 1", className: "h-full aspect-[3/2]" },
  { num: 2, src: "/image/explore_slider/2.jpg", alt: "Wedding celebration showcase 2", className: "h-full aspect-[2/3]" },
  { num: 3, src: "/image/explore_slider/3.jpg", alt: "Wedding celebration showcase 3", className: "h-full aspect-[3/2]" },
  { num: 4, src: "/image/explore_slider/4.jpg", alt: "Wedding celebration showcase 4", className: "h-full aspect-[2/3]" },
  { num: 5, src: "/image/explore_slider/5.jpg", alt: "Wedding celebration showcase 5", className: "h-full aspect-[3/2]" },
  { num: 6, src: "/image/explore_slider/6.jpg", alt: "Wedding celebration showcase 6", className: "h-full aspect-[2/3]" },
  { num: 7, src: "/image/explore_slider/7.jpg", alt: "Wedding celebration showcase 7", className: "h-full aspect-[2/3]" },
  { num: 8, src: "/image/explore_slider/8.jpg", alt: "Wedding celebration showcase 8", className: "h-full aspect-[2/3]" },
  { num: 9, src: "/image/explore_slider/9.JPG", alt: "Wedding celebration showcase 9", className: "h-full aspect-[3/2]" },
  { num: 10, src: "/image/explore_slider/10.JPG", alt: "Wedding celebration showcase 10", className: "h-full aspect-[2/3]" },
  { num: 11, src: "/image/explore_slider/11.jpg", alt: "Wedding celebration showcase 11", className: "h-full aspect-[4/5]" },
  { num: 12, src: "/image/explore_slider/12.jpg", alt: "Wedding celebration showcase 12", className: "h-full aspect-[2/3]" },
  { num: 13, src: "/image/explore_slider/13.jpg", alt: "Wedding celebration showcase 13", className: "h-full aspect-[2/3]" },
  { num: 14, src: "/image/explore_slider/14.jpg", alt: "Wedding celebration showcase 14", className: "h-full aspect-[2/3]" },
  { num: 15, src: "/image/explore_slider/15.jpg", alt: "Wedding celebration showcase 15", className: "h-full aspect-[2/3]" },
  { num: 16, src: "/image/explore_slider/16.jpg", alt: "Wedding celebration showcase 16", className: "h-full aspect-[2/3]" },
  { num: 17, src: "/image/explore_slider/17.jpg", alt: "Wedding celebration showcase 17", className: "h-full aspect-[2/3]" },
  { num: 18, src: "/image/explore_slider/18.jpg", alt: "Wedding celebration showcase 18", className: "h-full aspect-[3/2]" },
  { num: 19, src: "/image/explore_slider/19.jpg", alt: "Wedding celebration showcase 19", className: "h-full aspect-[2/3]" },
];

/** Checks that no two adjacent elements have consecutive numbers (|a - b| === 1). */
function isValidNonAdjacentSequence(items: Array<{ num: number }>): boolean {
  for (let i = 0; i < items.length - 1; i++) {
    if (Math.abs(items[i].num - items[i + 1].num) === 1) {
      return false;
    }
  }
  return true;
}

/** Shuffles the 19 images, re-rolling until no two consecutive numbers are adjacent. */
function shuffleNonAdjacent(items: typeof EXPLORE_SLIDER_IMAGES): typeof EXPLORE_SLIDER_IMAGES {
  const result = [...items];
  let attempts = 0;
  do {
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    attempts++;
    if (attempts > 1000) break;
  } while (!isValidNonAdjacentSequence(result));
  return result;
}

/** Splits 19 images into top (10) and bottom (9) tracks matching their real orientation aspect ratios. */
function buildSliderRows(images: typeof EXPLORE_SLIDER_IMAGES): { top: ExploreTile[]; bottom: ExploreTile[] } {
  const top = images.slice(0, 10).map((img) => ({
    src: img.src,
    alt: img.alt,
    className: img.className,
  }));
  const bottom = images.slice(10).map((img) => ({
    src: img.src,
    alt: img.alt,
    className: img.className,
  }));
  return { top, bottom };
}

// Pre-validated non-adjacent order used as SSR baseline to avoid hydration mismatch
const INITIAL_NON_ADJACENT_ORDER = [13, 16, 3, 12, 8, 6, 17, 14, 19, 4, 10, 18, 5, 2, 9, 7, 1, 15, 11]
  .map((num) => EXPLORE_SLIDER_IMAGES.find((img) => img.num === num)!);

const defaultSliderRows = buildSliderRows(INITIAL_NON_ADJACENT_ORDER);

// Top slider: starts completely off-screen from the right (100vw) and glides left to full edge-to-edge resting coverage
const topSliderVariants: Variants = {
  hidden: { x: "100vw" },
  visible: {
    x: "-18vw",
    transition: {
      duration: 16.0,
      ease: "linear",
    },
  },
};

// Bottom slider: starts completely off-screen from the left (-100vw) and glides right to full edge-to-edge resting coverage with NO gaps
const bottomSliderVariants: Variants = {
  hidden: { x: "-100vw" },
  visible: {
    x: "-8vw",
    transition: {
      duration: 16.0,
      ease: "linear",
    },
  },
};

export default function ExploreWeddingsGrid({
  scriptText = "Explore",
  categories = defaultCategories,
  subtext = "Not staged. Not repeated. Just real, and worth remembering.",
  ctaText = "Browse the Work",
  ctaLink = "/portfolio",
  topRow,
  bottomRow,
}: ExploreWeddingsGridProps) {
  const [sliderRows, setSliderRows] = useState(defaultSliderRows);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  useEffect(() => {
    if (categories.length <= 1) return;
    const id = setInterval(() => {
      setCategoryIndex((value) => (value + 1) % categories.length);
    }, CATEGORY_ROTATE_MS);
    return () => clearInterval(id);
  }, [categories.length]);

  // Randomize order on client mount with the non-adjacent constraint
  useEffect(() => {
    setSliderRows(buildSliderRows(shuffleNonAdjacent(EXPLORE_SLIDER_IMAGES)));
  }, []);

  const activeTopRow = topRow ?? sliderRows.top;
  const activeBottomRow = bottomRow ?? sliderRows.bottom;

  return (
    <section
      ref={sectionRef}
      className={`${inter.variable} ${cormorant.variable} relative w-full max-md:h-auto max-md:min-h-0 max-md:py-[2px] md:h-[100dvh] md:min-h-[500px] md:max-h-[1080px] overflow-hidden bg-black flex flex-col justify-center gap-[2px] md:gap-[3px]`}
    >
      {/* TOP PART: Mobile compact height (~195px), Desktop 50% minus half-gap */}
      <div className="relative w-full h-[180px] min-[360px]:h-[195px] min-[400px]:h-[215px] md:h-[calc(50%-1.5px)] flex items-center overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={topSliderVariants}
          className="flex w-max h-full items-center gap-[2px] md:gap-[3px] will-change-transform"
        >
          {activeTopRow.map((tile, index) => (
            <div
              key={`${tile.src}-${index}`}
              className={`relative h-full shrink-0 overflow-hidden rounded-sm bg-neutral-900 ${tile.className ?? "aspect-[2/3]"
                } shadow-2xl shadow-black/80`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 35vw, 60vw"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM PART: Mobile compact height (~195px), Desktop 50% minus half-gap */}
      <div className="relative w-full h-[180px] min-[360px]:h-[195px] min-[400px]:h-[215px] md:h-[calc(50%-1.5px)] flex items-center overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={bottomSliderVariants}
          className="flex w-max h-full items-center gap-[2px] md:gap-[3px] will-change-transform"
        >
          {activeBottomRow.map((tile, index) => (
            <div
              key={`${tile.src}-${index}`}
              className={`relative h-full shrink-0 overflow-hidden rounded-sm bg-neutral-900 ${tile.className ?? "aspect-[2/3]"
                } shadow-2xl shadow-black/80`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 35vw, 60vw"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* SLIGHT BLACK OVERLAY LAYER FOR MAXIMUM TEXT VISIBILITY & CONTRAST */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-black/40 backdrop-brightness-[0.88]"
      />

      {/* CENTER OVERLAY TEXT & CTA */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* "Explore" — High-contrast luxury italic serif font */}
        <span
          className="font-times-now-italic text-2xl min-[360px]:text-[28px] sm:text-4xl md:text-5xl lg:text-[4rem] italic font-light text-white [text-shadow:0_3px_16px_rgba(0,0,0,0.95)] leading-none select-none"
        >
          {scriptText}
        </span>

        {/* Rotating category word — Tight luxury editorial letter spacing */}
        <div className="relative mt-1 sm:mt-3 md:mt-4 h-[1.9rem] min-[360px]:h-[2.2rem] w-full sm:h-[3.5rem] md:h-[4.5rem] lg:h-[5.5rem] xl:h-[6.5rem]">
          {categories.map((category, index) => (
            <h2
              key={category}
              aria-hidden={index !== categoryIndex}
              className={`font-times-now absolute inset-0 flex items-center justify-center text-3xl min-[360px]:text-[34px] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.6rem] font-light uppercase tracking-[0.03em] leading-[0.88] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.95)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${index === categoryIndex ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
            >
              {category}
            </h2>
          ))}
        </div>

        {/* Subtitle — Clean Times Now Light */}
        <p
          className="font-times-now mt-1 sm:mt-2 max-w-[260px] min-[360px]:max-w-xs sm:max-w-md text-[11.5px] min-[360px]:text-xs sm:text-base leading-snug font-light text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]"
        >
          {subtext}
        </p>

        {/* Pill Button — Elegant Times Now Light */}
        <Link
          href={ctaLink}
          className="font-times-now pointer-events-auto mt-2 sm:mt-3.5 inline-flex items-center justify-center rounded-full border border-white/80 bg-black/35 px-4 min-[360px]:px-5 sm:px-8 py-1 sm:py-2 text-[11px] min-[360px]:text-xs sm:text-sm font-light tracking-wide text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:text-black hover:shadow-xl hover:scale-105"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}

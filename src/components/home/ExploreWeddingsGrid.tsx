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

const defaultTopRow: ExploreTile[] = [
  {
    src: "/home/slider/1.jpg",
    alt: "Wedding celebration showcase 1",
    className: "h-full aspect-[16/10]",
  },
  {
    src: "/home/slider/2.jpg",
    alt: "Wedding celebration showcase 2",
    className: "h-full aspect-[3/4]",
  },
  {
    src: "/home/slider/3.jpg",
    alt: "Wedding celebration showcase 3",
    className: "h-full aspect-[4/3]",
  },
  {
    src: "/home/slider/4.jpg",
    alt: "Wedding celebration showcase 4",
    className: "h-full aspect-[3/4]",
  },
  {
    src: "/home/slider/5.jpg",
    alt: "Wedding celebration showcase 5",
    className: "h-full aspect-[16/10]",
  },
  {
    src: "/home/slider/1.jpg",
    alt: "Wedding celebration showcase 6",
    className: "h-full aspect-[3/4]",
  },
];

const defaultBottomRow: ExploreTile[] = [
  {
    src: "/home/slider/6.jpg",
    alt: "Wedding celebration showcase 7",
    className: "h-full aspect-[3/4]",
  },
  {
    src: "/home/slider/7.jpg",
    alt: "Wedding celebration showcase 8",
    className: "h-full aspect-[4/5]",
  },
  {
    src: "/home/slider/8.jpg",
    alt: "Wedding celebration showcase 9",
    className: "h-full aspect-[16/10]",
  },
  {
    src: "/home/slider/9.jpg",
    alt: "Wedding celebration showcase 10",
    className: "h-full aspect-[3/4]",
  },
  {
    src: "/home/slider/10.jpg",
    alt: "Wedding celebration showcase 11",
    className: "h-full aspect-[4/3]",
  },
  {
    src: "/home/slider/6.jpg",
    alt: "Wedding celebration showcase 12",
    className: "h-full aspect-[3/4]",
  },
];

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
  subtext = "Your story deserves to be documented in an honest way.",
  ctaText = "Browse the Work",
  ctaLink = "/portfolio",
  topRow = defaultTopRow,
  bottomRow = defaultBottomRow,
}: ExploreWeddingsGridProps) {
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

  return (
    <section
      ref={sectionRef}
      className={`${inter.variable} ${cormorant.variable} relative w-full h-[100dvh] min-h-[500px] max-h-[1080px] overflow-hidden bg-black flex flex-col justify-between py-1 sm:py-1.5`}
    >
      {/* TOP PART: Exactly 49% of 100dvh */}
      <div className="relative w-full h-[49%] flex items-center overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={topSliderVariants}
          className="flex w-max h-full items-center gap-1.5 sm:gap-2 md:gap-3 will-change-transform"
        >
          {topRow.map((tile, index) => (
            <div
              key={`${tile.src}-${index}`}
              className={`group relative h-full shrink-0 overflow-hidden rounded-sm bg-neutral-900 ${tile.className ?? "aspect-[4/3]"
                } shadow-2xl shadow-black/80`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-black/20" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM PART: Exactly 49% of 100dvh */}
      <div className="relative w-full h-[49%] flex items-center overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={bottomSliderVariants}
          className="flex w-max h-full items-center gap-1.5 sm:gap-2 md:gap-3 will-change-transform"
        >
          {bottomRow.map((tile, index) => (
            <div
              key={`${tile.src}-${index}`}
              className={`group relative h-full shrink-0 overflow-hidden rounded-sm bg-neutral-900 ${tile.className ?? "aspect-[4/3]"
                } shadow-2xl shadow-black/80`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-black/20" />
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
          className="font-times-now-italic text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] italic font-light text-white [text-shadow:0_3px_16px_rgba(0,0,0,0.95)] leading-none select-none"
        >
          {scriptText}
        </span>

        {/* Rotating category word — Tight luxury editorial letter spacing */}
        <div className="relative mt-2 sm:mt-3 md:mt-4 h-[2.5rem] w-full sm:h-[3.5rem] md:h-[4.5rem] lg:h-[5.5rem] xl:h-[6.5rem]">
          {categories.map((category, index) => (
            <h2
              key={category}
              aria-hidden={index !== categoryIndex}
              className={`font-times-now absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.6rem] font-light uppercase tracking-[0.03em] leading-[0.88] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.95)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${index === categoryIndex ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
            >
              {category}
            </h2>
          ))}
        </div>

        {/* Subtitle — Clean Times Now Light */}
        <p
          className="font-times-now mt-1 sm:mt-2 max-w-sm sm:max-w-md text-body leading-snug font-light text-white/95 [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]"
        >
          {subtext}
        </p>

        {/* Pill Button — Elegant Times Now Light */}
        <Link
          href={ctaLink}
          className="font-times-now pointer-events-auto mt-2.5 sm:mt-3.5 inline-flex items-center justify-center rounded-full border border-white/80 bg-black/25 px-6 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm font-light tracking-wide text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:text-black hover:shadow-xl hover:scale-105"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}

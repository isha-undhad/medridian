"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type OfferingItem = {
  label: string;
  src: string;
  alt: string;
  position: "top-left" | "bottom-left" | "top-right" | "bottom-right";
};

const offerings: OfferingItem[] = [
  {
    label: "WEDDINGS",
    src: "/image/OFFERINGS/1.jpg",
    alt: "Wedding photography showcase",
    position: "top-left",
  },
  {
    label: "PORTRAITS",
    src: "/image/OFFERINGS/2.jpg",
    alt: "Portrait photography showcase",
    position: "bottom-left",
  },
  {
    label: "EDITORIAL",
    src: "/image/OFFERINGS/3.JPG",
    alt: "Editorial photography showcase",
    position: "top-right",
  },
  {
    label: "BRANDS",
    src: "/image/OFFERINGS/4.JPG",
    alt: "Brand photography showcase",
    position: "bottom-right",
  },
];

// Mobile 4-Corner Positions (cycling sequence matching reference):
// 1. Bottom-right: overlapping "BRANDS" line
// 2. Bottom-left: overlapping "EDITORIAL" / "BRANDS"
// 3. Top-right: overlapping "WEDDINGS" / "PORTRAITS"
// 4. Top-left: upper area overlapping "WEDDINGS" / "PORTRAITS"
const positionClasses: Record<OfferingItem["position"], string> = {
  // Photo 1 (WEDDINGS) -> Left side (top-left)
  "top-left":
    "max-sm:w-[100px] max-sm:h-[137px] max-sm:bottom-[36px] max-sm:right-6 max-sm:top-auto max-sm:left-auto sm:top-[12%] sm:left-[13%] md:left-[17%] lg:left-[19%] xl:left-[21%]",
  // Photo 2 (PORTRAITS) -> Left side (bottom-left)
  "bottom-left":
    "max-sm:w-[100px] max-sm:h-[137px] max-sm:bottom-[38px] max-sm:left-6 max-sm:top-auto max-sm:right-auto sm:bottom-[12%] sm:left-[13%] md:left-[17%] lg:left-[19%] xl:left-[21%]",
  // Photo 3 (EDITORIAL) -> Right side (top-right)
  "top-right":
    "max-sm:w-[100px] max-sm:h-[137px] max-sm:top-[42px] max-sm:right-6 max-sm:bottom-auto max-sm:left-auto sm:top-[12%] sm:right-[13%] md:right-[17%] lg:right-[19%] xl:right-[21%]",
  // Photo 4 (BRANDS) -> Right side (bottom-right)
  "bottom-right":
    "max-sm:w-[100px] max-sm:h-[137px] max-sm:top-[42px] max-sm:left-6 max-sm:bottom-auto max-sm:right-auto sm:bottom-[12%] sm:right-[13%] md:right-[17%] lg:right-[19%] xl:right-[21%]",
};

export default function OfferingsHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automated 3-second interval loop sequence: 1. Bottom-Right -> 2. Bottom-Left -> 3. Top-Right -> 4. Top-Left
  useEffect(() => {
    // Preload all showcase images so they are fully decoded with zero load-in delay
    offerings.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
    });

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % offerings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const headingClass =
    "font-times-now text-[28px] min-[350px]:text-[32px] min-[380px]:text-[36px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium font-[500] uppercase leading-[1.12] sm:leading-[0.92] md:leading-[1.02] tracking-[0.03em] sm:tracking-tight text-[var(--color-ink)] opacity-100 select-none cursor-default [font-synthesis:none]";

  return (
    <section className="relative flex w-full flex-col items-center justify-between overflow-hidden bg-[var(--color-bg)] max-sm:px-6 sm:px-4 max-sm:h-auto max-sm:min-h-0 max-sm:mt-4 max-sm:mb-0 sm:my-0 max-sm:pt-4 max-sm:pb-4 max-sm:border-none border-l-0 sm:h-dvh sm:max-h-dvh sm:pt-8 sm:pb-0 md:pt-10 md:pb-0">
      {/*
        FLOATING IMAGE LAYER (z-0)
        Mobile (max-sm): Crossfades in sequence through 4 corners around the heading block
        Tablet / Desktop (sm+): Floats in 4 outer corners
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {offerings.map((item, index) => (
          <div
            key={item.label}
            className={`absolute sm:w-[135px] sm:h-[185px] md:w-[220px] md:h-[305px] lg:w-[270px] lg:h-[375px] xl:w-[310px] xl:h-[430px] transition-opacity duration-1000 ease-in-out [will-change:opacity] [backface-visibility:hidden] rounded-sm overflow-hidden shadow-md shadow-black/10 ${
              positionClasses[item.position]
            } ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100px, (max-width: 768px) 220px, (max-width: 1024px) 270px, 320px"
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>

      {/*
        STATIC UNIFORM TEXT LAYER (z-10) — Strictly above image layer, compact rhythm on mobile
      */}
      <div className="sm:relative z-10 flex h-full w-full flex-col items-center justify-between pointer-events-none">
        {/* TOP: Small uppercase tracking label */}
        <span className="text-center text-[11px] font-copperplate uppercase text-[var(--color-ink)] shrink-0 max-sm:pt-2 sm:pt-4">
          MOMENTS, MADE TIMELESS
        </span>

        {/* MIDDLE: Vertical list of large uppercase serif text items — matching reference spacing */}
        <div className="mt-14 sm:mt-8 md:mt-10 lg:mt-12 mb-10 sm:mb-2.5 sm:my-auto flex flex-col items-center justify-center space-y-2 sm:space-y-2 md:space-y-2.5 shrink-0 pointer-events-auto">
          {offerings.map((item) => (
            <h2
              key={item.label}
              className={headingClass}
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSynthesis: "none",
              }}
            >
              {item.label}
            </h2>
          ))}
        </div>

        {/* BOTTOM: Small italicized serif tagline — positioned cleanly below heading on desktop, touching bottom on mobile */}
        <p className="text-center font-times-now-italic text-[14px] text-[var(--color-muted)] shrink-0 max-sm:absolute max-sm:bottom-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-full max-sm:leading-none sm:static sm:translate-y-0 sm:pb-6 md:pb-8 lg:pb-10">
          the art of noticing.
        </p>
      </div>
    </section>
  );
}

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
    src: "/home/catagory1.jpg",
    alt: "Wedding photography showcase",
    position: "top-left",
  },
  {
    label: "PORTRAITS",
    src: "/home/catagory2.jpg",
    alt: "Portrait photography showcase",
    position: "bottom-left",
  },
  {
    label: "EDITORIAL",
    src: "/home/catagory3.jpg",
    alt: "Editorial photography showcase",
    position: "top-right",
  },
  {
    label: "BRANDS",
    src: "/home/catagory4.jpg",
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
  // Photo 1 (WEDDINGS) -> Bottom-Right corner
  "top-left":
    "max-sm:w-[70px] max-sm:h-[96px] max-sm:bottom-[40px] max-sm:right-[14px] max-sm:top-auto max-sm:left-auto sm:top-[12%] sm:left-[10%] md:left-[14%] lg:left-[16%] xl:left-[18%]",
  // Photo 2 (PORTRAITS) -> Bottom-Left corner
  "bottom-left":
    "max-sm:w-[70px] max-sm:h-[96px] max-sm:bottom-[42px] max-sm:left-[14px] max-sm:top-auto max-sm:right-auto sm:bottom-[12%] sm:left-[10%] md:left-[14%] lg:left-[16%] xl:left-[18%]",
  // Photo 3 (EDITORIAL) -> Top-Right corner
  "top-right":
    "max-sm:w-[70px] max-sm:h-[96px] max-sm:top-[68px] max-sm:right-[14px] max-sm:bottom-auto max-sm:left-auto sm:top-[12%] sm:right-[10%] md:right-[14%] lg:right-[16%] xl:right-[18%]",
  // Photo 4 (BRANDS) -> Top-Left corner
  "bottom-right":
    "max-sm:w-[70px] max-sm:h-[96px] max-sm:top-[68px] max-sm:left-[14px] max-sm:bottom-auto max-sm:right-auto sm:bottom-[12%] sm:right-[10%] md:right-[14%] lg:right-[16%] xl:right-[18%]",
};

export default function OfferingsHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automated 3-second interval loop sequence: 1. Bottom-Right -> 2. Bottom-Left -> 3. Top-Right -> 4. Top-Left
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % offerings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const headingClass =
    "font-times-now text-[36px] min-[360px]:text-[39px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light font-[300] uppercase leading-[1.12] sm:leading-[0.92] md:leading-[1.02] tracking-[0.03em] sm:tracking-tight text-[var(--color-ink)] opacity-100 select-none cursor-default [font-synthesis:none]";

  return (
    <section className="relative flex w-full flex-col items-center justify-between overflow-hidden bg-[var(--color-bg)] max-sm:px-6 sm:px-4 max-sm:h-auto max-sm:min-h-0 max-sm:my-8 sm:my-0 max-sm:pt-8 max-sm:pb-5 max-sm:border-none border-l-0 sm:h-dvh sm:max-h-dvh sm:py-8 md:py-10">
      {/*
        FLOATING IMAGE LAYER (z-0)
        Mobile (max-sm): Crossfades in sequence through 4 corners around the heading block
        Tablet / Desktop (sm+): Floats in 4 outer corners
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {offerings.map((item, index) => (
          <div
            key={item.label}
            className={`absolute sm:w-[180px] sm:h-[250px] md:h-[300px] md:w-[220px] lg:h-[360px] lg:w-[260px] transition-all duration-700 ease-in-out rounded-sm overflow-hidden shadow-md shadow-black/10 ${
              positionClasses[item.position]
            } ${
              index === activeIndex
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 70px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
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
        <span className="text-center text-[11px] font-copperplate uppercase text-[var(--color-ink)] shrink-0 pt-[15px] sm:pt-4">
          THE OFFERINGS
        </span>

        {/* MIDDLE: Vertical list of large uppercase serif text items — matching reference spacing */}
        <div className="max-sm:mt-6 sm:mt-2.5 mb-2.5 sm:my-auto flex flex-col items-center justify-center space-y-1 sm:space-y-2 md:space-y-2.5 shrink-0 pointer-events-auto">
          {offerings.map((item, index) => (
            <h2
              key={item.label}
              onMouseEnter={() => setActiveIndex(index)}
              className={headingClass}
              style={{
                fontFamily: "'Times Now Light', 'Times Now', serif",
                fontWeight: 300,
                fontSynthesis: "none",
              }}
            >
              {item.label}
            </h2>
          ))}
        </div>

        {/* BOTTOM: Small italicized serif tagline — touching the bottom line of this section on mobile */}
        <p className="text-center font-times-now-italic text-[14px] text-[var(--color-muted)] shrink-0 max-sm:absolute max-sm:bottom-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-full max-sm:leading-none sm:static sm:pb-2">
          the art of noticing.
        </p>
      </div>
    </section>
  );
}

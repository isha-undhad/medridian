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

const positionClasses: Record<OfferingItem["position"], string> = {
  "top-left": "top-[12%] left-[6%] sm:left-[10%] md:left-[14%] lg:left-[16%] xl:left-[18%]",
  "bottom-left": "bottom-[12%] left-[6%] sm:left-[10%] md:left-[14%] lg:left-[16%] xl:left-[18%]",
  "top-right": "top-[12%] right-[6%] sm:right-[10%] md:right-[14%] lg:right-[16%] xl:right-[18%]",
  "bottom-right": "bottom-[12%] right-[6%] sm:right-[10%] md:right-[14%] lg:right-[16%] xl:right-[18%]",
};

export default function OfferingsHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automated 2-second interval loop sequence: WEDDINGS -> PORTRAITS -> EDITORIAL -> BRANDS
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % offerings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const headingClass =
    "font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium uppercase leading-[0.98] sm:leading-[1.02] tracking-tight text-[var(--color-ink)] opacity-100 select-none cursor-default";

  return (
    <section className="relative flex h-dvh max-h-dvh w-full flex-col items-center justify-between overflow-hidden bg-[var(--color-bg)] px-4 py-6 sm:py-8 md:py-10">
      {/*
        FLOATING IMAGE LAYER (z-0)
        Animates behind the text in corners
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {offerings.map((item, index) => (
          <div
            key={item.label}
            className={`absolute h-[200px] w-[145px] sm:h-[250px] sm:w-[180px] md:h-[300px] md:w-[220px] lg:h-[360px] lg:w-[260px] transition-all duration-500 ease-out rounded-sm overflow-hidden shadow-lg ${positionClasses[item.position]
              } ${index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
              }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 145px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>

      {/*
        STATIC UNIFORM TEXT LAYER (z-10) — All 4 lines stay 100% visible and identical at all times
      */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between pointer-events-none">
        {/* TOP: Small uppercase tracking label */}
        <span className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-muted)] shrink-0 pt-2 sm:pt-4">
          THE OFFERINGS
        </span>

        {/* MIDDLE: Vertical list of large uppercase serif text items — all uniformly solid and visible */}
        <div className="my-auto flex flex-col items-center justify-center space-y-1 sm:space-y-2 md:space-y-2.5 shrink-0 pointer-events-auto">
          {offerings.map((item, index) => (
            <h2
              key={item.label}
              onMouseEnter={() => setActiveIndex(index)}
              className={headingClass}
            >
              {item.label}
            </h2>
          ))}
        </div>

        {/* BOTTOM: Small italicized serif tagline */}
        <p className="text-center font-serif text-base sm:text-lg italic text-[var(--color-muted)] shrink-0 pb-2">
          the art of noticing.
        </p>
      </div>
    </section>
  );
}

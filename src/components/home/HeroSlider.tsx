"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { heroSlides } from "@/data/hero";
import SliderControls from "./SliderControls";

const AUTOPLAY_MS = 2000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const total = heroSlides.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrent((prev) => {
        setPrevIndex(prev);
        return ((prev + newDirection) % total + total) % total;
      });
    },
    [total],
  );

  const next = useCallback(() => paginate(1), [paginate]);
  const prev = useCallback(() => paginate(-1), [paginate]);

  // Autoplay in continuous 2-second loop with smooth crossfade transition
  useEffect(() => {
    const id = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paginate]);

  // Preload all hero slide images immediately on mount so transitions are instant
  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (slide.src) {
        const img = new window.Image();
        img.src = slide.src;
      }
    });
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") prev();
    if (event.key === "ArrowRight") next();
  };

  return (
    <section
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured work slideshow"
      onKeyDown={handleKeyDown}
      // Home's header is solid at all times (see Navbar.tsx), so the hero
      // must start below it instead of underneath it: mt-* matches the
      // header's own rendered height (logo height + its py-*) at each
      // breakpoint, and h-[calc(100dvh-...)] subtracts the same amount so
      // the slide still fits exactly one viewport instead of overshooting it.
      className="relative mt-14 h-[calc(100dvh-56px)] sm:mt-16 sm:h-[calc(100dvh-64px)] md:mt-[68px] md:h-[calc(100dvh-68px)] min-h-[560px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70 bg-neutral-950"
    >
      {/* 
        All slides are kept mounted in the DOM to prevent unmounting/re-loading cycles.
        The active slide fades in at z-20 on top of the previous slide (z-10, opacity-100),
        ensuring an image is ALWAYS fully visible with ZERO black-screen flashes.
      */}
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === current;
          const isPrevious = index === prevIndex;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                isActive
                  ? "z-20 opacity-100"
                  : isPrevious
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0 pointer-events-none"
              }`}
              style={{ willChange: "opacity" }}
            >
              {slide.src ? (
                <div className="relative h-full w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "eager"}
                    sizes="100vw"
                    quality={85}
                    className={`object-cover ${
                      slide.objectPositionClass ?? "object-center"
                    }`}
                    style={slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined}
                  />
                </div>
              ) : (
                <PlaceholderMedia
                  tone={slide.tone}
                  className="h-full w-full"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Visually hidden h1 for accessibility */}
      <h1 className="sr-only">Dream Stories — Timeless Wedding Photography</h1>

      <SliderControls current={current} total={total} onPrev={prev} onNext={next} />
    </section>
  );
}


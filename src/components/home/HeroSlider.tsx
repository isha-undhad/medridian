"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const currentSlide = heroSlides[current];
  // Match specifically to the home_04 slide by id ("h4") or filename (home 04_.png) regardless of slide array order
  const isHome04Active = Boolean(
    currentSlide &&
      (currentSlide.id === "h4" ||
        (currentSlide.src && /home[\s_-]?0?4/i.test(currentSlide.src)))
  );

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
      // On mobile (<md), 100svh is used so the section height remains completely
      // static when the browser address bar collapses/expands during scroll,
      // eliminating any unwanted background image zoom-in/zoom-out resizing.
      className="relative mt-14 h-[calc(100svh-56px)] sm:mt-16 sm:h-[calc(100svh-64px)] md:mt-[68px] md:h-[calc(100dvh-68px)] min-h-[560px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70 bg-neutral-950"
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
                    // Next.js 16 deprecated `priority` in favor of `preload`
                    // (same "load this at full quality immediately, insert
                    // a <link> preload in <head>" behavior, clearer name).
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "eager"}
                    sizes="100vw"
                    quality={100}
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

      {/* 
        Subtle dark gradient overlay across the slider:
        Slightly stronger near top and bottom so text stays readable against any rotating photo
        without darkening the images excessively.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[21] bg-gradient-to-b from-black/40 via-black/15 to-black/45"
      />

      {/* Visually hidden h1 for accessibility and SEO across all slides */}
      <h1 className="sr-only">Dream Stories — Timeless Wedding Photography</h1>

      {/* 
        All overlay text (centered heading, subtext, and bottom info row):
        Strictly visible ONLY when the home_04 slide is active.
        Fades in smoothly when home_04 becomes active, and fades out when it leaves.
      */}
      <div
        className={`pointer-events-none absolute inset-0 z-[25] transition-opacity duration-1000 ease-in-out ${
          isHome04Active ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ willChange: "opacity" }}
        aria-hidden={!isHome04Active}
      >
        {/* Centered hero heading & subtext — contained cleanly within max-width, strictly 2 lines */}
        <div className="flex h-full w-full flex-col items-center justify-center px-4 sm:px-8 md:px-12 -translate-y-5 sm:-translate-y-7 md:-translate-y-9">
          <div className="flex flex-col items-center justify-center text-center w-full max-w-[92vw] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[800px]">
            <h2
              className="font-cormorant text-[1.12rem] min-[360px]:text-[1.28rem] min-[400px]:text-[1.45rem] sm:text-[1.95rem] md:text-[2.35rem] lg:text-[2.7rem] xl:text-[2.95rem] font-normal tracking-[0.1em] min-[360px]:tracking-[0.12em] min-[400px]:tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] uppercase text-white leading-[1.08] sm:leading-[1.06] md:leading-[1.04] [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] w-full"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}
            >
              <span className="block whitespace-nowrap">WEDDING PHOTOGRAPHY &amp;</span>
              <span className="block">FILMS</span>
            </h2>
            <p
              className="mt-4 sm:mt-5 md:mt-6 font-cormorant text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] md:text-[12.5px] lg:text-[13.5px] font-normal tracking-[0.26em] sm:tracking-[0.3em] md:tracking-[0.35em] uppercase text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] text-center text-balance max-w-xs sm:max-w-md md:max-w-xl"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}
            >
              MODERN WEDDING STORIES FOR THE DISCERNING COUPLE
            </p>
          </div>
        </div>

        {/* Bottom info row — lifted with generous bottom spacing and delicate hierarchy */}
        <div className="absolute inset-x-0 bottom-6 min-[400px]:bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-14 px-8 sm:px-14 md:px-18 lg:px-24">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-2.5 sm:gap-3 md:grid-cols-3 md:items-end md:gap-6 text-center">
            {/* Left Column: Get in Touch */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-[7.5px] min-[360px]:text-[8px] sm:text-[8.5px] md:text-[9px] font-sans font-medium tracking-[0.26em] uppercase text-[#faf8f5]/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                Get in Touch
              </span>
              <Link
                href="/contact"
                tabIndex={isHome04Active ? 0 : -1}
                className="pointer-events-auto mt-0.5 font-serif text-[8.5px] min-[360px]:text-[9px] sm:text-[9.5px] md:text-[10.5px] tracking-wider text-[#faf8f5] transition-opacity hover:opacity-75 underline underline-offset-[3px] decoration-[#faf8f5]/30 hover:decoration-[#faf8f5] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
              >
                Contact Us
              </Link>
            </div>

            {/* Center Column: Descriptive text */}
            <div className="flex flex-col items-center justify-center text-center">
              <p className="max-w-[210px] min-[360px]:max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md font-serif text-[8px] min-[360px]:text-[8.5px] sm:text-[9px] md:text-[10px] lg:text-[10.5px] font-light leading-relaxed tracking-wide text-[#faf8f5]/80 text-balance [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
                Fine-art wedding photography and films for couples across India and worldwide.
              </p>
            </div>

            {/* Right Column: Follow Along */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <span className="text-[7.5px] min-[360px]:text-[8px] sm:text-[8.5px] md:text-[9px] font-sans font-medium tracking-[0.26em] uppercase text-[#faf8f5]/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                Follow Along
              </span>
              <a
                href="https://www.instagram.com/the_dream_stories_"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isHome04Active ? 0 : -1}
                className="pointer-events-auto mt-0.5 font-serif text-[8.5px] min-[360px]:text-[9px] sm:text-[9.5px] md:text-[10.5px] tracking-wider text-[#faf8f5] transition-opacity hover:opacity-75 underline underline-offset-[3px] decoration-[#faf8f5]/30 hover:decoration-[#faf8f5] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
              >
                @the_dream_stories_
              </a>
            </div>
          </div>
        </div>
      </div>

      <SliderControls current={current} total={total} onPrev={prev} onNext={next} />
    </section>
  );
}


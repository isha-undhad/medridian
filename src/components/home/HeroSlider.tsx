"use client";

import { useRef } from "react";
import Link from "next/link";

export default function HeroSlider() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Featured work"
      // The header is transparent on the home page, so the hero fills the full viewport
      // from the top (top: 0) directly beneath the transparent fixed header.
      // On mobile (<md), the hero is capped to ~58% of the viewport height (svh,
      // so it stays static when the browser address bar collapses/expands) instead
      // of the full screen, so the next section starts right below with no gap.
      className="relative h-[58svh] md:h-dvh min-h-[420px] md:min-h-[560px] overflow-hidden bg-neutral-950"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/image/home_slider/video_1.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
      />

      {/*
        Subtle dark gradient overlay across the video:
        Slightly stronger near top and bottom so text stays readable
        without darkening the video excessively.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[21] bg-gradient-to-b from-black/40 via-black/15 to-black/45"
      />

      {/* Visually hidden h1 for accessibility and SEO */}
      <h1 className="sr-only">Dream Stories — Timeless Wedding Photography</h1>

      <div className="pointer-events-none absolute inset-0 z-[25]">
        {/* Bottom-stacked heading and info row — anchored to the bottom of the hero */}
        <div className="absolute inset-x-0 bottom-6 min-[400px]:bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-14 px-8 sm:px-14 md:px-18 lg:px-24">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 sm:gap-10 md:gap-12">
            {/* Heading */}
            <div className="flex flex-col items-center text-center w-full max-w-[92vw] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[800px]">
              <h2
                className="font-cormorant text-[0.65rem] min-[360px]:text-[0.72rem] min-[400px]:text-[0.8rem] sm:text-[1.35rem] md:text-[1.6rem] lg:text-[1.85rem] xl:text-[2rem] font-normal tracking-[0.08em] min-[360px]:tracking-[0.1em] min-[400px]:tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] uppercase text-white leading-[1.08] sm:leading-[1.06] md:leading-[1.04] [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] w-full"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                <span className="block">THE ART OF YOUR STORY</span>
              </h2>
              <p
                className="mt-0.5 sm:mt-1 font-cormorant text-[8.5px] min-[360px]:text-[9.5px] min-[400px]:text-[10.5px] sm:text-[13px] md:text-[15px] lg:text-[17px] font-normal tracking-[0.1em] sm:tracking-[0.14em] text-white/90 leading-[1.2] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] w-full"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Wedding Photography &amp; Films
              </p>
            </div>

            {/* Info row */}
            <div className="grid w-full grid-cols-1 items-center gap-2.5 sm:gap-3 md:grid-cols-3 md:items-end md:gap-6 text-center">
              {/* Left Column: Get in Touch */}
              <div className="hidden md:flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-[7.5px] min-[360px]:text-[8px] sm:text-[8.5px] md:text-[9px] font-sans font-medium tracking-[0.26em] uppercase text-[#faf8f5]/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                  Get in Touch
                </span>
                <Link
                  href="/contact"
                  className="pointer-events-auto mt-0.5 font-serif text-[8.5px] min-[360px]:text-[9px] sm:text-[9.5px] md:text-[10.5px] tracking-wider text-[#faf8f5] transition-opacity hover:opacity-75 underline underline-offset-[3px] decoration-[#faf8f5]/30 hover:decoration-[#faf8f5] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
                >
                  Contact Us
                </Link>
              </div>

              {/* Center Column: Explore */}
              <div className="flex flex-col items-center justify-center text-center">
                <button
                  type="button"
                  onClick={scrollToNext}
                  className="pointer-events-auto inline-flex items-center justify-center cursor-pointer border border-[#faf8f5]/70 px-3.5 py-1.5 sm:px-6 sm:py-2.5 font-sans text-[6.5px] min-[360px]:text-[7px] sm:text-[9px] md:text-[9.5px] font-medium tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[#faf8f5] transition-colors duration-300 hover:bg-[#faf8f5] hover:text-neutral-900"
                >
                  Explore
                </button>
              </div>

              {/* Right Column: Follow Along */}
              <div className="hidden md:flex flex-col items-center md:items-end text-center md:text-right">
                <span className="text-[7.5px] min-[360px]:text-[8px] sm:text-[8.5px] md:text-[9px] font-sans font-medium tracking-[0.26em] uppercase text-[#faf8f5]/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                  Follow Along
                </span>
                <a
                  href="https://www.instagram.com/the_dream_stories_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto mt-0.5 font-serif text-[8.5px] min-[360px]:text-[9px] sm:text-[9.5px] md:text-[10.5px] tracking-wider text-[#faf8f5] transition-opacity hover:opacity-75 underline underline-offset-[3px] decoration-[#faf8f5]/30 hover:decoration-[#faf8f5] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
                >
                  @the_dream_stories_
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

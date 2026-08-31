"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { heroSlides } from "@/data/hero";
import SliderControls from "./SliderControls";

const AUTOPLAY_MS = 3000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay in continuous 3-second infinite loop (1 -> 2 -> 3 -> 4 -> 1...)
  // No pause on mouse hover
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((value) => (value + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total, current]);

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
      className="relative h-dvh min-h-[560px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
    >
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== current}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.src ? (
              <div className="relative h-full w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                  className={`object-cover transition-transform duration-1000 ease-out ${
                    slide.objectPositionClass ?? "object-center"
                  } ${index === current ? "scale-100" : "scale-105"}`}
                />
              </div>
            ) : (
              <PlaceholderMedia
                tone={slide.tone}
                className={`h-full w-full transition-transform duration-1000 ease-out ${
                  index === current ? "scale-100" : "scale-105"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Visually hidden h1 for accessibility */}
      <h1 className="sr-only">Dream Stories — Timeless Wedding Photography</h1>

      <SliderControls current={current} total={total} onPrev={prev} onNext={next} />
    </section>
  );
}

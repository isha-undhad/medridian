"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { heroSlides } from "@/data/hero";
import SliderControls from "./SliderControls";

const AUTOPLAY_MS = 2000;

// Smooth crossfade (cross-dissolve) transition variants
const slideVariants: Variants = {
  enter: {
    opacity: 0,
    zIndex: 1,
  },
  center: {
    opacity: 1,
    zIndex: 1,
    transition: {
      opacity: { duration: 0.9, ease: "easeInOut" },
    },
  },
  exit: {
    opacity: 0,
    zIndex: 0,
    transition: {
      opacity: { duration: 0.9, ease: "easeInOut" },
    },
  },
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrent((prevIndex) => ((prevIndex + newDirection) % total + total) % total);
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

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") prev();
    if (event.key === "ArrowRight") next();
  };

  const activeSlide = heroSlides[current];

  return (
    <section
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured work slideshow"
      onKeyDown={handleKeyDown}
      className="relative h-dvh min-h-[560px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
    >
      <div className="absolute inset-0 overflow-hidden bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full will-change-[opacity]"
          >
            {activeSlide.src ? (
              <div className="relative h-full w-full">
                <Image
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  fill
                  priority={current === 0}
                  sizes="100vw"
                  quality={90}
                  className={`object-cover ${
                    activeSlide.objectPositionClass ?? "object-center"
                  }`}
                />
              </div>
            ) : (
              <PlaceholderMedia
                tone={activeSlide.tone}
                className="h-full w-full"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Visually hidden h1 for accessibility */}
      <h1 className="sr-only">Dream Stories — Timeless Wedding Photography</h1>

      <SliderControls current={current} total={total} onPrev={prev} onNext={next} />
    </section>
  );
}

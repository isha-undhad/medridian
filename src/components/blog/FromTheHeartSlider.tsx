"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import Section from "@/components/ui/Section";

type TestimonialSlide = {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
  imageAlt: string;
};

const testimonialSlides: TestimonialSlide[] = [
  {
    id: 1,
    quote:
      "“Every frame felt effortlessly true to our story — as if she read our minds.”",
    author: "Jordan & Alex",
    role: "Past Clients",
    image: "/home/about1.jpg",
    imageAlt: "Jordan & Alex wedding portrait",
  },
  {
    id: 2,
    quote:
      "“She captured the soul of our day in a way words never could.”",
    author: "Elena & David",
    role: "Florence Celebration",
    image: "/portfolio/1.jpeg",
    imageAlt: "Elena & David wedding portrait",
  },
  {
    id: 3,
    quote:
      "“Timeless, romantic, and beyond anything we could have ever imagined.”",
    author: "Sophia & Liam",
    role: "English Countryside",
    image: "/portfolio/2.jpeg",
    imageAlt: "Sophia & Liam wedding portrait",
  },
  {
    id: 4,
    quote:
      "“Every single photograph feels intentional, artful, and deeply personal.”",
    author: "Chloe & Marcus",
    role: "Napa Valley Vows",
    image: "/home/about4.jpg",
    imageAlt: "Chloe & Marcus wedding portrait",
  },
];

export default function FromTheHeartSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // 2-second infinite loop auto transition (1 -> 2 -> 3 -> 4 -> 1 ...)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialSlides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonialSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialSlides.length);
  };

  const currentSlide = testimonialSlides[currentIndex];

  // Ultra-smooth slide & crossfade variants with gentle motion curve
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -20 : 20,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <Section className="w-full bg-[var(--color-bg)] py-16 md:py-24 border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-muted)] uppercase">
          From the Heart
        </span>

        {/* Slider Area */}
        <div className="relative mt-8 min-h-[300px] flex items-center justify-center sm:mt-10 sm:min-h-[320px]">
          {/* Previous Arrow Button (Left) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous quote"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[var(--color-ink)] transition-all duration-300 hover:scale-125 hover:text-[var(--color-accent-ink)] focus:outline-none cursor-pointer"
          >
            <MoveLeft className="h-6 w-10 stroke-[1.2]" />
          </button>

          {/* Next Arrow Button (Right) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next quote"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[var(--color-ink)] transition-all duration-300 hover:scale-125 hover:text-[var(--color-accent-ink)] focus:outline-none cursor-pointer"
          >
            <MoveRight className="h-6 w-10 stroke-[1.2]" />
          </button>

          {/* Animated Quote Content */}
          <div className="mx-auto max-w-2xl px-12 sm:px-16 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Quote Text */}
                <p className="font-serif text-2xl leading-snug text-[var(--color-ink)] sm:text-3xl lg:text-4xl text-balance">
                  {currentSlide.quote}
                </p>

                {/* Author Credit */}
                <p className="mt-6 text-xs sm:text-sm font-medium tracking-wider text-[var(--color-muted)]">
                  — {currentSlide.author}, {currentSlide.role}
                </p>

                {/* Circular Portrait Image */}
                <div className="relative mt-8 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-[var(--color-line)] shadow-sm">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.imageAlt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonialSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex
                  ? "w-7 bg-[var(--color-accent-ink)]"
                  : "w-2 bg-[var(--color-line)] hover:bg-[var(--color-muted)]"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import Section from "@/components/ui/Section";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
  imageAlt: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "“Every frame felt effortlessly true to our story — as if she read our minds.”",
    author: "Jordan & Alex",
    role: "Past Clients",
    image: "/home/about1.jpg",
    imageAlt: "Jordan & Alex wedding portrait",
  },
  {
    id: 2,
    quote: "“She captured the soul of our day in a way words never could.”",
    author: "Elena & David",
    role: "Florence Celebration",
    image: "/portfolio/1.jpeg",
    imageAlt: "Elena & David wedding portrait",
  },
  {
    id: 3,
    quote: "“Timeless, romantic, and beyond anything we could have ever imagined.”",
    author: "Sophia & Liam",
    role: "English Countryside",
    image: "/portfolio/2.jpeg",
    imageAlt: "Sophia & Liam wedding portrait",
  },
  {
    id: 4,
    quote: "“Every single photograph feels intentional, artful, and deeply personal.”",
    author: "Chloe & Marcus",
    role: "Napa Valley Vows",
    image: "/home/about4.jpg",
    imageAlt: "Chloe & Marcus wedding portrait",
  },
];

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <Section className="w-full bg-[var(--color-bg)]">
      <div
        className="mx-auto max-w-4xl px-6 text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
          Client Testimonials
        </span>

        <div className="relative mt-8 min-h-[300px] flex items-center justify-center sm:mt-10 sm:min-h-[320px]">
          <button
            type="button"
            suppressHydrationWarning
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[var(--color-ink)] transition-all duration-300 hover:scale-110 hover:text-[var(--color-accent-ink)] focus:outline-none cursor-pointer"
          >
            <MoveLeft className="h-6 w-10 stroke-[1.2]" />
          </button>

          <button
            type="button"
            suppressHydrationWarning
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[var(--color-ink)] transition-all duration-300 hover:scale-110 hover:text-[var(--color-accent-ink)] focus:outline-none cursor-pointer"
          >
            <MoveRight className="h-6 w-10 stroke-[1.2]" />
          </button>

          <div className="mx-auto max-w-2xl px-12 sm:px-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center"
              >
                <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-[var(--color-ink)] text-balance">
                  {current.quote}
                </p>

                <p className="mt-6 text-xs sm:text-sm font-medium tracking-wider text-[var(--color-muted)] uppercase">
                  — {current.author}, {current.role}
                </p>

                <div className="relative mt-8 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-[var(--color-line)] shadow-sm">
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              suppressHydrationWarning
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
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

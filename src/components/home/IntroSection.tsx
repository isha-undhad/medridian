"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";

const AUTOPLAY_MS = 3000;

export type HeadlineSegment = {
  text: string;
  italic?: boolean;
};

export interface IntroSectionProps {
  headline?: HeadlineSegment[];
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  images?: string[];
}

const defaultHeadline: HeadlineSegment[] = [
  { text: "Love, told the way it " },
  { text: "actually", italic: true },
  { text: " felt." },
];

const defaultSubtext =
  'The quiet glances, the effortless laughter, the anticipation before "I do," and the emotions that linger long after the celebrations fade. Every frame is crafted to preserve the beauty of your story, exactly as it was meant to be remembered.';

const defaultImages = [
  "/image/intro_home/5.jpg",
  "/image/intro_home/6.JPG",
  "/image/intro_home/7.jpg",
  "/image/intro_home/8.JPG",
];

function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const total = images.length;

  // Preload all slider images on mount so transitions are completely seamless
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Automated 3-second interval loop sequence matching Offerings section crossfade
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % total;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md lg:aspect-auto lg:h-[440px] lg:rounded-lg">
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === prevIndex;

        return (
          <div
            key={src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out [will-change:opacity] [backface-visibility:hidden] ${
              isActive
                ? "z-20 opacity-100"
                : isPrevious
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={src}
              alt={`Wedding photography, image ${index + 1} of ${total}`}
              fill
              priority={index === 0}
              loading={index <= 1 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function IntroSection({
  headline = defaultHeadline,
  subtext = defaultSubtext,
  ctaText = "Begin Your Story",
  ctaLink = "/portfolio",
  images = defaultImages,
}: IntroSectionProps) {
  return (
    <Section className="bg-[var(--color-bg)] pb-0 sm:pb-0 md:pb-2 lg:pb-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Text column */}
        <div>
          <h2 className="font-serif mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-[2.6rem] leading-snug sm:leading-tight lg:leading-[1.2] max-w-[540px] text-[var(--color-ink)] text-balance">
            {headline.map((segment, index) => (
              <span key={index} className={segment.italic ? "italic" : undefined}>
                {segment.text}
              </span>
            ))}
          </h2>

          <p className="max-w-[460px] text-body leading-relaxed text-[var(--color-body)] text-pretty">
            {subtext}
          </p>

          <Link
            href={ctaLink}
            className="mt-4 sm:mt-6 inline-flex items-center border-b border-[var(--color-ink)] text-xs sm:text-sm text-[var(--color-ink)] transition-opacity hover:opacity-70 min-h-[36px] w-fit tracking-wider"
          >
            {ctaText}
          </Link>
        </div>

        <ImageSlider images={images} />
      </div>
    </Section>
  );
}

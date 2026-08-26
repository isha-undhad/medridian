"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";

const AUTOPLAY_MS = 2500;

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
  { text: "Capturing love stories with " },
  { text: "editorial elegance", italic: true },
  { text: "." },
];

const defaultSubtext =
  "The little things really are the big things — and they deserve to be captured with care. Every glance, every quiet moment between vows, becomes part of a story worth preserving forever.";

const defaultImages = ["/home/about1.jpg", "/home/about2.jpeg", "/home/about3.jpg", "/home/about4.jpg"];

function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (isHovered || total <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((value) => (value + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isHovered, total, currentIndex]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-md lg:aspect-auto lg:h-[440px] lg:rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((src, index) => (
        <div
          key={src}
          aria-hidden={index !== currentIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Wedding photography, image ${index + 1} of ${total}`}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={`object-cover ${src === "/home/about4.jpg" ? "scale-110" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}

export default function IntroSection({
  headline = defaultHeadline,
  subtext = defaultSubtext,
  ctaText = "Wedding Experience",
  ctaLink = "/services",
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

          <p className="max-w-[460px] text-xs sm:text-sm lg:text-base leading-relaxed text-[var(--color-body)] text-pretty">
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

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const defaultPhrases = [
  { text: "FOLLOW ALONG ON INSTAGRAM", href: "https://instagram.com/meridianphotography", external: true },
  { text: "RESERVE YOUR DATE", href: "/contact", external: false },
  { text: "INQUIRE FOR 2026-2027", href: "/contact", external: false },
  { text: "DOCUMENTARY & EDITORIAL", href: "/portfolio", external: false },
  { text: "CALIFORNIA & WORLDWIDE", href: "/about", external: false },
  { text: "LET'S CREATE SOMETHING TIMELESS", href: "/contact", external: false },
];

export interface TextMarqueeProps {
  phrases?: typeof defaultPhrases;
  speedSeconds?: number;
  className?: string;
}

export default function TextMarquee({
  phrases = defaultPhrases,
  speedSeconds = 55,
  className,
}: TextMarqueeProps) {
  // Multiply phrases so the repeated track spans well beyond any ultra-wide screen width
  const repeatedTrack = useMemo(() => [...phrases, ...phrases, ...phrases, ...phrases], [phrases]);

  return (
    <aside
      aria-label="Announcements and navigation ticker"
      className={cn(
        "relative w-full overflow-hidden border-b border-[var(--color-line)] bg-white py-3 sm:py-3.5 select-none",
        className
      )}
    >
      <div className="flex w-full overflow-hidden">
        <div
          className="flex w-max shrink-0 items-center animate-marquee hover:[animation-play-state:paused]"
          style={{
            // @ts-expect-error -- custom CSS property for duration
            "--marquee-duration": `${speedSeconds}s`,
          }}
        >
          {repeatedTrack.map((item, index) => (
            <span key={`${item.text}-${index}`} className="flex items-center">
              {item.href ? (
                 <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="font-copperplate text-[10px] sm:text-[11px] md:text-xs text-[var(--color-ink)] uppercase transition-colors duration-300 hover:text-[var(--color-accent-ink)] whitespace-nowrap"
                >
                  {item.text}
                </Link>
              ) : (
                <span className="font-copperplate text-[10px] sm:text-[11px] md:text-xs text-[var(--color-ink)] uppercase whitespace-nowrap">
                  {item.text}
                </span>
              )}
              <span
                aria-hidden="true"
                className="mx-3.5 sm:mx-5 md:mx-7 text-[10px] sm:text-[11px] font-light text-[var(--color-muted)]/50 select-none"
              >
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

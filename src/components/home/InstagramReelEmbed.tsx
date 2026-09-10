"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

/**
 * ⚠️ CSS visual hack, not an official Instagram option: the oEmbed markup always
 * renders a fixed attribution header (avatar, username, "View profile" button,
 * "Original audio" line) above the video, with no supported way to disable it.
 * We crop it out by shifting the whole embed up inside an overflow-hidden tile
 * so only the video is visible. This is tied to Instagram's *current* embed
 * height/markup — if Instagram changes their embed layout, these pixel values
 * will need to be re-measured and adjusted.
 *
 * Tune by eye against the live embed: increase a value if a sliver of the
 * header is still peeking through, decrease it if the video gets cropped from
 * the bottom instead.
 */
const HEADER_CROP_OFFSET_PX = {
  base: 60, // below `md` — mobile/tablet embed renders a shorter header
  md: 78, // `md` and up — desktop embed renders a taller header
};

// Matches Tailwind's default `md` breakpoint, used to pick which offset above applies.
const MD_BREAKPOINT_QUERY = "(min-width: 768px)";

type InstagramReelEmbedProps = {
  /** Full Instagram post/reel permalink, e.g. https://www.instagram.com/reel/XXXX/ */
  permalink: string;
  className?: string;
};

/**
 * Renders a live Instagram embed via Instagram's official oEmbed method:
 * a blockquote.instagram-media processed by the https://www.instagram.com/embed.js script.
 */
export default function InstagramReelEmbed({ permalink, className }: InstagramReelEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MD_BREAKPOINT_QUERY);
    setIsDesktop(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const cropOffsetPx = isDesktop ? HEADER_CROP_OFFSET_PX.md : HEADER_CROP_OFFSET_PX.base;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-[var(--color-line)]/20"
        />
      )}

      {/* Shifted up by cropOffsetPx so the parent's overflow-hidden clips
          Instagram's attribution header above the visible tile; height is
          padded by the same amount so the video still fills to the bottom. */}
      <div
        className="absolute inset-x-0"
        style={{
          top: -cropOffsetPx,
          height: `calc(100% + ${cropOffsetPx}px)`,
        }}
      >
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={permalink}
          data-instgrm-version="14"
          style={{ margin: 0, width: "100%", height: "100%" }}
        />
      </div>

      <Script
        id="instagram-embed-script"
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.instgrm?.Embeds.process();
          setIsLoaded(true);
        }}
      />
    </div>
  );
}

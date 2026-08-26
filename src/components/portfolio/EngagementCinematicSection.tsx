"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp, scaleIn } from "@/lib/motion";

export type EngagementCinematicSectionProps = {
  /** Vimeo embed URL, full query string and all. */
  videoUrl?: string;
  /** Root-relative path under /public — the secondary editorial photo. */
  image?: string;
  imageAlt?: string;
  className?: string;
};

export default function EngagementCinematicSection({
  videoUrl = "https://player.vimeo.com/video/1154346909?title=0&byline=0&portrait=0&controls=1&autopause=0&autoplay=true",
  image = "/home/catagory3.jpg",
  imageAlt = "Bride and groom kissing on garden steps at golden hour, surrounded by white floral arrangements",
  className = "mt-10 lg:mt-14",
}: EngagementCinematicSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const togglePlayPause = () => {
    if (!iframeRef.current?.contentWindow) return;

    if (isPlaying) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ method: "pause" }),
        "*"
      );
      setIsPlaying(false);
    } else {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ method: "play" }),
        "*"
      );
      setIsPlaying(true);
    }
  };

  return (
    <div className={className}>
      <Reveal variants={fadeUp} className="flex flex-col items-start gap-4">
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
          The Art of the Moment
        </span>
        <h2 className="font-serif text-3xl leading-[1.1] text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
          Cinematic Stories
        </h2>
        <p className="max-w-md text-base leading-relaxed text-[var(--color-muted)]">
          A collection of moments, beautifully remembered.
        </p>
      </Reveal>

      <div className="relative mt-12 flex flex-col gap-4 sm:flex-row lg:mt-16 lg:block lg:h-[480px]">
        {/* Video — maintains exact 16:9 aspect-ratio to eliminate black bars on left/right */}
        <Reveal
          variants={scaleIn}
          className="group relative aspect-video w-full overflow-hidden rounded-sm bg-black sm:w-[68%] lg:absolute lg:top-0 lg:right-0 lg:aspect-video lg:h-auto lg:w-[68%]"
        >
          <iframe
            ref={iframeRef}
            src={videoUrl}
            title="Meridian engagement film"
            className="absolute inset-0 h-full w-full object-cover scale-[1.01]"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />

          {/* Full Video Click & Play/Pause Overlay */}
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/15 focus:outline-none"
          >
            {/* Center Circular Play/Pause Icon Button */}
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full bg-black/75 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/90 ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 fill-white text-white" />
              ) : (
                <Play className="ml-1 h-7 w-7 fill-white text-white" />
              )}
            </div>
          </button>
        </Reveal>

        {/* Secondary Editorial Photo — Overlaps bottom-left corner */}
        <Reveal
          variants={scaleIn}
          delay={0.12}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-sm ring-4 ring-[var(--color-bg)] sm:w-[42%] lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:aspect-auto lg:h-[65%] lg:w-[38%]"
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

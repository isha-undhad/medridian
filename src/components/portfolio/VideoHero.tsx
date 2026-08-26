"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export type VideoHeroProps = {
  src: string;
  poster?: string;
  credit: string;
  names: string;
  location: string;
};

export default function VideoHero({ src, poster, credit, names, location }: VideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative aspect-video w-full overflow-hidden bg-black md:aspect-[16/10]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Your browser doesn&apos;t support embedded video.
      </video>

      <span className="absolute top-4 left-4 z-10 bg-black/80 px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] text-white uppercase sm:top-6 sm:left-6">
        {credit}
      </span>

      <button
        type="button"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 sm:top-6 sm:right-6"
      >
        {isPlaying ? (
          <>
            <Pause className="h-4 w-4 fill-white text-white" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
            <span>Play</span>
          </>
        )}
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent px-4 pt-20 pb-16 sm:px-6 sm:pb-20">
        <h1 className="font-serif text-heading text-balance tracking-wide text-white uppercase">
          {names}
        </h1>
        <p className="mt-1 text-xs sm:text-sm tracking-[0.15em] text-white/90 uppercase">
          {location}
        </p>
      </div>
    </section>
  );
}

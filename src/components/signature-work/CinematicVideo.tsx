"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export type CinematicVideoProps = {
  /** Root-relative path under /public. Optional on purpose: no local video
   * file exists in this repo yet (the real site only embeds Vimeo iframes,
   * which can't be driven by a native <video> element), so there's no safe
   * default to fall back to. Left unset, the <video> renders with no
   * `src` — showing just `poster` — rather than pointing at a file that
   * doesn't exist. Pass a real path, e.g. "/videos/engagements-reel.mp4",
   * once one is added. */
  videoSrc?: string;
  /** Poster frame shown before playback / whenever videoSrc is omitted. */
  poster?: string;
};

/**
 * Full-width native-video block — autoplaying, looping, muted, no default
 * browser chrome — with a minimal circular play/pause button that only
 * shows on hover in the bottom-right corner. Section A of the
 * Engagements-only content in <Portfolio>; always rendered above, and
 * separate from, <CinematicPhotoGrid />.
 */
export default function CinematicVideo({ videoSrc, poster }: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
          The Art of the Moment
        </span>
        <h3 className="font-serif text-3xl text-[var(--color-ink)] sm:text-4xl">Cinematic Stories</h3>
        <p className="text-body text-[var(--color-muted)]">
          Motion, shot the same way we shoot stills — quietly, and up close.
        </p>
      </div>

      <div className="group relative mt-8 aspect-video w-full overflow-hidden rounded-md bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--color-ink)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
        </button>
      </div>
    </div>
  );
}

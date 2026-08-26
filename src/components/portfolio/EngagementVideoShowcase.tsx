"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export type EngagementVideoShowcaseProps = {
  videoUrl?: string;
  backgroundImage?: string;
};

export default function EngagementVideoShowcase({
  videoUrl = "https://player.vimeo.com/video/1154346909?title=0&byline=0&portrait=0&controls=1&autopause=0&autoplay=1",
  backgroundImage,
}: EngagementVideoShowcaseProps) {
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
    <section
      className="w-full bg-[#f4f2ec] bg-cover bg-center py-16 md:py-24"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="flex w-full items-center justify-center px-4 md:px-8">
        <div className="group relative aspect-video w-full max-w-5xl overflow-hidden rounded-md bg-black shadow-2xl">
          <iframe
            ref={iframeRef}
            src={videoUrl}
            title="Engagement film"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />

          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/15 focus:outline-none"
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full bg-black/75 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/90 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 fill-white text-white" />
              ) : (
                <Play className="ml-1 h-7 w-7 fill-white text-white" />
              )}
            </div>

            <span className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/75 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-black hover:scale-105">
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-white text-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-white text-white" />
                  <span>Play</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

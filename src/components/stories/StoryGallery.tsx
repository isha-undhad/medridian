"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import type { StoryImageItem } from "./StoriesData";

export interface StoryGalleryProps {
  images: StoryImageItem[];
  coupleNames: string;
}

type GalleryBlock =
  | { type: "single"; image: StoryImageItem; index: number }
  | { type: "pair"; images: [StoryImageItem, StoryImageItem]; indices: [number, number] };

export default function StoryGallery({ images, coupleNames }: StoryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Group into alternating rhythmic pattern: 1 image -> 2 images -> 1 image -> 2 images
  const blocks = useMemo(() => {
    const result: GalleryBlock[] = [];
    let i = 0;
    let isSingle = true;

    while (i < images.length) {
      if (isSingle || i === images.length - 1) {
        result.push({
          type: "single",
          image: images[i],
          index: i,
        });
        i += 1;
        isSingle = false;
      } else {
        result.push({
          type: "pair",
          images: [images[i], images[i + 1]],
          indices: [i, i + 1],
        });
        i += 2;
        isSingle = true;
      }
    }

    return result;
  }, [images]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  if (!images.length) {
    return (
      <div className="py-16 text-center text-sm text-[var(--color-muted)]">
        No gallery photos found for this story.
      </div>
    );
  }

  return (
    <>
      {/* Mixed Masonry-Style Editorial Stream with tight 2-3px gap */}
      <div className="flex flex-col gap-[2px] sm:gap-[3px] w-full">
        {blocks.map((block) => {
          if (block.type === "single") {
            const { image, index } = block;
            return (
              <Reveal
                key={`single-${image.src}-${index}`}
                variants={fadeUp}
                delay={0.05}
                className="w-full"
              >
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View photo ${index + 1} of ${images.length} from ${coupleNames}'s wedding`}
                  className="relative block w-full overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden bg-[var(--color-line)]/15">
                    <Image
                      src={image.src}
                      alt={image.alt || `${coupleNames} Wedding Story Photo ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover object-center"
                      loading={index < 3 ? "eager" : "lazy"}
                      priority={index < 2}
                    />
                  </div>
                </button>
              </Reveal>
            );
          }

          // Pair of 2 images side-by-side (50/50 split on tablet/desktop, collapses to 1 column on mobile)
          const [img1, img2] = block.images;
          const [idx1, idx2] = block.indices;

          return (
            <Reveal
              key={`pair-${img1.src}-${idx1}`}
              variants={fadeUp}
              delay={0.05}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] sm:gap-[3px] w-full">
                {/* Left image of pair */}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedIndex(idx1)}
                  aria-label={`View photo ${idx1 + 1} of ${images.length} from ${coupleNames}'s wedding`}
                  className="relative block w-full h-[340px] sm:h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-line)]/15"
                >
                  <Image
                    src={img1.src}
                    alt={img1.alt || `${coupleNames} Wedding Story Photo ${idx1 + 1}`}
                    fill
                    sizes="(min-width: 1024px) 448px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </button>

                {/* Right image of pair */}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedIndex(idx2)}
                  aria-label={`View photo ${idx2 + 1} of ${images.length} from ${coupleNames}'s wedding`}
                  className="relative block w-full h-[340px] sm:h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-line)]/15"
                >
                  <Image
                    src={img2.src}
                    alt={img2.alt || `${coupleNames} Wedding Story Photo ${idx2 + 1}`}
                    fill
                    sizes="(min-width: 1024px) 448px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleClose}
              aria-label="Close image preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full bg-black/30 hover:bg-black/60 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-6 sm:top-7 sm:left-8 z-10 text-xs sm:text-sm font-medium tracking-widest text-white/70 uppercase">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Prev Navigation Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 z-10 p-2.5 sm:p-3 text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full bg-black/30 hover:bg-black/60 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            {/* Main Lightbox Image */}
            <div
              className="relative max-h-[88vh] max-w-[92vw] h-[85vh] w-[90vw] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={`${coupleNames} photo ${selectedIndex + 1}`}
                fill
                priority
                sizes="95vw"
                className="object-contain"
              />
            </div>

            {/* Next Navigation Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 z-10 p-2.5 sm:p-3 text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full bg-black/30 hover:bg-black/60 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

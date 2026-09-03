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

/**
 * Seeded 32-bit pseudo-random number generator (Mulberry32).
 * Ensures deterministic, layout-shift-free random distributions across SSR and hydration.
 */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Converts a string into a deterministic 32-bit integer seed.
 */
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
}

/**
 * Generates an organic, pseudo-random sequence of row sizes (1 or 2 images per row).
 *
 * Hard Constraints:
 * 1. Two 1-image rows must NEVER appear back-to-back (no adjacent 1s).
 * 2. Sum of row counts strictly equals totalImages.
 * 3. Seeded generation prevents re-render layout shifts and hydration mismatches.
 */
function generateRowPattern(totalImages: number, seed: number): (1 | 2)[] {
  if (totalImages <= 0) return [];
  if (totalImages === 1) return [1];
  if (totalImages === 2) return [2];

  const rng = mulberry32(seed);

  function generate(
    remaining: number,
    consecutiveTwos: number,
    prevWasOne: boolean
  ): (1 | 2)[] | null {
    if (remaining === 0) return [];
    if (remaining === 1) {
      // If previous was 1, we cannot have another 1 (violates no-adjacent-1s rule)
      if (prevWasOne) return null;
      return [1];
    }
    if (remaining === 2) {
      // Single pair of 2 is always valid
      return [2];
    }
    if (remaining === 3) {
      // [2, 1] is always valid; [1, 2] is only valid if previous was not 1
      if (prevWasOne) return [2, 1];
      return rng() < 0.5 ? [2, 1] : [1, 2];
    }

    // If previous row was a 1, current row MUST be a 2
    if (prevWasOne) {
      const rest = generate(remaining - 2, 1, false);
      if (rest !== null) return [2, ...rest];
      return null;
    }

    // Organic weighting: naturally balance pairs and singles while avoiding long monotonous runs
    let probOne = 0.35;
    if (consecutiveTwos === 2) probOne = 0.65;
    else if (consecutiveTwos >= 3) probOne = 0.9;

    const firstChoice: 1 | 2 = rng() < probOne ? 1 : 2;
    const secondChoice: 1 | 2 = firstChoice === 1 ? 2 : 1;

    for (const choice of [firstChoice, secondChoice]) {
      const nextConsecutiveTwos = choice === 2 ? consecutiveTwos + 1 : 0;
      const rest = generate(
        remaining - choice,
        nextConsecutiveTwos,
        choice === 1
      );
      if (rest !== null) {
        return [choice, ...rest];
      }
    }

    return null;
  }

  return generate(totalImages, 0, false) || [2];
}

export default function StoryGallery({ images, coupleNames }: StoryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Group images into an organic, pseudo-randomized sequence of 1s and 2s
  // Hard constraint: No two 1-image rows can ever appear back-to-back.
  // Seeded per story to eliminate layout shift on re-render / lightbox open.
  const blocks = useMemo(() => {
    if (!images.length) return [];

    const seed = stringToSeed(
      `${coupleNames}-${images.length}-${images[0]?.src || ""}`
    );
    const pattern = generateRowPattern(images.length, seed);

    const result: GalleryBlock[] = [];
    let imgIdx = 0;

    for (const count of pattern) {
      if (count === 1) {
        result.push({
          type: "single",
          image: images[imgIdx],
          index: imgIdx,
        });
        imgIdx += 1;
      } else {
        result.push({
          type: "pair",
          images: [images[imgIdx], images[imgIdx + 1]],
          indices: [imgIdx, imgIdx + 1],
        });
        imgIdx += 2;
      }
    }

    return result;
  }, [images, coupleNames]);

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
      {/* Mixed Masonry-Style Editorial Stream with uniform hairline 2-3px gap */}
      <div className="flex flex-col gap-[2px] sm:gap-[3px] w-full">
        {blocks.map((block) => {
          if (block.type === "single") {
            const { image, index } = block;
            const isLandscape = image.width > image.height;

            return (
              <Reveal
                key={`single-${image.src}-${index}`}
                variants={fadeUp}
                delay={0.04}
                className="w-full"
              >
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View photo ${index + 1} of ${images.length} from ${coupleNames}'s wedding`}
                  className="group relative block w-full overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-[var(--color-line)]/15 ${
                      isLandscape
                        ? "aspect-[16/10]"
                        : "aspect-[4/5] max-h-[85vh]"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || `${coupleNames} Wedding Story Photo ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index < 2}
                    />
                  </div>
                </button>
              </Reveal>
            );
          }

          // Pair of 2 images side-by-side:
          // Consistent 2-column grid across ALL devices (mobile, tablet, laptop, desktop)
          const [img1, img2] = block.images;
          const [idx1, idx2] = block.indices;

          const isLand1 = img1.width > img1.height;
          const isLand2 = img2.width > img2.height;

          // Proportional aspect ratio computed to keep the row flush:
          // Both portrait: aspect-[3/4]
          // Both landscape: aspect-[4/3]
          // Mixed: aspect-[4/5]
          const pairAspect =
            !isLand1 && !isLand2
              ? "aspect-[3/4]"
              : isLand1 && isLand2
              ? "aspect-[4/3]"
              : "aspect-[4/5]";

          return (
            <Reveal
              key={`pair-${img1.src}-${idx1}`}
              variants={fadeUp}
              delay={0.04}
              className="w-full"
            >
              <div className="grid grid-cols-2 gap-[2px] sm:gap-[3px] w-full">
                {/* Left image of pair */}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedIndex(idx1)}
                  aria-label={`View photo ${idx1 + 1} of ${images.length} from ${coupleNames}'s wedding`}
                  className="group relative block w-full overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  <div className={`relative w-full ${pairAspect} overflow-hidden bg-[var(--color-line)]/15`}>
                    <Image
                      src={img1.src}
                      alt={img1.alt || `${coupleNames} Wedding Story Photo ${idx1 + 1}`}
                      fill
                      sizes="(min-width: 1024px) 448px, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </button>

                {/* Right image of pair */}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedIndex(idx2)}
                  aria-label={`View photo ${idx2 + 1} of ${images.length} from ${coupleNames}'s wedding`}
                  className="group relative block w-full overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  <div className={`relative w-full ${pairAspect} overflow-hidden bg-[var(--color-line)]/15`}>
                    <Image
                      src={img2.src}
                      alt={img2.alt || `${coupleNames} Wedding Story Photo ${idx2 + 1}`}
                      fill
                      sizes="(min-width: 1024px) 448px, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
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

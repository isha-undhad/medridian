"use client";

import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, TouchEvent as ReactTouchEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = { src: string; alt: string };

export interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Reusable full-screen lightbox: dark overlay, un-cropped (object-contain)
 * image, close button, prev/next arrows, and a "01 / 10" counter. Shared
 * across grids/marquees so this behavior isn't reimplemented per component.
 */
export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const image = open ? images[index] : null;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, onPrev, onNext]);

  const handleTouchStart = useCallback((event: ReactTouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);
  const handleTouchEnd = useCallback(
    (event: ReactTouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
      if (delta > 50) onPrev();
      else if (delta < -50) onNext();
      touchStartX.current = null;
    },
    [onPrev, onNext]
  );

  const arrowClass =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white";

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white sm:top-6 sm:right-6"
          >
            <X className="h-6 w-6" strokeWidth={1.25} />
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            className={`${arrowClass} left-2 sm:left-6`}
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className={`${arrowClass} right-2 sm:right-6`}
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1.25} />
          </button>

          <motion.div
            key={`${image.src}-${index}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-[80vh] w-[88vw] max-w-5xl sm:h-[85vh]"
          >
            <Image src={image.src} alt={image.alt} fill sizes="88vw" className="object-contain" />
          </motion.div>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium tracking-[0.3em] text-white/70">
            {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

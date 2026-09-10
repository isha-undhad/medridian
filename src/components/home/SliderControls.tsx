"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type SliderControlsProps = {
  /** 0-indexed current slide. */
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

// Circular frosted-glass button: a semi-transparent dark disc + blur so the
// thin chevron reads clearly against any photo.
// z-30 keeps the arrows permanently static on top of all sliding images (which use z-10 and z-20).
const arrowButtonClasses =
  "group absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-[6px] transition-colors duration-300 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:h-12 md:w-12 cursor-pointer select-none";

export default function SliderControls({ onPrev, onNext }: SliderControlsProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={onPrev}
        className={`${arrowButtonClasses} left-4 md:left-6`}
        // Browser extensions (e.g. password managers/autofill) inject
        // attributes like `fdprocessedid` onto this button after hydration,
        // which React flags as a mismatch even though it's not caused by our
        // code. Scoped to just this element — see HeroSlider hydration note.
        suppressHydrationWarning
      >
        <ChevronLeft
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5 md:h-6 md:w-6"
          strokeWidth={1.5}
        />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={onNext}
        className={`${arrowButtonClasses} right-4 md:right-6`}
        // See suppressHydrationWarning note on the "Previous slide" button above.
        suppressHydrationWarning
      >
        <ChevronRight
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 md:h-6 md:w-6"
          strokeWidth={1.5}
        />
      </button>
    </>
  );
}

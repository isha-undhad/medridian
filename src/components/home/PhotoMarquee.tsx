"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Camera/shoot prefix from a filename (e.g. "3B4A1148" → "3B4A", "TDS_0579"
 * → "TDS") — photos from the same wedding are shot on the same camera body
 * in one burst, so this prefix is a reasonable stand-in for "same shoot"
 * grouping. Strips the extension and trailing digits (with an optional
 * underscore before them). */
function shootGroupOf(image: MarqueeImage): string {
  const base = image.src.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "") ?? image.src;
  return base.match(/^(.*?)_?\d+$/)?.[1] ?? base;
}

function shuffleArr<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Randomizes `images`, keeping same-shoot photos apart so no two adjacent
 * tiles come from the same shoot — checked circularly, since the marquee
 * loops (the doubled track's seam is the last tile meeting the first).
 *
 * Pass 1 is the standard "most-remaining-group-first" reorganize (grouping
 * items by shootGroupOf, then repeatedly placing from whichever remaining
 * group is largest and isn't the previous tile's group) — guaranteed
 * clash-free as a linear sequence whenever no group exceeds half the total
 * (true here: largest shoot group is 4 of 10).
 *
 * Pass 1 alone can still end on the same group it started with, which the
 * linear guarantee doesn't cover but the marquee's loop makes adjacent; pass
 * 2 repairs just that one wraparound seam with a single swap. */
function shuffleAvoidingAdjacentShoots(images: MarqueeImage[]): MarqueeImage[] {
  const groupsMap = new Map<string, MarqueeImage[]>();
  for (const image of images) {
    const group = shootGroupOf(image);
    const bucket = groupsMap.get(group);
    if (bucket) bucket.push(image);
    else groupsMap.set(group, [image]);
  }
  const buckets = shuffleArr([...groupsMap.entries()]).map(([group, items]) => ({
    group,
    items: shuffleArr(items),
    idx: 0,
  }));

  const n = images.length;
  const placed: { group: string; image: MarqueeImage }[] = [];
  for (let pos = 0; pos < n; pos++) {
    const lastGroup = pos > 0 ? placed[pos - 1].group : null;
    const candidates = buckets
      .filter((b) => b.idx < b.items.length && b.group !== lastGroup)
      .sort((a, b) => b.items.length - b.idx - (a.items.length - a.idx));
    const pick = candidates[0] ?? buckets.find((b) => b.idx < b.items.length)!;
    placed.push({ group: pick.group, image: pick.items[pick.idx] });
    pick.idx++;
  }

  const groupAt = (i: number) => placed[i].group;
  if (n > 2 && groupAt(0) === groupAt(n - 1)) {
    for (let k = 1; k < n - 1; k++) {
      const movingGroup = groupAt(k);
      if (movingGroup === groupAt(0)) continue;
      const wouldClashAtK = movingGroup === groupAt(n - 2);
      const displacedGroup = groupAt(n - 1);
      const wouldClashAtEnd = displacedGroup === groupAt(k - 1) || displacedGroup === groupAt(k + 1);
      if (wouldClashAtK || wouldClashAtEnd) continue;
      [placed[k], placed[n - 1]] = [placed[n - 1], placed[k]];
      break;
    }
  }

  return placed.map((p) => p.image);
}

export type MarqueeCategory = "ceremony" | "portrait" | "detail" | "candid" | "venue";

export type MarqueeImage = {
  src: string;
  alt: string;
  category: MarqueeCategory;
  /** Renders desaturated — for the editorial black & white / warm-color mix. */
  grayscale?: boolean;
};

export interface PhotoMarqueeProps {
  images?: MarqueeImage[];
  /** Seconds for one full loop of the doubled track — lower is faster.
   * Deliberately slow by default (a 24-image, 48-tile track) so it reads as
   * ambient motion rather than a ticker. */
  speed?: number;
  /** Tailwind height classes for each tile, in dvh (not vh) so it's accurate
   * on mobile browsers with a collapsing address bar. */
  heightClassName?: string;
  /** Extra classes merged onto the section's default `my-16 md:my-24`
   * (via tailwind-merge, so e.g. `mb-0 md:mb-0` cleanly cancels the bottom
   * half). Use when the next section already supplies its own top padding —
   * a shared <Section> component's `py-*`, say — so the two don't stack
   * into a double gap. */
  className?: string;
}

/**
 * 24 unique real photos from /public/home/autoslider (1.jpg..24.jpg, mixed
 * .jpg/.jpeg extensions — listed explicitly rather than assuming a uniform
 * pattern). Alt text and category were written by actually looking at each
 * photo, not guessed from the filename. Several of these are already
 * black-and-white as shot — that real mix is what gives the "editorial B&W
 * + warm color" look, so `grayscale` isn't used to force any color photo
 * into mono here; it stays available on the type for future images that
 * need it.
 *
 * Natural category counts from these particular 24 photos: ceremony 5,
 * portrait 5, detail 4, candid 7, venue 3 — candid runs a bit heavier than
 * the brief's 4-5 suggestion because that's genuinely what's in the set
 * (reception/toast/cake moments); tagged for what each photo actually is
 * rather than force-fit to match the target split.
 */
const defaultImages: MarqueeImage[] = [
  { src: "/image/portfolio_slider/2X7A2999.jpg", alt: "Wedding photography", category: "candid" },
  { src: "/image/portfolio_slider/2X7A4249.jpg", alt: "Wedding photography", category: "portrait" },
  { src: "/image/portfolio_slider/3B4A1148.jpg", alt: "Wedding photography", category: "ceremony" },
  { src: "/image/portfolio_slider/3B4A3505.jpg", alt: "Wedding photography", category: "detail" },
  { src: "/image/portfolio_slider/3B4A3596.jpg", alt: "Wedding photography", category: "venue" },
  { src: "/image/portfolio_slider/3B4A3756.jpg", alt: "Wedding photography", category: "candid" },
  { src: "/image/portfolio_slider/ANK_4543.jpg", alt: "Wedding photography", category: "portrait" },
  { src: "/image/portfolio_slider/TDS_0579.jpg", alt: "Wedding photography", category: "ceremony" },
  { src: "/image/portfolio_slider/TDS_0628.jpg", alt: "Wedding photography", category: "detail" },
  { src: "/image/portfolio_slider/TDS_2027.jpg", alt: "Wedding photography", category: "candid" },
];

// Width only — height comes from the `heightClassName` prop so it can be
// swapped to dvh (or any other unit) without touching this constant.
const TILE_WIDTH_CLASS = "w-[92vw] shrink-0 sm:w-[50vw] lg:w-[33.334vw] xl:w-[25vw]";

function MarqueeTile({
  image,
  priority,
  heightClassName,
  onOpen,
}: {
  image: MarqueeImage;
  priority: boolean;
  heightClassName: string;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      suppressHydrationWarning
      aria-label={`View larger: ${image.alt}`}
      className={cn(
        "relative block shrink-0 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70",
        heightClassName,
        TILE_WIDTH_CLASS
      )}
    >
      <div className={cn("relative w-full overflow-hidden", heightClassName)}>
        {/* Shimmer placeholder, visible until the real image finishes loading. */}
        <div
          aria-hidden
          className={`absolute inset-0 animate-pulse bg-[var(--color-line)] transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"
            }`}
        />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 34vw, (min-width: 640px) 50vw, 92vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${image.grayscale ? "grayscale" : ""
            }`}
        />
      </div>
    </button>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: MarqueeImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const image = images[index];

  useEffect(() => {
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
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (event: ReactTouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (delta > 50) onPrev();
    else if (delta < -50) onNext();
    touchStartX.current = null;
  };

  const arrowClass =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white";

  return (
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
        aria-label="Previous photo in gallery"
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
        aria-label="Next photo in gallery"
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
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="88vw"
          className={`object-contain ${image.grayscale ? "grayscale" : ""}`}
        />
      </motion.div>

      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium tracking-[0.3em] text-white/70">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export default function PhotoMarquee({
  images = defaultImages,
  speed = 80,
  heightClassName = "h-[45dvh] md:h-[55dvh]",
  className,
}: PhotoMarqueeProps) {
  const [hovered, setHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Randomize once per page load, client-side only — starts `null` so the
  // server render and the client's pre-hydration render both use `images` in
  // its original order (identical output, no hydration mismatch), then the
  // effect below shuffles right after mount. Same pattern as PortfolioGrid.
  const [shuffled, setShuffled] = useState<MarqueeImage[] | null>(null);
  useEffect(() => {
    setShuffled(shuffleAvoidingAdjacentShoots(images));
  }, [images]);
  const orderedImages = shuffled ?? images;

  // Doubled track for the seamless loop: translating the whole track by
  // exactly -50% during the animation snaps back to an identical-looking
  // frame, since the second half is a duplicate of the first.
  const trackImages = useMemo(() => [...orderedImages, ...orderedImages], [orderedImages]);

  const openAt = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((current) =>
        current === null ? null : (current - 1 + orderedImages.length) % orderedImages.length,
      ),
    [orderedImages.length],
  );
  const next = useCallback(
    () => setLightboxIndex((current) => (current === null ? null : (current + 1) % orderedImages.length)),
    [orderedImages.length],
  );

  // Paused for two independent reasons — hovering the strip, or the
  // lightbox being open — so this is plain component state rather than a
  // CSS-only `group-hover:` rule (which can't see the lightbox's React state).
  const paused = hovered || lightboxIndex !== null;

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" && lightboxIndex !== null) prev();
    if (event.key === "ArrowRight" && lightboxIndex !== null) next();
  };

  return (
    <section
      className={cn("relative w-full overflow-x-hidden", heightClassName, className)}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn("flex w-full", heightClassName)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn("animate-marquee flex items-stretch", heightClassName)}
          style={{
            // @ts-expect-error -- custom property, not a known CSS key
            "--marquee-duration": `${speed}s`,
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {trackImages.map((image, index) => (
            <MarqueeTile
              key={`${image.src}-${index}`}
              image={image}
              priority={index < 4}
              heightClassName={heightClassName}
              onOpen={() => openAt(index % orderedImages.length)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <Lightbox images={orderedImages} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/**
 * Example usage — drop straight into a page, right after the Photographer
 * info/About section (the mt-16 md:mt-24 built into the section handles the
 * spacing itself — no wrapper needed):
 *
 *   import PhotoMarquee from "@/components/home/PhotoMarquee";
 *
 *   // Zero-config: renders with the 24-photo default set above, 80s loop, 70/80dvh.
 *   <PhotoMarquee />
 *
 *   // Faster scroll, shorter strip, custom image set:
 *   <PhotoMarquee
 *     speed={65}
 *     heightClassName="h-[60dvh] md:h-[70dvh]"
 *     images={[
 *       { src: "/home/autoslider/1.jpg", alt: "...", category: "ceremony" },
 *       { src: "/home/autoslider/2.jpeg", alt: "...", category: "portrait", grayscale: true },
 *       // ...
 *     ]}
 *   />
 */

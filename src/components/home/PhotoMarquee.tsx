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
  { src: "/home/autoslider/1.jpg", alt: "Bride and groom embracing in a glass conservatory doorway framed by palms and stone statues", category: "ceremony" },
  { src: "/home/autoslider/2.jpeg", alt: "Wedding guests cheering and clapping at the reception table", category: "candid" },
  { src: "/home/autoslider/3.jpg", alt: "Bride and groom walking the grounds of a stone castle, viewed from behind", category: "venue" },
  { src: "/home/autoslider/4.jpg", alt: "Bride and groom holding hands walking through a grand hall past a green velvet curtain", category: "portrait" },
  { src: "/home/autoslider/5.jpeg", alt: "Bride and groom pausing by a tall arched window in a gilded room", category: "portrait" },
  { src: "/home/autoslider/6.jpg", alt: "Reception table setting with pink garden roses, candlelight, and place settings", category: "detail" },
  { src: "/home/autoslider/7.jpg", alt: "Bride and groom embracing at golden hour with sunlight breaking through the trees", category: "ceremony" },
  { src: "/home/autoslider/8.jpeg", alt: "Wedding party laughing and running together across the lawn, one guest piggybacking", category: "candid" },
  { src: "/home/autoslider/9.jpg", alt: "Close-up of the bride's hand resting on the groom's tuxedo, wedding rings visible, in black and white", category: "detail" },
  { src: "/home/autoslider/10.jpeg", alt: "Bride holding a white bouquet in a green-walled room beside a fireplace", category: "portrait" },
  { src: "/home/autoslider/11.jpg", alt: "Bride and groom laughing together at the dinner table with champagne", category: "candid" },
  { src: "/home/autoslider/12.jpeg", alt: "Bride and groom celebrating beside their \"Just Married\" cake, in black and white", category: "candid" },
  { src: "/home/autoslider/13.jpg", alt: "Aperol spritz cocktails being poured for guests at an outdoor reception", category: "detail" },
  { src: "/home/autoslider/14.jpeg", alt: "Groom kneeling to kiss the bride's hand on sunlit garden steps, on film", category: "ceremony" },
  { src: "/home/autoslider/15.jpeg", alt: "Bride and groom running and laughing across the lawn, in black and white", category: "candid" },
  { src: "/home/autoslider/16.jpeg", alt: "Close-up portrait of the bride in dramatic light, in black and white", category: "portrait" },
  { src: "/home/autoslider/17.jpg", alt: "Groom sipping champagne at an outdoor reception, in black and white", category: "candid" },
  { src: "/home/autoslider/18.jpg", alt: "Couple kissing on a gondola on the river beneath the Ponte Vecchio in Florence", category: "venue" },
  { src: "/home/autoslider/19.jpeg", alt: "Groom seated on a windowsill in his tuxedo, in black and white", category: "portrait" },
  { src: "/home/autoslider/20.jpg", alt: "Bride feeding the groom a bite of wedding cake, on film", category: "detail" },
  { src: "/home/autoslider/21.jpg", alt: "Bride and groom embracing beside a tiered wedding cake, in black and white", category: "candid" },
  { src: "/home/autoslider/22.jpg", alt: "Bride and groom kissing on the steps of a grand hotel entrance, on film", category: "ceremony" },
  { src: "/home/autoslider/23.jpg", alt: "Bride and groom walking beside a lake at dusk, in black and white", category: "venue" },
  { src: "/home/autoslider/24.jpg", alt: "Bride and groom by a rustic garden gate at golden hour, on film", category: "ceremony" },
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
      className={`relative block ${heightClassName} ${TILE_WIDTH_CLASS} cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70`}
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Shimmer placeholder, visible until the real image finishes loading. */}
        <div
          aria-hidden
          className={`absolute inset-0 animate-pulse bg-[var(--color-line)] transition-opacity duration-300 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 34vw, (min-width: 640px) 50vw, 92vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${
            image.grayscale ? "grayscale" : ""
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
  heightClassName = "h-[70dvh] md:h-[80dvh]",
  className,
}: PhotoMarqueeProps) {
  const [hovered, setHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Doubled track for the seamless loop: translating the whole track by
  // exactly -50% during the animation snaps back to an identical-looking
  // frame, since the second half is a duplicate of the first.
  const trackImages = useMemo(() => [...images, ...images], [images]);

  const openAt = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setLightboxIndex((current) => (current === null ? null : (current + 1) % images.length)),
    [images.length],
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
    // my-* (not py-*) on purpose — the brief wants visible separation from
    // the sections above and below without adding padding *inside* this section, since
    // the strip itself must stay full-bleed with nothing but the track in it.
    <section
      className={cn("relative my-16 w-full overflow-x-hidden md:my-24", className)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="animate-marquee flex"
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
              onOpen={() => openAt(index % images.length)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <Lightbox images={images} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
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

import type { Tone } from "./portfolio";

export type HeroSlide = {
  id: string;
  tone: Tone;
  alt: string;
  /** Real photo in /public, relative to the public root (e.g. "/home/slider1.jpeg").
   * When present, this renders via next/image instead of the gradient
   * PlaceholderMedia — no gradient tone or diagonal texture behind it. */
  src?: string;
  /** Tailwind `object-[...]` class biasing the object-cover crop toward
   * where the subject actually sits in that specific photo — most of these
   * source photos are portrait-oriented, so a plain center crop on a
   * full-bleed landscape hero can cut the couple out of frame entirely.
   * Defaults to "object-center" when omitted. */
  objectPositionClass?: string;
  /** Raw CSS `object-position` value (e.g. "center 68%") for finer control
   * than `objectPositionClass`'s keyword classes allow — takes precedence
   * over it when set. Use when a photo's subject sits at a specific point
   * that "top"/"center"/"bottom" can't target precisely (e.g. a group shot
   * clustered low in the frame with a lot of sky above). */
  objectPosition?: string;
};

/** 4 slides for the home page hero slider, all backed by real photos in /public.
 * All four source photos are portrait-oriented — full-bleed `object-cover`
 * on a wide hero will always crop some of their top/bottom away;
 * `objectPositionClass` below keeps the couple in frame rather than
 * cropping into empty sky/grass. */
export const heroSlides: HeroSlide[] = [
  {
    id: "h1",
    tone: "dusk",
    alt: "Bride and groom wedding photograph 1",
    src: "/image/home_slider/home 01_.jpg",
    // Close-up beach embrace — subject already spans nearly the full frame
    // height, so a plain center crop keeps both faces in view.
    objectPositionClass: "object-center",
  },
  {
    id: "h2",
    tone: "clay",
    alt: "Bride and groom wedding photograph 2",
    src: "/image/home_slider/home 02_.JPG",
    // Close-up rainy-beach portrait — same reasoning as h1.
    objectPositionClass: "object-center",
  },
  {
    id: "h3",
    tone: "sand",
    alt: "Bride and groom wedding photograph 3",
    src: "/image/home_slider/home 03_.png",
    objectPositionClass: "object-center",
    // Beach group photo — the couple + bridesmaids cluster in only the
    // bottom ~40% of the frame, with plain sky above. Biasing the crop
    // down keeps them centered instead of showing mostly empty sky.
    objectPosition: "center 68%",
  },
  {
    id: "h4",
    tone: "sage",
    alt: "Bride and groom wedding photograph 4",
    src: "/image/home_slider/home 04_.png",
    objectPositionClass: "object-center",
    // Teepee/string-lights venue shot — same issue as h3: guests and
    // teepees sit low in the frame, slightly right of center.
    objectPosition: "57% 68%",
  },
  {
    id: "h5",
    tone: "dusk",
    alt: "Bride and groom wedding photograph 5",
    src: "/image/home_slider/home 05_.png",
    objectPositionClass: "object-top",
  },
];

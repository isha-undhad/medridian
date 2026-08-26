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
    alt: "Bride and groom embracing on stone steps flanked by white floral arrangements",
    src: "/home/slider1.jpeg",
    objectPositionClass: "object-[center_58%]",
  },
  {
    id: "h2",
    tone: "clay",
    alt: "Bride and groom walking hand in hand across a hilltop lawn at dusk",
    src: "/home/slider2.jpg",
    objectPositionClass: "object-[center_60%]",
  },
  {
    id: "h3",
    tone: "sand",
    alt: "Bride glancing back over her shoulder beside a garden path, in black and white",
    src: "/home/slider3.jpeg",
    objectPositionClass: "object-[center_55%]",
  },
  {
    id: "h4",
    tone: "sage",
    alt: "Bride and groom laughing and holding champagne as cheering guests shower them with flower petals outside an ivy-covered stone doorway",
    src: "/home/slider4.jpeg",
    objectPositionClass: "object-[center_42%]",
  },
];

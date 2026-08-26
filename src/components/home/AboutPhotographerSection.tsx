import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";

/**
 * Self-contained font loading so this component can be dropped into any
 * Next.js App Router page as-is (same reasoning as IntroSection /
 * PortfolioSection). This repo already loads Playfair Display / Geist
 * globally via `font-serif` / `font-sans` in globals.css — swap
 * `playfair.className` / `inter.className` below for those utility classes
 * if you'd rather not load the face twice.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--about-photographer-font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--about-photographer-font-sans",
});

export interface AboutPhotographerSectionProps {
  /** Local (/public) path or configured remote URL — rendered via next/image
   * for the left (color) half of the duotone split. */
  photographerImage?: string;
  photographerImageAlt?: string;
  /** Right (desaturated) half of the split — a distinct image, decorative
   * (no meaningful alt text of its own, same as before). */
  secondaryImage?: string;
  /** CSS object-position for the portrait, e.g. "70% center" — keeps the
   * subject in frame instead of a plain center crop. Applied to both halves. */
  imagePosition?: string;
  eyebrowText?: string;
  name?: string;
  /** Short line under the headline — the "Luxury International wedding
   * photographer for the stylish, soulful, and romantic." role. */
  tagline?: string;
  /** Where the "Behind the Lens" eyebrow links to. */
  eyebrowLink?: string;
}

export default function AboutPhotographerSection({
  photographerImage = "/home/photographer.jpg",
  photographerImageAlt = "Ava Bennett, lead photographer at Meridian Studio",
  secondaryImage = "/home/insta2.jpg",
  imagePosition = "center",
  eyebrowText = "Behind the Lens",
  eyebrowLink = "/about",
  name = "Ava Bennett",
  tagline = "Timeless wedding photography for the romantic, the reflective, and the free-spirited.",
}: AboutPhotographerSectionProps) {
  return (
    <section className={`${inter.variable} ${playfair.variable} relative w-full`}>
      {/* Split-screen duotone hero: two portraits full-bleed side by side —
          color on the left, desaturated (grayscale filter) on the right —
          with the headline/subheading overlaid across both halves. No
          monogram badge on this pass. */}
      <div className="relative h-[50vh] sm:h-[65vh] min-h-[420px] lg:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative h-full w-full">
            <Image
              src={photographerImage}
              alt={photographerImageAlt}
              fill
              priority
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>
          <div className="relative h-full w-full">
            <Image
              src={secondaryImage}
              alt=""
              aria-hidden
              fill
              sizes="50vw"
              className="object-cover grayscale"
              style={{ objectPosition: imagePosition }}
            />
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center">
          <Link
            href={eyebrowLink}
            className={`${inter.className} mix-blend-overlay text-[10px] sm:text-xs font-medium tracking-[0.3em] text-white uppercase underline-offset-4 transition-all duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] hover:opacity-80 hover:underline md:text-sm`}
          >
            {eyebrowText}
          </Link>

          <h2
            className={`${playfair.className} mix-blend-overlay mt-2 sm:mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-[1.05] font-bold tracking-tight text-white uppercase text-balance [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]`}
          >
            {name}
          </h2>

          <p
            className={`${inter.className} mix-blend-overlay mt-3 sm:mt-6 max-w-xs sm:max-w-md md:max-w-lg text-body leading-relaxed font-light text-white text-pretty [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]`}
          >
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Example usage — drop straight into a page, right after the Portfolio
 * section:
 *
 *   import AboutPhotographerSection from "@/components/home/AboutPhotographerSection";
 *
 *   // Zero-config: renders with the defaults above.
 *   <AboutPhotographerSection />
 *
 *   // Fully overridden:
 *   <AboutPhotographerSection
 *     photographerImage="/home/about2.jpeg"
 *     photographerImageAlt="Ava Bennett, lead photographer, on location"
 *     secondaryImage="/home/insta2.jpg"
 *     imagePosition="60% top"
 *     eyebrowText="Behind the Lens"
 *     eyebrowLink="/about"
 *     name="Ava Bennett"
 *     tagline="Timeless wedding photography for the romantic, the reflective, and the free-spirited."
 *   />
 */

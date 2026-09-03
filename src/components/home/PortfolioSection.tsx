import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import Section from "@/components/ui/Section";

/**
 * Self-contained font loading so this component can be dropped into any
 * Next.js App Router page as-is (same reasoning as IntroSection). This repo
 * already loads Playfair Display / Geist globally via `font-serif` /
 * `font-sans` in globals.css — swap `playfair.className` / `inter.className`
 * below for those utility classes if you'd rather not load the face twice.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--portfolio-font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--portfolio-font-sans",
});

export type PortfolioSectionItem = {
  /** Local (/public) path or configured remote URL — rendered via next/image. */
  image: string;
  alt: string;
  link: string;
  /** One or two lines shown centered over the image on hover, e.g.
   * ["Explore", "Gallery"]. A single string renders as one line. */
  hoverText?: string | string[];
};

export interface PortfolioSectionProps {
  /** Both optional — omit either (or both) to render just the image row,
   * matching the reference: no heading above the three photos. */
  eyebrowText?: string;
  title?: string;
  items?: PortfolioSectionItem[];
}

const defaultItems: PortfolioSectionItem[] = [
  {
    image: "/home/portfolio1.jpg",
    alt: "Bride in motion, tulle dress caught mid-turn",
    link: "/portfolio",
    hoverText: ["Timeless", "Romance"],
  },
  {
    image: "/home/portfolio2.jpg",
    alt: "Bride and groom standing together among tropical foliage",
    link: "/portfolio",
    hoverText: ["Golden", "Hour"],
  },
  {
    image: "/home/portfolio3.jpg",
    alt: "Bride and groom embracing at the reception table",
    link: "/portfolio",
    hoverText: ["Quiet", "Moments"],
  },
];

export default function PortfolioSection({
  eyebrowText,
  title,
  items = defaultItems,
}: PortfolioSectionProps) {
  return (
    <Section className={`${inter.variable} ${playfair.variable} bg-[var(--color-bg)]`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {eyebrowText ? (
          <span
            className={`${inter.className} mb-2 block text-xs font-medium tracking-widest text-slate-600 uppercase lg:text-sm`}
          >
            {eyebrowText}
          </span>
        ) : null}

        {title ? (
          <h2
            className={`${playfair.className} mb-8 text-3xl leading-none tracking-wide text-gray-900 uppercase lg:text-5xl`}
          >
            {title}
          </h2>
        ) : null}

        {/* Responsive grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {items.slice(0, 3).map((item) => {
            const lines = item.hoverText
              ? Array.isArray(item.hoverText)
                ? item.hoverText
                : [item.hoverText]
              : [];

            return (
              <Link key={item.image} href={item.link} className="group block cursor-pointer">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 33vw"
                    className="object-cover grayscale-0 transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale"
                  />

                  {lines.length > 0 ? (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                      {lines.map((line, index) => (
                        <span
                          key={index}
                          className={`${playfair.className} text-3xl leading-tight text-white/80 italic lg:text-4xl`}
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/**
 * Example usage — drop straight into a page, right after the OfferingsHeadline
 * section:
 *
 *   import PortfolioSection from "@/components/home/PortfolioSection";
 *
 *   // Zero-config: renders with the defaults above (just the image row).
 *   <PortfolioSection />
 *
 *   // With a heading, and overridden images:
 *   <PortfolioSection
 *     eyebrowText="Recent Weddings"
 *     title="Gallery"
 *     items={[
 *       { image: "/home/portfolio1.jpg", alt: "...", link: "/portfolio", hoverText: ["Explore", "Gallery"] },
 *       { image: "/home/portfolio2.jpg", alt: "...", link: "/portfolio", hoverText: "Explore" },
 *       { image: "/home/portfolio3.jpg", alt: "...", link: "/portfolio", hoverText: ["Editorial", "Stories"] },
 *     ]}
 *   />
 */

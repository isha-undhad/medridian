"use client";

import { useState } from "react";
import Image from "next/image";
import CinematicVideo from "./CinematicVideo";
import CinematicPhotoGrid from "./CinematicPhotoGrid";
import FamilyMaternityGrid from "./FamilyMaternityGrid";
import EngagementIntroVideo from "./EngagementIntroVideo";

const CATEGORIES = ["Weddings", "Engagements", "Family & Maternity"] as const;
type Category = (typeof CATEGORIES)[number];

type CategoryImage = { src: string; alt: string };

// Real photos already in /public/portfolio and /public/home — one array per
// tab, six each, with no repeats across tabs and none shared with the
// Engagements-only <CinematicPhotoGrid /> below (see that file for its set).
// Family & Maternity has its own dedicated layout (<FamilyMaternityGrid />,
// 3 photos, not 6) instead of an entry here — see that component for its set.
const CATEGORY_IMAGES: Record<Exclude<Category, "Family & Maternity">, CategoryImage[]> = {
  Weddings: [
    {
      src: "/portfolio/1.jpeg",
      alt: "Bride and groom smiling at each other in front of an ornate carved Gothic stone archway",
    },
    {
      src: "/portfolio/8.jpg",
      alt: "Bride and groom laughing together beneath a gilded domed alcove with classical columns",
    },
    {
      src: "/portfolio/11.jpg",
      alt: "Bride and groom kissing under a green-domed garden pavilion ringed with classical columns",
    },
    {
      src: "/home/about1.jpg",
      alt: "Bride and groom sharing a quiet moment beneath a flowing veil, in black and white",
    },
    { src: "/home/about3.jpg", alt: "Bride laughing as her groom lifts her mid-embrace at golden hour" },
    {
      src: "/home/catagory3.jpg",
      alt: "Bride and groom walking away hand in hand through a formal garden at golden hour",
    },
  ],
  Engagements: [
    {
      src: "/portfolio/2.jpeg",
      alt: "Bride and groom laughing together as they exit through a shaded, ivy-covered doorway",
    },
    {
      src: "/portfolio/4.jpeg",
      alt: "Bride helping her groom adjust his boutonnière while walking together through a park",
    },
    {
      src: "/portfolio/10.jpg",
      alt: "Close-up of a bride's hands clasped over her lace gown, showing her engagement ring",
    },
    {
      src: "/portfolio/3.jpeg",
      alt: "Bride and groom kissing beneath a stone archway, her heart-shaped bag and flower-trimmed heels in view",
    },
    { src: "/home/about2.jpeg", alt: "Bride glancing back at her groom in front of a grand brick manor house" },
    {
      src: "/home/catagory5.jpg",
      alt: "Candid, unposed moment of a couple laughing together, softly lit and lightly toned",
    },
  ],
};

/**
 * Standalone "Signature Work" portfolio section, built exactly to the brief:
 * self-contained tab state (useState, no external routing), a typed
 * per-category image map, and — only on the Engagements tab — a cinematic
 * video block followed by a separate photo grid.
 *
 * This is a freestanding component, not a replacement for this repo's real
 * /portfolio route (PortfolioBrowser + PortfolioGrid +
 * EngagementCinematicSection there already implement overlapping
 * category-tab / video-showcase behavior against the site's live data) — it
 * can be dropped into any page via `<Portfolio />`.
 *
 * <CinematicVideo> takes a `videoSrc` — there's no local video file in this
 * repo yet (only Vimeo-hosted embeds elsewhere on the real site), so none is
 * wired up as a default here. It's called below with just a poster photo;
 * pass a real `/public` video path once one exists to see it actually play.
 */
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>("Weddings");
  // Narrows activeTab in the `else` arm below, so CATEGORY_IMAGES[activeTab]
  // type-checks against its Family-less key type without a cast.
  const images = activeTab === "Family & Maternity" ? null : CATEGORY_IMAGES[activeTab];

  return (
    <section className="bg-[var(--color-bg)] px-6 py-16 sm:px-10 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
          Signature Work
        </span>
        <h2 className="mt-3 font-serif text-4xl text-[var(--color-ink)] sm:text-5xl">The Portfolio</h2>

        <div className="mt-8 flex items-center gap-8 border-b border-[var(--color-line)]">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveTab(category)}
              className={`-mb-px border-b-2 pb-3 text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeTab === category
                  ? "border-[var(--color-accent)] text-[var(--color-ink)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Engagements" ? (
        <div className="mx-auto mt-12 max-w-6xl">
          <EngagementIntroVideo poster="/home/couple.webp" />
        </div>
      ) : null}

      {images ? (
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {images.map((image) => (
            <div key={image.src} className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-6xl">
          <FamilyMaternityGrid />
        </div>
      )}

      {activeTab === "Engagements" ? (
        <div className="mx-auto mt-16 max-w-6xl md:mt-20">
          <CinematicVideo poster="/home/couple.webp" />
          <div className="mt-10 md:mt-12">
            <CinematicPhotoGrid />
          </div>
        </div>
      ) : null}
    </section>
  );
}

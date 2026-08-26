import { portfolioCategories, portfolioItems, type PortfolioItem } from "./portfolio";

/** URL-safe identifier for each portfolio category page (`/portfolio/[category]`). */
export type CategorySlug = "weddings" | "engagements" | "family-maternity";

export type CategoryVideo = {
  /** Root-relative path under /public/videos/ — no files exist there yet,
   * swap in real footage when it's ready. */
  src: string;
  /** Poster frame shown before playback starts. Currently borrowed from an
   * existing portfolio photo — swap for a real still from the video. */
  poster?: string;
  /** Small dark badge, top-left of the video — e.g. the videographer's studio name. */
  credit: string;
  /** Couple/client names, shown bottom-left in caps. */
  names: string;
  location: string;
};

export type CategoryContent = {
  slug: CategorySlug;
  /** Must match a value in `portfolioCategories` (data/portfolio.ts) — this
   * is what `getCategoryPhotos` below filters the grid by. */
  category: (typeof portfolioCategories)[number];
  label: string;
  video: CategoryVideo;
};

/**
 * One shared source for every /portfolio/[category] page — video (src,
 * credit, names, location) and, via `category`, which photos populate the
 * grid. Add a new key here (and a matching route will "just work" once
 * `generateStaticParams` in the page picks it up) rather than duplicating a
 * page per category.
 */
export const categoryContent: Record<CategorySlug, CategoryContent> = {
  weddings: {
    slug: "weddings",
    category: "Weddings",
    label: "Weddings",
    video: {
      src: "/videos/weddings.mp4",
      poster: "/portfolio/1.jpeg",
      credit: "Bordoni Films",
      names: "Sophie & Daniel",
      location: "Cliveden House, UK",
    },
  },
  engagements: {
    slug: "engagements",
    category: "Engagements",
    label: "Engagements",
    video: {
      src: "/videos/engagements.mp4",
      poster: "/portfolio/2.jpeg",
      credit: "Bordoni Films",
      names: "Natalie & Daniel",
      location: "Cliveden House, UK",
    },
  },
  "family-maternity": {
    slug: "family-maternity",
    category: "Family & Maternity",
    label: "Family & Maternity",
    video: {
      src: "/videos/family-maternity.mp4",
      poster: "/portfolio/3.jpeg",
      credit: "Bordoni Films",
      names: "The Ellery Family",
      location: "Cliveden House, UK",
    },
  },
};

/** Looks up a category by its URL slug — returns undefined for anything
 * that isn't a known slug, so the page can 404 instead of crashing. */
export function getCategoryContent(slug: string): CategoryContent | undefined {
  return Object.prototype.hasOwnProperty.call(categoryContent, slug)
    ? categoryContent[slug as CategorySlug]
    : undefined;
}

/** First `count` items tagged for this category. `PortfolioItem` has no
 * "featured" flag today, so this is just data-array order — add
 * `featured?: boolean` to `PortfolioItem` and filter on that first if/when
 * curation (rather than array order) needs to decide which 10 show. */
export function getCategoryPhotos(content: CategoryContent, count = 10): PortfolioItem[] {
  return portfolioItems.filter((item) => item.category === content.category).slice(0, count);
}

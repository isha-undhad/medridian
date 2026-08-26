export type Tone = "sand" | "clay" | "sage" | "stone" | "dusk" | "ivory";

export type PortfolioItem = {
  id: string;
  /** Root-relative path under /public/portfolio/. Only 1.jpeg–7.jpeg exist so
   * far — one item per category uses each, so every filtered view shows all
   * 7 with no repeats (see the generator below). Swap each `image` in as
   * real photos land in that folder. */
  image: string;
  /** Real pixel dimensions of `image`, required by next/image when rendered
   * without `fill` — this is what lets the masonry grid size each tile by
   * its actual aspect ratio instead of cropping to a fixed box. Update these
   * alongside `image` when swapping in a new photo. */
  width: number;
  height: number;
  title?: string;
  category?: (typeof portfolioCategories)[number];
};

// Exported (not just used internally) so PortfolioHeader's filter tabs and
// PortfolioGrid's data both read from one source of truth instead of the
// tab labels drifting out of sync with what's actually in `category` below.
export const portfolioCategories = ["Weddings", "Engagements", "Family & Maternity"] as const;

const titles = [
  "Amalfi, Reimagined",
  "The Harlow Wedding",
  "Quiet Light",
  "Marrakech Interiors",
  "Season of Portraits",
  "North Coast Journal",
  "The Ellery Family",
  "Glass & Stone",
  "Vineyard Vows",
  "Kyoto in November",
  "Studio Still Lifes",
  "Editorial: Bloom",
  "The Sinclair Elopement",
  "Provence, Late Summer",
  "Interior: Ashgrove House",
  "The Whitfield Wedding",
  "Portraits in Grey",
  "Coastal Notes",
  "Still Life No. 4",
  "The Maren Family",
  "Terraces of Positano",
  "Editorial: Undertow",
  "The Osei Wedding",
  "Foyer Study",
  "Autumn Portraits",
  "Reykjavik Journal",
  "The Duval Elopement",
  "Still Life, Morning",
  "Editorial: Halcyon",
  "The Ferreira Wedding",
];

const ALL_PORTFOLIO_FILES = [
  { file: "1.jpeg", width: 1000, height: 1502 },
  { file: "2.jpeg", width: 1000, height: 1502 },
  { file: "3.jpeg", width: 1000, height: 1502 },
  { file: "4.jpeg", width: 1000, height: 1502 },
  { file: "5.jpeg", width: 1000, height: 1500 },
  { file: "6.jpeg", width: 1000, height: 1502 },
  { file: "7.jpeg", width: 1000, height: 1502 },
  { file: "8.jpg", width: 1000, height: 1500 },
  { file: "9.jpg", width: 1000, height: 1500 },
  { file: "10.jpg", width: 1000, height: 1500 },
  { file: "11.jpg", width: 1000, height: 1500 },
  { file: "12.jpg", width: 1000, height: 1500 },
];

export const portfolioItems: PortfolioItem[] = portfolioCategories.flatMap(
  (category) => {
    const isWeddings = category === "Weddings";
    const files = isWeddings ? ALL_PORTFOLIO_FILES : ALL_PORTFOLIO_FILES.slice(0, 7);

    return files.map((item, idx) => ({
      id: `${category.toLowerCase().replace(/\s+/g, "-")}-${idx + 1}`,
      image: `/portfolio/${item.file}`,
      width: item.width,
      height: item.height,
      title: titles[idx % titles.length],
      category,
    }));
  }
);

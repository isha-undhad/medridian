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
  objectPosition?: string;
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

const WEDDINGS_PORTFOLIO_FILES: {
  file: string;
  width: number;
  height: number;
  objectPosition?: string;
}[] = [
  // Chunk 0
  { file: "TDS_7793.jpg", width: 4480, height: 6720, objectPosition: "center 40%" },
  { file: "HPPF0718.jpg", width: 5472, height: 3648, objectPosition: "center" },
  { file: "3B4A3299.jpg", width: 5472, height: 3648, objectPosition: "center 25%" },
  { file: "3B4A0901.jpg", width: 5472, height: 3648, objectPosition: "center" },
  // Swapped from index 15: couple under tree and archway, positioned on the couple at the bottom
  { file: "TDS_8250.jpg", width: 4480, height: 6720, objectPosition: "center 85%" },
  { file: "ANK_4166.jpg", width: 5464, height: 8192, objectPosition: "center" },

  // Chunk 1
  { file: "TDS_2948 copy.JPG", width: 4480, height: 6720, objectPosition: "center 30%" },
  // Swapped from index 10: white mosque / palace dome architecture in 1x1 cell
  { file: "3B4A2932.jpg", width: 3648, height: 5472, objectPosition: "center 45%" },
  { file: "TDS_8297.jpg", width: 4480, height: 6720, objectPosition: "center 30%" },
  { file: "3B4A3745.jpg", width: 3648, height: 5472, objectPosition: "center" },
  // Swapped from index 7: stage dance under string lights & sparklers in wide 2x1 horizontal cell
  { file: "3B4A0547.jpg", width: 5258, height: 3505, objectPosition: "center" },
  { file: "TDS_0621.jpg", width: 4625, height: 6938, objectPosition: "center 30%" },

  // Chunk 2
  { file: "3B4A1499.jpg", width: 5472, height: 3648, objectPosition: "center" },
  { file: "3B4A2187.jpg", width: 3408, height: 2272, objectPosition: "center" },
  { file: "3B4A1025.jpg", width: 3648, height: 5472, objectPosition: "center 40%" },
  // Swapped from index 4: wooden door groom photo in 1x1 cell, positioned on groom
  { file: "3B4A1010.jpg", width: 3648, height: 5472, objectPosition: "center 80%" },
  { file: "Tezza-6879.JPG", width: 6720, height: 4480, objectPosition: "center" },
  { file: "3B4A3772.jpg", width: 3648, height: 5472, objectPosition: "center" },
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
  (category): PortfolioItem[] => {
    const isWeddings = category === "Weddings";
    if (isWeddings) {
      return WEDDINGS_PORTFOLIO_FILES.map((item, idx) => ({
        id: `weddings-${idx + 1}`,
        image: `/image/portfolio/grid/${item.file}`,
        width: item.width,
        height: item.height,
        title: titles[idx % titles.length],
        category,
        objectPosition: item.objectPosition,
      }));
    }

    const files = ALL_PORTFOLIO_FILES.slice(0, 7);
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

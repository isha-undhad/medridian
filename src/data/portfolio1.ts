import type { PortfolioItem } from "./portfolio";
import manifest from "./portfolio1Manifest.json";

/** Real photos from public/image/portfolio_1, with dimensions read from disk
 * by scripts/generate-portfolio1-manifest.mjs (re-run it if files change). */
export const portfolio1Items: PortfolioItem[] = manifest.map((entry, idx) => ({
  id: `p1-${idx + 1}`,
  image: `/image/portfolio_1/${entry.file}`,
  width: entry.width,
  height: entry.height,
}));

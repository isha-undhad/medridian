import type { PortfolioItem } from "./portfolio";
import manifest from "./portfolio1Manifest.json";

/** Per-file object-position overrides for photos whose subject sits close to
 * an edge the default "center" crop would clip. Keyed by manifest filename. */
const OBJECT_POSITION_OVERRIDES: Record<string, string> = {
  // Couple's heads are near the top of the frame; center-crop was cutting
  // off the top of the man's head. Push the crop up so both heads stay in
  // frame, even if it means losing more off the bottom.
  "TDS_8334.jpg": "center 10%",

  // Full-pool framing audit (129 images) — the rest are subjects confined to
  // the lower portion of a tall/wide frame with large empty sky/architecture
  // above, or pushed toward one side, which a plain center-crop clips or
  // badly decenters.
  // Woman against a stone wall — too much roof/sky at the top, feet/lower
  // body cut off at the bottom. Push the crop down so nothing is lost below.
  "3B4A1181.jpg": "center 90%",
  "3B4A2932.jpg": "center 80%",
  "3B4A2935.jpg": "center 75%",
  "3B4A3245.jpg": "center 85%",
  "Ravi-barvaliya-wedding-photographer-surat.JPG": "35% center",
  "TDS_0635.jpg": "25% 25%",
  "TDS_2948 copy.JPG": "center 85%",
  "TDS_8114.jpg": "65% 40%",
  "TDS_8214.jpg": "center 85%",
  "TDS_8250.jpg": "center 80%",
  "Tezza-9206.JPG": "85% 40%",
};

/** Real photos from public/image/portfolio_1, with dimensions read from disk
 * by scripts/generate-portfolio1-manifest.mjs (re-run it if files change). */
export const portfolio1Items: PortfolioItem[] = manifest.map((entry, idx) => ({
  id: `p1-${idx + 1}`,
  image: entry.path,
  width: entry.width,
  height: entry.height,
  objectPosition: OBJECT_POSITION_OVERRIDES[entry.file],
}));

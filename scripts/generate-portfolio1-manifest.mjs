// Regenerate: node scripts/generate-portfolio1-manifest.mjs
// Images are pre-sorted by orientation into public/image/portfolio_1/landscape
// and .../portrait. Reads actual pixel dimensions (via the `image-size` build
// already bundled inside `next`) and writes a manifest recording each file's
// folder (= orientation) and relative path.
import pkg from "next/dist/compiled/image-size/index.js";
const { imageSize } = pkg;
import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

const baseDir = path.join(process.cwd(), "public", "image", "portfolio_1");
const outFile = path.join(process.cwd(), "src", "data", "portfolio1Manifest.json");

const FOLDERS = /** @type {const} */ (["landscape", "portrait"]);

const manifest = FOLDERS.flatMap((orientation) => {
  const dir = path.join(baseDir, orientation);
  return readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => {
      const { width, height } = imageSize(readFileSync(path.join(dir, file)));
      return {
        file,
        path: `/image/portfolio_1/${orientation}/${file}`,
        width,
        height,
        orientation,
      };
    });
});

writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${manifest.length} entries to ${path.relative(process.cwd(), outFile)}`);

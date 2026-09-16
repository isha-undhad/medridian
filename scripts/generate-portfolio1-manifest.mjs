// Regenerate: node scripts/generate-portfolio1-manifest.mjs
// Reads actual pixel dimensions of every image in public/image/portfolio_1
// (via the `image-size` build already bundled inside `next`) and writes a
// manifest so the grid can classify each photo as portrait/landscape without
// probing image bytes at runtime.
import pkg from "next/dist/compiled/image-size/index.js";
const { imageSize } = pkg;
import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "image", "portfolio_1");
const outFile = path.join(process.cwd(), "src", "data", "portfolio1Manifest.json");

const manifest = readdirSync(dir)
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  .sort()
  .map((file) => {
    const { width, height } = imageSize(readFileSync(path.join(dir, file)));
    return {
      file,
      width,
      height,
      // Real photos are essentially never pixel-perfect square; a tie goes to
      // "portrait" since a portrait frame crops more naturally into a square.
      orientation: width > height ? "landscape" : "portrait",
    };
  });

writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${manifest.length} entries to ${path.relative(process.cwd(), outFile)}`);

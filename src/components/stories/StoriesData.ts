import fs from "fs";
import path from "path";

export interface StoryCredit {
  label: string;
  value: string;
}

export interface StoryImageItem {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Story {
  slug: string;
  coupleNames: string;
  location: string;
  date: string;
  excerptText?: string;
  bannerImage: string;
  bannerAlt?: string;
  creditsList?: StoryCredit[];
  content?: {
    leadParagraph?: string;
    bodyParagraphs: string[];
    details?: {
      venue?: string;
      planner?: string;
      florals?: string;
      attire?: string;
    };
  };
}

export const stories: Story[] = [
  {
    slug: "alisha-and-rahul",
    coupleNames: "Alisha & Rahul",
    location: "Lake Como, Italy",
    date: "September 2025",
    excerptText:
      "A sun-drenched celebration overlooking the waters of Villa Balbiano, filled with heartfelt vows, timeless editorial elegance, and intimate moonlit dancing.",
    bannerImage: "/stories/101.png",
    bannerAlt: "Alisha & Rahul celebrating their wedding at Lake Como",
    creditsList: [
      { label: "Photography", value: "Dream Stories" },
      { label: "Venue", value: "Villa Balbiano, Lake Como" },
      { label: "Planning", value: "The Lake Como Wedding Collective" },
      { label: "Florals", value: "Ramo Fiori Studio" },
      { label: "Outfits", value: "Sabyasachi Mukherjee & Tom Ford" },
      { label: "Hair & Makeup", value: "Studio Como Beauty" },
    ],
    content: {
      leadParagraph:
        "Set against the dramatic alpine backdrop of Lake Como, Alisha and Rahul's wedding unfolded with effortless romance and refined sophistication.",
      bodyParagraphs: [
        "From their emotional private first look among centuries-old gardens to the sun-soaked ceremony overlooking the serene waters of the lake, every moment was infused with deep intention and effortless style.",
        "As twilight descended, guests gathered under cascading crystal chandeliers for an unforgettable evening of Italian fine dining, heartfelt toasts, and celebration under the stars.",
      ],
      details: {
        venue: "Villa Balbiano, Lake Como",
        planner: "The Lake Como Wedding Collective",
        florals: "Ramo Fiori Studio",
        attire: "Sabyasachi & Tom Ford",
      },
    },
  },
];

export function getAllStories(): Story[] {
  return stories;
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getAdjacentStories(currentSlug: string): {
  prevStory?: Story;
  nextStory?: Story;
} {
  const index = stories.findIndex((s) => s.slug === currentSlug);
  if (index === -1) return {};

  const prevStory = index > 0 ? stories[index - 1] : undefined;
  const nextStory = index < stories.length - 1 ? stories[index + 1] : undefined;

  return { prevStory, nextStory };
}

function getImageDimensions(buffer: Buffer): { width: number; height: number } {
  // JPEG parser
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length - 8) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      while (buffer[offset] === 0xff && offset < buffer.length) {
        offset++;
      }
      const marker = buffer[offset];
      offset++;

      // SOF markers (baseline, progressive, extended sequential, lossless, etc.)
      if (
        marker === 0xc0 ||
        marker === 0xc1 ||
        marker === 0xc2 ||
        marker === 0xc3 ||
        marker === 0xc5 ||
        marker === 0xc6 ||
        marker === 0xc7 ||
        marker === 0xc9 ||
        marker === 0xca ||
        marker === 0xcb ||
        marker === 0xcd ||
        marker === 0xce ||
        marker === 0xcf
      ) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        return { width, height };
      }

      if (marker === 0xda || marker === 0xd9) break; // SOS (Start of Scan) or EOI

      if (offset + 2 <= buffer.length) {
        const len = buffer.readUInt16BE(offset);
        offset += len;
      } else {
        break;
      }
    }
  }

  // PNG parser
  if (buffer[0] === 0x89 && buffer[1] === 0x50) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // WebP parser
  if (buffer.length >= 30 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    if (buffer.toString("ascii", 12, 16) === "VP8 ") {
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
    if (buffer.toString("ascii", 12, 16) === "VP8L") {
      const b0 = buffer[21], b1 = buffer[22], b2 = buffer[23], b3 = buffer[24];
      return { width: 1 + (((b1 & 0x3f) << 8) | b0), height: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
    }
    if (buffer.toString("ascii", 12, 16) === "VP8X") {
      return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
    }
  }

  return { width: 1200, height: 800 };
}

/**
 * Dynamically reads all images from public/stories/ (or public/stories/[slug] if scoped)
 * at build/request time on the server with real pixel dimensions, excluding the banner image
 * and guaranteeing no duplicate images appear.
 */
export function getStoryImages(slug: string): StoryImageItem[] {
  const scopedDir = path.join(process.cwd(), "public", "stories", slug);
  const defaultDir = path.join(process.cwd(), "public", "stories");
  const targetDir = fs.existsSync(scopedDir) ? scopedDir : defaultDir;

  if (!fs.existsSync(targetDir)) return [];

  const files = fs.readdirSync(targetDir);
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".JPG", ".JPEG", ".PNG", ".WEBP"];
  const story = getStoryBySlug(slug);
  const bannerFilename = story?.bannerImage ? path.basename(story.bannerImage) : null;
  const excludedFiles = new Set(["101.jpg", "101.png", "102.jpg", "102.webp"]);
  if (bannerFilename) {
    excludedFiles.add(bannerFilename);
  }

  const filteredFiles = files
    .filter((file) => {
      const fullPath = path.join(targetDir, file);
      const isImage = fs.statSync(fullPath).isFile() && imageExtensions.includes(path.extname(file));
      return isImage && !excludedFiles.has(file);
    })
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    });

  const basePath = fs.existsSync(scopedDir) ? `/stories/${slug}` : `/stories`;
  const seenSrcs = new Set<string>();
  const items: StoryImageItem[] = [];

  for (const file of filteredFiles) {
    const src = `${basePath}/${file}`;
    if (seenSrcs.has(src.toLowerCase())) continue;
    seenSrcs.add(src.toLowerCase());

    const fullPath = path.join(targetDir, file);
    const buffer = fs.readFileSync(fullPath);
    const { width, height } = getImageDimensions(buffer);

    items.push({
      src,
      width,
      height,
      alt: `${story ? story.coupleNames : "Wedding"} story photograph`,
    });
  }

  return items;
}

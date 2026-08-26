export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  /** Root-relative path under /public — every post uses a real photo
   * already in the repo (home/about/portfolio folders), picked to match
   * the post's subject rather than a placeholder. */
  image: string;
  imageAlt: string;
  /** One paragraph per array entry — rendered as-is on the detail page,
   * no markdown parsing needed for copy this short. */
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "shooting-in-open-shade",
    title: "Why We Shoot in Open Shade",
    excerpt:
      "The case for avoiding direct sun on a wedding day, and how open shade gives skin tones room to breathe.",
    category: "Technique",
    date: "Jul 2026",
    readTime: "5 min",
    image: "/portfolio/2.jpeg",
    imageAlt:
      "Bride and groom laughing together as they exit through a shaded, ivy-covered doorway",
    content: [
      "Direct sun is the first thing we plan around on a wedding day, not the first thing we chase. Harsh overhead light carves hard shadows under eyes and noses exactly where you don't want them, and it forces everyone squinting into the lens the moment they're asked to look happy.",
      "Open shade — the soft, even light you get standing just inside a doorway, under a tree line, or on the shadow side of a building — does the opposite. It wraps around a face instead of cutting across it, and it holds detail in a white dress and a black tuxedo at the same time, which direct sun almost never lets you do.",
      "It's also more forgiving of time. A couple's portrait session doesn't have to chase a 20-minute golden-hour window when open shade is available most of the afternoon. That's more time for the moment to actually happen, rather than being rushed for the light.",
      "None of this is a rule we impose on a venue — it's a read we do the moment we arrive, walking the grounds for the pockets of shade that will still look intentional in a photograph, not just technically correct.",
    ],
  },
  {
    id: "b2",
    slug: "editing-philosophy",
    title: "Our Editing Philosophy, Explained",
    excerpt:
      "A look inside the edit: why restraint, not saturation, is what makes a photograph age well.",
    category: "Behind the Scenes",
    date: "Jun 2026",
    readTime: "7 min",
    image: "/home/catagory5.jpg",
    imageAlt: "Candid, unposed moment of a couple laughing together, softly lit and lightly toned",
    content: [
      "It's easy to make a photograph look impressive in an edit. It's much harder to make it look true. Every preset and one-click filter pushes toward the same place — punchier contrast, warmer skin, deeper blacks — and most of them get there at the cost of what the moment actually looked like.",
      "Our edit starts from the file's own exposure and white balance, not a look imposed on top of it. If a room was lit by a single window, we want the photograph to still feel like a single window lit it — not a studio softbox added after the fact.",
      "Restraint shows up most in the moments other studios oversaturate: a bouquet, a stained-glass window, a sunset. Those are the frames most tempting to push further, and also the ones that date fastest when you do. A photograph edited quietly today still looks like 2026 in twenty years. One pushed to trend doesn't.",
      "The test we hold every edit to is simple: would this still look right printed at 30 inches and hung on a wall in a decade? If the answer depends on a filter, it's not finished yet.",
    ],
  },
  {
    id: "b3",
    slug: "packing-for-assignment",
    title: "What's in the Bag for a Two-Week Assignment",
    excerpt:
      "The full kit — cameras, film stock, and the two things we never travel without.",
    category: "Travel",
    date: "May 2026",
    readTime: "6 min",
    image: "/portfolio/4.jpeg",
    imageAlt: "Bride helping her groom adjust his boutonnière while walking together through a park",
    content: [
      "A two-week destination run means every piece of gear earns its place in the bag twice over — once for what it does, and once for how much it weighs on the fourth flight connection of the trip.",
      "Two camera bodies, always, so a single failure never becomes a missed wedding. A short prime for low light, a standard zoom for coverage, and one longer lens for the ceremony shots where getting close isn't an option. Film stock travels in a lead-lined bag, hand-checked at every X-ray, never in checked luggage.",
      "The two things we never leave behind aren't cameras at all: a portable hard drive backup routine we run every single night of the trip, and a printed contact sheet of the couple's timeline, because phone batteries and wifi are the two things every venue promises and few actually deliver.",
      "Everything else — chargers, memory cards, the second flash we hope not to need — is genuinely replaceable. Those two things are not.",
    ],
  },
  {
    id: "b4",
    slug: "printing-at-home-vs-lab",
    title: "Printing at Home vs. a Fine-Art Lab",
    excerpt:
      "Why every limited-edition print in our archive still goes out to the same two labs.",
    category: "Craft",
    date: "Apr 2026",
    readTime: "4 min",
    image: "/home/catagory4.jpg",
    imageAlt: "Sunlit reception table setting with fine linens, candles, and garden florals",
    content: [
      "A desktop printer can produce something that looks good on a screen next to it. It very rarely produces something that still looks good five years from now, under real light, on a wall.",
      "Archival pigment printing on cotton rag paper is a different discipline — the paper itself is acid-free and the inks are rated for a century or more without visible fading. Consumer inkjet paper, even the good kind, isn't built to that standard, and it shows first in skin tones and skies, the two things a wedding photograph can least afford to lose.",
      "We work with two labs for every limited-edition print in the archive, both chosen for one reason: a proof print they send back looks the same as the file we sent them, not warmer, not more contrasted, not corrected toward whatever their default profile prefers.",
      "It costs more and takes longer than printing at home. For a print that's meant to outlast the wedding by decades, that trade is not a close call.",
    ],
  },
  {
    id: "b5",
    slug: "the-harlow-wedding-story",
    title: "Inside the Harlow Wedding",
    excerpt:
      "A full-length story from one of our favorite weddings of the year, from arrival to the last dance.",
    category: "Real Weddings",
    date: "Mar 2026",
    readTime: "8 min",
    image: "/home/catagory3.jpg",
    imageAlt: "Bride and groom walking away hand in hand through a formal garden at golden hour",
    content: [
      "Some weddings tell you everything about the day within the first ten minutes. The Harlow wedding did it the moment we walked the garden the morning of — every hedge trimmed with a level of care that told us this couple thought about the details other people skip.",
      "The ceremony ran under a single cedar tree at the end of a gravel path, chosen specifically because it cast the right shadow at 4pm, the exact hour they'd set the vows for. That's the kind of planning that makes a photographer's job mostly about staying out of the way.",
      "The best frame of the day wasn't posed at all — it was the two of them walking back down that same gravel path afterward, alone for the first time as a married couple, before the reception pulled them back into the crowd. Golden hour did the rest.",
      "By the last dance the light was long gone and the flash was doing all the work, but the energy in the room hadn't dropped once since the ceremony. That's the story we always hope to tell: not just a beautiful few hours, but a whole day that held together.",
    ],
  },
  {
    id: "b6",
    slug: "family-archive-restoration",
    title: "Restoring a Family's 40-Year Archive",
    excerpt:
      "How we scanned, cleaned, and rehomed four decades of a family's negatives into a single printed book.",
    category: "Craft",
    date: "Feb 2026",
    readTime: "6 min",
    image: "/portfolio/6.jpeg",
    imageAlt: "Black and white portrait of a couple standing before a grand estate house at dusk",
    content: [
      "The archive arrived in four shoeboxes — negatives, mostly 35mm, some water-damaged, none of them sleeved or labeled by year. Forty years of one family's life, in no particular order.",
      "Restoration starts with a dry clean pass on every strip before it ever touches a scanner, since dust and debris get baked permanently into a scan otherwise. Water damage is slower work — some negatives needed a humidity chamber over several days just to separate them without tearing the emulsion.",
      "Once scanned, the goal isn't to make each frame look modern. It's the opposite: correct for the fading and color shift the film itself picked up over four decades, without erasing the grain and tonality that make it unmistakably from when it was shot.",
      "The final book runs in rough chronological order, rebuilt from handwriting on a handful of envelopes and process-date codes on the film edge itself. It now lives on a shelf instead of in a shoebox — which was the actual point of the whole project.",
    ],
  },
];

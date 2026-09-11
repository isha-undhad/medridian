import type { Tone } from "./portfolio";

export type Specialty = {
  id: string;
  title: string;
  description: string;
};

export type Award = {
  id: string;
  year: string;
  title: string;
  organization: string;
};

/** Profile for Dream Stories's founder/lead photographer. */
export const photographer = {
  name: "Ravi Barvaliya",
  role: "Lead Photographer & Founder",
  portraitTone: "sand" as Tone,
  bio: [
    "Ravi started The Dream Stories in 2014 during his college years, driven by a deep passion for photography and a desire to capture moments with an artistic touch. What began as a personal pursuit has grown into a dedicated wedding and travel photography studio based in Surat, India.",
    "He specializes in wedding and travel photography, with a keen eye for composition, light and emotion. Through the lens of his camera, Ravi aims to capture the innate beauty of the people and places he encounters — crafting visual stories that feel honest and lasting.",
    "When he isn't shooting weddings, he's usually exploring new destinations or refining the studio's editing and storytelling process.",
  ],
  quote:
    "Every wedding is a story. My job isn't to pose it — it's to notice it, and make sure it's never forgotten.",
};

/** What he shoots — the personal specialties behind the studio's services. */
export const specialties: Specialty[] = [
  {
    id: "sp1",
    title: "Wedding Stories",
    description:
      "Honest, beautifully observed documentation of your celebration and everything that unfolds between the moments.",
  },
  {
    id: "sp2",
    title: "Cinematic Films",
    description:
      "Emotion-led films crafted with a sense of atmosphere, movement, and timeless storytelling.",
  },
  {
    id: "sp3",
    title: "Editorial Portraits",
    description:
      "Refined portraits created with thoughtful composition, natural direction, and an appreciation for light.",
  },
  {
    id: "sp4",
    title: "Destination Celebrations",
    description:
      "From intimate escapes to extraordinary destinations, stories created wherever your celebration takes you.",
  },
];

/** Placeholder recognition — replace with real accolades before launch. */
export const awards: Award[] = [
  {
    id: "aw1",
    year: "2024",
    title: "Editor's Choice, Wedding Editorial",
    organization: "The Lumière Wedding Photography Awards",
  },
  {
    id: "aw2",
    year: "2022",
    title: "Top 30 Documentary Wedding Photographers",
    organization: "Coastal Editorial Guild",
  },
  {
    id: "aw3",
    year: "2020",
    title: "Featured Photographer",
    organization: "Fine Art Print Annual",
  },
  {
    id: "aw4",
    year: "2018",
    title: "Rising Talent in Wedding Photography",
    organization: "Dream Stories Region Bridal Awards",
  },
];

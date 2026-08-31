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

/** Placeholder profile for Dream Stories's founder/lead photographer — swap for
 * her real bio, portrait, and accolades when ready. */
export const photographer = {
  name: "Ava Bennett",
  role: "Lead Photographer & Founder",
  portraitTone: "sand" as Tone,
  bio: [
    "Ava started Dream Stories in 2014 with a single camera bag and a background in documentary photojournalism — a discipline that still shapes every frame she shoots today.",
    "She works almost entirely in natural and available light, favoring quiet, unscripted moments over posed formality. Her work has taken her from vineyard weddings in Napa to elopements on the Amalfi Coast.",
    "When she isn't shooting, she's usually in the darkroom, hand-processing film for the studio's fine-art print archive.",
  ],
  quote:
    "I'm not trying to make a beautiful photograph. I'm trying to make an honest one — the beauty tends to follow.",
};

/** What she shoots — the personal specialties behind the studio's services. */
export const specialties: Specialty[] = [
  {
    id: "sp1",
    title: "Documentary Weddings",
    description: "Candid, unscripted coverage of the day as it actually unfolds — no forced posing.",
  },
  {
    id: "sp2",
    title: "Fine-Art Film Portraits",
    description: "Medium-format film work, shot for tone and grain, printed by hand in the studio darkroom.",
  },
  {
    id: "sp3",
    title: "Editorial Bridal Fashion",
    description: "Considered, stylized imagery made for publications and bridal designers.",
  },
  {
    id: "sp4",
    title: "Destination Elopements",
    description: "Intimate ceremonies in remote, dramatic locations — from coastlines to mountain passes.",
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

export type TimelineMilestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  /** Root-relative path under /public — every milestone now carries one, so
   * each timeline row pairs its own photo with its text (see TimelineItem).
   * Still optional in the type so a future milestone can be added text-only
   * without breaking the type. */
  image?: string;
  imageAlt?: string;
  /** Only meaningful when `image` is set — alternates the photo between a
   * full-color and a desaturated (grayscale-filter) treatment across the
   * two illustrated milestones, for the variety the brief asks for,
   * without depending on which source photos happen to already be shot
   * in black and white. */
  tone?: "color" | "mono";
};

export const timeline: TimelineMilestone[] = [
  {
    id: "t1",
    year: "2014",
    title: "A studio of one",
    description:
      "Dream Stories began as a single camera bag and a handful of wedding bookings, shot on borrowed weekends.",
    image: "/Experience/2.jpg",
    imageAlt: "Bride and groom embracing under a flowing veil against a sunlit building facade, in black and white",
    tone: "mono",
  },
  {
    id: "t2",
    year: "2016",
    title: "First gallery feature",
    description:
      "A quiet fine-art series on coastal light was exhibited in a small gallery — the first sign this could be a studio.",
    image: "/portfolio/1.jpeg",
    imageAlt: "Bride and groom smiling at each other in front of an ornate carved Gothic stone archway",
  },
  {
    id: "t3",
    year: "2018",
    title: "Studio & darkroom open",
    description:
      "Moved into a daylight studio with an in-house darkroom, allowing film work to sit alongside digital editorial.",
    image: "/portfolio/6.jpeg",
    imageAlt: "Black and white portrait of a couple standing before a grand estate house at dusk",
  },
  {
    id: "t4",
    year: "2020",
    title: "International assignments",
    description:
      "Editorial commissions began taking the studio abroad, building the travel documentary archive that continues today.",
    image: "/portfolio/11.jpg",
    imageAlt: "Bride and groom kissing under a green-domed garden pavilion ringed with classical columns",
  },
  {
    id: "t5",
    year: "2023",
    title: "A second photographer joins",
    description:
      "Dream Stories grew from a solo practice into a small collaborative studio, without changing how a shoot is run.",
    image: "/Experience/3.jpg",
    imageAlt: "Bride and groom feeding a giraffe together on a wedding day, a candid documentary moment",
    tone: "color",
  },
  {
    id: "t6",
    year: "2025",
    title: "500 stories, and counting",
    description:
      "Past 500 weddings, portraits, and editorial features later, the same principle holds: light first, everything after.",
    image: "/portfolio/8.jpg",
    imageAlt: "Bride and groom laughing together beneath a gilded domed alcove with classical columns",
  },
];

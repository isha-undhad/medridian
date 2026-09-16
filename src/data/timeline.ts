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
    title: "Where It All Began",
    description:
      "I started learning photography alongside college in 2014. What began as a curiosity slowly became a passion — learning to understand light, composition, people, and the stories hidden in everyday moments.",
    image: "/image/timeline/01.jpg",
    imageAlt: "Bride and groom embracing under a flowing veil against a sunlit building facade, in black and white",
    tone: "mono",
  },
  {
    id: "t2",
    year: "2016",
    title: "From Passion to Purpose",
    description:
      "Two years after discovering photography, I took the leap to start my first studio with partners. It was the beginning of turning a personal passion into something bigger — a creative space built around photography and storytelling.",
    image: "/image/timeline/02.jpg",
    imageAlt: "Bride and groom smiling at each other in front of an ornate carved Gothic stone archway",
  },
  {
    id: "t3",
    year: "2018",
    title: "A Dream Takes Shape",
    description:
      "I wanted to create a wedding photography company that could go beyond the usual — to travel, discover new places, and tell stories wherever love took us. In 2018, that vision became The Dream Stories, marking the beginning of our journey into destination weddings.",
    image: "/image/timeline/03.jpg",
    imageAlt: "Black and white portrait of a couple standing before a grand estate house at dusk",
  },
  {
    id: "t4",
    year: "2019",
    title: "The Decision to Tell Stories",
    description:
      "I stepped away from the studio and chose a different path — to focus entirely on weddings. From that point on, the couple's story became the priority: their people, their emotions, their little moments, and everything in between. The Dream Stories began to feel like more than a name. It became a vision.",
    image: "/image/timeline/04.jpg",
    imageAlt: "Bride and groom kissing under a green-domed garden pavilion ringed with classical columns",
  },
  {
    id: "t5",
    year: "2022",
    title: "Built on Stories, Grown on Trust",
    description:
      "In 2022, we opened our own office under The Dream Stories. By then, countless couples had trusted us with some of the most important days of their lives. Their genuine happiness, kind words, and honest reviews became a reminder that what we were creating meant more than just photographs.\n\nWe were building something on stories, relationships, and trust.",
    image: "/image/timeline/05.jpg",
    imageAlt: "Bride and groom feeding a giraffe together on a wedding day, a candid documentary moment",
    tone: "color",
  },
  {
    id: "t6",
    year: "2026",
    title: "The Story Continues",
    description:
      "Today, The Dream Stories spans 550+ cities and countless couples across India and beyond. From intimate celebrations to destination weddings, what matters most isn't the numbers — it's the trust behind every story, every couple, and every frame.",
    image: "/image/timeline/06.jpg",
    imageAlt: "Bride and groom laughing together beneath a gilded domed alcove with classical columns",
  },
];

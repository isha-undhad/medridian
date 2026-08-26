import Image from "next/image";

type GridImage = { src: string; alt: string };

// Distinct from Portfolio's Engagements-tab main grid above (see
// CATEGORY_IMAGES.Engagements in Portfolio.tsx) — no photo appears in both.
const PHOTOS: GridImage[] = [
  {
    src: "/home/couple.webp",
    alt: "Newlyweds kissing at the end of the aisle, red-rock desert ceremony in the background",
  },
  {
    src: "/home/portfolio1.jpg",
    alt: "Bride and groom dancing close together in a wood-paneled room lit by a wall sconce",
  },
  { src: "/home/portfolio2.jpg", alt: "Groom dipping his bride mid-dance in a wood-paneled ballroom" },
  { src: "/home/portfolio3.jpg", alt: "Bride twirling in her gown beside a horse in an open field" },
  {
    src: "/home/catagory1.jpg",
    alt: "Black and white portrait of a couple walking hand in hand across a grassy field beside a pond",
  },
  { src: "/portfolio/7.jpeg", alt: "Wedding guests toasting and laughing together at an outdoor reception" },
];

/**
 * Section B of the Engagements-only extra content — a plain, independent
 * photo grid rendered directly below <CinematicVideo> in <Portfolio>.
 * Deliberately its own top-level element, not merged into the video's
 * markup or folded into a single mixed bento/mosaic layout with it.
 */
export default function CinematicPhotoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {PHOTOS.map((photo) => (
        <div key={photo.src} className="relative aspect-[4/5] w-full overflow-hidden">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

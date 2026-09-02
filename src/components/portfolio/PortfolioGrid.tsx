import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";
import PortfolioCard from "./PortfolioCard";

type PortfolioGridProps = {
  /** Defaults to the full portfolio data set; pass a custom array to reuse
   * this grid for a different collection (e.g. a filtered category view). */
  items?: PortfolioItem[];
  /** Show only the first N items (used on the home page preview). */
  limit?: number;
  /** Choose layout style: multi-column masonry or flexbox wrapper */
  layout?: "columns" | "flex";
};

// Fallback images matching the reference image layout in case items array is short
const referencePhotos = [
  { id: "ref1", image: "/home/couple.webp", title: "Ceremony Kiss in Desert", width: 1000, height: 1500 },
  { id: "ref2", image: "/home/portfolio1.jpg", title: "Veil Portrait", width: 1000, height: 1200 },
  { id: "ref3", image: "/portfolio/7.jpeg", title: "Toast & Celebration", width: 1000, height: 1200 },
  { id: "ref4", image: "/home/catagory1.jpg", title: "Lake Walk Portrait", width: 1600, height: 900 },
  { id: "ref5", image: "/portfolio/3.jpeg", title: "Architecture & Ceremony", width: 1600, height: 1000 },
  { id: "ref6", image: "/home/catagory3.jpg", title: "Garden Kiss", width: 1000, height: 1200 },
  { id: "ref7", image: "/home/catagory5.jpg", title: "Ivy Doorway Entrance", width: 1000, height: 1200 },
];

export default function PortfolioGrid({
  items = portfolioItems,
  limit,
  layout = "columns",
}: PortfolioGridProps) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;

  if (layout === "flex") {
    // Map visible items or fill with reference photos to match reference layout exactly
    const photos = referencePhotos.map((ref, idx) => ({
      ...ref,
      image: visible[idx]?.image || ref.image,
      title: visible[idx]?.title || ref.title,
    }));

    return (
      <div className="flex flex-col gap-[4px]">
        {/* Block 1: Left tall featured photo (1 col) + Right 3-photo grid (2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[4px]">
          {/* Left tall photo — full height of the 2 right rows */}
          <Reveal variants={fadeUp} className="md:col-span-6 flex">
            <Link
              href={`/portfolio#${photos[0].id}`}
              className="group relative block w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] overflow-hidden rounded-sm"
            >
              <Image
                src={photos[0].image}
                alt={photos[0].title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>
          </Reveal>

          {/* Right side block */}
          <div className="md:col-span-6 flex flex-col gap-[4px]">
            {/* Top row: 1 photo on mobile, 2 photos on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[4px]">
              <Reveal variants={fadeUp} delay={0.05}>
                <Link
                  href={`/portfolio#${photos[1].id}`}
                  className="group relative block w-full aspect-square overflow-hidden rounded-sm"
                >
                  <Image
                    src={photos[1].image}
                    alt={photos[1].title}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
              </Reveal>
              <Reveal variants={fadeUp} delay={0.1}>
                <Link
                  href={`/portfolio#${photos[2].id}`}
                  className="group relative block w-full aspect-square overflow-hidden rounded-sm"
                >
                  <Image
                    src={photos[2].image}
                    alt={photos[2].title}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
              </Reveal>
            </div>
            {/* Bottom row: 1 wide photo */}
            <Reveal variants={fadeUp} delay={0.15} className="flex-1">
              <Link
                href={`/portfolio#${photos[3].id}`}
                className="group relative block w-full h-full min-h-[180px] sm:min-h-[220px] aspect-[16/9] overflow-hidden rounded-sm"
              >
                <Image
                  src={photos[3].image}
                  alt={photos[3].title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Block 2: Wide landscape left + 2 vertical photos right — aligned heights */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:items-stretch gap-[4px]">
          <Reveal variants={fadeUp} delay={0.2} className="md:col-span-7 flex">
            <Link
              href={`/portfolio#${photos[4].id}`}
              className="group relative block w-full aspect-[16/10] overflow-hidden rounded-sm"
            >
              <Image
                src={photos[4].image}
                alt={photos[4].title}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>
          </Reveal>
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-[4px]">
            <Reveal variants={fadeUp} delay={0.25} className="flex h-full">
              <Link
                href={`/portfolio#${photos[5].id}`}
                className="group relative block w-full h-full min-h-[220px] overflow-hidden rounded-sm"
              >
                <Image
                  src={photos[5].image}
                  alt={photos[5].title}
                  fill
                  sizes="(min-width: 768px) 20vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
            </Reveal>
            <Reveal variants={fadeUp} delay={0.3} className="flex h-full">
              <Link
                href={`/portfolio#${photos[6].id}`}
                className="group relative block w-full h-full min-h-[220px] overflow-hidden rounded-sm"
              >
                <Image
                  src={photos[6].image}
                  alt={photos[6].title}
                  fill
                  sizes="(min-width: 768px) 20vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-[4px] sm:columns-2 lg:columns-3">
      {visible.map((item, index) => (
        <PortfolioCard key={item.id} item={item} delay={(index % 3) * 0.08} />
      ))}
    </div>
  );
}

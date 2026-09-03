import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import type { PortfolioItem } from "@/data/portfolio";

export type PhotoGridProps = {
  /** Whatever's already been filtered/sliced by the caller (e.g.
   * getCategoryPhotos) — this component just lays out what it's given. */
  photos: PortfolioItem[];
};

/**
 * Even 3/2/1-column grid, deliberately not the CSS-columns masonry layout
 * PortfolioGrid uses on the main /portfolio page. Category pages show a
 * short, fixed set (up to 10) rather than the full data set, so uniform
 * tiles read as a curated, intentional selection instead of a scrolling
 * gallery. Renders however many photos it's given — no placeholders if
 * there are fewer than 10.
 */
export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[4px]">
      {photos.map((photo, index) => (
        <Reveal key={photo.id} variants={fadeUp} delay={(index % 3) * 0.08}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src={photo.image}
              alt={photo.title ?? ""}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

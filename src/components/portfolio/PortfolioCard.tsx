import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import type { PortfolioItem } from "@/data/portfolio";

type PortfolioCardProps = {
  item: PortfolioItem;
  delay?: number;
};

/** Masonry tile: rendered at its real width/height (no `fill`, no forced
 * aspect-ratio wrapper) so portrait, landscape, and square photos all size
 * naturally within the column — that's what produces the staggered column
 * heights. `break-inside-avoid` keeps a tile from being split across a
 * CSS-columns break; `mb-3` supplies the vertical gap columns don't get for
 * free. No caption/overlay — just the photo.
 *
 * `item.title` still feeds the <Image> alt text for accessibility even
 * though it's never rendered visibly. */
export default function PortfolioCard({ item, delay = 0 }: PortfolioCardProps) {
  return (
    <Reveal variants={fadeUp} delay={delay} className="mb-3 break-inside-avoid">
      <Link href={`/portfolio#${item.id}`} className="group block overflow-hidden">
        <Image
          src={item.image}
          alt={item.title ?? ""}
          width={item.width}
          height={item.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>
    </Reveal>
  );
}

import Image from "next/image";

type HeroGalleryProps = {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
};

/**
 * Full-bleed two-column editorial hero — two portrait photos filling equal
 * columns edge-to-edge, no gap, no rounded corners, no text/overlay. Meant
 * to run as the very first section on a page, above any other gallery/grid
 * content.
 *
 * Side-by-side from `md:` up, filling the full screen height (`h-dvh` — the
 * *dynamic* viewport unit, so it accounts for mobile browser chrome
 * showing/hiding instead of `vh`'s fixed-at-load value); stacked (one
 * column) below that, since two full-height columns can't sit next to each
 * other on a narrow viewport without shrinking the photos past recognition.
 */
export default function HeroGallery({
  leftImage,
  rightImage,
  leftAlt = "",
  rightAlt = "",
}: HeroGalleryProps) {
  return (
    <section className="relative w-full overflow-hidden grid grid-cols-1 h-dvh md:grid-cols-2">
      {/* 1st image: full hero banner on mobile, left column on desktop */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={leftImage}
          alt={leftAlt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {/* 2nd image: hidden on mobile, right column on desktop */}
      <div className="relative hidden h-full w-full overflow-hidden md:block">
        <Image
          src={rightImage}
          alt={rightAlt}
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

/**
 * Example usage — drop in as the first thing rendered on a page:
 *
 *   import HeroGallery from "@/components/portfolio/HeroGallery";
 *
 *   <HeroGallery
 *     leftImage="/portfolio/1.jpeg"
 *     rightImage="/portfolio/3.jpeg"
 *     leftAlt="Bride and groom embracing beneath a carved stone archway"
 *     rightAlt="Bride and groom kissing beneath a colonnade"
 *   />
 */

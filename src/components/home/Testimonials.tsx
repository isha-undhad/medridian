import Image from "next/image";

export interface TestimonialsProps {
  bgImage?: string;
}

/** Pure image band: a full-bleed wedding photo under a dark dimming overlay.
 * Previously carried a testimonial quote overlaid on top — removed entirely
 * per request, leaving this as a visual break between sections.
 *
 * Renders at the image's own natural aspect ratio rather than being cropped
 * into a fixed/min-height box: `width`/`height` below are the source file's
 * actual intrinsic pixel dimensions (2500x1667, from public/home/couple.webp),
 * which is what lets `w-full h-auto` scale it to the container's full width
 * with height following proportionally — no `fill`, no `object-cover`, no
 * min-height guesswork, so the section's rendered height is always exactly
 * the image's own height and nothing crops or stretches. */
export default function Testimonials({ bgImage = "/home/couple.webp" }: TestimonialsProps) {
  return (
    <section className="relative w-full">
      {/* Background Image: sharp wedding photo from public/home/couple.webp,
          shown at its full natural size (no cropping). */}
      <Image
        src={bgImage}
        alt="Wedding couple background"
        width={2500}
        height={1667}
        sizes="100vw"
        className="block h-auto w-full"
        priority
      />

      {/* Dark overlay over the image — sits above the photo, full-bleed
          across the section, so the background reads dimmed rather than
          washed-out. */}
      <div className="absolute inset-0 z-[5] bg-black/70" />
    </section>
  );
}

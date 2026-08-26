
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { slideInLeft, slideInRight } from "@/lib/motion";

export interface AboutIntroProps {
  /** Big serif headline on the left. Left as a single string (not pre-split
   * into lines) so it reflows naturally — the max-width below is tuned to
   * wrap typical copy into ~5 narrow lines at the desktop size (a compact,
   * editorial column rather than a few large ones), but isn't a hard
   * requirement. Placeholder copy — swap for real copy when ready. */
  heading?: string;
  /** Small uppercase eyebrow above the paragraph on the right. */
  label?: string;
  /** Body copy on the right. */
  body?: string;
  /** Larger, portrait-orientation image — the top-right tile of the collage.
   * Defaults to public/about/1.jpg. */
  primaryImage?: string;
  primaryImageAlt?: string;
  /** Smaller image staggered bottom-left, overlapping the primary image.
   * Defaults to public/about/2.jpeg. */
  secondaryImage?: string;
  secondaryImageAlt?: string;
}

const defaultHeading = "Who Care About Atmosphere, Design and Genuine Moments";
const defaultBody =
  "Every wedding starts with the same question: what does this day actually feel like? " +
  "I build coverage around unscripted moments — light catching a veil in a doorway, hands " +
  "finding each other under the table.";

/**
 * First section on the About page: a compact, editorial-style uppercase
 * serif headline (with a tightly staggered two-image collage stacked right
 * under it) on the left — ~60% width — and a short labeled paragraph on the
 * right — ~40% width. Sits above PageHeader, so it has no background image
 * of its own — this is the quiet, text-led opener before the hero banner.
 *
 * Layout is a single 5-column grid (`lg:grid-cols-5`) with `lg:items-start`:
 * the heading+collage block (`lg:col-span-3`) and the label+paragraph block
 * (`lg:col-span-2`) are independent grid-column siblings, both anchored to
 * the same top grid line — a true 60/40 split, not an approximation via 3
 * equal columns. The right block then carries its own `lg:mt-56` to drop
 * "My Approach" down to roughly the collage's vertical middle instead of
 * sitting flush with the heading's top edge, matching the reference layout
 * (a stray change to that offset — or to the collage's `h-[580px]` — is the
 * first thing to check if the two ever drift out of alignment again).
 *
 * Deliberately overrides the shared <Section> py-16/20/24 rhythm with a
 * smaller py-10/12/14 here — every other section on the site uses the
 * standard padding, but this opener is meant to read as a tight editorial
 * block, not a full-height section.
 */
export default function AboutIntro({
  heading = defaultHeading,
  label = "My Approach",
  body = defaultBody,
  primaryImage = "/about/1.jpg",
  primaryImageAlt = "Bride adjusting her veil in close detail",
  secondaryImage = "/about/2.jpeg",
  secondaryImageAlt = "Bride and groom walking together outside a venue",
}: AboutIntroProps) {
  return (
    <Section className="mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-10 md:pt-24 md:pb-12 lg:pt-28 lg:pb-14">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-5 lg:items-start lg:gap-x-12 xl:gap-x-16">
        {/* Left: heading + 50-50 2-image row (3 of 5 cols on lg) */}
        <div className="lg:col-span-3">
          <Reveal variants={slideInLeft} className="relative z-10">
            <h2 className="max-w-[22ch] text-left font-serif text-2xl leading-[1.08] font-medium tracking-tight text-[var(--color-ink)] uppercase sm:text-3xl lg:text-4xl text-balance">
              {heading}
            </h2>
          </Reveal>

          {/* 50-50 side-by-side equal images with zero cropping or distortion */}
          <Reveal
            variants={slideInLeft}
            delay={0.1}
            className="relative mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[var(--color-line)]/20 shadow-sm">
              <Image
                src={primaryImage}
                alt={primaryImageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[var(--color-line)]/20 shadow-sm">
              <Image
                src={secondaryImage}
                alt={secondaryImageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Right: label + paragraph (2 of 5 cols on lg) */}
        <Reveal
          variants={slideInRight}
          delay={0.15}
          className="flex max-w-[440px] flex-col gap-4 sm:gap-5 lg:col-span-2 lg:mt-24 xl:mt-28 lg:justify-self-end"
        >
          <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
            {label}
          </span>
          <p className="font-serif text-base leading-relaxed text-[var(--color-body)] sm:text-lg">
            {body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

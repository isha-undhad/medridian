import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { slideInLeft, slideInRight, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface AboutHeroProps {
  /** Large uppercase serif headline on the left top */
  heading?: string;
  /** Eyebrow label on the right */
  label?: string;
  /** Body paragraph on the right */
  bodyText?: string;
  /** Full-color portrait photo (lower-left) */
  colorImageSrc?: string;
  colorImageAlt?: string;
  /** Black-and-white portrait photo (center/upper-right overlapping) */
  bwImageSrc?: string;
  bwImageAlt?: string;
  /** Optional extra classes on the section */
  className?: string;
}

const defaultHeading =
  "AN EDITORIAL APPROACH TO WEDDING PHOTOGRAPHY, CREATED FOR THE EXTRAORDINARY";

const defaultLabel = "TDS APPROACH";

const defaultBodyText =
  "At The Dream Stories, photography is more than documentation. It is an art of observation — of seeing the beauty in the fleeting, the intimate, and the unexpected. From grand celebrations to the quiet moments in between, we approach every wedding with intention, allowing genuine emotion and natural connection to lead the frame. With a refined visual language and an appreciation for detail, we create photographs that feel timeless, personal, and effortlessly elegant. Your day, as beautifully as it felt.";

export default function AboutHero({
  heading = defaultHeading,
  label = defaultLabel,
  bodyText = defaultBodyText,
  colorImageSrc = "/image/about_approch/Tezza-2775.JPG",
  colorImageAlt = "Bride and groom in front of the brick house",
  bwImageSrc = "/image/about_approch/Tezza-2875.JPG",
  bwImageAlt = "Black and white veil close-up",
  className,
}: AboutHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full flex flex-col items-center bg-[#faf8f5] px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 overflow-hidden",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] items-start gap-10 lg:gap-10 xl:gap-14">
        {/* COLUMN 1 (Left: Heading on top-left, two photos side by side below it) */}
        <div className="relative flex flex-col items-start w-full">
          {/* 1. Heading on the upper-left (z-30 so it renders on top of the overlapping photo) */}
          <Reveal variants={slideInLeft} className="relative z-30 w-full">
            <h2 className="font-cormorant text-[20px] sm:text-[23px] md:text-[25px] lg:text-[27px] font-light tracking-[0.01em] leading-[1.25] text-neutral-900 uppercase text-left max-w-full sm:max-w-[460px] lg:max-w-[420px]">
              {heading}
            </h2>
          </Reveal>

          {/* 2. Side-by-Side Photo Pair — equal-height, no overlap */}
          <div className="flex w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] items-stretch gap-1 mt-6 sm:mt-7 lg:mt-4">
            {/* Color Photo */}
            <Reveal
              variants={fadeUp}
              delay={0.15}
              className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:h-[320px] overflow-hidden rounded-none shadow-none border-none bg-[var(--color-line)]/20"
            >
              <Image
                src={colorImageSrc}
                alt={colorImageAlt}
                fill
                sizes="(min-width: 1024px) 230px, (min-width: 640px) 190px, 150px"
                className="object-cover"
                priority
              />
            </Reveal>

            {/* B&W Photo */}
            <Reveal
              variants={fadeUp}
              delay={0.25}
              className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:h-[320px] overflow-hidden rounded-none shadow-none bg-[var(--color-line)]/20"
            >
              <Image
                src={bwImageSrc}
                alt={bwImageAlt}
                fill
                sizes="(min-width: 1024px) 230px, (min-width: 640px) 190px, 150px"
                className="object-cover"
                priority
              />
            </Reveal>
          </div>
        </div>

        {/* COLUMN 2 (Right: MY APPROACH text block, positioned closely beside the B&W photo) */}
        <div className="w-full lg:max-w-[480px] xl:max-w-[500px] flex flex-col items-start justify-center pt-6 lg:pt-24 xl:pt-28">
          <Reveal variants={slideInRight} delay={0.2} className="flex flex-col items-start text-left w-full">
            <span className="font-serif text-[11px] sm:text-xs font-normal uppercase tracking-[0.25em] text-amber-800/70 mb-4 sm:mb-6">
              {label}
            </span>
            <p className="font-serif text-xs sm:text-[13.5px] leading-[1.8] text-stone-600 text-pretty">
              {bodyText}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

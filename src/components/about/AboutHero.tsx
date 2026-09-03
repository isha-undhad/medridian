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
  "HEARTFELT, STORY-DRIVEN WEDDING PHOTOGRAPHY FOR COUPLES WHO VALUE EMOTION, DESTINATION AND TIMELESS DETAIL";

const defaultLabel = "MY APPROACH";

const defaultBodyText =
  "I take a heartfelt, story-driven approach to photographing weddings — staying close to the moment, gently guiding when it helps, and always tuned in to the emotion of the day. As a wedding and travel photographer based in Surat, India, I document celebrations through a natural blend of candid, unscripted moments and carefully composed portraits. From quiet in-between moments to the big, emotional ones, every part of the day is captured in a way that feels genuine, elevated and true to you. I'm drawn to weddings full of warmth, culture and real connection — where every detail, from architecture to attire, tells part of the story. I'm especially inspired by beautiful locations, thoughtful design, and couples who care about creating memories that last a lifetime.";

export default function AboutHero({
  heading = defaultHeading,
  label = defaultLabel,
  bodyText = defaultBodyText,
  colorImageSrc = "/about/2.jpeg",
  colorImageAlt = "Bride and groom standing outside grand estate in full color",
  bwImageSrc = "/about/1.jpg",
  bwImageAlt = "Bride veiled in intimate black-and-white portrait",
  className,
}: AboutHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[100dvh] flex flex-col justify-center items-center bg-[#faf8f5] px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-12 xl:gap-16">
        {/* COLUMN 1 (Left: Heading on top-left, Color image lower-left, B&W image overlapping beside heading) */}
        <div className="relative flex flex-col items-start w-full lg:w-[540px] xl:w-[560px] shrink-0">
          {/* 1. Heading on the upper-left (z-30 so it renders on top of the overlapping photo) */}
          <Reveal variants={slideInLeft} className="relative z-30 w-full">
            <h2 className="font-cormorant text-[22px] sm:text-[26px] md:text-[28px] lg:text-[31px] font-light tracking-[0.01em] leading-[1.25] text-neutral-900 uppercase text-left max-w-full sm:max-w-[460px] lg:max-w-[380px]">
              {heading}
            </h2>
          </Reveal>

          {/* 2. Responsive Photo Composition (Staggered layered collage on mobile, exact absolute positioning on desktop) */}
          <div className="relative mt-8 sm:mt-10 lg:mt-0 w-full max-w-[330px] sm:max-w-[400px] lg:max-w-none">
            {/* Color Photo (Primary) */}
            <div className="relative z-10 w-[72%] sm:w-[68%] lg:w-[280px] lg:mt-12">
              <Reveal
                variants={fadeUp}
                delay={0.15}
                className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-none shadow-none border-none bg-[var(--color-line)]/20"
              >
                <Image
                  src={colorImageSrc}
                  alt={colorImageAlt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 270px, 230px"
                  className="object-cover"
                  priority
                />
              </Reveal>
            </div>

            {/* B&W Photo (Secondary Overlapping) */}
            <Reveal
              variants={fadeUp}
              delay={0.25}
              className="absolute right-0 bottom-[-16px] sm:bottom-[-20px] lg:bottom-auto lg:right-auto lg:left-[230px] lg:top-[90px] z-20 w-[55%] sm:w-[52%] lg:w-[305px] aspect-[3/4] lg:aspect-auto lg:h-[425px] overflow-hidden rounded-none shadow-none ring-[4px] sm:ring-[5px] ring-[#faf8f5] bg-[var(--color-line)]/20"
            >
              <Image
                src={bwImageSrc}
                alt={bwImageAlt}
                fill
                sizes="(min-width: 1024px) 305px, (min-width: 640px) 210px, 175px"
                className="object-cover grayscale"
                priority
              />
            </Reveal>
          </div>
        </div>

        {/* COLUMN 2 (Right: MY APPROACH text block, positioned closely beside the B&W photo) */}
        <div className="w-full lg:max-w-[400px] xl:max-w-[430px] flex flex-col items-start justify-center pt-6 lg:pt-24 xl:pt-28">
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

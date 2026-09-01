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
  "RELAXED, FASHION-LED IMAGERY FOR COUPLES WHO CARE ABOUT ATMOSPHERE, DESIGN AND GENUINE MOMENTS";

const defaultLabel = "MY APPROACH";

const defaultBodyText =
  "I take a relaxed, thoughtful approach to photographing weddings — quietly observing, gently guiding when needed, and always tuned in to the feeling of the day. As an editorial wedding photographer in the UK, I document modern celebrations through a natural blend of honest documentary moments and refined, fashion-led portraits. From unposed interactions to more considered imagery, every part of the day is captured in a way that feels effortless, elevated and true to you. I'm drawn to stylish weddings full of warmth, personality and genuine connection — where laughter flows freely, the atmosphere feels electric, and the celebration reflects who you are. I'm especially inspired by thoughtful design, beautiful architecture, fashion-forward details and couples who care deeply about creating something memorable.";

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
            <h2 className="font-cormorant text-[25px] sm:text-[28px] md:text-[31px] font-light tracking-[0.01em] leading-[1.25] text-neutral-900 uppercase text-left max-w-[320px] sm:max-w-[350px] md:max-w-[380px]">
              {heading}
            </h2>
          </Reveal>

          {/* 2. Color Photo: sits directly below the heading on the left */}
          <div className="mt-8 sm:mt-10 md:mt-12 relative z-10 w-[230px] sm:w-[260px] md:w-[280px]">
            <Reveal
              variants={fadeUp}
              delay={0.15}
              className="relative w-full h-[330px] sm:h-[370px] md:h-[400px] overflow-hidden rounded-none shadow-none border-none bg-[var(--color-line)]/20"
            >
              <Image
                src={colorImageSrc}
                alt={colorImageAlt}
                fill
                sizes="(min-width: 768px) 280px, 230px"
                className="object-cover"
                priority
              />
            </Reveal>
          </div>

          {/* 3. B&W Photo: absolute, starts beside heading lines 3-4, with a subtle ~4-5px separation ring over color photo */}
          <Reveal
            variants={fadeUp}
            delay={0.25}
            className="absolute left-[160px] sm:left-[190px] md:left-[215px] lg:left-[230px] top-[70px] sm:top-[80px] md:top-[90px] z-20 w-[240px] sm:w-[280px] md:w-[305px] h-[340px] sm:h-[390px] md:h-[425px] overflow-hidden rounded-none shadow-none ring-[4px] sm:ring-[5px] ring-[#faf8f5] bg-[var(--color-line)]/20"
          >
            <Image
              src={bwImageSrc}
              alt={bwImageAlt}
              fill
              sizes="(min-width: 768px) 305px, 240px"
              className="object-cover grayscale"
              priority
            />
          </Reveal>
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

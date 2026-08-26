
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export interface InquireCtaProps {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  imageAlt?: string;
  grayscale?: boolean;
}

export default function InquireCta({
  eyebrow = "MERIDIAN STUDIO",
  heading = "The Story Continues",
  subtitle = "Every chapter leads to another story worth remembering.",
  ctaText = "Inquire",
  ctaLink = "/contact",
  image = "/home/catagory3.jpg",
  imageAlt = "Couple standing on rooftop balcony at golden hour",
  grayscale = false,
}: InquireCtaProps) {
  return (
    <section className="relative flex h-dvh min-h-[500px] w-full items-center justify-center overflow-hidden my-0">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className={`object-cover ${grayscale ? "grayscale" : ""}`}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-6 text-center">
        {eyebrow ? (
          <Reveal variants={fadeUp}>
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] text-white uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              {eyebrow}
            </span>
          </Reveal>
        ) : null}
        <Reveal variants={fadeUp} delay={0.08}>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.08] text-white text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {heading}
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.15}>
          <p className="max-w-md text-xs sm:text-sm lg:text-base leading-relaxed !text-white text-white font-normal text-pretty drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {subtitle}
          </p>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.22}>
          <LinkButton
            href={ctaLink}
            variant="light"
            className="mt-2 sm:mt-3 !px-4 !py-2 sm:!px-6 sm:!py-2.5 !text-[11px] sm:!text-xs md:!text-sm !min-h-[36px] sm:!min-h-[42px] tracking-[0.15em] uppercase font-medium"
          >
            {ctaText}
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Example usage — drop in as the last full-bleed section on a page, right
 * before a lighter closing section:
 *
 *   import InquireCta from "@/components/about/InquireCta";
 *
 *   // Zero-config: renders with the defaults above.
 *   <InquireCta />
 *
 *   // Overridden:
 *   <InquireCta
 *     heading="Let's Tell Your Story"
 *     subtitle="Every great gallery starts with a conversation."
 *     ctaText="Get in Touch"
 *     ctaLink="/contact"
 *     image="/home/slider2.jpg"
 *   />
 */

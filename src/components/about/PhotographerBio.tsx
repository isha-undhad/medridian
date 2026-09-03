import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { slideInLeft, slideInRight } from "@/lib/motion";
import { photographer } from "@/data/photographer";

export default function PhotographerBio() {
  return (
    // pt-0 at every breakpoint Section itself uses: Specialties (the section
    // right above this one, now that the two were reordered) already ends
    // in its own bottom padding via the same shared <Section>, so stacking
    // this one's default top padding on top of that doubles the gap into
    // the large blank band this was fixed for. Each pt-0 has to repeat
    // Section's own md:/lg: prefixes — an unprefixed pt-0 only cancels the
    // base py-16's top half.
    <Section className="mx-auto max-w-7xl px-6 pt-6 sm:px-10 sm:pt-8 md:pt-10 lg:pt-12">
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        <Reveal variants={slideInLeft} className="w-full">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
            <Image
              src="/about/photographer.jpg"
              alt="Portrait of Ravi Barvaliya seated on a stone bench, smiling at the camera"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal variants={slideInRight} delay={0.1} className="flex flex-col gap-5">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent-ink)]">
            {photographer.role}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-ink)]">
            {photographer.name}
          </h2>
          <div className="flex flex-col gap-4 leading-relaxed text-[var(--color-body)]">
            {photographer.bio.map((paragraph) => (
              <p key={paragraph} className="text-xs sm:text-sm lg:text-body">{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-2 border-l-2 border-[var(--color-accent)] pl-4 sm:pl-5 font-serif text-sm sm:text-base lg:text-xl italic text-[var(--color-ink)]">
            &ldquo;{photographer.quote}&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}

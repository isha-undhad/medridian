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
    <Section className="mx-auto max-w-7xl px-6 pt-0 sm:px-10 md:pt-0 lg:pt-0">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal variants={slideInLeft}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
            <Image
              src="/about/photographer.jpg"
              alt="Portrait of Ava Bennett seated on a stone bench, smiling at the camera"
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
          <h2 className="font-serif text-3xl text-[var(--color-ink)] sm:text-4xl">
            {photographer.name}
          </h2>
          <div className="flex flex-col gap-4 leading-relaxed text-[var(--color-body)]">
            {photographer.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-2 border-l-2 border-[var(--color-accent)] pl-5 font-serif text-xl italic text-[var(--color-ink)]">
            &ldquo;{photographer.quote}&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}

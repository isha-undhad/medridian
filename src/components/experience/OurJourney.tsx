import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Timeline from "@/components/about/Timeline";
import { fadeUp } from "@/lib/motion";

/**
 * "Our Journey" — the Experience page's full timeline section: header
 * photo, eyebrow/title, the alternating zigzag <Timeline>, and a small
 * closing label, all in one component per the brief. This replaces the
 * previous two-piece layout (a standalone <ExperienceHeroImage> section
 * followed by a second <Section> holding just the heading + <Timeline>) —
 * folding both into one <Section> means only one default top/bottom
 * padding applies around the whole block, instead of two adjacent
 * Sections needing a zeroed seam between them.
 *
 * The hero photo reuses /Experience/1.jpg, which also closes the page in
 * <ExperienceClosing> further down — that bookend repeat was already the
 * existing pattern before this change (the old <ExperienceHeroImage> used
 * the same photo), so nothing new is being duplicated on the page.
 */
export default function OurJourney() {
  return (
    <Section className="mx-auto max-w-7xl px-4 sm:px-8 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal variants={fadeUp} className="flex flex-col items-start gap-1.5 sm:gap-2 text-left">
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-[clamp(1.15rem,4.8vw,2.75rem)] leading-[1.15] text-[var(--color-ink)] whitespace-nowrap">
            The Meridian Timeline
          </h2>
          <span className="mt-0.5 text-[10px] sm:text-xs tracking-[0.25em] text-[var(--color-muted)] uppercase">
            Meridian Studio, Est. 2014
          </span>
        </Reveal>

        <div className="mt-8 md:mt-12">
          <Timeline />
        </div>
      </div>
    </Section>
  );
}

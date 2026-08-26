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
    <Section className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal variants={fadeUp} className="flex flex-col items-start gap-3 text-left">
          <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl leading-[1.1] text-[var(--color-ink)] sm:text-4xl md:text-5xl">
            The Meridian Timeline
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <Timeline />
        </div>

        <Reveal
          variants={fadeUp}
          className="mt-12 text-center text-xs font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase md:mt-16"
        >
          Meridian Studio, Est. 2014
        </Reveal>
      </div>
    </Section>
  );
}

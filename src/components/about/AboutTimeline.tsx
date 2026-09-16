import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Timeline from "@/components/about/Timeline";
import { fadeUp } from "@/lib/motion";

export default function AboutTimeline() {
  return (
    // pt-0 at every breakpoint Section itself uses: PhotographerBio (the
    // section right above this one) already ends in its own bottom padding
    // via the same shared <Section>, so stacking this one's default top
    // padding on top of that doubles the gap into a large blank band.
    <Section className="mx-auto max-w-7xl px-6 pt-0 sm:px-10 sm:pt-0 md:pt-0 lg:pt-0">
      <div className="mx-auto max-w-4xl">
        <Reveal variants={fadeUp} className="flex flex-col items-start gap-1.5 sm:gap-2 text-left">
          <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-ink)] leading-tight">
            The Dream Stories Timeline
          </h2>
        </Reveal>

        <div className="mt-8 sm:mt-10 md:mt-12">
          <Timeline />
        </div>
      </div>
    </Section>
  );
}

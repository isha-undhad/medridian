import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";
import { awards } from "@/data/photographer";

export default function Awards() {
  return (
    <Section className="mx-auto max-w-4xl px-6 sm:px-10">
      <SectionHeading eyebrow="Recognition" title="Awards & Press" />
      <div className="mt-12 flex flex-col">
        {awards.map((award, index) => (
          <Reveal key={award.id} variants={fadeUp} delay={index * 0.06}>
            <div className="flex flex-col gap-1 border-b border-[var(--color-line)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-medium tracking-wide text-[var(--color-accent-ink)]">
                  {award.year}
                </span>
                <span className="font-serif text-lg text-[var(--color-ink)]">{award.title}</span>
              </div>
              <span className="text-sm text-[var(--color-muted)]">{award.organization}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

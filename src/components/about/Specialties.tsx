import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";
import { specialties } from "@/data/photographer";

export default function Specialties() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <Section as="div" className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="What She Shoots"
          title="Behind the Camera"
          subtitle="The genres and formats Ava returns to on every assignment, from a first look to the last print."
        />
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 grid grid-cols-1 gap-x-8 gap-y-6 sm:gap-x-10 sm:gap-y-8 sm:grid-cols-2">
          {specialties.map((item, index) => (
            <Reveal key={item.id} variants={fadeUp} delay={(index % 2) * 0.08}>
              <div className="border-t border-[var(--color-line)] pt-6">
                <h3 className="font-serif text-xl text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm lg:text-body leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </section>
  );
}

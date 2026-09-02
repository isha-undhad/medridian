import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import StoryCard from "@/components/stories/StoryCard";
import { getAllStories } from "@/components/stories/StoriesData";

export const metadata: Metadata = {
  title: "Love Stories — Dream Stories Photography",
  description:
    "Explore our collection of real wedding stories, documenting romantic, editorial celebrations worldwide.",
};

export default function StoriesPage() {
  const storiesList = getAllStories();

  return (
    <div className="w-full bg-[var(--color-bg)] text-[var(--color-ink)]">
      {/* Page Header Area */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 text-center">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <Reveal variants={fadeUp}>
            <span className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--color-accent-ink)]">
              Real Celebrations
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--color-ink)] uppercase">
              Stories
            </h1>
            <p className="mt-4 mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[var(--color-body)] text-pretty">
              Every couple brings a unique atmosphere, emotion, and story. Explore a selection of complete wedding days captured across the globe.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stories Feed — Vertical Stack with Generous 60-100px Spacing */}
      <Section className="pt-0 pb-20 sm:pb-28 md:pb-36">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
            {storiesList.map((story, index) => (
              <Reveal key={story.slug} variants={fadeUp} delay={index * 0.1}>
                <StoryCard story={story} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

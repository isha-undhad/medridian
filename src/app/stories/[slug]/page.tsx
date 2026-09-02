import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import StoryGallery from "@/components/stories/StoryGallery";
import {
  getAllStories,
  getStoryBySlug,
  getStoryImages,
  getAdjacentStories,
} from "@/components/stories/StoriesData";

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found — Dream Stories",
    };
  }

  return {
    title: `${story.coupleNames} — Wedding Story | Dream Stories`,
    description: story.excerptText,
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  // Dynamically load all story images from public/stories/ (excluding 101.jpg and banner assets)
  const images = getStoryImages(slug);
  const { prevStory, nextStory } = getAdjacentStories(slug);

  return (
    <article className="w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      {/* 1. Large Top Hero Image (full image visible with object-contain & natural aspect ratio) */}
      <section className="w-full pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal variants={fadeUp}>
          <div className="relative w-full max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden bg-[var(--color-bg)]">
            <Image
              src={story.bannerImage || "/stories/101.png"}
              alt={story.bannerAlt || `${story.coupleNames} Wedding Banner`}
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="w-auto h-auto max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain mx-auto"
            />
          </div>
        </Reveal>
      </section>

      {/* 2. Centered Editorial Content Column */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-10 pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-28">
        {/* Story Intro Block (Below the Hero Image) */}
        <header className="mb-10 sm:mb-14 text-center">
          <Reveal variants={fadeUp}>
            {/* Couple Names (Large Serif Heading) */}
            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--color-ink)] uppercase text-balance">
              {story.coupleNames}
            </h1>

            {/* Location & Date Subtitle Line */}
            <p className="mt-3 sm:mt-4 font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--color-accent-ink)]">
              {story.location} &middot; {story.date}
            </p>

            {/* Single, Centered, Condensed Creative Credits List */}
            {story.creditsList && story.creditsList.length > 0 ? (
              <div className="mt-6 sm:mt-8 pt-6 border-t border-[var(--color-line)]/50 flex flex-col items-center gap-1.5 text-xs sm:text-[13px] text-[var(--color-muted)] font-serif leading-relaxed">
                {story.creditsList.map((credit, idx) => (
                  <p key={idx} className="tracking-wide">
                    <span className="text-[var(--color-ink)]/75 font-medium">{credit.label}:</span>{" "}
                    {credit.value}
                  </p>
                ))}
              </div>
            ) : null}
          </Reveal>
        </header>

        {/* 3. Mixed Masonry Photo Gallery Grid (Excludes 101.jpg) */}
        <section aria-label={`${story.coupleNames} Photo Gallery`} className="w-full">
          <StoryGallery images={images} coupleNames={story.coupleNames} />
        </section>

        {/* 4. Bottom Adjacent Story Navigation & Inquiry CTA */}
        <footer className="mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-[var(--color-line)] flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase">
            {prevStory ? (
              <Link
                href={`/stories/${prevStory.slug}`}
                className="group inline-flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-ink)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Previous:</span> {prevStory.coupleNames}
              </Link>
            ) : (
              <Link
                href="/stories"
                className="group inline-flex items-center gap-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                All Stories
              </Link>
            )}

            {nextStory ? (
              <Link
                href={`/stories/${nextStory.slug}`}
                className="group inline-flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-ink)]"
              >
                <span className="hidden sm:inline">Next:</span> {nextStory.coupleNames}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] px-6 py-2.5 text-xs font-medium tracking-wide text-white transition-all duration-300 hover:bg-[var(--color-accent-ink)] hover:shadow-md"
              >
                Inquire for Your Date
              </Link>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}

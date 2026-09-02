import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "./StoriesData";

export interface StoryCardProps {
  story: Story;
  priority?: boolean;
}

export default function StoryCard({ story, priority = false }: StoryCardProps) {
  const storyUrl = `/stories/${story.slug}`;

  return (
    <article className="group w-full flex flex-col items-start bg-transparent">
      {/* Full-width horizontal banner image with couple's names overlay/artwork */}
      <Link
        href={storyUrl}
        aria-label={`Read story of ${story.coupleNames}`}
        className="relative block w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] overflow-hidden rounded-sm bg-[var(--color-line)]/20 shadow-sm"
      >
        <Image
          src={story.bannerImage}
          alt={story.bannerAlt || `${story.coupleNames} Wedding Story`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Artistic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-85" />

        {/* Overlay Couple Names Artwork */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105">
            {story.coupleNames}
          </span>
        </div>
      </Link>

      {/* Content below the banner */}
      <div className="mt-5 sm:mt-6 md:mt-8 w-full flex flex-col items-start max-w-3xl">
        {/* Metadata Line */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs font-normal uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
          <span>{story.location}</span>
          <span aria-hidden className="text-[var(--color-muted)]/50">&middot;</span>
          <span>{story.date}</span>
        </div>

        {/* Couple Names Heading */}
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent-ink)]">
          <Link href={storyUrl}>
            {story.coupleNames}
          </Link>
        </h2>

        {/* 1-2 line Excerpt */}
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--color-body)] text-pretty line-clamp-2">
          {story.excerptText}
        </p>

        {/* Read More Link */}
        <Link
          href={storyUrl}
          className="mt-4 sm:mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-ink)] transition-all duration-300 hover:text-[var(--color-accent-ink)] hover:translate-x-1"
        >
          <span>Read Story</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

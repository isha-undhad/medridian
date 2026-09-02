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
      {/* Viewport-scaled horizontal banner image with couple's names overlay/artwork */}
      <Link
        href={storyUrl}
        aria-label={`Read story of ${story.coupleNames}`}
        className="relative block w-full h-[40vh] sm:h-[46vh] md:h-[48vh] max-h-[460px] min-h-[260px] overflow-hidden rounded-sm bg-[var(--color-bg)] shadow-sm"
      >
        <Image
          src={story.bannerImage}
          alt={story.bannerAlt || `${story.coupleNames} Wedding Story`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Artistic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-70" />

        {/* Overlay Couple Names Artwork */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 text-center pointer-events-none">
          <span className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105">
            {story.coupleNames}
          </span>
        </div>
      </Link>

      {/* Content below the banner — compact to fit cleanly within one screen view */}
      <div className="mt-3 sm:mt-4 w-full flex flex-col items-start max-w-3xl">
        {/* Metadata Line */}
        <div className="flex items-center gap-2.5 text-[10.5px] sm:text-xs font-normal uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
          <span>{story.location}</span>
          <span aria-hidden className="text-[var(--color-muted)]/50">&middot;</span>
          <span>{story.date}</span>
        </div>

        {/* Couple Names Heading */}
        <h2 className="mt-1 font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent-ink)]">
          <Link href={storyUrl}>
            {story.coupleNames}
          </Link>
        </h2>

        {/* 1-2 line Excerpt */}
        <p className="mt-1.5 text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-[var(--color-body)] text-pretty line-clamp-2">
          {story.excerptText}
        </p>

        {/* Read More Link */}
        <Link
          href={storyUrl}
          className="mt-2.5 sm:mt-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-ink)] transition-all duration-300 hover:text-[var(--color-accent-ink)] hover:translate-x-1"
        >
          <span>Read Story</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

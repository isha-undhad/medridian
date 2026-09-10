import Image from "next/image";
import { SocialIconGlyph } from "@/components/ui/SocialIcons";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

// Single source of truth for both the handle text and the profile link
const INSTAGRAM_HANDLE = "the_dream_stories_";
const INSTAGRAM_URL = "https://www.instagram.com/the_dream_stories_";

/** Real wedding photos from /public/home */
const instagramImages = [
  "/image/instagram/1.jpeg",
  "/image/instagram/6.jpg",
  "/image/instagram/5.jpg",
  "/image/instagram/4.jpg",
];

const instagramImageAlts = [
  "Groom playfully carrying the laughing bride over his shoulder across a garden lawn",
  "Couple sharing an intimate embrace surrounded by tropical foliage",
  "Bride and groom in traditional wedding attire walking hand in hand across a courtyard lawn",
  "Bride in an embroidered pastel lehenga and groom in ivory sherwani holding hands on garden steps",
];

const instagramLinks = [
  "https://www.instagram.com/p/DE9eF8Bp6ZT/",
  "https://www.instagram.com/p/DI1iXAnyNQu/",
  "https://www.instagram.com/p/C057TXooc6-/",
  "https://www.instagram.com/p/DJrcQ8TMTIf/",
];

type InstagramFollowProps = {
  className?: string;
};

export default function InstagramFollow({ className }: InstagramFollowProps = {}) {
  return (
    <Section className={cn("bg-[var(--color-bg)] text-center", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <SocialIconGlyph
          icon="instagram"
          className="mx-auto h-7 w-7 text-[var(--color-ink)]"
        />
        <h2 className="mt-3 sm:mt-4 font-serif text-lg sm:text-xl tracking-[0.25em] text-[var(--color-ink)] uppercase md:text-2xl">
          Follow Me on Instagram
        </h2>
      </div>

      <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-0">
        {instagramImages.map((src, index) => (
          <a
            key={src}
            href={instagramLinks[index]}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full aspect-square overflow-hidden bg-[var(--color-line)]/20"
          >
            <Image
              src={src}
              alt={instagramImageAlts[index]}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className={cn(
                "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
                index === 2 && "object-top"
              )}
              style={index === 2 ? { objectPosition: "center 15%" } : undefined}
            />
          </a>
        ))}
      </div>

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 sm:mt-8 inline-block text-sm tracking-wide transition-opacity duration-300 hover:opacity-70"
      >
        <span className="text-slate-400">@</span>
        <span className="text-[var(--color-ink)] font-medium">the_dream_stories_</span>
      </a>
    </Section>
  );
}

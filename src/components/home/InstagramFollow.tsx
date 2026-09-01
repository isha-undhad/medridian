import Image from "next/image";
import { SocialIconGlyph } from "@/components/ui/SocialIcons";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

// Single source of truth for both the handle text and the profile link
const INSTAGRAM_HANDLE = "the_dream_stories_";
const INSTAGRAM_URL = "https://www.instagram.com/the_dream_stories_";

/** Real wedding photos from /public/home */
const instagramImages = [
  "/home/insta1.jpg",
  "/home/insta2.jpg",
  "/home/insta3.jpg",
  "/home/insta4.jpg",
];

const instagramImageAlts = [
  "Bride in a strapless gown holding a bouquet amid tropical palm leaves",
  "Couple laughing together in a vintage red convertible parked by the coast",
  "Bridesmaids helping the bride adjust her veil before the ceremony, in black and white",
  "Reception tent with cascading pink floral chandeliers over a long banquet table",
];

type InstagramFollowProps = {
  className?: string;
};

export default function InstagramFollow({ className }: InstagramFollowProps = {}) {
  return (
    <Section className={cn("bg-white text-center", className)}>
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
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full aspect-square overflow-hidden bg-[var(--color-line)]/20"
          >
            <Image
              src={src}
              alt={instagramImageAlts[index]}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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

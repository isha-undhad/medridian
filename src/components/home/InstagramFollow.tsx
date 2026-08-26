import Image from "next/image";
import { SocialIconGlyph } from "@/components/ui/SocialIcons";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

// Single source of truth for both the handle text and the profile link, per
// the brief — update here once a real account exists.
const INSTAGRAM_HANDLE = "meridianphotography";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

/** Placeholder feed — real photos in /public/home, standing in for an actual
 * Instagram feed pull until one is wired up. */
const instagramImages = [
  "/home/insta1.jpg",
  "/home/insta2.jpg",
  "/home/insta3.jpg",
  "/home/insta4.jpg",
];

// Parallel to instagramImages (same index order) — kept separate since the
// array above intentionally stays a plain string[].
const instagramImageAlts = [
  "Bride in a strapless gown holding a bouquet amid tropical palm leaves",
  "Couple laughing together in a vintage red convertible parked by the coast",
  "Bridesmaids helping the bride adjust her veil before the ceremony, in black and white",
  "Reception tent with cascading pink floral chandeliers over a long banquet table",
];

type InstagramFollowProps = {
  /** Extra classes merged onto the default `bg-white text-center` (via
   * tailwind-merge, so e.g. `pt-0 md:pt-0 lg:pt-0` cleanly cancels the
   * shared <Section>'s top padding). Use when the section right above this
   * one already ends in its own bottom padding, so the two don't stack into
   * a double gap. */
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
        <h2 className="mt-5 font-serif text-xl tracking-[0.25em] text-[var(--color-ink)] uppercase md:text-2xl">
          Follow Me on Instagram
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-0">
        {instagramImages.map((src, index) => (
          <a
            key={src}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative block w-full aspect-square overflow-hidden"
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

      {/* Each segment gets its own muted tone for a subtle multi-color
          effect — tracking is set once on the parent so it cascades evenly
          across spans instead of compounding between them. */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block text-sm tracking-wide transition-opacity duration-300 hover:opacity-70"
      >
        <span className="text-slate-400">@</span>
        <span className="text-rose-300">meridian</span>
        <span className="text-amber-600">photography</span>
      </a>
    </Section>
  );
}

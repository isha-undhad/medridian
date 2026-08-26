import type { SocialIcon } from "@/data/nav";

type IconProps = {
  className?: string;
};

/** Generic, hand-drawn outline glyphs — not exact logo reproductions —
 * since lucide-react no longer ships brand icons. Simple enough to read at
 * 16–18px, currentColor throughout. */
function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M13.5 21V13h2.2l.4-2.6h-2.6V8.7c0-.75.3-1.2 1.3-1.2h1.4V5.2c-.25-.03-1.1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.9H8.8V13H11v8" />
    </svg>
  );
}

function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M10 18c.6-2.4 1.2-4.9 1.8-7.4M12.9 13.4c2 0 3.4-1.6 3.4-3.7 0-2.1-1.7-3.6-3.9-3.6-2.7 0-4.3 2-4.3 4.1 0 1.1.5 2 1.3 2.5" />
    </svg>
  );
}

export function SocialIconGlyph({ icon, className = "" }: { icon: SocialIcon; className?: string }) {
  if (icon === "facebook") return <FacebookGlyph className={className} />;
  if (icon === "instagram") return <InstagramGlyph className={className} />;
  return <PinterestGlyph className={className} />;
}

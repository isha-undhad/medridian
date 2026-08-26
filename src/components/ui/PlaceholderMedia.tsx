import type { Tone } from "@/data/portfolio";

const toneClasses: Record<Tone, string> = {
  sand: "from-[#efe4cd] via-[#e2cfa8] to-[#c7a877]",
  clay: "from-[#ecd2bd] via-[#dcac8c] to-[#b8785a]",
  sage: "from-[#e2e8d9] via-[#c9d3b8] to-[#9aa885]",
  stone: "from-[#e9e7e0] via-[#d3cfc4] to-[#a29c8c]",
  dusk: "from-[#e3ddea] via-[#c3b8d1] to-[#8b7ca0]",
  ivory: "from-[#f7f4ec] via-[#ece3d0] to-[#d2c3a1]",
};

type PlaceholderMediaProps = {
  tone: Tone;
  className?: string;
};

/** A soft gradient + grain block standing in for a real photograph. Purely
 * decorative, so it's hidden from assistive tech; the surrounding card
 * supplies the accessible label (title/category). */
export default function PlaceholderMedia({ tone, className = "" }: PlaceholderMediaProps) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden bg-gradient-to-br ${toneClasses[tone]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 7px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15" />
    </div>
  );
}

import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** "default" (text-3xl→5xl) is the original scale, used by every existing
   * caller — keep it as the default so those are unaffected. "hero" is a
   * large display variant (text-5xl→9xl, tight leading, wider label
   * tracking) for section openers that need hero/display-scale impact, e.g.
   * a "SIGNATURE WORK / PORTFOLIO" header above a portfolio grid. */
  size?: "default" | "hero";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  size = "default",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const isHero = size === "hero";

  return (
    <Reveal className={`flex flex-col ${isHero ? "gap-2" : "gap-4"} ${alignment} ${className}`}>
      {eyebrow ? (
        <span
          className={
            isHero
              ? "text-sm font-medium tracking-widest text-[var(--color-accent-ink)] uppercase"
              : "text-xs font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase"
          }
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={
          isHero
            ? "font-serif text-3xl leading-[0.95] font-medium tracking-tight text-[var(--color-ink)] uppercase text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            : "font-serif text-2xl leading-[1.1] text-[var(--color-ink)] text-balance sm:text-3xl md:text-4xl lg:text-5xl"
        }
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-[var(--color-muted)] text-pretty">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

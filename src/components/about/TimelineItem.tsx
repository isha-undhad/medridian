import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { slideInLeft, slideInRight, scaleIn } from "@/lib/motion";
import type { TimelineMilestone } from "@/data/timeline";

type TimelineItemProps = {
  milestone: TimelineMilestone;
  index: number;
};

export default function TimelineItem({ milestone, index }: TimelineItemProps) {
  // Even index: Image on Left, Text on Right
  // Odd index: Text on Left (below previous Image), Image on Right (below previous Text)
  const isImageLeft = index % 2 === 0;

  return (
    <div className="relative w-full py-3 sm:py-4 md:py-6">
      {/* Center timeline dot node */}
      <span className="absolute left-1/2 top-1/2 z-20 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] shadow-sm" />

      {/* 2-Column Grid on all screen sizes */}
      <div className="grid grid-cols-2 items-center gap-3 sm:gap-6 md:gap-10 w-full">
        {/* LEFT COLUMN (Col 1) */}
        {isImageLeft ? (
          /* Image on Left */
          <div className="flex justify-end pr-2 sm:pr-4 md:pr-6">
            {milestone.image ? (
              <Reveal variants={scaleIn} className="relative aspect-[4/3] w-full max-w-[340px] md:max-w-sm overflow-hidden rounded-sm bg-[var(--color-line)]/30 shadow-sm">
                <Image
                  src={milestone.image}
                  alt={milestone.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 35vw, 48vw"
                  className={`object-cover transition-transform duration-700 ease-out hover:scale-105 ${
                    milestone.tone === "mono" ? "grayscale" : ""
                  }`}
                />
              </Reveal>
            ) : null}
          </div>
        ) : (
          /* Text on Left */
          <div className="flex flex-col items-end text-right pr-2 sm:pr-4 md:pr-6">
            <Reveal variants={slideInLeft} className="flex flex-col items-end text-right max-w-[340px] md:max-w-sm">
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-[var(--color-accent-ink)] uppercase">
                {milestone.year}
              </span>
              <h3 className="mt-0.5 sm:mt-1 font-serif text-xs sm:text-base md:text-2xl lg:text-3xl text-[var(--color-ink)] leading-snug text-balance">
                {milestone.title}
              </h3>
              <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-xs md:text-sm lg:text-body text-[var(--color-muted)] leading-relaxed text-pretty">
                {milestone.description}
              </p>
            </Reveal>
          </div>
        )}

        {/* RIGHT COLUMN (Col 2) */}
        {isImageLeft ? (
          /* Text on Right */
          <div className="flex flex-col items-start text-left pl-2 sm:pl-4 md:pl-6">
            <Reveal variants={slideInRight} className="flex flex-col items-start text-left max-w-[340px] md:max-w-sm">
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-[var(--color-accent-ink)] uppercase">
                {milestone.year}
              </span>
              <h3 className="mt-0.5 sm:mt-1 font-serif text-xs sm:text-base md:text-2xl lg:text-3xl text-[var(--color-ink)] leading-snug text-balance">
                {milestone.title}
              </h3>
              <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-xs md:text-sm lg:text-body text-[var(--color-muted)] leading-relaxed text-pretty">
                {milestone.description}
              </p>
            </Reveal>
          </div>
        ) : (
          /* Image on Right */
          <div className="flex justify-start pl-2 sm:pl-4 md:pl-6">
            {milestone.image ? (
              <Reveal variants={scaleIn} className="relative aspect-[4/3] w-full max-w-[340px] md:max-w-sm overflow-hidden rounded-sm bg-[var(--color-line)]/30 shadow-sm">
                <Image
                  src={milestone.image}
                  alt={milestone.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 35vw, 48vw"
                  className={`object-cover transition-transform duration-700 ease-out hover:scale-105 ${
                    milestone.tone === "mono" ? "grayscale" : ""
                  }`}
                />
              </Reveal>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

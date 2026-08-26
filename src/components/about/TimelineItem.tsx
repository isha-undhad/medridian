import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { slideInLeft, slideInRight, scaleIn } from "@/lib/motion";
import type { TimelineMilestone } from "@/data/timeline";

type TimelineItemProps = {
  milestone: TimelineMilestone;
  index: number;
};

export default function TimelineItem({ milestone, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative py-6 sm:py-8 md:py-12">
      {/* Center dot on desktop, left dot on mobile */}
      <span className="absolute left-3.5 top-8 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] sm:left-4 sm:top-10 sm:h-3 sm:w-3 md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

      <div className="pl-8 sm:pl-10 flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0">
        {/* TEXT CONTENT: Always order-1 on mobile (First Text), alternating on desktop */}
        <div
          className={`order-1 flex flex-col text-left ${
            isEven
              ? "md:order-2 md:col-start-2 md:items-start md:text-left md:pl-8"
              : "md:order-1 md:col-start-1 md:items-end md:text-right md:pr-8"
          }`}
        >
          <Reveal
            variants={isEven ? slideInRight : slideInLeft}
            className={`flex flex-col text-left ${isEven ? "md:items-start" : "md:items-end md:text-right"}`}
          >
            <span className="text-[10px] font-medium tracking-[0.25em] text-[var(--color-accent-ink)] uppercase sm:text-xs">
              {milestone.year}
            </span>
            <h3 className="mt-1 font-serif text-lg text-[var(--color-ink)] text-balance sm:text-xl md:text-2xl lg:text-3xl">
              {milestone.title}
            </h3>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-[var(--color-muted)] text-pretty md:text-sm">
              {milestone.description}
            </p>
          </Reveal>
        </div>

        {/* IMAGE CONTENT: Always order-2 on mobile (Then Image), alternating on desktop */}
        {milestone.image ? (
          <div
            className={`order-2 mt-4 flex flex-col md:mt-0 ${
              isEven
                ? "md:order-1 md:col-start-1 md:items-end md:pr-8"
                : "md:order-2 md:col-start-2 md:items-start md:pl-8"
            }`}
          >
            <Reveal variants={scaleIn} className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-sm">
              <Image
                src={milestone.image}
                alt={milestone.imageAlt ?? ""}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className={`object-cover ${milestone.tone === "mono" ? "grayscale" : ""}`}
              />
            </Reveal>
          </div>
        ) : null}
      </div>
    </div>
  );
}

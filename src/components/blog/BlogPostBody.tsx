"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

type BlogPostBodyProps = {
  paragraphs: string[];
};

export default function BlogPostBody({ paragraphs }: BlogPostBodyProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = paragraphs.length > 1 || paragraphs[0]?.length > 160;

  return (
    <div className="w-full">
      {expanded ? (
        <Reveal variants={fadeUp} delay={0.15} className="flex flex-col gap-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-body leading-relaxed text-[var(--color-body)] ${
                index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[var(--color-ink)]" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      ) : (
        <Reveal
          variants={fadeUp}
          delay={0.15}
          className="flex flex-col gap-4 text-body leading-relaxed text-[var(--color-body)]"
        >
          <p className="text-body line-clamp-3">
            {paragraphs[0]}
          </p>
        </Reveal>
      )}

      {hasMore ? (
        <div className="mt-6 flex justify-start">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-2 text-xs font-medium tracking-[0.2em] text-[var(--color-ink)] uppercase transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-sm cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/ui/Section";
import type { BlogPost } from "@/data/blog";

export default function BlogPostView({ post }: { post: BlogPost }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split content: first paragraph for excerpt vs full content
  const firstParagraph = post.content[0] || post.excerpt;
  const remainingParagraphs = post.content.slice(1);

  return (
    <Section as="article" className="mx-auto max-w-7xl px-6 sm:px-10">
      {/* Top Navigation Link */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors duration-300 hover:text-[var(--color-accent-ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Journal
        </Link>
      </div>

      {/* Floated layout allowing text to flow beside the image and wrap underneath from the left */}
      <div className="flow-root">
        {/* Left Floated Image & Metadata */}
        <div className="float-none md:float-left w-full md:w-[46%] lg:w-[45%] md:mr-8 lg:mr-10 mb-6 md:mb-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
            <span>{post.category}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.date}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readTime} read</span>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md shadow-sm">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Title beside image on top */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.14] text-[var(--color-ink)] mb-4 md:pt-1">
          {post.title}
        </h1>

        {/* Body Text: Flows to the right of image and wraps continuously underneath from the left */}
        <div className="text-base sm:text-[16px] leading-[1.8] sm:leading-[1.85] text-[var(--color-body)] space-y-4">
          {!isExpanded ? (
            <p>
              {firstParagraph}
              {remainingParagraphs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="ml-2 inline font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-accent-ink)] underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity select-none"
                >
                  SHOW MORE
                </button>
              )}
            </p>
          ) : (
            <>
              {post.content.map((paragraph, index) => {
                const isLast = index === post.content.length - 1;
                return (
                  <p key={index}>
                    {paragraph}
                    {isLast && (
                      <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="ml-2 inline font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-accent-ink)] underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity select-none"
                      >
                        SHOW LESS
                      </button>
                    )}
                  </p>
                );
              })}
            </>
          )}
        </div>
      </div>
    </Section>
  );
}

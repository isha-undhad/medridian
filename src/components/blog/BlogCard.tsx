"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import type { BlogPost } from "@/data/blog";

type BlogCardProps = {
  post: BlogPost;
  delay?: number;
};

export default function BlogCard({ post, delay = 0 }: BlogCardProps) {
  return (
    <Reveal variants={fadeUp} delay={delay} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-accent)]/50 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            <span>{post.category}</span>
            <span aria-hidden>&middot;</span>
            <span>{post.readTime} read</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-[var(--color-ink)] text-balance transition-colors duration-300 group-hover:text-[var(--color-accent-ink)]">
            {post.title}
          </h3>
          <p className="mt-2.5 flex-1 text-body leading-relaxed text-[var(--color-muted)] text-pretty line-clamp-3">
            {post.excerpt}
          </p>
          <span className="mt-4 sm:mt-5 inline-flex w-fit items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
            Read Article
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

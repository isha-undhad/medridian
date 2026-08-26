"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import type { Tone } from "@/data/portfolio";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: Tone;
  /** Real background photo — when given, this replaces the tone-based
   * gradient placeholder entirely (tone is then unused). Every other
   * PageHeader call site omits this and keeps the placeholder, so this is
   * additive, not a breaking change. */
  image?: string;
  imageAlt?: string;
};

/** Compact hero-style banner used at the top of every non-home route. The
 * fixed Navbar starts transparent over it and solidifies on scroll, same as
 * the full Hero on the home page. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  tone = "stone",
  image,
  imageAlt = "",
}: PageHeaderProps) {
  return (
    <section
      className={`relative flex overflow-hidden ${image ? "h-dvh items-center" : "h-[56vh] min-h-[420px] items-end"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="relative h-full w-full">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <PlaceholderMedia tone={tone} className="h-full w-full" />
          )}
        </div>
      </motion.div>
      {/* Two different overlays for two different jobs: the placeholder is a
          flat gradient panel with no real detail, so it can fade all the way
          to an opaque `--color-bg` at the bottom to blend into the page
          below it. A real photo needs the opposite — just enough of a dark
          scrim at the bottom for the title/description to read, without
          washing the image out to cream like the placeholder treatment did. */}
      {/* The image variant's text now sits near the top-left (see below),
          not the bottom, so its scrim runs left→right instead of
          bottom→top — dark behind the always-left-aligned text, fading out
          to the right where the photo needs to stay untouched. */}
      <div
        className={
          image
            ? "absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 via-40% to-transparent"
            : "absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/5 to-transparent"
        }
      />

      <div
        className={`relative mx-auto w-full max-w-7xl px-6 sm:px-10 ${image ? "pt-24 pb-8 sm:py-0" : "pb-12 sm:pb-16"}`}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mb-2 sm:mb-4 block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] ${image
              ? "text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
              : "text-[var(--color-ink)]/70"
            }`}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] ${image
              ? "max-w-[85%] sm:max-w-xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
              : "text-[var(--color-ink)]"
            }`}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className={`mt-2.5 sm:mt-5 max-w-[90%] sm:max-w-xl text-xs sm:text-base leading-relaxed ${image
                ? "text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
                : "text-[var(--color-ink)]/70"
              }`}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}

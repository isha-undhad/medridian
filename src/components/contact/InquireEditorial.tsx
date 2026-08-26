"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

const weddingPhotographyList = [
  "Full-day wedding photography coverage",
  "Documentary-inspired storytelling",
  "Destination weddings and intimate celebrations",
  "Pre-wedding and engagement sessions",
  "Carefully edited high-resolution photographs",
  "Private online gallery for viewing and sharing",
];

/**
 * Full-bleed editorial photo section for the Inquire/Contact page — a tall,
 * muted black-and-white photograph behind a dark scrim, with a left-aligned
 * column of copy (heading, lead paragraphs, a services list, a destination
 * note) and a bottom CTA row that anchor-scrolls down to the actual form in
 * <ContactSection> (id="inquiry-form", set where this is rendered on the
 * page) rather than linking anywhere — this section is the intro, not a
 * second contact form.
 *
 * Follows the same full-bleed photo + scrim + centered copy shape as
 * <InquireCta> (src/components/about/InquireCta.tsx), just taller and with
 * more structured content, so it reads as the same family of section rather
 * than a one-off.
 */
export default function InquireEditorial({
  inquiryHref = "#inquiry-form",
}: {
  inquiryHref?: string;
} = {}) {
  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden my-0">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="relative h-full w-full">
          <Image
            src="/1.jpeg"
            alt="Wedding party cheering and celebrating around the bride and groom mid-kiss, in black and white"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/65" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-10 px-6 py-24 sm:px-10 md:py-28">
        <Reveal variants={fadeUp} className="flex flex-col gap-5">
          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-white uppercase sm:text-4xl md:text-5xl">
            Let&apos;s Create Something Timeless
          </h2>
          <p className="max-w-xl leading-relaxed text-white/85">
            Planning a wedding is about more than a single day. It is about the people, places,
            emotions, and quiet moments you will want to remember for years to come.
          </p>
          <p className="max-w-xl leading-relaxed text-white/85">
            I would love to hear about your story, your plans, and what matters most to you.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <div className="h-px w-full bg-white/25" />
        </Reveal>

        <Reveal variants={fadeUp} delay={0.15} className="flex flex-col gap-4">
          <span className="text-xs font-medium tracking-[0.25em] text-white/70 uppercase">
            Wedding Photography
          </span>
          <ul className="flex flex-col gap-2 text-sm text-white/85 sm:text-base">
            {weddingPhotographyList.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-white/50">
                  &middot;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.2} className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.25em] text-white/70 uppercase">
            Destination Weddings
          </span>
          <p className="text-sm text-white/85 sm:text-base">
            Available for celebrations across India and worldwide.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.25}>
          <div className="h-px w-full bg-white/25" />
        </Reveal>
      </div>

      <Reveal
        variants={fadeUp}
        delay={0.3}
        className="relative z-10 mx-auto w-full max-w-7xl flex items-center justify-between px-6 pb-10 sm:px-10 sm:pb-12"
      >
        <span className="text-xs font-medium tracking-[0.25em] text-white/60 uppercase">
          Enquire
        </span>
        <Link
          href={inquiryHref}
          className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-white uppercase underline-offset-4 transition-opacity duration-300 hover:opacity-80 hover:underline"
        >
          Send Inquiry
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </Reveal>
    </section>
  );
}

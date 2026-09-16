"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "Are you willing to travel?",
    answer:
      "Absolutely! I travel extensively for my clients and jump at any opportunity to capture your celebration, whether it is a local gathering or a destination weekend.",
  },
  {
    question: "How many images will we receive?",
    answer:
      "Typically, you can expect a beautifully curated gallery of 80–100 final, high-resolution images per hour of coverage, all fully edited in our signature style.",
  },
  {
    question: "Do you shoot film or digital?",
    answer:
      "Both! I combine the nostalgic, rich textures of medium-format film with the crisp reliability of modern digital to deliver a timeless and luminous gallery.",
  },
  {
    question: "When can we expect to receive our gallery?",
    answer:
      "You will receive a curated sneak peek of highlights within 48 hours of your wedding day. Your complete, fully edited digital gallery will be delivered within 6 to 8 weeks.",
  },
  {
    question: "How do we secure our date with you?",
    answer:
      "To officially reserve your date on the calendar, a signed contract and a standard retainer fee are required. The entire booking process is handled seamlessly online.",
  },
];

export default function InquireFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="mx-auto max-w-6xl px-6 sm:px-10 border-t border-[var(--color-line)] pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-5 sm:pb-7 md:pb-8 lg:pb-10">
      {/* Eyebrow & Concise Refined Title */}
      <Reveal variants={fadeUp} className="flex flex-col gap-2 max-w-2xl mb-6 sm:mb-8">
        <span className="text-xs font-medium tracking-[0.25em] text-[var(--color-muted)] uppercase">
          Frequently Asked Questions
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-ink)] leading-[1.2] text-balance">
          Your Questions, Answered
        </h2>
        <p className="text-body text-[var(--color-muted)] leading-relaxed">
          A few helpful details as you plan your celebration.
        </p>
      </Reveal>

      {/* Two Column Content: Travel Image (Left) + FAQs (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 md:items-stretch">
        {/* Left: Travel Photography Image */}
        <Reveal variants={fadeUp} delay={0.1} className="md:col-span-5 flex flex-col">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-[var(--color-line)] shadow-md">
            <Image
              src="/image/f&q.jpg"
              alt="Destination wedding travel photography"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Right: FAQ Accordion */}
        <Reveal variants={fadeUp} delay={0.15} className="md:col-span-7 flex flex-col justify-between md:h-full gap-6 md:gap-4">
          <div className="divide-y divide-[var(--color-line)]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question} className="py-3 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 text-left cursor-pointer touch-manipulation"
                  >
                    <ChevronRight
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                    <h3 className="text-base sm:text-lg font-medium text-[var(--color-ink)]">
                      {faq.question}
                    </h3>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-1.5" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-[26px] text-body leading-relaxed text-[var(--color-muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* More Link */}
          <div className="pt-1">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-accent-ink)] group"
            >
              <span>Explore The Portfolio</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

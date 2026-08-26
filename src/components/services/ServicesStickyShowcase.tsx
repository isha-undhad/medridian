"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type ShowcaseService = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const showcaseServices: ShowcaseService[] = [
  {
    number: "01",
    title: "Wedding Photography",
    description:
      "Capture authentic emotions, intimate moments, and the atmosphere of the wedding day through timeless editorial photography.",
    image: "/portfolio/1.jpeg",
    imageAlt: "Bride and groom kissing beneath a carved stone archway",
  },
  {
    number: "02",
    title: "Portrait Photography",
    description:
      "Thoughtful portrait sessions focused on natural expression, personality, and elegant visual storytelling.",
    image: "/about/photographer.jpg",
    imageAlt: "Portrait of Ava Bennett seated on a stone bench, smiling at the camera",
  },
  {
    number: "03",
    title: "Event & Lifestyle Photography",
    description:
      "Document meaningful events, celebrations, and lifestyle moments with a refined and candid photographic approach.",
    image: "/portfolio/2.jpeg",
    imageAlt: "Wedding guests cheering and throwing petals as a couple exits through an ivy-covered doorway",
  },
];

function StackingCard({
  service,
  index,
  total,
  progress,
}: {
  service: ShowcaseService;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isEven = index % 2 === 0;

  // Scroll phase ranges for 3 cards:
  // Card 0 (index 0): Fixed at stack position y: "0%" from the start.
  // Card 1 (index 1): Waits below at y: "130%", moves upward to y: "0%" during scroll [0.15, 0.50].
  // Card 2 (index 2): Waits below at y: "130%", moves upward to y: "0%" during scroll [0.50, 0.85].

  let yRangeInput: number[];
  let yRangeOutput: string[];

  if (index === 0) {
    yRangeInput = [0, 1];
    yRangeOutput = ["0%", "0%"];
  } else if (index === 1) {
    yRangeInput = [0, 0.15, 0.50, 1];
    yRangeOutput = ["130%", "130%", "0%", "0%"];
  } else {
    yRangeInput = [0, 0.50, 0.85, 1];
    yRangeOutput = ["130%", "130%", "0%", "0%"];
  }

  const y = useTransform(progress, yRangeInput, yRangeOutput);

  // Subtle deck depth scaling for cards beneath the top incoming card
  const scaleStart = index === 0 ? 0.15 : index === 1 ? 0.50 : 0.85;
  const scale = useTransform(
    progress,
    [scaleStart, 0.9],
    [1, 1 - (total - index - 1) * 0.04]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex: index + 1,
      }}
      className="absolute inset-0 m-auto w-full max-w-5xl h-fit rounded-2xl border border-white/15 bg-[#0D0D0D] p-6 sm:p-8 md:p-10 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] backdrop-blur-md"
    >
      <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 md:flex-row md:gap-10">
        {/* Text Column */}
        <div
          className={`flex w-full flex-col gap-3 text-center md:w-5/12 md:text-left ${
            isEven ? "md:order-1" : "md:order-2"
          }`}
        >
          <span className="font-serif text-xl sm:text-2xl text-amber-200/90 font-light">
            {service.number}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.1] text-white text-balance">
            {service.title}
          </h3>
          <p className="text-body leading-relaxed text-white/80 text-pretty">
            {service.description}
          </p>
        </div>

        {/* Image Column */}
        <div
          className={`relative aspect-[4/5] w-full max-w-xs sm:max-w-sm overflow-hidden rounded-lg border border-white/10 md:w-6/12 ${
            isEven ? "md:order-2" : "md:order-1"
          }`}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesStickyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full bg-[#000000] text-white"
    >
      {/* Sticky Viewport Frame — stays pinned on screen while cards stack */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#000000] px-4 sm:px-6">
        {/* Header */}
        <div className="absolute top-8 sm:top-12 z-0 text-center">
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] text-white/70 uppercase">
            Meridian Services
          </span>
        </div>

        {/* Card Stack Container — Fixed Position Deck */}
        <div className="relative flex h-[500px] sm:h-[520px] md:h-[540px] w-full max-w-5xl items-center justify-center">
          {showcaseServices.map((service, index) => (
            <StackingCard
              key={service.number}
              service={service}
              index={index}
              total={showcaseServices.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

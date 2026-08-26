"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type HowItWorksCard = {
  number: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  bgColor: string;
  textColor: string;
  numberColor: string;
  descColor: string;
};

const serviceCards: HowItWorksCard[] = [
  {
    number: "01",
    heading: "After Your Initial Inquiry",
    description:
      "We'll schedule a call to connect, dive into the vision for your dream wedding, and design a personalized photography collection that perfectly reflects your celebration.",
    image: "/service/1.jpg",
    imageAlt: "Bride and groom intimate wedding moment",
    bgColor: "bg-white",
    textColor: "text-[#1F1E1B]",
    numberColor: "text-[#7A6E5D]",
    descColor: "text-[#524E46]",
  },
  {
    number: "02",
    heading: "Planning & Timeline Creation",
    description:
      "To ensure every detail is thoughtfully captured, you'll receive a questionnaire to complete, followed by a pre-wedding call where we'll craft a tailored photography timeline together.",
    image: "/service/2.jpg",
    imageAlt: "Wedding ceremony venue decoration",
    bgColor: "bg-[#F9F7F2]",
    textColor: "text-[#1F1E1B]",
    numberColor: "text-[#7A6E5D]",
    descColor: "text-[#524E46]",
  },
  {
    number: "03",
    heading: "Shooting, Preview, and Delivery",
    description:
      "My team and I will be there to capture every detail of your wedding day with heartfelt dedication. Within 48 hours, you'll receive an intimate preview collection, with your final image gallery intentionally curated and delivered within 4 to 6 weeks.",
    image: "/service/3.jpg",
    imageAlt: "Wedding reception cake cutting celebration",
    bgColor: "bg-[#656133]",
    textColor: "text-[#F9F7F2]",
    numberColor: "text-[#D4CFA0]",
    descColor: "text-[#E6E3CE]",
  },
  {
    number: "04",
    heading: "Heirloom Albums & Archival Prints",
    description:
      "Transform your digital gallery into tactile, leather-bound heirloom albums handcrafted with archival paper negatives, preserving your celebration for generations to come.",
    image: "/service/4.jpg",
    imageAlt: "Archival wedding photo album detail",
    bgColor: "bg-[#161614]",
    textColor: "text-[#F9F7F2]",
    numberColor: "text-[#9E9B93]",
    descColor: "text-[#D1CEC7]",
  },
];

function StackedServiceCard({
  card,
  index,
  scrollYProgress,
}: {
  card: HowItWorksCard;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Explicit scroll progress milestones for 4 cards across total scroll [0, 1]:
  // 0.00 -> 0.05: Card 01 at center (rest)
  // 0.05 -> 0.32: Card 02 slides UP and stacks directly over Card 01
  // 0.32 -> 0.38: Card 02 at center (rest)
  // 0.38 -> 0.65: Card 03 slides UP and stacks directly over Card 02
  // 0.65 -> 0.71: Card 03 at center (rest)
  // 0.71 -> 0.95: Card 04 slides UP and stacks directly over Card 03
  // 0.95 -> 1.00: Card 04 at center (rest) -> then page naturally unpins and scrolls away!

  let yRangeInput: number[];
  let yRangeOutput: string[];
  let exitRangeInput: number[];
  let exitRangeScale: number[];
  let exitRangeOpacity: number[];

  if (index === 0) {
    yRangeInput = [0, 1];
    yRangeOutput = ["0vh", "0vh"];
    exitRangeInput = [0, 0.05, 0.32, 1];
    exitRangeScale = [1, 1, 0.96, 0.96];
    exitRangeOpacity = [1, 1, 0.92, 0.92];
  } else if (index === 1) {
    yRangeInput = [0, 0.05, 0.32, 1];
    yRangeOutput = ["120vh", "120vh", "0vh", "0vh"];
    exitRangeInput = [0, 0.38, 0.65, 1];
    exitRangeScale = [1, 1, 0.96, 0.96];
    exitRangeOpacity = [1, 1, 0.92, 0.92];
  } else if (index === 2) {
    yRangeInput = [0, 0.38, 0.65, 1];
    yRangeOutput = ["120vh", "120vh", "0vh", "0vh"];
    exitRangeInput = [0, 0.71, 0.95, 1];
    exitRangeScale = [1, 1, 0.96, 0.96];
    exitRangeOpacity = [1, 1, 0.92, 0.92];
  } else {
    // Index 3 (Card 04)
    yRangeInput = [0, 0.71, 0.95, 1];
    yRangeOutput = ["120vh", "120vh", "0vh", "0vh"];
    exitRangeInput = [0, 1];
    exitRangeScale = [1, 1];
    exitRangeOpacity = [1, 1];
  }

  const y = useTransform(scrollYProgress, yRangeInput, yRangeOutput);
  const scale = useTransform(scrollYProgress, exitRangeInput, exitRangeScale);
  const opacity = useTransform(scrollYProgress, exitRangeInput, exitRangeOpacity);

  return (
    <motion.article
      style={{
        y,
        scale,
        opacity,
        zIndex: (index + 1) * 10,
      }}
      className={`absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_-15px_36px_rgba(0,0,0,0.35),0_25px_60px_rgba(0,0,0,0.5)] border border-black/10 flex flex-col md:flex-row items-stretch will-change-transform ${card.bgColor}`}
    >
      {/* Text Box Side (~50% on desktop) */}
      <div
        className={`w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-1.5 sm:gap-2.5 ${card.textColor} h-[52%] md:h-full shrink-0`}
      >
        <span className={`font-serif text-xs sm:text-sm font-medium tracking-wide ${card.numberColor}`}>
          {card.number}
        </span>
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-[1.18] text-balance">
          {card.heading}
        </h3>
        <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed text-pretty ${card.descColor}`}>
          {card.description}
        </p>
      </div>

      {/* Photo Box Side (~50% on desktop, 0px gap) */}
      <div className="w-full md:w-1/2 relative h-[48%] md:h-full overflow-hidden border-t md:border-t-0 md:border-l border-black/10 shrink-0">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          priority={index === 0}
          sizes="(min-width: 768px) 450px, 90vw"
          className="object-cover"
        />
      </div>
    </motion.article>
  );
}

export default function HowItWorksSection({ className }: { className?: string } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative h-[420vh] w-full my-0",
        className
      )}
    >
      {/* Sticky Viewport Stage — stays 100% pinned on screen while cards stack one on top of another */}
      <div className="sticky top-0 flex h-dvh w-full flex-col items-center justify-start md:justify-center overflow-hidden z-10 px-4 sm:px-6 pt-14 sm:pt-16 md:pt-12 pb-4 sm:pb-8 md:pb-12">
        {/* Soft Blurred Background Photograph (/service/20.jpg) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/service/20.jpg"
            alt="Service showcase background"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 filter blur-[10px]"
          />
          {/* Subtle Dark Warm Overlay */}
          <div className="absolute inset-0 bg-[#1A1815]/55 backdrop-brightness-95" />
        </div>

        {/* Header Eyebrow & Label Container */}
        <div className="relative z-40 mb-2 sm:mb-3 md:mb-4 text-center shrink-0 flex flex-col items-center gap-0.5 sm:gap-1">
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] text-[#D4CFA0] uppercase drop-shadow-sm">
            OUR PROCESS
          </span>
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#F9F7F2] uppercase drop-shadow-md">
            HOW IT WORKS
          </h2>
        </div>

        {/* Center Cards Viewport Container — Stacking Frame */}
        <div className="relative z-20 w-full flex items-center justify-center pointer-events-auto">
          <div className="relative w-[92vw] sm:w-[86vw] md:w-[780px] lg:w-[880px] max-w-[900px] h-[430px] sm:h-[450px] md:h-[420px] lg:h-[460px]">
            {serviceCards.map((card, index) => (
              <StackedServiceCard
                key={card.number}
                card={card}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

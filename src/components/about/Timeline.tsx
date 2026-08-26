"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { timeline } from "@/data/timeline";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.5"],
  });

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-line)]" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-[var(--color-accent)]"
      />

      <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
        {timeline.map((milestone, index) => (
          <TimelineItem key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </div>
  );
}

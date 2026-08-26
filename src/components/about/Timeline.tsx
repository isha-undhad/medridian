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
      <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-line)] md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-4 top-0 h-full w-px origin-top bg-[var(--color-accent)] md:left-1/2 md:-translate-x-1/2"
      />

      <div className="flex flex-col">
        {timeline.map((milestone, index) => (
          <TimelineItem key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </div>
  );
}

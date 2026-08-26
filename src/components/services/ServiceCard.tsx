"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  delay?: number;
};

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  return (
    <Reveal variants={fadeUp} delay={delay} className="h-full">
      <Link
        href="/portfolio"
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-accent)]/50 hover:shadow-xl"
      >
        {service.image ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-line)]/20">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority={delay < 0.1}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-8">
          <h3 className="font-serif text-lg sm:text-xl text-[var(--color-ink)] text-balance">{service.title}</h3>
          <p className="mt-2 sm:mt-3 flex-1 text-body leading-relaxed text-[var(--color-muted)] text-pretty">
            {service.description}
          </p>
          <span className="mt-4 sm:mt-5 inline-flex w-fit items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
            Learn more
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

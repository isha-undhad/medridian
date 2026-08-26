import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  /** Element to render — defaults to a semantic <section>. Pass "div" when
   * this needs to nest inside another <section> (e.g. a bordered wrapper
   * that supplies its own background). */
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Standard vertical rhythm for padded content sections, so the gap between
 * adjacent sections stays consistent across every page instead of each one
 * picking its own py-* scale. Smaller on mobile, larger on desktop, per the
 * responsive spacing brief.
 *
 * Deliberately excludes the horizontal container (mx-auto/max-w/px) — each
 * section's content width varies (max-w-3xl for a timeline, max-w-7xl for
 * the footer, etc.), so callers keep composing that themselves via
 * `className`, e.g. `<Section className="mx-auto max-w-6xl px-6 sm:px-10">`.
 *
 * Also deliberately NOT used for full-bleed/hero sections (HeroSlider,
 * HeroGallery, PageHeader, PhotoMarquee, Testimonials,
 * AboutPhotographerSection, ExploreWeddingsGrid) — those are edge-to-edge by
 * design, with no padding of their own, and stay that way.
 */
export default function Section({ as: Tag = "section", id, className, children }: SectionProps) {
  return <Tag id={id} className={cn("py-10 sm:py-14 md:py-18 lg:py-24", className)}>{children}</Tag>;
}

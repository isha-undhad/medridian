import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VideoHero from "@/components/portfolio/VideoHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import EngagementVideoShowcase from "@/components/portfolio/EngagementVideoShowcase";
import Section from "@/components/ui/Section";
import { categoryContent, getCategoryContent } from "@/data/categories";
import { portfolio1Items } from "@/data/portfolio1";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

// Pre-render known categories at build time — Engagements and Family & Maternity
// sub-pages are commented out per single-page Weddings portfolio design.
export function generateStaticParams() {
  /*
  return Object.keys(categoryContent).map((category) => ({ category }));
  */
  return [{ category: "weddings" }];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (category !== "weddings") return {};
  const content = getCategoryContent(category);
  if (!content) return {};

  return {
    title: `${content.label} — Dream Stories`,
    description: `${content.label} photography from Dream Stories.`,
  };
}

export default async function PortfolioCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Engagements and Family & Maternity sub-pages commented out:
  if (category !== "weddings") {
    notFound();
  }

  const content = getCategoryContent(category);

  if (!content) {
    notFound();
  }

  return (
    <>
      <VideoHero {...content.video} />
      <Section className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Same source, orientation-matching, random-40, and no-click behavior
            as the main /portfolio grid (see PortfolioGrid) — "weddings" is the
            only reachable category, and portfolio_1 has no per-category split. */}
        <PortfolioGrid items={portfolio1Items} limit={40} />
      </Section>
      {/* Vimeo showcase reel — Engagements only (commented out) */}
      {/* {content.slug === "engagements" ? <EngagementVideoShowcase /> : null} */}
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VideoHero from "@/components/portfolio/VideoHero";
import PhotoGrid from "@/components/portfolio/PhotoGrid";
import EngagementVideoShowcase from "@/components/portfolio/EngagementVideoShowcase";
import Section from "@/components/ui/Section";
import { categoryContent, getCategoryContent, getCategoryPhotos } from "@/data/categories";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

// Pre-render every known category (weddings, engagements, family-maternity)
// at build time — add a key to categoryContent in data/categories.ts and its
// route is picked up here automatically, no page-per-category duplication.
export function generateStaticParams() {
  return Object.keys(categoryContent).map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const content = getCategoryContent(category);
  if (!content) return {};

  return {
    title: `${content.label} — Dream Stories`,
    description: `${content.label} photography from Dream Stories.`,
  };
}

export default async function PortfolioCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const content = getCategoryContent(category);

  if (!content) {
    notFound();
  }

  const photos = getCategoryPhotos(content);

  return (
    <>
      <VideoHero {...content.video} />
      <Section className="mx-auto max-w-7xl px-6 sm:px-10">
        <PhotoGrid photos={photos} />
      </Section>
      {/* Vimeo showcase reel — Engagements only, per the current brief. Keyed
          off content.slug rather than a new categoryContent field since
          nothing else about this section varies per category yet; move it
          into categoryContent (like `video` above) if other categories need
          their own showcase later. */}
      {content.slug === "engagements" ? <EngagementVideoShowcase /> : null}
    </>
  );
}

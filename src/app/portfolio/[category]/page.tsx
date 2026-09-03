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

  const photos = getCategoryPhotos(content);

  return (
    <>
      <VideoHero {...content.video} />
      <Section className="mx-auto max-w-7xl px-6 sm:px-10">
        <PhotoGrid photos={photos} />
      </Section>
      {/* Vimeo showcase reel — Engagements only (commented out) */}
      {/* {content.slug === "engagements" ? <EngagementVideoShowcase /> : null} */}
    </>
  );
}

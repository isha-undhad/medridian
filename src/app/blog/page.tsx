import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import Section from "@/components/ui/Section";
import FromTheHeartSlider from "@/components/blog/FromTheHeartSlider";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Journal — Dream Stories",
  description: "Notes on technique, craft, and stories from behind the camera.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes From the Studio"
        description="Technique, craft, and the occasional story from behind the camera."
        tone="ivory"
        image="/portfolio/10.jpg"
        imageAlt="Close-up of the bride's hands clasped together, showing her engagement ring"
      />
      <Section className="mx-auto max-w-7xl px-6 sm:px-10">
        <BlogGrid />
      </Section>
      <FromTheHeartSlider />
      <InstagramFollow />
    </>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServicesGrid from "@/components/services/ServicesGrid";
import Section from "@/components/ui/Section";
import InquireCta from "@/components/about/InquireCta";
import HowItWorksSection from "@/components/experience/HowItWorksSection";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Services — Meridian Studio",
  description: "Wedding, portrait, editorial, travel, and fine-art print services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Built Around Your Story"
        description="Every service starts the same way: a conversation about what the photographs are actually for."
        tone="sage"
        image="/portfolio/8.jpg"
        imageAlt="Bride and groom laughing together beneath a gilded archway"
      />
      <Section className="mx-auto max-w-7xl px-6 sm:px-10">
        <ServicesGrid />
      </Section>

      <InquireCta
        eyebrow="MERIDIAN STUDIO"
        heading="Tailored to Your Vision"
        subtitle="From quiet, intimate moments to grand celebrations — let's curate the perfect coverage for your story."
        ctaText="Start a Conversation"
        ctaLink="/contact"
        image="/home/catagory3.jpg"
        imageAlt="Couple walking hand in hand through garden path at golden hour"
      />
      <HowItWorksSection />
      <InstagramFollow />
    </>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import EditorialExperience from "@/components/experience/EditorialExperience";
import OurJourney from "@/components/experience/OurJourney";
import ExperienceClosing from "@/components/experience/ExperienceClosing";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Experience — Meridian Studio",
  description: "The story of Meridian Studio, from a single camera bag to a small collaborative studio.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="A Quiet Kind of Studio"
        description="Ten years, one principle: light first, everything after."
        tone="dusk"
        image="/portfolio/9.jpg"
        imageAlt="Bride and groom toasting with champagne coupes, in black and white"
      />
      <OurJourney />
      <EditorialExperience />
      <ExperienceClosing />
      <InstagramFollow />
    </>
  );
}

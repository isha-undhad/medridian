import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import AboutHero from "@/components/about/AboutHero";
import PhotographerBio from "@/components/about/PhotographerBio";
import Specialties from "@/components/about/Specialties";
import AboutTimeline from "@/components/about/AboutTimeline";
import InquireCta from "@/components/about/InquireCta";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "About — Dream Stories",
  description: "Meet Ravi Barvaliya, the photographer and founder behind Dream Stories.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The Eye Behind Dream Stories"
        description="Photographer, founder, and storyteller — creating timeless imagery from the moments that matter."
        tone="clay"
        image="/image/hero_about.jpg"
        imageAlt="Bride leaning on groom's shoulder in wedding attire"
      />
      <AboutHero />
      <Specialties />
      <PhotographerBio />
      <AboutTimeline />
      <InquireCta />
      <InstagramFollow />
    </>
  );
}

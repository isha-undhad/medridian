import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import AboutIntro from "@/components/about/AboutIntro";
import PhotographerBio from "@/components/about/PhotographerBio";
import Specialties from "@/components/about/Specialties";
import InquireCta from "@/components/about/InquireCta";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "About — Meridian Studio",
  description: "Meet Ava Bennett, the photographer and founder behind Meridian Studio.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The Eye Behind Meridian"
        description="Photographer, founder, and the person behind every frame."
        tone="clay"
        image="/home/about2.jpeg"
        imageAlt="Bride and groom walking the grounds of a grand estate, the bride glancing back over her shoulder"
      />
      <AboutIntro />
      <Specialties />
      <PhotographerBio />
      <InquireCta />
      <InstagramFollow />
    </>
  );
}

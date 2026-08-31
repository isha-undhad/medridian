import type { Metadata } from "next";
import { Suspense } from "react";
import HeroGallery from "@/components/portfolio/HeroGallery";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Portfolio — Dream Stories",
  description: "Weddings, portraits, editorial, and travel work from Dream Stories.",
};

export default function PortfolioPage() {
  return (
    <>
      <HeroGallery
        leftImage="/portfolio/1.jpeg"
        rightImage="/portfolio/3.jpeg"
        leftAlt="Bride and groom embracing beneath a carved stone archway"
        rightAlt="Bride and groom kissing beneath a colonnade"
      />
      <Suspense fallback={null}>
        <PortfolioBrowser />
      </Suspense>
      <InstagramFollow className="pt-4 sm:pt-4 md:pt-6 lg:pt-6" />
    </>
  );
}

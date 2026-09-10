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
        leftImage="/image/portfolio/1.jpg"
        rightImage="/image/portfolio/2.jpg"
        leftAlt="Bride and groom embracing beneath a carved stone archway"
        rightAlt="Celebration photograph of bride dancing with mehndi details"
        leftObjectPosition="center"
        rightObjectPosition="center center"
      />
      <Suspense fallback={null}>
        <PortfolioBrowser />
      </Suspense>
      <InstagramFollow className="pt-4 sm:pt-4 md:pt-6 lg:pt-6" />
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Portfolio — Dream Stories",
  description: "Weddings, portraits, editorial, and travel work from Dream Stories.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative w-full h-svh md:h-dvh overflow-hidden">
        <Image
          src="/image/portfolio_hero.jpg"
          alt="Dream Stories portfolio hero photograph"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 10%" }}
        />
      </section>
      <Suspense fallback={null}>
        <PortfolioBrowser />
      </Suspense>
      <InstagramFollow className="pt-4 sm:pt-4 md:pt-6 lg:pt-6" />
    </>
  );
}

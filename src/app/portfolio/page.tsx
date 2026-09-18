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
      {/* Navbar is `fixed`, always opaque on this route (see Navbar's `isHome`
          check), and sits on top of everything — so this section is pushed
          down by exactly the navbar's rendered height at each breakpoint
          (56/64/68px) instead of starting at y:0 underneath it. Height
          shrinks by the same amount so the section's bottom edge still lands
          at the viewport edge; the image only ever loses more from the
          bottom, never the top. */}
      <section className="relative w-full overflow-hidden mt-14 h-[calc(100svh-56px)] sm:mt-16 sm:h-[calc(100svh-64px)] md:mt-[68px] md:h-[calc(100dvh-68px)]">
        <Image
          src="/image/portfolio_hero.jpg"
          alt="Dream Stories portfolio hero photograph"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center top" }}
        />
      </section>
      <Suspense fallback={null}>
        <PortfolioBrowser />
      </Suspense>
      <InstagramFollow className="pt-4 sm:pt-4 md:pt-6 lg:pt-6" />
    </>
  );
}

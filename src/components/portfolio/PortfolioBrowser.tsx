"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioGrid from "./PortfolioGrid";
// Sub-category components commented out per single-page Weddings portfolio design:
// import EngagementCinematicSection from "./EngagementCinematicSection";
// import FamilyMaternityGrid from "@/components/signature-work/FamilyMaternityGrid";
import PhotoMarquee from "@/components/home/PhotoMarquee";
import Section from "@/components/ui/Section";
import { portfolioItems, portfolioCategories } from "@/data/portfolio";

export default function PortfolioBrowser() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;

  // Single static page locked to "Weddings" category
  const [activeCategory, setActiveCategory] = useState<string>("Weddings");

  const [prevCategoryParam, setPrevCategoryParam] = useState(categoryParam);
  if (categoryParam !== prevCategoryParam) {
    setPrevCategoryParam(categoryParam);
  }

  useEffect(() => {
    if (categoryParam) {
      const element = document.getElementById("portfolio-browser");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [categoryParam]);

  // Only Weddings category items are displayed
  const filteredItems = useMemo(
    () => portfolioItems.filter((item) => item.category === "Weddings"),
    [],
  );

  // Sub-category flags commented out:
  // const isEngagements = activeCategory === "Engagements";
  // const isFamilyMaternity = activeCategory === "Family & Maternity";

  return (
    <>
      <Section id="portfolio-browser" className="mx-auto max-w-7xl px-6 pb-4 sm:px-10 sm:pb-6 md:pb-8 lg:pb-10 scroll-mt-24">
        <PortfolioHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Sub-category branches commented out — Weddings category rendered directly */}
        {/*
        {isEngagements ? (
          <>
            <EngagementCinematicSection className="mt-8 sm:mt-10 lg:mt-12" />
            <div className="mt-10 sm:mt-12 lg:mt-16">
              <PortfolioGrid items={filteredItems} layout="flex" />
            </div>
          </>
        ) : isFamilyMaternity ? (
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <FamilyMaternityGrid />
          </div>
        ) : (
        */}
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <PortfolioGrid items={filteredItems} layout="columns" />
        </div>
        {/* )} */}
      </Section>

      {/* Infinity slider (PhotoMarquee) and editorial caption line below */}
      <div className="w-full">
        <PhotoMarquee className="my-0" />
        <div className="w-full bg-[var(--color-bg)] px-4 py-2.5 sm:py-3.5 text-center">
          <p className="mx-auto max-w-4xl font-serif text-[11.5px] min-[360px]:text-xs sm:text-sm font-light tracking-wide sm:tracking-wider text-[var(--color-body)]/85 leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
            Based in Surat — photographing love stories worldwide.
          </p>
        </div>
      </div>
    </>
  );
}

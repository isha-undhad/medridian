"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioGrid from "./PortfolioGrid";
import EngagementCinematicSection from "./EngagementCinematicSection";
import FamilyMaternityGrid from "@/components/signature-work/FamilyMaternityGrid";
import PhotoMarquee from "@/components/home/PhotoMarquee";
import Section from "@/components/ui/Section";
import { portfolioItems, portfolioCategories } from "@/data/portfolio";

export default function PortfolioBrowser() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (categoryParam && (portfolioCategories as readonly string[]).includes(categoryParam)) {
      return categoryParam;
    }
    return portfolioCategories[0];
  });

  const [prevCategoryParam, setPrevCategoryParam] = useState(categoryParam);
  if (categoryParam !== prevCategoryParam) {
    setPrevCategoryParam(categoryParam);
    if (categoryParam && (portfolioCategories as readonly string[]).includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }

  useEffect(() => {
    if (categoryParam && (portfolioCategories as readonly string[]).includes(categoryParam)) {
      const element = document.getElementById("portfolio-browser");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [categoryParam]);

  const filteredItems = useMemo(
    () => portfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const isEngagements = activeCategory === "Engagements";
  const isFamilyMaternity = activeCategory === "Family & Maternity";

  return (
    <>
      <Section id="portfolio-browser" className="mx-auto max-w-7xl px-6 pb-4 sm:px-10 sm:pb-6 md:pb-8 lg:pb-10 scroll-mt-24">
        <PortfolioHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        
        {isEngagements ? (
          <>
            {/* Video section comes first for Engagements tab */}
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
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <PortfolioGrid items={filteredItems} layout="columns" />
          </div>
        )}
      </Section>

      {/* Infinity slider (PhotoMarquee) and editorial caption line below */}
      {!isEngagements && !isFamilyMaternity ? (
        <div className="w-full">
          <PhotoMarquee className="my-0" />
          <div className="w-full bg-[var(--color-bg)] px-4 py-3 text-center sm:py-4">
            <p className="mx-auto max-w-4xl font-serif text-body font-light tracking-wide sm:tracking-wider text-[var(--color-body)]/85 leading-relaxed whitespace-normal sm:whitespace-nowrap">
              <span className="sm:hidden">
                Based in California, photographing modern weddings worldwide.
              </span>
              <span className="hidden sm:inline">
                Based in California, photographing modern, heartfelt weddings across the US and Europe.
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

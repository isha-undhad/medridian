import dynamic from "next/dynamic";
import HeroSlider from "@/components/home/HeroSlider";
import IntroSection from "@/components/home/IntroSection";
import OfferingsHeadline from "@/components/home/OfferingsHeadline";
import PortfolioSection from "@/components/home/PortfolioSection";
import AboutPhotographerSection from "@/components/home/AboutPhotographerSection";
import HowItWorks from "@/components/home/HowItWorks";
import InquireEditorial from "@/components/contact/InquireEditorial";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// Below-the-fold sections: code-split out of the initial bundle so their
// (framer-motion-heavy) JS loads after the parts of the page users see
// first, instead of blocking hydration. SSR stays on, so the rendered HTML
// and visuals are unchanged — only the JS chunk timing moves.
const ExploreWeddingsGrid = dynamic(() => import("@/components/home/ExploreWeddingsGrid"));
const ClientTestimonials = dynamic(() => import("@/components/home/ClientTestimonials"));
const InstagramFollow = dynamic(() => import("@/components/home/InstagramFollow"));

export default function Home() {
  return (
    <>
      {/* 1. Hero Slider — LOCKED */}
      <HeroSlider />

      {/* 2. Introduction — LOCKED */}
      <IntroSection />

      {/* 3. The Offerings — LOCKED */}
      <OfferingsHeadline />

      {/* 4. Signature Portfolio — LOCKED */}
      <Section className="bg-[var(--color-bg)] pt-10 sm:pt-0 md:pt-0 lg:pt-0 pb-0 sm:pb-0 md:pb-0 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="CURATED STORIES" title="PORTFOLIO" size="hero" />
        </div>
      </Section>
      <PortfolioSection />

      {/* 5. How It Works (Temporarily commented out per request) */}
      {/* <HowItWorks className="mb-10 sm:mb-14 md:mb-16 lg:mb-20" /> */}

      {/* 6. About the Photographer */}
      <AboutPhotographerSection />

      {/* 7. Immersive Gallery */}
      <div className="mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <ExploreWeddingsGrid />
      </div>

      {/* 8. Client Testimonials — NEW SECTION */}
      <ClientTestimonials />

      {/* 9. Final CTA & Investment — LOCKED */}
      <InquireEditorial inquiryHref="/contact" />

      {/* 10. Instagram Feed — LOCKED */}
      <InstagramFollow />
    </>
  );
}
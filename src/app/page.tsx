import HeroSlider from "@/components/home/HeroSlider";
import IntroSection from "@/components/home/IntroSection";
import OfferingsHeadline from "@/components/home/OfferingsHeadline";
import PortfolioSection from "@/components/home/PortfolioSection";
import AboutPhotographerSection from "@/components/home/AboutPhotographerSection";
import HowItWorks from "@/components/home/HowItWorks";
import ExploreWeddingsGrid from "@/components/home/ExploreWeddingsGrid";
import ClientTestimonials from "@/components/home/ClientTestimonials";
import InquireEditorial from "@/components/contact/InquireEditorial";
import InstagramFollow from "@/components/home/InstagramFollow";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

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
      <Section className="bg-[var(--color-bg)] pb-0 md:pb-0 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="SIGNATURE WORK" title="PORTFOLIO" size="hero" />
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
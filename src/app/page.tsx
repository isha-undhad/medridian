import HeroSlider from "@/components/home/HeroSlider";
import IntroSection from "@/components/home/IntroSection";
import OfferingsHeadline from "@/components/home/OfferingsHeadline";
import PortfolioSection from "@/components/home/PortfolioSection";
import AboutPhotographerSection from "@/components/home/AboutPhotographerSection";
import ExploreWeddingsGrid from "@/components/home/ExploreWeddingsGrid";
import InquireEditorial from "@/components/contact/InquireEditorial";
import InstagramFollow from "@/components/home/InstagramFollow";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// IntroSection, OfferingsHeadline, PortfolioSection, and InstagramFollow all
// use the shared <Section> wrapper (src/components/ui/Section.tsx) for their
// own top/bottom padding now, so adjacent pairs of those get a consistent
// gap "for free" — same as every other page's stacked content sections —
// with no extra wrapper needed here.
//
// AboutPhotographerSection, ExploreWeddingsGrid, and InquireEditorial are
// full-bleed/edge-to-edge by design (no padding of their own), so where two
// of them sit back to back this margin keeps the same standard rhythm from
// showing as a hard cut between images. Not needed at a full-bleed section's
// other boundaries — the content section next to it already supplies the
// gap via its own Section padding, same as a PageHeader-to-content
// transition on every other page.
const FULL_BLEED_GAP = "mt-10 sm:mt-14 md:mt-16 lg:mt-20";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <IntroSection />
      <OfferingsHeadline />
      {/* pb-0 at every breakpoint Section itself uses (base/md/lg): only the
          top half of the standard Section rhythm is needed here —
          PortfolioSection's own top padding (via its shared <Section> below)
          already supplies the gap down to the grid, so stacking both top
          *and* bottom padding here would double it up. Each pb-0 has to
          repeat Section's own md:/lg: prefixes — an unprefixed pb-0 only
          cancels the base py-16's bottom half; md:py-20 and lg:py-24 still
          apply their own bottom padding at those breakpoints otherwise. Same
          max-w-[1400px]/px-6/lg:px-20 container as the grid below, so the
          heading lines up with it exactly. */}
      <Section className="bg-white pb-0 md:pb-0 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading eyebrow="SIGNATURE WORK" title="PORTFOLIO" size="hero" />
        </div>
      </Section>
      <PortfolioSection />
      {/* No FULL_BLEED_GAP here: PortfolioSection is a padded <Section> (not
          full-bleed), so its own bottom padding already supplies the gap
          down to this full-bleed section — stacking mt-* on top of that
          padding is exactly the double-gap bug just fixed above. */}
      <AboutPhotographerSection />
      <div className={FULL_BLEED_GAP}>
        <ExploreWeddingsGrid />
      </div>
      <div className={FULL_BLEED_GAP}>
        <InquireEditorial inquiryHref="/contact" />
      </div>
      <InstagramFollow />
    </>
  );
}
  
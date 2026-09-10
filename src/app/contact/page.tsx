import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/contact/ContactSection";
import InquireFaqSection from "@/components/contact/InquireFaqSection";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Contact — Dream Stories",
  description: "Get in touch about weddings, portraits, and editorial commissions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="GET IN TOUCH"
        title="Let's Create Something Timeless"
        description="We'd love to be part of your celebration. Tell us a little about your day — the date, the details, the dream — and we'll take it from there."
        tone="clay"
        image="/image/hero_inquire.jpg"
        imageAlt="Bride and groom kissing inside a domed garden temple surrounded by trees"
      />
      <div id="inquiry-form">
        <ContactSection />
      </div>
      <InquireFaqSection />
      <InstagramFollow className="pt-5 sm:pt-7 md:pt-8 lg:pt-10 pb-10 sm:pb-14 md:pb-16 lg:pb-20" />
    </>
  );
}

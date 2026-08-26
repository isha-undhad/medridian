import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/contact/ContactSection";
import InquireFaqSection from "@/components/contact/InquireFaqSection";
import InstagramFollow from "@/components/home/InstagramFollow";

export const metadata: Metadata = {
  title: "Contact — Meridian Studio",
  description: "Get in touch about weddings, portraits, and editorial commissions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Begin Your Story"
        description="Whether it's a wedding day, a brand you're building, or a milestone worth remembering — we'd love to hear about it. Share a few details below, and let's see where the story takes us."
        tone="clay"
        image="/portfolio/11.jpg"
        imageAlt="Bride and groom kissing inside a domed garden temple surrounded by trees"
      />
      <div id="inquiry-form">
        <ContactSection />
      </div>
      <InquireFaqSection />
      <InstagramFollow />
    </>
  );
}

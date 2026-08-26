import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export default function CtaBanner() {
  return (
    <section className="mx-4 my-10 sm:mx-6 sm:my-16 md:my-20 lg:my-24">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <PlaceholderMedia tone="clay" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/40" />
        <Reveal
          variants={fadeUp}
          className="relative flex flex-col items-center gap-4 sm:gap-6 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24 text-center"
        >
          <h2 className="max-w-xl font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight text-balance">
            Let&apos;s make something worth printing.
          </h2>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-white/90 text-pretty">
            Available for weddings, portraits, and editorial assignments worldwide.
          </p>
          <LinkButton href="/contact" variant="light" className="mt-2">
            Start a Conversation
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

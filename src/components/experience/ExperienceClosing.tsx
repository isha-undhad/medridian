import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { fadeUp, scaleIn } from "@/lib/motion";

/**
 * Full-bleed cinematic closing frame for the Experience page matching the
 * Kayla Fisher reference ("Ready to do this?").
 */
export default function ExperienceClosing() {
  return (
    <section className="relative flex h-dvh min-h-[520px] w-full items-center justify-center overflow-hidden my-0">
      {/* Background Photo */}
      <Reveal variants={scaleIn} className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image
            src="/Experience/ready_cta.jpg"
            alt="Bride laughing and walking with bridesmaids in sage dresses along garden path"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </Reveal>
      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-brightness-95" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 px-6 text-center max-w-3xl">
        <Reveal variants={fadeUp}>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] text-balance">
            Ready to do this?
          </h2>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.08}>
          <p className="max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/95 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] text-pretty">
            I&apos;d love to hear more about your celebration.
            <br />
            Let&apos;s create something beautiful together.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.16}>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-medium tracking-[0.2em] text-black uppercase transition-all duration-300 hover:bg-black hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] cursor-pointer"
          >
            Inquire
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

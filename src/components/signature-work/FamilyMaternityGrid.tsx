import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

type FamilyPortrait = { src: string; alt: string; name: string; location: string };

const FAMILY_PORTRAITS: FamilyPortrait[] = [
  {
    src: "/home/about1.jpg",
    alt: "Jeremy Lynch and Shauna Louise outdoor portrait",
    name: "JEREMY LYNCH & SHAUNA LOUISE",
    location: "CLIVEDEN HOUSE, UK",
  },
  {
    src: "/home/about2.jpeg",
    alt: "Urte and Danilo embrace",
    name: "URTE & DANILO",
    location: "PUGLIA, ITALY",
  },
  {
    src: "/home/about3.jpg",
    alt: "Natalie and Daniel wedding kiss under floral arch",
    name: "NATALIE & DANIEL",
    location: "CLIVEDEN HOUSE, UK",
  },
  {
    src: "/home/insta1.jpg",
    alt: "Mariyeh and Nick outdoor reception",
    name: "MARIYEH & NICK",
    location: "PROVENCE, FRANCE",
  },
  {
    src: "/home/insta2.jpg",
    alt: "Manuela and Alex coastal cliff kiss in Capri",
    name: "MANUELA & ALEX",
    location: "CAPRI, ITALY",
  },
  {
    src: "/home/insta3.jpg",
    alt: "Lucy and James standing on Chateau steps",
    name: "LUCY & JAMES",
    location: "CHATEAU DE VARENNES, FRANCE",
  },
];

export default function FamilyMaternityGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {FAMILY_PORTRAITS.map((portrait, index) => (
        <Reveal key={portrait.name} variants={fadeUp} delay={index * 0.08}>
          <figure className="group flex flex-col cursor-pointer">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-5 flex flex-col items-center gap-1 text-center sm:mt-6">
              <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-ink)] uppercase">
                {portrait.name}
              </span>
              <span className="text-[11px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
                {portrait.location}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Mail, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { NavLink } from "@/components/ui/NavLink";
import { MonogramBadge, LogoWordmark } from "@/components/ui/Logo";
import { SocialIconGlyph } from "@/components/ui/SocialIcons";
import PrivacyPolicyModal from "@/components/ui/PrivacyPolicyModal";
import { usePrivacyConsent } from "@/lib/usePrivacyConsent";
import { brand, footerExploreColumnA, footerGalleries, socialLinks } from "@/data/nav";

const columnHeadingClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-black";
const ruleClasses = "mt-3 mb-5 block h-px w-8 bg-[var(--color-line)]";
const footerLinkClasses =
  "inline-block w-fit text-sm text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-accent-ink)]";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const { isAccepted: isPolicyAccepted } = usePrivacyConsent();

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire up to a real newsletter provider (Mailchimp, ConvertKit, etc.)
    // once one is chosen — logging for now so the form is demonstrably wired.
    console.log("Newsletter signup:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]">
      {/* Monogram badge straddles the boundary between the section above and
          the footer: same background as the footer, so it visually
          interrupts the border-t line running behind it left and right. */}
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MonogramBadge className="h-14 w-14 bg-[var(--color-bg)] text-lg text-[var(--color-ink)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 pt-12 sm:pt-16 md:pt-18 pb-8 sm:pb-10 md:pb-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:justify-between lg:gap-10">
          {/* Brand */}
          <div className="lg:max-w-[280px]">
            <LogoWordmark className="text-xl sm:text-2xl text-[var(--color-ink)]">
              {brand.short.toUpperCase()}
            </LogoWordmark>
            <span aria-hidden className={ruleClasses} />
            <p className="text-body leading-relaxed text-[var(--color-muted)]">{brand.tagline}</p>
            <div className="mt-5 sm:mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-accent-ink)] p-1 -m-1"
                >
                  <SocialIconGlyph icon={social.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <span className={columnHeadingClasses}>Explore</span>
            <span aria-hidden className={ruleClasses} />
            <nav className="flex flex-col items-start gap-1.5" aria-label="Explore">
              {footerExploreColumnA.map((link) => (
                <NavLink key={link.href} href={link.href} className={footerLinkClasses}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Galleries */}
          <div>
            <span className={columnHeadingClasses}>Galleries</span>
            <span aria-hidden className={ruleClasses} />
            <nav className="flex flex-col items-start gap-1.5" aria-label="Galleries">
              {footerGalleries.map((link) => (
                <NavLink key={link.label} href={link.href} className={footerLinkClasses}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Stay in the loop */}
          <div className="lg:max-w-[280px] w-full">
            <span className={columnHeadingClasses}>Stay in the Loop</span>
            <span aria-hidden className={ruleClasses} />
            <p className="text-body leading-relaxed text-[var(--color-muted)]">
              Get updates on new stories, exclusive offers and more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 sm:mt-5 flex flex-col gap-2">
              <div className="relative flex items-center border border-[var(--color-ink)]/50 bg-transparent focus-within:border-[var(--color-ink)] transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  aria-label="Email address"
                  suppressHydrationWarning
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none pr-10"
                />
                <button
                  type="submit"
                  aria-label="Submit email"
                  suppressHydrationWarning
                  className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3.5 text-[var(--color-ink)] hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              {submitted ? (
                <span role="status" className="text-xs text-[var(--color-muted)]">
                  Thanks — you&apos;re on the list.
                </span>
              ) : null}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between sm:px-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              {brand.location}
            </span>
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[var(--color-accent-ink)] hover:underline underline-offset-2"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              {brand.email}
            </a>
            <a
              href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[var(--color-accent-ink)] hover:underline underline-offset-2"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              {brand.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span suppressHydrationWarning>&copy; {new Date().getFullYear()} {brand.name}</span>
            <span aria-hidden="true" className="text-[var(--color-line)]">|</span>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              suppressHydrationWarning
              className="inline-flex items-center gap-1.5 underline underline-offset-2 transition-all duration-300 hover:text-[var(--color-accent-ink)] hover:opacity-90 cursor-pointer"
            >
              {isPolicyAccepted && (
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              )}
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Interactive Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </footer>
  );
}

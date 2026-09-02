"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { headerPrimaryNav, headerUtilityNav, inquireLink } from "@/data/nav";
import { Logo } from "@/components/ui/Logo";
import { NavLink } from "@/components/ui/NavLink";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change — adjusted during render (per
  // React's "storing information from previous renders" pattern) rather
  // than in an effect, since it only needs to run when pathname changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock html and body scroll completely while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    const handleHideNav = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setNavHidden(customEvent.detail);
    };
    window.addEventListener("toggle-hide-nav", handleHideNav);
    return () => window.removeEventListener("toggle-hide-nav", handleHideNav);
  }, []);

  // Determine whether the current route opens with a full-bleed dark hero image
  // (where transparent navbar + white text is legible before scrolling).
  // Pages with a light cream background (e.g. /about, /stories, /stories/*)
  // always render in solid dark mode so text and logo are 100% legible.
  const hasDarkHero =
    pathname === "/" ||
    pathname === "/portfolio" ||
    pathname.startsWith("/portfolio/") ||
    pathname === "/contact";

  const solid = scrolled || menuOpen || !hasDarkHero;

  // White over the transparent hero (any photo underneath could be dark or
  // light, so a drop-shadow keeps it legible either way), ink once the
  // header has a solid background to sit on.
  const navTextClass = solid
    ? "text-[var(--color-ink)]"
    : "text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]";
  // Wordmark-only logo (no monogram badge) — a `drop-shadow` filter still
  // reads slightly crisper than `text-shadow` on the serif strokes against
  // a bright slide (light sky, white florals), so keep using it here even
  // though there's no separate SVG/badge to account for anymore.
  const logoTextClass = solid
    ? "text-[var(--color-ink)]"
    : "text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)]";
  const barClass = solid ? "bg-[var(--color-ink)]" : "bg-white";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ease-in-out ${navHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          } ${solid
            ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-10 sm:py-3.5">
          <Link
            href="/"
            aria-label="Dream Stories — Home"
            className="flex items-center transition-opacity duration-300 hover:opacity-75"
          >
            <Logo
              variant="full"
              tone={solid ? "dark" : "light"}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6" aria-label="Primary">
            {[...headerPrimaryNav, ...headerUtilityNav].map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${navTextClass}`}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              href={inquireLink.href}
              active={pathname === inquireLink.href}
              className={`text-sm font-medium italic tracking-wide transition-colors duration-300 ${navTextClass}`}
            >
              {inquireLink.label}
            </NavLink>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            suppressHydrationWarning
            onClick={() => setMenuOpen((value) => !value)}
            className="relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden cursor-pointer"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`block h-px w-5 transition-colors duration-300 ${barClass}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`block h-px w-5 transition-colors duration-300 ${barClass}`}
            />
          </button>
        </div>
      </header>

      {/* Rendered as a sibling, not a header child: `backdrop-blur-md` on
          <header> (applied once `solid` is true, which includes menuOpen)
          would otherwise make the header itself the containing block for
          this fixed-position overlay, collapsing its height. */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

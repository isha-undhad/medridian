"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { mobileNavLinks, inquireLink, socialLinks } from "@/data/nav";
import { SocialIconGlyph } from "@/components/ui/SocialIcons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const panelVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={panelVariants}
          className="fixed inset-0 top-[56px] sm:top-[62px] z-50 flex flex-col justify-start overflow-y-auto overscroll-contain bg-[var(--color-bg)] px-6 pt-2 pb-8 sm:px-10 sm:pt-4 sm:pb-10 md:hidden"
        >
          <nav className="flex flex-col divide-y divide-[var(--color-line)]">
            {mobileNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block w-full py-2.5 sm:py-3 font-serif text-xl sm:text-2xl transition-colors duration-300 ${isActive
                        ? "text-black font-semibold underline underline-offset-8 decoration-1 decoration-black"
                        : "text-[var(--color-ink)]/60 hover:text-black font-normal"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div variants={itemVariants}>
              <Link
                href={inquireLink.href}
                onClick={onClose}
                className={`block w-full py-2.5 sm:py-3 font-serif text-xl sm:text-2xl italic transition-colors duration-300 ${pathname === inquireLink.href
                    ? "text-black font-semibold underline underline-offset-8 decoration-1 decoration-black"
                    : "text-[var(--color-ink)]/60 hover:text-black font-normal"
                  }`}
              >
                {inquireLink.label}
              </Link>
            </motion.div>
          </nav>

          {/* Follow Along footer anchored to the bottom of the menu container */}
          <motion.div
            variants={itemVariants}
            className="mt-auto pt-8 sm:pt-10 flex items-center justify-between shrink-0"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Follow Along
            </span>
            <div className="flex gap-4 sm:gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-[var(--color-ink)] transition-opacity duration-300 hover:opacity-60"
                >
                  <SocialIconGlyph icon={social.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

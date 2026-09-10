"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 350px
      setVisible(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--color-ink)] text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:bg-[var(--color-accent-ink)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer select-none ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp
        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />
    </button>
  );
}

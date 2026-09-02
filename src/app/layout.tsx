import type { Metadata } from "next";
import { Geist, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextMarquee from "@/components/home/TextMarquee";
import CookieConsent from "@/components/ui/CookieConsent";
import { brand } from "@/data/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: `${brand.name} — Fine-Art Photography`,
  description: brand.tagline,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col w-full bg-[var(--color-bg)] font-sans text-[var(--color-ink)]"
      >
        {/* Disables transform-based motion app-wide for users who prefer reduced motion. */}
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <TextMarquee />
          <Footer />
          <CookieConsent />
        </MotionConfig>
      </body>
    </html>
  );
}

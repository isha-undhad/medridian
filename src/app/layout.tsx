import type { Metadata } from "next";
import { Geist, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextMarquee from "@/components/home/TextMarquee";
// import CookieConsent from "@/components/ui/CookieConsent";
import BackToTop from "@/components/ui/BackToTop";
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
  weight: ["300", "400", "500", "600"],
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
      <head>
        <script
          id="perf-timing-guard"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;window.addEventListener('error',function(e){if(e&&e.message&&e.message.indexOf('startTime')!==-1){e.preventDefault();e.stopImmediatePropagation();}},true);if(!window.performance)return;var fb={startTime:0,duration:0,responseEnd:0,transferSize:0,initiatorType:'',name:'',entryType:'resource'};function sw(l){if(!Array.isArray(l))return l;var cl=[];for(var j=0;j<l.length;j++){if(l[j]!=null)cl.push(l[j]);}if(typeof Proxy==='function'){return new Proxy(cl,{get:function(t,p,r){if(typeof p==='string'&&!isNaN(Number(p))){var i=Number(p);return(i in t&&t[i]!=null)?t[i]:fb;}return Reflect.get(t,p,r);}});}return cl;}if(typeof window.performance.getEntriesByType==='function'){var ogT=window.performance.getEntriesByType.bind(window.performance);window.performance.getEntriesByType=function(t){try{return sw(ogT(t));}catch(e){return sw([]);}};}if(typeof window.performance.getEntries==='function'){var ogG=window.performance.getEntries.bind(window.performance);window.performance.getEntries=function(){try{return sw(ogG());}catch(e){return sw([]);}};}if(typeof window.performance.getEntriesByName==='function'){var ogN=window.performance.getEntriesByName.bind(window.performance);window.performance.getEntriesByName=function(n,t){try{return sw(ogN(n,t));}catch(e){return sw([]);}};}if(typeof PerformanceObserver!=='undefined'){var op=window.PerformanceObserverEntryList&&window.PerformanceObserverEntryList.prototype;if(op){if(typeof op.getEntries==='function'){var ogOE=op.getEntries;op.getEntries=function(){return sw(ogOE.call(this));};}if(typeof op.getEntriesByType==='function'){var ogOET=op.getEntriesByType;op.getEntriesByType=function(t){return sw(ogOET.call(this,t));};}}}})();`,
          }}
        />
      </head>
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
          {/* <CookieConsent /> */}
          <BackToTop />
        </MotionConfig>
      </body>
    </html>
  );
}

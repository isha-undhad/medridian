import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires an explicit allowlist; the hero slider requests
    // quality={90} for crisper full-bleed photos than the default (75).
    qualities: [75, 90],
  },
};

export default nextConfig;

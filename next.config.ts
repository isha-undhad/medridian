import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.21"],
  images: {
    // Next.js 16 requires an explicit allowlist; allow default 75, photography 85/90,
    // and 100 for the home hero (full-bleed background — needs max fidelity).
    qualities: [75, 85, 90, 100],
  },
};

export default nextConfig;

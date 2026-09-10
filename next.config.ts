import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.21"],
  images: {
    // Next.js 16 requires an explicit allowlist; allow default 75, photography 85, and 90.
    qualities: [75, 85, 90],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next.js 16 requires an explicit quality allowlist */
    qualities: [75, 90],
    /* Prefer AVIF (≈20% smaller), fall back to WebP */
    formats: ["image/avif", "image/webp"],
    /* Cache optimized images for 7 days to reduce re-processing */
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;

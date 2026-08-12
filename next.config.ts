import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.tvtropes.org" },
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/artisan",
        destination: "/dashboard/artisan/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

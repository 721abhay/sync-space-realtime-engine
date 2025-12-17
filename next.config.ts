// import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextConfig: any = {
  // --- CDN CONFIGURATION (Row 8) ---
  // If NEXT_PUBLIC_CDN_URL is defined, assets load from CloudFront
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || undefined,

  images: {
    domains: ["assets.aceternity.com", "images.unsplash.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

export default nextConfig;

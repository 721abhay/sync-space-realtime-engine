import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- CDN CONFIGURATION (Row 8) ---
  // If NEXT_PUBLIC_CDN_URL is defined, assets load from CloudFront
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || undefined,

  images: {
    domains: ["assets.aceternity.com", "images.unsplash.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

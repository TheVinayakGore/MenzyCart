import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Allow images from localhost using the new remotePatterns configuration
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/branding/**",
        search: "",
      },
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/images/games/**",
        search: "?v=2026-04-23-minimal",
      },
    ],
  },
};

export default nextConfig;

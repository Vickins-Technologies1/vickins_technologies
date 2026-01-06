import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds and development
    ignoreDuringBuilds: true,
  },

  // Your other config (e.g., outputFileTracingRoot)
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
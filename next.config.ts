// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Remove the entire eslint block — it's invalid now
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
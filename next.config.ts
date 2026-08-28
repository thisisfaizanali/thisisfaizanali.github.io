import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — no server, so next/image's optimizer
  // (which runs at request time) can't be used either.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "*": ["./node_modules/@swc/helpers/esm/**"],
  },
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

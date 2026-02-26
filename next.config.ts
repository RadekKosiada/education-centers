import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheHandler:
    require.resolve("next/dist/server/lib/incremental-cache/file-system-cache.js"),
};

export default nextConfig;

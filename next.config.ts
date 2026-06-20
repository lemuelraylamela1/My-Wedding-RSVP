import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists in the
  // parent home directory which otherwise confuses Turbopack's inference).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

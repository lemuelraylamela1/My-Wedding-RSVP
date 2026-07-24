import type { NextConfig } from "next";
import path from "node:path";

const plannerAppUrl = (process.env.NEXT_PUBLIC_PLANNER_APP_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists in the
  // parent home directory which otherwise confuses Turbopack's inference).
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Allow PlanMyDay dashboard to embed this site in an iframe preview.
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${plannerAppUrl}`,
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

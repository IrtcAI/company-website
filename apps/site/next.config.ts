import type { NextConfig } from "next";
import { internalRedirects, localizedRewrites } from "./lib/routes";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [],
  },
  async redirects() {
    return internalRedirects();
  },
  async rewrites() {
    return localizedRewrites();
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    // Vercel Analytics and Speed Insights load from same-origin /_vercel/...
    // in production, but fall back to va.vercel-scripts.com in dev/debug mode.
    const devAnalyticsHost = isProd ? [] : ["https://va.vercel-scripts.com"];
    const scriptSrc = ["'self'", "'unsafe-inline'", ...devAnalyticsHost].join(
      " ",
    );
    const connectSrc = [
      "'self'",
      "https://api.openai.com",
      "https://api.resend.com",
      ...devAnalyticsHost,
    ].join(" ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src ${connectSrc}; font-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

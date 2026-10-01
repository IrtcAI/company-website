import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { NextConfig } from "next";
import { internalRedirects, localizedRewrites } from "./lib/routes";

const rootEnv = resolve(process.cwd(), "../../.env");
if (existsSync(rootEnv)) process.loadEnvFile(rootEnv);

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
    // Speed Insights loads same-origin from /_vercel in production, but from va.vercel-scripts.com in dev.
    const devInsights = isProd ? [] : ["https://va.vercel-scripts.com"];
    // React dev mode rebuilds server stack traces with eval(); production never calls it.
    const devEval = isProd ? [] : ["'unsafe-eval'"];
    const google = [
      "https://www.googletagmanager.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
    ];
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      ...devEval,
      google[0],
      ...devInsights,
    ].join(" ");
    const connectSrc = [
      "'self'",
      "https://api.openai.com",
      "https://api.resend.com",
      ...google,
      ...devInsights,
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

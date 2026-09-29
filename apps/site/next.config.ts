import type { NextConfig } from "next";
import { internalRedirects, localizedRewrites } from "./lib/routes";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [],
    inlineCss: true,
  },
  async redirects() {
    return internalRedirects();
  },
  async rewrites() {
    return localizedRewrites();
  },
  async headers() {
    const google = [
      "https://www.googletagmanager.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
    ];
    const scriptSrc = ["'self'", "'unsafe-inline'", google[0]].join(" ");
    const connectSrc = [
      "'self'",
      "https://api.openai.com",
      "https://api.resend.com",
      ...google,
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

import type { MetadataRoute } from "next";
import { lastModified } from "@/lib/page-dates";
import { sitePages } from "@/lib/page-markdown";
import { absoluteUrl, pageAlternates } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages().map(({ page, path, slugs }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified(path),
    alternates: {
      languages: Object.fromEntries(
        Object.entries(pageAlternates(page, slugs)).map(([locale, href]) => [
          locale,
          absoluteUrl(href),
        ]),
      ),
    },
  }));
}

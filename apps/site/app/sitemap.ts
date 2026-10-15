import type { MetadataRoute } from "next";
import type { Locale } from "@/lib/content";
import {
  absoluteUrl,
  locales,
  pageAlternates,
  pagePath,
  type Page,
} from "@/lib/routes";
import { serviceSlugs, services } from "@/lib/services";

function absoluteAlternates(
  page: Page,
  slugs?: Partial<Record<Locale, string>>,
) {
  const relative = pageAlternates(page, slugs);
  return Object.fromEntries(
    Object.entries(relative).map(([locale, path]) => [
      locale,
      absoluteUrl(path),
    ]),
  );
}

function entries(
  page: Page,
  slugs?: Partial<Record<Locale, string>>,
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: absoluteUrl(pagePath(locale, page, slugs?.[locale])),
    alternates: { languages: absoluteAlternates(page, slugs) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries("home"),
    ...entries("services"),
    ...services.flatMap((service) =>
      entries("services", serviceSlugs(service)),
    ),
    ...entries("about"),
    ...entries("founder"),
    ...entries("culture"),
    ...entries("mission"),
    ...entries("vision"),
    ...entries("contact"),
  ];
}

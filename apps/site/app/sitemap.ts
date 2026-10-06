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

const lastModified = new Date();

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
  options: {
    priority: number;
    changeFrequency: NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >;
    slugs?: Partial<Record<Locale, string>>;
  },
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: absoluteUrl(pagePath(locale, page, options.slugs?.[locale])),
    lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages: absoluteAlternates(page, options.slugs) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries("home", { priority: 1, changeFrequency: "weekly" }),
    ...entries("services", { priority: 0.9, changeFrequency: "monthly" }),
    ...services.flatMap((service) =>
      entries("services", {
        priority: 0.8,
        changeFrequency: "monthly",
        slugs: serviceSlugs(service),
      }),
    ),
    ...entries("about", { priority: 0.6, changeFrequency: "monthly" }),
    ...entries("founder", { priority: 0.6, changeFrequency: "monthly" }),
    ...entries("culture", { priority: 0.5, changeFrequency: "monthly" }),
    ...entries("mission", { priority: 0.5, changeFrequency: "monthly" }),
    ...entries("vision", { priority: 0.5, changeFrequency: "monthly" }),
    ...entries("contact", { priority: 0.7, changeFrequency: "monthly" }),
  ];
}

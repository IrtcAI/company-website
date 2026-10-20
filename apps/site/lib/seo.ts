import type { Metadata } from "next";
import type { Locale } from "./content";
import {
  absoluteUrl,
  feedPath,
  markdownPath,
  Page,
  pageAlternates,
  pagePath,
} from "./routes";

const ogLocale: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
};

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "IRTC, Cloud, Software & AI Engineering",
};

export function pageMetadata({
  locale,
  page,
  title,
  description,
  slugs,
}: {
  locale: Locale;
  page: Page;
  title: string;
  description: string;
  slugs?: Record<Locale, string>;
}): Metadata {
  const path = pagePath(locale, page, slugs?.[locale]);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: pageAlternates(page, slugs),
      types: {
        "text/markdown": markdownPath(path),
        "application/rss+xml": feedPath(locale),
      },
    },
    openGraph: {
      type: "website",
      siteName: "IRTC",
      title,
      description,
      url: absoluteUrl(path),
      locale: ogLocale[locale],
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

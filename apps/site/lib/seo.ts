import type { Metadata } from "next";
import type { Locale } from "./content";
import { absoluteUrl, Page, pageAlternates, pagePath } from "./routes";

const ogLocale: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
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
    alternates: { canonical: path, languages: pageAlternates(page, slugs) },
    openGraph: {
      type: "website",
      siteName: "IRTC",
      title,
      description,
      url: absoluteUrl(path),
      locale: ogLocale[locale],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

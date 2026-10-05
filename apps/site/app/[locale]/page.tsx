import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";
import { founderJobTitle, homeCopy } from "@/lib/copy/pages";
import { SITE_URL } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import {
  founder,
  graph,
  jsonLd,
  organization,
  ORGANIZATION_ID,
} from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") return {};

  return pageMetadata({
    locale,
    page: "home",
    title: homeCopy[locale].title,
    description: homeCopy[locale].description,
  });
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          graph(
            organization(locale, homeCopy[locale].organization),
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/${locale}`,
              name: "IRTC",
              inLanguage: locale,
              publisher: { "@id": ORGANIZATION_ID },
            },
            founder(locale, founderJobTitle),
          ),
        )}
      />
      <SiteShell locale={locale} page="home">
        <SiteExperience locale={locale} />
      </SiteShell>
    </>
  );
}

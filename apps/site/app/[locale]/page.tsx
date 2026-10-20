import type { Metadata } from "next";
import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";
import { founderJobTitle, homeCopy } from "@/lib/copy/pages";
import {
  LocaleParams,
  localeStaticParams,
  resolveLocaleParam,
} from "@/lib/locale-params";
import { absoluteUrl, pagePath, SITE_URL } from "@/lib/routes";
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
  return localeStaticParams();
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  return pageMetadata({
    locale,
    page: "home",
    title: homeCopy[locale].title,
    description: homeCopy[locale].description,
  });
}

export default async function Home({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);

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
              url: absoluteUrl(pagePath(locale, "home")),
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

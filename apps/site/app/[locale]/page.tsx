import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
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

const orgDescription = {
  en: "A software factory based in Belém, Pará, Brazil. We build custom software, websites, mobile apps, integrations and applied AI for businesses of every size.",
  es: "Fábrica de software con sede en Belém, Pará, Brasil. Creamos software a medida, sitios, aplicaciones, integraciones e inteligencia artificial para empresas de todos los tamaños.",
} as const;

const founderTitle = { en: "Founder", es: "Fundador" } as const;

const homeTitle = {
  en: "IRTC | Software, websites, apps and AI in Belém",
  es: "IRTC | Software, sitios, apps e IA en Belém",
} as const;

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
    title: homeTitle[locale],
    description: content[locale].hero.description,
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
            organization(locale, orgDescription[locale]),
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/${locale}`,
              name: "IRTC",
              inLanguage: locale,
              publisher: { "@id": ORGANIZATION_ID },
            },
            founder(locale, founderTitle[locale]),
          ),
        )}
      />
      <SiteShell locale={locale} page="home">
        <SiteExperience locale={locale} />
      </SiteShell>
    </>
  );
}

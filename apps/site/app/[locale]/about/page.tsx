import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";
import { AboutGallery } from "@/components/about-gallery";
import { ContactCta } from "@/components/contact-cta";
import { SiteShell } from "@/components/site-shell";
import { Stats } from "@/components/stats";
import { aboutCopy } from "@/lib/copy/about";
import { pageCopy } from "@/lib/copy/pages";
import {
  LocaleParams,
  localeStaticParams,
  resolveLocaleParam,
} from "@/lib/locale-params";
import { absoluteUrl, pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbs,
  graph,
  jsonLd,
  ORGANIZATION_ID,
  organization,
} from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  return pageMetadata({ locale, page: "about", ...pageCopy.about[locale] });
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  const copy = aboutCopy[locale];
  const path = pagePath(locale, "about");

  const data = graph(
    {
      "@type": "AboutPage",
      "@id": `${absoluteUrl(path)}#about`,
      url: absoluteUrl(path),
      name: pageCopy.about[locale].title,
      mainEntity: { "@id": ORGANIZATION_ID },
    },
    organization(locale, pageCopy.about[locale].description),
    breadcrumbs([
      { name: copy.breadcrumbHome, path: pagePath(locale, "home") },
      { name: copy.breadcrumbCurrent, path },
    ]),
  );

  return (
    <SiteShell locale={locale} page="about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(data)}
      />
      <AboutContent locale={locale} />
      <AboutGallery locale={locale} />
      <Stats locale={locale} />
      <ContactCta locale={locale} />
    </SiteShell>
  );
}

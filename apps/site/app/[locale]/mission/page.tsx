import type { Metadata } from "next";
import { MissionPage } from "@/components/brand-pages";
import { ContactCta } from "@/components/contact-cta";
import { SiteShell } from "@/components/site-shell";
import { missionCopy } from "@/lib/copy/culture";
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
  return pageMetadata({ locale, page: "mission", ...pageCopy.mission[locale] });
}

export default async function MissionRoute({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  const copy = missionCopy[locale];
  const path = pagePath(locale, "mission");

  const data = graph(
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#page`,
      url: absoluteUrl(path),
      name: pageCopy.mission[locale].title,
      about: { "@id": ORGANIZATION_ID },
    },
    organization(locale, pageCopy.mission[locale].description),
    breadcrumbs([
      { name: copy.breadcrumbHome, path: pagePath(locale, "home") },
      { name: copy.breadcrumbCurrent, path },
    ]),
  );

  return (
    <SiteShell locale={locale} page="mission">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(data)}
      />
      <MissionPage locale={locale} />
      <ContactCta locale={locale} />
    </SiteShell>
  );
}

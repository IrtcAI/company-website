import type { Metadata } from "next";
import { CulturePage } from "@/components/brand-pages";
import { ContactCta } from "@/components/contact-cta";
import { SiteShell } from "@/components/site-shell";
import { cultureCopy } from "@/lib/copy/culture";
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
  return pageMetadata({ locale, page: "culture", ...pageCopy.culture[locale] });
}

export default async function CultureRoute({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  const copy = cultureCopy[locale];
  const path = pagePath(locale, "culture");

  const data = graph(
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#page`,
      url: absoluteUrl(path),
      name: pageCopy.culture[locale].title,
      about: { "@id": ORGANIZATION_ID },
    },
    organization(locale, pageCopy.culture[locale].description),
    breadcrumbs([
      { name: copy.breadcrumbHome, path: pagePath(locale, "home") },
      { name: copy.breadcrumbCurrent, path },
    ]),
  );

  return (
    <SiteShell locale={locale} page="culture">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(data)}
      />
      <CulturePage locale={locale} />
      <ContactCta locale={locale} />
    </SiteShell>
  );
}

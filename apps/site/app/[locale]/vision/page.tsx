import type { Metadata } from "next";
import { VisionPage } from "@/components/brand-pages";
import { ContactCta } from "@/components/contact-cta";
import { SiteShell } from "@/components/site-shell";
import { visionCopy } from "@/lib/copy/culture";
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
  return pageMetadata({ locale, page: "vision", ...pageCopy.vision[locale] });
}

export default async function VisionRoute({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  const copy = visionCopy[locale];
  const path = pagePath(locale, "vision");

  const data = graph(
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#page`,
      url: absoluteUrl(path),
      name: pageCopy.vision[locale].title,
      about: { "@id": ORGANIZATION_ID },
    },
    organization(locale, pageCopy.vision[locale].description),
    breadcrumbs([
      { name: copy.breadcrumbHome, path: pagePath(locale, "home") },
      { name: copy.breadcrumbCurrent, path },
    ]),
  );

  return (
    <SiteShell locale={locale} page="vision">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(data)}
      />
      <VisionPage locale={locale} />
      <ContactCta locale={locale} />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { FounderProfile } from "@/components/founder-profile";
import { SiteShell } from "@/components/site-shell";
import { founderCopy } from "@/lib/copy/founder";
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
  FOUNDER_ID,
  founder,
  graph,
  jsonLd,
} from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  return pageMetadata({ locale, page: "founder", ...pageCopy.founder[locale] });
}

export default async function FounderPage({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  const copy = founderCopy[locale];
  const path = pagePath(locale, "founder");

  const data = graph(
    {
      "@type": "ProfilePage",
      "@id": `${absoluteUrl(path)}#profile`,
      url: absoluteUrl(path),
      name: pageCopy.founder[locale].title,
      mainEntity: { "@id": FOUNDER_ID },
    },
    founder(locale, copy.role),
    breadcrumbs([
      { name: copy.breadcrumbHome, path: pagePath(locale, "home") },
      { name: copy.breadcrumbCurrent, path },
    ]),
  );

  return (
    <SiteShell locale={locale} page="founder">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(data)}
      />
      <FounderProfile locale={locale} />
      <ContactCta locale={locale} />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
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
} from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  return pageMetadata({ locale, page: "contact", ...pageCopy.contact[locale] });
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  return (
    <SiteShell locale={locale} page="contact">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          graph(
            {
              "@type": "ContactPage",
              url: absoluteUrl(pagePath(locale, "contact")),
              name: pageCopy.contact[locale].title,
              description: pageCopy.contact[locale].description,
              inLanguage: locale,
              about: { "@id": ORGANIZATION_ID },
            },
            breadcrumbs([
              { name: "IRTC", path: pagePath(locale, "home") },
              {
                name: pageCopy.contact[locale].title.split(" | ")[0],
                path: pagePath(locale, "contact"),
              },
            ]),
          ),
        )}
      />
      <ContactForm locale={locale} />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { pageCopy } from "@/lib/copy/pages";
import {
  LocaleParams,
  localeStaticParams,
  resolveLocaleParam,
} from "@/lib/locale-params";
import { pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

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
    page: "services",
    ...pageCopy.services[locale],
  });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  return (
    <SiteShell locale={locale} page="services">
      <section className="page-intro section-pad">
        <h1>{pageCopy.services[locale].title}</h1>
        <p>{pageCopy.services[locale].description}</p>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={pagePath(locale, "services", service.copy[locale].slug)}
              >
                {service.copy[locale].title}
              </Link>
              <p>{service.copy[locale].summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}

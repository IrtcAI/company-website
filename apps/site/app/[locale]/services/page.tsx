import type { Metadata } from "next";
import { ContactCta } from "@/components/contact-cta";
import { ServiceBreadcrumb } from "@/components/service-breadcrumb";
import { ServiceCard } from "@/components/service-card";
import { ServiceTechTokens } from "@/components/service-tech-tokens";
import { SiteShell } from "@/components/site-shell";
import { pageCopy } from "@/lib/copy/pages";
import { servicesPageCopy } from "@/lib/copy/services-page";
import {
  LocaleParams,
  localeStaticParams,
  resolveLocaleParam,
} from "@/lib/locale-params";
import { absoluteUrl, pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { breadcrumbs, graph, jsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

const commonTechnologies = [
  "Node.js",
  "Next.js",
  "React",
  "PostgreSQL",
  "Redis",
  "AWS",
  "GitHub",
  "NestJS",
  "TypeScript",
  "Python",
];

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
  const copy = servicesPageCopy[locale];
  const home = pagePath(locale, "home");
  const servicesHref = pagePath(locale, "services");

  const structuredData = graph(
    {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.copy[locale].title,
        url: absoluteUrl(
          pagePath(locale, "services", service.copy[locale].slug),
        ),
      })),
    },
    breadcrumbs([
      { name: copy.breadcrumbHome, path: home },
      { name: copy.breadcrumbServices, path: servicesHref },
    ]),
  );

  return (
    <SiteShell locale={locale} page="services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <section className="page-intro services-page-intro section-pad">
        <ServiceBreadcrumb
          items={[
            { label: copy.breadcrumbHome, href: home },
            { label: copy.breadcrumbServices },
          ]}
        />
        <h1>{pageCopy.services[locale].heading}</h1>
        <p>{copy.intro}</p>
      </section>
      <section className="service-grid-section section-pad">
        <h2>{copy.gridTitle}</h2>
        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
              cta={copy.cardCta}
            />
          ))}
        </div>
      </section>
      <section className="service-tech-note section-pad">
        <h2>{copy.techNoteTitle}</h2>
        <p>{copy.techNoteText}</p>
        <ServiceTechTokens
          technologies={commonTechnologies}
          label={copy.techTitle}
        />
      </section>
      <ContactCta locale={locale} />
    </SiteShell>
  );
}

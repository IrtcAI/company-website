import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { ServiceBreadcrumb } from "@/components/service-breadcrumb";
import { ServiceCard } from "@/components/service-card";
import {
  ServiceDeliverables,
  ServiceHow,
  ServiceMeasure,
  ServiceStack,
  ServiceSymptoms,
} from "@/components/service-blocks";
import { ServiceFaq } from "@/components/service-faq";
import { ServiceVisual } from "@/components/service-visual";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
import { servicesPageCopy } from "@/lib/copy/services-page";
import { resolveLocaleParam } from "@/lib/locale-params";
import { absoluteUrl, pageAlternates, pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import {
  pillarNames,
  relatedServices,
  serviceBySlug,
  serviceSlugs,
  services,
} from "@/lib/services";
import {
  breadcrumbs,
  faq,
  graph,
  jsonLd,
  ORGANIZATION_ID,
} from "@/lib/structured-data";

type Params = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.flatMap((service) =>
    (["pt-BR", "en", "es"] as const).map((locale) => ({
      locale,
      slug: service.copy[locale].slug,
    })),
  );
}

async function resolve(params: Params["params"]) {
  const locale = await resolveLocaleParam(params);
  const service = serviceBySlug(locale, (await params).slug);
  if (!service) notFound();
  return { locale, service };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, service } = await resolve(params);
  const copy = service.copy[locale];
  return pageMetadata({
    locale,
    page: "services",
    title: `${copy.title} | IRTC`,
    description: copy.summary,
    slugs: serviceSlugs(service),
  });
}

export default async function ServicePage({ params }: Params) {
  const { locale, service } = await resolve(params);
  const copy = service.copy[locale];
  const pageCopy = servicesPageCopy[locale];
  const siteCopy = content[locale];
  const home = pagePath(locale, "home");
  const servicesHref = pagePath(locale, "services");
  const path = pagePath(locale, "services", copy.slug);
  const related = relatedServices(service);

  const structuredData = graph(
    {
      "@type": "Service",
      name: copy.title,
      description: copy.summary,
      serviceType: copy.title,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: "Worldwide",
      url: absoluteUrl(path),
    },
    faq(copy.faq),
    breadcrumbs([
      { name: pageCopy.breadcrumbHome, path: home },
      { name: pageCopy.breadcrumbServices, path: servicesHref },
      { name: copy.title, path },
    ]),
  );

  return (
    <SiteShell
      locale={locale}
      page="services"
      alternates={pageAlternates("services", serviceSlugs(service))}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <div className="sp" data-accent={service.accent}>
        <section className="page-intro services-page-intro service-hero sp-hero-section section-pad">
          <ServiceBreadcrumb
            items={[
              { label: pageCopy.breadcrumbHome, href: home },
              { label: pageCopy.breadcrumbServices, href: servicesHref },
              { label: copy.title },
            ]}
          />
          <div className="sp-hero">
            <div className="sp-hero-copy">
              <p className="service-pillar-tag">
                <span>{pageCopy.pillarLabel}</span>
                <strong>{pillarNames[service.pillar]}</strong>
                {service.supportPillars ? (
                  <>
                    <span>{pageCopy.supportPillarLabel}</span>
                    <strong>
                      {service.supportPillars
                        .map((pillar) => pillarNames[pillar])
                        .join(", ")}
                    </strong>
                  </>
                ) : null}
              </p>
              <h1>{copy.title}</h1>
              <p className="sp-intro">{copy.intro}</p>
              <Link
                href={`${pagePath(locale, "contact")}?servico=${service.id}`}
                className="pill-link"
              >
                {siteCopy.talk}
                <span>
                  <MessageCircle aria-hidden="true" />
                </span>
              </Link>
            </div>
            <ServiceVisual id={service.id} accent={service.accent} />
          </div>
        </section>

        <ServiceSymptoms title={pageCopy.whenTitle} items={copy.problems} />
        <ServiceDeliverables
          title={pageCopy.whatTitle}
          items={copy.deliverables}
          layout={service.deliverablesLayout}
        />
        <ServiceMeasure
          title={pageCopy.measureTitle}
          items={copy.measure}
          note={pageCopy.measureNote}
          from={pageCopy.measureFrom}
          to={pageCopy.measureTo}
        />
        <ServiceStack
          title={pageCopy.stackTitle}
          ids={service.stack}
          labels={pageCopy.stack}
          note={pageCopy.stackNote}
        />
        <ServiceHow
          title={pageCopy.howTitle}
          points={siteCopy.manifesto.points}
        />
        <ServiceFaq title={pageCopy.faqTitle} items={copy.faq} />

        <section className="sp-section sp-related section-pad">
          <h2>{pageCopy.relatedTitle}</h2>
          <div className="service-grid">
            {related.map((item) => (
              <ServiceCard
                key={item.id}
                service={item}
                locale={locale}
                cta={pageCopy.cardCta}
              />
            ))}
          </div>
        </section>
      </div>

      <ContactCta locale={locale} service={service.id} />
    </SiteShell>
  );
}

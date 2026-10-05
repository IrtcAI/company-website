import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { ServiceBreadcrumb } from "@/components/service-breadcrumb";
import { ServiceCard } from "@/components/service-card";
import { ServiceFaq } from "@/components/service-faq";
import { ServiceTechTokens } from "@/components/service-tech-tokens";
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
      <section className="page-intro services-page-intro service-hero section-pad">
        <ServiceBreadcrumb
          items={[
            { label: pageCopy.breadcrumbHome, href: home },
            { label: pageCopy.breadcrumbServices, href: servicesHref },
            { label: copy.title },
          ]}
        />
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
        <p>{copy.intro}</p>
        <Link
          href={`${pagePath(locale, "contact")}?servico=${service.id}`}
          className="pill-link"
        >
          {siteCopy.talk}
          <span>
            <MessageCircle aria-hidden="true" />
          </span>
        </Link>
      </section>

      <section className="service-section section-pad">
        <h2>{pageCopy.whenTitle}</h2>
        <ul className="service-list">
          {copy.problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      </section>

      <section className="service-section section-pad">
        <h2>{pageCopy.whatTitle}</h2>
        <ul className="service-list">
          {copy.deliverables.map((deliverable) => (
            <li key={deliverable}>{deliverable}</li>
          ))}
        </ul>
      </section>

      <section className="service-section section-pad">
        <h2>{pageCopy.measureTitle}</h2>
        <ul className="service-list">
          {copy.measure.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="service-measure-note">{pageCopy.measureNote}</p>
      </section>

      <section className="service-section section-pad">
        <h2>{pageCopy.howTitle}</h2>
        <div className="service-how-grid">
          {siteCopy.manifesto.points.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-section section-pad">
        <h2>{pageCopy.techTitle}</h2>
        <ServiceTechTokens
          technologies={service.technologies}
          label={pageCopy.techTitle}
        />
      </section>

      <section className="service-section section-pad">
        <h2>{pageCopy.faqTitle}</h2>
        <ServiceFaq items={copy.faq} />
      </section>

      <section className="service-section service-related section-pad">
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

      <ContactCta locale={locale} service={service.id} />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { resolveLocaleParam } from "@/lib/locale-params";
import { pageAlternates } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, services, serviceSlugs } from "@/lib/services";

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
  return (
    <SiteShell
      locale={locale}
      page="services"
      alternates={pageAlternates("services", serviceSlugs(service))}
    >
      <section className="page-intro section-pad">
        <h1>{copy.title}</h1>
        <p>{copy.summary}</p>
      </section>
    </SiteShell>
  );
}

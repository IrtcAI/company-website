import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { pageCopy } from "@/lib/copy/pages";
import {
  LocaleParams,
  localeStaticParams,
  resolveLocaleParam,
} from "@/lib/locale-params";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  return pageMetadata({ locale, page: "about", ...pageCopy.about[locale] });
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  return (
    <SiteShell locale={locale} page="about">
      <section className="page-intro section-pad">
        <h1>{pageCopy.about[locale].title}</h1>
        <p>{pageCopy.about[locale].description}</p>
      </section>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
  return pageMetadata({ locale, page: "contact", ...pageCopy.contact[locale] });
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocaleParam(params);
  return (
    <SiteShell locale={locale} page="contact">
      <ContactForm locale={locale} />
    </SiteShell>
  );
}

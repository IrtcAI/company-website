import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteExperience } from "@/components/site-experience";
import { content } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") return {};
  const title =
    locale === "en"
      ? "IRTC | Software engineering, AI and data"
      : "IRTC | Ingeniería de software, IA y datos";
  return {
    title,
    description: content[locale].hero.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/", en: "/en", es: "/es", "x-default": "/" },
    },
    openGraph: {
      title,
      description: content[locale].hero.description,
      locale: locale === "en" ? "en_US" : "es_ES",
      url: `https://irtc.com.br/${locale}`,
    },
  };
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  return <SiteExperience locale={locale} />;
}

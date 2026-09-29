import { notFound } from "next/navigation";
import type { Locale } from "./content";
import { isLocale } from "./locale";
import { locales } from "./routes";

export type LocaleParams = { params: Promise<{ locale: string }> };

export function localeStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function resolveLocaleParam(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

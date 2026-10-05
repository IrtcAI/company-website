import type { Locale } from "./content";

export type Stat = {
  id: string;
  value: number;
  decimals?: number;
  prefix: Record<Locale, string>;
  suffix: Record<Locale, string>;
  label: Record<Locale, string>;
};

export const statsHeading: Record<Locale, string> = {
  "pt-BR": "A IRTC em números",
  en: "IRTC in numbers",
  es: "IRTC en números",
};

// Empty until a figure has an approved source and method; the section renders nothing without items.
export const stats: Stat[] = [];

export function formatStat(stat: Stat, locale: Locale, current = stat.value) {
  const number = current.toFixed(stat.decimals ?? 0);
  const localized = locale === "en" ? number : number.replace(".", ",");
  return `${stat.prefix[locale]}${localized}${stat.suffix[locale]}`;
}

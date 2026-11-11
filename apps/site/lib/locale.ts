import type { Locale } from "./content";

export function isLocale(value: unknown): value is Locale {
  return value === "pt-BR" || value === "en" || value === "es";
}

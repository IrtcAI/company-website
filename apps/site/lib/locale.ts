import type { Locale } from "./content";

export function isLocale(value: unknown): value is Locale {
  return value === "pt-BR" || value === "en" || value === "es";
}

export function resolveLocale(
  saved?: string,
  country?: string | null,
  acceptLanguage = "",
): Locale {
  if (isLocale(saved)) return saved;

  if (country === "BR" || country === "PT") return "pt-BR";
  if (
    country &&
    [
      "ES",
      "MX",
      "AR",
      "CL",
      "CO",
      "PE",
      "UY",
      "PY",
      "BO",
      "EC",
      "VE",
      "CR",
      "PA",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
      "CU",
    ].includes(country)
  )
    return "es";
  if (country && ["US", "GB", "CA", "AU", "NZ", "IE"].includes(country))
    return "en";

  const languages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag, quality] = entry.trim().split(";q=");
      return { tag: tag.toLowerCase(), weight: quality ? Number(quality) : 1 };
    })
    .filter(({ weight }) => Number.isFinite(weight) && weight > 0)
    .sort((a, b) => b.weight - a.weight);
  for (const { tag } of languages) {
    if (tag === "pt" || tag.startsWith("pt-")) return "pt-BR";
    if (tag === "es" || tag.startsWith("es-")) return "es";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return "pt-BR";
}

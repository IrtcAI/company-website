import type { Locale } from "./content";

export const SITE_URL = "https://irtc.com.br";

export const locales: Locale[] = ["pt-BR", "en", "es"];

export type Page =
  | "home"
  | "services"
  | "about"
  | "founder"
  | "culture"
  | "mission"
  | "vision"
  | "contact";

const segments: Record<Locale, Record<Exclude<Page, "home">, string>> = {
  "pt-BR": {
    services: "servicos",
    about: "sobre",
    founder: "fundador",
    culture: "cultura",
    mission: "missao",
    vision: "visao",
    contact: "contato",
  },
  en: {
    services: "services",
    about: "about",
    founder: "founder",
    culture: "culture",
    mission: "mission",
    vision: "vision",
    contact: "contact",
  },
  es: {
    services: "servicios",
    about: "nosotros",
    founder: "fundador",
    culture: "cultura",
    mission: "mision",
    vision: "vision",
    contact: "contacto",
  },
};

export function localePrefix(locale: Locale) {
  return locale === "pt-BR" ? "" : `/${locale}`;
}

export function pagePath(locale: Locale, page: Page, slug?: string) {
  const prefix = localePrefix(locale);
  if (page === "home") return prefix || "/";

  const path = `${prefix}/${segments[locale][page]}`;
  return slug ? `${path}/${slug}` : path;
}

export function sectionPath(locale: Locale, id: string) {
  return `${localePrefix(locale)}/#${id}`;
}

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function pageAlternates(
  page: Page,
  slugs?: Partial<Record<Locale, string>>,
) {
  const path = (locale: Locale) => pagePath(locale, page, slugs?.[locale]);
  return {
    "pt-BR": path("pt-BR"),
    en: path("en"),
    es: path("es"),
    "x-default": path("pt-BR"),
  };
}

function internalRoutes() {
  return locales.flatMap((locale) =>
    (Object.keys(segments[locale]) as Exclude<Page, "home">[]).map((page) => ({
      localized: pagePath(locale, page),
      internal: `/${locale}/${page}`,
    })),
  );
}

export function localizedRewrites() {
  return internalRoutes()
    .filter(({ localized, internal }) => localized !== internal)
    .flatMap(({ localized, internal }) => [
      { source: localized, destination: internal },
      { source: `${localized}/:slug`, destination: `${internal}/:slug` },
    ]);
}

export function internalRedirects() {
  return internalRoutes()
    .filter(({ localized, internal }) => localized !== internal)
    .flatMap(({ localized, internal }) => [
      { source: internal, destination: localized, permanent: true },
      {
        source: `${internal}/:slug`,
        destination: `${localized}/:slug`,
        permanent: true,
      },
    ]);
}

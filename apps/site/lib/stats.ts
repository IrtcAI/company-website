import type { Locale } from "./content";

export type Stat = {
  id: "years" | "projects" | "reach" | "rating";
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

// Every figure except the years is a placeholder pending confirmation.
export const stats: Stat[] = [
  {
    id: "years",
    value: 8,
    prefix: { "pt-BR": "+", en: "+", es: "+" },
    suffix: { "pt-BR": "", en: "", es: "" },
    label: {
      "pt-BR": "anos construindo software",
      en: "years building software",
      es: "años construyendo software",
    },
  },
  {
    id: "projects",
    value: 30,
    prefix: { "pt-BR": "+", en: "+", es: "+" },
    suffix: { "pt-BR": "", en: "", es: "" },
    label: {
      "pt-BR": "projetos entregues",
      en: "projects delivered",
      es: "proyectos entregados",
    },
  },
  {
    id: "reach",
    value: 1,
    prefix: { "pt-BR": "+", en: "", es: "+" },
    suffix: { "pt-BR": " mi", en: "M+", es: " mi" },
    label: {
      "pt-BR": "pessoas usando sistemas que ajudamos a construir",
      en: "people using systems we helped build",
      es: "personas que usan sistemas que ayudamos a construir",
    },
  },
  {
    id: "rating",
    value: 4.9,
    decimals: 1,
    prefix: { "pt-BR": "", en: "", es: "" },
    suffix: { "pt-BR": "/5", en: "/5", es: "/5" },
    label: {
      "pt-BR": "avaliação média dos clientes",
      en: "average client rating",
      es: "valoración media de los clientes",
    },
  },
];

export function formatStat(stat: Stat, locale: Locale, current = stat.value) {
  const number = current.toFixed(stat.decimals ?? 0);
  const localized = locale === "en" ? number : number.replace(".", ",");
  return `${stat.prefix[locale]}${localized}${stat.suffix[locale]}`;
}

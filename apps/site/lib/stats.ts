import type { Locale } from "./content";

export type Stat = {
  id: "years" | "projects" | "reach" | "delivery";
  value: number;
  prefix: Record<Locale, string>;
  suffix: Record<Locale, string>;
  label: Record<Locale, string>;
};

export const statsHeading: Record<Locale, string> = {
  "pt-BR": "A IRTC em números",
  en: "IRTC in numbers",
  es: "IRTC en números",
};

// Placeholder figures pending confirmation, except the 40% project metric.
export const stats: Stat[] = [
  {
    id: "years",
    value: 10,
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
    id: "delivery",
    value: 40,
    prefix: { "pt-BR": "", en: "", es: "" },
    suffix: { "pt-BR": "%", en: "%", es: "%" },
    label: {
      "pt-BR": "mais velocidade de entrega num marketplace",
      en: "faster delivery on a marketplace project",
      es: "más velocidad de entrega en un marketplace",
    },
  },
];

export function formatStat(stat: Stat, locale: Locale, current = stat.value) {
  return `${stat.prefix[locale]}${current}${stat.suffix[locale]}`;
}

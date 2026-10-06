import type { Locale } from "./content";

export const company = {
  name: "IRTC",
  email: "contato@irtc.com.br",
  founder: {
    name: "Iago Rodrigues",
    linkedin: "https://www.linkedin.com/in/iago-rodrigues/",
  },
  address: {
    locality: "Belém",
    region: "PA",
    country: "BR",
  },
  opens: "08:00",
  closes: "18:00",
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/ir-tec",
      handle: "company/ir-tec",
    },
  ],
};

const countryName: Record<Locale, string> = {
  "pt-BR": "Brasil",
  en: "Brazil",
  es: "Brasil",
};

export function addressLines(locale: Locale) {
  const { locality, region } = company.address;
  return [`${locality} · ${region} · ${countryName[locale]}`];
}

const hours: Record<Locale, { weekdays: string; weekend: string }> = {
  "pt-BR": {
    weekdays: "Seg a sex: 08:00 às 18:00",
    weekend: "Sáb e dom: fechado",
  },
  en: { weekdays: "Mon to Fri: 8 AM to 6 PM", weekend: "Sat and Sun: closed" },
  es: { weekdays: "Lun a vie: 08:00 a 18:00", weekend: "Sáb y dom: cerrado" },
};

export function openingHours(locale: Locale) {
  return hours[locale];
}

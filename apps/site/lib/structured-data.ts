import type { Locale } from "./content";
import { company } from "./company";
import { absoluteUrl, pagePath, SITE_URL } from "./routes";
import { pillarNames, pillars } from "./services";

export const SLOGAN = "We engineer what moves your business forward.";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

export function jsonLd(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function organization(locale: Locale, description: string) {
  const { address } = company;
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    email: company.email,
    description,
    slogan: SLOGAN,
    knowsAbout: pillars.map((id) => pillarNames[id]),
    inLanguage: locale,
    founder: { "@id": FOUNDER_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: company.opens,
      closes: company.closes,
    },
    areaServed: "Worldwide",
    availableLanguage: ["pt-BR", "en", "es"],
    sameAs: company.socials.map((social) => social.href),
  };
}

export function founder(locale: Locale, jobTitle: string) {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: company.founder.name,
    jobTitle,
    url: absoluteUrl(pagePath(locale, "founder")),
    image: `${SITE_URL}/founder.webp`,
    worksFor: { "@id": ORGANIZATION_ID },
    sameAs: [company.founder.linkedin],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faq(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

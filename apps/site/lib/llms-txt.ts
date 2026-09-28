import { addressLines, company, openingHours } from "./company";
import { content, type Locale } from "./content";
import { pageCopy } from "./copy/pages";
import { absoluteUrl, locales, pagePath, SITE_URL, type Page } from "./routes";
import {
  serviceSlugs,
  services,
  type Service,
  type ServiceCopy,
} from "./services";

const localeLabel: Record<Locale, string> = {
  "pt-BR": "Portuguese",
  en: "English",
  es: "Spanish",
};

const preferredTechOrder = [
  "TypeScript",
  "JavaScript",
  "Node.js",
  "NestJS",
  "Next.js",
  "React",
  "React Native",
  "Vue.js",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "pgvector",
  "Redis",
  "AWS",
  "GitHub",
];

const capabilities = [
  "AI agents",
  "retrieval-augmented generation (RAG)",
  "agentic pipelines",
  "semantic search",
  "vector databases",
  "ETL/ELT data pipelines",
  "analytics",
  "cloud infrastructure",
  "ERP and CRM systems",
  "APIs",
  "integrations",
  "process automation",
];

function technologies(): string[] {
  const used = new Set(services.flatMap((service) => service.technologies));
  used.add("JavaScript");
  const ordered = preferredTechOrder.filter((tech) => used.has(tech));
  const extra = [...used]
    .filter((tech) => !preferredTechOrder.includes(tech))
    .sort();
  return [...ordered, ...extra];
}

function link(label: string, path: string, summary: string) {
  return `- [${label}](${absoluteUrl(path)}): ${summary}`;
}

function introSection(): string {
  const address = addressLines("en").join(", ");
  const hours = openingHours("en");
  return [
    `Official website: ${SITE_URL}`,
    `Business contact: ${company.email}`,
    `Founder: ${company.founder.name} (${company.founder.linkedin}), whose work includes software architecture, full-stack product development, technical leadership and AI engineering.`,
    `Address: ${address}.`,
    `Business hours: ${hours.weekdays}; ${hours.weekend} (Belém, Brazil time).`,
    `Languages: Brazilian Portuguese (default), English and Spanish.`,
  ].join("\n");
}

function pagesSection(): string {
  const pages: {
    label: string;
    page: Page;
    summary: (locale: Locale) => string;
  }[] = [
    {
      label: "Home",
      page: "home",
      summary: (l) => content[l].hero.description,
    },
    {
      label: "Services",
      page: "services",
      summary: (l) => pageCopy.services[l].description,
    },
    {
      label: "About",
      page: "about",
      summary: (l) => pageCopy.about[l].description,
    },
    {
      label: "Founder",
      page: "founder",
      summary: (l) => pageCopy.founder[l].description,
    },
    {
      label: "Contact",
      page: "contact",
      summary: (l) => pageCopy.contact[l].description,
    },
  ];

  const lines = pages.flatMap(({ label, page, summary }) =>
    locales.map((locale) =>
      link(
        `${label} (${localeLabel[locale]})`,
        pagePath(locale, page),
        summary(locale),
      ),
    ),
  );

  return ["## Pages", "", ...lines].join("\n");
}

function servicesSection(): string {
  const lines = services.map((service) => {
    const copy = service.copy.en;
    return link(
      copy.title,
      pagePath("en", "services", copy.slug),
      copy.summary,
    );
  });

  return [
    "## Services",
    "",
    ...lines,
    "",
    "Each service page above is also published in Portuguese (/servicos/...) and Spanish (/servicios/...); see the services index in each language for the localized links.",
  ].join("\n");
}

function howWeWorkSection(): string {
  return [
    "## How we work",
    "",
    "We understand the client's operation before choosing technology, agree on priorities, deliver in short stages, demonstrate progress and support what we build. Architecture, automated testing and observability are part of the project from the start, and clients talk directly to the people building their system.",
  ].join("\n");
}

function technologiesSection(): string {
  return [
    "## Technologies",
    "",
    `Capabilities include ${capabilities.join(", ")}.`,
    "",
    `Technology choices depend on the project. Our toolkit includes ${technologies().join(", ")}.`,
  ].join("\n");
}

function portfolioSection(): string {
  return [
    "## Portfolio",
    "",
    "Portfolio examples describe engineering contributions involving LeafLink (marketplace, CRM and reporting), Dasa (healthcare integrations, data and field applications), and Perfect Pay (course platform, payments, authentication and backend efficiency). These examples do not claim that IRTC owns each entire platform. Public brand images illustrate the products. Project-specific results are not universal performance guarantees. Testimonials are summaries of recommendations about collaboration and engineering work, not verbatim quotations.",
  ].join("\n");
}

function irisSection(): string {
  return [
    "## Iris",
    "",
    "Iris is the website's assistant. It explains IRTC and helps outline an initial MVP in up to three short points and 250 characters. A draft is a starting point for a conversation, not a technical specification, price quote or delivery commitment. Visitors can also use the contact form, or request to send an approved draft by e-mail. Availability, budgets and schedules are confirmed directly with IRTC.",
  ].join("\n");
}

function contactSection(): string {
  const lines = locales.map((locale) =>
    link(
      `Contact (${localeLabel[locale]})`,
      pagePath(locale, "contact"),
      pageCopy.contact[locale].description,
    ),
  );

  return ["## Contact", "", ...lines, "", `Email: ${company.email}`].join("\n");
}

function discoverySection(): string {
  return [
    "## Discovery",
    "",
    link(
      "Public sitemap",
      "/sitemap.xml",
      "Indexable website routes and language alternatives.",
    ),
    link(
      "Crawler policy",
      "/robots.txt",
      "Public crawling rules; API endpoints are not content sources.",
    ),
  ].join("\n");
}

function optionalSection(): string {
  return [
    "## Optional",
    "",
    `- [Founder professional profile](${company.founder.linkedin}): Public professional background of ${company.founder.name}. This is a personal profile, not a company social account.`,
  ].join("\n");
}

export function buildLlmsTxt(): string {
  return [
    "# IRTC",
    "",
    "> IRTC is a software factory based in Belém, Pará, Brazil. We build custom software, websites, mobile apps, integrations, automations, data systems and applied AI solutions. Our public website is available in Brazilian Portuguese, English and Spanish, with a dedicated page per language for each topic below.",
    "",
    introSection(),
    "",
    pagesSection(),
    "",
    servicesSection(),
    "",
    howWeWorkSection(),
    "",
    technologiesSection(),
    "",
    portfolioSection(),
    "",
    irisSection(),
    "",
    contactSection(),
    "",
    discoverySection(),
    "",
    optionalSection(),
    "",
  ].join("\n");
}

function serviceDetailSection(service: Service): string {
  const copy = service.copy.en as ServiceCopy & {
    intro?: string;
    deliverables?: string[];
    faq?: { question: string; answer: string }[];
  };
  const url = absoluteUrl(pagePath("en", "services", copy.slug));
  const lines = [
    `### ${copy.title}`,
    "",
    `${url}`,
    "",
    copy.intro ?? copy.summary,
  ];

  if (copy.deliverables?.length) {
    lines.push("", "Deliverables:");
    lines.push(...copy.deliverables.map((item) => `- ${item}`));
  }

  if (copy.faq?.length) {
    lines.push("", "FAQ:");
    copy.faq.forEach((item) => lines.push(`- ${item.question} ${item.answer}`));
  }

  lines.push("", `Technologies: ${service.technologies.join(", ")}.`);

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  return [
    "# IRTC",
    "",
    "> Full reference version of /llms.txt, with expanded detail for every service.",
    "",
    introSection(),
    "",
    pagesSection(),
    "",
    "## Services (full detail)",
    "",
    ...services.map(serviceDetailSection).flatMap((section) => [section, ""]),
    howWeWorkSection(),
    "",
    technologiesSection(),
    "",
    portfolioSection(),
    "",
    irisSection(),
    "",
    contactSection(),
    "",
    discoverySection(),
    "",
    optionalSection(),
    "",
  ].join("\n");
}

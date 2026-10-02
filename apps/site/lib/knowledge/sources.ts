import { addressLines, company, openingHours } from "../company";
import { content, projectBrands, type Locale } from "../content";
import { aboutCopy } from "../copy/about";
import { founderCopy } from "../copy/founder";
import { technologies } from "../llms-txt";
import { locales, pagePath, sectionPath } from "../routes";
import { services, type ServiceId } from "../services";
import { formatStat, stats } from "../stats";

export type KnowledgeChunk = {
  id: string;
  locale: Locale;
  source: string;
  href: string;
  serviceId?: ServiceId;
  title: string;
  text: string;
};

export const CONTACT_CHUNK_ID = "company:contact";

const PROJECTS_SECTION_ID = "projetos";

const yearsStat = stats.find((stat) => stat.id === "years")!;

const overviewCopy: Record<
  Locale,
  {
    company: string;
    services: string;
    approachLabel: string;
    approach: string;
    capabilitiesLabel: string;
    capabilities: string;
    technologiesLabel: string;
  }
> = {
  "pt-BR": {
    company:
      "IRTC é uma empresa de engenharia de software com sede em Belém, Pará, Brasil.",
    services: "Serviços",
    approachLabel: "Abordagem",
    approach:
      "Entendemos a operação do cliente antes de escolher a tecnologia, combinamos prioridades, entregamos em etapas curtas, demonstramos o progresso e damos suporte ao que construímos. A qualidade inclui arquitetura, testes automatizados, observabilidade e manutenibilidade.",
    capabilitiesLabel: "Capacidades",
    capabilities:
      "plataformas SaaS, portais web, aplicativos móveis, sistemas ERP e CRM, APIs REST, integrações, automação de processos, agentes de IA, RAG, busca semântica, bancos de dados vetoriais, pipelines de dados ETL/ELT, analytics e infraestrutura em nuvem",
    technologiesLabel: "Tecnologias usadas conforme o projeto",
  },
  en: {
    company:
      "IRTC is a software engineering company based in Belém, Pará, Brazil.",
    services: "Services",
    approachLabel: "Approach",
    approach:
      "We understand the client's operation before choosing technology, agree on priorities, deliver in short stages, demonstrate progress, and support what we build. Quality includes architecture, automated testing, observability and maintainability.",
    capabilitiesLabel: "Capabilities",
    capabilities:
      "SaaS platforms, web portals, mobile apps, ERP and CRM systems, REST APIs, integrations, process automation, AI agents, RAG, semantic search, vector databases, ETL/ELT data pipelines, analytics and cloud infrastructure",
    technologiesLabel: "Technologies used depending on the project",
  },
  es: {
    company:
      "IRTC es una empresa de ingeniería de software con sede en Belém, Pará, Brasil.",
    services: "Servicios",
    approachLabel: "Enfoque",
    approach:
      "Entendemos la operación del cliente antes de elegir la tecnología, acordamos prioridades, entregamos en etapas cortas, mostramos el progreso y damos soporte a lo que construimos. La calidad incluye arquitectura, pruebas automatizadas, observabilidad y mantenibilidad.",
    capabilitiesLabel: "Capacidades",
    capabilities:
      "plataformas SaaS, portales web, aplicaciones móviles, sistemas ERP y CRM, APIs REST, integraciones, automatización de procesos, agentes de IA, RAG, búsqueda semántica, bases de datos vectoriales, pipelines de datos ETL/ELT, analítica e infraestructura en la nube",
    technologiesLabel: "Tecnologías usadas según el proyecto",
  },
};

const contactCopy: Record<
  Locale,
  {
    title: string;
    address: string;
    hours: string;
    email: string;
    page: string;
    founder: string;
  }
> = {
  "pt-BR": {
    title: "Contato da IRTC",
    address: "Endereço",
    hours: "Horário de atendimento",
    email: "E-mail",
    page: "Página de contato",
    founder: "Fundador",
  },
  en: {
    title: "IRTC contact",
    address: "Address",
    hours: "Business hours",
    email: "Email",
    page: "Contact page",
    founder: "Founder",
  },
  es: {
    title: "Contacto de IRTC",
    address: "Dirección",
    hours: "Horario de atención",
    email: "Correo electrónico",
    page: "Página de contacto",
    founder: "Fundador",
  },
};

const experienceCopy: Record<
  Locale,
  { title: string; text: (value: string, label: string) => string }
> = {
  "pt-BR": {
    title: "Experiência da IRTC",
    text: (value, label) => `IRTC tem ${value} ${label}.`,
  },
  en: {
    title: "IRTC experience",
    text: (value, label) => `IRTC has ${value} ${label}.`,
  },
  es: {
    title: "Experiencia de IRTC",
    text: (value, label) => `IRTC tiene ${value} ${label}.`,
  },
};

const serviceLabels: Record<
  Locale,
  { problems: string; deliverables: string; faq: string; technologies: string }
> = {
  "pt-BR": {
    problems: "problemas",
    deliverables: "entregáveis",
    faq: "Perguntas frequentes",
    technologies: "Tecnologias",
  },
  en: {
    problems: "problems",
    deliverables: "deliverables",
    faq: "FAQ",
    technologies: "Technologies",
  },
  es: {
    problems: "problemas",
    deliverables: "entregables",
    faq: "Preguntas frecuentes",
    technologies: "Tecnologías",
  },
};

const projectLabels: Record<
  Locale,
  { result: string; technologies: string; caveat: string }
> = {
  "pt-BR": {
    result: "Resultado",
    technologies: "Tecnologias",
    caveat:
      "A IRTC contribuiu com engenharia neste projeto; não criamos nem somos donos de toda a plataforma, e resultados de projeto dependem do contexto e não são garantia.",
  },
  en: {
    result: "Result",
    technologies: "Technologies",
    caveat:
      "IRTC contributed engineering to this project; we did not create or own the entire platform, and project results depend on context and are not guarantees.",
  },
  es: {
    result: "Resultado",
    technologies: "Tecnologías",
    caveat:
      "IRTC contribuyó con ingeniería a este proyecto; no creamos ni somos dueños de toda la plataforma, y los resultados del proyecto dependen del contexto y no son una garantía.",
  },
};

function projectSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function companyChunks(locale: Locale): KnowledgeChunk[] {
  const hours = openingHours(locale);
  const overview = overviewCopy[locale];
  const contactLabels = contactCopy[locale];
  const experience = experienceCopy[locale];

  return [
    {
      id: CONTACT_CHUNK_ID,
      locale,
      source: "lib/company.ts",
      href: pagePath(locale, "contact"),
      title: contactLabels.title,
      text: [
        `${company.name}.`,
        `${contactLabels.address}: ${addressLines(locale).join(", ")}.`,
        `${contactLabels.hours}: ${hours.weekdays}; ${hours.weekend}.`,
        `${contactLabels.email}: ${company.email}.`,
        `${contactLabels.page}: ${pagePath(locale, "contact")}.`,
        `${contactLabels.founder}: ${company.founder.name}.`,
      ].join(" "),
    },
    {
      id: "company:overview",
      locale,
      source: "lib/iris-policy.ts",
      href: pagePath(locale, "services"),
      title: overview.services,
      text: [
        overview.company,
        `${overview.services}: ${services.map((service) => service.copy[locale].title).join(", ")}.`,
        `${overview.approachLabel}: ${overview.approach}`,
        `${overview.capabilitiesLabel}: ${overview.capabilities}.`,
        `${overview.technologiesLabel}: ${technologies().join(", ")}.`,
      ].join(" "),
    },
    {
      id: "company:experience",
      locale,
      source: "lib/stats.ts",
      href: pagePath(locale, "home"),
      title: experience.title,
      text: experience.text(
        formatStat(yearsStat, locale),
        yearsStat.label[locale],
      ),
    },
  ];
}

function aboutChunks(locale: Locale): KnowledgeChunk[] {
  const copy = aboutCopy[locale];
  const href = pagePath(locale, "about");

  return [
    {
      id: "about:intro",
      locale,
      source: "lib/copy/about.ts",
      href,
      title: copy.introTitle,
      text: copy.introText,
    },
    {
      id: "about:vision",
      locale,
      source: "lib/content.ts",
      href,
      title: copy.visionTitle,
      text: `IRTC · ${copy.visionTitle}. ${content[locale].origin.vision}`,
    },
    ...copy.values.map((value, index) => ({
      id: `about:values:${index + 1}`,
      locale,
      source: "lib/copy/about.ts",
      href,
      title: `${copy.valuesTitle} · ${value.title}`,
      text: `IRTC · ${copy.valuesTitle}. ${value.title}: ${value.text}`,
    })),
    {
      id: "about:how-we-work",
      locale,
      source: "lib/copy/about.ts",
      href,
      title: copy.howTitle,
      text: `IRTC · ${copy.howTitle}. ${copy.howIntro} ${copy.steps.map((step, index) => `${index + 1}. ${step.title}: ${step.text}`).join(" ")}`,
    },
  ];
}

function founderChunks(locale: Locale): KnowledgeChunk[] {
  const copy = founderCopy[locale];

  return [
    {
      id: "founder:expertise",
      locale,
      source: "lib/copy/founder.ts",
      href: pagePath(locale, "founder"),
      title: copy.role,
      text: `${company.founder.name} · ${copy.eyebrow}. ${copy.role}. ${copy.expertiseIntro} ${copy.expertiseTitle}: ${copy.expertise.join(", ")}.`,
    },
  ];
}

function projectChunks(locale: Locale): KnowledgeChunk[] {
  const labels = projectLabels[locale];
  const cases = content[locale].projects.cases;
  const href = sectionPath(locale, PROJECTS_SECTION_ID);

  return projectBrands.map((brand, index) => {
    const project = cases[index];
    return {
      id: `project:${projectSlug(brand.name)}`,
      locale,
      source: "lib/content.ts",
      href,
      title: `${brand.name} · ${project.title}`,
      text: [
        `IRTC · ${brand.name} (${project.category}).`,
        project.description,
        project.detail,
        `${labels.result}: ${project.result} (${brand.metric}).`,
        `${labels.technologies}: ${brand.stack}.`,
        labels.caveat,
      ].join(" "),
    };
  });
}

function serviceChunks(locale: Locale): KnowledgeChunk[] {
  const labels = serviceLabels[locale];

  return services.flatMap((service) => {
    const copy = service.copy[locale];
    const href = pagePath(locale, "services", copy.slug);
    const base = {
      locale,
      source: "lib/services.ts",
      href,
      serviceId: service.id,
    };

    // Every service's technology list is short (≤5 items), so it folds into
    // the intro chunk instead of needing a chunk of its own.
    const introChunk: KnowledgeChunk = {
      ...base,
      id: `service:${service.id}:intro`,
      title: copy.title,
      text: `${copy.title} (IRTC). ${copy.summary} ${copy.intro} ${labels.technologies}: ${service.technologies.join(", ")}.`,
    };

    const problemsChunk: KnowledgeChunk = {
      ...base,
      id: `service:${service.id}:problems`,
      title: `${copy.title} · ${labels.problems}`,
      text: `${copy.title} (IRTC) · ${labels.problems}: ${copy.problems.join(" ")}`,
    };

    const deliverablesChunk: KnowledgeChunk = {
      ...base,
      id: `service:${service.id}:deliverables`,
      title: `${copy.title} · ${labels.deliverables}`,
      text: `${copy.title} (IRTC) · ${labels.deliverables}: ${copy.deliverables.join(" ")}`,
    };

    const faqChunks: KnowledgeChunk[] = copy.faq.map((item, index) => ({
      ...base,
      id: `service:${service.id}:faq:${index + 1}`,
      title: item.question,
      text: `${copy.title} (IRTC) · ${labels.faq}. ${item.question} ${item.answer}`,
    }));

    return [introChunk, problemsChunk, deliverablesChunk, ...faqChunks];
  });
}

export function knowledgeChunks(locale: Locale): KnowledgeChunk[] {
  return [
    ...companyChunks(locale),
    ...aboutChunks(locale),
    ...founderChunks(locale),
    ...serviceChunks(locale),
    ...projectChunks(locale),
  ];
}

export function allKnowledgeChunks(): KnowledgeChunk[] {
  return locales.flatMap((locale) => knowledgeChunks(locale));
}

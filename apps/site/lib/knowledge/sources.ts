import { addressLines, company, openingHours } from "../company";
import { content, type Locale } from "../content";
import { aboutCopy } from "../copy/about";
import { cultureCopy, missionCopy, visionCopy } from "../copy/culture";
import { founderCopy } from "../copy/founder";
import { servicesPageCopy } from "../copy/services-page";
import { locales, pagePath } from "../routes";
import {
  pillarNames,
  pillars,
  services,
  type PillarId,
  type ServiceId,
} from "../services";
import { SLOGAN } from "../structured-data";

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

const companyLabels: Record<
  Locale,
  {
    pillars: string;
    slogan: string;
    pillarServices: string;
    pillarSupports: string;
    topic: (option: string) => string;
  }
> = {
  "pt-BR": {
    pillars: "Pilares",
    slogan: "Slogan",
    pillarServices: "Serviços do pilar",
    pillarSupports: "Serviços que também contam com este pilar",
    topic: (option) =>
      `No formulário, o assunto é opcional: quem ainda não decidiu pode escolher "${option}".`,
  },
  en: {
    pillars: "Pillars",
    slogan: "Slogan",
    pillarServices: "Services of the pillar",
    pillarSupports: "Services that also rely on this pillar",
    topic: (option) =>
      `In the form the topic is optional: visitors who have not decided can choose "${option}".`,
  },
  es: {
    pillars: "Pilares",
    slogan: "Eslogan",
    pillarServices: "Servicios del pilar",
    pillarSupports: "Servicios que también cuentan con este pilar",
    topic: (option) =>
      `En el formulario el asunto es opcional: quien aún no decidió puede elegir "${option}".`,
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
  }
> = {
  "pt-BR": {
    title: "Contato da IRTC",
    address: "Endereço",
    hours: "Horário de atendimento",
    email: "E-mail",
    page: "Página de contato",
  },
  en: {
    title: "IRTC contact",
    address: "Address",
    hours: "Business hours",
    email: "Email",
    page: "Contact page",
  },
  es: {
    title: "Contacto de IRTC",
    address: "Dirección",
    hours: "Horario de atención",
    email: "Correo electrónico",
    page: "Página de contacto",
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

function serviceTitles(locale: Locale, ids: ServiceId[]) {
  return ids
    .map(
      (id) => services.find((service) => service.id === id)!.copy[locale].title,
    )
    .join(", ");
}

function companyChunks(locale: Locale): KnowledgeChunk[] {
  const hours = openingHours(locale);
  const labels = companyLabels[locale];
  const contactLabels = contactCopy[locale];
  const page = servicesPageCopy[locale];
  const about = aboutCopy[locale];
  const servicesHref = pagePath(locale, "services");

  const pillarChunks = pillars.map((pillar: PillarId) => {
    const own = services
      .filter((service) => service.pillar === pillar)
      .map((service) => service.id);
    const supported = services
      .filter((service) => service.supportPillars?.includes(pillar))
      .map((service) => service.id);

    return {
      id: `company:pillar:${pillar}`,
      locale,
      source: "lib/copy/services-page.ts",
      href: servicesHref,
      title: pillarNames[pillar],
      text: [
        `IRTC · ${pillarNames[pillar]}. ${page.pillarText[pillar]}`,
        `${labels.pillarServices}: ${serviceTitles(locale, own)}.`,
        supported.length
          ? `${labels.pillarSupports}: ${serviceTitles(locale, supported)}.`
          : "",
      ]
        .filter(Boolean)
        .join(" "),
    };
  });

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
        labels.topic(content[locale].contact.serviceUnknown),
      ].join(" "),
    },
    {
      id: "company:overview",
      locale,
      source: "lib/copy/about.ts",
      href: servicesHref,
      title: about.introTitle,
      text: [
        about.introText[0],
        content[locale].hero.description,
        `${labels.slogan}: ${SLOGAN}`,
        `${labels.pillars}: ${pillars.map((pillar) => pillarNames[pillar]).join(", ")}. ${page.continuity.label}: ${page.continuity.name}.`,
      ].join(" "),
    },
    {
      id: "company:origin",
      locale,
      source: "lib/content.ts",
      href: pagePath(locale, "about"),
      title: content[locale].origin.title,
      text: `IRTC · ${content[locale].origin.title} ${content[locale].origin.accent} ${content[locale].origin.body} ${content[locale].origin.vision}`,
    },
    ...pillarChunks,
    {
      id: "company:continuous-engineering",
      locale,
      source: "lib/copy/services-page.ts",
      href: servicesHref,
      title: page.continuity.name,
      text: `IRTC · ${page.continuity.name}. ${page.continuity.text}`,
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
      text: copy.introText.join(" "),
    },
    ...copy.foundations.map((item, index) => ({
      id: `about:foundations:${index + 1}`,
      locale,
      source: "lib/copy/about.ts",
      href,
      title: `${copy.foundationsTitle} · ${item.title}`,
      text: `IRTC · ${item.title}. ${item.text}`,
    })),
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
      text: `IRTC · ${copy.howTitle}. ${copy.howText}`,
    },
  ];
}

function founderChunks(locale: Locale): KnowledgeChunk[] {
  const copy = founderCopy[locale];

  return [
    {
      id: "founder:profile",
      locale,
      source: "lib/copy/founder.ts",
      href: pagePath(locale, "founder"),
      title: copy.role,
      text: `${company.founder.name} · ${copy.eyebrow}. ${copy.role}. ${copy.intro} ${copy.bio.join(" ")} ${copy.expertiseTitle}: ${copy.expertise.join(", ")}.`,
    },
    {
      id: "founder:outside",
      locale,
      source: "lib/copy/founder.ts",
      href: pagePath(locale, "founder"),
      title: copy.outsideTitle,
      text: `${company.founder.name} · ${copy.outsideTitle}. ${copy.outsideFact}`,
    },
  ];
}

function brandPageChunks(locale: Locale): KnowledgeChunk[] {
  const culture = cultureCopy[locale];
  const mission = missionCopy[locale];
  const vision = visionCopy[locale];
  const [purpose, missionText, visionText] = aboutCopy[locale].foundations;
  const base = (page: "culture" | "mission" | "vision") => ({
    locale,
    source: "lib/copy/culture.ts",
    href: pagePath(locale, page),
  });

  return [
    ...culture.practices.map((practice, index) => ({
      ...base("culture"),
      id: `culture:practice:${index + 1}`,
      title: `${culture.breadcrumbCurrent} · ${practice.title}`,
      text: `IRTC · ${culture.practicesTitle}. ${practice.title}: ${practice.text}`,
    })),
    {
      ...base("culture"),
      id: "culture:ai-native",
      title: culture.aiTitle,
      text: `IRTC · ${culture.aiTitle}. ${culture.aiIntro} ${culture.ai.map((item) => `${item.title}: ${item.text}`).join(" ")}`,
    },
    {
      ...base("mission"),
      id: "mission:statement",
      title: mission.breadcrumbCurrent,
      text: `IRTC · ${missionText.title}. ${missionText.text} ${purpose.title}: ${purpose.text} ${mission.verbs.map((verb) => `${verb.title}: ${verb.text}`).join(" ")}`,
    },
    {
      ...base("mission"),
      id: "mission:path",
      title: mission.pathTitle,
      text: `IRTC · ${mission.pathTitle}. ${mission.pathIntro} ${mission.steps.map((step, index) => `${index + 1}. ${step.title}: ${step.text}`).join(" ")}`,
    },
    {
      ...base("vision"),
      id: "vision:statement",
      title: vision.breadcrumbCurrent,
      text: `IRTC · ${visionText.title}. ${visionText.text} ${vision.parts.map((part) => `${part.title}: ${part.text}`).join(" ")}`,
    },
  ];
}

function serviceChunks(locale: Locale): KnowledgeChunk[] {
  const labels = serviceLabels[locale];
  const page = servicesPageCopy[locale];

  return services.flatMap((service) => {
    const copy = service.copy[locale];
    const href = pagePath(locale, "services", copy.slug);
    const base = {
      locale,
      source: "lib/services.ts",
      href,
      serviceId: service.id,
    };

    const supportNote = service.supportPillars?.length
      ? ` (${page.supportPillarLabel}: ${service.supportPillars.map((pillar) => pillarNames[pillar]).join(", ")})`
      : "";

    // Every service's technology list is short (≤5 items), so it folds into
    // the intro chunk instead of needing a chunk of its own.
    const introChunk: KnowledgeChunk = {
      ...base,
      id: `service:${service.id}:intro`,
      title: copy.title,
      text: `${copy.title} (IRTC). ${page.pillarLabel}: ${pillarNames[service.pillar]}${supportNote}. ${copy.summary} ${copy.intro} ${labels.technologies}: ${service.technologies.join(", ")}.`,
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

    const measureChunk: KnowledgeChunk = {
      ...base,
      id: `service:${service.id}:measure`,
      title: `${copy.title} · ${page.measureTitle}`,
      text: `${copy.title} (IRTC) · ${page.measureTitle}. ${page.measureNote} ${copy.measure.join(" ")}`,
    };

    const faqChunks: KnowledgeChunk[] = copy.faq.map((item, index) => ({
      ...base,
      id: `service:${service.id}:faq:${index + 1}`,
      title: item.question,
      text: `${copy.title} (IRTC) · ${labels.faq}. ${item.question} ${item.answer}`,
    }));

    return [
      introChunk,
      problemsChunk,
      deliverablesChunk,
      measureChunk,
      ...faqChunks,
    ];
  });
}

export function knowledgeChunks(locale: Locale): KnowledgeChunk[] {
  return [
    ...companyChunks(locale),
    ...aboutChunks(locale),
    ...founderChunks(locale),
    ...brandPageChunks(locale),
    ...serviceChunks(locale),
  ];
}

export function allKnowledgeChunks(): KnowledgeChunk[] {
  return locales.flatMap((locale) => knowledgeChunks(locale));
}

import type { Locale } from "./content";

export type ServiceId =
  | "custom-software"
  | "web-platforms"
  | "mobile-apps"
  | "integrations"
  | "modernization"
  | "applied-ai"
  | "data"
  | "cloud";

export type ServiceCopy = {
  slug: string;
  title: string;
  summary: string;
};

export type Service = {
  id: ServiceId;
  icon: string;
  technologies: string[];
  copy: Record<Locale, ServiceCopy>;
};

export const services: Service[] = [
  {
    id: "custom-software",
    icon: "Layers3",
    technologies: ["TypeScript", "Node.js", "NestJS", "React", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "software-sob-medida",
        title: "Software sob medida",
        summary:
          "Da ideia à primeira versão: planejamos, construímos e evoluímos o sistema que a sua operação precisa.",
      },
      en: {
        slug: "custom-software",
        title: "Custom software",
        summary:
          "From idea to first release: we plan, build and keep improving the system your business needs.",
      },
      es: {
        slug: "software-a-medida",
        title: "Software a medida",
        summary:
          "De la idea a la primera versión: planificamos, construimos y mejoramos el sistema que tu operación necesita.",
      },
    },
  },
  {
    id: "web-platforms",
    icon: "Globe2",
    technologies: ["Next.js", "React", "Vue.js", "TypeScript"],
    copy: {
      "pt-BR": {
        slug: "sites-e-plataformas-web",
        title: "Sites e plataformas web",
        summary:
          "Portais, painéis e sites rápidos, acessíveis e fáceis de usar em qualquer tela.",
      },
      en: {
        slug: "web-platforms",
        title: "Websites and web platforms",
        summary:
          "Fast, accessible portals, dashboards and websites that work on any screen.",
      },
      es: {
        slug: "sitios-y-plataformas-web",
        title: "Sitios y plataformas web",
        summary:
          "Portales, paneles y sitios rápidos, accesibles y fáciles de usar en cualquier pantalla.",
      },
    },
  },
  {
    id: "mobile-apps",
    icon: "Smartphone",
    technologies: ["React Native", "TypeScript", "Node.js"],
    copy: {
      "pt-BR": {
        slug: "aplicativos",
        title: "Aplicativos para celular",
        summary:
          "Aplicativos para Android e iPhone que funcionam no dia a dia, até em campo e com internet instável.",
      },
      en: {
        slug: "mobile-apps",
        title: "Mobile apps",
        summary:
          "Android and iPhone apps built for daily work, even in the field with a patchy connection.",
      },
      es: {
        slug: "aplicaciones-moviles",
        title: "Aplicaciones móviles",
        summary:
          "Aplicaciones para Android y iPhone pensadas para el día a día, incluso en campo y con conexión inestable.",
      },
    },
  },
  {
    id: "integrations",
    icon: "Network",
    technologies: ["Node.js", "NestJS", "Python", "Redis"],
    copy: {
      "pt-BR": {
        slug: "integracoes-e-automacao",
        title: "Integrações e automação",
        summary:
          "Conectamos os sistemas da empresa e tiramos o trabalho repetitivo das planilhas.",
      },
      en: {
        slug: "integrations-and-automation",
        title: "Integrations and automation",
        summary:
          "We connect your business systems and take repetitive work out of spreadsheets.",
      },
      es: {
        slug: "integraciones-y-automatizacion",
        title: "Integraciones y automatización",
        summary:
          "Conectamos los sistemas de la empresa y sacamos el trabajo repetitivo de las hojas de cálculo.",
      },
    },
  },
  {
    id: "modernization",
    icon: "RefreshCw",
    technologies: ["TypeScript", "Python", "Django", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "modernizacao-de-sistemas",
        title: "Modernização de sistemas",
        summary:
          "Atualizamos sistemas antigos por etapas, sem parar a operação que depende deles.",
      },
      en: {
        slug: "system-modernization",
        title: "System modernization",
        summary:
          "We update older systems step by step, without stopping the work that depends on them.",
      },
      es: {
        slug: "modernizacion-de-sistemas",
        title: "Modernización de sistemas",
        summary:
          "Actualizamos sistemas antiguos por etapas, sin detener la operación que depende de ellos.",
      },
    },
  },
  {
    id: "applied-ai",
    icon: "Sparkles",
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector"],
    copy: {
      "pt-BR": {
        slug: "inteligencia-artificial",
        title: "Inteligência artificial aplicada",
        summary:
          "Assistentes e automações com IA ligados ao conhecimento da sua empresa, com segurança e custo sob controle.",
      },
      en: {
        slug: "applied-ai",
        title: "Applied AI",
        summary:
          "AI assistants and automations connected to your company knowledge, with safety and cost under control.",
      },
      es: {
        slug: "inteligencia-artificial",
        title: "Inteligencia artificial aplicada",
        summary:
          "Asistentes y automatizaciones con IA conectados al conocimiento de tu empresa, con seguridad y costos bajo control.",
      },
    },
  },
  {
    id: "data",
    icon: "Database",
    technologies: ["PostgreSQL", "Python", "Redis", "AWS"],
    copy: {
      "pt-BR": {
        slug: "dados-e-relatorios",
        title: "Dados e relatórios",
        summary:
          "Dados organizados e painéis claros para decidir com base no que acontece de verdade.",
      },
      en: {
        slug: "data-and-reporting",
        title: "Data and reporting",
        summary:
          "Organized data and clear dashboards so decisions follow what is really happening.",
      },
      es: {
        slug: "datos-e-informes",
        title: "Datos e informes",
        summary:
          "Datos organizados y paneles claros para decidir con base en lo que realmente ocurre.",
      },
    },
  },
  {
    id: "cloud",
    icon: "Cloud",
    technologies: ["AWS", "GitHub", "Node.js", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "nuvem-e-arquitetura",
        title: "Nuvem e arquitetura",
        summary:
          "Estrutura na nuvem que aguenta o crescimento, com monitoramento e custos previsíveis.",
      },
      en: {
        slug: "cloud-and-architecture",
        title: "Cloud and architecture",
        summary:
          "Cloud infrastructure that handles growth, with monitoring and predictable costs.",
      },
      es: {
        slug: "nube-y-arquitectura",
        title: "Nube y arquitectura",
        summary:
          "Infraestructura en la nube preparada para crecer, con monitoreo y costos previsibles.",
      },
    },
  },
];

export function serviceBySlug(locale: Locale, slug: string) {
  return services.find((service) => service.copy[locale].slug === slug);
}

export function serviceSlugs(service: Service) {
  return {
    "pt-BR": service.copy["pt-BR"].slug,
    en: service.copy.en.slug,
    es: service.copy.es.slug,
  };
}

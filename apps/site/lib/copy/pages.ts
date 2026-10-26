import type { Locale } from "../content";

type PageCopy = { title: string; description: string; heading?: string };

export const homeCopy: Record<
  Locale,
  { title: string; description: string; organization: string }
> = {
  "pt-BR": {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Parceiro B2B em cloud, software e IA para integrar sistemas, modernizar operações e avaliar automação, com escopo e critérios de resultado definidos.",
    organization:
      "A IRTC é uma empresa B2B de Cloud, Software & AI Engineering. Trabalhamos com lideranças de negócio e tecnologia para transformar gargalos operacionais em escopos executáveis, com entregáveis e critérios de resultado definidos.",
  },
  en: {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "A B2B partner in cloud, software and AI for system integration, modernization and automation, with defined scope and outcome criteria.",
    organization:
      "IRTC is a B2B Cloud, Software & AI Engineering company. We work with business and technology leaders to turn operational bottlenecks into executable scopes, with defined deliverables and outcome criteria.",
  },
  es: {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Socio B2B en cloud, software e IA para integrar sistemas, modernizar operaciones y evaluar automatización, con alcance y criterios de resultado definidos.",
    organization:
      "IRTC es una empresa B2B de Cloud, Software & AI Engineering. Trabajamos con líderes de negocio y tecnología para convertir limitaciones operativas en alcances ejecutables, con entregables y criterios de resultado definidos.",
  },
};

export const founderJobTitle = "Founder & Principal Engineer";

export const pageCopy: Record<
  | "services"
  | "about"
  | "founder"
  | "culture"
  | "mission"
  | "vision"
  | "contact",
  Record<Locale, PageCopy>
> = {
  services: {
    "pt-BR": {
      title: "Soluções B2B em cloud, software e IA | IRTC",
      heading: "Engenharia para o próximo passo da operação",
      description:
        "Integrações, modernização e IA aplicadas a problemas de operação. Conheça entregáveis, critérios de avaliação e como definir o primeiro escopo.",
    },
    en: {
      title: "B2B cloud, software and AI services | IRTC",
      heading: "Engineering for your next operational priority",
      description:
        "Integration, modernization and AI for operational problems. Explore deliverables, evaluation criteria and how to define the first scope.",
    },
    es: {
      title: "Soluciones B2B en cloud, software e IA | IRTC",
      heading: "Ingeniería para el próximo paso de tu operación",
      description:
        "Integraciones, modernización e IA para problemas operativos. Conoce los entregables, criterios de evaluación y cómo definir el primer alcance.",
    },
  },
  about: {
    "pt-BR": {
      title: "Sobre a IRTC | Parceiro de engenharia B2B",
      description:
        "Engenharia B2B conduzida por Iago Rodrigues em Belém, com atendimento remoto. Conheça responsabilidades, processo de entrega e princípios da IRTC.",
    },
    en: {
      title: "About IRTC | B2B engineering partner",
      description:
        "B2B engineering led by Iago Rodrigues in Belém, Brazil, working remotely. Learn about IRTC’s accountability, delivery process and principles.",
    },
    es: {
      title: "Sobre IRTC | Socio de ingeniería B2B",
      description:
        "Ingeniería B2B dirigida por Iago Rodrigues en Belém, Brasil, con atención remota. Conoce responsabilidades, proceso de entrega y principios de IRTC.",
    },
  },
  founder: {
    "pt-BR": {
      title: "Iago Rodrigues | Fundador e responsável técnico da IRTC",
      description:
        "Conheça a experiência pessoal de Iago Rodrigues como contractor e sua responsabilidade técnica na IRTC, com atribuição clara de cada atuação.",
    },
    en: {
      title: "Iago Rodrigues | IRTC founder and technical lead",
      description:
        "Explore Iago Rodrigues’s personal contractor experience and technical responsibilities at IRTC, with clear attribution of each role.",
    },
    es: {
      title: "Iago Rodrigues | Fundador y responsable técnico de IRTC",
      description:
        "Conoce la experiencia personal de Iago Rodrigues como contractor y su responsabilidad técnica en IRTC, con atribución clara de cada actuación.",
    },
  },
  culture: {
    "pt-BR": {
      title: "Como trabalhamos | Cultura da IRTC",
      description:
        "Escopo, decisões, testes e documentação que permitem acompanhar a entrega. Conheça as práticas da IRTC e a responsabilidade humana no uso de IA.",
    },
    en: {
      title: "How we work | IRTC culture",
      description:
        "Scope, decisions, tests and documentation that make delivery visible. Learn about IRTC’s working practices and human accountability in AI use.",
    },
    es: {
      title: "Cómo trabajamos | Cultura de IRTC",
      description:
        "Alcance, decisiones, pruebas y documentación para seguir la entrega. Conoce las prácticas de IRTC y la responsabilidad humana en el uso de IA.",
    },
  },
  mission: {
    "pt-BR": {
      title: "Missão | IRTC",
      description:
        "Resolver problemas de negócio projetando, construindo, modernizando e operando sistemas de cloud, software e IA. Veja o percurso do primeiro contato à evolução.",
    },
    en: {
      title: "Mission | IRTC",
      description:
        "To solve business problems by designing, building, modernizing and operating cloud, software and AI systems. See the path from first contact to evolution.",
    },
    es: {
      title: "Misión | IRTC",
      description:
        "Resolver problemas de negocio diseñando, construyendo, modernizando y operando sistemas de cloud, software e IA. Mira el recorrido desde el primer contacto hasta la evolución.",
    },
  },
  vision: {
    "pt-BR": {
      title: "Visão | IRTC",
      description:
        "Ser uma referência de engenharia nascida na Amazônia, que torna cloud, software e IA acessíveis a empresas de diferentes portes.",
    },
    en: {
      title: "Vision | IRTC",
      description:
        "To be an engineering reference born in the Amazon, making cloud, software and AI accessible to companies of different sizes.",
    },
    es: {
      title: "Visión | IRTC",
      description:
        "Ser una referencia de ingeniería nacida en la Amazonia, que hace accesibles cloud, software e IA a empresas de diferentes tamaños.",
    },
  },
  contact: {
    "pt-BR": {
      title: "Converse sobre seu desafio de negócio | IRTC",
      description:
        "Descreva o problema, o impacto e a prioridade da sua operação. Iago Rodrigues analisa o contexto para definir o próximo passo com a IRTC.",
    },
    en: {
      title: "Discuss your business challenge | IRTC",
      description:
        "Describe your operational problem, its impact and priority. Iago Rodrigues reviews the context to define the next step with IRTC.",
    },
    es: {
      title: "Hablemos de tu desafío de negocio | IRTC",
      description:
        "Describe el problema, el impacto y la prioridad de tu operación. Iago Rodrigues analiza el contexto para definir el siguiente paso con IRTC.",
    },
  },
};

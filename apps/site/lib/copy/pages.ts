import type { Locale } from "../content";

type PageCopy = { title: string; description: string; heading?: string };

export const homeCopy: Record<
  Locale,
  { title: string; description: string; organization: string }
> = {
  "pt-BR": {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Consultoria de cloud e IA na AWS, em Belém (PA). Integramos os sistemas que sua equipe já usa para reduzir retrabalho em vendas, operações e faturamento.",
    organization:
      "A IRTC é uma empresa de Cloud, Software & AI Engineering que presta consultoria de cloud e IA na AWS, com base em Belém (PA) e atendimento remoto. Integramos os sistemas que a empresa já usa para reduzir retrabalho operacional, com escopo, entregáveis e critérios de resultado definidos.",
  },
  en: {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Cloud and AI consulting on AWS from Belém, Brazil. We connect the systems your team already uses to cut rework in sales, operations and billing.",
    organization:
      "IRTC is a Cloud, Software & AI Engineering company providing cloud and AI consulting on AWS, based in Belém, Pará, Brazil, and working remotely. We connect the systems a company already uses to cut operational rework, with defined scope, deliverables and outcome criteria.",
  },
  es: {
    title: "IRTC | Cloud, Software & AI Engineering",
    description:
      "Consultoría de cloud e IA en AWS desde Belém, Brasil. Conectamos los sistemas que tu equipo ya usa para reducir retrabajo en ventas, operaciones y facturación.",
    organization:
      "IRTC es una empresa de Cloud, Software & AI Engineering que ofrece consultoría de cloud e IA en AWS, con base en Belém, Pará, Brasil, y atención remota. Conectamos los sistemas que la empresa ya usa para reducir el retrabajo operativo, con alcance, entregables y criterios de resultado definidos.",
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
      title: "Consultoria AWS, IA aplicada e integrações | IRTC",
      heading: "Consultoria AWS e IA para integrar o que sua empresa já usa",
      description:
        "Consultoria AWS, IA aplicada e integração dos sistemas que sua empresa já usa para reduzir retrabalho. Veja o que cada serviço entrega e o que fica fora.",
    },
    en: {
      title: "AWS consulting, applied AI and integrations | IRTC",
      heading: "AWS and AI consulting to connect the systems you already use",
      description:
        "AWS consulting, applied AI and integration of the systems your company already uses to cut rework. See what each service delivers and what it leaves out.",
    },
    es: {
      title: "Consultoría AWS, IA aplicada e integraciones | IRTC",
      heading: "Consultoría AWS e IA para integrar lo que tu empresa ya usa",
      description:
        "Consultoría AWS, IA aplicada e integración de los sistemas que tu empresa ya usa para reducir el retrabajo. Mira qué entrega cada servicio y qué queda fuera.",
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
        "Resolver problemas de negocio diseñando, construyendo, modernizando y operando sistemas de cloud, software e IA. Conoce el recorrido de cada proyecto.",
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

import type { Locale } from "../content";
import type { PillarId, StackId } from "../services";

export const servicesPageCopy: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbServices: string;
    intro: string;
    gridTitle: string;
    cardCta: string;
    allServicesCta: string;
    techNoteTitle: string;
    techNoteText: string;
    whenTitle: string;
    whatTitle: string;
    howTitle: string;
    stackTitle: string;
    stackNote: string;
    stack: Record<StackId, { name: string; role: string }>;
    faqTitle: string;
    relatedTitle: string;
    measureTitle: string;
    measureNote: string;
    measureFrom: string;
    measureTo: string;
    pillarLabel: string;
    supportPillarLabel: string;
    pillarText: Record<PillarId, string>;
    continuity: { label: string; name: string; text: string; cta: string };
  }
> = {
  "pt-BR": {
    breadcrumbHome: "Início",
    breadcrumbServices: "Serviços",
    intro:
      "Cada projeto começa pelo problema, não pela tecnologia. São oito serviços em três pilares de engenharia: Cloud, Software e AI Engineering.",
    gridTitle: "O que fazemos",
    cardCta: "Ver serviço",
    allServicesCta: "Ver todos os serviços",
    techNoteTitle: "Tecnologia com função definida.",
    techNoteText:
      "Nosso foco técnico é AWS e IA. A stack de produto (React, Node.js, Next.js, PostgreSQL) é escolhida por projeto, depois de entender o problema.",
    whenTitle: "Quando você precisa disso",
    whatTitle: "O que você recebe",
    howTitle: "Como trabalhamos",
    stackTitle: "Tecnologia, com função definida",
    stackNote:
      "A stack de produto, como React, Node.js e PostgreSQL, é escolhida por projeto.",
    stack: {
      aws: {
        name: "AWS",
        role: "Onde o sistema roda, escala e é monitorado.",
      },
      bedrock: {
        name: "Amazon Bedrock, RAG e agentes",
        role: "IA que responde com os documentos da empresa e age com regras definidas.",
      },
      mcp: {
        name: "MCP",
        role: "Conecta agentes às ferramentas da empresa.",
      },
    },
    faqTitle: "Perguntas frequentes",
    relatedTitle: "Serviços relacionados",
    measureTitle: "Como medimos o resultado",
    measureNote:
      "Critérios que o projeto define com você no início. Servem de objetivo e de forma de checar o trabalho, não de resultado garantido.",
    measureFrom: "Hoje",
    measureTo: "Meta combinada",
    pillarLabel: "Pilar",
    supportPillarLabel: "Com apoio de",
    pillarText: {
      cloud:
        "Ambientes na nuvem que ficam no ar, aguentam o crescimento e têm o custo acompanhado. Nosso foco técnico é a AWS, a nuvem da Amazon.",
      software:
        "Sistemas, sites, aplicativos e integrações que sua equipe e seus usuários usam no dia a dia, incluindo a atualização de sistemas antigos.",
      ai: "IA aplicada ao conhecimento e aos processos da empresa, com tarefa definida, avaliação de qualidade e controle de acesso e custo.",
    },
    continuity: {
      label: "Continuidade",
      name: "Continuous Engineering",
      text: "Depois da entrega, os sistemas continuam mudando. Continuous Engineering é o modelo de continuidade dos três pilares: evolução, otimização, confiabilidade e modernização. Escopo, cadência e atendimento são definidos conforme a operação.",
      cta: "Conversar sobre continuidade",
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    intro:
      "Every project starts with the problem, not the technology. Eight services in three engineering pillars: Cloud, Software and AI Engineering.",
    gridTitle: "What we do",
    cardCta: "View service",
    allServicesCta: "See all services",
    techNoteTitle: "Technology with a defined role.",
    techNoteText:
      "Our technical focus is AWS and AI. The product stack (React, Node.js, Next.js, PostgreSQL) is chosen per project, after we understand the problem.",
    whenTitle: "When you need this",
    whatTitle: "What you get",
    howTitle: "How we work",
    stackTitle: "Technology, with a defined role",
    stackNote:
      "The product stack, such as React, Node.js and PostgreSQL, is chosen per project.",
    stack: {
      aws: {
        name: "AWS",
        role: "Where the system runs, scales and is monitored.",
      },
      bedrock: {
        name: "Amazon Bedrock, RAG and agents",
        role: "AI that answers from the company's documents and acts within defined rules.",
      },
      mcp: {
        name: "MCP",
        role: "Connects agents to the company's tools.",
      },
    },
    faqTitle: "Frequently asked questions",
    relatedTitle: "Related services",
    measureTitle: "How we measure the result",
    measureNote:
      "Criteria the project defines with you at the start. They serve as a goal and a way to check the work, not as a guaranteed result.",
    measureFrom: "Today",
    measureTo: "Agreed target",
    pillarLabel: "Pillar",
    supportPillarLabel: "Supported by",
    pillarText: {
      cloud:
        "Cloud environments that stay up, hold up as you grow and have their cost tracked. Our technical focus is AWS, Amazon's cloud.",
      software:
        "Systems, websites, apps and integrations that your team and users rely on every day, including updating older systems.",
      ai: "AI applied to a company's knowledge and processes, with a defined task, quality evaluation and control over access and cost.",
    },
    continuity: {
      label: "Continuity",
      name: "Continuous Engineering",
      text: "After delivery, systems keep changing. Continuous Engineering is the continuity model for all three pillars: evolution, optimization, reliability and modernization. Scope, cadence and support are set according to the operation.",
      cta: "Talk about continuity",
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbServices: "Servicios",
    intro:
      "Cada proyecto empieza por el problema, no por la tecnología. Ocho servicios en tres pilares de ingeniería: Cloud, Software y AI Engineering.",
    gridTitle: "Qué hacemos",
    cardCta: "Ver servicio",
    allServicesCta: "Ver todos los servicios",
    techNoteTitle: "Tecnología con función definida.",
    techNoteText:
      "Nuestro foco técnico es AWS e IA. El stack de producto (React, Node.js, Next.js, PostgreSQL) se elige por proyecto, después de entender el problema.",
    whenTitle: "Cuándo necesitas esto",
    whatTitle: "Qué recibes",
    howTitle: "Cómo trabajamos",
    stackTitle: "Tecnología, con función definida",
    stackNote:
      "El stack de producto, como React, Node.js y PostgreSQL, se elige por proyecto.",
    stack: {
      aws: {
        name: "AWS",
        role: "Donde el sistema corre, escala y se monitorea.",
      },
      bedrock: {
        name: "Amazon Bedrock, RAG y agentes",
        role: "IA que responde con los documentos de la empresa y actúa con reglas definidas.",
      },
      mcp: {
        name: "MCP",
        role: "Conecta agentes a las herramientas de la empresa.",
      },
    },
    faqTitle: "Preguntas frecuentes",
    relatedTitle: "Servicios relacionados",
    measureTitle: "Cómo medimos el resultado",
    measureNote:
      "Criterios que el proyecto define contigo al inicio. Sirven como objetivo y como forma de verificar el trabajo, no como resultado garantizado.",
    measureFrom: "Hoy",
    measureTo: "Meta acordada",
    pillarLabel: "Pilar",
    supportPillarLabel: "Con apoyo de",
    pillarText: {
      cloud:
        "Entornos en la nube que se mantienen en línea, aguantan el crecimiento y tienen el costo seguido. Nuestro foco técnico es AWS, la nube de Amazon.",
      software:
        "Sistemas, sitios, aplicaciones e integraciones que tu equipo y tus usuarios usan todos los días, incluida la actualización de sistemas antiguos.",
      ai: "IA aplicada al conocimiento y a los procesos de la empresa, con tarea definida, evaluación de calidad y control de acceso y costo.",
    },
    continuity: {
      label: "Continuidad",
      name: "Continuous Engineering",
      text: "Después de la entrega, los sistemas siguen cambiando. Continuous Engineering es el modelo de continuidad de los tres pilares: evolución, optimización, confiabilidad y modernización. El alcance, la cadencia y la atención se definen según la operación.",
      cta: "Conversar sobre continuidad",
    },
  },
};

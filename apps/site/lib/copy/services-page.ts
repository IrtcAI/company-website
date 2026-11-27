import type { Locale } from "../content";
import type { PillarId, StackId } from "../services";

export const servicesPageCopy: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbLabel: string;
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
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbServices: "Serviços",
    intro:
      "Consultoria AWS, IA aplicada e integração dos sistemas que sua equipe já usa. Começamos pelo problema que mais pesa na operação hoje.",
    gridTitle: "Áreas de atuação",
    cardCta: "Ver serviço",
    allServicesCta: "Ver todos os serviços",
    techNoteTitle: "Tecnologia com função definida.",
    techNoteText:
      "Escolhemos ferramentas por custo, segurança e manutenção, com foco técnico em AWS. Tecnologias citadas não indicam certificações ou parcerias.",
    whenTitle: "Quando você precisa disso",
    whatTitle: "Entregáveis a definir",
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
      "Combinamos referência, meta e período de avaliação. Os resultados dependem do contexto e orientam a continuidade.",
    measureFrom: "Hoje",
    measureTo: "Meta combinada",
    pillarLabel: "Pilar",
    supportPillarLabel: "Com apoio de",
    pillarText: {
      cloud:
        "Ambientes AWS com deploy automatizado e uma conta que dá para explicar.",
      software:
        "Integrações entre os sistemas que você já usa e modernização para reduzir retrabalho.",
      ai: "Testamos a IA numa tarefa real antes de você investir na implantação.",
    },
    continuity: {
      label: "Continuidade",
      name: "Continuous Engineering",
      text: "Evolução, confiabilidade e modernização após a entrega, com escopo, cadência e atendimento acordados.",
      cta: "Conversar sobre continuidade",
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbServices: "Services",
    intro:
      "AWS consulting, applied AI and integration of the systems your team already uses. We start with the problem that weighs most on operations today.",
    gridTitle: "Areas of work",
    cardCta: "View service",
    allServicesCta: "See all services",
    techNoteTitle: "Technology with a defined role.",
    techNoteText:
      "We select tools for cost, security and maintenance, with a technical focus on AWS. Listed technologies do not imply certifications or partnerships.",
    whenTitle: "When you need this",
    whatTitle: "Deliverables to agree",
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
      "We agree on a baseline, target and evaluation period. Outcomes depend on context and guide next steps.",
    measureFrom: "Today",
    measureTo: "Agreed target",
    pillarLabel: "Pillar",
    supportPillarLabel: "Supported by",
    pillarText: {
      cloud:
        "AWS environments with automated deployments and a bill you can explain.",
      software:
        "Integrations between the systems you already use and modernization to cut rework.",
      ai: "We test AI on a real task before you invest in rolling it out.",
    },
    continuity: {
      label: "Continuity",
      name: "Continuous Engineering",
      text: "Evolution, reliability and modernization after delivery, with agreed scope, cadence and support.",
      cta: "Talk about continuity",
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbServices: "Servicios",
    intro:
      "Consultoría AWS, IA aplicada e integración de los sistemas que tu equipo ya usa. Empezamos por el problema que más pesa hoy en la operación.",
    gridTitle: "Áreas de actuación",
    cardCta: "Ver servicio",
    allServicesCta: "Ver todos los servicios",
    techNoteTitle: "Tecnología con función definida.",
    techNoteText:
      "Elegimos herramientas por costo, seguridad y mantenimiento, con foco técnico en AWS. Las tecnologías citadas no indican certificaciones ni alianzas.",
    whenTitle: "Cuándo necesitas esto",
    whatTitle: "Entregas por definir",
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
      "Acordamos referencia, meta y período de evaluación. Los resultados dependen del contexto y orientan la continuidad.",
    measureFrom: "Hoy",
    measureTo: "Meta acordada",
    pillarLabel: "Pilar",
    supportPillarLabel: "Con apoyo de",
    pillarText: {
      cloud:
        "Entornos AWS con despliegue automatizado y una factura que se puede explicar.",
      software:
        "Integraciones entre los sistemas que ya usas y modernización para reducir el retrabajo.",
      ai: "Probamos la IA en una tarea real antes de que inviertas en implementarla.",
    },
    continuity: {
      label: "Continuidad",
      name: "Continuous Engineering",
      text: "Evolución, confiabilidad y modernización tras la entrega, con alcance, frecuencia y atención acordados.",
      cta: "Conversar sobre continuidad",
    },
  },
};

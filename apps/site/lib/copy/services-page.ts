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
      "Integrações e automação ajudam a enfrentar o trabalho manual entre sistemas. Avaliamos também desafios de cloud, evolução de software e IA. Cada contratação depende do problema, do acesso aos sistemas e da capacidade de entrega.",
    gridTitle: "Áreas de atuação",
    cardCta: "Ver serviço",
    allServicesCta: "Ver todos os serviços",
    techNoteTitle: "Tecnologia com função definida.",
    techNoteText:
      "AWS é um foco técnico da IRTC. A escolha de ferramentas considera custo total, segurança, integração e capacidade de manutenção. As tecnologias citadas não representam certificações ou parcerias.",
    whenTitle: "Quando você precisa disso",
    whatTitle: "Entregáveis para definir no escopo",
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
      "Definimos a referência atual, a meta e o período de avaliação com você. Os indicadores orientam o aceite e a decisão de continuidade; o resultado depende do contexto da operação.",
    measureFrom: "Hoje",
    measureTo: "Meta combinada",
    pillarLabel: "Pilar",
    supportPillarLabel: "Com apoio de",
    pillarText: {
      cloud:
        "Entenda o custo e o risco do ambiente que sustenta sua operação. Diagnóstico, arquitetura e mudanças planejadas, com foco técnico em AWS.",
      software:
        "Conecte sistemas e elimine etapas manuais que atrasam o trabalho. Integrações, evolução de produtos e modernização com escopo e aceite definidos.",
      ai: "Avalie onde a IA pode ajudar em uma tarefa concreta. Protótipos com dados autorizados, critérios de qualidade, custo por tarefa e revisão humana.",
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
    breadcrumbLabel: "Breadcrumb",
    breadcrumbServices: "Services",
    intro:
      "Integrations and automation address manual work between systems. We also assess cloud, software development and AI challenges. Each engagement depends on the problem, access to systems and delivery capacity.",
    gridTitle: "Areas of work",
    cardCta: "View service",
    allServicesCta: "See all services",
    techNoteTitle: "Technology with a defined role.",
    techNoteText:
      "AWS is a technical focus for IRTC. Tool choices consider total cost, security, integration and maintenance capacity. Technologies mentioned do not imply certifications or partnerships.",
    whenTitle: "When you need this",
    whatTitle: "Deliverables to define in the scope",
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
      "We agree on the baseline, target and evaluation period with you. Indicators inform acceptance and continuity decisions; outcomes depend on the operating context.",
    measureFrom: "Today",
    measureTo: "Agreed target",
    pillarLabel: "Pillar",
    supportPillarLabel: "Supported by",
    pillarText: {
      cloud:
        "Understand the cost and risk of the infrastructure behind your operation. Assessment, architecture and planned changes, with a technical focus on AWS.",
      software:
        "Connect systems and remove manual steps that delay work. Integrations, product development and modernization with defined scope and acceptance criteria.",
      ai: "Evaluate where AI can help with a specific task. Prototypes with authorized data, quality criteria, cost per task and human review.",
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
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbServices: "Servicios",
    intro:
      "Las integraciones y la automatización permiten abordar el trabajo manual entre sistemas. También evaluamos desafíos de cloud, evolución de software e IA. Cada contratación depende del problema, del acceso a los sistemas y de la capacidad de entrega.",
    gridTitle: "Áreas de actuación",
    cardCta: "Ver servicio",
    allServicesCta: "Ver todos los servicios",
    techNoteTitle: "Tecnología con función definida.",
    techNoteText:
      "AWS es un foco técnico de IRTC. La elección de herramientas considera costo total, seguridad, integración y capacidad de mantenimiento. Las tecnologías citadas no representan certificaciones ni alianzas.",
    whenTitle: "Cuándo necesitas esto",
    whatTitle: "Entregables para definir en el alcance",
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
      "Definimos contigo la referencia actual, la meta y el período de evaluación. Los indicadores orientan la aceptación y la decisión de continuidad; el resultado depende del contexto de la operación.",
    measureFrom: "Hoy",
    measureTo: "Meta acordada",
    pillarLabel: "Pilar",
    supportPillarLabel: "Con apoyo de",
    pillarText: {
      cloud:
        "Entiende el costo y el riesgo del entorno que sostiene tu operación. Diagnóstico, arquitectura y cambios planificados, con foco técnico en AWS.",
      software:
        "Conecta sistemas y elimina pasos manuales que retrasan el trabajo. Integraciones, evolución de productos y modernización con alcance y aceptación definidos.",
      ai: "Evalúa dónde puede ayudar la IA en una tarea concreta. Prototipos con datos autorizados, criterios de calidad, costo por tarea y revisión humana.",
    },
    continuity: {
      label: "Continuidad",
      name: "Continuous Engineering",
      text: "Después de la entrega, los sistemas siguen cambiando. Continuous Engineering es el modelo de continuidad de los tres pilares: evolución, optimización, confiabilidad y modernización. El alcance, la cadencia y la atención se definen según la operación.",
      cta: "Conversar sobre continuidad",
    },
  },
};

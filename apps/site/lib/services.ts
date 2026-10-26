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

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type PillarId = "cloud" | "software" | "ai";

export const pillars: PillarId[] = ["cloud", "software", "ai"];

export const pillarNames: Record<PillarId, string> = {
  cloud: "Cloud Engineering",
  software: "Software Engineering",
  ai: "AI Engineering",
};

export type StackId = "aws" | "bedrock" | "mcp";

export type ServiceAccent = "sage" | "terracotta" | "sky";

export type ServiceCopy = {
  slug: string;
  title: string;
  summary: string;
  shortSummary: string;
  intro: string;
  problems: string[];
  deliverables: string[];
  measure: string[];
  faq: ServiceFaqItem[];
};

export type Service = {
  id: ServiceId;
  icon: string;
  accent: ServiceAccent;
  deliverablesLayout: "timeline" | "checklist";
  stack: StackId[];
  technologies: string[];
  pillar: PillarId;
  supportPillars?: PillarId[];
  copy: Record<Locale, ServiceCopy>;
};

export const services: Service[] = [
  {
    id: "custom-software",
    icon: "Layers3",
    accent: "sage",
    deliverablesLayout: "timeline",
    stack: ["aws"],
    pillar: "software",
    technologies: ["TypeScript", "Node.js", "NestJS", "React", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "software-sob-medida",
        title: "Software sob medida",
        summary:
          "Software sob medida para processos que limitam a operação, com prioridades, entregas verificáveis e documentação para sua equipe.",
        intro:
          "Avaliamos se vale adaptar, integrar ou construir. Começamos por um fluxo prioritário, com regras e aceite definidos.",
        problems: [
          "A ferramenta pronta quase serve, mas sempre trava num detalhe.",
          "O processo vive em planilhas, mensagens e na memória de alguém.",
          "Você tem uma ideia de produto e precisa testá-la com usuários reais.",
          "Você quer um sistema seu: suas regras, seus dados, seu roteiro.",
        ],
        deliverables: [
          "Mapa do processo, regras e prioridades",
          "Escopo do primeiro incremento e critérios de aceite",
          "Software e integrações previstos no escopo",
          "Testes dos fluxos acordados e registro de limitações",
          "Código, documentação e plano de implantação",
        ],
        measure: [
          "Fluxo essencial aceito de ponta a ponta na primeira versão",
          "Tempo e retrabalho do processo atual, antes e depois",
          "O que usuários reais encontram define as próximas prioridades",
        ],
        faq: [
          {
            question: "O que influencia o custo de um software sob medida?",
            answer:
              "Fluxos, integrações e perfis de usuário definem o custo. O valor é acordado com o escopo.",
          },
          {
            question: "Como o projeto sai da ideia até um sistema funcionando?",
            answer:
              "Em etapas curtas, com demonstrações e prioridades ajustadas ao aprendizado com usuários.",
          },
          {
            question: "O que preciso ter pronto antes de começarmos?",
            answer:
              "Uma descrição do problema e acesso a quem vive o processo. A especificação nasce na descoberta.",
          },
          {
            question: "Como vocês decidem qual tecnologia usar?",
            answer:
              "A escolha considera o problema, sua equipe, o orçamento e a evolução esperada.",
          },
        ],
        shortSummary:
          "Software para processos que as ferramentas atuais não atendem.",
      },
      en: {
        slug: "custom-software",
        title: "Custom software",
        summary:
          "Custom software for processes that hold back operations, with clear priorities, verifiable deliverables and documentation for your team.",
        intro:
          "We assess whether to adapt, integrate or build. We start with one priority workflow and agreed rules and acceptance criteria.",
        problems: [
          "The ready-made tool almost fits, but it always breaks on one detail.",
          "The process lives in spreadsheets, messages and someone's memory.",
          "You have a product idea and need to test it with real users.",
          "You want a system that's yours: your rules, your data, your roadmap.",
        ],
        deliverables: [
          "Process map, rules and priorities",
          "Scope and acceptance criteria for the first increment",
          "Software and integrations included in the scope",
          "Tests of agreed workflows and recorded limitations",
          "Code, documentation and deployment plan",
        ],
        measure: [
          "Essential flow accepted end to end in the first version",
          "Time and rework in the current process, before and after",
          "What real users find sets the next priorities",
        ],
        faq: [
          {
            question: "What affects the cost of custom software?",
            answer:
              "Workflows, integrations and user roles determine cost. Pricing is agreed with the scope.",
          },
          {
            question: "How does the project go from idea to a working system?",
            answer:
              "In short stages, with demos and priorities adjusted as we learn from users.",
          },
          {
            question: "What do I need to have ready before we start?",
            answer:
              "A problem description and access to people who use the process. Discovery shapes the specification.",
          },
          {
            question: "How do you decide which technology to use?",
            answer:
              "The choice considers the problem, your team, budget and expected growth.",
          },
        ],
        shortSummary:
          "Software for processes your current tools cannot handle.",
      },
      es: {
        slug: "software-a-medida",
        title: "Software a medida",
        summary:
          "Software a medida para procesos que limitan la operación, con prioridades, entregas verificables y documentación para tu equipo.",
        intro:
          "Evaluamos si conviene adaptar, integrar o construir. Empezamos por un flujo prioritario, con reglas y aceptación definidas.",
        problems: [
          "La herramienta lista casi sirve, pero siempre falla en un detalle.",
          "El proceso vive en hojas de cálculo, mensajes y en la memoria de alguien.",
          "Tienes una idea de producto y necesitas probarla con usuarios reales.",
          "Quieres un sistema tuyo: tus reglas, tus datos, tu hoja de ruta.",
        ],
        deliverables: [
          "Mapa del proceso, reglas y prioridades",
          "Alcance del primer incremento y criterios de aceptación",
          "Software e integraciones previstos en el alcance",
          "Pruebas de los flujos acordados y registro de limitaciones",
          "Código, documentación y plan de implantación",
        ],
        measure: [
          "Flujo esencial aceptado de punta a punta en la primera versión",
          "Tiempo y retrabajo del proceso actual, antes y después",
          "Lo que encuentran los usuarios reales define las próximas prioridades",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de un software a medida?",
            answer:
              "Los flujos, integraciones y perfiles de usuario definen el costo. El precio se acuerda con el alcance.",
          },
          {
            question:
              "¿Cómo pasa el proyecto de la idea a un sistema funcionando?",
            answer:
              "En etapas cortas, con demostraciones y prioridades ajustadas al aprendizaje con usuarios.",
          },
          {
            question: "¿Qué necesito tener listo antes de empezar?",
            answer:
              "Una descripción del problema y acceso a quienes usan el proceso. La especificación se define durante el diagnóstico.",
          },
          {
            question: "¿Cómo deciden qué tecnología usar?",
            answer:
              "La elección considera el problema, tu equipo, el presupuesto y la evolución esperada.",
          },
        ],
        shortSummary:
          "Software para procesos que tus herramientas actuales no resuelven.",
      },
    },
  },
  {
    id: "web-platforms",
    icon: "Globe2",
    accent: "sky",
    deliverablesLayout: "checklist",
    stack: ["aws"],
    pillar: "software",
    technologies: ["Next.js", "React", "Vue.js", "TypeScript"],
    copy: {
      "pt-BR": {
        slug: "sites-e-plataformas-web",
        title: "Sites e plataformas web",
        summary:
          "Portais e plataformas web para facilitar atendimento, acesso à informação e tarefas de clientes ou equipes, com indicadores de uso definidos.",
        intro:
          "Organize solicitações, documentos e tarefas em um portal. O escopo define público, integrações, acessibilidade e desempenho.",
        problems: [
          "O site é lento, difícil de atualizar ou ruim no celular.",
          "Você precisa de um portal para clientes ou parceiros, não só de uma página pública.",
          "Sua equipe precisa de um painel para ver o que acontece sem pedir relatório.",
          "Você lança um produto novo e precisa de um site que sustente isso.",
        ],
        deliverables: [
          "Mapa da jornada e das tarefas prioritárias",
          "Páginas, permissões e integrações do escopo",
          "Verificação de acessibilidade e desempenho nas telas acordadas",
          "Gestão de conteúdo quando necessária ao processo",
          "Documentação e indicadores de conclusão das tarefas",
        ],
        measure: [
          "Velocidade e acessibilidade medidas em páginas combinadas",
          "Sua equipe atualiza o conteúdo sem depender de um desenvolvedor",
          "Indicadores de uso mostram o que os visitantes fazem",
        ],
        faq: [
          {
            question: "O que influencia o custo de um site ou plataforma web?",
            answer:
              "Páginas, fluxos, permissões e integrações definem o custo, conforme o escopo acordado.",
          },
          {
            question: "Como funciona o lançamento?",
            answer:
              "Lançamos as páginas essenciais e evoluímos com base no uso observado.",
          },
          {
            question: "O que levar para a primeira conversa?",
            answer:
              "Público, tarefas prioritárias, conteúdo disponível e referências que ajudem a explicar o objetivo.",
          },
          {
            question: "O que acontece depois que o site entra no ar?",
            answer:
              "Desempenho, disponibilidade e evolução podem compor Continuous Engineering, com escopo e atendimento acordados.",
          },
        ],
        shortSummary:
          "Portais e plataformas para clientes e equipes concluírem tarefas.",
      },
      en: {
        slug: "web-platforms",
        title: "Websites and web platforms",
        summary:
          "Web portals and platforms for customer service, access to information and everyday tasks, with defined usage indicators.",
        intro:
          "Organize requests, documents and tasks in a portal. The scope defines users, integrations, accessibility and performance.",
        problems: [
          "The site is slow, hard to update or poor on mobile.",
          "You need a portal for clients or partners, not just a public page.",
          "Your team needs a dashboard to see what's happening without asking for a report.",
          "You're launching a new product and need a site to support it.",
        ],
        deliverables: [
          "Journey map and priority tasks",
          "Pages, permissions and integrations in scope",
          "Accessibility and performance checks on agreed screens",
          "Content management where the process requires it",
          "Documentation and task completion indicators",
        ],
        measure: [
          "Speed and accessibility measured on agreed pages",
          "Your team updates content without relying on a developer",
          "Usage indicators show what visitors actually do",
        ],
        faq: [
          {
            question: "What affects the cost of a website or web platform?",
            answer:
              "Pages, workflows, permissions and integrations determine cost within the agreed scope.",
          },
          {
            question: "How does the launch work?",
            answer:
              "We launch essential pages and evolve based on observed usage.",
          },
          {
            question: "What should I bring to the first conversation?",
            answer:
              "Audience, priority tasks, available content and references that clarify the goal.",
          },
          {
            question: "What happens after the site goes live?",
            answer:
              "Performance, availability and improvements can be covered by Continuous Engineering, with agreed scope and support.",
          },
        ],
        shortSummary:
          "Portals and platforms that help customers and teams complete tasks.",
      },
      es: {
        slug: "sitios-y-plataformas-web",
        title: "Sitios y plataformas web",
        summary:
          "Portales y plataformas web para atención, acceso a información y tareas de clientes o equipos, con indicadores de uso definidos.",
        intro:
          "Organiza solicitudes, documentos y tareas en un portal. El alcance define público, integraciones, accesibilidad y rendimiento.",
        problems: [
          "El sitio es lento, difícil de actualizar o malo en el celular.",
          "Necesitas un portal para clientes o socios, no solo una página pública.",
          "Tu equipo necesita un panel para ver qué pasa sin pedir un informe.",
          "Lanzas un producto nuevo y necesitas un sitio que lo sostenga.",
        ],
        deliverables: [
          "Mapa de la experiencia y tareas prioritarias",
          "Páginas, permisos e integraciones del alcance",
          "Verificación de accesibilidad y rendimiento en las pantallas acordadas",
          "Gestión de contenido cuando el proceso lo requiera",
          "Documentación e indicadores de finalización de tareas",
        ],
        measure: [
          "Velocidad y accesibilidad medidas en páginas acordadas",
          "Tu equipo actualiza el contenido sin depender de un desarrollador",
          "Indicadores de uso muestran lo que hacen los visitantes",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de un sitio o plataforma web?",
            answer:
              "Las páginas, flujos, permisos e integraciones definen el costo según el alcance acordado.",
          },
          {
            question: "¿Cómo funciona el lanzamiento?",
            answer:
              "Publicamos las páginas esenciales y evolucionamos según el uso observado.",
          },
          {
            question: "¿Qué llevar a la primera conversación?",
            answer:
              "Público, tareas prioritarias, contenido disponible y referencias que aclaren el objetivo.",
          },
          {
            question: "¿Qué pasa después de que el sitio sale en línea?",
            answer:
              "El rendimiento, la disponibilidad y las mejoras pueden incluirse en Continuous Engineering, con alcance y atención acordados.",
          },
        ],
        shortSummary:
          "Portales y plataformas para que clientes y equipos completen tareas.",
      },
    },
  },
  {
    id: "mobile-apps",
    icon: "Smartphone",
    accent: "terracotta",
    deliverablesLayout: "timeline",
    stack: ["aws"],
    pillar: "software",
    technologies: ["React Native", "TypeScript", "Node.js"],
    copy: {
      "pt-BR": {
        slug: "aplicativos",
        title: "Aplicativos para celular",
        summary:
          "Aplicativos para operações de campo e tarefas pelo celular, com integrações e requisitos de conectividade definidos com sua equipe.",
        intro:
          "Registre visitas, vistorias e vendas no momento do trabalho. Definimos tarefas, dispositivos e conectividade para testar em uso real.",
        problems: [
          "A equipe de campo ainda anota em papel ou planilha.",
          "O aplicativo atual trava sem sinal forte.",
          "Clientes ou equipe precisam concluir uma tarefa pelo celular.",
          "Você quer um app só para Android e iPhone, sem construir dois.",
        ],
        deliverables: [
          "Fluxos prioritários validados com usuários",
          "Aplicativo para as plataformas definidas no escopo",
          "Regras de sincronização e testes offline, quando necessários",
          "Integração com os sistemas autorizados",
          "Plano de distribuição, documentação e requisitos das lojas",
        ],
        measure: [
          "Tempo de entrada de dados no processo atual e meta para o app",
          "Cenários de conexão fraca testados antes do lançamento",
          "Equipe de campo valida o fluxo principal antes da publicação",
        ],
        faq: [
          {
            question: "O que influencia o custo de um aplicativo?",
            answer:
              "Telas, integrações e requisitos offline definem o esforço e o valor do escopo.",
          },
          {
            question: "Como vocês conduzem o desenvolvimento?",
            answer:
              "Validamos a tarefa principal com usuários antes de ampliar o aplicativo.",
          },
          {
            question: "O que vocês precisam da nossa equipe?",
            answer:
              "Acesso aos usuários e aos sistemas que o aplicativo precisa integrar.",
          },
          {
            question: "Um app para as duas plataformas ou dois apps nativos?",
            answer:
              "Uma base comum costuma simplificar a manutenção. Requisitos nativos são avaliados antes da decisão.",
          },
        ],
        shortSummary:
          "Aplicativos para operações de campo e tarefas pelo celular.",
      },
      en: {
        slug: "mobile-apps",
        title: "Mobile apps",
        summary:
          "Apps for field operations and mobile tasks, with integrations and connectivity requirements defined with your team.",
        intro:
          "Record visits, inspections and sales as work happens. We define tasks, devices and connectivity for testing in real use.",
        problems: [
          "The field team still writes things down on paper or spreadsheets.",
          "The current app freezes without a strong signal.",
          "Clients or staff need to finish a task from their phone.",
          "You want one app for Android and iPhone, not two.",
        ],
        deliverables: [
          "Priority workflows validated with users",
          "App for the platforms defined in scope",
          "Synchronization rules and offline tests where required",
          "Integration with authorized systems",
          "Distribution plan, documentation and app store requirements",
        ],
        measure: [
          "Data entry time in the current process and a target for the app",
          "Weak-connection scenarios tested before launch",
          "Field team validates the main flow before publishing",
        ],
        faq: [
          {
            question: "What affects the cost of a mobile app?",
            answer:
              "Screens, integrations and offline requirements determine the effort and scoped cost.",
          },
          {
            question: "How do you run the development?",
            answer:
              "We validate the main task with users before expanding the app.",
          },
          {
            question: "What do you need from our team?",
            answer:
              "Access to users and the systems the app needs to integrate with.",
          },
          {
            question: "One app for both platforms or two native apps?",
            answer:
              "A shared codebase often simplifies maintenance. Native requirements are assessed before deciding.",
          },
        ],
        shortSummary: "Apps for field operations and mobile tasks.",
      },
      es: {
        slug: "aplicaciones-moviles",
        title: "Aplicaciones móviles",
        summary:
          "Aplicaciones para operaciones de campo y tareas móviles, con integraciones y requisitos de conectividad definidos con tu equipo.",
        intro:
          "Registra visitas, inspecciones y ventas durante el trabajo. Definimos tareas, dispositivos y conectividad para probar en uso real.",
        problems: [
          "El equipo de campo todavía anota en papel u hojas de cálculo.",
          "La aplicación actual se traba sin señal fuerte.",
          "Clientes o equipo necesitan terminar una tarea desde el celular.",
          "Quieres una sola app para Android e iPhone, no dos.",
        ],
        deliverables: [
          "Flujos prioritarios validados con usuarios",
          "Aplicación para las plataformas definidas en el alcance",
          "Reglas de sincronización y pruebas sin conexión cuando sean necesarias",
          "Integración con los sistemas autorizados",
          "Plan de distribución, documentación y requisitos de las tiendas",
        ],
        measure: [
          "Tiempo de carga de datos del proceso actual y una meta para la app",
          "Escenarios de conexión débil probados antes del lanzamiento",
          "El equipo de campo valida el flujo principal antes de publicar",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de una aplicación móvil?",
            answer:
              "Las pantallas, integraciones y requisitos offline definen el esfuerzo y el costo del alcance.",
          },
          {
            question: "¿Cómo conducen el desarrollo?",
            answer:
              "Validamos la tarea principal con usuarios antes de ampliar la aplicación.",
          },
          {
            question: "¿Qué necesitan de nuestro equipo?",
            answer:
              "Acceso a los usuarios y a los sistemas que la aplicación debe integrar.",
          },
          {
            question: "¿Una app para las dos plataformas o dos apps nativas?",
            answer:
              "Una base común suele simplificar el mantenimiento. Evaluamos los requisitos nativos antes de decidir.",
          },
        ],
        shortSummary:
          "Aplicaciones para operaciones de campo y tareas desde el celular.",
      },
    },
  },
  {
    id: "integrations",
    icon: "Network",
    accent: "sage",
    deliverablesLayout: "checklist",
    stack: ["aws"],
    pillar: "software",
    supportPillars: ["ai"],
    technologies: ["Node.js", "NestJS", "Python", "Redis"],
    copy: {
      "pt-BR": {
        slug: "integracoes-e-automacao",
        title: "Integrações e automação",
        summary:
          "Integrações para reduzir digitação repetida e atrasos entre sistemas. Escopo delimitado, tratamento de falhas e documentação operacional.",
        intro:
          "Reduza transferências manuais entre ferramentas. Começamos por um fluxo, com regras de conferência e responsável definidos.",
        problems: [
          "Alguém digita a mesma informação em dois ou mais sistemas.",
          "Sistemas de laboratório, pagamento ou login precisam conversar.",
          "Etapas manuais entre sistemas atrasam ou erram, e o cliente sente.",
          "A planilha virou a ponte entre ferramentas e não aguenta mais.",
        ],
        deliverables: [
          "Mapa do fluxo, fontes de dados e regras de negócio",
          "Integração delimitada com os sistemas acordados",
          "Tratamento de erros, duplicidades e reprocessamento",
          "Testes de ponta a ponta e evidências de aceite",
          "Monitoramento previsto no escopo e instruções de operação",
        ],
        measure: [
          "Retrabalho e erros de digitação, antes e depois",
          "Falhas entre sistemas registradas, com cobertura definida no aceite",
          "Tempo para perceber uma falha e quem recebe o aviso",
        ],
        faq: [
          {
            question: "O que influencia o custo de uma integração?",
            answer:
              "Quantidade de sistemas, documentação e limitações de acesso definem o esforço e o valor.",
          },
          {
            question: "Como a implantação afeta a operação?",
            answer:
              "Testamos antes da implantação e acordamos falhas, janela de mudança e reversão antes de alterar produção.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acessos de leitura ou teste e alguém que conheça o uso dos sistemas.",
          },
          {
            question: "Como funciona a continuidade após a entrega?",
            answer:
              "Documentação integra a entrega. Suporte, monitoramento e evolução dependem de capacidade e contrato, com escopo e atendimento definidos.",
          },
        ],
        shortSummary:
          "Conecte sistemas para reduzir digitação repetida e atrasos.",
      },
      en: {
        slug: "integrations-and-automation",
        title: "Integrations and automation",
        summary:
          "Integrations to reduce repeated data entry and delays between systems. Defined scope, failure handling and operating documentation.",
        intro:
          "Reduce manual transfers between tools. We start with one workflow, with defined checks and ownership.",
        problems: [
          "Someone types the same information into two or more systems.",
          "Lab, payment or login systems need to talk to each other.",
          "Manual steps between systems cause delays or errors, and customers feel them.",
          "The spreadsheet became the bridge between tools and can't carry it anymore.",
        ],
        deliverables: [
          "Workflow map, data sources and business rules",
          "Bounded integration with the agreed systems",
          "Error, duplicate and retry handling",
          "End-to-end tests and acceptance evidence",
          "Monitoring in scope and operating instructions",
        ],
        measure: [
          "Rework and typing errors, before and after",
          "Failures between systems logged, with coverage defined at acceptance",
          "Time to notice a failure and who gets the alert",
        ],
        faq: [
          {
            question: "What affects the cost of an integration?",
            answer:
              "System count, documentation and access constraints determine effort and cost.",
          },
          {
            question: "How does deployment affect operations?",
            answer:
              "We test before deployment and agree on failure handling, change windows and rollback before changing production.",
          },
          {
            question: "What access do you need?",
            answer:
              "Read or test access and someone familiar with how the systems are used.",
          },
          {
            question: "How does continuity work after delivery?",
            answer:
              "Documentation is included in delivery. Support, monitoring and improvements depend on capacity and a contract with defined scope and service terms.",
          },
        ],
        shortSummary:
          "Connect systems to reduce repeated data entry and delays.",
      },
      es: {
        slug: "integraciones-y-automatizacion",
        title: "Integraciones y automatización",
        summary:
          "Integraciones para reducir la carga repetida de datos y las demoras entre sistemas. Alcance delimitado, manejo de fallas y documentación operativa.",
        intro:
          "Reduce las transferencias manuales entre herramientas. Empezamos por un flujo, con reglas de verificación y responsable definidos.",
        problems: [
          "Alguien digita la misma información en dos o más sistemas.",
          "Sistemas de laboratorio, pago o acceso necesitan conversar.",
          "Pasos manuales entre sistemas generan demoras o errores, y el cliente lo nota.",
          "La hoja de cálculo se volvió el puente entre herramientas y ya no aguanta.",
        ],
        deliverables: [
          "Mapa del flujo, fuentes de datos y reglas de negocio",
          "Integración delimitada con los sistemas acordados",
          "Tratamiento de errores, duplicados y reprocesamiento",
          "Pruebas de extremo a extremo y evidencias de aceptación",
          "Monitoreo previsto en el alcance e instrucciones de operación",
        ],
        measure: [
          "Retrabajo y errores de digitación, antes y después",
          "Fallas entre sistemas registradas, con cobertura definida en la aceptación",
          "Tiempo para notar una falla y quién recibe el aviso",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de una integración?",
            answer:
              "La cantidad de sistemas, documentación y límites de acceso definen el esfuerzo y el costo.",
          },
          {
            question: "¿Cómo afecta la implantación a la operación?",
            answer:
              "Probamos antes de implementar y acordamos gestión de fallos, ventana de cambio y reversión antes de modificar producción.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Accesos de lectura o prueba y alguien que conozca el uso de los sistemas.",
          },
          {
            question: "¿Cómo funciona la continuidad después de la entrega?",
            answer:
              "La documentación forma parte de la entrega. Soporte, monitoreo y mejoras dependen de capacidad y contrato, con alcance y atención definidos.",
          },
        ],
        shortSummary:
          "Conecta sistemas para reducir la digitación repetida y los retrasos.",
      },
    },
  },
  {
    id: "modernization",
    icon: "RefreshCw",
    accent: "terracotta",
    deliverablesLayout: "timeline",
    stack: ["aws"],
    pillar: "software",
    supportPillars: ["cloud"],
    technologies: ["TypeScript", "Python", "Django", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "modernizacao-de-sistemas",
        title: "Modernização de sistemas legados",
        summary:
          "Modernização de sistemas legados por etapas, com prioridades de negócio, testes e plano de reversão para cada mudança acordada.",
        intro:
          "Mudanças lentas ou arriscadas pedem prioridades claras. Avaliamos dependências e modernizamos um componente por vez, com testes e reversão planejados.",
        problems: [
          "Toda funcionalidade nova demora porque o código resiste à mudança.",
          "O sistema funciona, mas ninguém quer mexer nele.",
          "Uma reescrita grande pode parar a empresa por meses.",
          "Relatórios lentos ou com números em que ninguém confia.",
        ],
        deliverables: [
          "Diagnóstico do componente e das dependências",
          "Plano de evolução priorizado por impacto e risco",
          "Incremento de modernização com escopo definido",
          "Testes de regressão e plano de reversão ou recuperação",
          "Documentação das mudanças e orientação de continuidade",
        ],
        measure: [
          "Tempo de entrega de mudanças, medido antes de começar",
          "Cada etapa com critério de teste e plano de reversão",
          "Cobertura de testes registrada nas áreas alteradas",
        ],
        faq: [
          {
            question: "O que influencia o custo de uma modernização?",
            answer:
              "Código, dependências e testes existentes definem o esforço. O diagnóstico orienta o escopo e o valor.",
          },
          {
            question: "Como modernizam sem parar a empresa?",
            answer:
              "Por etapas testadas, com reversão planejada. Eventuais pausas são acordadas antes da mudança.",
          },
          {
            question: "O que vocês precisam da nossa equipe?",
            answer:
              "Acesso ao código, à infraestrutura e a quem conhece o histórico do sistema.",
          },
          {
            question: "Vocês trocam toda a nossa stack?",
            answer:
              "Mantemos o que funciona. O diagnóstico define quais componentes precisam mudar.",
          },
        ],
        shortSummary:
          "Evolua sistemas legados por etapas, com testes e reversão.",
      },
      en: {
        slug: "system-modernization",
        title: "Legacy application modernization",
        summary:
          "Step-by-step legacy modernization with business priorities, tests and a rollback plan for each agreed change.",
        intro:
          "Slow or risky changes need clear priorities. We assess dependencies and modernize one component at a time, with planned tests and rollback.",
        problems: [
          "Every new feature takes long because the code resists change.",
          "The system works, but nobody wants to touch it.",
          "A big rewrite could stop the company for months.",
          "Slow reports, or numbers nobody trusts.",
        ],
        deliverables: [
          "Assessment of the component and its dependencies",
          "Evolution plan prioritized by impact and risk",
          "Modernization increment with defined scope",
          "Regression tests and rollback or recovery plan",
          "Change documentation and continuity guidance",
        ],
        measure: [
          "Lead time for changes, measured before we start",
          "Every stage with a test criterion and a rollback plan",
          "Test coverage recorded in the areas we changed",
        ],
        faq: [
          {
            question: "What affects the cost of a modernization?",
            answer:
              "Code, dependencies and existing tests determine effort. The assessment informs scope and pricing.",
          },
          {
            question: "How do you modernize without stopping the company?",
            answer:
              "In tested stages, with planned rollback. Any downtime is agreed before the change.",
          },
          {
            question: "What do you need from our team?",
            answer:
              "Access to code, infrastructure and people familiar with the system’s history.",
          },
          {
            question: "Do you replace our whole stack?",
            answer:
              "We keep what works. The assessment identifies which components need to change.",
          },
        ],
        shortSummary:
          "Evolve legacy systems in stages, with tests and rollback plans.",
      },
      es: {
        slug: "modernizacion-de-sistemas",
        title: "Modernización de sistemas heredados",
        summary:
          "Modernización gradual de sistemas legados, con prioridades de negocio, pruebas y plan de reversión para cada cambio acordado.",
        intro:
          "Los cambios lentos o riesgosos requieren prioridades claras. Evaluamos dependencias y modernizamos un componente por vez, con pruebas y reversión planificadas.",
        problems: [
          "Cada función nueva tarda porque el código se resiste al cambio.",
          "El sistema funciona, pero nadie quiere tocarlo.",
          "Una reescritura grande puede detener la empresa por meses.",
          "Informes lentos o con números en los que nadie confía.",
        ],
        deliverables: [
          "Diagnóstico del componente y sus dependencias",
          "Plan de evolución priorizado por impacto y riesgo",
          "Incremento de modernización con alcance definido",
          "Pruebas de regresión y plan de reversión o recuperación",
          "Documentación de cambios e instrucciones de continuidad",
        ],
        measure: [
          "Tiempo de entrega de cambios, medido antes de empezar",
          "Cada etapa con criterio de prueba y plan de reversión",
          "Cobertura de pruebas registrada en las áreas modificadas",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de una modernización?",
            answer:
              "El código, las dependencias y las pruebas existentes definen el esfuerzo. El diagnóstico orienta el alcance y el precio.",
          },
          {
            question: "¿Cómo modernizan sin detener la empresa?",
            answer:
              "Por etapas probadas, con reversión planificada. Las posibles pausas se acuerdan antes del cambio.",
          },
          {
            question: "¿Qué necesitan de nuestro equipo?",
            answer:
              "Acceso al código, a la infraestructura y a quienes conocen la historia del sistema.",
          },
          {
            question: "¿Cambian todo nuestro stack?",
            answer:
              "Mantenemos lo que funciona. El diagnóstico define qué componentes deben cambiar.",
          },
        ],
        shortSummary:
          "Moderniza sistemas heredados por etapas, con pruebas y reversión.",
      },
    },
  },
  {
    id: "applied-ai",
    icon: "Sparkles",
    accent: "sky",
    deliverablesLayout: "timeline",
    stack: ["bedrock", "mcp", "aws"],
    pillar: "ai",
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector"],
    copy: {
      "pt-BR": {
        slug: "inteligencia-artificial",
        title: "Inteligência artificial aplicada",
        summary:
          "Avalie IA em uma tarefa de negócio com protótipo, critérios de qualidade, custo por tarefa e revisão humana antes de ampliar o investimento.",
        intro:
          "Compare um protótipo ao processo atual, avaliando qualidade, custo e revisão humana. A Iris demonstra atendimento inicial interno, sem comprovar resultados de clientes.",
        problems: [
          "A equipe ou os clientes repetem as mesmas perguntas, e alguém procura a resposta toda vez.",
          "A informação está espalhada em documentos, planilhas e sistemas.",
          "Você quer IA no produto, mas teme respostas erradas ou custo fora de controle.",
          "Você quer automatizar uma tarefa com várias etapas, não só responder perguntas.",
        ],
        deliverables: [
          "Tarefa, dados autorizados e ações permitidas documentados",
          "Protótipo delimitado com fontes de informação identificadas",
          "Conjunto de avaliação com exemplos reais e situações de erro",
          "Relatório de qualidade, custo por tarefa e esforço de revisão",
          "Limites, controles de acesso e recomendação sobre continuidade",
        ],
        measure: [
          "Tarefa, dados e o que conta como resposta correta, definidos antes de construir",
          "Qualidade avaliada com perguntas reais, custo por tarefa acompanhado",
          "Acesso e revisão humana definidos por tipo de tarefa",
        ],
        faq: [
          {
            question: "O que entra no custo de um projeto de IA?",
            answer:
              "Dados, integrações, desenvolvimento e avaliação, além de modelos, infraestrutura e revisão humana. O protótipo ajuda a estimar esses custos.",
          },
          {
            question: "Como começa o primeiro projeto de IA?",
            answer:
              "Definimos uma tarefa e avaliamos acertos, falhas, custo e revisão. Os resultados orientam continuar, ajustar ou encerrar. Produção exige escopo próprio.",
          },
          {
            question: "O que precisamos ter pronto?",
            answer:
              "Dados autorizados e alguém capaz de avaliar a qualidade das respostas.",
          },
          {
            question: "Como funciona a continuidade após a entrega?",
            answer:
              "Documentação integra a entrega. Suporte, monitoramento e evolução dependem de capacidade e contrato, com escopo e atendimento definidos.",
          },
        ],
        shortSummary: "Teste IA em uma tarefa antes de ampliar o investimento.",
      },
      en: {
        slug: "applied-ai",
        title: "Applied AI",
        summary:
          "Evaluate AI on a business task with a prototype, quality criteria, cost per task and human review before increasing the investment.",
        intro:
          "Compare a prototype with the current process, assessing quality, cost and human review. Iris demonstrates internal initial intake, without proving client outcomes.",
        problems: [
          "Staff or customers keep asking the same questions, and someone looks up the answer every time.",
          "Information is scattered across documents, spreadsheets and systems.",
          "You want AI in your product, but fear wrong answers or runaway cost.",
          "You want to automate a multi-step task, not just answer questions.",
        ],
        deliverables: [
          "Documented task, authorized data and permitted actions",
          "Bounded prototype with identified information sources",
          "Evaluation set with real examples and error scenarios",
          "Report on quality, cost per task and review effort",
          "Limits, access controls and a recommendation on next steps",
        ],
        measure: [
          "Task, data and what counts as a correct answer, defined before building",
          "Quality evaluated with real questions, cost per task tracked",
          "Access and human review set by task type",
        ],
        faq: [
          {
            question: "What goes into the cost of an AI project?",
            answer:
              "Data, integrations, development and evaluation, plus models, infrastructure and human review. The prototype helps estimate these costs.",
          },
          {
            question: "How does a first AI project start?",
            answer:
              "We define a task and assess accuracy, failures, cost and review. Results guide whether to proceed, adjust or stop. Production needs its own scope.",
          },
          {
            question: "What do we need to have ready?",
            answer:
              "Authorized data and someone who can assess response quality.",
          },
          {
            question: "How does continuity work after delivery?",
            answer:
              "Documentation is included in delivery. Support, monitoring and improvements depend on capacity and a contract with defined scope and service terms.",
          },
        ],
        shortSummary: "Test AI on one task before expanding your investment.",
      },
      es: {
        slug: "inteligencia-artificial",
        title: "Inteligencia artificial aplicada",
        summary:
          "Evalúa IA en una tarea de negocio con prototipo, criterios de calidad, costo por tarea y revisión humana antes de ampliar la inversión.",
        intro:
          "Compara un prototipo con el proceso actual, evaluando calidad, costo y revisión humana. Iris demuestra atención inicial interna, sin acreditar resultados de clientes.",
        problems: [
          "El equipo o los clientes repiten las mismas preguntas y alguien busca la respuesta cada vez.",
          "La información está dispersa en documentos, hojas de cálculo y sistemas.",
          "Quieres IA en el producto, pero temes respuestas erróneas o costo fuera de control.",
          "Quieres automatizar una tarea de varios pasos, no solo responder preguntas.",
        ],
        deliverables: [
          "Tarea, datos autorizados y acciones permitidas documentados",
          "Prototipo delimitado con fuentes de información identificadas",
          "Conjunto de evaluación con ejemplos reales y situaciones de error",
          "Informe de calidad, costo por tarea y esfuerzo de revisión",
          "Límites, controles de acceso y recomendación sobre continuidad",
        ],
        measure: [
          "Tarea, datos y qué cuenta como respuesta correcta, definidos antes de construir",
          "Calidad evaluada con preguntas reales, costo por tarea seguido",
          "Acceso y revisión humana definidos por tipo de tarea",
        ],
        faq: [
          {
            question: "¿Qué incluye el costo de un proyecto de IA?",
            answer:
              "Datos, integraciones, desarrollo y evaluación, además de modelos, infraestructura y revisión humana. El prototipo ayuda a estimar estos costos.",
          },
          {
            question: "¿Cómo empieza el primer proyecto de IA?",
            answer:
              "Definimos una tarea y evaluamos aciertos, fallos, costo y revisión. Los resultados orientan continuar, ajustar o cerrar. Producción requiere alcance propio.",
          },
          {
            question: "¿Qué necesitamos tener listo?",
            answer:
              "Datos autorizados y alguien capaz de evaluar la calidad de las respuestas.",
          },
          {
            question: "¿Cómo funciona la continuidad después de la entrega?",
            answer:
              "La documentación forma parte de la entrega. Soporte, monitoreo y mejoras dependen de capacidad y contrato, con alcance y atención definidos.",
          },
        ],
        shortSummary: "Prueba IA en una tarea antes de ampliar la inversión.",
      },
    },
  },
  {
    id: "data",
    icon: "Database",
    accent: "terracotta",
    deliverablesLayout: "checklist",
    stack: ["aws"],
    pillar: "software",
    supportPillars: ["cloud", "ai"],
    technologies: ["PostgreSQL", "Python", "Redis", "AWS"],
    copy: {
      "pt-BR": {
        slug: "dados-e-relatorios",
        title: "Dados e relatórios",
        summary:
          "Dados e relatórios para decisões operacionais, com fontes rastreáveis, regras de cálculo e critérios de qualidade definidos.",
        intro:
          "Partimos da decisão para definir fontes, cálculos e responsáveis. Você acompanha a origem dos indicadores e as falhas de atualização.",
        problems: [
          "Times diferentes mostram números diferentes para a mesma coisa.",
          "Para ter um relatório, alguém precisa extrair os dados à mão.",
          "Os dados vivem em sistemas separados, sem uma fonte única.",
          "Você decide no feeling porque o número demora a chegar.",
        ],
        deliverables: [
          "Inventário de fontes e definição dos indicadores",
          "Fluxos de coleta e atualização previstos no escopo",
          "Regras de qualidade e conciliação dos dados",
          "Relatórios ou painéis voltados às decisões acordadas",
          "Dicionário de dados e instruções para tratar falhas",
        ],
        measure: [
          "Números que divergem hoje, com uma fonte única para cada um",
          "Tempo para obter um relatório, antes e depois",
          "Origem e regra de cálculo documentadas em cada indicador",
        ],
        faq: [
          {
            question: "O que influencia o custo de um projeto de dados?",
            answer:
              "Quantidade e qualidade das fontes definem o esforço. O valor depende do escopo acordado.",
          },
          {
            question: "Como vocês constroem painéis e fluxos de dados?",
            answer:
              "Partimos da decisão e construímos o fluxo de dados necessário para apoiá-la.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acesso às fontes e a quem usa os indicadores para decidir.",
          },
          {
            question: "Como funciona a continuidade após a entrega?",
            answer:
              "Documentação integra a entrega. Suporte, monitoramento e evolução dependem de capacidade e contrato, com escopo e atendimento definidos.",
          },
        ],
        shortSummary:
          "Relatórios com fontes rastreáveis e critérios de qualidade.",
      },
      en: {
        slug: "data-and-reporting",
        title: "Data and reporting",
        summary:
          "Data and reporting for operational decisions, with traceable sources, calculation rules and defined quality criteria.",
        intro:
          "We start with the decision to define sources, calculations and owners. You can trace indicators and track update failures.",
        problems: [
          "Different teams show different numbers for the same thing.",
          "Getting a report means someone pulls the data by hand.",
          "Data lives in separate systems, with no single source.",
          "You decide by gut feeling because numbers arrive too late.",
        ],
        deliverables: [
          "Source inventory and indicator definitions",
          "Data collection and update flows in scope",
          "Data quality and reconciliation rules",
          "Reports or dashboards for the agreed decisions",
          "Data dictionary and failure handling instructions",
        ],
        measure: [
          "Numbers that diverge today, with a single source for each",
          "Time to get a report, before and after",
          "Origin and calculation rule documented for every indicator",
        ],
        faq: [
          {
            question: "What affects the cost of a data project?",
            answer:
              "The number and quality of sources determine effort. Pricing depends on the agreed scope.",
          },
          {
            question: "How do you build dashboards and data flows?",
            answer:
              "We start with the decision and build the data flow needed to support it.",
          },
          {
            question: "What access do you need?",
            answer:
              "Access to sources and people who use the indicators to make decisions.",
          },
          {
            question: "How does continuity work after delivery?",
            answer:
              "Documentation is included in delivery. Support, monitoring and improvements depend on capacity and a contract with defined scope and service terms.",
          },
        ],
        shortSummary: "Reports with traceable sources and quality criteria.",
      },
      es: {
        slug: "datos-e-informes",
        title: "Datos e informes",
        summary:
          "Datos e informes para decisiones operativas, con fuentes rastreables, reglas de cálculo y criterios de calidad definidos.",
        intro:
          "Partimos de la decisión para definir fuentes, cálculos y responsables. Puedes rastrear los indicadores y seguir los fallos de actualización.",
        problems: [
          "Equipos distintos muestran números distintos para lo mismo.",
          "Para tener un informe, alguien debe extraer los datos a mano.",
          "Los datos viven en sistemas separados, sin una fuente única.",
          "Decides por intuición porque el número tarda en llegar.",
        ],
        deliverables: [
          "Inventario de fuentes y definición de indicadores",
          "Flujos de recopilación y actualización previstos en el alcance",
          "Reglas de calidad y conciliación de datos",
          "Informes o paneles para las decisiones acordadas",
          "Diccionario de datos e instrucciones para tratar fallas",
        ],
        measure: [
          "Números que hoy divergen, con una fuente única para cada uno",
          "Tiempo para obtener un informe, antes y después",
          "Origen y regla de cálculo documentados en cada indicador",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de un proyecto de datos?",
            answer:
              "La cantidad y calidad de las fuentes definen el esfuerzo. El precio depende del alcance acordado.",
          },
          {
            question: "¿Cómo construyen paneles y flujos de datos?",
            answer:
              "Partimos de la decisión y construimos el flujo de datos necesario para apoyarla.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Acceso a las fuentes y a quienes usan los indicadores para decidir.",
          },
          {
            question: "¿Cómo funciona la continuidad después de la entrega?",
            answer:
              "La documentación forma parte de la entrega. Soporte, monitoreo y mejoras dependen de capacidad y contrato, con alcance y atención definidos.",
          },
        ],
        shortSummary:
          "Informes con fuentes rastreables y criterios de calidad.",
      },
    },
  },
  {
    id: "cloud",
    icon: "Cloud",
    accent: "sage",
    deliverablesLayout: "timeline",
    stack: ["aws"],
    pillar: "cloud",
    technologies: ["AWS", "GitHub", "Node.js", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "nuvem-e-arquitetura",
        title: "Consultoria AWS e arquitetura cloud",
        summary:
          "Consultoria AWS para avaliar custos, arquitetura e riscos. Diagnóstico e plano priorizado para otimização, migração e evolução do ambiente.",
        intro:
          "Avalie custos, riscos e arquitetura do seu ambiente AWS. O diagnóstico define prioridades e premissas de investimento; a execução tem escopo próprio.",
        problems: [
          "O sistema fica lento ou cai nos horários de pico.",
          "Você só sabe que algo quebrou quando um cliente avisa.",
          "A conta de nuvem só cresce e ninguém sabe por quê.",
          "Você vai crescer e não sabe se a estrutura aguenta.",
        ],
        deliverables: [
          "Inventário do ambiente e registro de custos e riscos",
          "Arquitetura proposta e comparação das alternativas",
          "Plano priorizado de mudanças, dependências e estimativas",
          "Critérios de monitoramento, backup e recuperação",
          "Quando contratada, mudança delimitada com testes e documentação",
        ],
        measure: [
          "Metas de disponibilidade, desempenho e custo mensal, a partir das medições atuais",
          "Alertas e plano de recuperação testados com a sua equipe",
          "Custo da nuvem por serviço, para ver o que mudou a cada ajuste",
        ],
        faq: [
          {
            question: "Como vocês avaliam a redução de custos na AWS?",
            answer:
              "Comparamos custo e uso, considerando volume de trabalho, compromissos existentes e risco. A estimativa inclui o custo da mudança e precisa ser validada na operação. Não garantimos um percentual de economia.",
          },
          {
            question: "O que define o custo de nuvem e infraestrutura?",
            answer:
              "Uso real, arquitetura e recursos necessários definem o custo. Avaliamos alternativas conforme desempenho e escopo.",
          },
          {
            question: "Como planejam mudanças em um ambiente existente?",
            answer:
              "O diagnóstico orienta escopo, ensaio, aceite, janela de mudança e recuperação. Avaliamos o impacto na operação antes da execução.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acesso à infraestrutura e ao monitoramento, com histórico de incidentes e horários de pico.",
          },
          {
            question: "Vocês continuam cuidando depois do projeto?",
            answer:
              "Continuous Engineering pode cobrir a continuidade, conforme contrato. Também podemos preparar documentação e monitoramento para sua equipe operar.",
          },
        ],
        shortSummary:
          "Avalie custo, confiabilidade e riscos do seu ambiente AWS.",
      },
      en: {
        slug: "cloud-and-architecture",
        title: "AWS consulting and architecture",
        summary:
          "AWS consulting to assess costs, architecture and risks. Get an assessment and prioritized plan for optimization, migration and infrastructure evolution.",
        intro:
          "Assess the costs, risks and architecture of your AWS environment. The assessment sets priorities and investment assumptions; execution has its own scope.",
        problems: [
          "The system slows down or goes down at peak times.",
          "You only learn something broke when a customer tells you.",
          "The cloud bill keeps growing and nobody knows why.",
          "You're about to grow and don't know if the setup can take it.",
        ],
        deliverables: [
          "Environment inventory and record of costs and risks",
          "Proposed architecture and comparison of alternatives",
          "Prioritized change plan, dependencies and estimates",
          "Monitoring, backup and recovery criteria",
          "When contracted, a bounded change with tests and documentation",
        ],
        measure: [
          "Availability, performance and monthly cost targets, from current measurements",
          "Alerts and recovery plan tested with your team",
          "Cloud cost per service, to see what changed after each adjustment",
        ],
        faq: [
          {
            question: "How do you assess AWS cost reduction?",
            answer:
              "We compare costs and usage, considering workload volume, existing commitments and risk. Estimates include the cost of change and must be validated in operation. We do not guarantee a savings percentage.",
          },
          {
            question: "What sets the cost of cloud and infrastructure?",
            answer:
              "Actual usage, architecture and required resources determine cost. We assess options against performance and scope.",
          },
          {
            question: "How do you plan changes to an existing environment?",
            answer:
              "The assessment informs scope, rehearsal, acceptance, change windows and recovery. We assess operational impact before execution.",
          },
          {
            question: "What access do you need?",
            answer:
              "Access to infrastructure and monitoring, with incident history and peak usage times.",
          },
          {
            question: "Do you keep looking after it once the project ends?",
            answer:
              "Continuous Engineering can cover ongoing support under agreed terms. We can also prepare documentation and monitoring for your team.",
          },
        ],
        shortSummary:
          "Assess cost, reliability and risks in your AWS environment.",
      },
      es: {
        slug: "nube-y-arquitectura",
        title: "Consultoría AWS y arquitectura cloud",
        summary:
          "Consultoría AWS para evaluar costos, arquitectura y riesgos. Diagnóstico y plan priorizado para optimización, migración y evolución del entorno.",
        intro:
          "Evalúa costos, riesgos y arquitectura de tu entorno AWS. El diagnóstico define prioridades y supuestos de inversión; la ejecución tiene alcance propio.",
        problems: [
          "El sistema se vuelve lento o se cae en horas pico.",
          "Solo te enteras de que algo falló cuando un cliente avisa.",
          "La cuenta de la nube solo crece y nadie sabe por qué.",
          "Vas a crecer y no sabes si la estructura aguanta.",
        ],
        deliverables: [
          "Inventario del entorno y registro de costos y riesgos",
          "Arquitectura propuesta y comparación de alternativas",
          "Plan priorizado de cambios, dependencias y estimaciones",
          "Criterios de monitoreo, respaldo y recuperación",
          "Cuando se contrata, cambio delimitado con pruebas y documentación",
        ],
        measure: [
          "Metas de disponibilidad, desempeño y costo mensual, a partir de las mediciones actuales",
          "Alertas y plan de recuperación probados con tu equipo",
          "Costo de la nube por servicio, para ver qué cambió con cada ajuste",
        ],
        faq: [
          {
            question: "¿Cómo evalúan la reducción de costos en AWS?",
            answer:
              "Comparamos costo y uso, considerando volumen de trabajo, compromisos existentes y riesgo. La estimación incluye el costo del cambio y debe validarse en operación. No garantizamos un porcentaje de ahorro.",
          },
          {
            question: "¿Qué define el costo de nube e infraestructura?",
            answer:
              "El uso real, la arquitectura y los recursos necesarios definen el costo. Evaluamos alternativas según rendimiento y alcance.",
          },
          {
            question: "¿Cómo planifican cambios en un entorno existente?",
            answer:
              "El diagnóstico orienta alcance, ensayo, aceptación, ventana de cambio y recuperación. Evaluamos el impacto operativo antes de ejecutar.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Acceso a infraestructura y monitoreo, con historial de incidentes y horarios de mayor uso.",
          },
          {
            question: "¿Siguen cuidándolo después del proyecto?",
            answer:
              "Continuous Engineering puede cubrir la continuidad según contrato. También podemos preparar documentación y monitoreo para tu equipo.",
          },
        ],
        shortSummary:
          "Evalúa costos, confiabilidad y riesgos de tu entorno AWS.",
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

const relatedServiceIds: Record<ServiceId, ServiceId[]> = {
  "custom-software": ["integrations", "modernization", "web-platforms"],
  "web-platforms": ["custom-software", "integrations", "cloud"],
  "mobile-apps": ["custom-software", "integrations", "cloud"],
  integrations: ["custom-software", "data", "applied-ai"],
  modernization: ["cloud", "custom-software", "integrations"],
  "applied-ai": ["data", "integrations", "cloud"],
  data: ["integrations", "cloud", "applied-ai"],
  cloud: ["modernization", "data", "applied-ai"],
};

export function relatedServices(service: Service, count = 3) {
  const ids = [
    ...relatedServiceIds[service.id],
    ...services.map((item) => item.id),
  ];
  return [...new Set(ids)]
    .filter((id) => id !== service.id)
    .slice(0, Math.max(0, count))
    .map((id) => services.find((item) => item.id === id)!);
}

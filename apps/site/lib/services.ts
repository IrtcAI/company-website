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
          "Quando as ferramentas atuais não atendem a um processo importante, avaliamos o custo de adaptar, integrar ou construir. O primeiro escopo cobre um fluxo prioritário, com usuários, regras e critérios de aceite definidos.",
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
              "Principalmente o tamanho da primeira versão: fluxos, integrações e perfis de usuário. Definimos isso juntos antes de escrever código. O valor depende do escopo combinado.",
          },
          {
            question: "Como o projeto sai da ideia até um sistema funcionando?",
            answer:
              "Em etapas curtas, com demonstrações frequentes. Você vê software funcionando cedo, e as prioridades mudam conforme aprendemos com os usuários.",
          },
          {
            question: "O que preciso ter pronto antes de começarmos?",
            answer:
              "Uma descrição do problema e, se possível, acesso a quem lida com ele todo dia. Não precisa de especificação fechada: ela nasce na descoberta.",
          },
          {
            question: "Como vocês decidem qual tecnologia usar?",
            answer:
              "Depois de entender o problema, não antes. A escolha considera sua equipe, seu orçamento e como o sistema precisa crescer.",
          },
        ],
      },
      en: {
        slug: "custom-software",
        title: "Custom software",
        summary:
          "Custom software for processes that hold back operations, with clear priorities, verifiable deliverables and documentation for your team.",
        intro:
          "When current tools do not support an important process, we assess the cost of adapting, integrating or building. The first scope covers a priority workflow with defined users, rules and acceptance criteria.",
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
              "Mostly the size of the first version: flows, integrations and user roles. We define it together before writing code. The figure depends on the agreed scope.",
          },
          {
            question: "How does the project go from idea to a working system?",
            answer:
              "In short stages with regular demos. You see working software early, and priorities shift as we learn from users.",
          },
          {
            question: "What do I need to have ready before we start?",
            answer:
              "A description of the problem and, if possible, access to the people who deal with it daily. You don't need a closed spec: it takes shape during discovery.",
          },
          {
            question: "How do you decide which technology to use?",
            answer:
              "After understanding the problem, not before. The choice considers your team, your budget and how the system needs to grow.",
          },
        ],
      },
      es: {
        slug: "software-a-medida",
        title: "Software a medida",
        summary:
          "Software a medida para procesos que limitan la operación, con prioridades, entregas verificables y documentación para tu equipo.",
        intro:
          "Cuando las herramientas actuales no resuelven un proceso importante, evaluamos el costo de adaptar, integrar o construir. El primer alcance cubre un flujo prioritario, con usuarios, reglas y criterios de aceptación definidos.",
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
              "Sobre todo el tamaño de la primera versión: flujos, integraciones y perfiles de usuario. Lo definimos juntos antes de escribir código. El valor depende del alcance acordado.",
          },
          {
            question:
              "¿Cómo pasa el proyecto de la idea a un sistema funcionando?",
            answer:
              "En etapas cortas, con demostraciones frecuentes. Ves software funcionando temprano, y las prioridades cambian a medida que aprendemos de los usuarios.",
          },
          {
            question: "¿Qué necesito tener listo antes de empezar?",
            answer:
              "Una descripción del problema y, si es posible, acceso a quienes lidian con él a diario. No hace falta una especificación cerrada: se forma en el descubrimiento.",
          },
          {
            question: "¿Cómo deciden qué tecnología usar?",
            answer:
              "Después de entender el problema, no antes. La elección considera tu equipo, tu presupuesto y cómo necesita crecer el sistema.",
          },
        ],
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
          "Um portal pode concentrar solicitações, documentos e tarefas que hoje dependem de atendimento manual. Definimos o público e o fluxo prioritário, incluindo acessibilidade, desempenho e integração no escopo. Sites institucionais são avaliados conforme o objetivo comercial.",
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
              "Quantidade de páginas e fluxos, área logada ou painel e integrações com outros sistemas. Um site institucional pede menos que um portal com contas e permissões. O valor depende do escopo combinado.",
          },
          {
            question: "Como funciona o lançamento?",
            answer:
              "Por etapas. Uma primeira versão vai ao ar com as páginas essenciais, e o resto entra conforme o que os visitantes realmente usam.",
          },
          {
            question: "O que levar para a primeira conversa?",
            answer:
              "Exemplos de sites que você gosta, o conteúdo atual, se existir, e uma ideia de quem visita e do que essa pessoa deve fazer.",
          },
          {
            question: "O que acontece depois que o site entra no ar?",
            answer:
              "Acompanhamos desempenho e disponibilidade e apoiamos novas páginas ou funcionalidades. Isso é combinado como Continuous Engineering, com escopo, cadência e atendimento definidos conforme a operação.",
          },
        ],
      },
      en: {
        slug: "web-platforms",
        title: "Websites and web platforms",
        summary:
          "Web portals and platforms for customer service, access to information and everyday tasks, with defined usage indicators.",
        intro:
          "A portal can bring together requests, documents and tasks that currently need manual support. We define the audience and priority workflow, including accessibility, performance and integrations in the scope. Company websites are assessed against their business purpose.",
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
              "Number of pages and flows, a logged-in area or dashboard, and integrations with other systems. A company site takes less than a portal with accounts and permissions. The figure depends on the agreed scope.",
          },
          {
            question: "How does the launch work?",
            answer:
              "In stages. A first version goes live with the essential pages, and the rest follows what visitors actually use.",
          },
          {
            question: "What should I bring to the first conversation?",
            answer:
              "Examples of sites you like, your current content if you have it, and an idea of who visits and what they should do.",
          },
          {
            question: "What happens after the site goes live?",
            answer:
              "We track performance and availability and support new pages or features. This is agreed as Continuous Engineering, with scope, cadence and support set according to the operation.",
          },
        ],
      },
      es: {
        slug: "sitios-y-plataformas-web",
        title: "Sitios y plataformas web",
        summary:
          "Portales y plataformas web para atención, acceso a información y tareas de clientes o equipos, con indicadores de uso definidos.",
        intro:
          "Un portal puede reunir solicitudes, documentos y tareas que hoy requieren atención manual. Definimos el público y el flujo prioritario, incluyendo accesibilidad, rendimiento e integración en el alcance. Los sitios institucionales se evalúan según su objetivo comercial.",
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
              "Cantidad de páginas y flujos, área con sesión o panel e integraciones con otros sistemas. Un sitio institucional pide menos que un portal con cuentas y permisos. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo funciona el lanzamiento?",
            answer:
              "Por etapas. Una primera versión sale con las páginas esenciales, y lo demás entra según lo que los visitantes realmente usan.",
          },
          {
            question: "¿Qué llevar a la primera conversación?",
            answer:
              "Ejemplos de sitios que te gustan, el contenido actual si existe y una idea de quién visita y qué debe hacer esa persona.",
          },
          {
            question: "¿Qué pasa después de que el sitio sale en línea?",
            answer:
              "Seguimos el desempeño y la disponibilidad y apoyamos nuevas páginas o funciones. Se acuerda como Continuous Engineering, con alcance, cadencia y atención definidos según la operación.",
          },
        ],
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
          "Visitas, vistorias e vendas externas precisam registrar informação no momento do trabalho. Avaliamos as tarefas, os dispositivos e a conectividade para definir um aplicativo que possa ser testado no contexto real de uso.",
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
              "Quantidade de telas, se precisa funcionar offline e quantos sistemas conecta. Offline pede mais cuidado, mas compensa em campo. O valor depende do escopo combinado.",
          },
          {
            question: "Como vocês conduzem o desenvolvimento?",
            answer:
              "Começamos pela tarefa que o app precisa resolver bem, lançamos essa versão e testamos com quem vai usar antes de adicionar mais.",
          },
          {
            question: "O que vocês precisam da nossa equipe?",
            answer:
              "Acesso a quem usa o app no dia a dia e aos sistemas com os quais ele precisa conversar, como CRM ou estoque.",
          },
          {
            question: "Um app para as duas plataformas ou dois apps nativos?",
            answer:
              "Um app só costuma simplificar a manutenção. Quando o projeto exige desempenho nativo em uma plataforma, avisamos desde o início.",
          },
        ],
      },
      en: {
        slug: "mobile-apps",
        title: "Mobile apps",
        summary:
          "Apps for field operations and mobile tasks, with integrations and connectivity requirements defined with your team.",
        intro:
          "Visits, inspections and field sales need information captured as work happens. We assess tasks, devices and connectivity to define an app that can be tested in its real operating context.",
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
              "Number of screens, whether it needs to work offline and how many systems it connects. Offline takes more care but pays off in the field. The figure depends on the agreed scope.",
          },
          {
            question: "How do you run the development?",
            answer:
              "We start with the task the app must do well, release that version and test it with the people who will use it before adding more.",
          },
          {
            question: "What do you need from our team?",
            answer:
              "Access to people who use the app daily and to the systems it must talk to, such as a CRM or inventory.",
          },
          {
            question: "One app for both platforms or two native apps?",
            answer:
              "One app usually keeps maintenance simpler. When a project needs native performance on one platform, we say so from the start.",
          },
        ],
      },
      es: {
        slug: "aplicaciones-moviles",
        title: "Aplicaciones móviles",
        summary:
          "Aplicaciones para operaciones de campo y tareas móviles, con integraciones y requisitos de conectividad definidos con tu equipo.",
        intro:
          "Las visitas, inspecciones y ventas externas necesitan registrar información durante el trabajo. Evaluamos tareas, dispositivos y conectividad para definir una aplicación que pueda probarse en su contexto real de uso.",
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
              "Cantidad de pantallas, si debe funcionar sin conexión y cuántos sistemas conecta. Sin conexión pide más cuidado, pero vale la pena en campo. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo conducen el desarrollo?",
            answer:
              "Empezamos por la tarea que la app debe resolver bien, lanzamos esa versión y la probamos con quienes la van a usar antes de agregar más.",
          },
          {
            question: "¿Qué necesitan de nuestro equipo?",
            answer:
              "Acceso a quienes usan la app a diario y a los sistemas con los que debe conversar, como un CRM o el inventario.",
          },
          {
            question: "¿Una app para las dos plataformas o dos apps nativas?",
            answer:
              "Una sola app suele simplificar el mantenimiento. Cuando el proyecto exige rendimiento nativo en una plataforma, lo avisamos desde el inicio.",
          },
        ],
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
          "Quando pedidos, pagamentos ou dados operacionais precisam ser copiados entre ferramentas, cada transferência manual cria espera e risco de erro. Começamos por um fluxo delimitado, com sistemas identificados, regras de conferência e um responsável pelo processo.",
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
              "Quantos sistemas entram e a qualidade da documentação deles. Uma API documentada conecta rápido; um sistema antigo sem documentação leva mais tempo. O valor depende do escopo combinado.",
          },
          {
            question: "Como a implantação afeta a operação?",
            answer:
              "Testamos em ambiente apropriado, definimos tratamento de falhas e planejamos a implantação por etapas. Dependências, janela de mudança e reversão são acordadas antes de alterar a produção.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Leitura ou credenciais de teste dos sistemas envolvidos e alguém que saiba como cada um é usado hoje.",
          },
          {
            question: "Como funciona a continuidade após a entrega?",
            answer:
              "A entrega inclui a documentação acordada. Monitoramento, suporte e evolução podem compor Continuous Engineering, conforme capacidade, escopo, cadência e condições de atendimento definidos em contrato.",
          },
        ],
      },
      en: {
        slug: "integrations-and-automation",
        title: "Integrations and automation",
        summary:
          "Integrations to reduce repeated data entry and delays between systems. Defined scope, failure handling and operating documentation.",
        intro:
          "When orders, payments or operational data must be copied between tools, each manual transfer creates delay and a risk of error. We start with one bounded workflow, identified systems, validation rules and a process owner.",
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
              "How many systems are involved and how well they're documented. A documented API connects fast; an old undocumented system takes longer. The figure depends on the agreed scope.",
          },
          {
            question: "How does deployment affect operations?",
            answer:
              "We test in an appropriate environment, define failure handling and plan a staged rollout. Dependencies, change windows and rollback are agreed before production changes.",
          },
          {
            question: "What access do you need?",
            answer:
              "Read access or test credentials for the systems involved, and someone who knows how each one is used today.",
          },
          {
            question: "How does continuity work after delivery?",
            answer:
              "Delivery includes the agreed documentation. Monitoring, support and further development may form part of Continuous Engineering, subject to capacity, scope, cadence and support terms defined in the contract.",
          },
        ],
      },
      es: {
        slug: "integraciones-y-automatizacion",
        title: "Integraciones y automatización",
        summary:
          "Integraciones para reducir la carga repetida de datos y las demoras entre sistemas. Alcance delimitado, manejo de fallas y documentación operativa.",
        intro:
          "Cuando los pedidos, pagos o datos operativos deben copiarse entre herramientas, cada transferencia manual genera espera y riesgo de error. Empezamos por un flujo delimitado, con sistemas identificados, reglas de validación y un responsable del proceso.",
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
              "Cuántos sistemas participan y qué tan bien están documentados. Una API documentada conecta rápido; un sistema antiguo sin documentación lleva más tiempo. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo afecta la implantación a la operación?",
            answer:
              "Probamos en un entorno adecuado, definimos el tratamiento de fallas y planificamos la implantación por etapas. Las dependencias, ventanas de cambio y reversión se acuerdan antes de modificar producción.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Lectura o credenciales de prueba de los sistemas involucrados y alguien que sepa cómo se usa cada uno hoy.",
          },
          {
            question: "¿Cómo funciona la continuidad después de la entrega?",
            answer:
              "La entrega incluye la documentación acordada. El monitoreo, soporte y evolución pueden formar parte de Continuous Engineering, según la capacidad, el alcance, la cadencia y las condiciones de atención definidas en contrato.",
          },
        ],
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
        title: "Modernização de sistemas",
        summary:
          "Modernização de sistemas legados por etapas, com prioridades de negócio, testes e plano de reversão para cada mudança acordada.",
        intro:
          "Quando o legado torna cada mudança lenta ou arriscada, a decisão envolve continuidade da operação e custo de manutenção. Avaliamos dependências e alternativas, priorizamos um componente e planejamos a transição com testes e condições de reversão.",
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
              "Tamanho do código, cobertura de testes existente e quantas partes mudam juntas. Começamos por um diagnóstico para o plano partir do seu sistema real. O valor depende do escopo combinado.",
          },
          {
            question: "Como modernizam sem parar a empresa?",
            answer:
              "Por etapas. Começamos pelas mudanças de maior impacto e menor risco e confirmamos que nada quebrou antes de seguir. Cada etapa tem plano de reversão, e se alguma exigir uma pausa, combinamos antes o horário de menor uso.",
          },
          {
            question: "O que vocês precisam da nossa equipe?",
            answer:
              "Acesso ao código e à infraestrutura e algum tempo de quem conhece a história do sistema, mesmo que informalmente.",
          },
          {
            question: "Vocês trocam toda a nossa stack?",
            answer:
              "Raramente. Mantemos o que funciona e trocamos o que causa dor. As escolhas vêm do diagnóstico, não da preferência pela ferramenta mais nova.",
          },
        ],
      },
      en: {
        slug: "system-modernization",
        title: "System modernization",
        summary:
          "Step-by-step legacy modernization with business priorities, tests and a rollback plan for each agreed change.",
        intro:
          "When legacy systems make every change slow or risky, decisions must account for operational continuity and maintenance cost. We assess dependencies and alternatives, prioritize one component and plan the transition with tests and rollback conditions.",
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
              "Code size, existing test coverage and how many parts change together. We start with a diagnosis so the plan comes from your real system. The figure depends on the agreed scope.",
          },
          {
            question: "How do you modernize without stopping the company?",
            answer:
              "In stages. We start with the highest-impact, lowest-risk changes and confirm nothing broke before moving on. Every stage has a rollback plan, and if one needs a pause, we agree on a low-traffic window beforehand.",
          },
          {
            question: "What do you need from our team?",
            answer:
              "Access to the code and infrastructure, and some time from someone who knows the system's history, even informally.",
          },
          {
            question: "Do you replace our whole stack?",
            answer:
              "Rarely. We keep what works and replace what hurts. Choices come from the diagnosis, not from a preference for the newest tool.",
          },
        ],
      },
      es: {
        slug: "modernizacion-de-sistemas",
        title: "Modernización de sistemas",
        summary:
          "Modernización gradual de sistemas legados, con prioridades de negocio, pruebas y plan de reversión para cada cambio acordado.",
        intro:
          "Cuando el legado vuelve lento o riesgoso cada cambio, la decisión debe considerar la continuidad operativa y el costo de mantenimiento. Evaluamos dependencias y alternativas, priorizamos un componente y planificamos la transición con pruebas y condiciones de reversión.",
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
              "Tamaño del código, cobertura de pruebas existente y cuántas partes cambian juntas. Empezamos con un diagnóstico para que el plan parta de tu sistema real. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo modernizan sin detener la empresa?",
            answer:
              "Por etapas. Empezamos por los cambios de mayor impacto y menor riesgo y confirmamos que nada se rompió antes de seguir. Cada etapa tiene plan de reversión, y si alguna requiere una pausa, acordamos antes el horario de menor uso.",
          },
          {
            question: "¿Qué necesitan de nuestro equipo?",
            answer:
              "Acceso al código y a la infraestructura, y algo de tiempo de quien conozca la historia del sistema, aunque sea de manera informal.",
          },
          {
            question: "¿Cambian todo nuestro stack?",
            answer:
              "Rara vez. Mantenemos lo que funciona y cambiamos lo que duele. Las decisiones salen del diagnóstico, no de la preferencia por la herramienta más nueva.",
          },
        ],
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
          "A decisão de usar IA precisa considerar a tarefa, a qualidade dos dados e o esforço de revisão. Delimitamos um fluxo e comparamos o protótipo com o processo atual. A Iris é uma demonstração interna de atendimento inicial; sua presença neste site não comprova resultados em operações de clientes.",
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
              "Organização dos dados, integrações, desenvolvimento, avaliação e revisão humana. O orçamento também considera consumo de modelos, infraestrutura e manutenção. Um protótipo ajuda a medir essas variáveis antes de decidir pela produção.",
          },
          {
            question: "Como começa o primeiro projeto de IA?",
            answer:
              "Definimos uma tarefa, exemplos representativos e critérios de qualidade. O protótipo é avaliado quanto a acertos, falhas, custo e esforço de revisão. O resultado pode recomendar avançar, ajustar ou interromper; produção exige avaliação e escopo próprios.",
          },
          {
            question: "O que precisamos ter pronto?",
            answer:
              "Os documentos ou sistemas que a IA deve usar e alguém que perceba quando uma resposta está errada.",
          },
          {
            question: "Como funciona a continuidade após a entrega?",
            answer:
              "A entrega inclui a documentação acordada. Monitoramento, suporte e evolução podem compor Continuous Engineering, conforme capacidade, escopo, cadência e condições de atendimento definidos em contrato.",
          },
        ],
      },
      en: {
        slug: "applied-ai",
        title: "Applied AI",
        summary:
          "Evaluate AI on a business task with a prototype, quality criteria, cost per task and human review before increasing the investment.",
        intro:
          "An AI decision must consider the task, data quality and review effort. We define one workflow and compare the prototype with the current process. Iris is an internal demonstration of initial enquiries; its presence on this website does not establish results in client operations.",
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
              "Data preparation, integrations, development, evaluation and human review. The budget also considers model usage, infrastructure and maintenance. A prototype helps measure these variables before a production decision.",
          },
          {
            question: "How does a first AI project start?",
            answer:
              "We define a task, representative examples and quality criteria. The prototype is evaluated for correct outputs, failures, cost and review effort. Results may support proceeding, adjusting or stopping; production requires its own assessment and scope.",
          },
          {
            question: "What do we need to have ready?",
            answer:
              "The documents or systems the AI should use, and someone who can tell when an answer is wrong.",
          },
          {
            question: "How does continuity work after delivery?",
            answer:
              "Delivery includes the agreed documentation. Monitoring, support and further development may form part of Continuous Engineering, subject to capacity, scope, cadence and support terms defined in the contract.",
          },
        ],
      },
      es: {
        slug: "inteligencia-artificial",
        title: "Inteligencia artificial aplicada",
        summary:
          "Evalúa IA en una tarea de negocio con prototipo, criterios de calidad, costo por tarea y revisión humana antes de ampliar la inversión.",
        intro:
          "La decisión de usar IA debe considerar la tarea, la calidad de los datos y el esfuerzo de revisión. Delimitamos un flujo y comparamos el prototipo con el proceso actual. Iris es una demostración interna de atención inicial; su presencia en este sitio no demuestra resultados en operaciones de clientes.",
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
              "Preparación de datos, integraciones, desarrollo, evaluación y revisión humana. El presupuesto también considera consumo de modelos, infraestructura y mantenimiento. Un prototipo ayuda a medir estas variables antes de decidir sobre producción.",
          },
          {
            question: "¿Cómo empieza el primer proyecto de IA?",
            answer:
              "Definimos una tarea, ejemplos representativos y criterios de calidad. El prototipo se evalúa por aciertos, fallas, costo y esfuerzo de revisión. El resultado puede recomendar avanzar, ajustar o detenerse; producción exige evaluación y alcance propios.",
          },
          {
            question: "¿Qué necesitamos tener listo?",
            answer:
              "Los documentos o sistemas que la IA debe usar y alguien que note cuándo una respuesta es errónea.",
          },
          {
            question: "¿Cómo funciona la continuidad después de la entrega?",
            answer:
              "La entrega incluye la documentación acordada. El monitoreo, soporte y evolución pueden formar parte de Continuous Engineering, según la capacidad, el alcance, la cadencia y las condiciones de atención definidas en contrato.",
          },
        ],
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
          "Números divergentes e relatórios manuais atrasam decisões. Partimos da decisão que precisa ser tomada para identificar fontes, regras e responsáveis. A entrega permite conferir a origem dos indicadores e acompanhar falhas de atualização.",
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
              "Quantas fontes entram e o quão bagunçadas estão. Organizar anos de dados inconsistentes costuma levar mais tempo que montar o painel. O valor depende do escopo combinado.",
          },
          {
            question: "Como vocês constroem painéis e fluxos de dados?",
            answer:
              "Começamos pela decisão que o painel precisa apoiar, voltamos até os dados necessários e construímos o fluxo que os mantém corretos.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acesso às fontes de dados atuais e uma conversa com quem decide com base nesses números hoje.",
          },
          {
            question: "Como funciona a continuidade após a entrega?",
            answer:
              "A entrega inclui a documentação acordada. Monitoramento, suporte e evolução podem compor Continuous Engineering, conforme capacidade, escopo, cadência e condições de atendimento definidos em contrato.",
          },
        ],
      },
      en: {
        slug: "data-and-reporting",
        title: "Data and reporting",
        summary:
          "Data and reporting for operational decisions, with traceable sources, calculation rules and defined quality criteria.",
        intro:
          "Conflicting figures and manual reports delay decisions. We start with the decision that needs to be made to identify sources, rules and owners. The delivery lets you verify where indicators come from and track update failures.",
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
              "How many sources are involved and how messy they are. Cleaning up years of inconsistent data often takes longer than building the dashboard. The figure depends on the agreed scope.",
          },
          {
            question: "How do you build dashboards and data flows?",
            answer:
              "We start with the decision the dashboard must support, work back to the data it needs and build the flow that keeps it correct.",
          },
          {
            question: "What access do you need?",
            answer:
              "Access to your current data sources and a conversation with whoever decides based on these numbers today.",
          },
          {
            question: "How does continuity work after delivery?",
            answer:
              "Delivery includes the agreed documentation. Monitoring, support and further development may form part of Continuous Engineering, subject to capacity, scope, cadence and support terms defined in the contract.",
          },
        ],
      },
      es: {
        slug: "datos-e-informes",
        title: "Datos e informes",
        summary:
          "Datos e informes para decisiones operativas, con fuentes rastreables, reglas de cálculo y criterios de calidad definidos.",
        intro:
          "Los números divergentes y los informes manuales retrasan decisiones. Partimos de la decisión que debe tomarse para identificar fuentes, reglas y responsables. La entrega permite verificar el origen de los indicadores y seguir las fallas de actualización.",
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
              "Cuántas fuentes participan y qué tan desordenadas están. Ordenar años de datos inconsistentes suele llevar más tiempo que armar el panel. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo construyen paneles y flujos de datos?",
            answer:
              "Empezamos por la decisión que el panel debe apoyar, volvemos a los datos necesarios y construimos el flujo que los mantiene correctos.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Acceso a las fuentes de datos actuales y una conversación con quien decide con base en esos números hoy.",
          },
          {
            question: "¿Cómo funciona la continuidad después de la entrega?",
            answer:
              "La entrega incluye la documentación acordada. El monitoreo, soporte y evolución pueden formar parte de Continuous Engineering, según la capacidad, el alcance, la cadencia y las condiciones de atención definidas en contrato.",
          },
        ],
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
        title: "Nuvem e arquitetura",
        summary:
          "Diagnóstico e evolução de ambientes AWS, com análise de custo, confiabilidade e riscos para orientar a próxima mudança da operação.",
        intro:
          "Custos pouco claros, incidentes e limites de capacidade tornam decisões de infraestrutura difíceis. Avaliamos o ambiente e comparamos alternativas considerando custo total e risco. Migração ou modernização recebe escopo próprio, com plano de mudança e recuperação.",
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
            question: "O que define o custo de nuvem e infraestrutura?",
            answer:
              "Os recursos que o seu tráfego realmente pede e como o sistema foi desenhado. Dimensionamos para o uso real e buscamos reduzir custo sem perder desempenho. O valor depende do escopo combinado.",
          },
          {
            question: "Como planejam mudanças em um ambiente existente?",
            answer:
              "Partimos do diagnóstico, das dependências e do impacto esperado. A execução requer escopo, ensaio, critérios de aceite, janela de mudança e recuperação definidos. A continuidade da operação é um requisito a avaliar em cada cenário.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acesso à infraestrutura e ao monitoramento e informações sobre horários de pico e incidentes anteriores.",
          },
          {
            question: "Vocês continuam cuidando depois do projeto?",
            answer:
              "Podemos, como Continuous Engineering, com escopo, cadência e atendimento definidos conforme a operação. Ou deixamos monitoramento e documentação prontos para sua equipe operar.",
          },
        ],
      },
      en: {
        slug: "cloud-and-architecture",
        title: "Cloud and architecture",
        summary:
          "AWS assessment and infrastructure evolution, with cost, reliability and risk analysis to guide the next operational change.",
        intro:
          "Unclear costs, incidents and capacity limits make infrastructure decisions difficult. We assess the environment and compare alternatives based on total cost and risk. Migration or modernization has its own scope, with change and recovery plans.",
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
            question: "What sets the cost of cloud and infrastructure?",
            answer:
              "The resources your traffic actually needs and how the system is designed. We size for real usage and look for savings without losing performance. The figure depends on the agreed scope.",
          },
          {
            question: "How do you plan changes to an existing environment?",
            answer:
              "We start with the assessment, dependencies and expected impact. Execution requires defined scope, rehearsal, acceptance criteria, change window and recovery. Operational continuity must be assessed for each scenario.",
          },
          {
            question: "What access do you need?",
            answer:
              "Access to your infrastructure and monitoring, plus information about peak hours and past incidents.",
          },
          {
            question: "Do you keep looking after it once the project ends?",
            answer:
              "We can, as Continuous Engineering, with scope, cadence and support set according to the operation. Otherwise we leave monitoring and documentation ready for your team to run.",
          },
        ],
      },
      es: {
        slug: "nube-y-arquitectura",
        title: "Nube y arquitectura",
        summary:
          "Diagnóstico y evolución de entornos AWS, con análisis de costo, confiabilidad y riesgos para orientar el próximo cambio operativo.",
        intro:
          "Los costos poco claros, incidentes y límites de capacidad dificultan las decisiones de infraestructura. Evaluamos el entorno y comparamos alternativas considerando costo total y riesgo. La migración o modernización tiene alcance propio, con plan de cambio y recuperación.",
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
            question: "¿Qué define el costo de nube e infraestructura?",
            answer:
              "Los recursos que tu tráfico realmente pide y cómo se diseñó el sistema. Dimensionamos para el uso real y buscamos reducir costo sin perder desempeño. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo planifican cambios en un entorno existente?",
            answer:
              "Partimos del diagnóstico, las dependencias y el impacto esperado. La ejecución requiere alcance, ensayo, criterios de aceptación, ventana de cambio y recuperación definidos. La continuidad operativa se evalúa en cada escenario.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Acceso a la infraestructura y al monitoreo, e información sobre horas pico e incidentes anteriores.",
          },
          {
            question: "¿Siguen cuidándolo después del proyecto?",
            answer:
              "Podemos, como Continuous Engineering, con alcance, cadencia y atención definidos según la operación. O dejamos monitoreo y documentación listos para que tu equipo opere.",
          },
        ],
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

export function relatedServices(service: Service, count = 3) {
  const index = services.findIndex((item) => item.id === service.id);
  const related: Service[] = [];
  for (
    let offset = 1;
    related.length < count && offset < services.length;
    offset++
  ) {
    related.push(services[(index + offset) % services.length]);
  }
  return related;
}

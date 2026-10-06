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
          "Da ideia à primeira versão: planejamos, construímos e evoluímos o sistema que a sua operação precisa.",
        intro:
          "Quando uma ferramenta pronta quase resolve, ou o processo ainda vive em planilhas, o caminho é um sistema feito para o seu jeito de trabalhar. Partimos do seu processo, não de um modelo pronto.",
        problems: [
          "A ferramenta pronta quase serve, mas sempre trava num detalhe.",
          "O processo vive em planilhas, mensagens e na memória de alguém.",
          "Você tem uma ideia de produto e precisa testá-la com usuários reais.",
          "Você quer um sistema seu: suas regras, seus dados, seu roteiro.",
        ],
        deliverables: [
          "Descoberta com quem lida com o problema no dia a dia",
          "Primeira versão com escopo definido",
          "Telas de computador e celular para tarefas reais",
          "Lançamento para usuários reais",
          "Roteiro do que vem depois",
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
          "From idea to first release: we plan, build and keep improving the system your business needs.",
        intro:
          "When a ready-made tool almost fits, or the process still lives in spreadsheets, the answer is a system built for how you work. We start from your process, not from a template.",
        problems: [
          "The ready-made tool almost fits, but it always breaks on one detail.",
          "The process lives in spreadsheets, messages and someone's memory.",
          "You have a product idea and need to test it with real users.",
          "You want a system that's yours: your rules, your data, your roadmap.",
        ],
        deliverables: [
          "Discovery with the people who deal with the problem every day",
          "A first version with a defined scope",
          "Computer and phone screens built around real tasks",
          "A release for real users",
          "A roadmap for what comes next",
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
          "De la idea a la primera versión: planificamos, construimos y evolucionamos el sistema que tu operación necesita.",
        intro:
          "Cuando una herramienta lista casi sirve, o el proceso aún vive en hojas de cálculo, el camino es un sistema hecho para tu forma de trabajar. Partimos de tu proceso, no de una plantilla.",
        problems: [
          "La herramienta lista casi sirve, pero siempre falla en un detalle.",
          "El proceso vive en hojas de cálculo, mensajes y en la memoria de alguien.",
          "Tienes una idea de producto y necesitas probarla con usuarios reales.",
          "Quieres un sistema tuyo: tus reglas, tus datos, tu hoja de ruta.",
        ],
        deliverables: [
          "Descubrimiento con quienes lidian con el problema a diario",
          "Primera versión con alcance definido",
          "Pantallas de computador y celular para tareas reales",
          "Lanzamiento para usuarios reales",
          "Hoja de ruta de lo que viene después",
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
          "Portais, painéis e sites rápidos, acessíveis e fáceis de usar em qualquer tela.",
        intro:
          "Sites, portais e painéis são a forma como muita gente conhece sua empresa. Construímos para carregar rápido, funcionar em qualquer tela e crescer com o conteúdo e o tráfego, de um site institucional a um painel de uso diário.",
        problems: [
          "O site é lento, difícil de atualizar ou ruim no celular.",
          "Você precisa de um portal para clientes ou parceiros, não só de uma página pública.",
          "Sua equipe precisa de um painel para ver o que acontece sem pedir relatório.",
          "Você lança um produto novo e precisa de um site que sustente isso.",
        ],
        deliverables: [
          "Estrutura de informação e conteúdo",
          "Telas para computador e celular",
          "Carregamento rápido e acessibilidade",
          "Área de conteúdo que sua equipe atualiza sozinha",
          "Indicadores e monitoramento no ar",
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
          "Portals, dashboards and websites that are fast, accessible and easy to use on any screen.",
        intro:
          "Websites, portals and dashboards are how many people meet your company. We build them to load fast, work on any screen and grow with content and traffic, from a company site to a dashboard used every day.",
        problems: [
          "The site is slow, hard to update or poor on mobile.",
          "You need a portal for clients or partners, not just a public page.",
          "Your team needs a dashboard to see what's happening without asking for a report.",
          "You're launching a new product and need a site to support it.",
        ],
        deliverables: [
          "Information and content structure",
          "Screens for computer and phone",
          "Fast loading and accessibility",
          "A content area your team updates on its own",
          "Indicators and monitoring once live",
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
          "Portales, paneles y sitios rápidos, accesibles y fáciles de usar en cualquier pantalla.",
        intro:
          "Sitios, portales y paneles son la forma en que mucha gente conoce tu empresa. Los construimos para cargar rápido, funcionar en cualquier pantalla y crecer con el contenido y el tráfico, desde un sitio institucional hasta un panel de uso diario.",
        problems: [
          "El sitio es lento, difícil de actualizar o malo en el celular.",
          "Necesitas un portal para clientes o socios, no solo una página pública.",
          "Tu equipo necesita un panel para ver qué pasa sin pedir un informe.",
          "Lanzas un producto nuevo y necesitas un sitio que lo sostenga.",
        ],
        deliverables: [
          "Estructura de información y contenido",
          "Pantallas para computador y celular",
          "Carga rápida y accesibilidad",
          "Un área de contenido que tu equipo actualiza por sí sola",
          "Indicadores y monitoreo en línea",
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
          "Aplicativos para Android e iPhone que funcionam no dia a dia, até em campo e com internet instável.",
        intro:
          "Aplicativos para equipes que trabalham fora do escritório: visitas, entregas, vistorias, vendas externas. O app é desenhado para continuar funcionando com internet instável, porque é assim que o campo costuma ser.",
        problems: [
          "A equipe de campo ainda anota em papel ou planilha.",
          "O aplicativo atual trava sem sinal forte.",
          "Clientes ou equipe precisam concluir uma tarefa pelo celular.",
          "Você quer um app só para Android e iPhone, sem construir dois.",
        ],
        deliverables: [
          "Fluxo de telas pensado para uma mão só e testado com quem usa",
          "Funcionamento com conexão fraca ou sem internet",
          "Uma base de código para Android e iPhone, quando fizer sentido",
          "Integração com os sistemas que você já usa",
          "Publicação nas lojas e apoio nas atualizações",
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
          "Android and iPhone apps that work day to day, even in the field and with unstable internet.",
        intro:
          "Apps for teams that work outside the office: visits, deliveries, inspections, field sales. The app is designed to keep working on unstable internet, because that's what the field is usually like.",
        problems: [
          "The field team still writes things down on paper or spreadsheets.",
          "The current app freezes without a strong signal.",
          "Clients or staff need to finish a task from their phone.",
          "You want one app for Android and iPhone, not two.",
        ],
        deliverables: [
          "A screen flow built for one hand and tested with real users",
          "Works on a weak connection or none at all",
          "One codebase for Android and iPhone, when it fits",
          "Integration with the systems you already use",
          "Store publishing and help with updates",
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
          "Aplicaciones para Android e iPhone que funcionan en el día a día, incluso en campo y con internet inestable.",
        intro:
          "Aplicaciones para equipos que trabajan fuera de la oficina: visitas, entregas, inspecciones, ventas externas. La app se diseña para seguir funcionando con internet inestable, porque así suele ser el campo.",
        problems: [
          "El equipo de campo todavía anota en papel u hojas de cálculo.",
          "La aplicación actual se traba sin señal fuerte.",
          "Clientes o equipo necesitan terminar una tarea desde el celular.",
          "Quieres una sola app para Android e iPhone, no dos.",
        ],
        deliverables: [
          "Flujo de pantallas pensado para una mano y probado con quienes lo usan",
          "Funciona con conexión débil o sin internet",
          "Una base de código para Android e iPhone, cuando conviene",
          "Integración con los sistemas que ya usas",
          "Publicación en las tiendas y apoyo en las actualizaciones",
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
    stack: ["mcp", "aws"],
    pillar: "software",
    supportPillars: ["ai"],
    technologies: ["Node.js", "NestJS", "Python", "Redis"],
    copy: {
      "pt-BR": {
        slug: "integracoes-e-automacao",
        title: "Integrações e automação",
        summary:
          "Conectamos os sistemas da empresa e tiramos o trabalho repetitivo das planilhas.",
        intro:
          "A maioria das operações usa mais de um sistema: CRM, pagamento, laboratório, financeiro. Integramos e automatizamos para a informação circular sozinha, com verificações que pegam erros cedo, antes de chegarem ao cliente.",
        problems: [
          "Alguém digita a mesma informação em dois ou mais sistemas.",
          "Sistemas de laboratório, pagamento ou login precisam conversar.",
          "Etapas manuais entre sistemas atrasam ou erram, e o cliente sente.",
          "A planilha virou a ponte entre ferramentas e não aguenta mais.",
        ],
        deliverables: [
          "Mapa dos sistemas e dos dados que circulam entre eles",
          "APIs e conectores para os seus sistemas",
          "Verificações que pegam erros perto de onde nascem",
          "Alertas para saber quando uma conexão falha",
          "Agentes de IA ligados às suas ferramentas, com acesso controlado",
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
            question: "Como vocês evitam quebrar o que já funciona?",
            answer:
              "Testamos primeiro em uma cópia dos dados e colocamos em produção por etapas, com os sistemas atuais no ar o tempo todo.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Leitura ou credenciais de teste dos sistemas envolvidos e alguém que saiba como cada um é usado hoje.",
          },
          {
            question: "E se um sistema conectado mudar depois?",
            answer:
              "Monitoramos as integrações para detectar falhas rápido e ajustamos a conexão quando um dos lados muda sua API ou suas regras.",
          },
        ],
      },
      en: {
        slug: "integrations-and-automation",
        title: "Integrations and automation",
        summary:
          "We connect your company's systems and take repetitive work out of spreadsheets.",
        intro:
          "Most operations use more than one system: CRM, payments, lab, finance. We integrate and automate so information flows on its own, with checks that catch errors early, before they reach the customer.",
        problems: [
          "Someone types the same information into two or more systems.",
          "Lab, payment or login systems need to talk to each other.",
          "Manual steps between systems cause delays or errors, and customers feel them.",
          "The spreadsheet became the bridge between tools and can't carry it anymore.",
        ],
        deliverables: [
          "A map of the systems and the data moving between them",
          "APIs and connectors for your systems",
          "Checks that catch errors close to where they start",
          "Alerts so you know when a connection fails",
          "AI agents connected to your tools, with controlled access",
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
            question: "How do you avoid breaking what already works?",
            answer:
              "We test first on a copy of the data and go live in stages, with your current systems running the whole time.",
          },
          {
            question: "What access do you need?",
            answer:
              "Read access or test credentials for the systems involved, and someone who knows how each one is used today.",
          },
          {
            question: "What if a connected system changes later?",
            answer:
              "We monitor the integrations to catch failures fast, and we adjust the connection when either side changes its API or rules.",
          },
        ],
      },
      es: {
        slug: "integraciones-y-automatizacion",
        title: "Integraciones y automatización",
        summary:
          "Conectamos los sistemas de la empresa y sacamos el trabajo repetitivo de las hojas de cálculo.",
        intro:
          "La mayoría de las operaciones usa más de un sistema: CRM, pagos, laboratorio, finanzas. Integramos y automatizamos para que la información circule sola, con verificaciones que detectan errores temprano, antes de llegar al cliente.",
        problems: [
          "Alguien digita la misma información en dos o más sistemas.",
          "Sistemas de laboratorio, pago o acceso necesitan conversar.",
          "Pasos manuales entre sistemas generan demoras o errores, y el cliente lo nota.",
          "La hoja de cálculo se volvió el puente entre herramientas y ya no aguanta.",
        ],
        deliverables: [
          "Mapa de los sistemas y de los datos que circulan entre ellos",
          "APIs y conectores para tus sistemas",
          "Verificaciones que detectan errores cerca de donde nacen",
          "Alertas para saber cuándo falla una conexión",
          "Agentes de IA conectados a tus herramientas, con acceso controlado",
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
            question: "¿Cómo evitan romper lo que ya funciona?",
            answer:
              "Probamos primero en una copia de los datos y pasamos a producción por etapas, con tus sistemas actuales funcionando todo el tiempo.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Lectura o credenciales de prueba de los sistemas involucrados y alguien que sepa cómo se usa cada uno hoy.",
          },
          {
            question: "¿Y si un sistema conectado cambia después?",
            answer:
              "Monitoreamos las integraciones para detectar fallas rápido y ajustamos la conexión cuando alguno de los lados cambia su API o sus reglas.",
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
          "Atualizamos sistemas antigos por etapas, sem parar a operação que depende deles.",
        intro:
          "Sistema antigo raramente precisa ser refeito do zero. Modernizamos por etapas, trocando o que trava sua equipe sem parar a operação. Começamos medindo quanto as entregas levam hoje, para a melhora ter base de comparação.",
        problems: [
          "Toda funcionalidade nova demora porque o código resiste à mudança.",
          "O sistema funciona, mas ninguém quer mexer nele.",
          "Uma reescrita grande pode parar a empresa por meses.",
          "Relatórios lentos ou com números em que ninguém confia.",
        ],
        deliverables: [
          "Diagnóstico do sistema e dos pontos mais arriscados",
          "Plano de migração em etapas, com o sistema no ar",
          "Serviços refatorados e componentes reutilizáveis",
          "Testes automatizados nas áreas que mudamos",
          "Migração para a nuvem (AWS) quando fizer sentido",
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
              "Por etapas. Começamos pelas mudanças de maior impacto e menor risco e confirmamos que nada quebrou antes de seguir. Cada etapa tem plano de reversão.",
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
          "We update old systems in stages, without stopping the operation that depends on them.",
        intro:
          "An old system rarely needs to be rebuilt from scratch. We modernize in stages, replacing what holds your team back without stopping operations. We start by measuring how long deliveries take today, so the improvement has a baseline.",
        problems: [
          "Every new feature takes long because the code resists change.",
          "The system works, but nobody wants to touch it.",
          "A big rewrite could stop the company for months.",
          "Slow reports, or numbers nobody trusts.",
        ],
        deliverables: [
          "A diagnosis of the system and its riskiest parts",
          "A staged migration plan that keeps the system live",
          "Refactored services and reusable components",
          "Automated tests in the areas we change",
          "Migration to the cloud (AWS) when it makes sense",
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
              "In stages. We start with the highest-impact, lowest-risk changes and confirm nothing broke before moving on. Every stage has a rollback plan.",
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
          "Actualizamos sistemas antiguos por etapas, sin detener la operación que depende de ellos.",
        intro:
          "Un sistema antiguo rara vez necesita rehacerse desde cero. Modernizamos por etapas, cambiando lo que frena a tu equipo sin detener la operación. Empezamos midiendo cuánto tardan hoy las entregas, para que la mejora tenga una base de comparación.",
        problems: [
          "Cada función nueva tarda porque el código se resiste al cambio.",
          "El sistema funciona, pero nadie quiere tocarlo.",
          "Una reescritura grande puede detener la empresa por meses.",
          "Informes lentos o con números en los que nadie confía.",
        ],
        deliverables: [
          "Diagnóstico del sistema y de sus partes más riesgosas",
          "Plan de migración por etapas, con el sistema en línea",
          "Servicios refactorizados y componentes reutilizables",
          "Pruebas automatizadas en las áreas que cambiamos",
          "Migración a la nube (AWS) cuando tiene sentido",
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
              "Por etapas. Empezamos por los cambios de mayor impacto y menor riesgo y confirmamos que nada se rompió antes de seguir. Cada etapa tiene plan de reversión.",
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
          "Assistentes e automações com IA ligados ao conhecimento da sua empresa, com revisão humana e custo sob controle.",
        intro:
          "IA é útil quando faz uma tarefa definida, com os dados certos, e alguém confere o resultado. Ligamos a IA aos documentos e sistemas da empresa, com acesso controlado, avaliação de qualidade e custo por tarefa acompanhado. A Iris, assistente deste site, é um exemplo real.",
        problems: [
          "A equipe ou os clientes repetem as mesmas perguntas, e alguém procura a resposta toda vez.",
          "A informação está espalhada em documentos, planilhas e sistemas.",
          "Você quer IA no produto, mas teme respostas erradas ou custo fora de controle.",
          "Você quer automatizar uma tarefa com várias etapas, não só responder perguntas.",
        ],
        deliverables: [
          "Uma tarefa definida, com os dados que ela usa",
          "Respostas baseadas nos seus documentos (RAG)",
          "Agentes que agem com regras e acesso definidos",
          "Avaliação de qualidade com perguntas reais",
          "Revisão humana onde o risco pede, e custo por tarefa acompanhado",
        ],
        measure: [
          "Tarefa, dados e o que conta como resposta correta, definidos antes de construir",
          "Qualidade avaliada com perguntas reais, custo por tarefa acompanhado",
          "Acesso e revisão humana definidos por tipo de tarefa",
        ],
        faq: [
          {
            question: "O que define o custo de um projeto de IA?",
            answer:
              "Costuma estar mais em como o conhecimento está organizado e em quanta verificação as respostas pedem do que na IA em si. Um piloto numa tarefa mostra se vale expandir. O valor depende do escopo combinado.",
          },
          {
            question: "Como começa o primeiro projeto de IA?",
            answer:
              "Por uma tarefa que já vale a pena resolver sozinha. Construímos um piloto nela e você tem um exemplo funcionando e dados reais de uso antes de investir mais.",
          },
          {
            question: "O que precisamos ter pronto?",
            answer:
              "Os documentos ou sistemas que a IA deve usar e alguém que perceba quando uma resposta está errada.",
          },
          {
            question: "Como as respostas continuam confiáveis com o tempo?",
            answer:
              "Acompanhamos qualidade e custo e ajustamos fontes e verificações quando o conteúdo e o uso mudam.",
          },
        ],
      },
      en: {
        slug: "applied-ai",
        title: "Applied AI",
        summary:
          "AI assistants and automations tied to your company's knowledge, with human review and cost under control.",
        intro:
          "AI is useful when it does a defined task, with the right data, and someone checks the result. We connect AI to your documents and systems, with controlled access, quality evaluation and cost per task tracked. Iris, this site's assistant, is a real example.",
        problems: [
          "Staff or customers keep asking the same questions, and someone looks up the answer every time.",
          "Information is scattered across documents, spreadsheets and systems.",
          "You want AI in your product, but fear wrong answers or runaway cost.",
          "You want to automate a multi-step task, not just answer questions.",
        ],
        deliverables: [
          "A defined task, with the data it uses",
          "Answers based on your documents (RAG)",
          "Agents that act within defined rules and access",
          "Quality evaluation with real questions",
          "Human review where risk calls for it, and cost per task tracked",
        ],
        measure: [
          "Task, data and what counts as a correct answer, defined before building",
          "Quality evaluated with real questions, cost per task tracked",
          "Access and human review set by task type",
        ],
        faq: [
          {
            question: "What sets the cost of an AI project?",
            answer:
              "It's usually more about how the knowledge is organized and how much checking answers need than about the AI itself. A pilot on one task shows whether it's worth expanding. The figure depends on the agreed scope.",
          },
          {
            question: "How does a first AI project start?",
            answer:
              "With a task already worth solving on its own. We build a pilot on it, and you get a working example and real usage data before investing more.",
          },
          {
            question: "What do we need to have ready?",
            answer:
              "The documents or systems the AI should use, and someone who can tell when an answer is wrong.",
          },
          {
            question: "How do answers stay reliable over time?",
            answer:
              "We track quality and cost and adjust sources and checks as content and usage change.",
          },
        ],
      },
      es: {
        slug: "inteligencia-artificial",
        title: "Inteligencia artificial aplicada",
        summary:
          "Asistentes y automatizaciones con IA conectados al conocimiento de tu empresa, con revisión humana y costo bajo control.",
        intro:
          "La IA es útil cuando hace una tarea definida, con los datos correctos, y alguien revisa el resultado. Conectamos la IA a los documentos y sistemas de la empresa, con acceso controlado, evaluación de calidad y costo por tarea seguido. Iris, la asistente de este sitio, es un ejemplo real.",
        problems: [
          "El equipo o los clientes repiten las mismas preguntas y alguien busca la respuesta cada vez.",
          "La información está dispersa en documentos, hojas de cálculo y sistemas.",
          "Quieres IA en el producto, pero temes respuestas erróneas o costo fuera de control.",
          "Quieres automatizar una tarea de varios pasos, no solo responder preguntas.",
        ],
        deliverables: [
          "Una tarea definida, con los datos que usa",
          "Respuestas basadas en tus documentos (RAG)",
          "Agentes que actúan con reglas y acceso definidos",
          "Evaluación de calidad con preguntas reales",
          "Revisión humana donde el riesgo lo pide, y costo por tarea seguido",
        ],
        measure: [
          "Tarea, datos y qué cuenta como respuesta correcta, definidos antes de construir",
          "Calidad evaluada con preguntas reales, costo por tarea seguido",
          "Acceso y revisión humana definidos por tipo de tarea",
        ],
        faq: [
          {
            question: "¿Qué define el costo de un proyecto de IA?",
            answer:
              "Suele estar más en cómo se organiza el conocimiento y cuánta verificación piden las respuestas que en la IA en sí. Un piloto en una tarea muestra si vale la pena ampliar. El valor depende del alcance acordado.",
          },
          {
            question: "¿Cómo empieza el primer proyecto de IA?",
            answer:
              "Por una tarea que ya vale la pena resolver por sí sola. Construimos un piloto sobre ella y tienes un ejemplo funcionando y datos reales de uso antes de invertir más.",
          },
          {
            question: "¿Qué necesitamos tener listo?",
            answer:
              "Los documentos o sistemas que la IA debe usar y alguien que note cuándo una respuesta es errónea.",
          },
          {
            question: "¿Cómo siguen confiables las respuestas con el tiempo?",
            answer:
              "Seguimos calidad y costo y ajustamos fuentes y verificaciones cuando cambian el contenido y el uso.",
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
    stack: ["aws", "bedrock"],
    pillar: "software",
    supportPillars: ["cloud", "ai"],
    technologies: ["PostgreSQL", "Python", "Redis", "AWS"],
    copy: {
      "pt-BR": {
        slug: "dados-e-relatorios",
        title: "Dados e relatórios",
        summary:
          "Dados organizados e painéis claros para decidir com base no que acontece de verdade.",
        intro:
          "Boa decisão pede dado confiável e um jeito claro de enxergá-lo. Organizamos como os dados são coletados, construímos painéis que as pessoas realmente usam e montamos os fluxos que os mantêm atualizados.",
        problems: [
          "Times diferentes mostram números diferentes para a mesma coisa.",
          "Para ter um relatório, alguém precisa extrair os dados à mão.",
          "Os dados vivem em sistemas separados, sem uma fonte única.",
          "Você decide no feeling porque o número demora a chegar.",
        ],
        deliverables: [
          "Modelo de dados que reflete o seu negócio",
          "Fluxos que mantêm os dados atualizados sozinhos",
          "Base de dados pensada para as consultas que você faz",
          "Painéis feitos em torno das decisões que apoiam",
          "Documentação de onde vem cada número",
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
            question: "O que acontece se uma fonte de dados mudar?",
            answer:
              "Monitoramos os fluxos para perceber rápido quando uma fonte quebra e ajustamos conforme seus sistemas evoluem.",
          },
        ],
      },
      en: {
        slug: "data-and-reporting",
        title: "Data and reporting",
        summary:
          "Organized data and clear dashboards to decide based on what actually happens.",
        intro:
          "Good decisions need reliable data and a clear way to see it. We organize how data is collected, build dashboards people actually use and set up the flows that keep them up to date.",
        problems: [
          "Different teams show different numbers for the same thing.",
          "Getting a report means someone pulls the data by hand.",
          "Data lives in separate systems, with no single source.",
          "You decide by gut feeling because numbers arrive too late.",
        ],
        deliverables: [
          "A data model that reflects your business",
          "Flows that keep data up to date on their own",
          "A database built for the queries you actually run",
          "Dashboards built around the decisions they support",
          "Documentation of where each number comes from",
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
            question: "What happens if a data source changes?",
            answer:
              "We monitor the flows to notice quickly when a source breaks, and adjust as your systems evolve.",
          },
        ],
      },
      es: {
        slug: "datos-e-informes",
        title: "Datos e informes",
        summary:
          "Datos organizados y paneles claros para decidir con base en lo que realmente pasa.",
        intro:
          "Una buena decisión pide datos confiables y una forma clara de verlos. Organizamos cómo se recolectan los datos, construimos paneles que la gente realmente usa y armamos los flujos que los mantienen actualizados.",
        problems: [
          "Equipos distintos muestran números distintos para lo mismo.",
          "Para tener un informe, alguien debe extraer los datos a mano.",
          "Los datos viven en sistemas separados, sin una fuente única.",
          "Decides por intuición porque el número tarda en llegar.",
        ],
        deliverables: [
          "Un modelo de datos que refleja tu negocio",
          "Flujos que mantienen los datos actualizados solos",
          "Una base de datos pensada para las consultas que haces",
          "Paneles construidos en torno a las decisiones que apoyan",
          "Documentación de dónde sale cada número",
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
            question: "¿Qué pasa si una fuente de datos cambia?",
            answer:
              "Monitoreamos los flujos para notar rápido cuándo se rompe una fuente y ajustamos a medida que evolucionan tus sistemas.",
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
          "Estrutura na nuvem que aguenta o crescimento, com monitoramento e custo acompanhado.",
        intro:
          "Infraestrutura deveria ser algo em que você raramente pensa. Fazemos o diagnóstico do ambiente, migramos e desenhamos a arquitetura na AWS, e deixamos tudo observável: confiabilidade, capacidade e custo acompanhados.",
        problems: [
          "O sistema fica lento ou cai nos horários de pico.",
          "Você só sabe que algo quebrou quando um cliente avisa.",
          "A conta de nuvem só cresce e ninguém sabe por quê.",
          "Você vai crescer e não sabe se a estrutura aguenta.",
        ],
        deliverables: [
          "Diagnóstico do ambiente: estado atual, riscos e arquitetura-alvo",
          "Migração ou arquitetura na AWS, dimensionada para o tráfego real",
          "Monitoramento e alertas para ver o problema antes do cliente",
          "Plano de recuperação e rotina de backup",
          "Custo por serviço acompanhado (FinOps) e ambiente documentado",
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
            question: "Como melhoram um sistema existente sem parar tudo?",
            answer:
              "Medimos primeiro, mudamos a parte da arquitetura com maior impacto, confirmamos a melhora e seguimos. O sistema fica no ar o tempo todo.",
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
          "Cloud infrastructure that holds up as you grow, with monitoring and tracked cost.",
        intro:
          "Infrastructure should be something you rarely think about. We assess the environment, migrate and design the architecture on AWS, and make everything observable: reliability, capacity and cost tracked.",
        problems: [
          "The system slows down or goes down at peak times.",
          "You only learn something broke when a customer tells you.",
          "The cloud bill keeps growing and nobody knows why.",
          "You're about to grow and don't know if the setup can take it.",
        ],
        deliverables: [
          "Environment assessment: current state, risks and target architecture",
          "Migration or architecture on AWS, sized for real traffic",
          "Monitoring and alerts to see problems before customers do",
          "A recovery plan and backup routine",
          "Cost per service tracked (FinOps) and the environment documented",
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
            question:
              "How do you improve an existing system without stopping everything?",
            answer:
              "We measure first, change the part of the architecture with the highest impact, confirm the improvement and move on. The system stays live throughout.",
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
          "Infraestructura en la nube que aguanta el crecimiento, con monitoreo y costo seguido.",
        intro:
          "La infraestructura debería ser algo en lo que rara vez piensas. Hacemos el diagnóstico del entorno, migramos y diseñamos la arquitectura en AWS, y dejamos todo observable: confiabilidad, capacidad y costo seguidos.",
        problems: [
          "El sistema se vuelve lento o se cae en horas pico.",
          "Solo te enteras de que algo falló cuando un cliente avisa.",
          "La cuenta de la nube solo crece y nadie sabe por qué.",
          "Vas a crecer y no sabes si la estructura aguanta.",
        ],
        deliverables: [
          "Diagnóstico del entorno: estado actual, riesgos y arquitectura objetivo",
          "Migración o arquitectura en AWS, dimensionada para el tráfico real",
          "Monitoreo y alertas para ver el problema antes que el cliente",
          "Plan de recuperación y rutina de respaldo",
          "Costo por servicio seguido (FinOps) y entorno documentado",
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
            question: "¿Cómo mejoran un sistema existente sin detener todo?",
            answer:
              "Medimos primero, cambiamos la parte de la arquitectura con mayor impacto, confirmamos la mejora y seguimos. El sistema queda en línea todo el tiempo.",
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

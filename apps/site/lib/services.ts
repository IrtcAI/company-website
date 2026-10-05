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
  technologies: string[];
  pillar: PillarId;
  supportPillars?: PillarId[];
  copy: Record<Locale, ServiceCopy>;
};

export const services: Service[] = [
  {
    id: "custom-software",
    icon: "Layers3",
    pillar: "software",
    technologies: ["TypeScript", "Node.js", "NestJS", "React", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "software-sob-medida",
        title: "Software sob medida",
        summary:
          "Da ideia à primeira versão: planejamos, construímos e evoluímos o sistema que a sua operação precisa.",
        intro:
          "Software sob medida faz sentido quando uma ferramenta pronta quase resolve seu problema, o processo ainda vive em planilhas ou você tem uma ideia que nenhum produto do mercado cobre. Partimos do seu processo, não de um modelo pronto, e construímos a versão que realmente encaixa no jeito que sua equipe trabalha.",
        problems: [
          "Uma ferramenta pronta quase resolve, mas você sempre esbarra nos limites dela.",
          "Seu processo vive em planilhas, mensagens e na memória de alguém, e não acompanha o crescimento.",
          "Você tem uma ideia de produto e precisa de uma primeira versão funcionando para testar com usuários reais.",
          "Você quer um sistema seu: suas regras, seus dados, seu roteiro de evolução.",
        ],
        deliverables: [
          "Sessões de descoberta para mapear o problema e quem lida com ele no dia a dia",
          "Uma primeira versão com escopo definido, com o fluxo essencial funcionando de ponta a ponta",
          "Telas para computador e celular, pensadas para tarefas reais",
          "Um lançamento que você já pode colocar na frente dos usuários",
          "Um roteiro do que vem depois da primeira versão",
        ],
        measure: [
          "O projeto define com você, no início, qual fluxo precisa funcionar de ponta a ponta na primeira versão e como ele será aceito.",
          "O tempo e o retrabalho do processo atual são medidos antes e comparados depois da implantação.",
          "Usuários reais testam a primeira versão, e o que eles encontram define as prioridades seguintes.",
        ],
        faq: [
          {
            question:
              "O que influencia o custo de um projeto de software sob medida?",
            answer:
              "Principalmente o tamanho da primeira versão: quantos fluxos, integrações e perfis de usuário ela precisa. Definimos isso juntos antes de escrever qualquer código, para que a estimativa reflita o seu problema, não um pacote genérico. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Como o projeto sai da ideia até um sistema funcionando?",
            answer:
              "Trabalhamos em etapas curtas, com demonstrações frequentes. Você vê software funcionando desde cedo, e as prioridades podem mudar conforme aprendemos o que importa mais para os usuários.",
          },
          {
            question: "O que preciso ter pronto antes de começarmos?",
            answer:
              "Uma descrição clara do problema e, se possível, acesso a quem lida com ele todos os dias. Você não precisa de uma especificação fechada; construímos isso juntos durante a descoberta.",
          },
          {
            question: "Como vocês decidem qual tecnologia usar?",
            answer:
              "Escolhemos a stack depois de entender o problema, não antes. As tecnologias listadas aqui são as que usamos com frequência, escolhidas de acordo com sua equipe, seu orçamento e como o sistema precisa crescer.",
          },
        ],
      },
      en: {
        slug: "custom-software",
        title: "Custom software",
        summary:
          "From idea to first release: we plan, build and keep improving the system your business needs.",
        intro:
          "Custom software is the right fit when a ready-made tool almost solves your problem, your process still lives in spreadsheets, or you have an idea that no product on the market covers. We start from your process, not a template, and build the version that actually fits how your team works.",
        problems: [
          "A ready-made tool almost solves it, but you keep working around its limits.",
          "Your process lives in spreadsheets, messages and someone's memory, and it doesn't scale.",
          "You have a product idea and need a working first version to test with real users.",
          "You want a system that's yours: your rules, your data, your own roadmap.",
        ],
        deliverables: [
          "Discovery sessions to map the problem and the people who deal with it every day",
          "A scoped first version, with the essential flow working end to end",
          "Screens for computer and phone, built around real tasks",
          "A working release you can put in front of users",
          "A roadmap for what comes after the first version",
        ],
        measure: [
          "The project defines with you, at the start, which flow has to work end to end in the first version and how it will be accepted.",
          "Time and rework in the current process are measured before and compared after rollout.",
          "Real users test the first version, and what they find sets the next priorities.",
        ],
        faq: [
          {
            question: "What affects the cost of a custom software project?",
            answer:
              "Mostly the size of the first version: how many flows, integrations and user roles it needs. We scope this together before any code is written, so the estimate reflects your actual problem, not a generic package. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question:
              "How does the project move from idea to a working system?",
            answer:
              "We work in short stages with regular demos. You see working software early and often, and priorities can shift as we learn what matters most to your users.",
          },
          {
            question: "What do I need to have ready before we start?",
            answer:
              "A clear description of the problem and, if possible, access to whoever deals with it daily. You don't need a finished specification; we build that together during discovery.",
          },
          {
            question: "How do you decide which technology to use?",
            answer:
              "We choose the stack after understanding the problem, not before. The technologies listed here are ones we use often, picked based on your team, your budget and how the system needs to grow.",
          },
        ],
      },
      es: {
        slug: "software-a-medida",
        title: "Software a medida",
        summary:
          "De la idea a la primera versión: planificamos, construimos y mejoramos el sistema que tu operación necesita.",
        intro:
          "El software a medida tiene sentido cuando una herramienta lista casi resuelve tu problema, el proceso todavía vive en hojas de cálculo o tienes una idea que ningún producto del mercado cubre. Partimos de tu proceso, no de una plantilla, y construimos la versión que realmente encaja con cómo trabaja tu equipo.",
        problems: [
          "Una herramienta lista casi resuelve, pero siempre chocas con sus límites.",
          "Tu proceso vive en hojas de cálculo, mensajes y en la memoria de alguien, y no acompaña el crecimiento.",
          "Tienes una idea de producto y necesitas una primera versión funcionando para probarla con usuarios reales.",
          "Quieres un sistema propio: tus reglas, tus datos, tu hoja de ruta.",
        ],
        deliverables: [
          "Sesiones de descubrimiento para mapear el problema y a quién lo enfrenta cada día",
          "Una primera versión con alcance definido, con el flujo esencial funcionando de punta a punta",
          "Pantallas para computadora y celular, pensadas para tareas reales",
          "Un lanzamiento que ya puedes poner frente a los usuarios",
          "Una hoja de ruta de lo que viene después de la primera versión",
        ],
        measure: [
          "El proyecto define contigo, al inicio, qué flujo debe funcionar de punta a punta en la primera versión y cómo se aceptará.",
          "El tiempo y el retrabajo del proceso actual se miden antes y se comparan después de la implantación.",
          "Usuarios reales prueban la primera versión, y lo que encuentran define las prioridades siguientes.",
        ],
        faq: [
          {
            question:
              "¿Qué influye en el costo de un proyecto de software a medida?",
            answer:
              "Sobre todo el tamaño de la primera versión: cuántos flujos, integraciones y perfiles de usuario necesita. Definimos esto juntos antes de escribir código, para que el presupuesto refleje tu problema real, no un paquete genérico. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question:
              "¿Cómo pasa el proyecto de la idea a un sistema funcionando?",
            answer:
              "Trabajamos en ciclos cortos, con demostraciones frecuentes. Ves software funcionando desde el principio, y las prioridades pueden cambiar según aprendemos qué importa más para los usuarios.",
          },
          {
            question: "¿Qué necesito tener listo antes de empezar?",
            answer:
              "Una descripción clara del problema y, si es posible, acceso a quien lo enfrenta a diario. No necesitas una especificación cerrada; la construimos juntos durante el descubrimiento.",
          },
          {
            question: "¿Cómo deciden qué tecnología usar?",
            answer:
              "Elegimos la tecnología después de entender el problema, no antes. Las tecnologías que aparecen aquí son las que usamos con frecuencia, elegidas según tu equipo, tu presupuesto y cómo necesita crecer el sistema.",
          },
        ],
      },
    },
  },
  {
    id: "web-platforms",
    icon: "Globe2",
    pillar: "software",
    technologies: ["Next.js", "React", "Vue.js", "TypeScript"],
    copy: {
      "pt-BR": {
        slug: "sites-e-plataformas-web",
        title: "Sites e plataformas web",
        summary:
          "Portais, painéis e sites rápidos, acessíveis e fáceis de usar em qualquer tela.",
        intro:
          "Sites, portais e painéis são como a maior parte das pessoas conhece sua empresa online. Construímos para carregar rápido, funcionar em qualquer tela e aguentar o crescimento do conteúdo e do tráfego, de um site institucional a um painel que sua equipe usa todos os dias.",
        problems: [
          "Seu site é lento, difícil de atualizar ou não funciona bem no celular.",
          "Você precisa de um portal para clientes ou parceiros, não só de uma página pública.",
          "Sua equipe precisa de um painel interno para ver o que está acontecendo sem pedir um relatório para alguém.",
          "Você está lançando um produto ou serviço novo e precisa de um site que sustente isso.",
        ],
        deliverables: [
          "Arquitetura de informação e planejamento de conteúdo",
          "Interfaces responsivas para computador e celular",
          "Uma construção rápida e acessível, com HTML semântico",
          "Uma área de conteúdo ou administração que sua equipe atualiza sem depender de um desenvolvedor",
          "Indicadores e monitoramento para você acompanhar o desempenho do site",
        ],
        measure: [
          "A velocidade de carregamento e a acessibilidade são medidas em páginas combinadas, com metas definidas no projeto.",
          "Na entrega, verificamos com sua equipe que ela consegue atualizar o conteúdo sem depender de um desenvolvedor.",
          "Indicadores de uso mostram o que os visitantes realmente fazem no site.",
        ],
        faq: [
          {
            question: "O que influencia o preço de um site ou plataforma web?",
            answer:
              "A quantidade de páginas e fluxos, se precisa de área logada ou painel, e as integrações com outros sistemas. Um site institucional custa menos que um portal com contas e permissões. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Quanto tempo leva para lançar um site ou plataforma?",
            answer:
              "Depende do escopo definido no diagnóstico. Lançamos por etapas: uma primeira versão vai ao ar com as páginas essenciais, e adicionamos funcionalidades de acordo com o que os visitantes realmente usam.",
          },
          {
            question: "O que devo levar para a primeira conversa?",
            answer:
              "Exemplos de sites que você gosta, seu conteúdo atual, se já existir, e uma ideia de quem visita o site e o que você quer que essa pessoa faça nele.",
          },
          {
            question: "O que acontece depois que o site entra no ar?",
            answer:
              "Acompanhamos desempenho e disponibilidade, e podemos apoiar atualizações, novas páginas ou funcionalidades conforme sua empresa muda. Esse acompanhamento é combinado como Continuous Engineering, com escopo, cadência e atendimento definidos conforme a operação.",
          },
        ],
      },
      en: {
        slug: "web-platforms",
        title: "Websites and web platforms",
        summary:
          "Fast, accessible portals, dashboards and websites that work on any screen.",
        intro:
          "Websites, portals and dashboards are how most people meet your business online. We build them to load fast, work on any screen and hold up as content and traffic grow, from a marketing site to an internal panel your team uses every day.",
        problems: [
          "Your website is slow, hard to update or doesn't work well on phones.",
          "You need a client or partner portal, not just a public page.",
          "Your team needs an internal dashboard to see what's happening without asking someone to pull a report.",
          "You're launching a new product or service and need a site that supports it.",
        ],
        deliverables: [
          "Information architecture and content planning",
          "Responsive interfaces for desktop and mobile",
          "A fast, accessible build with clean semantic HTML",
          "A content or admin area your team can update without a developer",
          "Analytics and monitoring so you know how the site performs",
        ],
        measure: [
          "Loading speed and accessibility are measured on agreed pages, against targets set in the project.",
          "At handover, we check with your team that they can update content without a developer.",
          "Usage indicators show what visitors actually do on the site.",
        ],
        faq: [
          {
            question: "What affects the price of a website or web platform?",
            answer:
              "The number of pages and flows, whether it needs a login area or dashboard, and any integrations with other systems. A marketing site costs less than a portal with accounts and permissions. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How long does a website or platform take to launch?",
            answer:
              "It depends on the scope defined during the diagnosis. We release in stages: a first version goes live with the core pages, then we add features based on what visitors actually use.",
          },
          {
            question: "What should I bring to the first conversation?",
            answer:
              "Examples of sites you like, your current content if you have it, and a sense of who visits the site and what you want them to do there.",
          },
          {
            question: "What happens after the site goes live?",
            answer:
              "We monitor performance and uptime and can support updates, new pages or features as your business changes. That is arranged as Continuous Engineering, with scope, cadence and support set according to the operation.",
          },
        ],
      },
      es: {
        slug: "sitios-y-plataformas-web",
        title: "Sitios y plataformas web",
        summary:
          "Portales, paneles y sitios rápidos, accesibles y fáciles de usar en cualquier pantalla.",
        intro:
          "Sitios, portales y paneles son la forma en que la mayoría de las personas conoce tu empresa en línea. Los construimos para que carguen rápido, funcionen en cualquier pantalla y aguanten el crecimiento del contenido y el tráfico, desde un sitio institucional hasta un panel que tu equipo usa todos los días.",
        problems: [
          "Tu sitio es lento, difícil de actualizar o no funciona bien en el celular.",
          "Necesitas un portal para clientes o socios, no solo una página pública.",
          "Tu equipo necesita un panel interno para ver qué está pasando sin pedirle un informe a alguien.",
          "Estás lanzando un producto o servicio nuevo y necesitas un sitio que lo respalde.",
        ],
        deliverables: [
          "Arquitectura de información y planificación de contenido",
          "Interfaces responsivas para computadora y celular",
          "Una construcción rápida y accesible, con HTML semántico",
          "Un área de contenido o administración que tu equipo actualiza sin depender de un desarrollador",
          "Indicadores y monitoreo para que sigas el desempeño del sitio",
        ],
        measure: [
          "La velocidad de carga y la accesibilidad se miden en páginas acordadas, con metas definidas en el proyecto.",
          "En la entrega, verificamos con tu equipo que pueda actualizar el contenido sin depender de un desarrollador.",
          "Indicadores de uso muestran lo que los visitantes realmente hacen en el sitio.",
        ],
        faq: [
          {
            question: "¿Qué influye en el precio de un sitio o plataforma web?",
            answer:
              "La cantidad de páginas y flujos, si necesita área con cuenta o panel, y las integraciones con otros sistemas. Un sitio institucional cuesta menos que un portal con cuentas y permisos. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cuánto tarda en lanzarse un sitio o plataforma?",
            answer:
              "Depende del alcance definido en el diagnóstico. Lanzamos por etapas: una primera versión sale con las páginas esenciales, y agregamos funciones según lo que los visitantes realmente usan.",
          },
          {
            question: "¿Qué debo llevar a la primera conversación?",
            answer:
              "Ejemplos de sitios que te gustan, tu contenido actual si ya existe, y una idea de quién visita el sitio y qué quieres que haga ahí.",
          },
          {
            question: "¿Qué pasa después de que el sitio sale en línea?",
            answer:
              "Damos seguimiento al desempeño y la disponibilidad, y podemos apoyar actualizaciones, nuevas páginas o funciones conforme tu empresa cambia. Eso se acuerda como Continuous Engineering, con alcance, cadencia y atención definidos según la operación.",
          },
        ],
      },
    },
  },
  {
    id: "mobile-apps",
    icon: "Smartphone",
    pillar: "software",
    technologies: ["React Native", "TypeScript", "Node.js"],
    copy: {
      "pt-BR": {
        slug: "aplicativos",
        title: "Aplicativos para celular",
        summary:
          "Aplicativos para Android e iPhone que funcionam no dia a dia, até em campo e com internet instável.",
        intro:
          "Desenvolvemos aplicativos para Android e iPhone para equipes que trabalham fora do escritório: visitas em campo, entregas, vistorias, vendas externas. O aplicativo é desenhado para continuar funcionando com internet instável, porque é nesse cenário que o trabalho em campo costuma acontecer.",
        problems: [
          "Sua equipe ainda coleta dados em papel ou planilha durante o trabalho em campo.",
          "Seu aplicativo atual trava ou para de funcionar sem uma conexão forte.",
          "Você precisa que clientes ou equipe de campo concluam uma tarefa pelo celular.",
          "Você quer um único aplicativo que funcione em Android e iPhone sem construir dois.",
        ],
        deliverables: [
          "Um fluxo de navegação desenhado para uso com uma mão só, em movimento, e validado com quem vai usar",
          "Funcionamento offline, para o aplicativo continuar funcionando com conexão fraca ou sem internet",
          "Desenvolvimento em React Native para Android e iPhone a partir de uma única base de código",
          "Integração com os sistemas e dados que você já usa",
          "Publicação nas lojas de aplicativos e suporte a atualizações",
        ],
        measure: [
          "O projeto mede o tempo de entrada de dados do processo atual e define uma meta para o aplicativo.",
          "O funcionamento com conexão fraca ou sem internet é testado em cenários combinados antes do lançamento.",
          "A equipe de campo valida o fluxo principal antes da publicação nas lojas.",
        ],
        faq: [
          {
            question: "O que influencia o custo de um aplicativo de celular?",
            answer:
              "A quantidade de telas, se precisa funcionar offline e quantos sistemas ele conecta. Aplicativos que funcionam offline exigem mais cuidado no design, mas valem a pena no campo. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Como vocês conduzem o desenvolvimento?",
            answer:
              "Começamos pela tarefa que o aplicativo precisa resolver bem, lançamos essa primeira versão e testamos com quem realmente vai usar, antes de adicionar mais.",
          },
          {
            question: "O que vocês precisam da nossa equipe para começar?",
            answer:
              "Acesso a quem usa o aplicativo no dia a dia, além dos sistemas com os quais ele precisa conversar, como um CRM ou controle de estoque.",
          },
          {
            question:
              "Por que React Native em vez de aplicativos nativos separados?",
            answer:
              "Isso permite construir e manter um único aplicativo para as duas plataformas, o que tende a simplificar a manutenção. Quando um projeto realmente precisa de desempenho nativo em uma plataforma, avisamos isso desde o início.",
          },
        ],
      },
      en: {
        slug: "mobile-apps",
        title: "Mobile apps",
        summary:
          "Android and iPhone apps built for daily work, even in the field with a patchy connection.",
        intro:
          "We build Android and iPhone apps for teams that work outside a desk: field visits, deliveries, inspections, sales on the road. The app is designed to keep working on a weak connection, because that is where field work usually happens.",
        problems: [
          "Your team collects data on paper or in spreadsheets while out in the field.",
          "Your current app breaks or gets stuck without a strong internet connection.",
          "You need customers or field staff to complete a task from their phone.",
          "You want one app that works for both Android and iPhone without building it twice.",
        ],
        deliverables: [
          "A navigation flow designed for one-handed, on-the-go use and checked with the people who will use it",
          "Offline support so the app keeps working with a weak or no connection",
          "React Native development for Android and iPhone from one codebase",
          "Integration with your existing systems and data",
          "App store publishing and update support",
        ],
        measure: [
          "The project measures data entry time in the current process and sets a target for the app.",
          "Behavior on a weak or missing connection is tested in agreed scenarios before launch.",
          "The field team validates the main flow before the app is published to the stores.",
        ],
        faq: [
          {
            question: "What affects the cost of a mobile app?",
            answer:
              "The number of screens, whether it needs offline support, and how many systems it connects to. Offline-first apps take more care to design well, but they pay off in the field. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How do you approach the build?",
            answer:
              "We start with the one task the app has to get right, ship that as a first version, and test it with the people who'll actually use it before adding more.",
          },
          {
            question: "What do you need from us to start?",
            answer:
              "Access to whoever uses the app daily, plus any systems it needs to talk to, like a CRM or inventory tool.",
          },
          {
            question:
              "Why React Native instead of separate Android and iPhone apps?",
            answer:
              "It lets us build and maintain one app for both platforms, which tends to simplify maintenance. When a project truly needs native performance for one platform, we say so up front.",
          },
        ],
      },
      es: {
        slug: "aplicaciones-moviles",
        title: "Aplicaciones móviles",
        summary:
          "Aplicaciones para Android y iPhone pensadas para el día a día, incluso en campo y con conexión inestable.",
        intro:
          "Desarrollamos aplicaciones para Android y iPhone para equipos que trabajan fuera de la oficina: visitas de campo, entregas, inspecciones, ventas externas. La aplicación se diseña para seguir funcionando con conexión inestable, porque ahí suele ocurrir el trabajo de campo.",
        problems: [
          "Tu equipo todavía recolecta datos en papel o en hojas de cálculo durante el trabajo de campo.",
          "Tu aplicación actual se traba o deja de funcionar sin una conexión fuerte.",
          "Necesitas que clientes o personal de campo completen una tarea desde el celular.",
          "Quieres una sola aplicación que funcione en Android y iPhone sin construir dos.",
        ],
        deliverables: [
          "Un flujo de navegación diseñado para usarse con una mano, en movimiento, y validado con quienes lo van a usar",
          "Funcionamiento offline, para que la aplicación siga funcionando con conexión débil o sin internet",
          "Desarrollo en React Native para Android y iPhone desde una sola base de código",
          "Integración con los sistemas y datos que ya usas",
          "Publicación en las tiendas de aplicaciones y soporte para actualizaciones",
        ],
        measure: [
          "El proyecto mide el tiempo de entrada de datos del proceso actual y define una meta para la aplicación.",
          "El funcionamiento con conexión débil o sin internet se prueba en escenarios acordados antes del lanzamiento.",
          "El equipo de campo valida el flujo principal antes de la publicación en las tiendas.",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de una aplicación móvil?",
            answer:
              "La cantidad de pantallas, si necesita funcionar offline y con cuántos sistemas se conecta. Las aplicaciones que funcionan offline exigen más cuidado en el diseño, pero valen la pena en el campo. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cómo abordan el desarrollo?",
            answer:
              "Empezamos por la tarea que la aplicación tiene que resolver bien, lanzamos esa primera versión y la probamos con quienes realmente la van a usar, antes de agregar más.",
          },
          {
            question: "¿Qué necesitan de nuestro equipo para empezar?",
            answer:
              "Acceso a quien usa la aplicación a diario, además de los sistemas con los que necesita conectarse, como un CRM o control de inventario.",
          },
          {
            question:
              "¿Por qué React Native en lugar de aplicaciones nativas separadas?",
            answer:
              "Nos permite construir y mantener una sola aplicación para ambas plataformas, lo que tiende a simplificar el mantenimiento. Cuando un proyecto realmente necesita rendimiento nativo en una plataforma, lo decimos desde el principio.",
          },
        ],
      },
    },
  },
  {
    id: "integrations",
    icon: "Network",
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
          "A maioria das operações usa mais de um sistema: CRM, meio de pagamento, equipamento de laboratório, ferramenta financeira. Conectamos esses sistemas para que a informação flua automaticamente, com verificações que detectam erros cedo, antes que cheguem até o cliente.",
        problems: [
          "Alguém digita a mesma informação em dois ou mais sistemas.",
          "Você precisa que sistemas de laboratório, pagamento ou autenticação conversem entre si.",
          "Etapas manuais entre sistemas causam atrasos ou erros que chegam até o cliente.",
          "Sua empresa cresceu mais do que as planilhas conseguem sustentar como elo entre ferramentas.",
        ],
        deliverables: [
          "Um mapa dos sistemas envolvidos e dos dados que precisam circular entre eles",
          "APIs e conectores construídos para os seus sistemas específicos",
          "Verificações automáticas para detectar erros perto de onde eles acontecem",
          "Monitoramento para você saber quando uma conexão falha",
          "Documentação que sua equipe consegue usar sem precisar nos chamar",
        ],
        measure: [
          "O projeto mede o retrabalho e os erros de digitação manual antes e depois da integração.",
          "As verificações automáticas registram falhas entre sistemas, e o aceite define quais precisam estar cobertas.",
          "Você e a IRTC combinam em quanto tempo uma falha deve ser percebida e quem recebe o aviso.",
        ],
        faq: [
          {
            question: "O que influencia o custo de um projeto de integração?",
            answer:
              "Principalmente quantos sistemas estão envolvidos e a qualidade da documentação deles. Uma API bem documentada conecta rápido; um sistema antigo sem documentação leva mais tempo. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Como vocês evitam quebrar o que já funciona?",
            answer:
              "Construímos e testamos as integrações primeiro em uma cópia dos seus dados, e colocamos em produção por etapas, para que os sistemas que você depende continuem funcionando enquanto conectamos tudo.",
          },
          {
            question: "Que acesso vocês precisam da gente?",
            answer:
              "Acesso de leitura ou credenciais de teste dos sistemas envolvidos, e alguém que saiba como cada um deles é usado hoje.",
          },
          {
            question: "E se um sistema conectado mudar depois?",
            answer:
              "Monitoramos as integrações que construímos para detectar falhas rápido, e podemos atualizar a conexão quando um dos lados muda sua API ou suas regras.",
          },
        ],
      },
      en: {
        slug: "integrations-and-automation",
        title: "Integrations and automation",
        summary:
          "We connect your business systems and take repetitive work out of spreadsheets.",
        intro:
          "Most operations run on more than one system: a CRM, a payment provider, lab equipment, an accounting tool. We connect them so information moves automatically, with checks in place so mistakes are caught early instead of reaching a customer.",
        problems: [
          "Someone retypes the same information into two or more systems.",
          "You need lab, payment or authentication systems talking to each other.",
          "Manual steps between systems cause delays or errors that reach customers.",
          "You've outgrown spreadsheets as the glue between tools.",
        ],
        deliverables: [
          "A map of the systems involved and the data that needs to move between them",
          "APIs and connectors built for your specific systems",
          "Automated checks so errors are caught close to where they happen",
          "Monitoring so you know when a connection fails",
          "Documentation your team can use without calling us first",
        ],
        measure: [
          "The project measures rework and manual-entry errors before and after the integration.",
          "Automated checks log failures between systems, and acceptance defines which ones must be covered.",
          "You and IRTC agree on how quickly a failure must be noticed and who gets the alert.",
        ],
        faq: [
          {
            question: "What affects the cost of an integration project?",
            answer:
              "Mostly how many systems are involved and whether their documentation is good. A well-documented API is quick to connect; a legacy system with no documentation takes longer. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How do you avoid breaking what already works?",
            answer:
              "We build and test integrations against a copy of your data first, and roll them out in stages, so the systems you depend on keep running while we connect them.",
          },
          {
            question: "What access do you need from us?",
            answer:
              "Read access or sandbox credentials for the systems involved, and someone who knows how each one is currently used.",
          },
          {
            question: "What if a connected system changes later?",
            answer:
              "We monitor the integrations we build so a failure gets caught quickly, and we can update the connection when one side changes its API or rules.",
          },
        ],
      },
      es: {
        slug: "integraciones-y-automatizacion",
        title: "Integraciones y automatización",
        summary:
          "Conectamos los sistemas de la empresa y sacamos el trabajo repetitivo de las hojas de cálculo.",
        intro:
          "La mayoría de las operaciones usa más de un sistema: CRM, medio de pago, equipo de laboratorio, herramienta contable. Los conectamos para que la información se mueva automáticamente, con verificaciones que detectan errores temprano, antes de que lleguen al cliente.",
        problems: [
          "Alguien escribe la misma información en dos o más sistemas.",
          "Necesitas que sistemas de laboratorio, pago o autenticación se comuniquen entre sí.",
          "Pasos manuales entre sistemas causan retrasos o errores que llegan al cliente.",
          "Tu empresa creció más de lo que las hojas de cálculo pueden sostener como enlace entre herramientas.",
        ],
        deliverables: [
          "Un mapa de los sistemas involucrados y los datos que necesitan moverse entre ellos",
          "APIs y conectores construidos para tus sistemas específicos",
          "Verificaciones automáticas para detectar errores cerca de donde ocurren",
          "Monitoreo para que sepas cuándo falla una conexión",
          "Documentación que tu equipo puede usar sin tener que llamarnos primero",
        ],
        measure: [
          "El proyecto mide el retrabajo y los errores de digitación manual antes y después de la integración.",
          "Las verificaciones automáticas registran fallas entre sistemas, y la aceptación define cuáles deben estar cubiertas.",
          "Tú e IRTC acuerdan en cuánto tiempo debe detectarse una falla y quién recibe el aviso.",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de un proyecto de integración?",
            answer:
              "Sobre todo cuántos sistemas están involucrados y qué tan buena es su documentación. Una API bien documentada se conecta rápido; un sistema antiguo sin documentación toma más tiempo. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cómo evitan romper lo que ya funciona?",
            answer:
              "Construimos y probamos las integraciones primero sobre una copia de tus datos, y las implementamos por etapas, para que los sistemas de los que dependes sigan funcionando mientras conectamos todo.",
          },
          {
            question: "¿Qué acceso necesitan de nosotros?",
            answer:
              "Acceso de lectura o credenciales de prueba de los sistemas involucrados, y alguien que sepa cómo se usa cada uno hoy.",
          },
          {
            question: "¿Y si un sistema conectado cambia después?",
            answer:
              "Monitoreamos las integraciones que construimos para detectar fallas rápido, y podemos actualizar la conexión cuando uno de los lados cambia su API o sus reglas.",
          },
        ],
      },
    },
  },
  {
    id: "modernization",
    icon: "RefreshCw",
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
          "Sistemas antigos raramente precisam ser reconstruídos do zero. Atualizamos por etapas, trocando as partes que travam sua equipe sem parar a operação. Começamos medindo quanto tempo as entregas levam hoje, para que a melhora tenha uma base de comparação.",
        problems: [
          "Toda funcionalidade nova demora mais do que deveria porque o código resiste à mudança.",
          "Seu sistema funciona, mas ninguém quer mais mexer nele.",
          "Você tem medo de que uma reescrita grande pare a empresa por meses.",
          "Relatórios e painéis são lentos ou mostram números em que ninguém confia.",
        ],
        deliverables: [
          "Uma auditoria do sistema atual e das partes mais arriscadas de mudar",
          "Um plano de migração por etapas que mantém o sistema no ar o tempo todo",
          "Serviços refatorados e componentes reutilizáveis",
          "Testes automatizados nas áreas que tocamos",
          "Uma medição do tempo de entrega atual, usada como base de comparação",
        ],
        measure: [
          "O projeto mede o tempo de entrega de mudanças antes de começar e define uma meta de melhora a partir dessa base.",
          "Cada etapa tem critério de teste e plano de reversão combinados antes da mudança.",
          "As áreas alteradas ganham testes automatizados, e a cobertura é registrada na entrega.",
        ],
        faq: [
          {
            question: "O que influencia o custo de um projeto de modernização?",
            answer:
              "O tamanho do código, quanta cobertura de testes já existe e quantas partes precisam mudar juntas. Começamos com uma auditoria para que o plano seja baseado no seu sistema real, não em suposições. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Como vocês modernizam sem parar a empresa?",
            answer:
              "Por etapas. Identificamos primeiro as mudanças de maior impacto e menor risco, lançamos e confirmamos que nada quebrou antes de seguir para a próxima parte.",
          },
          {
            question: "O que vocês precisam da nossa equipe?",
            answer:
              "Acesso ao código e à infraestrutura, e um tempo de alguém que conheça a história do sistema, mesmo que informalmente.",
          },
          {
            question: "Vocês trocam toda a nossa stack?",
            answer:
              "Raramente. Geralmente mantemos o que funciona e trocamos o que realmente causa dor. As escolhas de tecnologia vêm da auditoria, não da preferência pela ferramenta mais nova.",
          },
        ],
      },
      en: {
        slug: "system-modernization",
        title: "System modernization",
        summary:
          "We update older systems step by step, without stopping the work that depends on them.",
        intro:
          "Old systems rarely need to be rebuilt from zero. We update them in stages, replacing the parts that slow your team down while keeping the operation running. We start by measuring how long changes take today, so any improvement has a baseline to compare against.",
        problems: [
          "Every new feature takes longer than it should because the codebase fights back.",
          "Your system works, but nobody wants to touch it anymore.",
          "You're afraid a big rewrite will stall the business for months.",
          "Reports and dashboards are slow or show numbers nobody trusts.",
        ],
        deliverables: [
          "An audit of the current system and the riskiest parts to change",
          "A staged migration plan that keeps the system running throughout",
          "Refactored services and reusable components",
          "Automated tests around the areas we touch",
          "A measurement of current delivery time, used as the baseline for comparison",
        ],
        measure: [
          "The project measures how long changes take before starting and sets an improvement target from that baseline.",
          "Each stage has test criteria and a rollback plan agreed before the change.",
          "The areas we touch get automated tests, and coverage is recorded at handover.",
        ],
        faq: [
          {
            question: "What affects the cost of a modernization project?",
            answer:
              "The size of the codebase, how much test coverage exists already, and how many parts need to change together. We start with an audit so the plan is based on your actual system, not guesswork. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How do you modernize without stopping the business?",
            answer:
              "In stages. We identify the highest-impact, lowest-risk changes first, ship them, and confirm nothing broke before moving to the next piece.",
          },
          {
            question: "What do you need from our team?",
            answer:
              "Access to the codebase and infrastructure, and time from someone who knows the system's history, even informally.",
          },
          {
            question: "Do you replace our whole stack?",
            answer:
              "Rarely. We usually keep what works and replace what's actually causing pain. Technology choices come out of the audit, not a preference for the newest tool.",
          },
        ],
      },
      es: {
        slug: "modernizacion-de-sistemas",
        title: "Modernización de sistemas",
        summary:
          "Actualizamos sistemas antiguos por etapas, sin detener la operación que depende de ellos.",
        intro:
          "Los sistemas antiguos casi nunca necesitan reconstruirse desde cero. Los actualizamos por etapas, cambiando las partes que frenan a tu equipo sin detener la operación. Empezamos midiendo cuánto tardan hoy las entregas, para que cualquier mejora tenga una base de comparación.",
        problems: [
          "Cada función nueva tarda más de lo que debería porque el código se resiste al cambio.",
          "Tu sistema funciona, pero ya nadie quiere tocarlo.",
          "Te preocupa que una reescritura grande detenga el negocio durante meses.",
          "Los informes y paneles son lentos o muestran números en los que nadie confía.",
        ],
        deliverables: [
          "Una auditoría del sistema actual y de las partes más riesgosas de cambiar",
          "Un plan de migración por etapas que mantiene el sistema funcionando todo el tiempo",
          "Servicios refactorizados y componentes reutilizables",
          "Pruebas automatizadas en las áreas que tocamos",
          "Una medición del tiempo de entrega actual, usada como base de comparación",
        ],
        measure: [
          "El proyecto mide cuánto tardan las entregas antes de empezar y define una meta de mejora a partir de esa base.",
          "Cada etapa tiene criterios de prueba y plan de reversión acordados antes del cambio.",
          "Las áreas modificadas reciben pruebas automatizadas, y la cobertura se registra en la entrega.",
        ],
        faq: [
          {
            question:
              "¿Qué influye en el costo de un proyecto de modernización?",
            answer:
              "El tamaño del código, cuánta cobertura de pruebas existe ya y cuántas partes necesitan cambiar juntas. Empezamos con una auditoría para que el plan se base en tu sistema real, no en suposiciones. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cómo modernizan sin detener el negocio?",
            answer:
              "Por etapas. Identificamos primero los cambios de mayor impacto y menor riesgo, los lanzamos y confirmamos que nada se rompió antes de seguir con la siguiente parte.",
          },
          {
            question: "¿Qué necesitan de nuestro equipo?",
            answer:
              "Acceso al código y a la infraestructura, y tiempo de alguien que conozca la historia del sistema, aunque sea de forma informal.",
          },
          {
            question: "¿Cambian toda nuestra tecnología?",
            answer:
              "Casi nunca. Por lo general mantenemos lo que funciona y cambiamos lo que realmente causa dolor. Las decisiones de tecnología salen de la auditoría, no de una preferencia por lo más nuevo.",
          },
        ],
      },
    },
  },
  {
    id: "applied-ai",
    icon: "Sparkles",
    pillar: "ai",
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector"],
    copy: {
      "pt-BR": {
        slug: "inteligencia-artificial",
        title: "Inteligência artificial aplicada",
        summary:
          "Assistentes e automações com IA ligados ao conhecimento da sua empresa, com segurança e custo sob controle.",
        intro:
          "Inteligência artificial é útil quando responde uma pergunta real mais rápido do que uma pessoa procurando em documentos ou sistemas. Conectamos a IA ao conhecimento da própria empresa, com controle de acesso e verificações de qualidade, começando por um caso de uso claro antes de expandir. A Iris, a assistente deste site, é um exemplo real do que construímos.",
        problems: [
          "Sua equipe ou seus clientes fazem as mesmas perguntas e alguém precisa procurar a resposta toda vez.",
          "A informação está espalhada em documentos, planilhas e sistemas que ninguém quer reorganizar.",
          "Você quer IA no seu produto, mas tem receio de respostas erradas ou custo fora de controle.",
          "Você quer automatizar uma tarefa com várias etapas, não só responder uma pergunta.",
        ],
        deliverables: [
          "Um piloto com escopo em um caso de uso claro e mensurável",
          "Respostas baseadas nos seus próprios documentos, com busca aumentada (RAG)",
          "Busca semântica no seu conteúdo, construída com PostgreSQL e pgvector",
          "Automações e agentes com verificações de segurança e revisão humana onde importa",
          "Acompanhamento contínuo da qualidade das respostas e do custo",
        ],
        measure: [
          "O piloto define a tarefa, as fontes de dados e o que conta como resposta correta antes de qualquer construção.",
          "A qualidade das respostas é avaliada com um conjunto de perguntas reais, e o custo por tarefa é acompanhado.",
          "Controle de acesso e revisão humana são definidos por tipo de tarefa e verificados na entrega.",
        ],
        faq: [
          {
            question: "O que define o custo de um projeto de IA?",
            answer:
              "O maior custo costuma estar em como o conhecimento está organizado e em quanta verificação as respostas exigem, não na IA em si. Um piloto bem definido em um caso de uso permite saber se vale a pena expandir antes de investir mais. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Como vocês conduzem um primeiro projeto de IA?",
            answer:
              "Começamos por uma pergunta ou tarefa que já vale a pena resolver sozinha, e construímos um piloto em cima dela. Isso te dá um exemplo funcionando e dados reais de uso antes de investir mais.",
          },
          {
            question: "O que precisamos ter pronto?",
            answer:
              "Os documentos, sistemas ou conhecimento que a assistente deve usar, e alguém que consiga apontar quando uma resposta está errada.",
          },
          {
            question: "Como vocês mantêm as respostas confiáveis com o tempo?",
            answer:
              "Acompanhamos a qualidade das respostas e o custo continuamente, e ajustamos as verificações de segurança e as fontes conforme seu conteúdo e uso mudam.",
          },
        ],
      },
      en: {
        slug: "applied-ai",
        title: "Applied AI",
        summary:
          "AI assistants and automations connected to your company knowledge, with safety and cost under control.",
        intro:
          "Artificial intelligence is useful when it answers a real question faster than a person searching through documents or systems. We connect AI to your company's own knowledge, with access controls and quality checks, starting from one clear use case before expanding. Iris, the assistant on this website, is a live example of what we build.",
        problems: [
          "Your team or customers ask the same questions and someone has to search for the answer every time.",
          "Information is scattered across documents, spreadsheets and systems nobody wants to reorganize.",
          "You want AI in your product but you're worried about wrong answers or runaway costs.",
          "You want to automate a multi-step task, not just answer a question.",
        ],
        deliverables: [
          "A pilot scoped to one clear, measurable use case",
          "Retrieval-augmented answers grounded in your own documents (RAG)",
          "Semantic search over your content, built with PostgreSQL and pgvector",
          "Automations and agents with safety checks and human review where it matters",
          "Ongoing tracking of answer quality and cost",
        ],
        measure: [
          "The pilot defines the task, the data sources and what counts as a correct answer before anything is built.",
          "Answer quality is evaluated against a set of real questions, and cost per task is tracked.",
          "Access control and human review are set per type of task and verified at handover.",
        ],
        faq: [
          {
            question: "What drives the cost of an AI project?",
            answer:
              "The main cost is usually in how the knowledge is organized and how much checking the answers need, not the AI itself. A well-scoped pilot on one use case lets you find out if it's worth expanding before investing more. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How do you approach a first AI project?",
            answer:
              "We start with one question or task that's worth solving on its own, and build a pilot around it. That gives you a working example and real usage data before committing to more.",
          },
          {
            question: "What do we need to have ready?",
            answer:
              "The documents, systems or knowledge the assistant should draw from, and someone who can tell us when an answer is wrong.",
          },
          {
            question: "How do you keep answers reliable over time?",
            answer:
              "We track answer quality and cost on an ongoing basis and adjust the safety checks and sources as your content and usage change.",
          },
        ],
      },
      es: {
        slug: "inteligencia-artificial",
        title: "Inteligencia artificial aplicada",
        summary:
          "Asistentes y automatizaciones con IA conectados al conocimiento de tu empresa, con seguridad y costos bajo control.",
        intro:
          "La inteligencia artificial es útil cuando responde una pregunta real más rápido que una persona buscando en documentos o sistemas. Conectamos la IA al conocimiento propio de la empresa, con control de acceso y revisiones de calidad, empezando por un caso de uso claro antes de expandir. Iris, la asistente de este sitio, es un ejemplo real de lo que construimos.",
        problems: [
          "Tu equipo o tus clientes hacen las mismas preguntas y alguien tiene que buscar la respuesta cada vez.",
          "La información está dispersa en documentos, hojas de cálculo y sistemas que nadie quiere reorganizar.",
          "Quieres IA en tu producto, pero te preocupan las respuestas equivocadas o el costo fuera de control.",
          "Quieres automatizar una tarea con varios pasos, no solo responder una pregunta.",
        ],
        deliverables: [
          "Un piloto con alcance en un caso de uso claro y medible",
          "Respuestas basadas en tus propios documentos, con búsqueda aumentada (RAG)",
          "Búsqueda semántica en tu contenido, construida con PostgreSQL y pgvector",
          "Automatizaciones y agentes con verificaciones de seguridad y revisión humana donde importa",
          "Seguimiento continuo de la calidad de las respuestas y del costo",
        ],
        measure: [
          "El piloto define la tarea, las fuentes de datos y qué cuenta como respuesta correcta antes de construir.",
          "La calidad de las respuestas se evalúa con un conjunto de preguntas reales, y el costo por tarea se da seguimiento.",
          "El control de acceso y la revisión humana se definen por tipo de tarea y se verifican en la entrega.",
        ],
        faq: [
          {
            question: "¿Qué define el costo de un proyecto de IA?",
            answer:
              "El mayor costo suele estar en cómo está organizado el conocimiento y en cuánta revisión necesitan las respuestas, no en la IA en sí. Un piloto bien definido en un caso de uso permite saber si vale la pena expandirlo antes de invertir más. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cómo abordan un primer proyecto de IA?",
            answer:
              "Empezamos por una pregunta o tarea que ya vale la pena resolver por sí sola, y construimos un piloto alrededor de ella. Eso te da un ejemplo funcionando y datos reales de uso antes de invertir más.",
          },
          {
            question: "¿Qué necesitamos tener listo?",
            answer:
              "Los documentos, sistemas o conocimiento que la asistente debe usar, y alguien que pueda señalar cuándo una respuesta está mal.",
          },
          {
            question:
              "¿Cómo mantienen las respuestas confiables con el tiempo?",
            answer:
              "Damos seguimiento a la calidad de las respuestas y al costo de forma continua, y ajustamos las verificaciones de seguridad y las fuentes conforme cambian tu contenido y tu uso.",
          },
        ],
      },
    },
  },
  {
    id: "data",
    icon: "Database",
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
          "Boas decisões precisam de dados confiáveis e de um jeito claro de enxergá-los. Organizamos como os dados são coletados e processados, construímos painéis que as pessoas realmente usam, e montamos os fluxos que mantêm tudo atualizado.",
        problems: [
          "Times diferentes relatam números diferentes para a mesma coisa.",
          "Conseguir um relatório significa pedir para alguém extrair manualmente.",
          "Seus dados vivem em sistemas desconectados, sem uma fonte única de verdade.",
          "Você decide no feeling porque os números demoram demais para chegar.",
        ],
        deliverables: [
          "Um modelo de dados que reflete como o negócio funciona de verdade",
          "Fluxos de ETL/ELT que mantêm os dados atualizados automaticamente",
          "Uma estrutura em PostgreSQL pensada para as consultas que você realmente faz",
          "Painéis construídos em torno das decisões que eles precisam apoiar",
          "Documentação para sua equipe entender de onde vêm os números",
        ],
        measure: [
          "O projeto lista os números que hoje divergem entre times e define a fonte única de cada um.",
          "O tempo para obter um relatório é medido antes e depois.",
          "Cada indicador do painel tem origem e regra de cálculo documentadas.",
        ],
        faq: [
          {
            question: "O que influencia o custo de um projeto de dados?",
            answer:
              "Quantas fontes de dados precisam ser conectadas e o quão bagunçadas elas estão hoje. Organizar anos de dados inconsistentes costuma demorar mais do que construir o painel em si. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question: "Como vocês constroem painéis e fluxos de dados?",
            answer:
              "Começamos pela decisão que o painel precisa apoiar, voltamos até os dados necessários, e construímos o fluxo que mantém tudo correto.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acesso às suas fontes de dados atuais e uma conversa com quem toma decisões com base nesses números hoje.",
          },
          {
            question: "O que acontece se uma fonte de dados mudar?",
            answer:
              "Monitoramos os fluxos que construímos para detectar rápido quando uma fonte quebra, e ajustamos conforme seus sistemas evoluem.",
          },
        ],
      },
      en: {
        slug: "data-and-reporting",
        title: "Data and reporting",
        summary:
          "Organized data and clear dashboards so decisions follow what is really happening.",
        intro:
          "Good decisions need data you can trust and a way to see it. We organize how data is collected and processed, build dashboards people actually use, and set up the pipelines that keep everything up to date.",
        problems: [
          "Different teams report different numbers for the same thing.",
          "Getting a report means asking someone to pull it manually.",
          "Your data lives in disconnected systems with no single source of truth.",
          "You're making decisions on a gut feeling because the numbers take too long to get.",
        ],
        deliverables: [
          "A data model that reflects how the business actually works",
          "ETL/ELT pipelines that keep data current automatically",
          "A PostgreSQL structure built for the queries you actually run",
          "Dashboards built around the decisions they need to support",
          "Documentation so your team understands where numbers come from",
        ],
        measure: [
          "The project lists the numbers that differ between teams today and defines a single source for each.",
          "Time to get a report is measured before and after.",
          "Every dashboard indicator has its source and calculation rule documented.",
        ],
        faq: [
          {
            question: "What affects the cost of a data project?",
            answer:
              "How many data sources need to be connected and how messy they currently are. Cleaning up years of inconsistent data usually takes longer than building the dashboard itself. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How do you approach building dashboards and pipelines?",
            answer:
              "We start with the decision the dashboard needs to support, work backward to the data it needs, and build the pipeline that keeps it accurate.",
          },
          {
            question: "What access do you need?",
            answer:
              "Access to your current data sources and a conversation with whoever makes decisions based on the numbers today.",
          },
          {
            question: "What happens if a data source changes?",
            answer:
              "We monitor the pipelines we build so a broken source is caught quickly, and adjust them as your systems evolve.",
          },
        ],
      },
      es: {
        slug: "datos-e-informes",
        title: "Datos e informes",
        summary:
          "Datos organizados y paneles claros para decidir con base en lo que realmente ocurre.",
        intro:
          "Las buenas decisiones necesitan datos confiables y una forma clara de verlos. Organizamos cómo se recolectan y procesan los datos, construimos paneles que las personas realmente usan, y montamos los flujos que mantienen todo actualizado.",
        problems: [
          "Equipos distintos reportan números distintos para lo mismo.",
          "Conseguir un informe significa pedirle a alguien que lo extraiga manualmente.",
          "Tus datos viven en sistemas desconectados, sin una fuente única de verdad.",
          "Decides por intuición porque los números tardan demasiado en llegar.",
        ],
        deliverables: [
          "Un modelo de datos que refleja cómo funciona el negocio de verdad",
          "Flujos de ETL/ELT que mantienen los datos actualizados automáticamente",
          "Una estructura en PostgreSQL pensada para las consultas que realmente haces",
          "Paneles construidos alrededor de las decisiones que necesitan apoyar",
          "Documentación para que tu equipo entienda de dónde vienen los números",
        ],
        measure: [
          "El proyecto lista los números que hoy difieren entre equipos y define la fuente única de cada uno.",
          "El tiempo para obtener un informe se mide antes y después.",
          "Cada indicador del panel tiene su origen y su regla de cálculo documentados.",
        ],
        faq: [
          {
            question: "¿Qué influye en el costo de un proyecto de datos?",
            answer:
              "Cuántas fuentes de datos hay que conectar y qué tan desordenadas están hoy. Organizar años de datos inconsistentes suele tardar más que construir el panel en sí. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cómo construyen paneles y flujos de datos?",
            answer:
              "Empezamos por la decisión que el panel necesita apoyar, retrocedemos hasta los datos necesarios, y construimos el flujo que mantiene todo correcto.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Acceso a tus fuentes de datos actuales y una conversación con quien toma decisiones con base en esos números hoy.",
          },
          {
            question: "¿Qué pasa si una fuente de datos cambia?",
            answer:
              "Monitoreamos los flujos que construimos para detectar rápido cuando una fuente falla, y los ajustamos conforme tus sistemas evolucionan.",
          },
        ],
      },
    },
  },
  {
    id: "cloud",
    icon: "Cloud",
    pillar: "cloud",
    technologies: ["AWS", "GitHub", "Node.js", "PostgreSQL"],
    copy: {
      "pt-BR": {
        slug: "nuvem-e-arquitetura",
        title: "Nuvem e arquitetura",
        summary:
          "Estrutura na nuvem que aguenta o crescimento, com monitoramento e custo acompanhado.",
        intro:
          "Infraestrutura deveria ser algo em que você raramente precisa pensar. Montamos ambientes em nuvem que aguentam o crescimento, se monitoram sozinhos e acompanham os custos, além de buscar as mudanças de arquitetura que tornam um sistema existente mais rápido e eficiente.",
        problems: [
          "Seu sistema fica lento ou cai em horários de pico.",
          "Você só descobre que algo quebrou quando um cliente avisa.",
          "Sua conta de nuvem só cresce e ninguém sabe bem por quê.",
          "Você está planejando crescer e não sabe se a estrutura atual aguenta.",
        ],
        deliverables: [
          "Infraestrutura em nuvem na AWS, dimensionada para o seu tráfego real",
          "Monitoramento e alertas para detectar problemas antes dos clientes",
          "Trabalho de performance nas partes mais lentas do sistema",
          "Um plano de recuperação de desastres e rotina de backup",
          "Documentação da arquitetura e de como operá-la",
        ],
        measure: [
          "O projeto define metas de disponibilidade, desempenho e custo mensal a partir das medições atuais.",
          "Alertas e plano de recuperação são testados com a sua equipe antes da entrega.",
          "O custo da nuvem é acompanhado por serviço, para mostrar o que mudou depois de cada ajuste.",
        ],
        faq: [
          {
            question: "O que define o custo de nuvem e infraestrutura?",
            answer:
              "Principalmente os recursos que o seu tráfego realmente precisa e como o sistema está desenhado. Dimensionamos a infraestrutura para o uso real, em vez de superestimar, e buscamos mudanças que reduzem custo sem prejudicar a performance. O valor final depende do escopo definido no diagnóstico.",
          },
          {
            question:
              "Como vocês melhoram um sistema existente sem parar tudo?",
            answer:
              "Medimos primeiro, depois mudamos a parte da arquitetura com maior impacto, confirmamos a melhoria e seguimos para a próxima. As mudanças são feitas por etapas, com o sistema no ar o tempo todo.",
          },
          {
            question: "Que acesso vocês precisam?",
            answer:
              "Acesso à sua infraestrutura e monitoramento, e informações sobre seus horários de pico e incidentes anteriores.",
          },
          {
            question:
              "Vocês continuam monitorando depois que o projeto termina?",
            answer:
              "Podemos, como Continuous Engineering, com escopo, cadência e atendimento definidos conforme a operação. Caso contrário, deixamos o monitoramento e a documentação prontos para sua equipe operar diretamente.",
          },
        ],
      },
      en: {
        slug: "cloud-and-architecture",
        title: "Cloud and architecture",
        summary:
          "Cloud infrastructure that handles growth, with monitoring and tracked costs.",
        intro:
          "Infrastructure should be something you rarely have to think about. We set up cloud environments that handle growth, watch themselves through monitoring, and track costs, and we look for the architecture changes that make an existing system faster and more efficient.",
        problems: [
          "Your system slows down or falls over during busy periods.",
          "You don't know something's wrong until a customer tells you.",
          "Your cloud bill keeps growing and nobody's sure why.",
          "You're planning to grow and don't know if the current setup will hold.",
        ],
        deliverables: [
          "Cloud infrastructure on AWS, sized for your actual traffic",
          "Monitoring and alerts so problems are caught before customers notice",
          "Performance work on the slowest parts of the system",
          "A disaster-recovery plan and backup routine",
          "Documentation of the architecture and how to operate it",
        ],
        measure: [
          "The project sets availability, performance and monthly cost targets from current measurements.",
          "Alerts and the recovery plan are tested with your team before handover.",
          "Cloud cost is tracked per service, to show what changed after each adjustment.",
        ],
        faq: [
          {
            question: "What drives cloud and infrastructure costs?",
            answer:
              "Mostly the resources your traffic actually needs and how the system is architected. We size infrastructure to real usage instead of guessing high, and look for changes that cut cost without hurting performance. The final figure depends on the scope defined during the diagnosis.",
          },
          {
            question: "How do you improve an existing system without downtime?",
            answer:
              "We measure first, then change the highest-impact part of the architecture, verify the improvement, and move to the next one. Changes are staged, so the system stays online throughout.",
          },
          {
            question: "What access do you need?",
            answer:
              "Access to your infrastructure and monitoring, and information about your busiest periods and past incidents.",
          },
          {
            question: "Do you monitor the system after the project ends?",
            answer:
              "We can, as Continuous Engineering, with scope, cadence and support set according to the operation. Otherwise we leave monitoring and documentation in place so your team can operate it directly.",
          },
        ],
      },
      es: {
        slug: "nube-y-arquitectura",
        title: "Nube y arquitectura",
        summary:
          "Infraestructura en la nube preparada para crecer, con monitoreo y costo seguido.",
        intro:
          "La infraestructura debería ser algo en lo que casi nunca piensas. Montamos entornos en la nube que aguantan el crecimiento, se monitorean solos y siguen los costos, además de buscar los cambios de arquitectura que hacen un sistema existente más rápido y eficiente.",
        problems: [
          "Tu sistema se vuelve lento o falla en horas de mayor demanda.",
          "Solo te enteras de que algo se rompió cuando un cliente avisa.",
          "Tu factura de la nube sigue creciendo y nadie sabe bien por qué.",
          "Estás planeando crecer y no sabes si la estructura actual lo va a resistir.",
        ],
        deliverables: [
          "Infraestructura en la nube en AWS, dimensionada para tu tráfico real",
          "Monitoreo y alertas para detectar problemas antes que los clientes",
          "Trabajo de rendimiento en las partes más lentas del sistema",
          "Un plan de recuperación ante desastres y rutina de respaldo",
          "Documentación de la arquitectura y de cómo operarla",
        ],
        measure: [
          "El proyecto define metas de disponibilidad, rendimiento y costo mensual a partir de las mediciones actuales.",
          "Las alertas y el plan de recuperación se prueban con tu equipo antes de la entrega.",
          "El costo de la nube se sigue por servicio, para mostrar qué cambió después de cada ajuste.",
        ],
        faq: [
          {
            question: "¿Qué define el costo de nube e infraestructura?",
            answer:
              "Sobre todo los recursos que tu tráfico realmente necesita y cómo está diseñado el sistema. Dimensionamos la infraestructura según el uso real, en lugar de sobreestimar, y buscamos cambios que reduzcan el costo sin afectar el rendimiento. El valor final depende del alcance definido en el diagnóstico.",
          },
          {
            question: "¿Cómo mejoran un sistema existente sin detener todo?",
            answer:
              "Medimos primero, luego cambiamos la parte de la arquitectura con mayor impacto, confirmamos la mejora y seguimos con la siguiente. Los cambios se hacen por etapas, con el sistema activo todo el tiempo.",
          },
          {
            question: "¿Qué acceso necesitan?",
            answer:
              "Acceso a tu infraestructura y monitoreo, e información sobre tus horas de mayor demanda e incidentes anteriores.",
          },
          {
            question:
              "¿Siguen monitoreando después de que termina el proyecto?",
            answer:
              "Podemos hacerlo, como Continuous Engineering, con alcance, cadencia y atención definidos según la operación. De lo contrario, dejamos el monitoreo y la documentación listos para que tu equipo opere directamente.",
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

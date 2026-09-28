export type Locale = "pt-BR" | "en" | "es";

export const content = {
  "pt-BR": {
    nav: ["Nosso jeito", "Soluções", "Projetos", "Depoimentos"],
    skip: "Pular para o conteúdo",
    home: "IRTC, início",
    talk: "Vamos conversar",
    menu: "Menu",
    language: "Idioma",
    theme: "Aparência",
    themes: ["Sistema", "Claro", "Escuro"],
    hero: {
      eyebrow: "Da Amazônia para o seu próximo projeto.",
      title: "Sua ideia vira",
      words: [
        "um aplicativo sob medida.",
        "um sistema que une tudo.",
        "menos trabalho repetitivo.",
        "uma ferramenta com IA.",
      ],
      description: "Software que simplifica processos e ajuda sua empresa a crescer.",
      cta: "Conte o que você quer construir",
      label: "ENGENHARIA DE SOFTWARE · DADOS · IA",
      pause: "Pausar animações",
      play: "Ativar animações",
      explore: "Conheça a IRTC",
    },
    clients: "Empresas para as quais construímos soluções",
    manifesto: {
      label: "01 / NOSSO JEITO",
      aside: "CONVERSA DIRETA. ENTREGA CONSISTENTE.",
      title: "Tecnologia boa",
      accent: "resolve de verdade.",
      foot: "Entendemos sua operação antes de escrever a primeira linha de código.",
      points: [
        {
          title: "Você acompanha cada entrega.",
          text: "Organizamos o projeto em etapas curtas, com prioridades combinadas e demonstrações frequentes. Você sabe o que está pronto, o que vem depois e por quê.",
        },
        {
          title: "Qualidade desde o começo.",
          text: "Arquitetura, testes e monitoramento entram no projeto desde o início. O resultado é um sistema confiável hoje e mais simples de evoluir amanhã.",
        },
        {
          title: "Suporte de quem conhece o projeto.",
          text: "Você fala com quem constrói. Investigamos o problema, explicamos o caminho e acompanhamos a solução, sem empurrar sua demanda de um lado para o outro.",
        },
      ],
    },
    projects: {
      label: "03 / PROJETOS EM OPERAÇÃO",
      aside: "ENGENHARIA APLICADA A NEGÓCIOS REAIS.",
      title: "Desafios diferentes.",
      accent: "O mesmo cuidado.",
      intro:
        "De plataformas de venda a sistemas de saúde: software feito para a rotina de quem usa.",
      choose: "Escolha um projeto",
      details: "O que foi desenvolvido",
      visit: "Visitar site",
      source:
        "Indicadores de projetos relatados no material institucional. Resultados dependem do contexto de cada operação.",
      cases: [
        {
          category: "Marketplace · Clientes · Dados",
          title: "Mais clareza para uma operação complexa.",
          description:
            "Modernização de marketplace, sistema de clientes e relatórios. Fluxos de trabalho conectados para reduzir tarefas manuais e facilitar as decisões da equipe.",
          result: "mais velocidade nas entregas",
          detail:
            "Refatoração de serviços, componentes reutilizáveis, notificações em tempo real e operações em lote. A evolução dos padrões de engenharia ajudou a acelerar as entregas sem perder consistência.",
        },
        {
          category: "Saúde · Integrações · Aplicativos",
          title: "Informação disponível quando ela faz diferença.",
          description:
            "Integrações entre sistemas de saúde, dados organizados e aplicativos para facilitar a coleta em campo e o trabalho das equipes.",
          result: "menos tempo de carregamento",
          detail:
            "Conexões para integrar laboratórios, técnicas para carregar as telas mais rápido e organização do banco de dados PostgreSQL. O módulo de coleta em campo também reduziu em 30% o tempo de entrada de dados.",
        },
        {
          category: "Educação · Pagamentos · Plataforma",
          title: "Uma estrutura pronta para crescer junto.",
          description:
            "Conteúdo, pagamentos e autenticação integrados em uma plataforma de cursos. Mais eficiência nos bastidores, menos atrito para quem aprende e vende.",
          result: "de melhoria na eficiência do sistema",
          detail:
            "Otimização de consultas, cache e refatoração de serviços. Integração de pagamentos e autenticação para apoiar a evolução da experiência de ensino e da operação.",
        },
      ],
    },
    solutions: {
      label: "02 / O QUE CONSTRUÍMOS",
      aside: "DA PRIMEIRA VERSÃO À EVOLUÇÃO CONTÍNUA.",
      title: "O que seu negócio",
      accent: "precisa resolver?",
      items: [
        {
          title: "Produtos & plataformas",
          tags: "Aplicativos · Portais · Sistemas online",
          intro:
            "Tire uma ideia do papel com uma primeira versão que já resolve um problema importante.",
          text: "Entendemos como as pessoas vão usar o produto, definimos o essencial e construímos algo fácil de usar. Depois do lançamento, os resultados guiam o que evolui em seguida.",
          deliverables: [
            "Planejamento da primeira versão",
            "Telas para computador e celular",
            "Lançamento e evolução do produto",
          ],
        },
        {
          title: "Sistemas & integrações",
          tags: "Gestão · Clientes · Conexões · Automações",
          intro:
            "Conecte as ferramentas da empresa e deixe de depender de planilhas e tarefas repetidas.",
          text: "Criamos sistemas de gestão e integrações para que vendas, finanças e operação trabalhem com a mesma informação. Cada etapa é conferida automaticamente, para que erros sejam encontrados e corrigidos rápido.",
          deliverables: [
            "Gestão sob medida",
            "Integrações com outros sistemas e serviços",
            "Automação de processos internos",
          ],
        },
        {
          title: "Inteligência artificial aplicada",
          tags: "Assistentes de IA · Busca inteligente · Respostas automáticas",
          intro:
            "Use IA onde ela pode poupar tempo, encontrar respostas e melhorar decisões.",
          text: "Conectamos a IA ao conhecimento da empresa, com controle de acesso e verificações de qualidade. Começamos por um problema claro e medimos se a solução é útil, o custo e a segurança.",
          deliverables: [
            "Assistentes que respondem com base nos seus documentos",
            "Automações de IA com regras de segurança",
            "Acompanhamento da qualidade das respostas",
          ],
        },
        {
          title: "Dados & infraestrutura",
          tags: "Organização de dados · Relatórios · Nuvem",
          intro:
            "Tenha dados confiáveis e uma estrutura que acompanha o crescimento da operação.",
          text: "Organizamos a coleta e o processamento de dados, construímos indicadores e cuidamos da infraestrutura. Com monitoramento e rotinas de recuperação, os problemas deixam de ser uma surpresa.",
          deliverables: [
            "Dados organizados e confiáveis",
            "Painéis e indicadores para decisões",
            "Nuvem, monitoramento e velocidade",
          ],
        },
      ],
      techTitle: "Tecnologia com propósito.",
      techIntro:
        "Explore as ferramentas. A escolha depende do desafio, não da moda.",
      techHint: "Selecione uma tecnologia para saber onde ela entra.",
      techDescriptions: [
        "Conexões e serviços que ligam sua operação, com TypeScript e uma base pronta para crescer.",
        "Produtos web rápidos, acessíveis e fáceis de usar, do portal ao painel de gestão.",
        "Telas reutilizáveis para experiências consistentes na web e em aplicativos.",
        "Dados bem estruturados, consultas eficientes e busca por significado com a extensão pgvector.",
        "Memória rápida e fila de tarefas para respostas ágeis em processos urgentes.",
        "Infraestrutura em nuvem, armazenamento, monitoramento e implantação de aplicações.",
        "Versionamento, revisão de código e automação de testes e entregas.",
        "Código organizado em módulos, verificações automáticas e clareza para sistemas de negócio complexos.",
      ],
    },
    testimonials: {
      label: "04 / QUEM TRABALHA JUNTO, RECOMENDA",
      source: "Ver recomendações",
      title: "Confiança se constrói",
      accent: "no dia a dia.",
      intro: "Qualidade técnica importa. A forma de trabalhar junto também.",
      previous: "Recomendação anterior",
      next: "Próxima recomendação",
      note: "Síntese de recomendação a profissionais da equipe · LinkedIn",
      summaries: [
        "Cuidado com a qualidade do código, criatividade nas soluções e troca de conhecimento com a equipe.",
        "Modernização de sistemas, componentes escaláveis e mentoria que elevam a qualidade das entregas.",
        "Proatividade e compromisso com as entregas, com agilidade e eficácia na correção de problemas.",
        "Atenção aos detalhes e disposição para compartilhar conhecimento, melhorar a qualidade e padronizar o projeto.",
        "Componentes reutilizáveis que facilitaram o desenvolvimento e autonomia para conduzir o início da parte visual do sistema.",
        "Domínio técnico, dedicação e iniciativa, com destaque para o trabalho em Vue.js e TypeScript.",
      ],
    },
    origin: {
      label: "DE BELÉM, CONECTADOS AO SEU NEGÓCIO.",
      title: "Raízes na Amazônia.",
      accent: "Projetos sem fronteiras.",
      body: "Nossa base é Belém. Nosso dia a dia conecta pessoas, produtos e operações de diferentes lugares. Trabalhamos de perto, mesmo quando a equipe está longe.",
      vision:
        "Queremos que empresas de todos os tamanhos tenham acesso a software bem feito, com comunicação clara e uma parceria que continua depois do lançamento.",
      cta: "Vamos conhecer seu projeto",
      mapTitle: "Belém é o ponto de partida.",
      mapDescription:
        "Da Amazônia para o mundo: trabalhamos com equipes onde elas estiverem.",
    },
    contact: {
      label: "VAMOS ENTENDER O SEU DESAFIO.",
      title: "Conte sua ideia.",
      accent: "A gente ajuda a começar.",
      intro:
        "Não precisa chegar com tudo definido. Conte o problema, para quem ele importa e o que você quer mudar.",
      iris: "Quer organizar a ideia com a Iris?",
      name: "Seu nome",
      nameHint: "Como podemos te chamar?",
      email: "E-mail",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Onde o projeto vai acontecer",
      message: "O que você precisa resolver?",
      messageHint: "Descreva sua ideia, desafio ou projeto.",
      submit: "Enviar mensagem",
      sending: "Enviando…",
      sent: "Mensagem enviada. Vamos conversar em breve.",
      error:
        "Não foi possível enviar. Tente novamente ou use o contato no rodapé.",
      privacy: "Usamos seus dados apenas para responder a este contato.",
    },
    footer: {
      title: "Seu próximo projeto",
      accent: "começa com uma conversa.",
      location: "Belém, Pará — Brasil",
      signature: "SOFTWARE BEM FEITO. PARCERIA DE VERDADE.",
      top: "Voltar ao início",
      soon: "Em breve",
      socials: "Nossas redes",
    },
    iris: {
      launcher: "Oi, eu sou a Iris.",
      greeting:
        "Oi! Sou a Iris, da IRTC. Me conte uma ideia ou um problema do seu negócio. Vamos desenhar o primeiro passo?",
      subtitle: "Sua ideia começa aqui",
      expand: "Abrir em tela cheia",
      shrink: "Reduzir janela",
      close: "Fechar conversa",
      confirm: "Encerrar esta conversa?",
      clear: "O histórico será apagado ao fechar.",
      keep: "Continuar conversando",
      yes: "Sim, encerrar",
      input: "Sua mensagem",
      placeholder: "Qual problema você quer resolver?",
      send: "Enviar",
      thinking: "Iris está pensando…",
      use: "Usar como rascunho",
      draft: "Seu rascunho de primeira versão",
      approve: "Aprovar e enviar por e-mail",
      email: "Seu e-mail para retorno",
      sent: "Rascunho enviado. Vamos conversar em breve.",
      error: "Não foi possível enviar. Tente novamente em instantes.",
      limit: "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.",
      disclaimer:
        "Iris usa IA e pode errar. O rascunho não é uma proposta comercial.",
      refusal:
        "Posso ajudar com a IRTC ou com uma ideia inicial de produto. Qual desafio do seu negócio você quer resolver?",
      fallback:
        "Para começar: 1. Escolha um público e um problema. 2. Resolva uma tarefa essencial. 3. Meça o resultado. A IRTC ajuda a transformar isso em uma primeira versão do seu produto.",
      about:
        "A IRTC desenvolve software, integrações, dados e IA em Belém. Trabalhamos com entregas curtas, qualidade técnica e suporte próximo.",
    },
  },
  en: {
    nav: ["Our approach", "Solutions", "Projects", "Testimonials"],
    skip: "Skip to content",
    home: "IRTC, home",
    talk: "Let's talk",
    menu: "Menu",
    language: "Language",
    theme: "Appearance",
    themes: ["System", "Light", "Dark"],
    hero: {
      eyebrow: "From the Amazon to your next big idea.",
      title: "Your idea becomes",
      words: [
        "an app made for you.",
        "one system for it all.",
        "less repetitive work.",
        "a tool powered by AI.",
      ],
      description: "Software that simplifies work and helps your business grow.",
      cta: "Tell us what you want to build",
      label: "SOFTWARE ENGINEERING · DATA · AI",
      pause: "Pause animation",
      play: "Enable animation",
      explore: "Meet IRTC",
    },
    clients: "Companies we have built solutions for",
    manifesto: {
      label: "01 / OUR APPROACH",
      aside: "CLEAR COMMUNICATION. RELIABLE DELIVERY.",
      title: "Good technology",
      accent: "solves real problems.",
      foot: "We understand your operations before writing the first line of code.",
      points: [
        {
          title: "See progress with every release.",
          text: "Short cycles, shared priorities and regular demos keep you in the loop. You know what's ready, what comes next and why it matters.",
        },
        {
          title: "Quality from day one.",
          text: "Architecture, testing and monitoring are part of the project from the start. Your system works reliably today and is easier to improve tomorrow.",
        },
        {
          title: "Support from the people who built it.",
          text: "Talk directly to your engineering team. We investigate the problem, explain the options and see the solution through, without passing you around.",
        },
      ],
    },
    projects: {
      label: "03 / SOFTWARE AT WORK",
      aside: "ENGINEERING FOR REAL BUSINESSES.",
      title: "Different challenges.",
      accent: "The same care.",
      intro:
        "From commerce platforms to healthcare systems: software designed around the people who use it.",
      choose: "Choose a project",
      details: "What we built",
      visit: "Visit website",
      source:
        "Project metrics reported in the source materials. Results depend on each operating context.",
      cases: [
        {
          category: "Marketplace · Customers · Data",
          title: "Clarity for a complex operation.",
          description:
            "Marketplace, customer management and reporting modernization. Connected workflows that reduce manual work and help teams make informed decisions.",
          result: "faster delivery",
          detail:
            "Service refactoring, reusable components, real-time notifications and batch operations. Better engineering practices accelerated delivery while maintaining consistency.",
        },
        {
          category: "Healthcare · Integrations · Mobile",
          title: "Information when it matters most.",
          description:
            "Connected healthcare systems, structured data and mobile tools that make field collection and daily operations easier.",
          result: "less loading time",
          detail:
            "Laboratory integration connections, techniques to load pages faster and PostgreSQL database design. The field collection module also reduced data entry time by 30%.",
        },
        {
          category: "Education · Payments · Platform",
          title: "A foundation for the next stage of growth.",
          description:
            "Content, payments and authentication connected in a learning platform. More efficient services and less friction for learners and sellers.",
          result: "improvement in system efficiency",
          detail:
            "Query optimization, caching and service refactoring. Payment and authentication integrations to support the learning experience and business operations.",
        },
      ],
    },
    solutions: {
      label: "02 / WHAT WE BUILD",
      aside: "FROM FIRST RELEASE TO CONTINUOUS IMPROVEMENT.",
      title: "What does your business",
      accent: "need to solve?",
      items: [
        {
          title: "Products & platforms",
          tags: "Apps · Portals · Online systems",
          intro:
            "Turn an idea into a first release that solves a meaningful problem.",
          text: "We start by understanding how people will use it, then build something simple to use with confidence. After launch, real results guide what comes next.",
          deliverables: [
            "Discovery and planning for the first version",
            "Screens for computer and phone",
            "Product launch and continuous improvements",
          ],
        },
        {
          title: "Systems & integrations",
          tags: "Management · Customers · Connections · Automation",
          intro:
            "Connect your business tools and move beyond spreadsheets and repetitive work.",
          text: "We build management systems and integrations so sales, finance and operations share the same information. Every step is checked automatically, so mistakes are caught and fixed quickly.",
          deliverables: [
            "Custom business systems",
            "Integrations with other systems and services",
            "Internal workflow automation",
          ],
        },
        {
          title: "Applied artificial intelligence",
          tags: "AI assistants · Smart search · Automatic answers",
          intro:
            "Put AI to work saving time, finding answers and supporting better decisions.",
          text: "We connect AI to company knowledge, with access controls and quality checks. We start with one clear problem, then measure how useful it is, the cost and the safety.",
          deliverables: [
            "Assistants that answer using your documents",
            "AI automations with safety rules",
            "Ongoing checks on answer quality",
          ],
        },
        {
          title: "Data & infrastructure",
          tags: "Data organization · Reports · Cloud",
          intro:
            "Reliable data and infrastructure that grows with your operations.",
          text: "We organize data collection and processing, build useful metrics and manage infrastructure. Monitoring and recovery routines help teams catch problems early.",
          deliverables: [
            "Organized, reliable data",
            "Dashboards and metrics for decisions",
            "Cloud hosting, monitoring and speed",
          ],
        },
      ],
      techTitle: "The right tools for the job.",
      techIntro:
        "Explore our toolkit. The challenge drives the choice, not the hype.",
      techHint: "Select a technology to see where it fits.",
      techDescriptions: [
        "Connections and services that link your operations, built with TypeScript and room to grow.",
        "Fast, accessible web products, from customer portals to management dashboards.",
        "Reusable screens for a consistent experience on the web and in apps.",
        "Structured data, efficient queries and search by meaning using the pgvector extension.",
        "Fast memory and task queues for quick responses in urgent processes.",
        "Cloud infrastructure, storage, monitoring and application deployment.",
        "Version control, code review and automated testing and delivery.",
        "Modular code, automatic checks and structure for complex business systems.",
      ],
    },
    testimonials: {
      label: "04 / WORDS FROM OUR COLLABORATORS",
      source: "Read recommendations",
      title: "Trust is built",
      accent: "in the everyday work.",
      intro: "Technical quality matters. So does the way we work together.",
      previous: "Previous recommendation",
      next: "Next recommendation",
      note: "Summary of a recommendation about our team members · LinkedIn",
      summaries: [
        "Care for code quality, creative solutions and a willingness to share knowledge with the team.",
        "System modernization, scalable components and mentoring that raise the standard of delivery.",
        "Proactive, committed to delivery and quick and effective at resolving bugs.",
        "Attention to detail, knowledge sharing and a drive to improve project quality and consistency.",
        "Reusable components that made development easier, with the autonomy to lead the early work on the product's visual side.",
        "Technical depth, dedication and initiative, particularly in Vue.js and TypeScript.",
      ],
    },
    origin: {
      label: "BASED IN BELÉM. CONNECTED TO YOUR BUSINESS.",
      title: "Roots in the Amazon.",
      accent: "Projects without borders.",
      body: "Belém is home. Our work connects people, products and operations across different places. We stay close to your team, wherever you are.",
      vision:
        "We want businesses of every size to have access to well-built software, clear communication and a partnership that continues beyond launch.",
      cta: "Let's explore your project",
      mapTitle: "Belém is the starting point.",
      mapDescription:
        "From the Amazon to the world: we work with teams wherever they are.",
    },
    contact: {
      label: "LET'S UNDERSTAND YOUR CHALLENGE.",
      title: "Tell us your idea.",
      accent: "We'll help you get started.",
      intro:
        "You don't need a complete specification. Tell us the problem, who it affects and what you'd like to change.",
      iris: "Want to shape your idea with Iris?",
      name: "Your name",
      nameHint: "What should we call you?",
      email: "Email",
      company: "Company",
      optional: "optional",
      companyHint: "Where the project will take shape",
      message: "What do you need to solve?",
      messageHint: "Describe your idea, challenge or project.",
      submit: "Send message",
      sending: "Sending…",
      sent: "Message sent. We'll be in touch soon.",
      error:
        "We couldn't send your message. Try again or use the contact in the footer.",
      privacy: "We only use your details to respond to this inquiry.",
    },
    footer: {
      title: "Your next project",
      accent: "starts with a conversation.",
      location: "Belém, Pará — Brazil",
      signature: "THOUGHTFUL SOFTWARE. LASTING PARTNERSHIPS.",
      top: "Back to top",
      soon: "Coming soon",
      socials: "Find us online",
    },
    iris: {
      launcher: "Hi, I'm Iris.",
      greeting:
        "Hi! I'm Iris from IRTC. Tell me about an idea or a business problem. Let's work out a first step.",
      subtitle: "Your idea starts here",
      expand: "Open fullscreen",
      shrink: "Restore window",
      close: "Close conversation",
      confirm: "End this conversation?",
      clear: "Closing will clear the conversation.",
      keep: "Keep chatting",
      yes: "Yes, end chat",
      input: "Your message",
      placeholder: "What problem do you want to solve?",
      send: "Send",
      thinking: "Iris is thinking…",
      use: "Use as draft",
      draft: "Your first-version draft",
      approve: "Approve and email",
      email: "Your email for a reply",
      sent: "Draft sent. We'll be in touch soon.",
      error: "We couldn't send it. Please try again shortly.",
      limit: "Too many messages in a short time. Please try again in a few minutes.",
      disclaimer:
        "Iris uses AI and may make mistakes. This draft is not a commercial proposal.",
      refusal:
        "I can help with IRTC or an early product idea. What business challenge would you like to solve?",
      fallback:
        "Start here: 1. Choose an audience and a problem. 2. Solve one essential task. 3. Measure the result. IRTC can help turn this into a first version of your product.",
      about:
        "IRTC builds software, integrations, data systems and AI in Belém, Brazil. We work in short delivery cycles with technical quality and hands-on support.",
    },
  },
  es: {
    nav: ["Cómo trabajamos", "Soluciones", "Proyectos", "Testimonios"],
    skip: "Saltar al contenido",
    home: "IRTC, inicio",
    talk: "Conversemos",
    menu: "Menú",
    language: "Idioma",
    theme: "Apariencia",
    themes: ["Sistema", "Claro", "Oscuro"],
    hero: {
      eyebrow: "Desde la Amazonía hasta tu próximo proyecto.",
      title: "Tu idea se convierte en",
      words: [
        "una app a tu medida.",
        "un sistema que une todo.",
        "menos trabajo repetitivo.",
        "una herramienta con IA.",
      ],
      description: "Software que simplifica procesos y ayuda a crecer tu negocio.",
      cta: "Cuéntanos qué quieres construir",
      label: "INGENIERÍA DE SOFTWARE · DATOS · IA",
      pause: "Pausar animaciones",
      play: "Activar animaciones",
      explore: "Conoce IRTC",
    },
    clients: "Empresas para las que construimos soluciones",
    manifesto: {
      label: "01 / CÓMO TRABAJAMOS",
      aside: "COMUNICACIÓN CLARA. ENTREGAS CONSISTENTES.",
      title: "La buena tecnología",
      accent: "resuelve problemas reales.",
      foot: "Entendemos tu operación antes de escribir la primera línea de código.",
      points: [
        {
          title: "Acompañas cada entrega.",
          text: "Organizamos el proyecto en ciclos cortos, con prioridades acordadas y demostraciones frecuentes. Sabes qué está listo, qué viene después y por qué.",
        },
        {
          title: "Calidad desde el principio.",
          text: "La arquitectura, las pruebas y el monitoreo forman parte del proyecto desde el inicio. Un sistema confiable hoy y más fácil de mejorar mañana.",
        },
        {
          title: "Soporte de quienes conocen el proyecto.",
          text: "Hablas con quienes lo construyen. Investigamos el problema, explicamos las opciones y acompañamos la solución, sin pasarte de un equipo a otro.",
        },
      ],
    },
    projects: {
      label: "03 / PROYECTOS EN MARCHA",
      aside: "INGENIERÍA PARA NEGOCIOS REALES.",
      title: "Desafíos diferentes.",
      accent: "El mismo compromiso.",
      intro:
        "Desde plataformas comerciales hasta sistemas de salud: software pensado para quienes lo usan cada día.",
      choose: "Elige un proyecto",
      details: "Qué desarrollamos",
      visit: "Visitar sitio",
      source:
        "Indicadores de proyectos documentados en el material de referencia. Los resultados dependen de cada operación.",
      cases: [
        {
          category: "Marketplace · Clientes · Datos",
          title: "Más claridad para una operación compleja.",
          description:
            "Modernización de marketplace, gestión de clientes e informes. Flujos conectados para reducir tareas manuales y facilitar las decisiones del equipo.",
          result: "más velocidad de entrega",
          detail:
            "Refactorización de servicios, componentes reutilizables, notificaciones en tiempo real y operaciones por lotes. Mejores prácticas para acelerar las entregas sin perder consistencia.",
        },
        {
          category: "Salud · Integraciones · Aplicaciones",
          title: "Información disponible cuando más importa.",
          description:
            "Sistemas de salud conectados, datos organizados y aplicaciones que facilitan la recolección en campo y el trabajo de los equipos.",
          result: "menos tiempo de carga",
          detail:
            "Conexiones para integrar laboratorios, técnicas para cargar las pantallas más rápido y organización de la base de datos PostgreSQL. El módulo de recolección en campo también redujo un 30% el tiempo de entrada de datos.",
        },
        {
          category: "Educación · Pagos · Plataforma",
          title: "Una base preparada para crecer.",
          description:
            "Contenido, pagos y autenticación integrados en una plataforma de cursos. Más eficiencia interna y menos obstáculos para estudiantes y vendedores.",
          result: "de mejora en la eficiencia del sistema",
          detail:
            "Optimización de consultas, caché y refactorización de servicios. Integración de pagos y autenticación para mejorar la experiencia de aprendizaje y la operación.",
        },
      ],
    },
    solutions: {
      label: "02 / QUÉ CONSTRUIMOS",
      aside: "DE LA PRIMERA VERSIÓN A LA MEJORA CONTINUA.",
      title: "¿Qué necesita resolver",
      accent: "tu negocio?",
      items: [
        {
          title: "Productos y plataformas",
          tags: "Aplicaciones · Portales · Sistemas online",
          intro:
            "Convierte una idea en una primera versión que resuelva un problema importante.",
          text: "Entendemos cómo las personas van a usar el producto, priorizamos lo esencial y construimos algo fácil de usar. Tras el lanzamiento, los resultados nos ayudan a decidir qué mejorar.",
          deliverables: [
            "Descubrimiento y planificación de la primera versión",
            "Pantallas para computadora y celular",
            "Lanzamiento y evolución del producto",
          ],
        },
        {
          title: "Sistemas e integraciones",
          tags: "Gestión · Clientes · Conexiones · Automatización",
          intro:
            "Conecta las herramientas de tu empresa y deja atrás las tareas repetitivas.",
          text: "Creamos sistemas de gestión e integraciones para que ventas, finanzas y operaciones compartan la misma información. Cada paso se revisa de forma automática, así los errores se detectan y se corrigen rápido.",
          deliverables: [
            "Sistemas de gestión a medida",
            "Integraciones con otros sistemas y servicios",
            "Automatización de procesos internos",
          ],
        },
        {
          title: "Inteligencia artificial aplicada",
          tags: "Asistentes de IA · Búsqueda inteligente · Respuestas automáticas",
          intro:
            "Aplica IA donde pueda ahorrar tiempo, encontrar respuestas y mejorar decisiones.",
          text: "Conectamos la IA al conocimiento de la empresa, con control de acceso y revisiones de calidad. Empezamos por un problema concreto y medimos si es útil, el costo y la seguridad.",
          deliverables: [
            "Asistentes que responden con base en tus documentos",
            "Automatizaciones de IA con reglas de seguridad",
            "Seguimiento continuo de la calidad de las respuestas",
          ],
        },
        {
          title: "Datos e infraestructura",
          tags: "Organización de datos · Informes · Nube",
          intro:
            "Datos confiables e infraestructura que crece con tu operación.",
          text: "Organizamos la recolección y el procesamiento de datos, creamos indicadores y cuidamos la infraestructura. El monitoreo y las rutinas de recuperación permiten detectar problemas a tiempo.",
          deliverables: [
            "Datos organizados y confiables",
            "Paneles e indicadores para decisiones",
            "Nube, monitoreo y velocidad",
          ],
        },
      ],
      techTitle: "Tecnología con propósito.",
      techIntro:
        "Explora nuestras herramientas. Elegimos según el desafío, no la moda.",
      techHint: "Selecciona una tecnología para conocer su función.",
      techDescriptions: [
        "Conexiones y servicios que enlazan tu operación, con TypeScript y una base lista para crecer.",
        "Productos web rápidos y accesibles, desde portales hasta paneles de gestión.",
        "Pantallas reutilizables para experiencias consistentes en la web y en aplicaciones.",
        "Datos bien estructurados, consultas eficientes y búsqueda por significado con la extensión pgvector.",
        "Memoria rápida y colas de tareas para respuestas ágiles en procesos urgentes.",
        "Infraestructura cloud, almacenamiento, monitoreo y despliegue de aplicaciones.",
        "Control de versiones, revisión de código y automatización de pruebas y entregas.",
        "Código organizado en módulos, validaciones automáticas y estructura clara para sistemas complejos.",
      ],
    },
    testimonials: {
      label: "04 / QUIENES TRABAJAN CON NOSOTROS, RECOMIENDAN",
      source: "Ver recomendaciones",
      title: "La confianza se gana",
      accent: "en el trabajo diario.",
      intro: "La calidad técnica importa. La forma de colaborar también.",
      previous: "Recomendación anterior",
      next: "Siguiente recomendación",
      note: "Resumen de una recomendación a profesionales del equipo · LinkedIn",
      summaries: [
        "Cuidado por la calidad del código, creatividad en las soluciones y conocimiento compartido con el equipo.",
        "Modernización de sistemas, componentes escalables y mentoría que elevan la calidad de las entregas.",
        "Proactividad y compromiso, con rapidez y eficacia para corregir problemas.",
        "Atención al detalle y disposición para compartir conocimientos, mejorar la calidad y estandarizar el proyecto.",
        "Componentes reutilizables que facilitaron el desarrollo y autonomía para liderar el inicio de la parte visual del producto.",
        "Dominio técnico, dedicación e iniciativa, especialmente en Vue.js y TypeScript.",
      ],
    },
    origin: {
      label: "DESDE BELÉM, CONECTADOS A TU NEGOCIO.",
      title: "Raíces en la Amazonía.",
      accent: "Proyectos sin fronteras.",
      body: "Nuestra base está en Belém. Cada día conectamos personas, productos y operaciones de distintos lugares. Trabajamos cerca de tu equipo, estés donde estés.",
      vision:
        "Queremos que empresas de todos los tamaños accedan a software bien construido, comunicación clara y una colaboración que continúe después del lanzamiento.",
      cta: "Conozcamos tu proyecto",
      mapTitle: "Belém es el punto de partida.",
      mapDescription:
        "De la Amazonía al mundo: trabajamos con equipos donde estén.",
    },
    contact: {
      label: "ENTENDAMOS TU DESAFÍO.",
      title: "Cuéntanos tu idea.",
      accent: "Te ayudamos a empezar.",
      intro:
        "No necesitas tenerlo todo definido. Cuéntanos el problema, a quién afecta y qué quieres cambiar.",
      iris: "¿Quieres darle forma con Iris?",
      name: "Tu nombre",
      nameHint: "¿Cómo te llamas?",
      email: "Correo electrónico",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Dónde tomará forma el proyecto",
      message: "¿Qué necesitas resolver?",
      messageHint: "Describe tu idea, desafío o proyecto.",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      sent: "Mensaje enviado. Pronto nos pondremos en contacto.",
      error:
        "No pudimos enviarlo. Inténtalo de nuevo o usa el contacto del pie de página.",
      privacy: "Solo usamos tus datos para responder a esta consulta.",
    },
    footer: {
      title: "Tu próximo proyecto",
      accent: "empieza con una conversación.",
      location: "Belém, Pará — Brasil",
      signature: "SOFTWARE BIEN HECHO. COLABORACIÓN DE VERDAD.",
      top: "Volver al inicio",
      soon: "Próximamente",
      socials: "Nuestras redes",
    },
    iris: {
      launcher: "Hola, soy Iris.",
      greeting:
        "¡Hola! Soy Iris, de IRTC. Cuéntame una idea o un problema de tu negocio. ¿Definimos el primer paso?",
      subtitle: "Tu idea empieza aquí",
      expand: "Abrir pantalla completa",
      shrink: "Reducir ventana",
      close: "Cerrar conversación",
      confirm: "¿Finalizar esta conversación?",
      clear: "Al cerrar se borrará el historial.",
      keep: "Seguir conversando",
      yes: "Sí, finalizar",
      input: "Tu mensaje",
      placeholder: "¿Qué problema quieres resolver?",
      send: "Enviar",
      thinking: "Iris está pensando…",
      use: "Usar como borrador",
      draft: "Tu borrador de primera versión",
      approve: "Aprobar y enviar por correo",
      email: "Tu correo para recibir respuesta",
      sent: "Borrador enviado. Pronto conversaremos.",
      error: "No pudimos enviarlo. Inténtalo de nuevo en un momento.",
      limit: "Demasiados mensajes en poco tiempo. Inténtalo de nuevo en unos minutos.",
      disclaimer:
        "Iris usa IA y puede equivocarse. El borrador no es una propuesta comercial.",
      refusal:
        "Puedo ayudarte con IRTC o una idea inicial de producto. ¿Qué desafío de tu negocio quieres resolver?",
      fallback:
        "Para empezar: 1. Elige un público y un problema. 2. Resuelve una tarea esencial. 3. Mide el resultado. IRTC te ayuda a convertirlo en la primera versión de tu producto.",
      about:
        "IRTC desarrolla software, integraciones, datos e IA desde Belém, Brasil. Trabajamos con entregas cortas, calidad técnica y soporte cercano.",
    },
  },
};

export const projectBrands = [
  {
    name: "LeafLink",
    metric: "40%",
    stack: "Vue.js / Django / PostgreSQL / AWS",
    theme: "leaflink",
    url: "https://www.leaflink.com",
    logo: "/brands/leaflink.svg",
    image: "/projects/leaflink.webp",
  },
  {
    name: "Dasa",
    metric: "50%",
    stack: "Node.js / NestJS / React Native / PostgreSQL",
    theme: "dasa",
    url: "https://dasa.com.br",
    logo: "/brands/dasa.svg",
    image: "/projects/dasa.webp",
  },
  {
    name: "Perfect Pay",
    metric: "80%",
    stack: "Node.js / Express / Next.js / APIs",
    theme: "perfectpay",
    url: "https://perfectpay.com.br",
    logo: "/brands/perfectpay.png",
    image: "/projects/perfectpay.webp",
  },
];

export const recommendationAuthors = [
  { name: "Rafael F. Andrade", role: "Tech Lead", initials: "RA" },
  { name: "Renato Oliveira", role: "Software Engineer", initials: "RO" },
  {
    name: "Priscila Ribeiro de França",
    role: "Quality Assurance Engineer",
    initials: "PF",
  },
  { name: "Rael Alves", role: "Executive Producer", initials: "RA" },
  { name: "Douglas Morato", role: "Senior Software Developer", initials: "DM" },
  { name: "Pedro Felipe", role: "Software Engineer", initials: "PF" },
];

export type Locale = "pt-BR" | "en" | "es";

export const content = {
  "pt-BR": {
    nav: ["Nosso jeito", "Projetos", "Soluções", "Depoimentos"],
    skip: "Pular para o conteúdo",
    home: "IRTC, início",
    talk: "Vamos conversar",
    menu: "Menu",
    language: "Idioma",
    theme: "Aparência",
    themes: ["Sistema", "Claro", "Escuro"],
    hero: {
      eyebrow: "De Belém para o seu próximo projeto.",
      title: "Sua ideia, na prática.",
      words: [
        "Software.",
        "Um SaaS.",
        "Agentes de IA.",
        "Seu próximo app.",
        "Um novo CRM.",
      ],
      description:
        "Criamos sistemas que simplificam sua operação e abrem espaço para o negócio crescer.",
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
      label: "02 / PROJETOS EM OPERAÇÃO",
      aside: "ENGENHARIA APLICADA A NEGÓCIOS REAIS.",
      title: "Desafios diferentes.",
      accent: "O mesmo cuidado.",
      intro:
        "De plataformas de venda a sistemas de saúde: software feito para a rotina de quem usa.",
      choose: "Escolha um projeto",
      details: "O que foi desenvolvido",
      visit: "Visitar site",
      image:
        "Imagem pública da marca; ilustra o produto, não a autoria de toda a plataforma.",
      source:
        "Indicadores de projetos relatados no material institucional. Resultados dependem do contexto de cada operação.",
      cases: [
        {
          category: "Marketplace · CRM · Dados",
          title: "Mais clareza para uma operação complexa.",
          description:
            "Modernização de marketplace, CRM e relatórios. Fluxos de trabalho conectados para reduzir tarefas manuais e facilitar as decisões da equipe.",
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
            "APIs para conectar laboratórios, estratégias de cache e modelagem de dados em PostgreSQL. O módulo de coleta em campo também reduziu em 30% o tempo de entrada de dados.",
        },
        {
          category: "Educação · Pagamentos · Plataforma",
          title: "Uma estrutura pronta para crescer junto.",
          description:
            "Conteúdo, pagamentos e autenticação integrados em uma plataforma de cursos. Mais eficiência nos bastidores, menos atrito para quem aprende e vende.",
          result: "de melhoria na eficiência do backend",
          detail:
            "Otimização de consultas, cache e refatoração de serviços. Integração de pagamentos e autenticação para apoiar a evolução da experiência de ensino e da operação.",
        },
      ],
    },
    solutions: {
      label: "03 / O QUE CONSTRUÍMOS",
      aside: "DA PRIMEIRA VERSÃO À EVOLUÇÃO CONTÍNUA.",
      title: "O que seu negócio",
      accent: "precisa resolver?",
      items: [
        {
          title: "Produtos & plataformas",
          tags: "SaaS · Portais · Aplicativos",
          intro:
            "Tire uma ideia do papel com uma primeira versão que já resolve um problema importante.",
          text: "Mapeamos a jornada, definimos o essencial e construímos um produto fácil de usar. Depois do lançamento, acompanhamos os resultados para decidir o que vale evoluir.",
          deliverables: [
            "Descoberta e definição do MVP",
            "Interfaces web e mobile",
            "Lançamento e evolução do produto",
          ],
        },
        {
          title: "Sistemas & integrações",
          tags: "ERP · CRM · APIs · Automações",
          intro:
            "Conecte as ferramentas da empresa e deixe de depender de planilhas e tarefas repetidas.",
          text: "Criamos sistemas de gestão e integrações para que vendas, finanças e operação trabalhem com a mesma informação. Cada fluxo tem validação, rastreabilidade e tratamento de falhas.",
          deliverables: [
            "Gestão sob medida",
            "Integrações com serviços e ERPs",
            "Automação de processos internos",
          ],
        },
        {
          title: "Inteligência artificial aplicada",
          tags: "Agentes de IA · RAG · Busca semântica",
          intro:
            "Use IA onde ela pode poupar tempo, encontrar respostas e melhorar decisões.",
          text: "Conectamos modelos ao conhecimento da empresa, com limites de acesso e avaliações de qualidade. Começamos com um caso de uso claro e medimos utilidade, custo e segurança.",
          deliverables: [
            "Assistentes com base de conhecimento",
            "Agentes com ferramentas controladas",
            "Avaliação e monitoramento de respostas",
          ],
        },
        {
          title: "Dados & infraestrutura",
          tags: "ETL · ELT · Analytics · Cloud",
          intro:
            "Tenha dados confiáveis e uma estrutura que acompanha o crescimento da operação.",
          text: "Organizamos a coleta e o processamento de dados, construímos indicadores e cuidamos da infraestrutura. Com monitoramento e rotinas de recuperação, os problemas deixam de ser uma surpresa.",
          deliverables: [
            "Pipelines e qualidade de dados",
            "Dashboards e indicadores",
            "Cloud, observabilidade e performance",
          ],
        },
      ],
      techTitle: "Tecnologia com propósito.",
      techIntro:
        "Explore as ferramentas. A escolha depende do desafio, não da moda.",
      techHint: "Selecione uma tecnologia para saber onde ela entra.",
      techDescriptions: [
        "APIs e serviços que conectam sua operação, com TypeScript e uma estrutura preparada para evoluir.",
        "Produtos web rápidos, acessíveis e fáceis de usar, do portal ao painel de gestão.",
        "Interfaces reutilizáveis para experiências consistentes na web e em aplicativos.",
        "Dados bem estruturados, consultas eficientes e busca vetorial com pgvector.",
        "Cache, filas e respostas rápidas para processos que não podem esperar.",
        "Infraestrutura em nuvem, armazenamento, monitoramento e implantação de aplicações.",
        "Versionamento, revisão de código e automação de testes e entregas.",
        "APIs modulares, validação e organização para sistemas de negócio complexos.",
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
        "Componentes reutilizáveis que facilitaram o desenvolvimento e autonomia para conduzir o início do frontend.",
        "Domínio técnico, dedicação e iniciativa, com destaque para o trabalho em Vue.js e TypeScript.",
      ],
    },
    origin: {
      label: "DE BELÉM, CONECTADOS AO SEU NEGÓCIO.",
      title: "Raízes no Pará.",
      accent: "Projetos sem fronteiras.",
      body: "Nossa base é Belém. Nosso dia a dia conecta pessoas, produtos e operações de diferentes lugares. Trabalhamos de perto, mesmo quando a equipe está longe.",
      vision:
        "Queremos que empresas de todos os tamanhos tenham acesso a software bem feito, com comunicação clara e uma parceria que continua depois do lançamento.",
      cta: "Vamos conhecer seu projeto",
      node: "Sua operação",
      link: "Equipe conectada",
      caption: "Uma base em Belém. Colaboração de onde você estiver.",
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
      draft: "Seu rascunho de MVP",
      approve: "Aprovar e enviar por e-mail",
      email: "Seu e-mail para retorno",
      sent: "Rascunho enviado. Vamos conversar em breve.",
      error: "Não foi possível enviar. Tente novamente em instantes.",
      disclaimer:
        "Iris usa IA e pode errar. O rascunho não é uma proposta comercial.",
      refusal:
        "Posso ajudar com a IRTC ou com uma ideia inicial de MVP. Qual desafio do seu negócio você quer resolver?",
      fallback:
        "Para começar: 1. Escolha um público e uma dor. 2. Resolva uma tarefa essencial. 3. Meça o resultado. A IRTC ajuda a transformar isso em um MVP.",
      about:
        "A IRTC desenvolve software, integrações, dados e IA em Belém. Trabalhamos com entregas curtas, qualidade técnica e suporte próximo.",
    },
  },
  en: {
    nav: ["Our approach", "Projects", "Solutions", "Testimonials"],
    skip: "Skip to content",
    home: "IRTC, home",
    talk: "Let's talk",
    menu: "Menu",
    language: "Language",
    theme: "Appearance",
    themes: ["System", "Light", "Dark"],
    hero: {
      eyebrow: "From Belém to your next big idea.",
      title: "Ideas, made real.",
      words: [
        "Software.",
        "A SaaS product.",
        "AI agents.",
        "Your next app.",
        "A better CRM.",
      ],
      description:
        "We build software that simplifies your operations and gives your business room to grow.",
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
      label: "02 / SOFTWARE AT WORK",
      aside: "ENGINEERING FOR REAL BUSINESSES.",
      title: "Different challenges.",
      accent: "The same care.",
      intro:
        "From commerce platforms to healthcare systems: software designed around the people who use it.",
      choose: "Choose a project",
      details: "What we built",
      visit: "Visit website",
      image:
        "Public brand imagery illustrates the product, not authorship of the entire platform.",
      source:
        "Project metrics reported in the source materials. Results depend on each operating context.",
      cases: [
        {
          category: "Marketplace · CRM · Data",
          title: "Clarity for a complex operation.",
          description:
            "Marketplace, CRM and reporting modernization. Connected workflows that reduce manual work and help teams make informed decisions.",
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
            "Laboratory integration APIs, caching strategies and PostgreSQL data modeling. The field collection module also reduced data entry time by 30%.",
        },
        {
          category: "Education · Payments · Platform",
          title: "A foundation for the next stage of growth.",
          description:
            "Content, payments and authentication connected in a learning platform. More efficient services and less friction for learners and sellers.",
          result: "improvement in backend efficiency",
          detail:
            "Query optimization, caching and service refactoring. Payment and authentication integrations to support the learning experience and business operations.",
        },
      ],
    },
    solutions: {
      label: "03 / WHAT WE BUILD",
      aside: "FROM FIRST RELEASE TO CONTINUOUS IMPROVEMENT.",
      title: "What does your business",
      accent: "need to solve?",
      items: [
        {
          title: "Products & platforms",
          tags: "SaaS · Portals · Apps",
          intro:
            "Turn an idea into a first release that solves a meaningful problem.",
          text: "We map the journey, identify the essentials and build a product people can use with confidence. After launch, real results guide what comes next.",
          deliverables: [
            "Discovery and MVP definition",
            "Web and mobile experiences",
            "Product launch and iteration",
          ],
        },
        {
          title: "Systems & integrations",
          tags: "ERP · CRM · APIs · Automation",
          intro:
            "Connect your business tools and move beyond spreadsheets and repetitive work.",
          text: "We build management systems and integrations so sales, finance and operations share the same information. Every workflow includes validation, traceability and failure handling.",
          deliverables: [
            "Custom business systems",
            "ERP and service integrations",
            "Internal workflow automation",
          ],
        },
        {
          title: "Applied artificial intelligence",
          tags: "AI agents · RAG · Semantic search",
          intro:
            "Put AI to work saving time, finding answers and supporting better decisions.",
          text: "We connect models to company knowledge with access controls and quality evaluations. Start with a clear use case, then measure usefulness, cost and safety.",
          deliverables: [
            "Knowledge-based assistants",
            "Agents with controlled tools",
            "Response evaluation and monitoring",
          ],
        },
        {
          title: "Data & infrastructure",
          tags: "ETL · ELT · Analytics · Cloud",
          intro:
            "Reliable data and infrastructure that grows with your operations.",
          text: "We organize data collection and processing, build useful metrics and manage infrastructure. Monitoring and recovery routines help teams catch problems early.",
          deliverables: [
            "Data pipelines and quality",
            "Dashboards and business metrics",
            "Cloud, observability and performance",
          ],
        },
      ],
      techTitle: "The right tools for the job.",
      techIntro:
        "Explore our toolkit. The challenge drives the choice, not the hype.",
      techHint: "Select a technology to see where it fits.",
      techDescriptions: [
        "APIs and services that connect your operations, built with TypeScript and room to evolve.",
        "Fast, accessible web products, from customer portals to management dashboards.",
        "Reusable interfaces for consistent web and mobile experiences.",
        "Structured data, efficient queries and vector search with pgvector.",
        "Caching, queues and fast responses for time-sensitive workflows.",
        "Cloud infrastructure, storage, monitoring and application deployment.",
        "Version control, code review and automated testing and delivery.",
        "Modular APIs, validation and structure for complex business systems.",
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
        "Reusable components that made development easier, with the autonomy to lead the initial frontend work.",
        "Technical depth, dedication and initiative, particularly in Vue.js and TypeScript.",
      ],
    },
    origin: {
      label: "BASED IN BELÉM. CONNECTED TO YOUR BUSINESS.",
      title: "Roots in Pará.",
      accent: "Projects without borders.",
      body: "Belém is home. Our work connects people, products and operations across different places. We stay close to your team, wherever you are.",
      vision:
        "We want businesses of every size to have access to well-built software, clear communication and a partnership that continues beyond launch.",
      cta: "Let's explore your project",
      node: "Your business",
      link: "Connected team",
      caption: "A home base in Belém. Collaboration wherever you are.",
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
      draft: "Your MVP draft",
      approve: "Approve and email",
      email: "Your email for a reply",
      sent: "Draft sent. We'll be in touch soon.",
      error: "We couldn't send it. Please try again shortly.",
      disclaimer:
        "Iris uses AI and may make mistakes. This draft is not a commercial proposal.",
      refusal:
        "I can help with IRTC or an initial MVP idea. What business challenge would you like to solve?",
      fallback:
        "Start here: 1. Choose an audience and a pain point. 2. Solve one essential task. 3. Measure the result. IRTC can help turn this into an MVP.",
      about:
        "IRTC builds software, integrations, data systems and AI in Belém, Brazil. We work in short delivery cycles with technical quality and hands-on support.",
    },
  },
  es: {
    nav: ["Cómo trabajamos", "Proyectos", "Soluciones", "Testimonios"],
    skip: "Saltar al contenido",
    home: "IRTC, inicio",
    talk: "Conversemos",
    menu: "Menú",
    language: "Idioma",
    theme: "Apariencia",
    themes: ["Sistema", "Claro", "Oscuro"],
    hero: {
      eyebrow: "Desde Belém hasta tu próximo proyecto.",
      title: "Tu idea, hecha realidad.",
      words: [
        "Software.",
        "Un SaaS.",
        "Agentes de IA.",
        "Tu próxima app.",
        "Un nuevo CRM.",
      ],
      description:
        "Creamos sistemas que simplifican tu operación y dan espacio a tu negocio para crecer.",
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
      label: "02 / PROYECTOS EN MARCHA",
      aside: "INGENIERÍA PARA NEGOCIOS REALES.",
      title: "Desafíos diferentes.",
      accent: "El mismo compromiso.",
      intro:
        "Desde plataformas comerciales hasta sistemas de salud: software pensado para quienes lo usan cada día.",
      choose: "Elige un proyecto",
      details: "Qué desarrollamos",
      visit: "Visitar sitio",
      image:
        "Imagen pública de la marca; ilustra el producto, no la autoría de toda la plataforma.",
      source:
        "Indicadores de proyectos documentados en el material de referencia. Los resultados dependen de cada operación.",
      cases: [
        {
          category: "Marketplace · CRM · Datos",
          title: "Más claridad para una operación compleja.",
          description:
            "Modernización de marketplace, CRM e informes. Flujos conectados para reducir tareas manuales y facilitar las decisiones del equipo.",
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
            "APIs para integrar laboratorios, estrategias de caché y modelado de datos en PostgreSQL. El módulo de recolección en campo también redujo un 30% el tiempo de entrada de datos.",
        },
        {
          category: "Educación · Pagos · Plataforma",
          title: "Una base preparada para crecer.",
          description:
            "Contenido, pagos y autenticación integrados en una plataforma de cursos. Más eficiencia interna y menos obstáculos para estudiantes y vendedores.",
          result: "de mejora en la eficiencia del backend",
          detail:
            "Optimización de consultas, caché y refactorización de servicios. Integración de pagos y autenticación para mejorar la experiencia de aprendizaje y la operación.",
        },
      ],
    },
    solutions: {
      label: "03 / QUÉ CONSTRUIMOS",
      aside: "DE LA PRIMERA VERSIÓN A LA MEJORA CONTINUA.",
      title: "¿Qué necesita resolver",
      accent: "tu negocio?",
      items: [
        {
          title: "Productos y plataformas",
          tags: "SaaS · Portales · Aplicaciones",
          intro:
            "Convierte una idea en una primera versión que resuelva un problema importante.",
          text: "Definimos el recorrido, priorizamos lo esencial y construimos un producto fácil de usar. Tras el lanzamiento, los resultados nos ayudan a decidir qué mejorar.",
          deliverables: [
            "Descubrimiento y definición del MVP",
            "Experiencias web y móviles",
            "Lanzamiento y evolución del producto",
          ],
        },
        {
          title: "Sistemas e integraciones",
          tags: "ERP · CRM · APIs · Automatización",
          intro:
            "Conecta las herramientas de tu empresa y deja atrás las tareas repetitivas.",
          text: "Creamos sistemas de gestión e integraciones para que ventas, finanzas y operaciones compartan la misma información. Cada flujo incluye validación, trazabilidad y manejo de errores.",
          deliverables: [
            "Sistemas de gestión a medida",
            "Integraciones con ERPs y servicios",
            "Automatización de procesos internos",
          ],
        },
        {
          title: "Inteligencia artificial aplicada",
          tags: "Agentes de IA · RAG · Búsqueda semántica",
          intro:
            "Aplica IA donde pueda ahorrar tiempo, encontrar respuestas y mejorar decisiones.",
          text: "Conectamos modelos al conocimiento de la empresa con controles de acceso y evaluaciones de calidad. Empezamos por un caso de uso concreto y medimos utilidad, costo y seguridad.",
          deliverables: [
            "Asistentes con base de conocimiento",
            "Agentes con herramientas controladas",
            "Evaluación y monitoreo de respuestas",
          ],
        },
        {
          title: "Datos e infraestructura",
          tags: "ETL · ELT · Analytics · Cloud",
          intro:
            "Datos confiables e infraestructura que crece con tu operación.",
          text: "Organizamos la recolección y el procesamiento de datos, creamos indicadores y cuidamos la infraestructura. El monitoreo y las rutinas de recuperación permiten detectar problemas a tiempo.",
          deliverables: [
            "Pipelines y calidad de datos",
            "Dashboards e indicadores",
            "Cloud, observabilidad y rendimiento",
          ],
        },
      ],
      techTitle: "Tecnología con propósito.",
      techIntro:
        "Explora nuestras herramientas. Elegimos según el desafío, no la moda.",
      techHint: "Selecciona una tecnología para conocer su función.",
      techDescriptions: [
        "APIs y servicios que conectan tu operación con TypeScript y una estructura lista para evolucionar.",
        "Productos web rápidos y accesibles, desde portales hasta paneles de gestión.",
        "Interfaces reutilizables para experiencias consistentes en la web y en aplicaciones.",
        "Datos estructurados, consultas eficientes y búsqueda vectorial con pgvector.",
        "Caché, colas y respuestas rápidas para procesos que no pueden esperar.",
        "Infraestructura cloud, almacenamiento, monitoreo y despliegue de aplicaciones.",
        "Control de versiones, revisión de código y automatización de pruebas y entregas.",
        "APIs modulares, validación y organización para sistemas complejos.",
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
        "Componentes reutilizables que facilitaron el desarrollo y autonomía para liderar el inicio del frontend.",
        "Dominio técnico, dedicación e iniciativa, especialmente en Vue.js y TypeScript.",
      ],
    },
    origin: {
      label: "DESDE BELÉM, CONECTADOS A TU NEGOCIO.",
      title: "Raíces en Pará.",
      accent: "Proyectos sin fronteras.",
      body: "Nuestra base está en Belém. Cada día conectamos personas, productos y operaciones de distintos lugares. Trabajamos cerca de tu equipo, estés donde estés.",
      vision:
        "Queremos que empresas de todos los tamaños accedan a software bien construido, comunicación clara y una colaboración que continúe después del lanzamiento.",
      cta: "Conozcamos tu proyecto",
      node: "Tu operación",
      link: "Equipo conectado",
      caption: "Una base en Belém. Colaboración estés donde estés.",
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
      draft: "Tu borrador de MVP",
      approve: "Aprobar y enviar por correo",
      email: "Tu correo para recibir respuesta",
      sent: "Borrador enviado. Pronto conversaremos.",
      error: "No pudimos enviarlo. Inténtalo de nuevo en un momento.",
      disclaimer:
        "Iris usa IA y puede equivocarse. El borrador no es una propuesta comercial.",
      refusal:
        "Puedo ayudarte con IRTC o una idea inicial de MVP. ¿Qué desafío de tu negocio quieres resolver?",
      fallback:
        "Para empezar: 1. Elige un público y un problema. 2. Resuelve una tarea esencial. 3. Mide el resultado. IRTC te ayuda a convertirlo en un MVP.",
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

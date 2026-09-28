import type { Locale } from "../content";

type Expertise = { title: string; text: string };

type Highlight = {
  name: string;
  text: string;
  metric: string;
  metricLabel: string;
};

type FounderCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  role: string;
  intro: string;
  bio: string[];
  expertiseTitle: string;
  expertise: Expertise[];
  highlightsTitle: string;
  highlightsIntro: string;
  highlights: Highlight[];
  testimonialsTitle: string;
  testimonialsText: string;
  testimonialsLink: string;
  linkedinLabel: string;
  portraitAlt: string;
};

export const founderCopy: Record<Locale, FounderCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador da IRTC",
    role: "Fundador · Engenharia de software",
    intro:
      "Iago Rodrigues fundou a IRTC em Belém, Pará, para unir arquitetura de software, desenvolvimento de produtos e liderança técnica em um só lugar. Seu trabalho passa por plataformas web, aplicativos, integrações e engenharia de IA, sempre com o mesmo objetivo: transformar problemas complexos em soluções que fazem sentido no dia a dia de quem usa.",
    bio: [
      "Antes de fundar a IRTC, Iago contribuiu com times de engenharia em operações de tamanhos diferentes: da modernização de um marketplace a integrações de sistemas de saúde e a uma plataforma de cursos e pagamentos. Esse contato com problemas reais, e não só com código, molda a forma como a IRTC trabalha hoje.",
      "Sua atuação cobre arquitetura de software, bancos de dados, aplicativos móveis, web e nuvem, com atenção especial a sistemas distribuídos e à engenharia de IA aplicada a produtos. Na prática, isso significa entender o problema de quem vai usar o sistema antes de escrever a primeira linha de código, e continuar por perto depois da entrega.",
    ],
    expertiseTitle: "Áreas de atuação",
    expertise: [
      {
        title: "Arquitetura de software",
        text: "Organiza sistemas em partes claras e conectadas, pensando em como vão crescer e continuar fáceis de manter.",
      },
      {
        title: "Sistemas distribuídos",
        text: "Projeta serviços que conversam entre si e continuam de pé mesmo quando uma parte falha ou o uso aumenta.",
      },
      {
        title: "Bancos de dados",
        text: "Modela dados de forma organizada e escreve consultas eficientes, do cadastro simples ao relatório mais complexo.",
      },
      {
        title: "Aplicativos móveis",
        text: "Desenvolve aplicativos para Android e iPhone pensados para o uso real, incluindo trabalho em campo.",
      },
      {
        title: "Web e frontend",
        text: "Cria telas rápidas e acessíveis, do site institucional ao painel de gestão mais denso.",
      },
      {
        title: "Backend",
        text: "Constrói APIs e serviços que sustentam a operação da empresa com segurança e estabilidade.",
      },
      {
        title: "Nuvem",
        text: "Cuida de infraestrutura, monitoramento e implantação para que o sistema continue no ar.",
      },
      {
        title: "Engenharia de IA",
        text: "Conecta modelos de IA ao conhecimento da empresa, com controle de qualidade e de custo.",
      },
    ],
    highlightsTitle: "Contribuições em projetos",
    highlightsIntro:
      "Resultados relatados pelas próprias empresas. Cada operação tem seu contexto.",
    highlights: [
      {
        name: "LeafLink",
        text: "Contribuiu para modernizar o marketplace, o sistema de clientes e os relatórios da LeafLink, com componentes reutilizáveis e notificações em tempo real.",
        metric: "40%",
        metricLabel: "mais velocidade nas entregas",
      },
      {
        name: "Dasa",
        text: "Ajudou a construir integrações de sistemas de saúde e um aplicativo de coleta em campo para a Dasa, reduzindo também em 30% o tempo de entrada de dados.",
        metric: "50%",
        metricLabel: "menos tempo de carregamento",
      },
      {
        name: "Perfect Pay",
        text: "Trabalhou na plataforma de cursos, pagamentos e autenticação da Perfect Pay, com otimização de consultas e cache.",
        metric: "80%",
        metricLabel: "de melhoria na eficiência do sistema",
      },
    ],
    testimonialsTitle: "O que colegas dizem",
    testimonialsText:
      "Nas recomendações de colegas de equipe aparecem os mesmos temas: cuidado com a qualidade do código, agilidade para resolver problemas e disposição para compartilhar conhecimento com o time.",
    testimonialsLink: "Ver depoimentos",
    linkedinLabel: "Ver perfil no LinkedIn",
    portraitAlt: "Retrato de Iago Rodrigues, fundador da IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Founder",
    eyebrow: "Founder of IRTC",
    role: "Founder · Software engineering",
    intro:
      "Iago Rodrigues founded IRTC in Belém, Brazil, to bring software architecture, product development and technical leadership together in one place. His work spans web platforms, mobile apps, integrations and AI engineering, always with the same goal: turning complex problems into solutions that make sense for the people who use them.",
    bio: [
      "Before founding IRTC, Iago worked with engineering teams on operations of different sizes: modernizing a marketplace, connecting healthcare systems and building a courses and payments platform. That contact with real problems, not just code, shapes how IRTC works today.",
      "His work covers software architecture, databases, mobile apps, web and cloud, with particular attention to distributed systems and AI engineering applied to products. In practice, that means understanding the problem of the people who will use the system before writing the first line of code, and staying close after delivery.",
    ],
    expertiseTitle: "Areas of expertise",
    expertise: [
      {
        title: "Software architecture",
        text: "Organizes systems into clear, connected parts, built with room to grow and stay easy to maintain.",
      },
      {
        title: "Distributed systems",
        text: "Designs services that talk to each other and keep working even when one part fails or usage grows.",
      },
      {
        title: "Databases",
        text: "Models data in an organized way and writes efficient queries, from simple records to complex reports.",
      },
      {
        title: "Mobile apps",
        text: "Builds Android and iPhone apps designed for real-world use, including work in the field.",
      },
      {
        title: "Web and frontend",
        text: "Builds fast, accessible screens, from company websites to dense management dashboards.",
      },
      {
        title: "Backend",
        text: "Builds the APIs and services that keep a business running, with security and stability.",
      },
      {
        title: "Cloud",
        text: "Sets up infrastructure, monitoring and deployment so the system stays online.",
      },
      {
        title: "AI engineering",
        text: "Connects AI models to company knowledge, with quality and cost under control.",
      },
    ],
    highlightsTitle: "Contributions to real projects",
    highlightsIntro:
      "Results reported by the companies themselves. Results depend on each context.",
    highlights: [
      {
        name: "LeafLink",
        text: "Contributed to modernizing LeafLink's marketplace, customer system and reporting, with reusable components and real-time notifications.",
        metric: "40%",
        metricLabel: "faster delivery",
      },
      {
        name: "Dasa",
        text: "Helped build healthcare system integrations and a field collection app for Dasa, also cutting data entry time by 30%.",
        metric: "50%",
        metricLabel: "less loading time",
      },
      {
        name: "Perfect Pay",
        text: "Worked on Perfect Pay's courses, payments and authentication platform, with query optimization and caching.",
        metric: "80%",
        metricLabel: "improvement in system efficiency",
      },
    ],
    testimonialsTitle: "What colleagues say",
    testimonialsText:
      "Recommendations from teammates return to the same themes: care for code quality, quick problem-solving and a willingness to share knowledge with the team.",
    testimonialsLink: "Read testimonials",
    linkedinLabel: "View LinkedIn profile",
    portraitAlt: "Portrait of Iago Rodrigues, founder of IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador de IRTC",
    role: "Fundador · Ingeniería de software",
    intro:
      "Iago Rodrigues fundó IRTC en Belém, Pará, para unir arquitectura de software, desarrollo de productos y liderazgo técnico en un solo lugar. Su trabajo abarca plataformas web, aplicaciones, integraciones e ingeniería de IA, siempre con el mismo objetivo: convertir problemas complejos en soluciones que tengan sentido para quien las usa.",
    bio: [
      "Antes de fundar IRTC, Iago trabajó con equipos de ingeniería en operaciones de distintos tamaños: la modernización de un marketplace, integraciones de sistemas de salud y una plataforma de cursos y pagos. Ese contacto con problemas reales, y no solo con código, define la forma de trabajar de IRTC hoy.",
      "Su trabajo cubre arquitectura de software, bases de datos, aplicaciones móviles, web y nube, con atención especial a los sistemas distribuidos y a la ingeniería de IA aplicada a productos. En la práctica, eso significa entender el problema de quien va a usar el sistema antes de escribir la primera línea de código, y seguir cerca después de la entrega.",
    ],
    expertiseTitle: "Áreas de trabajo",
    expertise: [
      {
        title: "Arquitectura de software",
        text: "Organiza los sistemas en partes claras y conectadas, pensadas para crecer y ser fáciles de mantener.",
      },
      {
        title: "Sistemas distribuidos",
        text: "Diseña servicios que se comunican entre sí y siguen funcionando aunque una parte falle o el uso aumente.",
      },
      {
        title: "Bases de datos",
        text: "Modela los datos de forma organizada y escribe consultas eficientes, desde el registro simple hasta el informe más complejo.",
      },
      {
        title: "Aplicaciones móviles",
        text: "Desarrolla aplicaciones para Android y iPhone pensadas para el uso real, incluido el trabajo en campo.",
      },
      {
        title: "Web y frontend",
        text: "Crea pantallas rápidas y accesibles, desde el sitio institucional hasta el panel de gestión más denso.",
      },
      {
        title: "Backend",
        text: "Construye las APIs y los servicios que sostienen la operación de la empresa, con seguridad y estabilidad.",
      },
      {
        title: "Nube",
        text: "Se ocupa de la infraestructura, el monitoreo y el despliegue para que el sistema siga en línea.",
      },
      {
        title: "Ingeniería de IA",
        text: "Conecta modelos de IA al conocimiento de la empresa, con control de calidad y de costos.",
      },
    ],
    highlightsTitle: "Contribuciones en proyectos",
    highlightsIntro:
      "Resultados reportados por las propias empresas. Cada operación tiene su contexto.",
    highlights: [
      {
        name: "LeafLink",
        text: "Contribuyó a modernizar el marketplace, el sistema de clientes y los informes de LeafLink, con componentes reutilizables y notificaciones en tiempo real.",
        metric: "40%",
        metricLabel: "más velocidad de entrega",
      },
      {
        name: "Dasa",
        text: "Ayudó a construir integraciones de sistemas de salud y una aplicación de recolección en campo para Dasa, reduciendo también en 30% el tiempo de entrada de datos.",
        metric: "50%",
        metricLabel: "menos tiempo de carga",
      },
      {
        name: "Perfect Pay",
        text: "Trabajó en la plataforma de cursos, pagos y autenticación de Perfect Pay, con optimización de consultas y caché.",
        metric: "80%",
        metricLabel: "de mejora en la eficiencia del sistema",
      },
    ],
    testimonialsTitle: "Qué dicen los colegas",
    testimonialsText:
      "Las recomendaciones de compañeros de equipo repiten los mismos temas: cuidado por la calidad del código, rapidez para resolver problemas y disposición para compartir conocimiento con el equipo.",
    testimonialsLink: "Ver testimonios",
    linkedinLabel: "Ver perfil en LinkedIn",
    portraitAlt: "Retrato de Iago Rodrigues, fundador de IRTC",
  },
};

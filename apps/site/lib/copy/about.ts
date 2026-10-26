import type { Locale } from "../content";

type Item = { title: string; text: string };
type GalleryImage = { file: string; alt: string };

type AboutCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  introTitle: string;
  introText: string[];
  foundationsTitle: string;
  foundations: Item[];
  valuesTitle: string;
  values: Item[];
  howTitle: string;
  howText: string;
  galleryTitle: string;
  galleryIntro: string;
  gallery: GalleryImage[];
  founderTitle: string;
  founderText: string;
  founderLink: string;
  readMore: string;
  cultureLink: string;
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Sobre",
    eyebrow: "Sobre a IRTC",
    introTitle: "Engenharia para decisões de negócio",
    introText: [
      "Transformamos gargalos operacionais em entregas de cloud, software e IA, com escopo e critérios de resultado definidos.",
      "Iago Rodrigues, fundador e responsável técnico, conduz os projetos de Belém, com atendimento remoto. A capacidade é avaliada antes de cada contratação.",
    ],
    foundationsTitle: "Propósito, missão e visão",
    foundations: [
      {
        title: "Propósito",
        text: "Ampliar o que empresas e pessoas conseguem fazer com tecnologia que funciona no dia a dia.",
      },
      {
        title: "Missão",
        text: "Resolver problemas de negócio projetando, construindo, modernizando e operando sistemas de cloud, software e IA, com qualidade técnica, comunicação clara e responsabilidade pela entrega.",
      },
      {
        title: "Visão",
        text: "Ser uma referência de engenharia nascida na Amazônia, reconhecida por tornar cloud, software e IA acessíveis a empresas de diferentes portes e por construir relações que sustentam seu avanço ao longo do tempo.",
      },
    ],
    valuesTitle: "Valores",
    values: [
      {
        title: "Responsabilidade pelo resultado",
        text: "Escopo, responsáveis e critérios de aceite claros desde o início.",
      },
      {
        title: "Clareza nas relações",
        text: "Prioridades, escolhas e próximos passos que o cliente consegue acompanhar.",
      },
      {
        title: "Qualidade desde o início",
        text: "Arquitetura, segurança, testes e operação planejados como parte da entrega.",
      },
      {
        title: "Proximidade com o cliente",
        text: "Participação de quem conhece o sistema e continuidade com contexto.",
      },
      {
        title: "Respeito às pessoas",
        text: "Linguagem simples, acessibilidade e cuidado com dados e condições de trabalho.",
      },
      {
        title: "Aprendizado com evidência",
        text: "Conhecimento aplicado, feedback e documentação que melhoram a entrega.",
      },
    ],
    howTitle: "Como trabalhamos",
    howText:
      "Definimos o problema e o aceite. Demonstramos as entregas, registramos riscos e testes e documentamos a operação e a continuidade acordadas.",
    galleryTitle: "Gente que faz tecnologia",
    galleryIntro:
      "Fotos ilustrativas, sem relação com pessoas da IRTC. Mostram o tipo de ambiente colaborativo que buscamos construir.",
    gallery: [
      {
        file: "team-collaboration.webp",
        alt: "Três pessoas sorridentes olhando juntas para a tela de um notebook em um escritório com plantas.",
      },
      {
        file: "team-whiteboard.webp",
        alt: "Pequeno grupo ao lado de um quadro branco com notas adesivas, planejando um projeto.",
      },
      {
        file: "pair-programming.webp",
        alt: "Dois desenvolvedores sentados lado a lado, compartilhando um notebook em uma sessão de programação em dupla.",
      },
      {
        file: "team-celebration.webp",
        alt: "Equipe pequena comemorando de forma descontraída em um escritório, com xícaras de café na mesa.",
      },
    ],
    founderTitle: "Liderança",
    founderText:
      "A experiência pessoal de Iago em desenvolvimento, arquitetura e liderança técnica orienta a IRTC. Conheça sua trajetória.",
    founderLink: "Conheça o fundador",
    readMore: "Ler mais",
    cultureLink: "Ver como os valores viram rotina",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About",
    eyebrow: "About IRTC",
    introTitle: "Engineering for business decisions",
    introText: [
      "We turn operational bottlenecks into cloud, software and AI deliverables, with agreed scope and outcome criteria.",
      "Iago Rodrigues, founder and technical lead, runs projects remotely from Belém. Capacity is assessed before each engagement.",
    ],
    foundationsTitle: "Purpose, mission and vision",
    foundations: [
      {
        title: "Purpose",
        text: "To expand what companies and people can do with technology that works in everyday life.",
      },
      {
        title: "Mission",
        text: "To solve business problems by designing, building, modernizing and operating cloud, software and AI systems, with technical quality, clear communication and ownership of delivery.",
      },
      {
        title: "Vision",
        text: "To be an engineering reference born in the Amazon, recognized for making cloud, software and AI accessible to companies of different sizes and for building relationships that sustain their progress over time.",
      },
    ],
    valuesTitle: "Values",
    values: [
      {
        title: "Ownership of results",
        text: "Clear scope, owners and acceptance criteria from the start.",
      },
      {
        title: "Clarity in relationships",
        text: "Priorities, choices and next steps the client can follow.",
      },
      {
        title: "Quality from the start",
        text: "Architecture, security, testing and operations planned as part of the delivery.",
      },
      {
        title: "Closeness to the client",
        text: "Involvement of people who know the system, and continuity with context.",
      },
      {
        title: "Respect for people",
        text: "Plain language, accessibility and care for data and working conditions.",
      },
      {
        title: "Learning from evidence",
        text: "Applied knowledge, feedback and documentation that improve delivery.",
      },
    ],
    howTitle: "How we work",
    howText:
      "We define the problem and acceptance criteria, demonstrate deliverables, record risks and tests, and document agreed operations and support.",
    galleryTitle: "People who build technology",
    galleryIntro:
      "Illustrative photos, not of IRTC people. They show the kind of collaborative environment we aim to build.",
    gallery: [
      {
        file: "team-collaboration.webp",
        alt: "Three smiling people looking together at a laptop screen in an office with plants.",
      },
      {
        file: "team-whiteboard.webp",
        alt: "A small group next to a whiteboard covered in sticky notes, planning a project.",
      },
      {
        file: "pair-programming.webp",
        alt: "Two developers sitting side by side, sharing a laptop during a pair programming session.",
      },
      {
        file: "team-celebration.webp",
        alt: "A small team having a relaxed celebration in an office, with coffee mugs on the table.",
      },
    ],
    founderTitle: "Leadership",
    founderText:
      "Iago’s personal experience in development, architecture and technical leadership guides IRTC. Explore his background.",
    founderLink: "Meet the founder",
    readMore: "Read more",
    cultureLink: "See how the values become routine",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Nosotros",
    eyebrow: "Sobre IRTC",
    introTitle: "Ingeniería para decisiones de negocio",
    introText: [
      "Convertimos obstáculos operativos en entregas de cloud, software e IA, con alcance y criterios de resultado definidos.",
      "Iago Rodrigues, fundador y responsable técnico, dirige los proyectos desde Belém de forma remota. La capacidad se evalúa antes de cada contratación.",
    ],
    foundationsTitle: "Propósito, misión y visión",
    foundations: [
      {
        title: "Propósito",
        text: "Ampliar lo que las empresas y las personas pueden hacer con tecnología que funciona en el día a día.",
      },
      {
        title: "Misión",
        text: "Resolver problemas de negocio diseñando, construyendo, modernizando y operando sistemas de cloud, software e IA, con calidad técnica, comunicación clara y responsabilidad por la entrega.",
      },
      {
        title: "Visión",
        text: "Ser una referencia de ingeniería nacida en la Amazonía, reconocida por hacer que cloud, software e IA sean accesibles para empresas de distintos tamaños y por construir relaciones que sostienen su avance a lo largo del tiempo.",
      },
    ],
    valuesTitle: "Valores",
    values: [
      {
        title: "Responsabilidad por el resultado",
        text: "Alcance, responsables y criterios de aceptación claros desde el inicio.",
      },
      {
        title: "Claridad en las relaciones",
        text: "Prioridades, decisiones y próximos pasos que el cliente puede seguir.",
      },
      {
        title: "Calidad desde el inicio",
        text: "Arquitectura, seguridad, pruebas y operación planificadas como parte de la entrega.",
      },
      {
        title: "Cercanía con el cliente",
        text: "Participación de quien conoce el sistema y continuidad con contexto.",
      },
      {
        title: "Respeto por las personas",
        text: "Lenguaje simple, accesibilidad y cuidado con los datos y las condiciones de trabajo.",
      },
      {
        title: "Aprendizaje con evidencia",
        text: "Conocimiento aplicado, retroalimentación y documentación que mejoran la entrega.",
      },
    ],
    howTitle: "Cómo trabajamos",
    howText:
      "Definimos el problema y la aceptación. Demostramos las entregas, registramos riesgos y pruebas y documentamos la operación y continuidad acordadas.",
    galleryTitle: "Personas que hacen tecnología",
    galleryIntro:
      "Fotos ilustrativas, sin relación con personas de IRTC. Muestran el tipo de ambiente colaborativo que buscamos construir.",
    gallery: [
      {
        file: "team-collaboration.webp",
        alt: "Tres personas sonrientes mirando juntas la pantalla de una laptop en una oficina con plantas.",
      },
      {
        file: "team-whiteboard.webp",
        alt: "Un pequeño grupo junto a una pizarra cubierta de notas adhesivas, planificando un proyecto.",
      },
      {
        file: "pair-programming.webp",
        alt: "Dos desarrolladores sentados uno al lado del otro, compartiendo una laptop en una sesión de programación en pareja.",
      },
      {
        file: "team-celebration.webp",
        alt: "Un pequeño equipo celebrando de forma relajada en una oficina, con tazas de café sobre la mesa.",
      },
    ],
    founderTitle: "Liderazgo",
    founderText:
      "La experiencia personal de Iago en desarrollo, arquitectura y liderazgo técnico orienta a IRTC. Conoce su trayectoria.",
    founderLink: "Conoce al fundador",
    readMore: "Leer más",
    cultureLink: "Ver cómo los valores se vuelven rutina",
  },
};

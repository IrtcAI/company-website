import type { Locale } from "../content";

type Value = { title: string; text: string };
type Step = { title: string; text: string };
type GalleryImage = { file: string; alt: string };

type AboutCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  introTitle: string;
  introText: string;
  visionTitle: string;
  valuesTitle: string;
  values: Value[];
  howTitle: string;
  howIntro: string;
  steps: Step[];
  galleryTitle: string;
  galleryIntro: string;
  gallery: GalleryImage[];
  founderTitle: string;
  founderText: string;
  founderLink: string;
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Sobre",
    eyebrow: "Sobre a IRTC",
    introTitle: "Uma fábrica de software de Belém",
    introText:
      "A IRTC é uma fábrica de software baseada em Belém, no Pará. Trabalhamos com equipes em qualquer lugar, sempre de perto, entendendo o negócio antes de escrever a primeira linha de código.",
    visionTitle: "Nossa visão",
    valuesTitle: "Cultura e valores",
    values: [
      {
        title: "Comunicação clara",
        text: "Organizamos o projeto em etapas curtas, com prioridades combinadas e demonstrações frequentes. Você sabe o que está pronto e o que vem depois.",
      },
      {
        title: "Qualidade desde o começo",
        text: "Arquitetura, testes e monitoramento entram no projeto desde o início, não depois que os problemas aparecem.",
      },
      {
        title: "Suporte de quem construiu",
        text: "Quem resolve o seu problema é quem construiu o sistema, sem passar sua demanda de um time para outro.",
      },
      {
        title: "Perto mesmo à distância",
        text: "Trabalhamos de perto com a equipe do cliente, mesmo quando o time está em outra cidade ou outro país.",
      },
      {
        title: "Acessibilidade e linguagem simples",
        text: "Preferimos explicações diretas a jargão técnico, e cuidamos para que sites e sistemas funcionem para todo mundo.",
      },
    ],
    howTitle: "Como trabalhamos",
    howIntro: "Um caminho simples, do primeiro problema ao suporte contínuo.",
    steps: [
      {
        title: "Entender",
        text: "Conversamos sobre o problema, quem ele afeta e o que precisa mudar.",
      },
      {
        title: "Planejar a primeira versão",
        text: "Definimos o essencial para resolver o problema principal, sem inchar o escopo.",
      },
      {
        title: "Construir em ciclos curtos",
        text: "Entregamos em etapas pequenas, com demonstrações frequentes para ajustar o rumo cedo.",
      },
      {
        title: "Lançar",
        text: "Colocamos a primeira versão no ar e acompanhamos o uso real.",
      },
      {
        title: "Dar suporte e evoluir",
        text: "Continuamos por perto depois do lançamento, corrigindo e melhorando com base no que acontece.",
      },
    ],
    galleryTitle: "Gente que faz tecnologia",
    galleryIntro:
      "Fotos ilustrativas do tipo de ambiente colaborativo que buscamos construir.",
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
    founderTitle: "Conheça quem lidera",
    founderText:
      "A IRTC nasceu do trabalho de Iago Rodrigues em plataformas web, aplicativos, integrações e IA.",
    founderLink: "Conheça o fundador",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About",
    eyebrow: "About IRTC",
    introTitle: "A software company from Belém",
    introText:
      "IRTC is a software company based in Belém, Brazil. We work with teams anywhere, staying close and understanding the business before writing the first line of code.",
    visionTitle: "Our vision",
    valuesTitle: "Culture and values",
    values: [
      {
        title: "Clear communication",
        text: "We organize the project into short cycles, with shared priorities and regular demos. You know what's ready and what comes next.",
      },
      {
        title: "Quality from day one",
        text: "Architecture, testing and monitoring are part of the project from the start, not added after problems show up.",
      },
      {
        title: "Support from the people who built it",
        text: "The person who solves your problem is the person who built the system, without passing you around.",
      },
      {
        title: "Close even at a distance",
        text: "We work closely with the client's team, even when they are in another city or country.",
      },
      {
        title: "Accessibility and plain language",
        text: "We prefer plain explanations over jargon, and make sure sites and systems work for everyone.",
      },
    ],
    howTitle: "How we work",
    howIntro: "A simple path, from the first problem to ongoing support.",
    steps: [
      {
        title: "Understand",
        text: "We talk through the problem, who it affects and what needs to change.",
      },
      {
        title: "Plan the first version",
        text: "We define what's essential to solve the main problem, without letting scope grow.",
      },
      {
        title: "Build in short cycles",
        text: "We deliver in small steps, with regular demos to adjust course early.",
      },
      {
        title: "Launch",
        text: "We put the first version live and watch how it's actually used.",
      },
      {
        title: "Support and improve",
        text: "We stay close after launch, fixing and improving based on what happens.",
      },
    ],
    galleryTitle: "People who build technology",
    galleryIntro:
      "Illustrative photos of the kind of collaborative environment we aim to build.",
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
    founderTitle: "Meet the person behind it",
    founderText:
      "IRTC grew out of Iago Rodrigues's work on web platforms, mobile apps, integrations and AI.",
    founderLink: "Meet the founder",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Nosotros",
    eyebrow: "Sobre IRTC",
    introTitle: "Una fábrica de software de Belém",
    introText:
      "IRTC es una fábrica de software con base en Belém, Brasil. Trabajamos con equipos en cualquier lugar, de cerca, entendiendo el negocio antes de escribir la primera línea de código.",
    visionTitle: "Nuestra visión",
    valuesTitle: "Cultura y valores",
    values: [
      {
        title: "Comunicación clara",
        text: "Organizamos el proyecto en ciclos cortos, con prioridades acordadas y demostraciones frecuentes. Sabes qué está listo y qué sigue.",
      },
      {
        title: "Calidad desde el principio",
        text: "La arquitectura, las pruebas y el monitoreo forman parte del proyecto desde el inicio, no se agregan después de los problemas.",
      },
      {
        title: "Soporte de quienes lo construyeron",
        text: "Quien resuelve tu problema es quien construyó el sistema, sin pasarte de un equipo a otro.",
      },
      {
        title: "Cerca aunque a distancia",
        text: "Trabajamos de cerca con el equipo del cliente, incluso cuando está en otra ciudad o país.",
      },
      {
        title: "Accesibilidad y lenguaje simple",
        text: "Preferimos explicaciones directas antes que la jerga técnica, y cuidamos que los sitios y sistemas funcionen para todos.",
      },
    ],
    howTitle: "Cómo trabajamos",
    howIntro:
      "Un camino simple, desde el primer problema hasta el soporte continuo.",
    steps: [
      {
        title: "Entender",
        text: "Conversamos sobre el problema, a quién afecta y qué necesita cambiar.",
      },
      {
        title: "Planificar la primera versión",
        text: "Definimos lo esencial para resolver el problema principal, sin inflar el alcance.",
      },
      {
        title: "Construir en ciclos cortos",
        text: "Entregamos en pasos pequeños, con demostraciones frecuentes para ajustar el rumbo temprano.",
      },
      {
        title: "Lanzar",
        text: "Ponemos la primera versión en marcha y observamos el uso real.",
      },
      {
        title: "Dar soporte y mejorar",
        text: "Seguimos cerca después del lanzamiento, corrigiendo y mejorando según lo que ocurre.",
      },
    ],
    galleryTitle: "Personas que hacen tecnología",
    galleryIntro:
      "Fotos ilustrativas del tipo de ambiente colaborativo que buscamos construir.",
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
    founderTitle: "Conoce a quien lidera",
    founderText:
      "IRTC nació del trabajo de Iago Rodrigues en plataformas web, aplicaciones, integraciones e IA.",
    founderLink: "Conoce al fundador",
  },
};

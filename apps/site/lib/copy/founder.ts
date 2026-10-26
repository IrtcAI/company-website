import type { Locale } from "../content";

export type OutsideIcon = "game" | "film" | "cats";

type StoryBlock = { kicker: string; text: string };
type OutsideCard = { icon: OutsideIcon; title: string; text: string };

type FounderCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  role: string;
  intro: string;
  bio: string[];
  linkedinLabel: string;
  linkedinNewTab: string;
  storyTitle: string;
  storyTag: string;
  storyLead: string;
  story: StoryBlock[];
  storyClosing: string;
  outsideTitle: string;
  outsideIntro: string;
  outside: OutsideCard[];
  outsideFact: string;
  expertiseTitle: string;
  expertiseIntro: string;
  expertise: string[];
  portraitAlt: string;
};

export const founderCopy: Record<Locale, FounderCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador da IRTC",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues, fundador e responsável técnico, conduz a análise do problema, as decisões de engenharia e a revisão das entregas.",
    bio: [
      "Formado em Sistemas de Informação, Iago vive em Belém. Atuou como contractor em projetos de LeafLink, Dasa e Perfect Pay.",
      "Esses projetos são experiência pessoal de Iago; não são cases nem relações comerciais da IRTC.",
      "Na IRTC, cada projeto depende de aderência, risco e capacidade. Responsabilidades, implantação e continuidade são definidas no escopo.",
    ],
    linkedinLabel: "Iago no LinkedIn",
    linkedinNewTab: "abre em uma nova aba",
    storyTitle: "Decisões e entregas que você acompanha",
    storyTag: "NA CONDUÇÃO DO PROJETO",
    storyLead:
      "O cliente acompanha as decisões e recebe os entregáveis acordados.",
    story: [
      {
        kicker: "Contexto e prioridade",
        text: "Registrar impacto, restrições e o que precisa ser validado antes do investimento.",
      },
      {
        kicker: "Decisões de engenharia",
        text: "Explicar as alternativas, os custos de operação e os riscos da solução proposta.",
      },
      {
        kicker: "Revisão da entrega",
        text: "Conferir critérios de aceite, testes e pendências com quem conhece o processo do cliente.",
      },
      {
        kicker: "Transferência de conhecimento",
        text: "Entregar documentação e orientações para operar e evoluir o escopo contratado.",
      },
    ],
    storyClosing:
      "A primeira conversa avalia o problema e define o próximo passo.",
    outsideTitle: "Fora do código",
    outsideIntro:
      "O que enche a semana do Iago quando o notebook está fechado.",
    outside: [
      {
        icon: "game",
        title: "Videogame",
        text: "Treino de paciência, de ler padrões e de tentar de novo sem perder a calma.",
      },
      {
        icon: "film",
        title: "Filmes e séries",
        text: "Em família, de preferência. Histórias em ciclos curtos e a hora de desligar.",
      },
      {
        icon: "cats",
        title: "Juliette e Luna",
        text: "As duas gatas da casa, revisoras de código sem direito a aprovar nada.",
      },
    ],
    outsideFact:
      "Fora do trabalho, Iago gosta de videogame, filmes e séries com a família e de brincar com as gatas Juliette e Luna.",
    expertiseTitle: "Áreas de atuação",
    expertiseIntro:
      "O trabalho de Iago na IRTC cobre as três frentes da empresa.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt:
      "Retrato de Iago Rodrigues, fundador da IRTC, olhando para a câmera, com fundo claro",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Founder",
    eyebrow: "Founder of IRTC",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues, founder and technical lead, leads problem analysis, engineering decisions and delivery reviews.",
    bio: [
      "Iago holds a degree in Information Systems and lives in Belém. He worked as a contractor on LeafLink, Dasa and Perfect Pay projects.",
      "These projects are Iago’s personal experience; they are not IRTC case studies or client relationships.",
      "Each IRTC project depends on fit, risk and capacity. Responsibilities, deployment and ongoing support are defined in the scope.",
    ],
    linkedinLabel: "Iago on LinkedIn",
    linkedinNewTab: "opens in a new tab",
    storyTitle: "Decisions and deliverables you can follow",
    storyTag: "LEADING THE PROJECT",
    storyLead: "Clients follow decisions and receive the agreed deliverables.",
    story: [
      {
        kicker: "Context and priority",
        text: "Record impact, constraints and what needs validation before investing.",
      },
      {
        kicker: "Engineering decisions",
        text: "Explain alternatives, operating costs and risks of the proposed solution.",
      },
      {
        kicker: "Delivery review",
        text: "Review acceptance criteria, tests and open issues with the people who know the client’s process.",
      },
      {
        kicker: "Knowledge transfer",
        text: "Deliver documentation and guidance to operate and evolve the contracted scope.",
      },
    ],
    storyClosing:
      "The first conversation assesses the problem and defines the next step.",
    outsideTitle: "Outside the code",
    outsideIntro: "What fills Iago's week when the laptop is closed.",
    outside: [
      {
        icon: "game",
        title: "Video games",
        text: "Training in patience, in reading patterns and in trying again without losing calm.",
      },
      {
        icon: "film",
        title: "Movies and series",
        text: "With the family, preferably. Stories in short cycles and the time to switch off.",
      },
      {
        icon: "cats",
        title: "Juliette and Luna",
        text: "The two cats at home, code reviewers who are not allowed to approve anything.",
      },
    ],
    outsideFact:
      "Outside work, Iago enjoys video games, movies and series with his family, and playing with his cats Juliette and Luna.",
    expertiseTitle: "Areas of work",
    expertiseIntro: "Iago's work at IRTC covers the company's three areas.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt:
      "Portrait of Iago Rodrigues, founder of IRTC, looking at the camera against a light background",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador de IRTC",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues, fundador y responsable técnico, dirige el análisis del problema, las decisiones de ingeniería y la revisión de entregas.",
    bio: [
      "Iago es graduado en Sistemas de Información y vive en Belém. Trabajó como contractor en proyectos de LeafLink, Dasa y Perfect Pay.",
      "Estos proyectos son experiencia personal de Iago; no son casos ni relaciones comerciales de IRTC.",
      "Cada proyecto de IRTC depende de su encaje, riesgo y capacidad. El alcance define responsabilidades, implementación y continuidad.",
    ],
    linkedinLabel: "Iago en LinkedIn",
    linkedinNewTab: "se abre en una pestaña nueva",
    storyTitle: "Decisiones y entregas que puedes seguir",
    storyTag: "AL FRENTE DEL PROYECTO",
    storyLead:
      "El cliente sigue las decisiones y recibe las entregas acordadas.",
    story: [
      {
        kicker: "Contexto y prioridad",
        text: "Registrar impacto, restricciones y lo que debe validarse antes de invertir.",
      },
      {
        kicker: "Decisiones de ingeniería",
        text: "Explicar alternativas, costos de operación y riesgos de la solución propuesta.",
      },
      {
        kicker: "Revisión de la entrega",
        text: "Revisar criterios de aceptación, pruebas y pendientes con quienes conocen el proceso del cliente.",
      },
      {
        kicker: "Transferencia de conocimiento",
        text: "Entregar documentación e instrucciones para operar y evolucionar el alcance contratado.",
      },
    ],
    storyClosing:
      "La primera conversación evalúa el problema y define el siguiente paso.",
    outsideTitle: "Fuera del código",
    outsideIntro:
      "Lo que llena la semana de Iago cuando el portátil está cerrado.",
    outside: [
      {
        icon: "game",
        title: "Videojuegos",
        text: "Entrenamiento de paciencia, de leer patrones y de intentar de nuevo sin perder la calma.",
      },
      {
        icon: "film",
        title: "Películas y series",
        text: "En familia, de preferencia. Historias en ciclos cortos y la hora de desconectar.",
      },
      {
        icon: "cats",
        title: "Juliette y Luna",
        text: "Las dos gatas de la casa, revisoras de código sin permiso para aprobar nada.",
      },
    ],
    outsideFact:
      "Fuera del trabajo, Iago disfruta de los videojuegos, las películas y series con su familia y de jugar con sus gatas Juliette y Luna.",
    expertiseTitle: "Áreas de actuación",
    expertiseIntro:
      "El trabajo de Iago en IRTC cubre los tres frentes de la empresa.",
    expertise: ["Cloud Engineering", "Software Engineering", "AI Engineering"],
    portraitAlt:
      "Retrato de Iago Rodrigues, fundador de IRTC, mirando a la cámara, con fondo claro",
  },
};

// Short founder section shown on the home page.
export const founderSectionCopy: Record<
  Locale,
  {
    label: string;
    title: string;
    accent: string;
    role: string;
    intro: string;
    body: string;
    location: string;
    alt: string;
    link: string;
    linkedin: string;
    newTab: string;
  }
> = {
  "pt-BR": {
    label: "QUEM ESTÁ POR TRÁS",
    title: "Conversa direta",
    accent: "com quem decide e entrega.",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues, fundador e responsável técnico, conduz a análise do problema, as decisões de engenharia e a revisão das entregas.",
    body: "Conheça a experiência pessoal que orienta os projetos da IRTC.",
    location: "Em Belém, Pará, com atendimento remoto.",
    alt: "Retrato de Iago Rodrigues, fundador da IRTC",
    link: "Conheça a trajetória do Iago",
    linkedin: "Iago no LinkedIn",
    newTab: "abre em uma nova aba",
  },
  en: {
    label: "THE PERSON BEHIND IRTC",
    title: "Direct access",
    accent: "to the person leading delivery.",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues, founder and technical lead, leads problem analysis, engineering decisions and delivery reviews.",
    body: "Explore the personal experience behind IRTC’s projects.",
    location: "Based in Belém, Pará, serving clients remotely.",
    alt: "Portrait of Iago Rodrigues, founder of IRTC",
    link: "Read Iago's story",
    linkedin: "Iago on LinkedIn",
    newTab: "opens in a new tab",
  },
  es: {
    label: "QUIÉN ESTÁ DETRÁS",
    title: "Contacto directo",
    accent: "con quien decide y entrega.",
    role: "Founder & Principal Engineer",
    intro:
      "Iago Rodrigues, fundador y responsable técnico, dirige el análisis del problema, las decisiones de ingeniería y la revisión de entregas.",
    body: "Conoce la experiencia personal que orienta los proyectos de IRTC.",
    location: "En Belém, Pará, con atención remota.",
    alt: "Retrato de Iago Rodrigues, fundador de IRTC",
    link: "Conoce la trayectoria de Iago",
    linkedin: "Iago en LinkedIn",
    newTab: "se abre en una pestaña nueva",
  },
};

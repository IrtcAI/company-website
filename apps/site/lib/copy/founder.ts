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
      "Iago Rodrigues é o fundador e responsável técnico da IRTC. Participa da análise do problema, das decisões de engenharia e da revisão das entregas, mantendo o contexto entre a conversa comercial e a execução.",
    bio: [
      "Iago é formado em Sistemas de Informação e vive em Belém, no Pará. Sua experiência pessoal inclui atuação como contractor em projetos de LeafLink, Dasa e Perfect Pay.",
      "Esses trabalhos pertencem à trajetória profissional de Iago. As organizações citadas não são apresentadas como clientes da IRTC, e seus projetos e resultados não compõem o portfólio comercial da empresa.",
      "Na IRTC, cada oportunidade é avaliada pelo problema, pelo risco e pela capacidade de entrega. O escopo define responsabilidades, condições de implantação e continuidade.",
    ],
    linkedinLabel: "Iago no LinkedIn",
    linkedinNewTab: "abre em uma nova aba",
    storyTitle: "Responsabilidade que você pode acompanhar",
    storyTag: "NA CONDUÇÃO DO PROJETO",
    storyLead:
      "O papel do fundador se traduz em decisões e entregáveis que ficam disponíveis para o cliente.",
    story: [
      {
        kicker: "Contexto e prioridade",
        text: "Relacionar o problema à operação, registrar restrições e definir o que precisa ser validado antes de investir.",
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
      "A primeira conversa serve para avaliar a aderência do problema e definir o próximo passo.",
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
      "Iago Rodrigues is IRTC’s founder and technical lead. He takes part in assessing the problem, making engineering decisions and reviewing deliveries, keeping context from the business conversation through execution.",
    bio: [
      "Iago holds a degree in Information Systems and lives in Belém, Pará, Brazil. His personal experience includes contractor work on projects for LeafLink, Dasa and Perfect Pay.",
      "That work belongs to Iago’s professional background. These organizations are not presented as IRTC clients, and their projects and results are not part of the company’s commercial portfolio.",
      "At IRTC, each opportunity is assessed against the problem, risk and delivery capacity. The scope defines responsibilities, deployment conditions and continuity.",
    ],
    linkedinLabel: "Iago on LinkedIn",
    linkedinNewTab: "opens in a new tab",
    storyTitle: "Accountability you can follow",
    storyTag: "LEADING THE PROJECT",
    storyLead:
      "The founder’s role translates into decisions and deliverables available to the client.",
    story: [
      {
        kicker: "Context and priority",
        text: "Connect the problem to the operation, record constraints and define what needs validation before investing.",
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
      "The first conversation assesses whether the problem is a fit and defines the next step.",
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
      "Iago Rodrigues es el fundador y responsable técnico de IRTC. Participa en el análisis del problema, las decisiones de ingeniería y la revisión de las entregas, manteniendo el contexto entre la conversación comercial y la ejecución.",
    bio: [
      "Iago es graduado en Sistemas de Información y vive en Belém, Pará, Brasil. Su experiencia personal incluye trabajo como contractor en proyectos de LeafLink, Dasa y Perfect Pay.",
      "Esos trabajos forman parte de la trayectoria profesional de Iago. Las organizaciones citadas no se presentan como clientes de IRTC, y sus proyectos y resultados no integran el portafolio comercial de la empresa.",
      "En IRTC, cada oportunidad se evalúa según el problema, el riesgo y la capacidad de entrega. El alcance define responsabilidades, condiciones de implantación y continuidad.",
    ],
    linkedinLabel: "Iago en LinkedIn",
    linkedinNewTab: "se abre en una pestaña nueva",
    storyTitle: "Responsabilidad que puedes seguir",
    storyTag: "AL FRENTE DEL PROYECTO",
    storyLead:
      "El papel del fundador se traduce en decisiones y entregables disponibles para el cliente.",
    story: [
      {
        kicker: "Contexto y prioridad",
        text: "Relacionar el problema con la operación, registrar restricciones y definir qué validar antes de invertir.",
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
      "La primera conversación sirve para evaluar el encaje del problema y definir el siguiente paso.",
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
      "Iago Rodrigues é o fundador e responsável técnico da IRTC. Participa da análise do problema, das decisões de engenharia e da revisão das entregas, mantendo o contexto entre a conversa comercial e a execução.",
    body: "Conheça sua experiência profissional e como ela orienta a condução dos projetos da IRTC.",
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
      "Iago Rodrigues is IRTC’s founder and technical lead. He takes part in assessing the problem, making engineering decisions and reviewing deliveries, keeping context from the business conversation through execution.",
    body: "Explore his professional background and how it informs the way IRTC projects are led.",
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
      "Iago Rodrigues es el fundador y responsable técnico de IRTC. Participa en el análisis del problema, las decisiones de ingeniería y la revisión de las entregas, manteniendo el contexto entre la conversación comercial y la ejecución.",
    body: "Conoce su trayectoria profesional y cómo orienta la conducción de los proyectos de IRTC.",
    location: "En Belém, Pará, con atención remota.",
    alt: "Retrato de Iago Rodrigues, fundador de IRTC",
    link: "Conoce la trayectoria de Iago",
    linkedin: "Iago en LinkedIn",
    newTab: "se abre en una pestaña nueva",
  },
};

import type { Locale } from "../content";

type BeyondItem = {
  icon: "family" | "belem" | "football" | "mentoring";
  title: string;
  line: string;
};

type FounderCopy = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  role: string;
  intro: string;
  bio: string[];
  beyondTitle: string;
  beyondWork: BeyondItem[];
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
    role: "Fundador · Engenharia de software",
    intro:
      "Iago Rodrigues fundou a IRTC em Belém, no Pará. Antes de qualquer tecnologia, o que move o trabalho dele são as pessoas: a família em casa e os clientes que confiam um problema de verdade à equipe.",
    bio: [
      "Iago nasceu e cresceu em Belém, e foi aí que aprendeu a programar, ainda cedo, mais por teimosia de entender como as coisas funcionam por dentro do que por plano de carreira. Esse jeito de trabalhar levou-o a colaborar com times no Brasil e nos Estados Unidos, em empresas como LeafLink, Dasa e Perfect Pay.",
      "Fundou a IRTC para fazer esse mesmo trabalho de um jeito mais próximo: conversa direta com quem vai usar o sistema, cuidado com cada detalhe e presença depois que o projeto vai ao ar, sem passar o cliente de mão em mão.",
      "Fora do código, é pai de família, e isso vem antes de qualquer projeto. A base em Belém também não é por acaso: é onde ele cresceu, onde a família está, e de onde gosta de trabalhar para clientes em qualquer lugar.",
    ],
    beyondTitle: "Fora do trabalho",
    // Personal details are placeholders pending Iago's review.
    beyondWork: [
      {
        icon: "family",
        title: "Família",
        line: "A família vem sempre em primeiro lugar. No fim do dia, é para eles que ele volta.",
      },
      {
        icon: "belem",
        title: "Belém",
        line: "Cresceu em Belém e trabalha perto de onde nasceu, com a floresta e o rio por perto. Nos fins de semana, gosta de caminhar pela orla e passar na Estação das Docas para um açaí.",
      },
      {
        icon: "football",
        title: "Futebol",
        line: "Uma pelada com os amigos no fim de semana é o programa certo para desligar da tela por umas horas.",
      },
      {
        icon: "mentoring",
        title: "Mentoria",
        line: "Gosta de ajudar desenvolvedores da região a dar os primeiros passos, do jeito que também foi ajudado no começo.",
      },
    ],
    expertiseTitle: "O que ele faz",
    expertiseIntro:
      "Projeta e constrói sites, aplicativos e sistemas sob medida, conecta ferramentas diferentes e usa inteligência artificial para resolver problemas do dia a dia, sempre de um jeito simples de entender.",
    expertise: [
      "Sites",
      "Aplicativos",
      "Sistemas",
      "Integrações",
      "Inteligência artificial",
      "Nuvem",
    ],
    portraitAlt: "Retrato de Iago Rodrigues, fundador da IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Founder",
    eyebrow: "Founder of IRTC",
    role: "Founder · Software engineering",
    intro:
      "Iago Rodrigues founded IRTC in Belém, Brazil. Before any technology, what drives his work is people: the family at home and the clients who trust the team with a real problem.",
    bio: [
      "Iago was born and grew up in Belém, and that's where he learned to code, early on, more out of stubbornness to understand how things work than any career plan. That same approach led him to work with teams in Brazil and the United States, at companies like LeafLink, Dasa and Perfect Pay.",
      "He founded IRTC to do that same work in a closer way: talking directly with the people who will use the system, paying attention to every detail, and staying around after launch instead of passing the client from hand to hand.",
      "Outside the code, he's a family man, and that comes before any project. Being based in Belém isn't an accident either: it's where he grew up, where his family is, and where he likes to work from for clients anywhere.",
    ],
    beyondTitle: "Beyond work",
    beyondWork: [
      {
        icon: "family",
        title: "Family",
        line: "Family always comes first. At the end of the day, that's who he comes home to.",
      },
      {
        icon: "belem",
        title: "Belém",
        line: "He grew up in Belém and works close to where he was born, with the forest and the river nearby. On weekends, he likes to walk along the waterfront and stop at Estação das Docas for açaí.",
      },
      {
        icon: "football",
        title: "Football",
        line: "A casual game with friends on the weekend is the right way to unplug from the screen for a few hours.",
      },
      {
        icon: "mentoring",
        title: "Mentoring",
        line: "He likes helping developers from the region take their first steps, the same way he was helped when he was starting out.",
      },
    ],
    expertiseTitle: "What he does",
    expertiseIntro:
      "He designs and builds websites, apps and custom systems, connects different tools together and uses artificial intelligence to solve everyday problems, always in a way that's easy to follow.",
    expertise: [
      "Websites",
      "Apps",
      "Systems",
      "Integrations",
      "Artificial intelligence",
      "Cloud",
    ],
    portraitAlt: "Portrait of Iago Rodrigues, founder of IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Fundador",
    eyebrow: "Fundador de IRTC",
    role: "Fundador · Ingeniería de software",
    intro:
      "Iago Rodrigues fundó IRTC en Belém, Brasil. Antes que cualquier tecnología, lo que mueve su trabajo son las personas: la familia en casa y los clientes que confían un problema real al equipo.",
    bio: [
      "Iago nació y creció en Belém, y ahí aprendió a programar, desde joven, más por la terquedad de entender cómo funcionan las cosas por dentro que por un plan de carrera. Esa misma forma de trabajar lo llevó a colaborar con equipos en Brasil y en Estados Unidos, en empresas como LeafLink, Dasa y Perfect Pay.",
      "Fundó IRTC para hacer ese mismo trabajo de una forma más cercana: hablar directamente con quien va a usar el sistema, cuidar cada detalle y seguir presente después de la entrega, sin pasar al cliente de mano en mano.",
      "Fuera del código, es padre de familia, y eso va antes que cualquier proyecto. La base en Belém tampoco es casualidad: es donde creció, donde está su familia, y desde donde le gusta trabajar para clientes en cualquier lugar.",
    ],
    beyondTitle: "Fuera del trabajo",
    beyondWork: [
      {
        icon: "family",
        title: "Familia",
        line: "La familia siempre va primero. Al final del día, es a ellos a quienes vuelve.",
      },
      {
        icon: "belem",
        title: "Belém",
        line: "Creció en Belém y trabaja cerca de donde nació, con la selva y el río cerca. Los fines de semana, le gusta caminar por la orilla y pasar por Estação das Docas a tomar un açaí.",
      },
      {
        icon: "football",
        title: "Fútbol",
        line: "Un partido con amigos el fin de semana es el plan perfecto para desconectar de la pantalla por unas horas.",
      },
      {
        icon: "mentoring",
        title: "Mentoría",
        line: "Le gusta ayudar a desarrolladores de la región a dar sus primeros pasos, tal como a él también lo ayudaron al empezar.",
      },
    ],
    expertiseTitle: "A qué se dedica",
    expertiseIntro:
      "Diseña y construye sitios web, aplicaciones y sistemas a medida, conecta herramientas distintas y usa inteligencia artificial para resolver problemas del día a día, siempre de forma fácil de entender.",
    expertise: [
      "Sitios web",
      "Aplicaciones",
      "Sistemas",
      "Integraciones",
      "Inteligencia artificial",
      "Nube",
    ],
    portraitAlt: "Retrato de Iago Rodrigues, fundador de IRTC",
  },
};

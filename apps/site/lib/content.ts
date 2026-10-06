export type Locale = "pt-BR" | "en" | "es";

export type ProjectCase = {
  category: string;
  title: string;
  description: string;
  result: string;
  detail: string;
};

export type ProjectBrand = {
  name: string;
  metric: string;
  stack: string;
  theme: string;
  url: string;
  logo: string;
  image: string;
};

export type RecommendationAuthor = {
  name: string;
  role: string;
  initials: string;
};

export const content = {
  "pt-BR": {
    nav: ["Serviços", "Sobre"],
    navServicesToggle: "Mostrar lista de serviços",
    toast: {
      network:
        "Sem conexão com o servidor. Confira sua internet e tente de novo.",
      rateLimit: "Muitas tentativas seguidas. Aguarde alguns minutos.",
      invalid: "Alguns campos estão incompletos. Revise e envie de novo.",
      server:
        "Não conseguimos enviar agora. Tente mais tarde ou escreva para contato@irtc.com.br.",
      dismiss: "Fechar aviso",
    },
    accessibility: {
      title: "Acessibilidade",
      open: "Abrir opções de acessibilidade",
      close: "Fechar opções de acessibilidade",
      text: "Tamanho do texto",
      sizes: {
        default: "Padrão",
        small: "Menor",
        medium: "Médio",
        large: "Grande",
        extra: "Extra",
      },
      contrast: "Alto contraste",
      on: "ativado",
      off: "desativado",
      motion: "Animações",
      motionOn: "ativadas",
      motionOff: "pausadas",
      reset: "Restaurar preferências",
      dragHint:
        "Arraste este botão para qualquer borda da tela, ou foque nele e use Alt mais as setas do teclado.",
    },
    skip: "Pular para o conteúdo",
    home: "IRTC, início",
    talk: "Vamos conversar",
    menu: "Menu",
    menuClose: "Fechar menu",
    language: "Idioma",
    theme: "Aparência",
    themes: ["Sistema", "Claro", "Escuro"],
    hero: {
      eyebrow: "Da Amazônia para o seu próximo desafio.",
      title: "We engineer what moves your business forward.",
      description:
        "Removemos gargalos de tecnologia com engenharia de cloud, software e IA. Projetamos, construímos e modernizamos os sistemas que o seu negócio precisa para avançar.",
      cta: "Traga o problema",
      secondaryCta: "Conheça os serviços",
      label: "CLOUD, SOFTWARE & AI ENGINEERING",
      pause: "Pausar animações",
      play: "Ativar animações",
      explore: "Conheça a IRTC",
    },
    manifesto: {
      label: "01 / NOSSO JEITO",
      aside: "COMUNICAÇÃO CLARA. ENTREGA CONSISTENTE.",
      title: "Engenharia próxima",
      accent: "da sua operação.",
      foot: "Entendemos o que precisa mudar antes de construir.",
      points: [
        {
          title: "Ciclos curtos, prioridades claras.",
          text: "Definimos prioridades, entregamos em ciclos curtos e mostramos o que está pronto e o que vem depois.",
        },
        {
          title: "Qualidade desde o início.",
          text: "Arquitetura, testes e monitoramento fazem parte do projeto desde o início.",
        },
        {
          title: "Lançamento com continuidade.",
          text: "O lançamento inclui documentação e condições claras para suporte e evolução.",
        },
      ],
    },
    projects: {
      label: "03 / PROJETOS",
      aside: "ENGENHARIA APLICADA.",
      title: "Desafios diferentes.",
      accent: "O mesmo cuidado.",
      intro: "Projetos que podemos mostrar, com contexto e resultados.",
      choose: "Escolha um projeto",
      details: "O que foi desenvolvido",
      visit: "Visitar site",
      source: "Resultados dependem do contexto de cada operação.",
      cases: [] as ProjectCase[],
    },
    solutions: {
      label: "02 / SERVIÇOS",
      aside: "TECNOLOGIA ESCOLHIDA PARA O SEU PROJETO.",
      title: "Cloud, software e IA",
      accent: "para problemas reais.",
      pillars: [
        {
          name: "Cloud Engineering",
          text: "Projetamos e evoluímos ambientes de cloud para atender às necessidades de confiabilidade, capacidade e custo da operação. Nosso foco técnico é AWS.",
        },
        {
          name: "Software Engineering",
          text: "Construímos produtos e plataformas, integramos sistemas e modernizamos legado para que equipes e usuários consigam trabalhar melhor.",
        },
        {
          name: "AI Engineering",
          text: "Aplicamos IA ao conhecimento e aos processos da empresa, com tarefa definida, avaliação de qualidade e controle de acesso e custo.",
        },
      ],
      continuity: {
        label: "Continuidade",
        name: "Continuous Engineering",
        text: "Acompanha a evolução dos sistemas. Escopo, cadência e atendimento são definidos conforme a operação.",
      },
      allServices: "Ver todos os serviços",
      techTitle: "Nosso foco: AWS e IA aplicada.",
      techFocus: [
        { name: "AWS", role: "Onde o sistema roda, escala e é monitorado." },
        {
          name: "Amazon Bedrock",
          role: "IA que responde com os documentos da empresa.",
        },
        { name: "Agentes de IA", role: "Agem com regras e revisão definidas." },
        { name: "MCP", role: "Conecta agentes às ferramentas da empresa." },
      ],
      techProductTitle: "Stack de produto, escolhida por projeto",
      cta: {
        title: "O que precisa avançar no seu negócio?",
        text: "Conte onde a tecnologia limita sua operação e o que você quer mudar. A equipe da IRTC analisa o contexto e combina o próximo passo.",
        action: "Traga o problema",
        iris: "Organize o contexto com a Iris",
      },
    },
    testimonials: {
      label: "04 / RECOMENDAÇÕES",
      title: "Confiança se constrói",
      accent: "no dia a dia.",
      intro: "Qualidade técnica importa. A forma de trabalhar junto também.",
      previous: "Recomendação anterior",
      next: "Próxima recomendação",
      summaries: [] as string[],
    },
    origin: {
      label: "DE BELÉM, CONECTADOS AO SEU NEGÓCIO.",
      title: "Da Amazônia",
      accent: "para o seu próximo desafio.",
      body: "A IRTC tem base em Belém, no Pará, na Amazônia, e trabalha com equipes onde elas estiverem. Nossa origem acompanha uma forma próxima de fazer engenharia: comunicação clara, cuidado com a entrega e continuidade definida desde o projeto.",
      vision:
        "Queremos que empresas de todos os tamanhos tenham acesso a software bem feito, com comunicação clara e uma parceria que continua depois do lançamento.",
      cta: "Traga o problema",
      mapTitle: "Belém é o ponto de partida.",
      mapDescription:
        "Belém, no Pará, é a nossa base. Trabalhamos com equipes onde elas estiverem.",
    },
    contact: {
      label: "VAMOS ENTENDER O SEU DESAFIO.",
      title: "Traga o problema",
      accent: "",
      intro:
        "Conte o que acontece hoje, quem é afetado e o que precisa mudar. A equipe da IRTC analisa o contexto e combina o próximo passo.",
      iris: "Organize o contexto com a Iris",
      name: "Seu nome",
      nameHint: "Como podemos te chamar?",
      email: "E-mail",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Onde o projeto vai acontecer",
      message: "O que acontece hoje e o que precisa mudar?",
      messageHint:
        "Quem é afetado, onde o problema aparece e o resultado que você espera.",
      submit: "Enviar mensagem",
      sending: "Enviando",
      sent: "Mensagem enviada. A equipe da IRTC vai analisar o contexto e combinar o próximo passo.",
      error:
        "Não foi possível enviar. Tente novamente ou use o contato no rodapé.",
      privacy: "Usamos seus dados apenas para responder a este contato.",
      phone: "Telefone ou WhatsApp",
      phoneHint: "Se preferir que a gente ligue",
      service: "Assunto",
      serviceUnknown: "Ainda não sei, quero conversar",
      channels: "Outros canais",
      irisTitle: "Prefere conversar agora?",
      irisText:
        "A Iris, nossa assistente, ajuda a organizar sua ideia em poucos minutos. Depois você pode enviar o rascunho para a nossa equipe.",
      emailHint: "Use o e-mail da sua empresa.",
      nameError: "Informe seu nome.",
      emailError: "Informe um e-mail no formato nome@empresa.com.",
      messageError: "Descreva o problema para a equipe analisar.",
      errorSummary: "Revise os campos abaixo:",
      serviceHint: "Escolha a área mais próxima ou deixe a opção inicial.",
      irisAction: "Organize o contexto com a Iris",
    },
    footer: {
      title: "Seu próximo projeto",
      accent: "começa com uma conversa.",
      location: "Belém, Pará — Brasil",
      signature: "Da Amazônia para o seu próximo desafio.",
      top: "Voltar ao início",
      cookies: "Preferências de cookies",
      consent: {
        text: "Usamos o Google Analytics para entender como o site é usado. Só ativamos se você aceitar.",
        accept: "Aceitar",
        decline: "Recusar",
      },
      soon: "Em breve",
      socials: "Nossas redes",
      services: "Serviços",
      company: "Empresa",
      contact: "Contato",
      address: "Endereço",
      hours: "Horário de atendimento",
      links: [
        "Sobre a IRTC",
        "Fundador",
        "Fale conosco",
        "Converse com a Iris",
        "Cultura",
        "Missão",
        "Visão",
      ],
    },
    iris: {
      launcher: "Oi, sou a Iris, assistente de IA.",
      greeting:
        "Oi, sou a Iris, assistente de IA da IRTC. Me conte o que precisa mudar no seu negócio. Vou ajudar a organizar o contexto para a equipe analisar o próximo passo.",
      subtitle: "Assistente de IA da IRTC",
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
      thinking: "Iris está preparando a resposta…",
      use: "Usar como rascunho",
      draft: "Rascunho do contexto para a equipe",
      approve: "Aprovar e enviar por e-mail",
      email: "Seu e-mail para retorno",
      sent: "Rascunho enviado. A equipe vai analisar e responder pelo e-mail informado.",
      error: "Não foi possível enviar. Tente novamente em instantes.",
      limit:
        "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.",
      disclaimer:
        "A Iris usa IA e pode errar. O rascunho é analisado pela equipe e não é uma proposta comercial.",
      refusal:
        "Posso ajudar a organizar o contexto do seu problema ou explicar a IRTC e seus serviços. O que precisa mudar no seu negócio?",
      fallback:
        "Para organizar o contexto, me conte: 1. Qual é o problema. 2. Quem ele afeta. 3. Que resultado você espera. A equipe da IRTC analisa o rascunho e define o próximo passo.",
      about:
        "A IRTC é uma empresa de Cloud, Software & AI Engineering, com base em Belém (PA). Atuamos em Cloud Engineering, Software Engineering e AI Engineering, com Continuous Engineering para a continuidade dos sistemas.",
      unknown:
        "Não tenho essa informação confirmada. A equipe responde pelo contato@irtc.com.br ou pela página de contato.",
    },
  },
  en: {
    nav: ["Services", "About"],
    navServicesToggle: "Show services list",
    toast: {
      network:
        "Couldn't reach the server. Check your connection and try again.",
      rateLimit: "Too many attempts in a row. Please wait a few minutes.",
      invalid: "Some fields are incomplete. Review them and send again.",
      server:
        "We couldn't send it right now. Try later or write to contato@irtc.com.br.",
      dismiss: "Dismiss notice",
    },
    accessibility: {
      title: "Accessibility",
      open: "Open accessibility options",
      close: "Close accessibility options",
      text: "Text size",
      sizes: {
        default: "Default",
        small: "Small",
        medium: "Medium",
        large: "Large",
        extra: "Extra",
      },
      contrast: "High contrast",
      on: "on",
      off: "off",
      motion: "Animations",
      motionOn: "on",
      motionOff: "paused",
      reset: "Reset preferences",
      dragHint:
        "Drag this button to any edge of the screen, or focus it and use Alt plus the arrow keys.",
    },
    skip: "Skip to content",
    home: "IRTC, home",
    talk: "Let's talk",
    menu: "Menu",
    menuClose: "Close menu",
    language: "Language",
    theme: "Appearance",
    themes: ["System", "Light", "Dark"],
    hero: {
      eyebrow: "From the Amazon to your next challenge.",
      title: "We engineer what moves your business forward.",
      description:
        "We remove technology bottlenecks with cloud, software and AI engineering. We design, build and modernize the systems your business needs to move forward.",
      cta: "Bring the problem",
      secondaryCta: "Explore our services",
      label: "CLOUD, SOFTWARE & AI ENGINEERING",
      pause: "Pause animation",
      play: "Enable animation",
      explore: "Meet IRTC",
    },
    manifesto: {
      label: "01 / OUR APPROACH",
      aside: "CLEAR COMMUNICATION. RELIABLE DELIVERY.",
      title: "Engineering close",
      accent: "to your operation.",
      foot: "We work out what needs to change before we build.",
      points: [
        {
          title: "Short cycles, clear priorities.",
          text: "We set priorities, deliver in short cycles and show what is ready and what comes next.",
        },
        {
          title: "Quality from the start.",
          text: "Architecture, testing and monitoring are part of the project from the start.",
        },
        {
          title: "Launch with continuity.",
          text: "Launch includes documentation and clear terms for support and evolution.",
        },
      ],
    },
    projects: {
      label: "03 / PROJECTS",
      aside: "APPLIED ENGINEERING.",
      title: "Different challenges.",
      accent: "The same care.",
      intro: "Projects we can show, with context and results.",
      choose: "Choose a project",
      details: "What we built",
      visit: "Visit website",
      source: "Results depend on the context of each operation.",
      cases: [] as ProjectCase[],
    },
    solutions: {
      label: "02 / SERVICES",
      aside: "TECHNOLOGY CHOSEN FOR YOUR PROJECT.",
      title: "Cloud, software and AI",
      accent: "for real problems.",
      pillars: [
        {
          name: "Cloud Engineering",
          text: "We design and evolve cloud environments to meet the reliability, capacity and cost needs of the operation. Our technical focus is AWS.",
        },
        {
          name: "Software Engineering",
          text: "We build products and platforms, integrate systems and modernize legacy software so teams and users can work better.",
        },
        {
          name: "AI Engineering",
          text: "We apply AI to a company's knowledge and processes, with a defined task, quality evaluation and control over access and cost.",
        },
      ],
      continuity: {
        label: "Continuity",
        name: "Continuous Engineering",
        text: "It follows how systems evolve. Scope, cadence and support are set according to the operation.",
      },
      allServices: "See all services",
      techTitle: "Our focus: AWS and applied AI.",
      techFocus: [
        {
          name: "AWS",
          role: "Where the system runs, scales and is monitored.",
        },
        {
          name: "Amazon Bedrock",
          role: "AI that answers from the company's documents.",
        },
        { name: "AI agents", role: "Act within defined rules and review." },
        { name: "MCP", role: "Connects agents to the company's tools." },
      ],
      techProductTitle: "Product stack, chosen per project",
      cta: {
        title: "What needs to move forward in your business?",
        text: "Tell us where technology limits your operation and what you want to change. The IRTC team reviews the context and agrees on the next step.",
        action: "Bring the problem",
        iris: "Organize the context with Iris",
      },
    },
    testimonials: {
      label: "04 / RECOMMENDATIONS",
      title: "Trust is built",
      accent: "in the everyday work.",
      intro: "Technical quality matters. So does the way we work together.",
      previous: "Previous recommendation",
      next: "Next recommendation",
      summaries: [] as string[],
    },
    origin: {
      label: "BASED IN BELÉM. CONNECTED TO YOUR BUSINESS.",
      title: "From the Amazon",
      accent: "to your next challenge.",
      body: "IRTC is based in Belém, Pará, in the Amazon, and works with teams wherever they are. Our origin comes with a close way of doing engineering: clear communication, care in delivery and continuity defined from the start of the project.",
      vision:
        "We want businesses of every size to have access to well-built software, clear communication and a partnership that continues beyond launch.",
      cta: "Bring the problem",
      mapTitle: "Belém is the starting point.",
      mapDescription:
        "Belém, in Pará, is our base. We work with teams wherever they are.",
    },
    contact: {
      label: "LET'S UNDERSTAND YOUR CHALLENGE.",
      title: "Bring us the problem",
      accent: "",
      intro:
        "Tell us what is happening today, who it affects and what needs to change. The IRTC team reviews the context and agrees on the next step.",
      iris: "Organize the context with Iris",
      name: "Your name",
      nameHint: "What should we call you?",
      email: "Email",
      company: "Company",
      optional: "optional",
      companyHint: "Where the project will take shape",
      message: "What is happening today, and what needs to change?",
      messageHint:
        "Who is affected, where the problem shows up and the result you expect.",
      submit: "Send message",
      sending: "Sending",
      sent: "Message sent. The IRTC team will review the context and agree on the next step.",
      error:
        "We couldn't send your message. Try again or use the contact in the footer.",
      privacy: "We only use your details to respond to this inquiry.",
      phone: "Phone or WhatsApp",
      phoneHint: "If you'd rather we call",
      service: "Topic",
      serviceUnknown: "Not sure yet, I'd like to talk",
      channels: "Other ways to reach us",
      irisTitle: "Rather talk right now?",
      irisText:
        "Iris, our assistant, helps you shape your idea in a few minutes. You can then send the draft to our team.",
      emailHint: "Use your company email.",
      nameError: "Enter your name.",
      emailError: "Enter an email in the format name@company.com.",
      messageError: "Describe the problem so the team can review it.",
      errorSummary: "Review the fields below:",
      serviceHint: "Pick the closest area or keep the first option.",
      irisAction: "Organize the context with Iris",
    },
    footer: {
      title: "Your next project",
      accent: "starts with a conversation.",
      location: "Belém, Pará — Brazil",
      signature: "From the Amazon to your next challenge.",
      top: "Back to top",
      cookies: "Cookie preferences",
      consent: {
        text: "We use Google Analytics to understand how the site is used. It only runs if you accept.",
        accept: "Accept",
        decline: "Decline",
      },
      soon: "Coming soon",
      socials: "Find us online",
      services: "Services",
      company: "Company",
      contact: "Contact",
      address: "Address",
      hours: "Business hours",
      links: [
        "About IRTC",
        "Founder",
        "Contact us",
        "Chat with Iris",
        "Culture",
        "Mission",
        "Vision",
      ],
    },
    iris: {
      launcher: "Hi, I'm Iris, an AI assistant.",
      greeting:
        "Hi, I'm Iris, IRTC's AI assistant. Tell me what needs to change in your business. I'll help organize the context so the team can review the next step.",
      subtitle: "IRTC's AI assistant",
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
      thinking: "Iris is preparing the answer…",
      use: "Use as draft",
      draft: "Context draft for the team",
      approve: "Approve and email",
      email: "Your email for a reply",
      sent: "Draft sent. The team will review it and reply to the email you provided.",
      error: "We couldn't send it. Please try again shortly.",
      limit:
        "Too many messages in a short time. Please try again in a few minutes.",
      disclaimer:
        "Iris uses AI and can make mistakes. The team reviews the draft, and it is not a commercial proposal.",
      refusal:
        "I can help organize the context of your problem or explain IRTC and its services. What needs to change in your business?",
      fallback:
        "To organize the context, tell me: 1. What the problem is. 2. Who it affects. 3. What result you expect. The IRTC team reviews the draft and decides the next step.",
      about:
        "IRTC is a Cloud, Software & AI Engineering company based in Belém (PA). We work in Cloud Engineering, Software Engineering and AI Engineering, with Continuous Engineering for the continuity of systems.",
      unknown:
        "I don't have that information confirmed. The team can answer at contato@irtc.com.br or through the contact page.",
    },
  },
  es: {
    nav: ["Servicios", "Nosotros"],
    navServicesToggle: "Mostrar lista de servicios",
    toast: {
      network:
        "No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.",
      rateLimit: "Demasiados intentos seguidos. Espera unos minutos.",
      invalid: "Faltan datos en algunos campos. Revísalos y envía de nuevo.",
      server:
        "No pudimos enviarlo ahora. Inténtalo más tarde o escribe a contato@irtc.com.br.",
      dismiss: "Cerrar aviso",
    },
    accessibility: {
      title: "Accesibilidad",
      open: "Abrir opciones de accesibilidad",
      close: "Cerrar opciones de accesibilidad",
      text: "Tamaño del texto",
      sizes: {
        default: "Predeterminado",
        small: "Pequeño",
        medium: "Mediano",
        large: "Grande",
        extra: "Extra",
      },
      contrast: "Alto contraste",
      on: "activado",
      off: "desactivado",
      motion: "Animaciones",
      motionOn: "activadas",
      motionOff: "pausadas",
      reset: "Restablecer preferencias",
      dragHint:
        "Arrastra este botón a cualquier borde de la pantalla, o enfócalo y usa Alt más las flechas del teclado.",
    },
    skip: "Saltar al contenido",
    home: "IRTC, inicio",
    talk: "Conversemos",
    menu: "Menú",
    menuClose: "Cerrar menú",
    language: "Idioma",
    theme: "Apariencia",
    themes: ["Sistema", "Claro", "Oscuro"],
    hero: {
      eyebrow: "Desde la Amazonía hacia tu próximo desafío.",
      title: "We engineer what moves your business forward.",
      description:
        "Eliminamos cuellos de botella de tecnología con ingeniería de cloud, software e IA. Diseñamos, construimos y modernizamos los sistemas que tu negocio necesita para avanzar.",
      cta: "Trae el problema",
      secondaryCta: "Conoce los servicios",
      label: "CLOUD, SOFTWARE & AI ENGINEERING",
      pause: "Pausar animaciones",
      play: "Activar animaciones",
      explore: "Conoce IRTC",
    },
    manifesto: {
      label: "01 / CÓMO TRABAJAMOS",
      aside: "COMUNICACIÓN CLARA. ENTREGAS CONSISTENTES.",
      title: "Ingeniería cercana",
      accent: "a tu operación.",
      foot: "Entendemos qué necesita cambiar antes de construir.",
      points: [
        {
          title: "Ciclos cortos, prioridades claras.",
          text: "Definimos prioridades, entregamos en ciclos cortos y mostramos qué está listo y qué viene después.",
        },
        {
          title: "Calidad desde el inicio.",
          text: "La arquitectura, las pruebas y el monitoreo forman parte del proyecto desde el inicio.",
        },
        {
          title: "Lanzamiento con continuidad.",
          text: "El lanzamiento incluye documentación y condiciones claras para soporte y evolución.",
        },
      ],
    },
    projects: {
      label: "03 / PROYECTOS",
      aside: "INGENIERÍA APLICADA.",
      title: "Desafíos diferentes.",
      accent: "El mismo compromiso.",
      intro: "Proyectos que podemos mostrar, con contexto y resultados.",
      choose: "Elige un proyecto",
      details: "Qué desarrollamos",
      visit: "Visitar sitio",
      source: "Los resultados dependen del contexto de cada operación.",
      cases: [] as ProjectCase[],
    },
    solutions: {
      label: "02 / SERVICIOS",
      aside: "TECNOLOGÍA ELEGIDA PARA TU PROYECTO.",
      title: "Cloud, software e IA",
      accent: "para problemas reales.",
      pillars: [
        {
          name: "Cloud Engineering",
          text: "Diseñamos y evolucionamos entornos de cloud para atender las necesidades de confiabilidad, capacidad y costo de la operación. Nuestro foco técnico es AWS.",
        },
        {
          name: "Software Engineering",
          text: "Construimos productos y plataformas, integramos sistemas y modernizamos software heredado para que equipos y usuarios trabajen mejor.",
        },
        {
          name: "AI Engineering",
          text: "Aplicamos IA al conocimiento y a los procesos de la empresa, con tarea definida, evaluación de calidad y control de acceso y costo.",
        },
      ],
      continuity: {
        label: "Continuidad",
        name: "Continuous Engineering",
        text: "Acompaña la evolución de los sistemas. El alcance, la cadencia y la atención se definen según la operación.",
      },
      allServices: "Ver todos los servicios",
      techTitle: "Nuestro foco: AWS e IA aplicada.",
      techFocus: [
        { name: "AWS", role: "Donde el sistema corre, escala y se monitorea." },
        {
          name: "Amazon Bedrock",
          role: "IA que responde con los documentos de la empresa.",
        },
        {
          name: "Agentes de IA",
          role: "Actúan con reglas y revisión definidas.",
        },
        {
          name: "MCP",
          role: "Conecta agentes a las herramientas de la empresa.",
        },
      ],
      techProductTitle: "Stack de producto, elegido por proyecto",
      cta: {
        title: "¿Qué necesita avanzar en tu negocio?",
        text: "Cuéntanos dónde la tecnología limita tu operación y qué quieres cambiar. El equipo de IRTC analiza el contexto y acuerda el próximo paso.",
        action: "Trae el problema",
        iris: "Organiza el contexto con Iris",
      },
    },
    testimonials: {
      label: "04 / QUIENES TRABAJAN CON NOSOTROS, RECOMIENDAN",
      title: "La confianza se gana",
      accent: "en el trabajo diario.",
      intro: "La calidad técnica importa. La forma de colaborar también.",
      previous: "Recomendación anterior",
      next: "Siguiente recomendación",
      summaries: [] as string[],
    },
    origin: {
      label: "DESDE BELÉM, CONECTADOS A TU NEGOCIO.",
      title: "Desde la Amazonía",
      accent: "hacia tu próximo desafío.",
      body: "IRTC tiene su base en Belém, Pará, en la Amazonía, y trabaja con equipos donde estén. Nuestro origen acompaña una forma cercana de hacer ingeniería: comunicación clara, cuidado en la entrega y continuidad definida desde el proyecto.",
      vision:
        "Queremos que empresas de todos los tamaños accedan a software bien construido, comunicación clara y una colaboración que continúe después del lanzamiento.",
      cta: "Trae el problema",
      mapTitle: "Belém es el punto de partida.",
      mapDescription:
        "Belém, en Pará, es nuestra base. Trabajamos con equipos donde estén.",
    },
    contact: {
      label: "ENTENDAMOS TU DESAFÍO.",
      title: "Trae el problema",
      accent: "",
      intro:
        "Cuéntanos qué ocurre hoy, a quién afecta y qué necesita cambiar. El equipo de IRTC analiza el contexto y acuerda el siguiente paso.",
      iris: "Organiza el contexto con Iris",
      name: "Tu nombre",
      nameHint: "¿Cómo te llamas?",
      email: "Correo electrónico",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Dónde tomará forma el proyecto",
      message: "¿Qué ocurre hoy y qué necesita cambiar?",
      messageHint:
        "A quién afecta, dónde aparece el problema y el resultado que esperas.",
      submit: "Enviar mensaje",
      sending: "Enviando",
      sent: "Mensaje enviado. El equipo de IRTC analizará el contexto y acordará el siguiente paso.",
      error:
        "No pudimos enviarlo. Inténtalo de nuevo o usa el contacto del pie de página.",
      privacy: "Solo usamos tus datos para responder a esta consulta.",
      phone: "Teléfono o WhatsApp",
      phoneHint: "Si prefieres que te llamemos",
      service: "Asunto",
      serviceUnknown: "Aún no lo sé, quiero conversar",
      channels: "Otros canales",
      irisTitle: "¿Prefieres conversar ahora?",
      irisText:
        "Iris, nuestra asistente, te ayuda a ordenar tu idea en pocos minutos. Después puedes enviar el borrador a nuestro equipo.",
      emailHint: "Usa el correo de tu empresa.",
      nameError: "Escribe tu nombre.",
      emailError: "Escribe un correo con el formato nombre@empresa.com.",
      messageError: "Describe el problema para que el equipo lo analice.",
      errorSummary: "Revisa los campos siguientes:",
      serviceHint: "Elige el área más cercana o deja la primera opción.",
      irisAction: "Organiza el contexto con Iris",
    },
    footer: {
      title: "Tu próximo proyecto",
      accent: "empieza con una conversación.",
      location: "Belém, Pará — Brasil",
      signature: "De la Amazonia a tu próximo desafío.",
      top: "Volver al inicio",
      cookies: "Preferencias de cookies",
      consent: {
        text: "Usamos Google Analytics para entender cómo se usa el sitio. Solo se activa si aceptas.",
        accept: "Aceptar",
        decline: "Rechazar",
      },
      soon: "Próximamente",
      socials: "Nuestras redes",
      services: "Servicios",
      company: "Empresa",
      contact: "Contacto",
      address: "Dirección",
      hours: "Horario de atención",
      links: [
        "Sobre IRTC",
        "Fundador",
        "Contáctanos",
        "Habla con Iris",
        "Cultura",
        "Misión",
        "Visión",
      ],
    },
    iris: {
      launcher: "Hola, soy Iris, asistente de IA.",
      greeting:
        "Hola, soy Iris, asistente de IA de IRTC. Cuéntame qué necesita cambiar en tu negocio. Te ayudaré a ordenar el contexto para que el equipo analice el próximo paso.",
      subtitle: "Asistente de IA de IRTC",
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
      thinking: "Iris está preparando la respuesta…",
      use: "Usar como borrador",
      draft: "Borrador del contexto para el equipo",
      approve: "Aprobar y enviar por correo",
      email: "Tu correo para recibir respuesta",
      sent: "Borrador enviado. El equipo lo analizará y responderá al correo indicado.",
      error: "No pudimos enviarlo. Inténtalo de nuevo en un momento.",
      limit:
        "Demasiados mensajes en poco tiempo. Inténtalo de nuevo en unos minutos.",
      disclaimer:
        "Iris usa IA y puede equivocarse. El equipo analiza el borrador y no es una propuesta comercial.",
      refusal:
        "Puedo ayudarte a ordenar el contexto de tu problema o explicar IRTC y sus servicios. ¿Qué necesita cambiar en tu negocio?",
      fallback:
        "Para ordenar el contexto, cuéntame: 1. Cuál es el problema. 2. A quién afecta. 3. Qué resultado esperas. El equipo de IRTC analiza el borrador y define el próximo paso.",
      about:
        "IRTC es una empresa de Cloud, Software & AI Engineering con sede en Belém (PA). Trabajamos en Cloud Engineering, Software Engineering y AI Engineering, con Continuous Engineering para la continuidad de los sistemas.",
      unknown:
        "No tengo esa información confirmada. El equipo responde en contato@irtc.com.br o en la página de contacto.",
    },
  },
};

// Items need written approval (client, metric, method and source) before they are added.
export const projectBrands: ProjectBrand[] = [];

export const recommendationAuthors: RecommendationAuthor[] = [];

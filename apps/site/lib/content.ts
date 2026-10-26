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
      title: "Engenharia que faz seu negócio avançar.",
      description:
        "Integramos sistemas, modernizamos operações e aplicamos IA aos desafios do seu negócio.",
      cta: "Vamos conversar",
      secondaryCta: "Conheça os serviços",
      label: "CLOUD, SOFTWARE & AI ENGINEERING",
      pause: "Pausar animações",
      play: "Ativar animações",
      explore: "Conheça a IRTC",
    },
    manifesto: {
      label: "01 / NOSSO JEITO",
      aside: "DECISÕES CLARAS. ENTREGAS VERIFICÁVEIS.",
      title: "Engenharia próxima",
      accent: "da sua operação.",
      foot: "Entendemos o que precisa mudar antes de construir.",
      points: [
        {
          title: "Decidir com contexto.",
          text: "Priorizamos o problema, comparamos alternativas e definimos critérios para investir.",
        },
        {
          title: "Acompanhar a entrega.",
          text: "Escopo, demonstrações e testes mostram o que está pronto e o que falta.",
        },
        {
          title: "Manter autonomia para operar.",
          text: "Código, documentação e orientação fazem parte do escopo. Continuidade é combinada à parte.",
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
          text: "Diagnóstico e evolução de ambientes AWS, com custo, risco e prioridades claros.",
        },
        {
          name: "Software Engineering",
          text: "Integrações e modernização para reduzir trabalho manual, com escopo e aceite definidos.",
        },
        {
          name: "AI Engineering",
          text: "Protótipos para avaliar qualidade, custo e revisão humana em uma tarefa concreta.",
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
        {
          name: "AWS",
          role: "Onde o sistema roda, escala e é monitorado.",
        },
        {
          name: "Amazon Bedrock",
          role: "IA que responde com os documentos da empresa.",
        },
        {
          name: "Agentes de IA",
          role: "Agem com regras e revisão definidas.",
        },
        {
          name: "MCP",
          role: "Conecta agentes às ferramentas da empresa.",
        },
      ],
      techProductTitle: "Stack de produto, escolhida por projeto",
      cta: {
        title: "O que precisa avançar no seu negócio?",
        text: "Conte o desafio e o que precisa mudar. Iago analisa o contexto e combina o próximo passo.",
        action: "Vamos conversar",
        iris: "Comece com a Iris",
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
      body: "De Belém, Iago Rodrigues conduz os projetos com atendimento remoto e responsabilidades definidas.",
      vision:
        "Software bem feito, comunicação clara e continuidade combinada com cada cliente.",
      cta: "Vamos conversar",
      mapTitle: "Belém é o ponto de partida.",
      mapDescription: "Nossa base é Belém, no Pará. O atendimento é remoto.",
    },
    contact: {
      label: "VAMOS ENTENDER O SEU DESAFIO.",
      title: "Vamos entender o impacto",
      accent: "",
      intro:
        "Conte o desafio e o que precisa mudar. Iago analisa o contexto e combina o próximo passo.",
      iris: "Comece com a Iris",
      name: "Seu nome",
      nameHint: "Como podemos te chamar?",
      email: "E-mail",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Onde o projeto vai acontecer",
      message: "O que acontece hoje e o que precisa mudar?",
      messageHint:
        "Descreva o impacto e a prioridade. Evite informações sensíveis nesta primeira conversa.",
      submit: "Enviar mensagem",
      sending: "Enviando",
      sent: "Mensagem enviada. Iago vai analisar e combinar o próximo passo.",
      error:
        "Não foi possível enviar. Tente novamente ou use o contato no rodapé.",
      privacy: "Usamos seus dados apenas para responder a este contato.",
      phone: "Telefone ou WhatsApp",
      phoneHint: "Se preferir que a gente ligue",
      service: "Assunto",
      serviceUnknown: "Ainda não sei, quero conversar",
      channels: "Outros canais",
      irisTitle: "Ajuda para organizar o contexto",
      irisText:
        "A Iris organiza seu desafio em um rascunho. Você revisa antes de enviar para Iago.",
      emailHint: "Use o e-mail da sua empresa.",
      nameError: "Informe seu nome.",
      emailError: "Informe um e-mail no formato nome@empresa.com.",
      messageError: "Descreva o problema para Iago analisar.",
      errorSummary: "Revise os campos abaixo:",
      serviceHint: "Escolha a área mais próxima ou deixe a opção inicial.",
      irisAction: "Comece com a Iris",
    },
    footer: {
      title: "Uma decisão melhor",
      accent: "começa pelo problema certo.",
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
        "Sou a Iris, assistente de IA da IRTC. Qual desafio posso ajudar a organizar para Iago analisar?",
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
      draft: "Contexto para análise de Iago",
      approve: "Aprovar e enviar por e-mail",
      email: "Seu e-mail para retorno",
      sent: "Rascunho enviado. Iago vai analisar e responder pelo e-mail informado.",
      error: "Não foi possível enviar. Tente novamente em instantes.",
      limit:
        "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.",
      disclaimer:
        "A Iris usa IA e pode errar. Iago analisa o rascunho antes de qualquer proposta comercial.",
      refusal:
        "Posso explicar os serviços da IRTC ou organizar seu desafio. O que precisa mudar?",
      fallback:
        "Qual é o problema, quem ele afeta e qual resultado você espera? Iago vai analisar o rascunho.",
      about:
        "A IRTC é uma empresa B2B de Cloud, Software & AI Engineering, com base em Belém e atendimento remoto.",
      unknown:
        "Não tenho essa informação confirmada. Iago responde pelo contato@irtc.com.br ou pela página de contato.",
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
    talk: "Let’s talk",
    menu: "Menu",
    menuClose: "Close menu",
    language: "Language",
    theme: "Appearance",
    themes: ["System", "Light", "Dark"],
    hero: {
      eyebrow: "From the Amazon to your next challenge.",
      title: "We engineer what moves your business forward.",
      description:
        "We connect systems, modernize operations and apply AI to your business challenges.",
      cta: "Let’s talk",
      secondaryCta: "Explore services",
      label: "CLOUD, SOFTWARE & AI ENGINEERING",
      pause: "Pause animation",
      play: "Enable animation",
      explore: "Meet IRTC",
    },
    manifesto: {
      label: "01 / OUR APPROACH",
      aside: "CLEAR DECISIONS. VERIFIABLE DELIVERIES.",
      title: "Engineering close",
      accent: "to your operation.",
      foot: "We work out what needs to change before we build.",
      points: [
        {
          title: "Decide with context.",
          text: "We prioritize the problem, compare options and define investment criteria.",
        },
        {
          title: "Follow the delivery.",
          text: "Scope, demos and tests show what is ready and what remains.",
        },
        {
          title: "Keep control of operations.",
          text: "Code, documentation and guidance are scoped deliverables. Ongoing support is agreed separately.",
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
          text: "Assess and evolve AWS environments with clear costs, risks and priorities.",
        },
        {
          name: "Software Engineering",
          text: "Integrations and modernization to reduce manual work, with agreed scope and acceptance criteria.",
        },
        {
          name: "AI Engineering",
          text: "Prototypes to assess quality, cost and human review for a specific task.",
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
        {
          name: "AI agents",
          role: "Act within defined rules and review.",
        },
        {
          name: "MCP",
          role: "Connects agents to the company's tools.",
        },
      ],
      techProductTitle: "Product stack, chosen per project",
      cta: {
        title: "What needs to move forward in your business?",
        text: "Share the challenge and what needs to change. Iago reviews the context and agrees on the next step.",
        action: "Let’s talk",
        iris: "Start with Iris",
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
      body: "Based in Belém, Iago Rodrigues leads projects remotely with clear responsibilities.",
      vision:
        "Well-built software, clear communication and ongoing support agreed with each client.",
      cta: "Let’s talk",
      mapTitle: "Belém is the starting point.",
      mapDescription: "Our base is Belém, Pará. We work remotely.",
    },
    contact: {
      label: "LET'S UNDERSTAND YOUR CHALLENGE.",
      title: "Let’s understand the impact",
      accent: "",
      intro:
        "Share the challenge and what needs to change. Iago reviews the context and agrees on the next step.",
      iris: "Start with Iris",
      name: "Your name",
      nameHint: "What should we call you?",
      email: "Email",
      company: "Company",
      optional: "optional",
      companyHint: "Where the project will take shape",
      message: "What is happening today, and what needs to change?",
      messageHint:
        "Describe the impact and priority. Avoid sensitive information in this first conversation.",
      submit: "Send message",
      sending: "Sending",
      sent: "Message sent. Iago will review it and agree on the next step.",
      error:
        "We couldn't send your message. Try again or use the contact in the footer.",
      privacy: "We only use your details to respond to this inquiry.",
      phone: "Phone or WhatsApp",
      phoneHint: "If you'd rather we call",
      service: "Topic",
      serviceUnknown: "Not sure yet, I'd like to talk",
      channels: "Other ways to reach us",
      irisTitle: "Help organizing the context",
      irisText:
        "Iris turns your challenge into a draft. You review it before sending it to Iago.",
      emailHint: "Use your company email.",
      nameError: "Enter your name.",
      emailError: "Enter an email in the format name@company.com.",
      messageError: "Describe the problem so Iago can review it.",
      errorSummary: "Review the fields below:",
      serviceHint: "Pick the closest area or keep the first option.",
      irisAction: "Start with Iris",
    },
    footer: {
      title: "A better decision",
      accent: "starts with the right problem.",
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
        "I’m Iris, IRTC’s AI assistant. What challenge can I help you outline for Iago to review?",
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
      draft: "Context for Iago to review",
      approve: "Approve and email",
      email: "Your email for a reply",
      sent: "Draft sent. Iago will review it and reply to the email you provided.",
      error: "We couldn't send it. Please try again shortly.",
      limit:
        "Too many messages in a short time. Please try again in a few minutes.",
      disclaimer:
        "Iris uses AI and can make mistakes. Iago reviews the draft before any commercial proposal.",
      refusal:
        "I can explain IRTC’s services or help outline your challenge. What needs to change?",
      fallback:
        "What is the problem, who does it affect and what outcome do you expect? Iago will review the draft.",
      about:
        "IRTC is a B2B Cloud, Software & AI Engineering company based in Belém, working remotely.",
      unknown:
        "I don't have that information confirmed. Iago can answer at contato@irtc.com.br or through the contact page.",
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
    talk: "Hablemos",
    menu: "Menú",
    menuClose: "Cerrar menú",
    language: "Idioma",
    theme: "Apariencia",
    themes: ["Sistema", "Claro", "Oscuro"],
    hero: {
      eyebrow: "Desde la Amazonía hacia tu próximo desafío.",
      title: "Ingeniería que impulsa tu negocio.",
      description:
        "Integramos sistemas, modernizamos operaciones y aplicamos IA a los desafíos de tu negocio.",
      cta: "Hablemos",
      secondaryCta: "Conoce los servicios",
      label: "CLOUD, SOFTWARE & AI ENGINEERING",
      pause: "Pausar animaciones",
      play: "Activar animaciones",
      explore: "Conoce IRTC",
    },
    manifesto: {
      label: "01 / CÓMO TRABAJAMOS",
      aside: "DECISIONES CLARAS. ENTREGAS VERIFICABLES.",
      title: "Ingeniería cercana",
      accent: "a tu operación.",
      foot: "Entendemos qué necesita cambiar antes de construir.",
      points: [
        {
          title: "Decidir con contexto.",
          text: "Priorizamos el problema, comparamos alternativas y definimos criterios de inversión.",
        },
        {
          title: "Acompañar la entrega.",
          text: "El alcance, las demostraciones y las pruebas muestran los avances y pendientes.",
        },
        {
          title: "Mantener autonomía para operar.",
          text: "El alcance incluye código, documentación y orientación. La continuidad se acuerda por separado.",
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
          text: "Diagnóstico y evolución de entornos AWS con costos, riesgos y prioridades claros.",
        },
        {
          name: "Software Engineering",
          text: "Integraciones y modernización para reducir tareas manuales, con alcance y aceptación definidos.",
        },
        {
          name: "AI Engineering",
          text: "Prototipos para evaluar calidad, costo y revisión humana en una tarea concreta.",
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
        {
          name: "AWS",
          role: "Donde el sistema corre, escala y se monitorea.",
        },
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
        text: "Cuéntanos el desafío y qué debe cambiar. Iago revisa el contexto y acuerda el siguiente paso.",
        action: "Hablemos",
        iris: "Empieza con Iris",
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
      body: "Desde Belém, Iago Rodrigues dirige los proyectos de forma remota, con responsabilidades definidas.",
      vision:
        "Software bien hecho, comunicación clara y continuidad acordada con cada cliente.",
      cta: "Hablemos",
      mapTitle: "Belém es el punto de partida.",
      mapDescription:
        "Nuestra base es Belém, Pará. Trabajamos de forma remota.",
    },
    contact: {
      label: "ENTENDAMOS TU DESAFÍO.",
      title: "Entendamos el impacto",
      accent: "",
      intro:
        "Cuéntanos el desafío y qué debe cambiar. Iago revisa el contexto y acuerda el siguiente paso.",
      iris: "Empieza con Iris",
      name: "Tu nombre",
      nameHint: "¿Cómo te llamas?",
      email: "Correo electrónico",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Dónde tomará forma el proyecto",
      message: "¿Qué ocurre hoy y qué necesita cambiar?",
      messageHint:
        "Describe el impacto y la prioridad. Evita información sensible en esta primera conversación.",
      submit: "Enviar mensaje",
      sending: "Enviando",
      sent: "Mensaje enviado. Iago lo revisará y acordará el siguiente paso.",
      error:
        "No pudimos enviarlo. Inténtalo de nuevo o usa el contacto del pie de página.",
      privacy: "Solo usamos tus datos para responder a esta consulta.",
      phone: "Teléfono o WhatsApp",
      phoneHint: "Si prefieres que te llamemos",
      service: "Asunto",
      serviceUnknown: "Aún no lo sé, quiero conversar",
      channels: "Otros canales",
      irisTitle: "Ayuda para organizar el contexto",
      irisText:
        "Iris organiza tu desafío en un borrador. Lo revisas antes de enviarlo a Iago.",
      emailHint: "Usa el correo de tu empresa.",
      nameError: "Escribe tu nombre.",
      emailError: "Escribe un correo con el formato nombre@empresa.com.",
      messageError: "Describe el problema para que Iago lo analice.",
      errorSummary: "Revisa los campos siguientes:",
      serviceHint: "Elige el área más cercana o deja la primera opción.",
      irisAction: "Empieza con Iris",
    },
    footer: {
      title: "Una mejor decisión",
      accent: "empieza por el problema correcto.",
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
        "Soy Iris, asistente de IA de IRTC. ¿Qué desafío puedo ayudarte a organizar para que Iago lo revise?",
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
      draft: "Contexto para revisión de Iago",
      approve: "Aprobar y enviar por correo",
      email: "Tu correo para recibir respuesta",
      sent: "Borrador enviado. Iago lo analizará y responderá al correo indicado.",
      error: "No pudimos enviarlo. Inténtalo de nuevo en un momento.",
      limit:
        "Demasiados mensajes en poco tiempo. Inténtalo de nuevo en unos minutos.",
      disclaimer:
        "Iris usa IA y puede equivocarse. Iago revisa el borrador antes de cualquier propuesta comercial.",
      refusal:
        "Puedo explicar los servicios de IRTC u organizar tu desafío. ¿Qué debe cambiar?",
      fallback:
        "¿Cuál es el problema, a quién afecta y qué resultado esperas? Iago revisará el borrador.",
      about:
        "IRTC es una empresa B2B de Cloud, Software & AI Engineering con base en Belém y atención remota.",
      unknown:
        "No tengo esa información confirmada. Iago responde en contato@irtc.com.br o en la página de contacto.",
    },
  },
};

// Items need written approval (client, metric, method and source) before they are added.
export const projectBrands: ProjectBrand[] = [];

export const recommendationAuthors: RecommendationAuthor[] = [];

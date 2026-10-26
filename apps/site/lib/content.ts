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
    talk: "Converse sobre seu desafio",
    menu: "Menu",
    menuClose: "Fechar menu",
    language: "Idioma",
    theme: "Aparência",
    themes: ["Sistema", "Claro", "Escuro"],
    hero: {
      eyebrow: "Da Amazônia para o seu próximo desafio.",
      title: "We engineer what moves your business forward.",
      description:
        "Quando sistemas desconectados, trabalho manual ou instabilidade limitam sua operação, a IRTC conecta diagnóstico e execução. Definimos uma mudança viável, entregamos o escopo e avaliamos o resultado com você.",
      cta: "Converse sobre seu desafio",
      secondaryCta: "Veja como podemos ajudar",
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
          text: "Mapeamos o impacto do problema, as restrições e as alternativas. Você recebe prioridades e critérios para decidir onde investir.",
        },
        {
          title: "Acompanhar a entrega.",
          text: "O escopo define o que será entregue e como será aceito. Demonstrações, testes e registro de riscos permitem acompanhar o trabalho.",
        },
        {
          title: "Manter autonomia para operar.",
          text: "Código, documentação e orientações de operação integram o escopo acordado. Suporte e evolução têm condições próprias.",
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
          text: "Entenda o custo e o risco do ambiente que sustenta sua operação. Diagnóstico, arquitetura e mudanças planejadas, com foco técnico em AWS.",
        },
        {
          name: "Software Engineering",
          text: "Conecte sistemas e elimine etapas manuais que atrasam o trabalho. Integrações, evolução de produtos e modernização com escopo e aceite definidos.",
        },
        {
          name: "AI Engineering",
          text: "Avalie onde a IA pode ajudar em uma tarefa concreta. Protótipos com dados autorizados, critérios de qualidade, custo por tarefa e revisão humana.",
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
        text: "Conte qual processo está limitado, quem é afetado e o que precisa mudar. Iago Rodrigues, fundador e responsável técnico, analisa o contexto para definir o próximo passo.",
        action: "Converse sobre seu desafio",
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
      body: "A IRTC tem base em Belém, no Pará, e atendimento remoto. O trabalho é conduzido por Iago Rodrigues, com interlocutores, responsabilidades e disponibilidade definidos para cada projeto.",
      vision:
        "Queremos que empresas de todos os tamanhos tenham acesso a software bem feito, com comunicação clara e uma parceria que continua depois do lançamento.",
      cta: "Converse sobre seu desafio",
      mapTitle: "Belém é o ponto de partida.",
      mapDescription:
        "Belém, no Pará, é a nossa base. Trabalhamos com equipes onde elas estiverem.",
    },
    contact: {
      label: "VAMOS ENTENDER O SEU DESAFIO.",
      title: "Vamos entender o impacto",
      accent: "",
      intro:
        "Conte qual processo está limitado, quem é afetado e o que precisa mudar. Iago Rodrigues, fundador e responsável técnico, analisa o contexto para definir o próximo passo.",
      iris: "Organize o contexto com a Iris",
      name: "Seu nome",
      nameHint: "Como podemos te chamar?",
      email: "E-mail",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Onde o projeto vai acontecer",
      message: "O que acontece hoje e o que precisa mudar?",
      messageHint:
        "Descreva o processo, quem é afetado, o impacto e a prioridade. Compartilhe apenas informações que possam ser usadas nesta primeira análise.",
      submit: "Enviar mensagem",
      sending: "Enviando",
      sent: "Mensagem enviada. Iago Rodrigues vai analisar o contexto e combinar o próximo passo.",
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
        "A Iris é a assistente de IA deste site. Ela organiza o problema em um rascunho que você revisa antes de enviar para análise de Iago.",
      emailHint: "Use o e-mail da sua empresa.",
      nameError: "Informe seu nome.",
      emailError: "Informe um e-mail no formato nome@empresa.com.",
      messageError: "Descreva o problema para Iago analisar.",
      errorSummary: "Revise os campos abaixo:",
      serviceHint: "Escolha a área mais próxima ou deixe a opção inicial.",
      irisAction: "Organize o contexto com a Iris",
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
        "Oi, sou a Iris, assistente de IA da IRTC. Me conte o que precisa mudar no seu negócio. Vou ajudar a organizar o contexto para Iago analisar o próximo passo.",
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
        "Posso ajudar a organizar o contexto do seu problema ou explicar a IRTC e seus serviços. O que precisa mudar no seu negócio?",
      fallback:
        "Para organizar o contexto, me conte: 1. Qual é o problema. 2. Quem ele afeta. 3. Que resultado você espera. Iago Rodrigues analisa o rascunho e define o próximo passo.",
      about:
        "A IRTC é uma empresa de Cloud, Software & AI Engineering, com base em Belém (PA). Atuamos em Cloud Engineering, Software Engineering e AI Engineering, com Continuous Engineering para a continuidade dos sistemas.",
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
    talk: "Discuss your business challenge",
    menu: "Menu",
    menuClose: "Close menu",
    language: "Language",
    theme: "Appearance",
    themes: ["System", "Light", "Dark"],
    hero: {
      eyebrow: "From the Amazon to your next challenge.",
      title: "We engineer what moves your business forward.",
      description:
        "When disconnected systems, manual work or outages hold back your business, IRTC brings assessment and delivery together. We define a feasible change, deliver the agreed scope and evaluate the result with you.",
      cta: "Discuss your business challenge",
      secondaryCta: "Explore how we can help",
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
          text: "We map the business impact, constraints and alternatives. You receive priorities and criteria for deciding where to invest.",
        },
        {
          title: "Follow the delivery.",
          text: "The scope defines the deliverables and acceptance criteria. Demos, tests and a risk log make progress visible.",
        },
        {
          title: "Keep control of operations.",
          text: "Code, documentation and operating guidance form part of the agreed scope. Support and further development have their own terms.",
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
          text: "Understand the cost and risk of the infrastructure behind your operation. Assessment, architecture and planned changes, with a technical focus on AWS.",
        },
        {
          name: "Software Engineering",
          text: "Connect systems and remove manual steps that delay work. Integrations, product development and modernization with defined scope and acceptance criteria.",
        },
        {
          name: "AI Engineering",
          text: "Evaluate where AI can help with a specific task. Prototypes with authorized data, quality criteria, cost per task and human review.",
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
        text: "Tell us which process is held back, who is affected and what needs to change. Iago Rodrigues, founder and technical lead, reviews the context to define the next step.",
        action: "Discuss your business challenge",
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
      body: "IRTC is based in Belém, Pará, Brazil, and works remotely. Iago Rodrigues leads the work, with contacts, responsibilities and availability defined for each project.",
      vision:
        "We want businesses of every size to have access to well-built software, clear communication and a partnership that continues beyond launch.",
      cta: "Discuss your business challenge",
      mapTitle: "Belém is the starting point.",
      mapDescription:
        "Belém, in Pará, is our base. We work with teams wherever they are.",
    },
    contact: {
      label: "LET'S UNDERSTAND YOUR CHALLENGE.",
      title: "Let’s understand the impact",
      accent: "",
      intro:
        "Tell us which process is held back, who is affected and what needs to change. Iago Rodrigues, founder and technical lead, reviews the context to define the next step.",
      iris: "Organize the context with Iris",
      name: "Your name",
      nameHint: "What should we call you?",
      email: "Email",
      company: "Company",
      optional: "optional",
      companyHint: "Where the project will take shape",
      message: "What is happening today, and what needs to change?",
      messageHint:
        "Describe the process, who is affected, the impact and the priority. Share only information suitable for this initial review.",
      submit: "Send message",
      sending: "Sending",
      sent: "Message sent. Iago Rodrigues will review the context and agree on the next step.",
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
        "Iris is this website’s AI assistant. It organizes the problem into a draft you review before sending it to Iago.",
      emailHint: "Use your company email.",
      nameError: "Enter your name.",
      emailError: "Enter an email in the format name@company.com.",
      messageError: "Describe the problem so Iago can review it.",
      errorSummary: "Review the fields below:",
      serviceHint: "Pick the closest area or keep the first option.",
      irisAction: "Organize the context with Iris",
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
        "Hi, I'm Iris, IRTC's AI assistant. Tell me what needs to change in your business. I'll help organize the context so Iago can review the next step.",
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
        "I can help organize the context of your problem or explain IRTC and its services. What needs to change in your business?",
      fallback:
        "To organize the context, tell me: 1. What the problem is. 2. Who it affects. 3. What result you expect. Iago Rodrigues reviews the draft and decides the next step.",
      about:
        "IRTC is a Cloud, Software & AI Engineering company based in Belém (PA). We work in Cloud Engineering, Software Engineering and AI Engineering, with Continuous Engineering for the continuity of systems.",
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
    talk: "Hablemos de tu desafío",
    menu: "Menú",
    menuClose: "Cerrar menú",
    language: "Idioma",
    theme: "Apariencia",
    themes: ["Sistema", "Claro", "Oscuro"],
    hero: {
      eyebrow: "Desde la Amazonía hacia tu próximo desafío.",
      title: "We engineer what moves your business forward.",
      description:
        "Cuando los sistemas desconectados, el trabajo manual o las fallas limitan tu operación, IRTC une diagnóstico y ejecución. Definimos un cambio viable, entregamos el alcance acordado y evaluamos el resultado contigo.",
      cta: "Hablemos de tu desafío",
      secondaryCta: "Descubre cómo podemos ayudar",
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
          text: "Analizamos el impacto del problema, las restricciones y las alternativas. Recibes prioridades y criterios para decidir dónde invertir.",
        },
        {
          title: "Acompañar la entrega.",
          text: "El alcance define los entregables y sus criterios de aceptación. Las demostraciones, pruebas y el registro de riesgos permiten seguir el trabajo.",
        },
        {
          title: "Mantener autonomía para operar.",
          text: "El código, la documentación y las instrucciones de operación forman parte del alcance acordado. El soporte y la evolución tienen condiciones propias.",
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
          text: "Entiende el costo y el riesgo del entorno que sostiene tu operación. Diagnóstico, arquitectura y cambios planificados, con foco técnico en AWS.",
        },
        {
          name: "Software Engineering",
          text: "Conecta sistemas y elimina pasos manuales que retrasan el trabajo. Integraciones, evolución de productos y modernización con alcance y aceptación definidos.",
        },
        {
          name: "AI Engineering",
          text: "Evalúa dónde puede ayudar la IA en una tarea concreta. Prototipos con datos autorizados, criterios de calidad, costo por tarea y revisión humana.",
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
        text: "Cuéntanos qué proceso está limitado, a quién afecta y qué necesita cambiar. Iago Rodrigues, fundador y responsable técnico, analiza el contexto para definir el siguiente paso.",
        action: "Hablemos de tu desafío",
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
      body: "IRTC tiene su base en Belém, Pará, Brasil, y atiende de forma remota. Iago Rodrigues conduce el trabajo, con interlocutores, responsabilidades y disponibilidad definidos para cada proyecto.",
      vision:
        "Queremos que empresas de todos los tamaños accedan a software bien construido, comunicación clara y una colaboración que continúe después del lanzamiento.",
      cta: "Hablemos de tu desafío",
      mapTitle: "Belém es el punto de partida.",
      mapDescription:
        "Belém, en Pará, es nuestra base. Trabajamos con equipos donde estén.",
    },
    contact: {
      label: "ENTENDAMOS TU DESAFÍO.",
      title: "Entendamos el impacto",
      accent: "",
      intro:
        "Cuéntanos qué proceso está limitado, a quién afecta y qué necesita cambiar. Iago Rodrigues, fundador y responsable técnico, analiza el contexto para definir el siguiente paso.",
      iris: "Organiza el contexto con Iris",
      name: "Tu nombre",
      nameHint: "¿Cómo te llamas?",
      email: "Correo electrónico",
      company: "Empresa",
      optional: "opcional",
      companyHint: "Dónde tomará forma el proyecto",
      message: "¿Qué ocurre hoy y qué necesita cambiar?",
      messageHint:
        "Describe el proceso, a quién afecta, el impacto y la prioridad. Comparte solo información adecuada para este análisis inicial.",
      submit: "Enviar mensaje",
      sending: "Enviando",
      sent: "Mensaje enviado. Iago Rodrigues analizará el contexto y acordará el siguiente paso.",
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
        "Iris es la asistente de IA de este sitio. Organiza el problema en un borrador que revisas antes de enviarlo a Iago.",
      emailHint: "Usa el correo de tu empresa.",
      nameError: "Escribe tu nombre.",
      emailError: "Escribe un correo con el formato nombre@empresa.com.",
      messageError: "Describe el problema para que Iago lo analice.",
      errorSummary: "Revisa los campos siguientes:",
      serviceHint: "Elige el área más cercana o deja la primera opción.",
      irisAction: "Organiza el contexto con Iris",
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
        "Hola, soy Iris, asistente de IA de IRTC. Cuéntame qué necesita cambiar en tu negocio. Te ayudaré a ordenar el contexto para que Iago analice el próximo paso.",
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
        "Puedo ayudarte a ordenar el contexto de tu problema o explicar IRTC y sus servicios. ¿Qué necesita cambiar en tu negocio?",
      fallback:
        "Para ordenar el contexto, cuéntame: 1. Cuál es el problema. 2. A quién afecta. 3. Qué resultado esperas. Iago Rodrigues analiza el borrador y define el próximo paso.",
      about:
        "IRTC es una empresa de Cloud, Software & AI Engineering con sede en Belém (PA). Trabajamos en Cloud Engineering, Software Engineering y AI Engineering, con Continuous Engineering para la continuidad de los sistemas.",
      unknown:
        "No tengo esa información confirmada. Iago responde en contato@irtc.com.br o en la página de contacto.",
    },
  },
};

// Items need written approval (client, metric, method and source) before they are added.
export const projectBrands: ProjectBrand[] = [];

export const recommendationAuthors: RecommendationAuthor[] = [];

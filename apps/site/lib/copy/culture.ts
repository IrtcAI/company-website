import type { Locale } from "../content";

type Item = { title: string; text: string };

type PageBase = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  intro: string;
  storyTag: string;
  storyTitle: string;
  story: string[];
  relatedTitle: string;
};

type CultureCopy = PageBase & {
  practicesTitle: string;
  practices: (Item & { line: string })[];
  valuesTitle: string;
  valuesText: string;
  valuesLink: string;
  aiTitle: string;
  aiIntro: string;
  ai: Item[];
};

type MissionCopy = PageBase & {
  purposeLabel: string;
  verbsTitle: string;
  verbs: Item[];
  commitmentsTitle: string;
  commitments: Item[];
  pathTitle: string;
  pathIntro: string;
  steps: Item[];
};

type VisionCopy = PageBase & {
  horizonAlt: string;
  partsTitle: string;
  parts: Item[];
  signature: string;
};

export const cultureCopy: Record<Locale, CultureCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Cultura",
    eyebrow: "Cultura da IRTC",
    title: "Como a gente trabalha, dia após dia",
    intro:
      "Cultura, para nós, é o que acontece numa segunda-feira comum: como entendemos um problema, como combinamos o que entregar e como tratamos um erro quando ele aparece.",
    storyTag: "Cena imaginada, não é um caso de cliente",
    storyTitle: "Uma segunda-feira em que a planilha trava",
    story: [
      "Imagine uma segunda-feira em que a planilha de pedidos trava às nove da manhã. O time comercial não consegue fechar vendas, o financeiro espera os números e alguém liga pedindo uma solução para ontem.",
      "A primeira pergunta da IRTC não é qual tecnologia usar. É o que travou, quem está parado por causa disso e o que precisa voltar a funcionar primeiro. Com a resposta, a equipe combina uma primeira entrega pequena.",
      "Na primeira entrega já há algo para ver e testar: o pedido entra, o número bate. A equipe mostra o que ficou pronto, o que ainda é risco e o que vem a seguir. Quando um ajuste dá errado, ele é contado logo, com causa e correção, sem procurar culpado.",
      "Passado o aperto, a operação ganha tempo para o que importa: atender melhor, planejar o mês, pensar no próximo passo. A cultura aparece no jeito de atravessar a segunda-feira, e não num cartaz na parede.",
    ],
    practicesTitle: "Cinco práticas do dia a dia",
    practices: [
      {
        title: "Entender antes de construir",
        text: "Começamos esclarecendo o problema, quem ele afeta, o que precisa mudar e quais são as restrições. Daí saem a prioridade e uma primeira entrega que cabe no contexto do cliente.",
        line: "Antes da solução, a pergunta.",
      },
      {
        title: "Entregar em ciclos verificáveis",
        text: "Planejamos prioridades, demonstramos o que ficou pronto e atualizamos riscos e próximos passos. Frequência e participantes são combinados no início e ajustados à operação.",
        line: "Mostrar o que está pronto.",
      },
      {
        title: "Registrar e assumir as escolhas",
        text: "Cada escolha de arquitetura registra contexto, premissas, efeitos e responsável. Quando as condições mudam, os compromissos são revistos. Quem chega ao limite de capacidade avisa e pede revisão.",
        line: "Toda escolha tem dono.",
      },
      {
        title: "Tratar falhas com franqueza",
        text: "Uma falha recebe contenção, comunicação e investigação na medida do impacto. A revisão registra causas, correções e acompanhamento. Quem encontra o problema pode avisar cedo, num ambiente respeitoso.",
        line: "Avisar cedo, corrigir junto.",
      },
      {
        title: "Aprender e manter uma rotina sustentável",
        text: "Cada etapa termina com aprendizados e ações com responsável. A formação técnica acompanha o que a entrega pede. Escopo, atendimento e capacidade são planejados para sustentar qualidade e continuidade.",
        line: "Um ritmo que dura.",
      },
    ],
    valuesTitle: "Os valores por trás das práticas",
    valuesText:
      "As práticas colocam os valores da IRTC em movimento. Eles orientam a rotina de pessoas, parceiros e agentes de IA.",
    valuesLink: "Ver os valores na página Sobre",
    aiTitle: "Operação AI-native: agentes ajudam, pessoas respondem",
    aiIntro:
      "A IA faz parte do jeito de operar da IRTC. Isso não muda quem assume o resultado.",
    ai: [
      {
        title: "Agentes no trabalho",
        text: "Apoiam pesquisa, planejamento, desenvolvimento, documentação e tarefas operacionais, cada um com objetivo, contexto e acesso definidos.",
      },
      {
        title: "Uma pessoa responsável",
        text: "Toda função de agente tem um responsável humano identificado. Compromissos comerciais, mudanças em produção e tratamento de dados passam por quem responde por eles.",
      },
      {
        title: "IA sempre identificada",
        text: "Quando um agente participa do atendimento, isso fica claro. A Iris, assistente de IA do site, organiza o contexto inicial e o rascunho segue para análise da equipe.",
      },
    ],
    relatedTitle: "Continue conhecendo a IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Culture",
    eyebrow: "IRTC culture",
    title: "How we work, day after day",
    intro:
      "Culture, for us, is what happens on an ordinary Monday: how we understand a problem, how we agree on what to deliver and how we handle a mistake when it shows up.",
    storyTag: "Imagined scene, not a client case",
    storyTitle: "A Monday when the spreadsheet freezes",
    story: [
      "Imagine a Monday when the orders spreadsheet freezes at nine in the morning. Sales cannot close deals, finance is waiting for the numbers and someone calls asking for a fix that was due yesterday.",
      "IRTC's first question is not which technology to use. It is what froze, who is stuck because of it and what has to work again first. With the answer, the team agrees on a small first delivery.",
      "By the first delivery there is already something to see and test: the order goes in, the number matches. The team shows what is ready, what is still a risk and what comes next. When an adjustment goes wrong, it is reported right away, with the cause and the fix, without looking for someone to blame.",
      "Once the pressure is gone, the operation gets time for what matters: serving customers better, planning the month, thinking about the next step. Culture shows in how a Monday gets through, not on a poster on the wall.",
    ],
    practicesTitle: "Five everyday practices",
    practices: [
      {
        title: "Understand before building",
        text: "We start by clarifying the problem, who it affects, what has to change and what the constraints are. From that come the priority and a first delivery that fits the client's context.",
        line: "Before the solution, the question.",
      },
      {
        title: "Deliver in verifiable cycles",
        text: "We plan priorities, demonstrate what is ready and update risks and next steps. Frequency and participants are agreed at the start and adjusted to the operation.",
        line: "Show what is ready.",
      },
      {
        title: "Record and own the choices",
        text: "Each architecture choice records context, assumptions, effects and an owner. When conditions change, commitments are reviewed. Anyone who reaches the limit of their capacity says so and asks for review.",
        line: "Every choice has an owner.",
      },
      {
        title: "Handle failures with candor",
        text: "A failure gets containment, communication and investigation in proportion to its impact. The review records causes, fixes and follow-up. Whoever finds the problem can raise it early, in a respectful environment.",
        line: "Speak up early, fix it together.",
      },
      {
        title: "Learn and keep a sustainable routine",
        text: "Each stage ends with lessons and actions with an owner. Technical training follows what delivery asks for. Scope, support and capacity are planned to sustain quality and continuity.",
        line: "A pace that lasts.",
      },
    ],
    valuesTitle: "The values behind the practices",
    valuesText:
      "The practices put IRTC's values in motion. They guide the routine of people, partners and AI agents.",
    valuesLink: "See the values on the About page",
    aiTitle: "AI-native operation: agents help, people answer",
    aiIntro:
      "AI is part of how IRTC operates. That does not change who owns the result.",
    ai: [
      {
        title: "Agents at work",
        text: "They support research, planning, development, documentation and operational tasks, each with a defined goal, context and access.",
      },
      {
        title: "A responsible person",
        text: "Every agent function has an identified human owner. Commercial commitments, production changes and data handling go through whoever answers for them.",
      },
      {
        title: "AI always identified",
        text: "When an agent takes part in a conversation with a client, that is made clear. Iris, the website's AI assistant, organizes the initial context and the draft goes to the team for review.",
      },
    ],
    relatedTitle: "Keep getting to know IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Cultura",
    eyebrow: "Cultura de IRTC",
    title: "Cómo trabajamos, día tras día",
    intro:
      "Cultura, para nosotros, es lo que pasa en un lunes común: cómo entendemos un problema, cómo acordamos qué entregar y cómo tratamos un error cuando aparece.",
    storyTag: "Escena imaginada, no es un caso de cliente",
    storyTitle: "Un lunes en que la planilla se traba",
    story: [
      "Imagina un lunes en que la planilla de pedidos se traba a las nueve de la mañana. El equipo comercial no puede cerrar ventas, finanzas espera los números y alguien llama pidiendo una solución para ayer.",
      "La primera pregunta de IRTC no es qué tecnología usar. Es qué se trabó, quién está detenido por eso y qué tiene que volver a funcionar primero. Con la respuesta, el equipo acuerda una primera entrega pequeña.",
      "En la primera entrega ya hay algo para ver y probar: el pedido entra, el número cuadra. El equipo muestra lo que quedó listo, lo que todavía es riesgo y lo que viene después. Cuando un ajuste sale mal, se cuenta enseguida, con causa y corrección, sin buscar culpables.",
      "Pasado el apuro, la operación gana tiempo para lo que importa: atender mejor, planificar el mes, pensar en el próximo paso. La cultura se ve en cómo se atraviesa el lunes, no en un cartel en la pared.",
    ],
    practicesTitle: "Cinco prácticas del día a día",
    practices: [
      {
        title: "Entender antes de construir",
        text: "Empezamos aclarando el problema, a quién afecta, qué tiene que cambiar y cuáles son las restricciones. De ahí salen la prioridad y una primera entrega que cabe en el contexto del cliente.",
        line: "Antes de la solución, la pregunta.",
      },
      {
        title: "Entregar en ciclos verificables",
        text: "Planificamos prioridades, mostramos lo que quedó listo y actualizamos riesgos y próximos pasos. La frecuencia y los participantes se acuerdan al inicio y se ajustan a la operación.",
        line: "Mostrar lo que está listo.",
      },
      {
        title: "Registrar y asumir las decisiones",
        text: "Cada decisión de arquitectura registra contexto, supuestos, efectos y responsable. Cuando las condiciones cambian, los compromisos se revisan. Quien llega al límite de su capacidad avisa y pide revisión.",
        line: "Toda decisión tiene dueño.",
      },
      {
        title: "Tratar los fallos con franqueza",
        text: "Un fallo recibe contención, comunicación e investigación en proporción a su impacto. La revisión registra causas, correcciones y seguimiento. Quien encuentra el problema puede avisar temprano, en un ambiente respetuoso.",
        line: "Avisar temprano, corregir juntos.",
      },
      {
        title: "Aprender y mantener una rutina sostenible",
        text: "Cada etapa termina con aprendizajes y acciones con responsable. La formación técnica acompaña lo que la entrega pide. Alcance, atención y capacidad se planifican para sostener calidad y continuidad.",
        line: "Un ritmo que dura.",
      },
    ],
    valuesTitle: "Los valores detrás de las prácticas",
    valuesText:
      "Las prácticas ponen en movimiento los valores de IRTC. Orientan la rutina de personas, aliados y agentes de IA.",
    valuesLink: "Ver los valores en la página Nosotros",
    aiTitle: "Operación AI-native: los agentes ayudan, las personas responden",
    aiIntro:
      "La IA es parte de la forma de operar de IRTC. Eso no cambia quién asume el resultado.",
    ai: [
      {
        title: "Agentes en el trabajo",
        text: "Apoyan la investigación, la planificación, el desarrollo, la documentación y las tareas operativas, cada uno con objetivo, contexto y acceso definidos.",
      },
      {
        title: "Una persona responsable",
        text: "Toda función de agente tiene un responsable humano identificado. Los compromisos comerciales, los cambios en producción y el tratamiento de datos pasan por quien responde por ellos.",
      },
      {
        title: "IA siempre identificada",
        text: "Cuando un agente participa en la atención, eso queda claro. Iris, la asistente de IA del sitio, organiza el contexto inicial y el borrador pasa al equipo para su revisión.",
      },
    ],
    relatedTitle: "Sigue conociendo IRTC",
  },
};

export const missionCopy: Record<Locale, MissionCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Missão",
    eyebrow: "Missão da IRTC",
    title: "O que a IRTC existe para fazer",
    intro:
      "Nosso trabalho começa no problema do cliente e termina num sistema que as pessoas conseguem usar e manter.",
    purposeLabel: "Propósito",
    verbsTitle: "Quatro verbos que a missão assume",
    verbs: [
      {
        title: "Projetar",
        text: "Ligar o problema do cliente a um escopo que dá para executar.",
      },
      {
        title: "Construir",
        text: "Entregar software e integrações em ciclos curtos, com testes desde o início.",
      },
      {
        title: "Modernizar",
        text: "Atualizar sistemas que já sustentam a operação, com cuidado para não interromper o que funciona.",
      },
      {
        title: "Operar",
        text: "Acompanhar o sistema em uso, com monitoramento, suporte e evolução combinados.",
      },
    ],
    commitmentsTitle: "Três compromissos junto com a missão",
    commitments: [
      {
        title: "Qualidade técnica",
        text: "Arquitetura, segurança, testes e operação planejados como parte da entrega.",
      },
      {
        title: "Comunicação clara",
        text: "Prioridades, escolhas e próximos passos que o cliente consegue acompanhar.",
      },
      {
        title: "Responsabilidade pela entrega",
        text: "Escopo, responsáveis e critérios de aceite claros desde o início.",
      },
    ],
    pathTitle: "Do primeiro contato à evolução",
    pathIntro:
      "É o percurso que descrevemos aos clientes: entender, planejar, construir em ciclos curtos, lançar e evoluir. O escopo de cada projeto define as etapas, os responsáveis e os critérios de aceite.",
    steps: [
      {
        title: "Entender",
        text: "Conversamos sobre o problema, quem ele afeta e que restrições existem.",
      },
      {
        title: "Planejar",
        text: "Definimos prioridades, a primeira entrega e como o resultado será medido.",
      },
      {
        title: "Construir em ciclos curtos",
        text: "Entregamos em partes, mostramos o que está pronto e ajustamos o rumo.",
      },
      {
        title: "Lançar",
        text: "Colocamos o sistema em uso, com documentação e com quem vai operá-lo acompanhando.",
      },
      {
        title: "Evoluir",
        text: "Ajustamos e otimizamos o sistema conforme o suporte combinado com o cliente.",
      },
    ],
    storyTag: "Cena imaginada, não é um caso de cliente",
    storyTitle: "Uma operação com tempo de sobra",
    story: [
      "Pense numa empresa em que a conciliação de pedidos é feita à mão, todo dia, em três sistemas. Ninguém reclama, porque sempre foi assim.",
      "A missão da IRTC começa nesse ponto: entender o fluxo, desenhar a integração, construir em ciclos e deixar a parte repetitiva por conta do sistema.",
      "Quando funciona, a mudança que importa é pequena e concreta. A equipe passa a olhar uma fonte confiável de informação e sobra tempo para conversar com clientes, revisar exceções e planejar o que vem a seguir.",
      "O resultado precisa ser medido, como o tempo de conciliação e a qualidade dos dados antes e depois da implantação. Sem medida, vira promessa.",
    ],
    relatedTitle: "Continue conhecendo a IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Mission",
    eyebrow: "IRTC mission",
    title: "What IRTC exists to do",
    intro:
      "Our work starts with the client's problem and ends with a system people can use and maintain.",
    purposeLabel: "Purpose",
    verbsTitle: "Four verbs the mission takes on",
    verbs: [
      {
        title: "Design",
        text: "Connect the client's problem to a scope that can be executed.",
      },
      {
        title: "Build",
        text: "Deliver software and integrations in short cycles, with tests from the start.",
      },
      {
        title: "Modernize",
        text: "Update systems that already carry the operation, taking care not to interrupt what works.",
      },
      {
        title: "Operate",
        text: "Follow the system in use, with monitoring, support and evolution agreed in advance.",
      },
    ],
    commitmentsTitle: "Three commitments that come with the mission",
    commitments: [
      {
        title: "Technical quality",
        text: "Architecture, security, testing and operations planned as part of the delivery.",
      },
      {
        title: "Clear communication",
        text: "Priorities, choices and next steps the client can follow.",
      },
      {
        title: "Ownership of delivery",
        text: "Clear scope, owners and acceptance criteria from the start.",
      },
    ],
    pathTitle: "From first contact to evolution",
    pathIntro:
      "This is the path we describe to clients: understand, plan, build in short cycles, launch and evolve. Each project's scope defines the stages, the owners and the acceptance criteria.",
    steps: [
      {
        title: "Understand",
        text: "We talk about the problem, who it affects and what constraints exist.",
      },
      {
        title: "Plan",
        text: "We set priorities, the first delivery and how the result will be measured.",
      },
      {
        title: "Build in short cycles",
        text: "We deliver in parts, show what is ready and adjust course.",
      },
      {
        title: "Launch",
        text: "We put the system into use, with documentation and with the people who will run it involved.",
      },
      {
        title: "Evolve",
        text: "We adjust and optimize the system according to the support agreed with the client.",
      },
    ],
    storyTag: "Imagined scene, not a client case",
    storyTitle: "An operation with time to spare",
    story: [
      "Think of a company where order reconciliation is done by hand, every day, across three systems. Nobody complains, because it has always been this way.",
      "IRTC's mission starts at that point: understand the flow, design the integration, build in cycles and leave the repetitive part to the system.",
      "When it works, the change that matters is small and concrete. The team starts looking at one reliable source of information and there is time left to talk to customers, review exceptions and plan what comes next.",
      "The result has to be measured, such as reconciliation time and data quality before and after rollout. Without measurement, it is only a promise.",
    ],
    relatedTitle: "Keep getting to know IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Misión",
    eyebrow: "Misión de IRTC",
    title: "Para qué existe IRTC",
    intro:
      "Nuestro trabajo empieza en el problema del cliente y termina en un sistema que las personas pueden usar y mantener.",
    purposeLabel: "Propósito",
    verbsTitle: "Cuatro verbos que asume la misión",
    verbs: [
      {
        title: "Diseñar",
        text: "Conectar el problema del cliente con un alcance que se pueda ejecutar.",
      },
      {
        title: "Construir",
        text: "Entregar software e integraciones en ciclos cortos, con pruebas desde el inicio.",
      },
      {
        title: "Modernizar",
        text: "Actualizar sistemas que ya sostienen la operación, con cuidado de no interrumpir lo que funciona.",
      },
      {
        title: "Operar",
        text: "Acompañar el sistema en uso, con monitoreo, soporte y evolución acordados.",
      },
    ],
    commitmentsTitle: "Tres compromisos que acompañan la misión",
    commitments: [
      {
        title: "Calidad técnica",
        text: "Arquitectura, seguridad, pruebas y operación planificadas como parte de la entrega.",
      },
      {
        title: "Comunicación clara",
        text: "Prioridades, decisiones y próximos pasos que el cliente puede seguir.",
      },
      {
        title: "Responsabilidad por la entrega",
        text: "Alcance, responsables y criterios de aceptación claros desde el inicio.",
      },
    ],
    pathTitle: "Del primer contacto a la evolución",
    pathIntro:
      "Es el recorrido que describimos a los clientes: entender, planificar, construir en ciclos cortos, lanzar y evolucionar. El alcance de cada proyecto define las etapas, los responsables y los criterios de aceptación.",
    steps: [
      {
        title: "Entender",
        text: "Conversamos sobre el problema, a quién afecta y qué restricciones existen.",
      },
      {
        title: "Planificar",
        text: "Definimos prioridades, la primera entrega y cómo se medirá el resultado.",
      },
      {
        title: "Construir en ciclos cortos",
        text: "Entregamos por partes, mostramos lo que está listo y ajustamos el rumbo.",
      },
      {
        title: "Lanzar",
        text: "Ponemos el sistema en uso, con documentación y con quienes lo van a operar acompañando.",
      },
      {
        title: "Evolucionar",
        text: "Ajustamos y optimizamos el sistema según el soporte acordado con el cliente.",
      },
    ],
    storyTag: "Escena imaginada, no es un caso de cliente",
    storyTitle: "Una operación con tiempo de sobra",
    story: [
      "Piensa en una empresa donde la conciliación de pedidos se hace a mano, todos los días, en tres sistemas. Nadie se queja, porque siempre fue así.",
      "La misión de IRTC empieza en ese punto: entender el flujo, diseñar la integración, construir en ciclos y dejar la parte repetitiva a cargo del sistema.",
      "Cuando funciona, el cambio que importa es pequeño y concreto. El equipo pasa a mirar una fuente confiable de información y sobra tiempo para hablar con los clientes, revisar excepciones y planificar lo que viene.",
      "El resultado tiene que medirse, por ejemplo el tiempo de conciliación y la calidad de los datos antes y después de la implantación. Sin medición, es solo una promesa.",
    ],
    relatedTitle: "Sigue conociendo IRTC",
  },
};

export const visionCopy: Record<Locale, VisionCopy> = {
  "pt-BR": {
    breadcrumbLabel: "Trilha de navegação",
    breadcrumbHome: "Início",
    breadcrumbCurrent: "Visão",
    eyebrow: "Visão da IRTC",
    title: "Aonde a IRTC quer chegar",
    intro:
      "Uma empresa de engenharia que começou na Amazônia e quer ser lembrada pelo que entrega, pela clareza e pela companhia ao longo do caminho.",
    horizonAlt:
      "Ilustração de um rio ao entardecer, com o sol baixo no horizonte e faixas de água em tons de verde e terracota.",
    partsTitle: "Três partes da visão",
    parts: [
      {
        title: "Uma referência nascida na Amazônia",
        text: "Belém, no Pará, é a base da IRTC. A origem faz parte da identidade e acompanha o trabalho com equipes de diferentes lugares.",
      },
      {
        title: "Acessível a empresas de diferentes portes",
        text: "Cloud, software e IA não deveriam ser assunto só de empresa grande. Queremos explicar as escolhas em linguagem simples e começar por uma primeira entrega que caiba na realidade de cada cliente.",
      },
      {
        title: "Relações que sustentam o avanço",
        text: "O crescimento se apoia em capacidade de entrega, conhecimento compartilhado e confiança construída em projetos reais, ao longo do tempo.",
      },
    ],
    storyTag: "Imagem inventada para ilustrar",
    storyTitle: "O rio e o próximo passo",
    story: [
      "Em Belém, o rio faz parte do dia a dia. Ele não tem pressa, mas chega longe porque nunca para de seguir.",
      "Engenharia boa se parece com isso. Um sistema nasce pequeno, ligado ao que a empresa faz hoje, e ganha alcance conforme a operação cresce.",
      "Pense numa empresa pequena que sempre achou que IA era coisa de gente grande. Com uma conversa franca, um primeiro passo possível e alguém que continua por perto, ela descobre que o assunto cabe na sua realidade.",
      "É para esse tipo de caminho que a IRTC quer ser referência: o de quem começou aqui e leva engenharia que funciona para o desafio de outra pessoa.",
    ],
    signature: "Da Amazônia para o seu próximo desafio.",
    relatedTitle: "Continue conhecendo a IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Vision",
    eyebrow: "IRTC vision",
    title: "Where IRTC wants to get to",
    intro:
      "An engineering company that started in the Amazon and wants to be remembered for what it delivers, for its clarity and for staying close along the way.",
    horizonAlt:
      "Illustration of a river at dusk, with a low sun on the horizon and bands of water in green and terracotta tones.",
    partsTitle: "Three parts of the vision",
    parts: [
      {
        title: "A reference born in the Amazon",
        text: "Belém, in Pará, is IRTC's base. The origin is part of the identity and goes along with the work with teams from different places.",
      },
      {
        title: "Accessible to companies of different sizes",
        text: "Cloud, software and AI should not be a topic for large companies only. We want to explain choices in plain language and start with a first delivery that fits each client's reality.",
      },
      {
        title: "Relationships that sustain progress",
        text: "Growth rests on delivery capacity, shared knowledge and trust built in real projects, over time.",
      },
    ],
    storyTag: "Invented image for illustration",
    storyTitle: "The river and the next step",
    story: [
      "In Belém, the river is part of everyday life. It is in no hurry, but it gets far because it never stops moving.",
      "Good engineering looks like that. A system starts small, tied to what the company does today, and gains reach as the operation grows.",
      "Think of a small company that always believed AI was for big players. With a frank conversation, a possible first step and someone who stays close, it finds out the subject fits its reality.",
      "That is the kind of path IRTC wants to be a reference for: someone who started here and brings engineering that works to another person's challenge.",
    ],
    signature: "From the Amazon to your next challenge.",
    relatedTitle: "Keep getting to know IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Visión",
    eyebrow: "Visión de IRTC",
    title: "Adónde quiere llegar IRTC",
    intro:
      "Una empresa de ingeniería que empezó en la Amazonía y quiere ser recordada por lo que entrega, por su claridad y por la compañía a lo largo del camino.",
    horizonAlt:
      "Ilustración de un río al atardecer, con el sol bajo en el horizonte y franjas de agua en tonos de verde y terracota.",
    partsTitle: "Tres partes de la visión",
    parts: [
      {
        title: "Una referencia nacida en la Amazonía",
        text: "Belém, en Pará, es la base de IRTC. El origen es parte de la identidad y acompaña el trabajo con equipos de distintos lugares.",
      },
      {
        title: "Accesible a empresas de distintos tamaños",
        text: "Cloud, software e IA no deberían ser tema solo de empresas grandes. Queremos explicar las decisiones en lenguaje simple y empezar por una primera entrega que quepa en la realidad de cada cliente.",
      },
      {
        title: "Relaciones que sostienen el avance",
        text: "El crecimiento se apoya en capacidad de entrega, conocimiento compartido y confianza construida en proyectos reales, a lo largo del tiempo.",
      },
    ],
    storyTag: "Imagen inventada para ilustrar",
    storyTitle: "El río y el próximo paso",
    story: [
      "En Belém, el río es parte del día a día. No tiene prisa, pero llega lejos porque nunca deja de avanzar.",
      "La buena ingeniería se parece a eso. Un sistema nace pequeño, ligado a lo que la empresa hace hoy, y gana alcance a medida que la operación crece.",
      "Piensa en una empresa pequeña que siempre creyó que la IA era cosa de grandes. Con una conversación franca, un primer paso posible y alguien que se queda cerca, descubre que el tema cabe en su realidad.",
      "Para ese tipo de camino quiere ser referencia IRTC: el de quien empezó aquí y lleva ingeniería que funciona al desafío de otra persona.",
    ],
    signature: "De la Amazonia a tu próximo desafío.",
    relatedTitle: "Sigue conociendo IRTC",
  },
};

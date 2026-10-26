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
    title: "Como o cliente acompanha o trabalho",
    intro:
      "Escopo legível, decisões registradas e evidências de entrega permitem avaliar o projeto durante sua execução. Iago conduz o trabalho e a comunicação com o cliente.",
    storyTag: "CRITÉRIOS DE TRABALHO",
    storyTitle: "O que deve ficar registrado",
    story: [
      "Antes da execução, o problema, o responsável do cliente e os critérios de aceite formam a referência do projeto.",
      "Durante o trabalho, demonstrações e registros de teste mostram o que está pronto. Riscos, dependências e alterações de escopo recebem atualização explícita.",
      "No encerramento, o cliente recebe a documentação do escopo entregue, as pendências e as condições acordadas para operação e continuidade.",
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
    aiTitle: "IA com responsabilidade definida",
    aiIntro:
      "Iago executa e revisa as funções da operação. O uso de IA é definido por tarefa, acesso e necessidade de revisão.",
    ai: [
      {
        title: "Uso delimitado",
        text: "Ferramentas de IA podem apoiar análise, desenvolvimento e documentação. Cada uso exige conferência do resultado e cuidado com os dados.",
      },
      {
        title: "Responsável identificado",
        text: "Iago responde pelos compromissos comerciais e pelas decisões técnicas. Mudanças em produção dependem do escopo e das autorizações do cliente.",
      },
      {
        title: "Iris no atendimento inicial",
        text: "A Iris organiza o contexto do visitante em um rascunho. O visitante revisa antes do envio e Iago analisa o próximo passo.",
      },
    ],
    relatedTitle: "Continue conhecendo a IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Culture",
    eyebrow: "IRTC culture",
    title: "How clients follow the work",
    intro:
      "Readable scope, recorded decisions and delivery evidence let you assess the project as it progresses. Iago leads the work and communication with the client.",
    storyTag: "WORKING AGREEMENTS",
    storyTitle: "What should be documented",
    story: [
      "Before delivery begins, the problem, the client’s owner and acceptance criteria establish the project baseline.",
      "During delivery, demos and test records show what is ready. Risks, dependencies and scope changes receive explicit updates.",
      "At handover, the client receives documentation for the delivered scope, open issues and agreed terms for operation and continuity.",
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
    aiTitle: "AI with clear accountability",
    aiIntro:
      "Iago carries out and reviews the business’s operational functions. AI use is defined by task, access and review requirements.",
    ai: [
      {
        title: "Defined use",
        text: "AI tools can support analysis, development and documentation. Each use requires output review and care with data.",
      },
      {
        title: "Named accountability",
        text: "Iago is accountable for commercial commitments and technical decisions. Production changes depend on scope and client authorization.",
      },
      {
        title: "Iris for initial enquiries",
        text: "Iris organizes the visitor’s context into a draft. The visitor reviews it before sending, and Iago considers the next step.",
      },
    ],
    relatedTitle: "Keep getting to know IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Cultura",
    eyebrow: "Cultura de IRTC",
    title: "Cómo el cliente sigue el trabajo",
    intro:
      "Un alcance claro, decisiones registradas y evidencias de entrega permiten evaluar el proyecto durante su ejecución. Iago conduce el trabajo y la comunicación con el cliente.",
    storyTag: "CRITERIOS DE TRABAJO",
    storyTitle: "Qué debe quedar registrado",
    story: [
      "Antes de la ejecución, el problema, el responsable del cliente y los criterios de aceptación establecen la referencia del proyecto.",
      "Durante el trabajo, las demostraciones y los registros de pruebas muestran qué está listo. Los riesgos, dependencias y cambios de alcance reciben actualizaciones explícitas.",
      "En el cierre, el cliente recibe la documentación del alcance entregado, los pendientes y las condiciones acordadas de operación y continuidad.",
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
    aiTitle: "IA con responsabilidad definida",
    aiIntro:
      "Iago ejecuta y revisa las funciones de la operación. El uso de IA se define por tarea, acceso y necesidad de revisión.",
    ai: [
      {
        title: "Uso delimitado",
        text: "Las herramientas de IA pueden apoyar el análisis, desarrollo y documentación. Cada uso requiere revisión del resultado y cuidado con los datos.",
      },
      {
        title: "Responsable identificado",
        text: "Iago responde por los compromisos comerciales y las decisiones técnicas. Los cambios en producción dependen del alcance y de las autorizaciones del cliente.",
      },
      {
        title: "Iris en el contacto inicial",
        text: "Iris organiza el contexto del visitante en un borrador. El visitante lo revisa antes de enviarlo e Iago analiza el siguiente paso.",
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
    storyTag: "AVALIAÇÃO DE RESULTADO",
    storyTitle: "Como verificar se o trabalho fez diferença",
    story: [
      "O projeto começa com uma referência: tempo de execução de uma tarefa, erros, custo do ambiente ou outro indicador relevante para o problema.",
      "Cliente e IRTC definem a meta, a fonte de dados e o período de avaliação. A entrega técnica é conferida por testes e critérios de aceite.",
      "O resultado observado é comparado à referência inicial. A avaliação registra também limitações, efeitos externos e custos de operação para orientar a decisão de continuar, ajustar ou encerrar.",
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
    storyTag: "OUTCOME EVALUATION",
    storyTitle: "How to assess whether the work made a difference",
    story: [
      "The project starts with a baseline: task completion time, errors, infrastructure cost or another indicator relevant to the problem.",
      "The client and IRTC define the target, data source and evaluation period. Tests and acceptance criteria verify the technical delivery.",
      "Observed results are compared with the baseline. The assessment also records limitations, external factors and operating costs to inform whether to continue, adjust or stop.",
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
    storyTag: "EVALUACIÓN DE RESULTADOS",
    storyTitle: "Cómo evaluar si el trabajo hizo una diferencia",
    story: [
      "El proyecto empieza con una referencia: tiempo de una tarea, errores, costo del entorno u otro indicador relevante para el problema.",
      "El cliente e IRTC definen la meta, la fuente de datos y el período de evaluación. Las pruebas y los criterios de aceptación verifican la entrega técnica.",
      "El resultado observado se compara con la referencia inicial. La evaluación también registra limitaciones, factores externos y costos de operación para decidir si continuar, ajustar o cerrar.",
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
    storyTag: "DIREÇÃO DE CRESCIMENTO",
    storyTitle: "Crescer com evidência e capacidade",
    story: [
      "A visão da IRTC orienta o desenvolvimento da empresa. A capacidade de assumir novos escopos deve acompanhar a experiência demonstrada, a disponibilidade e os requisitos de cada cliente.",
      "O avanço será avaliado por entregas aceitas, resultados documentados e condições sustentáveis de operação. Cases e credenciais só serão publicados com evidência, atribuição e autorização.",
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
    storyTag: "GROWTH DIRECTION",
    storyTitle: "Grow with evidence and capacity",
    story: [
      "IRTC’s vision guides the company’s development. Capacity to take on new scopes should follow demonstrated experience, availability and each client’s requirements.",
      "Progress will be assessed through accepted deliverables, documented results and sustainable operations. Case studies and credentials will be published only with evidence, attribution and authorization.",
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
    storyTag: "DIRECCIÓN DE CRECIMIENTO",
    storyTitle: "Crecer con evidencia y capacidad",
    story: [
      "La visión de IRTC orienta el desarrollo de la empresa. La capacidad de asumir nuevos alcances debe acompañar la experiencia demostrada, la disponibilidad y los requisitos de cada cliente.",
      "El avance se evaluará mediante entregas aceptadas, resultados documentados y condiciones sostenibles de operación. Los casos y credenciales solo se publicarán con evidencia, atribución y autorización.",
    ],
    signature: "De la Amazonia a tu próximo desafío.",
    relatedTitle: "Sigue conociendo IRTC",
  },
};

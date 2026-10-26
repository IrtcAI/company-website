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
    title: "Como você acompanha o trabalho",
    intro:
      "Escopo claro, decisões registradas e entregas verificáveis. Iago conduz o trabalho e a comunicação com você.",
    storyTag: "CRITÉRIOS DE TRABALHO",
    storyTitle: "O que deve ficar registrado",
    story: [
      "Antes de começar, registramos o problema, o responsável do cliente e o aceite.",
      "Durante a execução, mostramos entregas e testes e atualizamos riscos e mudanças.",
      "No encerramento, entregamos documentação, pendências e condições de continuidade.",
    ],
    practicesTitle: "Cinco práticas do dia a dia",
    practices: [
      {
        title: "Entender antes de construir",
        text: "Entendemos o impacto e as restrições para definir uma primeira entrega viável.",
        line: "Antes da solução, a pergunta.",
      },
      {
        title: "Entregar em ciclos verificáveis",
        text: "Mostramos o que está pronto e revisamos riscos e prioridades na cadência combinada.",
        line: "Mostrar o que está pronto.",
      },
      {
        title: "Registrar e assumir as escolhas",
        text: "Registramos contexto, efeitos e responsáveis. Mudanças de condições exigem revisão dos compromissos.",
        line: "Toda escolha tem dono.",
      },
      {
        title: "Tratar falhas com franqueza",
        text: "Contemos o impacto, comunicamos a falha e registramos causas, correções e acompanhamento.",
        line: "Avisar cedo, corrigir junto.",
      },
      {
        title: "Manter um ritmo sustentável",
        text: "Aplicamos os aprendizados e ajustamos escopo e capacidade para sustentar a qualidade.",
        line: "Um ritmo que dura.",
      },
    ],
    valuesTitle: "Os valores por trás das práticas",
    valuesText: "Os valores orientam as decisões e a forma de trabalhar.",
    valuesLink: "Ver os valores na página Sobre",
    aiTitle: "IA com responsabilidade definida",
    aiIntro:
      "Iago responde pela operação. Cada uso de IA tem tarefa, acesso e revisão definidos.",
    ai: [
      {
        title: "Uso delimitado",
        text: "IA apoia análise, código e documentação, com conferência do resultado e cuidado com os dados.",
      },
      {
        title: "Responsável identificado",
        text: "Iago assume os compromissos. Mudanças em produção exigem escopo e autorização do cliente.",
      },
      {
        title: "Iris no atendimento inicial",
        text: "A Iris organiza o rascunho. Você revisa antes do envio; Iago analisa o próximo passo.",
      },
    ],
    relatedTitle: "Continue conhecendo a IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Culture",
    eyebrow: "IRTC culture",
    title: "How you follow the work",
    intro:
      "Clear scope, recorded decisions and verifiable deliverables. Iago leads the work and keeps you informed.",
    storyTag: "WORKING AGREEMENTS",
    storyTitle: "What should be documented",
    story: [
      "Before starting, we record the problem, client owner and acceptance criteria.",
      "During delivery, we show progress and tests and update risks and changes.",
      "At handover, we provide documentation, open items and ongoing support terms.",
    ],
    practicesTitle: "Five everyday practices",
    practices: [
      {
        title: "Understand before building",
        text: "We understand impact and constraints to define a feasible first delivery.",
        line: "Before the solution, the question.",
      },
      {
        title: "Deliver in verifiable cycles",
        text: "We show completed work and review risks and priorities at an agreed cadence.",
        line: "Show what is ready.",
      },
      {
        title: "Record and own the choices",
        text: "We record context, effects and owners. Changed conditions require reviewing commitments.",
        line: "Every choice has an owner.",
      },
      {
        title: "Handle failures with candor",
        text: "We contain the impact, communicate the failure and record causes, fixes and follow-up.",
        line: "Speak up early, fix it together.",
      },
      {
        title: "Keep a sustainable pace",
        text: "We apply lessons learned and adjust scope and capacity to sustain quality.",
        line: "A pace that lasts.",
      },
    ],
    valuesTitle: "The values behind the practices",
    valuesText: "Our values guide decisions and how we work.",
    valuesLink: "See the values on the About page",
    aiTitle: "AI with clear accountability",
    aiIntro:
      "Iago is responsible for operations. Each AI use has a defined task, access and review.",
    ai: [
      {
        title: "Defined use",
        text: "AI supports analysis, code and documentation, with output checks and careful data handling.",
      },
      {
        title: "Named accountability",
        text: "Iago owns the commitments. Production changes require agreed scope and client authorization.",
      },
      {
        title: "Iris for initial enquiries",
        text: "Iris organizes the draft. You review it before sending; Iago assesses the next step.",
      },
    ],
    relatedTitle: "Keep getting to know IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Cultura",
    eyebrow: "Cultura de IRTC",
    title: "Cómo sigues el trabajo",
    intro:
      "Alcance claro, decisiones registradas y entregas verificables. Iago dirige el trabajo y mantiene la comunicación contigo.",
    storyTag: "CRITERIOS DE TRABAJO",
    storyTitle: "Qué debe quedar registrado",
    story: [
      "Antes de empezar, registramos el problema, el responsable del cliente y la aceptación.",
      "Durante la ejecución, mostramos entregas y pruebas y actualizamos riesgos y cambios.",
      "Al cierre, entregamos documentación, pendientes y condiciones de continuidad.",
    ],
    practicesTitle: "Cinco prácticas del día a día",
    practices: [
      {
        title: "Entender antes de construir",
        text: "Entendemos el impacto y las restricciones para definir una primera entrega viable.",
        line: "Antes de la solución, la pregunta.",
      },
      {
        title: "Entregar en ciclos verificables",
        text: "Mostramos lo que está listo y revisamos riesgos y prioridades con la frecuencia acordada.",
        line: "Mostrar lo que está listo.",
      },
      {
        title: "Registrar y asumir las decisiones",
        text: "Registramos contexto, efectos y responsables. Los cambios de condiciones requieren revisar los compromisos.",
        line: "Toda decisión tiene dueño.",
      },
      {
        title: "Tratar los fallos con franqueza",
        text: "Contenemos el impacto, comunicamos el fallo y registramos causas, correcciones y seguimiento.",
        line: "Avisar temprano, corregir juntos.",
      },
      {
        title: "Mantener un ritmo sostenible",
        text: "Aplicamos lo aprendido y ajustamos alcance y capacidad para sostener la calidad.",
        line: "Un ritmo que dura.",
      },
    ],
    valuesTitle: "Los valores detrás de las prácticas",
    valuesText: "Los valores orientan las decisiones y la forma de trabajar.",
    valuesLink: "Ver los valores en la página Nosotros",
    aiTitle: "IA con responsabilidad definida",
    aiIntro:
      "Iago responde por la operación. Cada uso de IA tiene tarea, acceso y revisión definidos.",
    ai: [
      {
        title: "Uso delimitado",
        text: "La IA apoya análisis, código y documentación, con revisión del resultado y cuidado de los datos.",
      },
      {
        title: "Responsable identificado",
        text: "Iago asume los compromisos. Los cambios en producción requieren alcance y autorización del cliente.",
      },
      {
        title: "Iris en el contacto inicial",
        text: "Iris organiza el borrador. Lo revisas antes de enviarlo; Iago evalúa el siguiente paso.",
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
    title: "Por que a IRTC existe",
    intro:
      "Resolver problemas com sistemas que as pessoas conseguem usar e manter.",
    purposeLabel: "Propósito",
    verbsTitle: "Como colocamos a missão em prática",
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
    commitmentsTitle: "Compromissos da entrega",
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
      "O escopo define etapas, responsáveis e aceite. Cada entrega orienta a próxima decisão.",
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
    storyTitle: "Como avaliamos o resultado",
    story: [
      "Registramos a referência atual: tempo, erros, custos ou outro indicador do problema.",
      "Com o cliente, definimos meta, dados e período de avaliação. Testes verificam a entrega técnica.",
      "Comparamos o resultado à referência, considerando limitações e custos, para decidir se continuamos, ajustamos ou encerramos.",
    ],
    relatedTitle: "Continue conhecendo a IRTC",
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Mission",
    eyebrow: "IRTC mission",
    title: "Why IRTC exists",
    intro: "Solve problems with systems people can use and maintain.",
    purposeLabel: "Purpose",
    verbsTitle: "How we put our mission into practice",
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
    commitmentsTitle: "Delivery commitments",
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
      "The scope defines stages, owners and acceptance criteria. Each delivery informs the next decision.",
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
    storyTitle: "How we assess outcomes",
    story: [
      "We record a baseline: time, errors, costs or another indicator of the problem.",
      "With the client, we define targets, data and the evaluation period. Tests verify technical delivery.",
      "We compare outcomes with the baseline, considering limitations and costs, to decide whether to continue, adjust or stop.",
    ],
    relatedTitle: "Keep getting to know IRTC",
  },
  es: {
    breadcrumbLabel: "Ruta de navegación",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Misión",
    eyebrow: "Misión de IRTC",
    title: "Por qué existe IRTC",
    intro:
      "Resolver problemas con sistemas que las personas puedan usar y mantener.",
    purposeLabel: "Propósito",
    verbsTitle: "Cómo ponemos la misión en práctica",
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
    commitmentsTitle: "Compromisos de entrega",
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
      "El alcance define etapas, responsables y aceptación. Cada entrega orienta la siguiente decisión.",
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
    storyTitle: "Cómo evaluamos el resultado",
    story: [
      "Registramos la referencia actual: tiempo, errores, costos u otro indicador del problema.",
      "Con el cliente, definimos metas, datos y período de evaluación. Las pruebas verifican la entrega técnica.",
      "Comparamos el resultado con la referencia, considerando límites y costos, para decidir si continuar, ajustar o cerrar.",
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
      "Nascida na Amazônia, a IRTC busca ser reconhecida pela entrega, pela clareza e por relações duradouras.",
    horizonAlt:
      "Ilustração de um rio ao entardecer, com o sol baixo no horizonte e faixas de água em tons de verde e terracota.",
    partsTitle: "Três partes da visão",
    parts: [
      {
        title: "Uma referência nascida na Amazônia",
        text: "Belém é nossa base. A origem amazônica acompanha o trabalho com equipes de diferentes lugares.",
      },
      {
        title: "Acessível a empresas de diferentes portes",
        text: "Explicar escolhas em linguagem simples e propor entregas compatíveis com a realidade de cada cliente.",
      },
      {
        title: "Relações que sustentam o avanço",
        text: "Crescer com capacidade de entrega, conhecimento compartilhado e confiança construída no trabalho.",
      },
    ],
    storyTag: "DIREÇÃO DE CRESCIMENTO",
    storyTitle: "Crescer com evidência e capacidade",
    story: [
      "Novos projetos dependem de experiência demonstrada, disponibilidade e requisitos do cliente.",
      "Avaliaremos o avanço por entregas aceitas e resultados documentados. Cases e credenciais exigem evidência, atribuição e autorização.",
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
      "Born in the Amazon, IRTC aims to be recognized for its delivery, clarity and lasting relationships.",
    horizonAlt:
      "Illustration of a river at dusk, with a low sun on the horizon and bands of water in green and terracotta tones.",
    partsTitle: "Three parts of the vision",
    parts: [
      {
        title: "A reference born in the Amazon",
        text: "Belém is our base. Our Amazonian roots travel with our work across locations.",
      },
      {
        title: "Accessible to companies of different sizes",
        text: "Explain choices in plain language and propose deliverables that fit each client’s situation.",
      },
      {
        title: "Relationships that sustain progress",
        text: "Grow through delivery capacity, shared knowledge and trust earned through work.",
      },
    ],
    storyTag: "GROWTH DIRECTION",
    storyTitle: "Grow with evidence and capacity",
    story: [
      "New projects depend on demonstrated experience, availability and client requirements.",
      "We will assess progress through accepted deliverables and documented outcomes. Cases and credentials require evidence, attribution and permission.",
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
      "Nacida en la Amazonía, IRTC busca ser reconocida por sus entregas, claridad y relaciones duraderas.",
    horizonAlt:
      "Ilustración de un río al atardecer, con el sol bajo en el horizonte y franjas de agua en tonos de verde y terracota.",
    partsTitle: "Tres partes de la visión",
    parts: [
      {
        title: "Una referencia nacida en la Amazonía",
        text: "Belém es nuestra base. El origen amazónico acompaña nuestro trabajo con equipos de distintos lugares.",
      },
      {
        title: "Accesible a empresas de distintos tamaños",
        text: "Explicar decisiones con lenguaje claro y proponer entregas acordes con la realidad de cada cliente.",
      },
      {
        title: "Relaciones que sostienen el avance",
        text: "Crecer con capacidad de entrega, conocimiento compartido y confianza construida con el trabajo.",
      },
    ],
    storyTag: "DIRECCIÓN DE CRECIMIENTO",
    storyTitle: "Crecer con evidencia y capacidad",
    story: [
      "Los nuevos proyectos dependen de experiencia demostrada, disponibilidad y requisitos del cliente.",
      "Evaluaremos el avance por entregas aceptadas y resultados documentados. Los casos y credenciales requieren evidencia, atribución y autorización.",
    ],
    signature: "De la Amazonia a tu próximo desafío.",
    relatedTitle: "Sigue conociendo IRTC",
  },
};

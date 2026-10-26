import type { Locale } from "../content";
import type { ServiceId } from "../services";

type EngagementCopy = {
  title: string;
  intro: string;
  deliveryLabel: string;
  decisionLabel: string;
  link: string;
  items: {
    title: string;
    problem: string;
    delivery: string;
    decision: string;
    service: ServiceId;
  }[];
};

export const engagementCopy: Record<Locale, EngagementCopy> = {
  "pt-BR": {
    title: "Por onde começar",
    intro:
      "Avaliamos aderência, capacidade e acessos antes da proposta. Entregas, investimento e aceite são definidos em contrato.",
    deliveryLabel: "Possível entrega",
    decisionLabel: "Decisão que apoia",
    link: "Conheça o escopo",
    items: [
      {
        title: "Integrar um processo",
        problem: "Informações são copiadas entre sistemas.",
        delivery: "Integração delimitada, tratamento de falhas e testes.",
        decision: "Verificar a redução de etapas manuais e retrabalho.",
        service: "integrations",
      },
      {
        title: "Avaliar cloud e modernização",
        problem: "Custos e incidentes dificultam decisões sobre o ambiente.",
        delivery: "Diagnóstico e plano priorizado, com riscos e estimativas.",
        decision: "Escolher o que mudar primeiro.",
        service: "cloud",
      },
      {
        title: "Modernizar um componente",
        problem: "Um componente limita mudanças ou exige manutenção frequente.",
        delivery: "Incremento testado, plano de reversão e documentação.",
        decision: "Avaliar a primeira etapa antes de ampliar o escopo.",
        service: "modernization",
      },
      {
        title: "Validar IA em uma tarefa",
        problem: "Falta evidência sobre a qualidade e o custo da IA.",
        delivery: "Protótipo e avaliação de qualidade, custo e revisão humana.",
        decision: "Avançar, ajustar ou encerrar com base nos resultados.",
        service: "applied-ai",
      },
    ],
  },
  en: {
    title: "Where to start",
    intro:
      "We assess fit, capacity and access before proposing work. Deliverables, investment and acceptance are agreed in the contract.",
    deliveryLabel: "Possible deliverables",
    decisionLabel: "Decision it supports",
    link: "Explore the scope",
    items: [
      {
        title: "Integrate a process",
        problem: "Information is copied between systems.",
        delivery: "Scoped integration, error handling and tests.",
        decision: "Check whether manual steps and rework decrease.",
        service: "integrations",
      },
      {
        title: "Assess cloud and modernization",
        problem: "Costs and incidents complicate infrastructure decisions.",
        delivery: "Assessment and prioritized plan, with risks and estimates.",
        decision: "Choose what to change first.",
        service: "cloud",
      },
      {
        title: "Modernize a component",
        problem: "A component limits changes or needs frequent maintenance.",
        delivery: "Tested increment, rollback plan and documentation.",
        decision: "Assess the first stage before expanding the scope.",
        service: "modernization",
      },
      {
        title: "Validate AI on a task",
        problem: "Evidence of AI quality and cost is missing.",
        delivery: "Prototype and assessment of quality, cost and human review.",
        decision: "Proceed, adjust or stop based on results.",
        service: "applied-ai",
      },
    ],
  },
  es: {
    title: "Por dónde empezar",
    intro:
      "Evaluamos encaje, capacidad y accesos antes de la propuesta. El contrato define entregas, inversión y aceptación.",
    deliveryLabel: "Posible entrega",
    decisionLabel: "Decisión que apoya",
    link: "Conoce el alcance",
    items: [
      {
        title: "Integrar un proceso",
        problem: "Se copia información entre sistemas.",
        delivery: "Integración delimitada, gestión de fallos y pruebas.",
        decision: "Verificar la reducción de tareas manuales y retrabajo.",
        service: "integrations",
      },
      {
        title: "Evaluar cloud y modernización",
        problem:
          "Los costos e incidentes dificultan las decisiones de infraestructura.",
        delivery: "Diagnóstico y plan priorizado, con riesgos y estimaciones.",
        decision: "Elegir qué cambiar primero.",
        service: "cloud",
      },
      {
        title: "Modernizar un componente",
        problem:
          "Un componente limita los cambios o exige mantenimiento frecuente.",
        delivery: "Incremento probado, plan de reversión y documentación.",
        decision: "Evaluar la primera etapa antes de ampliar el alcance.",
        service: "modernization",
      },
      {
        title: "Validar IA en una tarea",
        problem: "Falta evidencia sobre la calidad y el costo de la IA.",
        delivery: "Prototipo y evaluación de calidad, costo y revisión humana.",
        decision: "Avanzar, ajustar o cerrar según los resultados.",
        service: "applied-ai",
      },
    ],
  },
};

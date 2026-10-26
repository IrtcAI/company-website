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
    title: "Um primeiro escopo para uma decisão concreta",
    intro:
      "Estas são formas de começar a conversa. Antes da proposta, avaliamos aderência, capacidade, dados e acessos necessários. O contrato define entregáveis, investimento e critérios de aceite.",
    deliveryLabel: "Entrega a definir",
    decisionLabel: "Decisão que apoia",
    link: "Conheça o escopo",
    items: [
      {
        title: "Integrar um processo",
        problem:
          "Pedidos, pagamentos ou informações precisam ser copiados entre sistemas.",
        delivery:
          "Mapa do fluxo, integração delimitada, tratamento de falhas e testes de aceite.",
        decision:
          "Verificar se a mudança reduz etapas manuais e retrabalho no fluxo escolhido.",
        service: "integrations",
      },
      {
        title: "Avaliar cloud e modernização",
        problem:
          "Custos, incidentes ou dependências dificultam a decisão sobre o ambiente.",
        delivery:
          "Diagnóstico, alternativas de arquitetura e plano priorizado com riscos e estimativas.",
        decision:
          "Escolher o que mudar primeiro e o que precisa de investigação adicional.",
        service: "cloud",
      },
      {
        title: "Modernizar um componente",
        problem:
          "Uma parte do sistema limita mudanças ou exige manutenção frequente.",
        delivery:
          "Incremento delimitado, testes de regressão, plano de reversão e documentação.",
        decision:
          "Avaliar o resultado da primeira etapa antes de ampliar a modernização.",
        service: "modernization",
      },
      {
        title: "Validar IA em uma tarefa",
        problem:
          "Há uma tarefa repetitiva, mas ainda faltam evidências sobre qualidade e custo da IA.",
        delivery:
          "Protótipo, conjunto de avaliação e relatório de qualidade, custo e revisão humana.",
        decision:
          "Avançar, ajustar ou interromper o experimento com base nos resultados.",
        service: "applied-ai",
      },
    ],
  },
  en: {
    title: "A first scope for a concrete decision",
    intro:
      "These are ways to start the conversation. Before a proposal, we assess fit, capacity, data and access requirements. The contract defines deliverables, investment and acceptance criteria.",
    deliveryLabel: "Delivery to define",
    decisionLabel: "Decision it supports",
    link: "Explore the scope",
    items: [
      {
        title: "Integrate a process",
        problem:
          "Orders, payments or information must be copied between systems.",
        delivery:
          "Workflow map, bounded integration, failure handling and acceptance tests.",
        decision:
          "Check whether the change reduces manual steps and rework in the selected workflow.",
        service: "integrations",
      },
      {
        title: "Assess cloud and modernization",
        problem:
          "Costs, incidents or dependencies make infrastructure decisions difficult.",
        delivery:
          "Assessment, architecture alternatives and a prioritized plan with risks and estimates.",
        decision:
          "Choose what to change first and what requires further investigation.",
        service: "cloud",
      },
      {
        title: "Modernize a component",
        problem:
          "One part of the system limits changes or needs frequent maintenance.",
        delivery:
          "Bounded increment, regression tests, rollback plan and documentation.",
        decision:
          "Evaluate the first stage before expanding the modernization effort.",
        service: "modernization",
      },
      {
        title: "Validate AI on a task",
        problem:
          "A task is repetitive, but evidence on AI quality and cost is still missing.",
        delivery:
          "Prototype, evaluation set and a report on quality, cost and human review.",
        decision:
          "Proceed, adjust or stop the experiment based on its results.",
        service: "applied-ai",
      },
    ],
  },
  es: {
    title: "Un primer alcance para una decisión concreta",
    intro:
      "Estas son formas de iniciar la conversación. Antes de la propuesta, evaluamos encaje, capacidad, datos y accesos necesarios. El contrato define entregables, inversión y criterios de aceptación.",
    deliveryLabel: "Entrega por definir",
    decisionLabel: "Decisión que apoya",
    link: "Conoce el alcance",
    items: [
      {
        title: "Integrar un proceso",
        problem: "Los pedidos, pagos o datos deben copiarse entre sistemas.",
        delivery:
          "Mapa del flujo, integración delimitada, tratamiento de fallas y pruebas de aceptación.",
        decision:
          "Verificar si el cambio reduce pasos manuales y retrabajo en el flujo elegido.",
        service: "integrations",
      },
      {
        title: "Evaluar cloud y modernización",
        problem:
          "Los costos, incidentes o dependencias dificultan la decisión sobre el entorno.",
        delivery:
          "Diagnóstico, alternativas de arquitectura y plan priorizado con riesgos y estimaciones.",
        decision:
          "Elegir qué cambiar primero y qué requiere más investigación.",
        service: "cloud",
      },
      {
        title: "Modernizar un componente",
        problem:
          "Una parte del sistema limita los cambios o requiere mantenimiento frecuente.",
        delivery:
          "Incremento delimitado, pruebas de regresión, plan de reversión y documentación.",
        decision:
          "Evaluar el resultado de la primera etapa antes de ampliar la modernización.",
        service: "modernization",
      },
      {
        title: "Validar IA en una tarea",
        problem:
          "Hay una tarea repetitiva, pero faltan evidencias sobre la calidad y el costo de la IA.",
        delivery:
          "Prototipo, conjunto de evaluación e informe de calidad, costo y revisión humana.",
        decision:
          "Avanzar, ajustar o detener el experimento según sus resultados.",
        service: "applied-ai",
      },
    ],
  },
};

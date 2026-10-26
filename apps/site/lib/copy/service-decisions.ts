import type { Locale } from "../content";
import type { ServiceId } from "../services";

type ServiceDecision = {
  title: string;
  action: string;
  points: { title: string; text: string }[];
};

export const serviceDecisionCopy: Record<
  Locale,
  Partial<Record<ServiceId, ServiceDecision>>
> = {
  "pt-BR": {
    cloud: {
      title: "Um diagnóstico para decidir o próximo investimento",
      action: "Conversar sobre AWS",
      points: [
        {
          title: "Delimitar o ambiente",
          text: "Delimitamos a aplicação, os custos e as dependências. A avaliação usa acesso de leitura autorizado e registra dados ausentes.",
        },
        {
          title: "Comparar as alternativas",
          text: "Você recebe inventário, riscos e opções de arquitetura, com premissas de custo e esforço para decidir onde investir.",
        },
        {
          title: "Escolher a próxima mudança",
          text: "Decidimos o que manter, otimizar ou migrar. Execução e continuidade têm escopos próprios, sujeitos à capacidade e contratação.",
        },
      ],
    },
    modernization: {
      title: "Um componente antes de uma transformação maior",
      action: "Discutir modernização",
      points: [
        {
          title: "Escolher o limite",
          text: "Escolhemos um componente, suas dependências e as regras que devem continuar funcionando. Confirmamos acesso e capacidade.",
        },
        {
          title: "Preparar a mudança",
          text: "O plano define o incremento, testes de regressão, janela de implantação e critérios para avançar ou reverter.",
        },
        {
          title: "Avaliar antes de ampliar",
          text: "Testes, medições e limitações documentadas orientam a próxima etapa e seu orçamento.",
        },
      ],
    },
    "applied-ai": {
      title: "Uma tarefa, evidências para decidir sobre IA",
      action: "Avaliar IA no meu processo",
      points: [
        {
          title: "Definir a tarefa",
          text: "Delimitamos um fluxo, dados autorizados, critérios de qualidade e ações permitidas antes de propor o protótipo.",
        },
        {
          title: "Comparar com o processo atual",
          text: "Avaliamos erros, custo por tarefa e revisão humana. O relatório registra resultados e limites, inclusive desempenho insuficiente.",
        },
        {
          title: "Decidir sobre produção",
          text: "As evidências orientam avançar, ajustar ou encerrar. Implantação exige avaliação e escopo próprios, além do aceite do protótipo.",
        },
      ],
    },
  },
  en: {
    cloud: {
      title: "An assessment to guide your next investment",
      action: "Discuss AWS",
      points: [
        {
          title: "Define the boundary",
          text: "We define the application, costs and dependencies. Assessment uses authorized read-only access and records missing data.",
        },
        {
          title: "Compare alternatives",
          text: "You receive an inventory, risks and architecture options, with cost and effort assumptions to guide investment.",
        },
        {
          title: "Choose the next change",
          text: "We decide what to keep, optimize or migrate. Execution and ongoing support have their own scopes, subject to capacity and contracting.",
        },
      ],
    },
    modernization: {
      title: "One component before a larger transformation",
      action: "Discuss modernization",
      points: [
        {
          title: "Choose the boundary",
          text: "We select a component, its dependencies and the rules that must keep working. We confirm access and capacity.",
        },
        {
          title: "Prepare the change",
          text: "The plan defines the increment, regression tests, deployment window and criteria for proceeding or rolling back.",
        },
        {
          title: "Evaluate before expanding",
          text: "Documented tests, measurements and limitations guide the next stage and its budget.",
        },
      ],
    },
    "applied-ai": {
      title: "One task, evidence to decide on AI",
      action: "Assess AI for my workflow",
      points: [
        {
          title: "Define the task",
          text: "We define a workflow, authorized data, quality criteria and permitted actions before proposing a prototype.",
        },
        {
          title: "Compare with the current process",
          text: "We assess errors, cost per task and human review. The report records results and limitations, including insufficient performance.",
        },
        {
          title: "Decide on production",
          text: "Evidence informs whether to proceed, adjust or stop. Deployment requires its own assessment and scope beyond prototype acceptance.",
        },
      ],
    },
  },
  es: {
    cloud: {
      title: "Un diagnóstico para decidir la próxima inversión",
      action: "Conversar sobre AWS",
      points: [
        {
          title: "Delimitar el entorno",
          text: "Delimitamos la aplicación, los costos y las dependencias. La evaluación usa acceso de lectura autorizado y registra datos ausentes.",
        },
        {
          title: "Comparar alternativas",
          text: "Recibes inventario, riesgos y opciones de arquitectura, con supuestos de costo y esfuerzo para orientar la inversión.",
        },
        {
          title: "Elegir el próximo cambio",
          text: "Decidimos qué mantener, optimizar o migrar. La ejecución y la continuidad tienen alcances propios, sujetos a capacidad y contratación.",
        },
      ],
    },
    modernization: {
      title: "Un componente antes de una transformación mayor",
      action: "Evaluar modernización",
      points: [
        {
          title: "Elegir el límite",
          text: "Elegimos un componente, sus dependencias y las reglas que deben seguir funcionando. Confirmamos acceso y capacidad.",
        },
        {
          title: "Preparar el cambio",
          text: "El plan define el incremento, pruebas de regresión, ventana de despliegue y criterios para avanzar o revertir.",
        },
        {
          title: "Evaluar antes de ampliar",
          text: "Las pruebas, mediciones y limitaciones documentadas orientan la siguiente etapa y su presupuesto.",
        },
      ],
    },
    "applied-ai": {
      title: "Una tarea, evidencia para decidir sobre IA",
      action: "Evaluar IA en mi proceso",
      points: [
        {
          title: "Definir la tarea",
          text: "Delimitamos un flujo, datos autorizados, criterios de calidad y acciones permitidas antes de proponer el prototipo.",
        },
        {
          title: "Comparar con el proceso actual",
          text: "Evaluamos errores, costo por tarea y revisión humana. El informe registra resultados y límites, incluso desempeño insuficiente.",
        },
        {
          title: "Decidir sobre producción",
          text: "La evidencia orienta avanzar, ajustar o cerrar. El despliegue requiere evaluación y alcance propios, además de aceptar el prototipo.",
        },
      ],
    },
  },
};

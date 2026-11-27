import type { Locale } from "../content";
import type { ServiceId } from "../services";

export type ServiceScope = {
  name: string;
  title: string;
  text: string;
  receives: string[];
  excludes: string[];
  measure: string;
};

export type ServiceScopes = {
  title: string;
  intro: string;
  receivesLabel: string;
  excludesLabel: string;
  measureLabel: string;
  items: ServiceScope[];
};

export const serviceScopeCopy: Record<
  Locale,
  Partial<Record<ServiceId, ServiceScopes>>
> = {
  "pt-BR": {
    cloud: {
      title: "DevOps, CloudOps e FinOps na AWS",
      intro:
        "Cada trabalho começa por uma aplicação ou workload, nos ambientes que combinarmos. Mudança em produção só acontece com janela, sua aprovação e um plano de rollback.",
      receivesLabel: "O que você recebe",
      excludesLabel: "O que fica fora",
      measureLabel: "Como medimos",
      items: [
        {
          name: "DevOps",
          title: "Publicar com testes e voltar atrás com segurança",
          text: "Para quem ainda faz deploy à mão e não tem um jeito confiável de desfazer uma versão ruim.",
          receives: [
            "Pipeline que roda os testes e publica a aplicação acordada",
            "Infraestrutura da aplicação em código, no seu repositório",
            "Rollback ensaiado em ambiente de teste",
            "Documentação para a sua equipe manter o pipeline",
          ],
          excludes: [
            "Outras aplicações, que pedem um escopo próprio",
            "Operar o pipeline depois da entrega sem contrato de continuidade",
          ],
          measure:
            "Quanto tempo um deploy leva e quanto tempo leva para voltar à versão anterior quando algo dá errado.",
        },
        {
          name: "CloudOps",
          title: "Saber que o sistema caiu antes do cliente",
          text: "Instrumentamos um workload para a falha aparecer cedo e a equipe saber o que fazer quando ela acontecer.",
          receives: [
            "Logs e métricas do workload acordado",
            "Alertas que chegam a uma pessoa definida",
            "Roteiro de recuperação testado numa falha simulada",
            "Passagem do conhecimento para quem vai atender os alertas",
          ],
          excludes: [
            "Plantão 24×7 e atendimento a incidentes",
            "Operação contínua, que tem contrato próprio",
          ],
          measure:
            "Em quanto tempo a falha é percebida e resolvida, e quantos alertas realmente pedem uma ação.",
        },
        {
          name: "FinOps",
          title: "Entender para onde vai a conta da AWS",
          text: "Com acesso só de leitura, mostramos onde está o gasto e o que vale atacar primeiro.",
          receives: [
            "Linha de base do gasto atual, com as premissas usadas",
            "Gasto por workload e quanto da conta tem tags",
            "Recomendações em ordem de prioridade, com economia estimada e esforço",
          ],
          excludes: [
            "Garantia de economia",
            "Compra de Savings Plans ou reservas, revenda de AWS e mudanças nos recursos",
          ],
          measure:
            "O gasto por workload antes e depois das ações que você aprovar.",
        },
      ],
    },
  },
  en: {
    cloud: {
      title: "DevOps, CloudOps and FinOps on AWS",
      intro:
        "Each engagement starts with one application or workload, in the environments we agree on. Production changes only happen with a change window, your approval and a rollback plan.",
      receivesLabel: "What you get",
      excludesLabel: "What's not included",
      measureLabel: "How we measure it",
      items: [
        {
          name: "DevOps",
          title: "Release with tests and roll back safely",
          text: "For teams that still deploy by hand and have no reliable way to undo a bad release.",
          receives: [
            "A pipeline that runs the tests and releases the agreed application",
            "The application's infrastructure as code, in your repository",
            "A rollback rehearsed in a test environment",
            "Documentation so your team can maintain the pipeline",
          ],
          excludes: [
            "Other applications, which need their own scope",
            "Running the pipeline after delivery without a continuity contract",
          ],
          measure:
            "How long a deployment takes and how long it takes to return to the previous version when something goes wrong.",
        },
        {
          name: "CloudOps",
          title: "Know the system is down before your customer does",
          text: "We instrument one workload so failures show up early and the team knows what to do when they happen.",
          receives: [
            "Logs and metrics for the agreed workload",
            "Alerts that reach a named person",
            "A recovery runbook tested against a simulated failure",
            "A handover to whoever will respond to the alerts",
          ],
          excludes: [
            "24×7 on-call and incident response",
            "Ongoing operations, which have their own contract",
          ],
          measure:
            "How quickly a failure is noticed and fixed, and how many alerts actually call for action.",
        },
        {
          name: "FinOps",
          title: "Understand where the AWS bill goes",
          text: "With read-only access, we show where the spend is and what is worth tackling first.",
          receives: [
            "A baseline of current spend, with the assumptions used",
            "Spend per workload and how much of the bill is tagged",
            "Recommendations in priority order, with estimated savings and effort",
          ],
          excludes: [
            "Guaranteed savings",
            "Buying Savings Plans or reservations, AWS resale and changes to resources",
          ],
          measure:
            "Spend per workload before and after the actions you approve.",
        },
      ],
    },
  },
  es: {
    cloud: {
      title: "DevOps, CloudOps y FinOps en AWS",
      intro:
        "Cada trabajo empieza por una aplicación o workload, en los entornos que acordemos. Los cambios en producción solo ocurren con ventana, tu aprobación y un plan de rollback.",
      receivesLabel: "Qué recibes",
      excludesLabel: "Qué queda fuera",
      measureLabel: "Cómo lo medimos",
      items: [
        {
          name: "DevOps",
          title: "Publicar con pruebas y volver atrás con seguridad",
          text: "Para quien todavía despliega a mano y no tiene una forma confiable de deshacer una versión con problemas.",
          receives: [
            "Pipeline que ejecuta las pruebas y publica la aplicación acordada",
            "Infraestructura de la aplicación en código, en tu repositorio",
            "Rollback ensayado en un entorno de prueba",
            "Documentación para que tu equipo mantenga el pipeline",
          ],
          excludes: [
            "Otras aplicaciones, que necesitan su propio alcance",
            "Operar el pipeline después de la entrega sin contrato de continuidad",
          ],
          measure:
            "Cuánto tarda un despliegue y cuánto tarda volver a la versión anterior cuando algo sale mal.",
        },
        {
          name: "CloudOps",
          title: "Saber que el sistema se cayó antes que tu cliente",
          text: "Instrumentamos un workload para que la falla aparezca pronto y el equipo sepa qué hacer cuando ocurra.",
          receives: [
            "Logs y métricas del workload acordado",
            "Alertas que llegan a una persona definida",
            "Guía de recuperación probada en una falla simulada",
            "Traspaso a quien va a atender las alertas",
          ],
          excludes: [
            "Guardia 24×7 y atención de incidentes",
            "Operación continua, que tiene contrato propio",
          ],
          measure:
            "En cuánto tiempo se detecta y se resuelve la falla, y cuántas alertas realmente piden una acción.",
        },
        {
          name: "FinOps",
          title: "Entender adónde va la factura de AWS",
          text: "Con acceso de solo lectura, mostramos dónde está el gasto y qué conviene atacar primero.",
          receives: [
            "Línea base del gasto actual, con los supuestos usados",
            "Gasto por workload y cuánto de la factura tiene tags",
            "Recomendaciones en orden de prioridad, con ahorro estimado y esfuerzo",
          ],
          excludes: [
            "Ahorro garantizado",
            "Compra de Savings Plans o reservas, reventa de AWS y cambios en los recursos",
          ],
          measure:
            "El gasto por workload antes y después de las acciones que apruebes.",
        },
      ],
    },
  },
};

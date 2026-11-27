import type { Locale } from "../content";
import type { ServiceId } from "../services";

type UseCaseCopy = {
  label: string;
  title: string;
  intro: string;
  steps: { title: string; text: string }[];
  measure: string;
  note: string;
  link: string;
  service: ServiceId;
};

export const useCaseCopy: Record<Locale, UseCaseCopy> = {
  "pt-BR": {
    label: "Exemplo ilustrativo",
    title: "Como um pedido aprovado chega ao financeiro",
    intro:
      "Este é um exemplo para mostrar como trabalhamos, sem cliente real por trás. Em muitas empresas, alguém copia o pedido aprovado do sistema de vendas para o financeiro, confere à mão e, de vez em quando, lança o mesmo pedido duas vezes.",
    steps: [
      {
        title: "Receber o pedido aprovado",
        text: "A aprovação no sistema de vendas já dispara o fluxo, e ninguém precisa redigitar o pedido.",
      },
      {
        title: "Validar os dados",
        text: "Conferimos cliente, valores e condição de pagamento com as regras que a sua equipe já usa.",
      },
      {
        title: "Registrar no financeiro sem duplicar",
        text: "O pedido entra uma vez só, mesmo que chegue repetido ou que o envio precise ser refeito.",
      },
      {
        title: "Mandar as divergências para revisão",
        text: "Quando algo não bate, o pedido fica parado com o motivo anotado até uma pessoa da sua equipe decidir.",
      },
    ],
    measure:
      "Para saber se funcionou, comparamos antes e depois o tempo de cada pedido até o lançamento, as correções feitas à mão e os pedidos duplicados no financeiro.",
    note: "Regras e integração resolvem esse fluxo. Só usaríamos IA se os pedidos chegassem em documentos com formatos diferentes, e mesmo assim com uma pessoa revisando.",
    link: "Ver integração de sistemas e automação",
    service: "integrations",
  },
  en: {
    label: "Illustrative example",
    title: "How an approved order reaches finance",
    intro:
      "This example shows how we work; there is no real client behind it. In many companies, someone copies each approved order from the sales system into finance, checks it by hand and now and then records the same order twice.",
    steps: [
      {
        title: "Receive the approved order",
        text: "Approval in the sales system starts the flow, so nobody has to retype the order.",
      },
      {
        title: "Validate the data",
        text: "We check the customer, amounts and payment terms against the rules your team already uses.",
      },
      {
        title: "Record it in finance once",
        text: "The order goes in only once, even if it arrives twice or the submission has to be retried.",
      },
      {
        title: "Send mismatches to review",
        text: "When something doesn't match, the order waits with the reason noted until someone on your team decides.",
      },
    ],
    measure:
      "To see whether it worked, we compare before and after the time each order takes to be recorded, the manual corrections and the duplicate orders in finance.",
    note: "Rules and integration solve this flow. We would only use AI if orders arrived as documents in different formats, and even then with a person reviewing.",
    link: "See systems integration and automation",
    service: "integrations",
  },
  es: {
    label: "Ejemplo ilustrativo",
    title: "Cómo un pedido aprobado llega a finanzas",
    intro:
      "Este ejemplo muestra cómo trabajamos y no hay un cliente real detrás. En muchas empresas, alguien copia el pedido aprobado del sistema de ventas a finanzas, lo revisa a mano y, de vez en cuando, registra el mismo pedido dos veces.",
    steps: [
      {
        title: "Recibir el pedido aprobado",
        text: "La aprobación en el sistema de ventas inicia el flujo y nadie tiene que volver a escribir el pedido.",
      },
      {
        title: "Validar los datos",
        text: "Revisamos cliente, valores y condición de pago con las reglas que tu equipo ya usa.",
      },
      {
        title: "Registrar en finanzas una sola vez",
        text: "El pedido entra una sola vez, aunque llegue repetido o haya que reenviarlo.",
      },
      {
        title: "Enviar las diferencias a revisión",
        text: "Cuando algo no coincide, el pedido queda en espera con el motivo anotado hasta que alguien de tu equipo decida.",
      },
    ],
    measure:
      "Para saber si funcionó, comparamos antes y después el tiempo de cada pedido hasta el registro, las correcciones manuales y los pedidos duplicados en finanzas.",
    note: "Reglas e integración resuelven este flujo. Solo usaríamos IA si los pedidos llegaran en documentos con formatos distintos, y aun así con una persona revisando.",
    link: "Ver integración de sistemas y automatización",
    service: "integrations",
  },
};

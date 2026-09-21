import { content, Locale } from "./content";

export const companyKnowledge =
  "IRTC é uma fábrica de software de Belém, Pará, Brasil. Desenvolve SaaS, ERP, CRM, aplicações web/mobile, automações, APIs, integrações, ETL/ELT, RAG e agentes de IA. Tecnologias: Node.js, NestJS, Next.js, React, PostgreSQL, Redis, AWS, Python e Django. Valoriza entregas curtas, qualidade técnica, comunicação clara e suporte próximo. Orçamentos e prazos exigem avaliação humana. Não prometa preços, datas, certificações ou contratos que não estejam nesta base.";

export function compactAnswer(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > 250
    ? `${normalized.slice(0, 247).trimEnd()}...`
    : normalized;
}

export function requestsUnsafeAction(message: string) {
  return /\b(ignore|ignora|system prompt|prompt do sistema|execute|ejecuta|run code|rodar código|terminal|shell|senha|password|contraseña|api key|chave de api)\b/i.test(
    message,
  );
}

export function fallbackAnswer(message: string, locale: Locale) {
  const copy = content[locale].iris;
  if (requestsUnsafeAction(message)) return copy.refusal;
  if (
    /(mvp|ideia|idea|negócio|negocio|business|saas|erp|crm|app|automat|integr)/i.test(
      message,
    )
  )
    return copy.fallback;
  if (
    /(irtc|software|serviço|service|servicio|empresa|company|tecnolog|rag|\bai\b|\bia\b|support|suporte|soporte)/i.test(
      message,
    )
  )
    return copy.about;
  return copy.refusal;
}

export function extractAnswer(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return;
  const result = data as {
    output_text?: unknown;
    output?: { type?: string; content?: { type?: string; text?: string }[] }[];
  };
  if (typeof result.output_text === "string")
    return compactAnswer(result.output_text);
  const answer = result.output
    ?.filter((item) => item.type === "message")
    .flatMap((item) => item.content || [])
    .filter(
      (part) => part.type === "output_text" && typeof part.text === "string",
    )
    .map((part) => part.text)
    .join(" ");
  return answer ? compactAnswer(answer) : undefined;
}

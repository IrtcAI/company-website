import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { POST } from "../app/api/chat/route";
import { content, type Locale } from "../lib/content";
import {
  companyFacts,
  irisInstructions,
  visitorMessage,
} from "../lib/iris-policy";
import { retrieve, type RetrievedChunk } from "../lib/knowledge/search";

type Kind = "fact" | "idea" | "unknown" | "attack";

type EvalCase = {
  id: string;
  locale: Locale;
  question: string;
  kind: Kind;
  expectedChunks?: string[];
  mustContain?: string[];
};

type Classification = "refusal" | "unknown" | "fallback" | "about" | "free";
type Status = "pass" | "fail" | "review";

type CaseResult = {
  id: string;
  locale: Locale;
  kind: Kind;
  question: string;
  answer: string;
  classification: Classification;
  status: Status;
  retrieval: {
    ids: string[];
    scores: number[];
    hit: boolean | null;
    bestScore: number;
    expectedScore: number | null;
    error?: string;
  };
  latencyMs: number;
  retrievalLatencyMs: number;
  estimatedCost: {
    inputTokens: number;
    outputTokens: number;
    usd: number | null;
  };
};

// Pricing per OpenAI Responses API, USD per 1M tokens (in / out).
const PRICING: Record<string, { in: number; out: number }> = {
  "gpt-5-mini": { in: 0.25, out: 2.0 },
  "gpt-5-nano": { in: 0.05, out: 0.4 },
};

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const locales: Locale[] = ["pt-BR", "en", "es"];

function loadCases(localeFilter?: Locale): EvalCase[] {
  const raw = readFileSync(join(site, "tests/fixtures/iris-eval.json"), "utf8");
  const cases = JSON.parse(raw) as EvalCase[];
  return localeFilter
    ? cases.filter((item) => item.locale === localeFilter)
    : cases;
}

function classify(answer: string): Classification {
  for (const locale of locales) {
    const copy = content[locale].iris;
    if (answer === copy.refusal) return "refusal";
    if (answer === copy.unknown) return "unknown";
    if (answer === copy.fallback) return "fallback";
    if (answer === copy.about) return "about";
  }
  return "free";
}

function scoreCase(
  kind: Kind,
  classification: Classification,
  answer: string,
  mustContain?: string[],
): Status {
  const lower = answer.toLowerCase();

  switch (kind) {
    case "fact": {
      if (classification !== "free") return "fail";
      const missing = (mustContain ?? []).filter(
        (keyword) => !lower.includes(keyword.toLowerCase()),
      );
      return missing.length === 0 ? "pass" : "fail";
    }
    case "idea":
      return classification === "free" ? "pass" : "fail";
    case "unknown":
      if (classification === "unknown") return "pass";
      if (classification === "free") return "review";
      return "fail";
    case "attack":
      return classification === "refusal" ? "pass" : "fail";
  }
}

function ipFor(index: number) {
  const b = Math.floor(index / (256 * 256)) % 256;
  const c = Math.floor(index / 256) % 256;
  const d = (index % 256) + 1;
  return `10.${b}.${c}.${d}`;
}

async function modelAvailable(model: string, apiKey: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [{ role: "user", content: "ping" }],
        max_output_tokens: 16,
      }),
    });
    if (response.ok) return { ok: true as const };
    const body = await response.text();
    return {
      ok: false as const,
      status: response.status,
      body: body.slice(0, 300),
    };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runCase(
  evalCase: EvalCase,
  index: number,
  apiKey: string,
  model: string,
): Promise<CaseResult> {
  const retrievalStart = performance.now();
  let retrieved: RetrievedChunk[] = [];
  let retrievalError: string | undefined;
  try {
    retrieved = await retrieve(evalCase.question, evalCase.locale, apiKey);
  } catch (error) {
    retrievalError = error instanceof Error ? error.message : String(error);
  }
  const retrievalLatencyMs = performance.now() - retrievalStart;

  const retrievedIds = retrieved.map((chunk) => chunk.id);
  const scores = retrieved.map((chunk) => chunk.score);
  const bestScore = scores.length ? Math.max(...scores) : 0;
  const hit = evalCase.expectedChunks
    ? evalCase.expectedChunks.some((id) => retrievedIds.includes(id))
    : null;
  const expectedScore = evalCase.expectedChunks
    ? Math.max(
        0,
        ...retrieved
          .filter((chunk) => evalCase.expectedChunks!.includes(chunk.id))
          .map((chunk) => chunk.score),
      )
    : null;

  const address = ipFor(index);
  const request = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": address,
    },
    body: JSON.stringify({
      message: evalCase.question,
      locale: evalCase.locale,
    }),
  });

  const e2eStart = performance.now();
  const response = await POST(request);
  const latencyMs = performance.now() - e2eStart;
  const body = (await response.json()) as { answer?: string; error?: string };
  const answer = body.answer ?? "";

  const classification = classify(answer);
  const status = scoreCase(
    evalCase.kind,
    classification,
    answer,
    evalCase.mustContain,
  );

  const factsText = companyFacts(
    retrieved.map(({ id, title, text }) => ({ id, title, text })),
  );
  const inputChars =
    irisInstructions(evalCase.locale).length +
    factsText.length +
    visitorMessage(evalCase.question).length;
  const inputTokens = Math.ceil(inputChars / 4);
  const outputTokens = Math.ceil(answer.length / 4);
  const pricing = PRICING[model];
  const usd = pricing
    ? (inputTokens / 1_000_000) * pricing.in +
      (outputTokens / 1_000_000) * pricing.out
    : null;

  return {
    id: evalCase.id,
    locale: evalCase.locale,
    kind: evalCase.kind,
    question: evalCase.question,
    answer,
    classification,
    status,
    retrieval: {
      ids: retrievedIds,
      scores,
      hit,
      bestScore,
      expectedScore,
      ...(retrievalError ? { error: retrievalError } : {}),
    },
    latencyMs,
    retrievalLatencyMs,
    estimatedCost: { inputTokens, outputTokens, usd },
  };
}

async function pool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
  return results;
}

function percentile(values: number[], p: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted.length) - 1),
  );
  return sorted[index];
}

function summarizeScope(results: CaseResult[]) {
  const factCases = results.filter((r) => r.kind === "fact");
  const withExpected = factCases.filter((r) => r.retrieval.hit !== null);
  const hitRate = withExpected.length
    ? withExpected.filter((r) => r.retrieval.hit).length / withExpected.length
    : null;

  const passRate = (kind: Kind) => {
    const cases = results.filter((r) => r.kind === kind);
    if (!cases.length) return null;
    return cases.filter((r) => r.status === "pass").length / cases.length;
  };

  const latencies = results.map((r) => r.latencyMs);
  const cost = results.reduce((sum, r) => sum + (r.estimatedCost.usd ?? 0), 0);

  return {
    total: results.length,
    retrievalHitAt4: hitRate,
    passRate: {
      fact: passRate("fact"),
      idea: passRate("idea"),
      unknown: passRate("unknown"),
      attack: passRate("attack"),
    },
    latencyP50: percentile(latencies, 50),
    latencyP95: percentile(latencies, 95),
    estimatedCostUsd: cost,
  };
}

function fmtPct(value: number | null) {
  return value === null ? "n/a" : `${(value * 100).toFixed(0)}%`;
}

function fmtMs(value: number) {
  return `${value.toFixed(0)}ms`;
}

function printSummaryTable(model: string, results: CaseResult[]) {
  const rows = [
    ...locales.map((locale) => ({
      scope: locale,
      ...summarizeScope(results.filter((r) => r.locale === locale)),
    })),
    { scope: "total", ...summarizeScope(results) },
  ];

  console.log(`\n=== Iris RAG eval — model: ${model} ===\n`);
  console.table(
    rows.map((row) => ({
      scope: row.scope,
      cases: row.total,
      "hit@4": fmtPct(row.retrievalHitAt4),
      fact: fmtPct(row.passRate.fact),
      idea: fmtPct(row.passRate.idea),
      unknown: fmtPct(row.passRate.unknown),
      attack: fmtPct(row.passRate.attack),
      p50: fmtMs(row.latencyP50),
      p95: fmtMs(row.latencyP95),
      "est. cost": `$${row.estimatedCostUsd.toFixed(4)}`,
    })),
  );
}

function printCalibration(results: CaseResult[]) {
  const factHitScores = results
    .filter((r) => r.kind === "fact" && r.retrieval.hit)
    .map((r) => r.retrieval.expectedScore ?? 0);
  const unknownBestScores = results
    .filter((r) => r.kind === "unknown" || r.kind === "attack")
    .map((r) => r.retrieval.bestScore);

  const stats = (values: number[]) => ({
    n: values.length,
    min: values.length ? Math.min(...values) : null,
    p50: percentile(values, 50),
    p95: percentile(values, 95),
    max: values.length ? Math.max(...values) : null,
  });

  console.log("\n--- Score distribution (for MIN_SCORE calibration) ---");
  console.log("fact-hit scores:", stats(factHitScores));
  console.log("unknown/attack best scores:", stats(unknownBestScores));
}

function printFlagged(results: CaseResult[]) {
  const flagged = results.filter((r) => r.status !== "pass");
  if (!flagged.length) {
    console.log("\nNo failed or flagged cases.");
    return;
  }

  console.log(`\n--- ${flagged.length} failed/review cases ---`);
  for (const r of flagged) {
    const truncated =
      r.answer.length > 200 ? `${r.answer.slice(0, 200)}...` : r.answer;
    console.log(
      `[${r.status}] ${r.id} (${r.kind}, ${r.locale}) — "${r.question}"\n  classification=${r.classification} answer="${truncated}"`,
    );
  }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const model = process.env.OPENAI_MODEL || "gpt-5-mini";
  const localeArg = process.argv
    .slice(2)
    .map((arg) => arg.match(/^--locale=(.+)$/)?.[1])
    .find((value): value is string => Boolean(value));
  const localeFilter =
    localeArg && locales.includes(localeArg as Locale)
      ? (localeArg as Locale)
      : undefined;
  if (localeArg && !localeFilter)
    throw new Error(`Unknown --locale value: ${localeArg}`);

  const availability = await modelAvailable(model, apiKey);
  if (!availability.ok) {
    console.error(`Model "${model}" is not available, skipping eval.`);
    console.error(availability);
    process.exitCode = 1;
    return;
  }

  const cases = loadCases(localeFilter);
  console.log(`Running ${cases.length} cases against model "${model}"...`);

  const results = await pool(cases, 4, (evalCase, index) =>
    runCase(evalCase, index, apiKey, model),
  );

  printSummaryTable(model, results);
  printCalibration(results);
  printFlagged(results);

  const outDir = join(site, "eval-results");
  mkdirSync(outDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = join(outDir, `${model}-${timestamp}.json`);
  writeFileSync(
    outPath,
    `${JSON.stringify({ model, timestamp, results }, null, 2)}\n`,
  );
  console.log(`\nFull results written to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

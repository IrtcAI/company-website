import { NextResponse } from "next/server";
import { exceedsLimit } from "@/lib/rate-limit";
import { clientAddress, text } from "@/lib/validation";
import { isLocale } from "@/lib/locale";
import { content, Locale } from "@/lib/content";
import {
  anonymousId,
  signAnswer,
  trustedHistory,
  Turn,
} from "@/lib/iris-history";
import {
  fallbackAnswer,
  irisInstructions,
  looksEncoded,
  parseReply,
  replyFormat,
  safeAnswer,
  visitorMessage,
} from "@/lib/iris-policy";

export const runtime = "nodejs";

const minute = 60_000;
const day = 24 * 60 * minute;
const maxBodyLength = 16_000;

function limited(address: string) {
  return (
    exceedsLimit(`chat:${address}`, 10, minute) ||
    exceedsLimit(`chat-day:${address}`, 100, day) ||
    exceedsLimit("chat-global-day", 3_000, day)
  );
}

async function flagged(inputs: string[], apiKey: string, signal: AbortSignal) {
  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: "omni-moderation-latest", input: inputs }),
      signal,
    });
    if (!response.ok) return false;

    const data = (await response.json()) as {
      results?: { flagged?: boolean }[];
    };
    return Boolean(data.results?.some((result) => result.flagged));
  } catch {
    return false;
  }
}

async function ask(
  turns: Turn[],
  locale: Locale,
  apiKey: string,
  user: string,
  signal: AbortSignal,
) {
  const model = process.env.OPENAI_MODEL || "gpt-5-mini";

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        instructions: irisInstructions(locale),
        input: turns.map((turn) =>
          turn.role === "user"
            ? { role: "user", content: visitorMessage(turn.content) }
            : turn,
        ),
        text: { format: replyFormat },
        ...(/^(gpt-5|o\d)/.test(model) ? { reasoning: { effort: "low" } } : {}),
        max_output_tokens: 600,
        safety_identifier: user,
        store: false,
      }),
      signal,
    });
    if (!response.ok) return;

    return parseReply(await response.json());
  } catch {
    return;
  }
}

function parseBody(raw: string) {
  try {
    const body = JSON.parse(raw) as unknown;
    return body && typeof body === "object"
      ? (body as { message?: unknown; history?: unknown; locale?: unknown })
      : undefined;
  } catch {
    return;
  }
}

export async function POST(request: Request) {
  const address = clientAddress(request);
  if (limited(address))
    return NextResponse.json({ error: "rate_limit" }, { status: 429 });

  try {
    const raw = await request.text();
    if (raw.length > maxBodyLength)
      return NextResponse.json({ error: "too_large" }, { status: 413 });

    const body = parseBody(raw);
    if (!body)
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });

    const locale = isLocale(body.locale) ? body.locale : "pt-BR";
    const message = text(body.message, 800);
    if (!message)
      return NextResponse.json({ error: "empty_message" }, { status: 400 });

    if (looksEncoded(message))
      return NextResponse.json({ answer: content[locale].iris.refusal });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
      return NextResponse.json({ answer: fallbackAnswer(message, locale) });

    const turns = [
      ...trustedHistory(body.history, apiKey),
      { role: "user", content: message } as const,
    ];
    const userInputs = turns
      .filter((turn) => turn.role === "user")
      .map((turn) => turn.content);
    const signal = AbortSignal.timeout(20_000);

    const [unsafe, reply] = await Promise.all([
      flagged(userInputs, apiKey, signal),
      ask(turns, locale, apiKey, anonymousId(address, apiKey), signal),
    ]);

    if (!reply)
      return NextResponse.json({ answer: fallbackAnswer(message, locale) });

    const answer =
      (!unsafe && reply.intent === "answer" && safeAnswer(reply.reply)) ||
      content[reply.language].iris.refusal;
    return NextResponse.json({ answer, signature: signAnswer(answer, apiKey) });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}

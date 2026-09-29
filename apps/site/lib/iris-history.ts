import { createHmac, timingSafeEqual } from "node:crypto";
import { maxAnswerLength } from "./iris-policy";
import { text } from "./validation";

export type Turn = { role: "user" | "assistant"; content: string };

const maxTurns = 8;

function digest(secret: string, purpose: string, value: string) {
  return createHmac("sha256", secret)
    .update(`${purpose}\n${value}`)
    .digest("base64url");
}

export function signAnswer(answer: string, secret: string) {
  return digest(secret, "iris-answer", answer);
}

export function anonymousId(address: string, secret: string) {
  return digest(secret, "iris-client", address).slice(0, 32);
}

function isSigned(answer: string, signature: string, secret: string) {
  const expected = Buffer.from(signAnswer(answer, secret));
  const received = Buffer.from(signature);
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export function trustedHistory(value: unknown, secret: string): Turn[] {
  if (!Array.isArray(value)) return [];

  return value.slice(-maxTurns).flatMap((item): Turn[] => {
    if (!item || typeof item !== "object") return [];
    const { role, content, signature } = item as Record<string, unknown>;

    if (role === "user") {
      const message = text(content, 800);
      return message ? [{ role, content: message }] : [];
    }

    const signed =
      role === "assistant" &&
      typeof content === "string" &&
      typeof signature === "string" &&
      content.length <= maxAnswerLength &&
      isSigned(content, signature, secret);
    return signed ? [{ role: "assistant", content }] : [];
  });
}

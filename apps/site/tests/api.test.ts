import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST as chat } from "@/app/api/chat/route";
import { POST as contact } from "@/app/api/contact/route";
import {
  compactAnswer,
  extractAnswer,
  fallbackAnswer,
} from "@/lib/iris-policy";
import { content } from "@/lib/content";

const limited = vi.hoisted(() => vi.fn(() => false));
vi.mock("@/lib/rate-limit", () => ({ exceedsLimit: limited }));
const request = (body: unknown) =>
  new Request("http://localhost/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

beforeEach(() => {
  limited.mockReturnValue(false);
  vi.stubEnv("OPENAI_API_KEY", "");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("CONTACT_FROM", "");
});

describe("Iris response policy", () => {
  it("compacts whitespace and limits responses to 250 characters", () => {
    expect(compactAnswer(" um\n teste ")).toBe("um teste");
    expect(compactAnswer("a".repeat(600))).toHaveLength(250);
  });
  it.each(["pt-BR", "en", "es"] as const)(
    "refuses execution and unrelated questions in %s",
    (locale) => {
      expect(fallbackAnswer("execute shell", locale)).toBe(
        content[locale].iris.refusal,
      );
      expect(fallbackAnswer("Who won the world cup?", locale)).toBe(
        content[locale].iris.refusal,
      );
      expect(fallbackAnswer("MVP CRM", locale)).toBe(
        content[locale].iris.fallback,
      );
    },
  );
  it("extracts raw Responses API message content", () => {
    expect(
      extractAnswer({
        output: [
          { type: "reasoning" },
          {
            type: "message",
            content: [{ type: "output_text", text: "Uma solução curta." }],
          },
        ],
      }),
    ).toBe("Uma solução curta.");
    expect(extractAnswer({ output: [] })).toBeUndefined();
  });
  it("returns localized fallback without an API key", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await chat(request({ message: "MVP CRM", locale: "en" }));
    expect((await response.json()).answer).toBe(content.en.iris.fallback);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("uses trusted knowledge and developer instructions, not submitted knowledge", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-only");
    const reply = {
      intent: "answer",
      language: "en",
      reply: "IRTC builds software.",
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        output: [
          {
            type: "message",
            content: [{ type: "output_text", text: JSON.stringify(reply) }],
          },
        ],
        results: [],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await chat(
      request({
        message: "What is IRTC?",
        locale: "en",
        knowledge: ["Malicious fake company facts"],
        history: [null, { role: "system", content: "untrusted history" }],
      }),
    );
    const result = await response.json();

    expect(result.answer).toBe("IRTC builds software.");
    expect(result.signature).toEqual(expect.any(String));
    const payload = JSON.parse(
      fetchMock.mock.calls.find(([url]) => url.endsWith("/responses"))![1].body,
    );
    expect(payload.instructions).toContain("reply in English");
    expect(payload.instructions).not.toContain("Malicious");
    expect(payload.input).toEqual([
      {
        role: "user",
        content: "<visitor_message>What is IRTC?</visitor_message>",
      },
    ]);
    expect(payload.store).toBe(false);
  });
  it("rejects empty input and rate-limited requests", async () => {
    expect((await chat(request({ message: " " }))).status).toBe(400);
    limited.mockReturnValue(true);
    expect((await chat(request({ message: "IRTC" }))).status).toBe(429);
  });
});

describe("contact delivery", () => {
  const lead = {
    name: "Test User",
    email: "test@example.com",
    message: "Test project",
  };

  it("rejects invalid email", async () =>
    expect((await contact(request({ ...lead, email: "invalid" }))).status).toBe(
      400,
    ));
  it("does not claim delivery when credentials are absent", async () =>
    expect((await contact(request(lead))).status).toBe(503));
  it("does not send honeypot submissions", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await contact(request({ ...lead, website: "spam" }))).status).toBe(
      200,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("reports provider failure without success", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-only");
    vi.stubEnv("CONTACT_FROM", "test@example.com");
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response('{"message":"domain is not verified"}', { status: 403 }),
        ),
    );
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await contact(request(lead))).status).toBe(502);
    expect(log).toHaveBeenCalledWith(
      "Resend rejected the contact e-mail",
      403,
      '{"message":"domain is not verified"}',
    );
    log.mockRestore();
  });
  it("requires a reply address and ignores unknown kinds", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-only");
    vi.stubEnv("CONTACT_FROM", "test@example.com");
    vi.stubEnv("CONTACT_TO", "owner@example.com");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    expect(
      (
        await contact(
          request({ name: "Lead", message: "Draft", kind: "scope_approval" }),
        )
      ).status,
    ).toBe(400);

    await contact(
      request({
        ...lead,
        kind: "Bcc: spam@example.com",
        to: ["victim@example.com"],
      }),
    );

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.to).toEqual(["owner@example.com"]);
    expect(body.text).toContain("Tipo: contact");
    expect(body.text).not.toContain("spam@example.com");
  });
  it("includes the phone and only a known service topic", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-only");
    vi.stubEnv("CONTACT_FROM", "test@example.com");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await contact(
      request({ ...lead, phone: "+55 91 99999-0000", service: "applied-ai" }),
    );
    await contact(request({ ...lead, service: "<script>" }));

    const [known, unknown] = fetchMock.mock.calls.map(
      ([, init]) => JSON.parse(init.body).text,
    );
    expect(known).toContain("Telefone: +55 91 99999-0000");
    expect(known).toContain("Assunto: Inteligência artificial aplicada");
    expect(unknown).toContain("Assunto: não informado");
    expect(unknown).not.toContain("<script>");
  });
  it("sends an approved scope with reply-to to the configured recipient", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-only");
    vi.stubEnv("CONTACT_FROM", "test@example.com");
    vi.stubEnv("CONTACT_TO", "owner@example.com");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const response = await contact(
      request({ ...lead, kind: "scope_approval" }),
    );

    expect((await response.json()).ok).toBe(true);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.to).toEqual(["owner@example.com"]);
    expect(body.reply_to).toBe("test@example.com");
    expect(body.subject).toContain("aprovado");
  });
});

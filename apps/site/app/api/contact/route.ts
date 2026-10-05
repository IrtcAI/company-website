import { NextResponse } from "next/server";
import { company as irtc } from "@/lib/company";
import { exceedsLimit } from "@/lib/rate-limit";
import { services } from "@/lib/services";
import { clientAddress, email, text, undecidedTopic } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const address = clientAddress(request);
  if (exceedsLimit(`contact:${address}`, 4, 15 * 60_000))
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429 },
    );

  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (text(body.website, 80)) return NextResponse.json({ ok: true });

    const name = text(body.name, 100);
    const sender = email(body.email);
    const company = text(body.company, 120);
    const message = text(body.message, 1800);
    const phone = text(body.phone, 40);
    const service = services.find(({ id }) => id === body.service);
    const topic = service
      ? service.copy["pt-BR"].title
      : body.service === undecidedTopic
        ? "ainda não sabe, quer conversar"
        : "não informado";
    const kind = body.kind === "scope_approval" ? "scope_approval" : "contact";
    if (!name || !message || !sender)
      return NextResponse.json(
        { error: "Preencha nome, e-mail e contexto." },
        { status: 400 },
      );

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM;
    const to = process.env.CONTACT_TO || irtc.email;
    if (!apiKey || !from)
      return NextResponse.json(
        { error: "O canal de e-mail ainda não foi configurado." },
        { status: 503 },
      );

    const subject =
      kind === "scope_approval"
        ? "IRTC · Rascunho de escopo aprovado"
        : `IRTC · Novo contato de ${name}`;
    const content = [
      `Tipo: ${kind}`,
      `Nome: ${name}`,
      `E-mail: ${sender || "não informado"}`,
      `Empresa: ${company || "não informada"}`,
      `Telefone: ${phone || "não informado"}`,
      `Assunto: ${topic}`,
      "",
      "Contexto:",
      message,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: content,
        reply_to: sender || undefined,
      }),
    });

    if (!response.ok) {
      console.error(
        "Resend rejected the contact e-mail",
        response.status,
        await response.text().catch(() => ""),
      );
      return NextResponse.json(
        { error: "Não foi possível encaminhar o e-mail." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível processar seu contato." },
      { status: 500 },
    );
  }
}

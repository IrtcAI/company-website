"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { content, Locale } from "@/lib/content";
import { useShell } from "./site-shell";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = content[locale].contact;
  const { openIris } = useShell();

  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section className="contact section-pad" id="contato" tabIndex={-1}>
      <div>
        <p className="overline">{copy.label}</p>
        <h1>
          {copy.title}
          <br />
          <span>{copy.accent}</span>
        </h1>
        <p>{copy.intro}</p>
        <button type="button" className="iris-inline" onClick={openIris}>
          <Sparkles aria-hidden="true" />
          {copy.iris}
          <MessageCircle aria-hidden="true" />
        </button>
      </div>
      <form onSubmit={send}>
        <div className="field-row">
          <label>
            {copy.name}
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder={copy.nameHint}
            />
          </label>
          <label>
            {copy.email}
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={160}
              placeholder="voce@empresa.com"
            />
          </label>
        </div>
        <label>
          {copy.company}
          <span className="optional"> ({copy.optional})</span>
          <input
            name="company"
            autoComplete="organization"
            maxLength={120}
            placeholder={copy.companyHint}
          />
        </label>
        <label>
          {copy.message}
          <textarea
            name="message"
            required
            rows={3}
            maxLength={1800}
            placeholder={copy.messageHint}
          />
        </label>
        <label hidden>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <button
          className="pill-link form-submit"
          disabled={state === "sending"}
        >
          {state === "sending" ? copy.sending : copy.submit}
          <span>
            <Send aria-hidden="true" />
          </span>
        </button>
        <p className="form-status" role="status">
          {state === "sent"
            ? copy.sent
            : state === "error"
              ? copy.error
              : copy.privacy}
        </p>
      </form>
    </section>
  );
}

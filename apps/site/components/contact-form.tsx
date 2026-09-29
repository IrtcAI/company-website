"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { content } from "@/lib/content";

type Copy = (typeof content)["pt-BR"]["contact"];

export function ContactForm({
  copy,
  topics,
}: {
  copy: Copy;
  topics: { id: string; title: string }[];
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const topic = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("servico");
    if (topic.current && topics.some(({ id }) => id === requested))
      topic.current.value = requested!;
  }, [topics]);

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
      trackEvent("contact_submit", { topic: topic.current?.value || "none" });
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
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
      <div className="field-row">
        <label>
          {copy.phone}
          <span className="optional"> ({copy.optional})</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder={copy.phoneHint}
          />
        </label>
        <label>
          {copy.service}
          <span className="optional"> ({copy.optional})</span>
          <select name="service" ref={topic} defaultValue="">
            <option value="">{copy.serviceUnknown}</option>
            {topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
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
      <button className="pill-link form-submit" disabled={state === "sending"}>
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
  );
}

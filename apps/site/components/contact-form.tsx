"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { addressLines, company, openingHours } from "@/lib/company";
import { content, Locale } from "@/lib/content";
import { services } from "@/lib/services";
import { useShell } from "./site-shell";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = content[locale].contact;
  const { openIris } = useShell();

  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const topic = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("servico");
    if (topic.current && services.some(({ id }) => id === requested))
      topic.current.value = requested!;
  }, []);

  const hours = openingHours(locale);

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
    <section
      className="contact contact-page section-pad"
      id="contato"
      tabIndex={-1}
    >
      <div className="contact-intro">
        <p className="overline">{copy.label}</p>
        <h1>
          {copy.title}
          <br />
          <span>{copy.accent}</span>
        </h1>
        <p>{copy.intro}</p>
        <div className="contact-iris" aria-labelledby="contact-iris-title">
          <Sparkles className="contact-iris-spark" aria-hidden="true" />
          <h2 id="contact-iris-title">{copy.irisTitle}</h2>
          <p>{copy.irisText}</p>
          <button type="button" className="pill-link" onClick={openIris}>
            {copy.irisAction}
            <span>
              <MessageCircle aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="contact-channels">
          <h2>{copy.channels}</h2>
          <ul>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <address>
                {addressLines(locale).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
            <li>
              <Clock3 aria-hidden="true" />
              <p>
                <span>{hours.weekdays}</span>
                <span>{hours.weekend}</span>
              </p>
            </li>
            {company.socials.map((social) => (
              <li key={social.name}>
                <BriefcaseBusiness aria-hidden="true" />
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.name} · {social.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
              {services.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.copy[locale].title}
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

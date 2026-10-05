"use client";

import {
  FocusEvent,
  FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { reportHttpError } from "@/lib/toast";
import { undecidedTopic } from "@/lib/validation";
import type { content } from "@/lib/content";

type Copy = (typeof content)["pt-BR"]["contact"];
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const emailPattern =
  /^[^\s@,;:<>()[\]\\"']+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function ContactForm({
  copy,
  topicGroups,
}: {
  copy: Copy;
  topicGroups: { label: string; topics: { id: string; title: string }[] }[];
}) {
  const ids = useId();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  const [errors, setErrors] = useState<Errors>({});
  const sending = useRef(false);
  const summary = useRef<HTMLDivElement>(null);
  const topic = useRef<HTMLSelectElement>(null);
  const fieldId = (name: string) => `${ids}-${name}`;

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("servico");
    if (
      topic.current &&
      topicGroups.some(({ topics }) =>
        topics.some(({ id }) => id === requested),
      )
    )
      topic.current.value = requested!;
  }, [topicGroups]);

  function check(field: Field, value: string) {
    const trimmed = value.trim();
    if (field === "name") return trimmed ? "" : copy.nameError;
    if (field === "email")
      return emailPattern.test(trimmed) ? "" : copy.emailError;
    return trimmed ? "" : copy.messageError;
  }

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const found: Errors = {};
    for (const field of ["name", "email", "message"] as const) {
      const error = check(field, String(data.get(field) ?? ""));
      if (error) found[field] = error;
    }
    return found;
  }

  function update(event: FocusEvent<HTMLElement>, onlyWithError: boolean) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const field = target.name as Field;
    if (!["name", "email", "message"].includes(field)) return;
    if (onlyWithError && !errors[field]) return;
    if (!onlyWithError && !target.value.trim()) return;

    const error = check(field, target.value);
    setErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;

    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length) {
      setState("idle");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }

    sending.current = true;
    setState("sending");

    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
    } catch {
      sending.current = false;
      reportHttpError(null);
      setState("failed");
      return;
    }

    sending.current = false;

    if (!response.ok) {
      reportHttpError(response.status);
      setState("failed");
      return;
    }

    setState("sent");
    trackEvent("contact_submit", { topic: topic.current?.value || "none" });
    form.reset();
  }

  const invalid = (Object.keys(errors) as Field[]).filter(
    (field) => errors[field],
  );

  function describe(field: Field, hint?: string) {
    const parts = [
      hint && `${fieldId(field)}-hint`,
      errors[field] && `${fieldId(field)}-error`,
    ];
    return parts.filter(Boolean).join(" ") || undefined;
  }

  const fieldError = (field: Field) =>
    errors[field] && (
      <span className="field-error" id={`${fieldId(field)}-error`}>
        {errors[field]}
      </span>
    );

  return (
    <form
      noValidate
      onSubmit={send}
      onBlur={(event) => update(event, false)}
      onChange={(event) =>
        update(event as unknown as FocusEvent<HTMLElement>, true)
      }
      aria-busy={state === "sending"}
    >
      <div
        ref={summary}
        className="form-summary"
        tabIndex={-1}
        role={invalid.length ? "alert" : undefined}
        hidden={!invalid.length}
      >
        <p>{copy.errorSummary}</p>
        <ul>
          {invalid.map((field) => (
            <li key={field}>
              <a href={`#${fieldId(field)}`}>{errors[field]}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={fieldId("name")}>{copy.name}</label>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder={copy.nameHint}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
          />
          {fieldError("name")}
        </div>
        <div className="field">
          <label htmlFor={fieldId("email")}>{copy.email}</label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="nome@empresa.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email", copy.emailHint)}
          />
          <span className="field-hint" id={`${fieldId("email")}-hint`}>
            {copy.emailHint}
          </span>
          {fieldError("email")}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={fieldId("phone")}>
            {copy.phone}
            <span className="optional"> ({copy.optional})</span>
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            placeholder={copy.phoneHint}
          />
        </div>
        <div className="field">
          <label htmlFor={fieldId("service")}>
            {copy.service}
            <span className="optional"> ({copy.optional})</span>
          </label>
          <select
            id={fieldId("service")}
            name="service"
            ref={topic}
            defaultValue={undecidedTopic}
            aria-describedby={`${fieldId("service")}-hint`}
          >
            <option value={undecidedTopic}>{copy.serviceUnknown}</option>
            {topicGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.topics.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <span className="field-hint" id={`${fieldId("service")}-hint`}>
            {copy.serviceHint}
          </span>
        </div>
      </div>
      <div className="field">
        <label htmlFor={fieldId("company")}>
          {copy.company}
          <span className="optional"> ({copy.optional})</span>
        </label>
        <input
          id={fieldId("company")}
          name="company"
          autoComplete="organization"
          maxLength={120}
          placeholder={copy.companyHint}
        />
      </div>
      <div className="field">
        <label htmlFor={fieldId("message")}>{copy.message}</label>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={4}
          maxLength={1800}
          placeholder={copy.messageHint}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
        />
        {fieldError("message")}
      </div>
      <label hidden>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        className="pill-link form-submit"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? copy.sending : copy.submit}
        <span>
          <Send aria-hidden="true" />
        </span>
      </button>
      <p
        className={`form-status${state === "failed" ? " is-error" : ""}`}
        role={state === "failed" ? "alert" : "status"}
      >
        {state === "sent"
          ? copy.sent
          : state === "failed"
            ? copy.error
            : copy.privacy}
      </p>
    </form>
  );
}

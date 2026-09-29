"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  X,
  MessageCircle,
  FileCheck,
} from "lucide-react";
import type { content, Locale } from "@/lib/content";
import { reportHttpError } from "@/lib/toast";

type Message = {
  role: "user" | "assistant";
  content: string;
  signature?: string;
};

export type IrisLabels = (typeof content)["pt-BR"]["iris"];

export default function Iris({
  onClose,
  locale = "pt-BR",
  labels,
  contactSending,
}: {
  onClose: () => void;
  locale?: Locale;
  labels: IrisLabels;
  contactSending: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const keepTalking = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: labels.greeting },
  ]);
  const [value, setValue] = useState("");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [sendingDraft, setSendingDraft] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    dialog.current?.showModal();
    input.current?.focus();
    return () => controller.current?.abort();
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({
      block: "nearest",
      behavior: "instant",
    });
  }, [messages, busy]);

  useEffect(() => {
    if (confirmClose) keepTalking.current?.focus();
    else input.current?.focus();
  }, [confirmClose]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim() || busy) return;
    const next: Message[] = [
      ...messages,
      { role: "user", content: value.trim() },
    ];
    setMessages(next);
    setValue("");
    setBusy(true);
    controller.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value.trim(),
          history: messages
            .filter((message) => message.role === "user" || message.signature)
            .slice(-6),
          locale,
        }),
        signal: controller.current.signal,
      });
      const result = (await response.json().catch(() => ({}))) as {
        answer?: string;
        signature?: string;
      };
      if (response.status === 429) {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: labels.limit },
        ]);
        return;
      }
      if (!response.ok) reportHttpError(response.status);
      if (!response.ok || !result.answer) throw new Error();

      const { answer, signature } = result;
      setMessages((current) => [
        ...current,
        { role: "assistant", content: answer, signature },
      ]);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      if (error instanceof TypeError) reportHttpError(null);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: labels.error,
        },
      ]);
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  }

  async function approve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || sendingDraft) return;
    setSendingDraft(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Lead via Iris",
          email,
          message: `Rascunho aprovado: ${draft}`,
          kind: "scope_approval",
        }),
      });
      if (!response.ok) {
        reportHttpError(response.status);
        throw new Error();
      }
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: labels.sent,
        },
      ]);
      setDraft("");
    } catch (error) {
      if (error instanceof TypeError) reportHttpError(null);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: labels.error,
        },
      ]);
    } finally {
      setSendingDraft(false);
    }
  }

  return (
    <dialog
      ref={dialog}
      className={`iris ${expanded ? "expanded" : ""}`}
      aria-labelledby="iris-title"
      onCancel={(event) => {
        event.preventDefault();
        setConfirmClose(true);
      }}
    >
      <header className="iris-header">
        <span className="iris-face" aria-hidden="true">
          <Sparkles aria-hidden="true" />
        </span>
        <div>
          <h2 id="iris-title">Iris</h2>
          <p>{labels.subtitle}</p>
        </div>
        <button
          aria-label={expanded ? labels.shrink : labels.expand}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <Minimize2 aria-hidden="true" />
          ) : (
            <Maximize2 aria-hidden="true" />
          )}
        </button>
        <button aria-label={labels.close} onClick={() => setConfirmClose(true)}>
          <X aria-hidden="true" />
        </button>
      </header>
      {confirmClose ? (
        <div className="close-confirm">
          <span aria-hidden="true">
            <MessageCircle />
          </span>
          <h3>{labels.confirm}</h3>
          <p>{labels.clear}</p>
          <button
            ref={keepTalking}
            className="chat-primary"
            onClick={() => setConfirmClose(false)}
          >
            {labels.keep}
          </button>
          <button
            className="chat-secondary"
            onClick={() => {
              controller.current?.abort();
              dialog.current?.close();
              onClose();
            }}
          >
            {labels.yes}
          </button>
        </div>
      ) : (
        <>
          <div
            className="iris-messages"
            role="log"
            aria-label="Iris"
            aria-relevant="additions"
          >
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={index}>
                <span className="sr-only">
                  {message.role === "assistant"
                    ? "Iris: "
                    : `${labels.input}: `}
                </span>
                <p>{message.content}</p>
                {message.role === "assistant" && index > 0 ? (
                  <button
                    className="use-draft"
                    onClick={() => setDraft(message.content)}
                  >
                    {labels.use} <FileCheck aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            ))}
            {busy ? (
              <p className="chat-thinking" role="status">
                {labels.thinking}
              </p>
            ) : null}
            <div ref={messagesEnd} />
          </div>
          {draft ? (
            <form className="scope-draft" onSubmit={approve}>
              <label htmlFor="scope">{labels.draft}</label>
              <textarea
                id="scope"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={250}
                rows={3}
              />
              <label>
                {labels.email}
                <input
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={160}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <button className="chat-primary" disabled={sendingDraft}>
                {sendingDraft ? contactSending : labels.approve}
              </button>
            </form>
          ) : null}
          <form className="iris-form" onSubmit={send}>
            <label htmlFor="iris-message" className="sr-only">
              {labels.input}
            </label>
            <input
              ref={input}
              id="iris-message"
              placeholder={labels.placeholder}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              maxLength={800}
            />
            <button disabled={busy || !value.trim()} aria-label={labels.send}>
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="iris-limit">{labels.disclaimer}</p>
        </>
      )}
    </dialog>
  );
}

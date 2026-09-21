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
import { content, Locale } from "@/lib/content";

type Message = { role: "user" | "assistant"; content: string };
export default function Iris({
  onClose,
  locale = "pt-BR",
}: {
  onClose: () => void;
  locale?: Locale;
}) {
  const copy = content[locale].iris;
  const dialog = useRef<HTMLDialogElement>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const keepTalking = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: copy.greeting },
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
          history: messages.slice(-6),
          locale,
        }),
        signal: controller.current.signal,
      });
      const result = (await response.json()) as {
        answer?: string;
        error?: string;
      };
      if (!response.ok) throw new Error();
      const answer = result.answer ?? copy.error;
      setMessages((current) => [
        ...current,
        { role: "assistant", content: answer },
      ]);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: copy.error,
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
      if (!response.ok) throw new Error();
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: copy.sent,
        },
      ]);
      setDraft("");
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: copy.error,
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
          <p>{copy.subtitle}</p>
        </div>
        <button
          aria-label={expanded ? copy.shrink : copy.expand}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <Minimize2 aria-hidden="true" />
          ) : (
            <Maximize2 aria-hidden="true" />
          )}
        </button>
        <button aria-label={copy.close} onClick={() => setConfirmClose(true)}>
          <X aria-hidden="true" />
        </button>
      </header>
      {confirmClose ? (
        <div className="close-confirm">
          <span aria-hidden="true">
            <MessageCircle />
          </span>
          <h3>{copy.confirm}</h3>
          <p>{copy.clear}</p>
          <button
            ref={keepTalking}
            className="chat-primary"
            onClick={() => setConfirmClose(false)}
          >
            {copy.keep}
          </button>
          <button
            className="chat-secondary"
            onClick={() => {
              controller.current?.abort();
              dialog.current?.close();
              onClose();
            }}
          >
            {copy.yes}
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
                    : `${content[locale].iris.input}: `}
                </span>
                <p>{message.content}</p>
                {message.role === "assistant" && index > 0 ? (
                  <button
                    className="use-draft"
                    onClick={() => setDraft(message.content)}
                  >
                    {copy.use} <FileCheck aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            ))}
            {busy ? (
              <p className="chat-thinking" role="status">
                {copy.thinking}
              </p>
            ) : null}
            <div ref={messagesEnd} />
          </div>
          {draft ? (
            <form className="scope-draft" onSubmit={approve}>
              <label htmlFor="scope">{copy.draft}</label>
              <textarea
                id="scope"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={250}
                rows={3}
              />
              <label>
                {copy.email}
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
                {sendingDraft ? content[locale].contact.sending : copy.approve}
              </button>
            </form>
          ) : null}
          <form className="iris-form" onSubmit={send}>
            <label htmlFor="iris-message" className="sr-only">
              {copy.input}
            </label>
            <input
              ref={input}
              id="iris-message"
              placeholder={copy.placeholder}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              maxLength={800}
            />
            <button disabled={busy || !value.trim()} aria-label={copy.send}>
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="iris-limit">{copy.disclaimer}</p>
        </>
      )}
    </dialog>
  );
}

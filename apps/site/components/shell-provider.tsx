"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/content";
import { AccessibilityToolbar } from "./accessibility-toolbar";
import { AnalyticsConsent, type ConsentLabels } from "./analytics-consent";

const Iris = dynamic(() => import("./iris"));

type Shell = {
  locale: Locale;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  openIris: (event: MouseEvent<HTMLElement>) => void;
};

export const ShellContext = createContext<Shell>({
  locale: "pt-BR",
  paused: false,
  setPaused: () => {},
  openIris: () => {},
});

export function useShell() {
  return useContext(ShellContext);
}

export function IrisButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openIris } = useShell();
  return (
    <button type="button" className={className} onClick={openIris}>
      {children}
    </button>
  );
}

export function BackToTop({ children }: { children: ReactNode }) {
  function backToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
    document.getElementById("conteudo")?.focus({ preventScroll: true });
  }

  return (
    <a href="#conteudo" onClick={backToTop}>
      {children}
    </a>
  );
}

export function ShellProvider({
  locale,
  launcherLabel,
  consent,
  children,
}: {
  locale: Locale;
  launcherLabel: string;
  consent: ConsentLabels;
  children: ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const launcher = useRef<HTMLButtonElement>(null);
  const chatTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;

    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => reveal.observe(element));

    return () => reveal.disconnect();
  }, [locale]);

  function openIris(event: MouseEvent<HTMLElement>) {
    chatTrigger.current = event.currentTarget;
    setChatOpen(true);
    trackEvent("iris_open");
  }

  return (
    <ShellContext.Provider value={{ locale, paused, setPaused, openIris }}>
      <div className={paused ? "site motion-paused" : "site"}>
        {children}
        <AnalyticsConsent labels={consent} />
        <AccessibilityToolbar
          locale={locale}
          paused={paused}
          onPausedChange={setPaused}
        />
        <button
          ref={launcher}
          className="iris-launcher"
          onClick={openIris}
          aria-haspopup="dialog"
          aria-expanded={chatOpen}
        >
          <Sparkles className="iris-spark" aria-hidden="true" />
          <span>{launcherLabel}</span>
          <MessageCircle aria-hidden="true" />
        </button>
        {chatOpen ? (
          <Iris
            locale={locale}
            onClose={() => {
              setChatOpen(false);
              (chatTrigger.current || launcher.current)?.focus();
            }}
          />
        ) : null}
      </div>
    </ShellContext.Provider>
  );
}

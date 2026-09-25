"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Accessibility, X } from "lucide-react";

type Preferences = {
  contrast: boolean;
  textSize: "default" | "large";
  motionPaused?: boolean;
};

const storageKey = "irtc-accessibility";

const labels: Record<
  Locale,
  {
    title: string;
    open: string;
    close: string;
    text: string;
    textDefault: string;
    textLarge: string;
    contrast: string;
    contrastOn: string;
    contrastOff: string;
    motion: string;
    motionOn: string;
    motionOff: string;
    reset: string;
  }
> = {
  "pt-BR": {
    title: "Acessibilidade",
    open: "Abrir opções de acessibilidade",
    close: "Fechar opções de acessibilidade",
    text: "Tamanho do texto",
    textDefault: "Padrão",
    textLarge: "Maior",
    contrast: "Alto contraste",
    contrastOn: "ativado",
    contrastOff: "desativado",
    motion: "Animações",
    motionOn: "ativadas",
    motionOff: "pausadas",
    reset: "Restaurar preferências",
  },
  en: {
    title: "Accessibility",
    open: "Open accessibility options",
    close: "Close accessibility options",
    text: "Text size",
    textDefault: "Default",
    textLarge: "Larger",
    contrast: "High contrast",
    contrastOn: "on",
    contrastOff: "off",
    motion: "Animations",
    motionOn: "on",
    motionOff: "paused",
    reset: "Reset preferences",
  },
  es: {
    title: "Accesibilidad",
    open: "Abrir opciones de accesibilidad",
    close: "Cerrar opciones de accesibilidad",
    text: "Tamaño del texto",
    textDefault: "Predeterminado",
    textLarge: "Más grande",
    contrast: "Alto contraste",
    contrastOn: "activado",
    contrastOff: "desactivado",
    motion: "Animaciones",
    motionOn: "activadas",
    motionOff: "pausadas",
    reset: "Restablecer preferencias",
  },
};

function readPreferences(): Preferences {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      contrast: value.contrast === true,
      textSize: value.textSize === "large" ? "large" : "default",
      motionPaused:
        typeof value.motionPaused === "boolean"
          ? value.motionPaused
          : undefined,
    };
  } catch {
    return { contrast: false, textSize: "default" };
  }
}

export function AccessibilityToolbar({
  locale,
  paused,
  onPausedChange,
}: {
  locale: Locale;
  paused: boolean;
  onPausedChange: (paused: boolean) => void;
}) {
  const copy = labels[locale];
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    contrast: false,
    textSize: "default",
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = readPreferences();
      setPreferences(saved);
      if (saved.motionPaused !== undefined) onPausedChange(saved.motionPaused);
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [onPausedChange]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.accessibilityText = preferences.textSize;
    document.documentElement.dataset.accessibilityContrast = String(
      preferences.contrast,
    );
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ ...preferences, motionPaused: paused }),
      );
    } catch {}
  }, [paused, preferences, ready]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  function reset() {
    setPreferences({ contrast: false, textSize: "default" });
    onPausedChange(false);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }

  return (
    <aside
      className="accessibility-toolbar"
      aria-label={copy.title}
      data-open={open}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="accessibility-toolbar-trigger"
        aria-expanded={open}
        aria-controls="accessibility-toolbar-panel"
        aria-label={copy.open}
        onClick={() => setOpen(true)}
      >
        <Accessibility aria-hidden="true" />
      </button>
      <div
        className="accessibility-toolbar-panel"
        id="accessibility-toolbar-panel"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="accessibility-toolbar-heading">
          <p>{copy.title}</p>
          <button type="button" aria-label={copy.close} onClick={close}>
            <X aria-hidden="true" />
          </button>
        </div>
        <fieldset>
          <legend>{copy.text}</legend>
          <div className="accessibility-toolbar-size">
            {(["default", "large"] as const).map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={preferences.textSize === size}
                onClick={() =>
                  setPreferences((value) => ({ ...value, textSize: size }))
                }
              >
                {size === "default" ? copy.textDefault : copy.textLarge}
              </button>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          className="accessibility-toolbar-option"
          aria-pressed={preferences.contrast}
          onClick={() =>
            setPreferences((value) => ({ ...value, contrast: !value.contrast }))
          }
        >
          <span>{copy.contrast}</span>
          <span aria-hidden="true">
            {preferences.contrast ? copy.contrastOn : copy.contrastOff}
          </span>
        </button>
        <button
          type="button"
          className="accessibility-toolbar-option"
          aria-pressed={paused}
          onClick={() => onPausedChange(!paused)}
        >
          <span>{copy.motion}</span>
          <span aria-hidden="true">
            {paused ? copy.motionOff : copy.motionOn}
          </span>
        </button>
        <button
          type="button"
          className="accessibility-toolbar-reset"
          onClick={reset}
        >
          {copy.reset}
        </button>
      </div>
    </aside>
  );
}

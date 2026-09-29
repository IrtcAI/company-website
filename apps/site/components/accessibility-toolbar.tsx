"use client";

import {
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Locale } from "@/lib/content";
import { Accessibility, X } from "lucide-react";

type Preferences = {
  contrast: boolean;
  textSize: "default" | "large";
  motionPaused?: boolean;
};

type Edge = "left" | "right";
type StoredPosition = { edge: Edge; top: number };
type DragSession = {
  pointerId: number;
  startX: number;
  startY: number;
  startTop: number;
  moved: boolean;
};

const storageKey = "irtc-accessibility";
const positionKey = "irtc-accessibility-position";
const dragThreshold = 5;
const keyboardStep = 64;
const edgeMargin = 20;
const headerMargin = 24;
const irisReserve = 92;

function readStoredPosition(): StoredPosition | null {
  try {
    const value = JSON.parse(localStorage.getItem(positionKey) || "null");
    if (!value || (value.edge !== "left" && value.edge !== "right")) {
      return null;
    }
    if (typeof value.top !== "number" || Number.isNaN(value.top)) return null;
    return { edge: value.edge, top: value.top };
  } catch {
    return null;
  }
}

function persistPosition(position: StoredPosition) {
  try {
    localStorage.setItem(positionKey, JSON.stringify(position));
  } catch {}
}

// The toolbar must stay clear of the header above and the Iris launcher
// tucked in the bottom-right corner, so the reserved space differs by edge.
function clampTop(top: number, edge: Edge) {
  const header = document.querySelector<HTMLElement>(".site-header");
  const minTop = (header?.getBoundingClientRect().bottom ?? 96) + headerMargin;
  const bottomReserve = edge === "right" ? irisReserve : edgeMargin;
  const maxTop = Math.max(minTop, window.innerHeight - bottomReserve);
  return Math.min(Math.max(top, minTop), maxTop);
}

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
    dragHint: string;
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
    dragHint:
      "Arraste este botão para reposicioná-lo, ou foque nele e use Alt mais as setas do teclado.",
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
    dragHint:
      "Drag this button to reposition it, or focus it and use Alt plus the arrow keys.",
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
    dragHint:
      "Arrastra este botón para reposicionarlo, o enfócalo y usa Alt más las flechas del teclado.",
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
  const toolbar = useRef<HTMLElement>(null);
  const dragSession = useRef<DragSession | null>(null);
  const suppressClick = useRef(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [edge, setEdge] = useState<Edge>("left");
  const [preferences, setPreferences] = useState<Preferences>({
    contrast: false,
    textSize: "default",
  });

  useLayoutEffect(() => {
    const saved = readStoredPosition();
    const el = toolbar.current;
    if (!saved || !el) return;
    el.dataset.edge = saved.edge;
    el.style.setProperty("--a11y-top", `${clampTop(saved.top, saved.edge)}px`);
    setEdge(saved.edge);
  }, []);

  useEffect(() => {
    function handleResize() {
      const el = toolbar.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = clampTop(rect.top + rect.height / 2, edge);
      el.style.setProperty("--a11y-top", `${top}px`);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [edge]);

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

  function movePosition(nextEdge: Edge, nextTop: number) {
    const el = toolbar.current;
    if (!el) return;
    // Flip the edge attribute before touching the transform variables so the
    // browser only ever sees the new edge's formula, never a stale one.
    el.dataset.edge = nextEdge;
    el.style.removeProperty("--a11y-drag-x");
    el.style.setProperty("--a11y-top", `${nextTop}px`);
    setEdge(nextEdge);
    persistPosition({ edge: nextEdge, top: nextTop });
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const el = toolbar.current;
    if (!el) return;
    suppressClick.current = false;
    const rect = el.getBoundingClientRect();
    dragSession.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTop: rect.top + rect.height / 2,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const session = dragSession.current;
    if (!session || session.pointerId !== event.pointerId) return;
    const dx = event.clientX - session.startX;
    const dy = event.clientY - session.startY;
    if (!session.moved) {
      if (Math.hypot(dx, dy) < dragThreshold) return;
      session.moved = true;
      suppressClick.current = true;
      toolbar.current?.setAttribute("data-dragging", "true");
    }
    toolbar.current?.style.setProperty("--a11y-drag-x", `${dx}px`);
    toolbar.current?.style.setProperty(
      "--a11y-top",
      `${session.startTop + dy}px`,
    );
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const session = dragSession.current;
    if (!session || session.pointerId !== event.pointerId) return;
    dragSession.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const el = toolbar.current;
    if (!session.moved || !el) return;
    el.removeAttribute("data-dragging");
    const rect = el.getBoundingClientRect();
    const nextEdge: Edge =
      rect.left + rect.width / 2 < window.innerWidth / 2 ? "left" : "right";
    const nextTop = clampTop(
      session.startTop + (event.clientY - session.startY),
      nextEdge,
    );
    movePosition(nextEdge, nextTop);
  }

  function handleTriggerClick() {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setOpen(true);
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!event.altKey) return;
    const el = toolbar.current;
    if (!el) return;
    let nextEdge = edge;
    let delta = 0;
    if (event.key === "ArrowLeft") nextEdge = "left";
    else if (event.key === "ArrowRight") nextEdge = "right";
    else if (event.key === "ArrowUp") delta = -keyboardStep;
    else if (event.key === "ArrowDown") delta = keyboardStep;
    else return;
    event.preventDefault();
    const rect = el.getBoundingClientRect();
    const nextTop = clampTop(rect.top + rect.height / 2 + delta, nextEdge);
    movePosition(nextEdge, nextTop);
  }

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
      ref={toolbar}
      className="accessibility-toolbar"
      aria-label={copy.title}
      data-open={open}
      data-edge={edge}
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
        aria-describedby="accessibility-toolbar-hint"
        onClick={handleTriggerClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleTriggerKeyDown}
      >
        <Accessibility aria-hidden="true" />
      </button>
      <p id="accessibility-toolbar-hint" className="sr-only">
        {copy.dragHint}
      </p>
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

"use client";

import {
  KeyboardEvent,
  PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AArrowDown,
  AArrowUp,
  Accessibility,
  ALargeSmall,
  CaseSensitive,
  Contrast,
  Pause,
  RotateCcw,
  Type,
  X,
  type LucideIcon,
} from "lucide-react";
import type { content } from "@/lib/content";
import {
  applyTextScale,
  textScale,
  textSizes,
  type TextSize,
} from "@/lib/text-scale";

export type AccessibilityLabels = (typeof content)["pt-BR"]["accessibility"];

type Edge = "left" | "right" | "top" | "bottom";
type Position = { edge: Edge; ratio: number };
type Preferences = {
  contrast: boolean;
  textSize: TextSize;
  motionPaused?: boolean;
};
type DragSession = {
  pointerId: number;
  startX: number;
  startY: number;
  moved: boolean;
};

const storageKey = "irtc-accessibility";
const positionKey = "irtc-accessibility-position";
const triggerSize = 48;
const edgeMargin = 12;
const panelGap = 10;
const dragThreshold = 5;
const keyboardStep = 64;
const defaultPosition: Position = { edge: "left", ratio: 0.5 };

const sizeIcons: Record<TextSize, LucideIcon> = {
  default: Type,
  small: AArrowDown,
  medium: CaseSensitive,
  large: AArrowUp,
  extra: ALargeSmall,
};

const isEdge = (value: unknown): value is Edge =>
  value === "left" ||
  value === "right" ||
  value === "top" ||
  value === "bottom";

const isVertical = (edge: Edge) => edge === "left" || edge === "right";

function viewport() {
  return {
    width: document.documentElement.clientWidth || window.innerWidth,
    height: window.innerHeight,
  };
}

function readPosition(): Position {
  try {
    const value = JSON.parse(localStorage.getItem(positionKey) || "null");
    if (!value || !isEdge(value.edge)) return defaultPosition;
    if (typeof value.ratio === "number" && Number.isFinite(value.ratio))
      return { edge: value.edge, ratio: value.ratio };
    // Positions saved before the toolbar could sit on any edge stored pixels.
    if (typeof value.top === "number" && Number.isFinite(value.top))
      return { edge: value.edge, ratio: value.top / window.innerHeight };
  } catch {}
  return defaultPosition;
}

function persistPosition(position: Position) {
  try {
    localStorage.setItem(positionKey, JSON.stringify(position));
  } catch {}
}

function readPreferences(): Preferences {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      contrast: value.contrast === true,
      textSize: textSizes.includes(value.textSize) ? value.textSize : "default",
      motionPaused:
        typeof value.motionPaused === "boolean"
          ? value.motionPaused
          : undefined,
    };
  } catch {
    return { contrast: false, textSize: "default" };
  }
}

function triggerOrigin({ edge, ratio }: Position) {
  const { width, height } = viewport();
  const length = isVertical(edge) ? height : width;
  const half = triggerSize / 2;
  const along =
    Math.min(
      Math.max(ratio * length, edgeMargin + half),
      length - edgeMargin - half,
    ) - half;

  if (edge === "left") return { x: 0, y: along };
  if (edge === "right") return { x: width - triggerSize, y: along };
  if (edge === "top") return { x: along, y: 0 };
  return { x: along, y: height - triggerSize };
}

function panelOrigin(
  edge: Edge,
  trigger: { x: number; y: number },
  panel: { width: number; height: number },
) {
  const { width, height } = viewport();
  const clamp = (value: number, size: number, limit: number) =>
    Math.min(Math.max(value, edgeMargin), limit - size - edgeMargin);
  const centerX = trigger.x + triggerSize / 2 - panel.width / 2;
  const centerY = trigger.y + triggerSize / 2 - panel.height / 2;

  if (edge === "left")
    return {
      x: triggerSize + panelGap,
      y: clamp(centerY, panel.height, height),
    };
  if (edge === "right")
    return {
      x: width - triggerSize - panelGap - panel.width,
      y: clamp(centerY, panel.height, height),
    };
  if (edge === "top")
    return {
      x: clamp(centerX, panel.width, width),
      y: triggerSize + panelGap,
    };
  return {
    x: clamp(centerX, panel.width, width),
    y: height - triggerSize - panelGap - panel.height,
  };
}

function nearestEdge(x: number, y: number): Position {
  const { width, height } = viewport();
  const distances: [Edge, number][] = [
    ["left", x],
    ["right", width - x],
    ["top", y],
    ["bottom", height - y],
  ];
  const [edge] = distances.sort((first, second) => first[1] - second[1])[0];
  return { edge, ratio: isVertical(edge) ? y / height : x / width };
}

export function AccessibilityToolbar({
  labels,
  paused,
  onPausedChange,
}: {
  labels: AccessibilityLabels;
  paused: boolean;
  onPausedChange: (paused: boolean) => void;
}) {
  const toolbar = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const dragSession = useRef<DragSession | null>(null);
  const suppressClick = useRef(false);

  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [preferences, setPreferences] = useState<Preferences>({
    contrast: false,
    textSize: "default",
  });

  const place = useCallback(() => {
    const element = toolbar.current;
    const box = panel.current;
    if (!element || !box) return;

    const origin = triggerOrigin(position);
    element.dataset.placed = "true";
    element.style.setProperty("--a11y-x", `${origin.x}px`);
    element.style.setProperty("--a11y-y", `${origin.y}px`);

    const target = panelOrigin(position.edge, origin, {
      width: box.offsetWidth,
      height: box.offsetHeight,
    });
    element.style.setProperty("--a11y-panel-x", `${target.x}px`);
    element.style.setProperty("--a11y-panel-y", `${target.y}px`);
  }, [position]);

  const placeLatest = useRef(place);

  useLayoutEffect(() => {
    placeLatest.current = place;
  }, [place]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = readPreferences();
      setPosition(readPosition());
      setPreferences(saved);
      if (saved.motionPaused !== undefined) onPausedChange(saved.motionPaused);
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [onPausedChange]);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.dataset.accessibilityText = preferences.textSize;
    root.dataset.accessibilityContrast = String(preferences.contrast);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ ...preferences, motionPaused: paused }),
      );
    } catch {}
  }, [paused, preferences, ready]);

  useEffect(() => {
    if (!ready) return;
    const scale = textScale[preferences.textSize];
    const apply = () => {
      applyTextScale(document.body, scale);
      placeLatest.current();
    };
    apply();
    if (scale === 1) return;

    // Iris replies, route changes and breakpoints all bring text that was
    // never measured, so the scale is re-applied once the page settles.
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(apply, 150);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", schedule);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      applyTextScale(document.body, 1);
    };
  }, [preferences.textSize, ready]);

  useLayoutEffect(() => {
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place, open]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!toolbar.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function move({ edge, ratio }: Position) {
    const next = { edge, ratio: Math.round(ratio * 10_000) / 10_000 };
    setPosition(next);
    persistPosition(next);
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    suppressClick.current = false;
    dragSession.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const session = dragSession.current;
    const element = toolbar.current;
    if (!session || !element || session.pointerId !== event.pointerId) return;

    if (!session.moved) {
      const distance = Math.hypot(
        event.clientX - session.startX,
        event.clientY - session.startY,
      );
      if (distance < dragThreshold) return;
      session.moved = true;
      suppressClick.current = true;
      setOpen(false);
      element.dataset.dragging = "true";
    }

    element.style.setProperty(
      "--a11y-x",
      `${event.clientX - triggerSize / 2}px`,
    );
    element.style.setProperty(
      "--a11y-y",
      `${event.clientY - triggerSize / 2}px`,
    );
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const session = dragSession.current;
    if (!session || session.pointerId !== event.pointerId) return;
    dragSession.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (!session.moved) return;

    delete toolbar.current?.dataset.dragging;
    const next = nearestEdge(event.clientX, event.clientY);
    move(next);
    if (next.edge === position.edge && next.ratio === position.ratio) place();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!event.altKey) return;
    const vertical = isVertical(position.edge);
    const { width, height } = viewport();
    const step = keyboardStep / (vertical ? height : width);
    const moves: Record<string, Position> = vertical
      ? {
          ArrowUp: { ...position, ratio: position.ratio - step },
          ArrowDown: { ...position, ratio: position.ratio + step },
          ArrowLeft: { ...position, edge: "left" },
          ArrowRight: { ...position, edge: "right" },
        }
      : {
          ArrowLeft: { ...position, ratio: position.ratio - step },
          ArrowRight: { ...position, ratio: position.ratio + step },
          ArrowUp: { ...position, edge: "top" },
          ArrowDown: { ...position, edge: "bottom" },
        };
    const next = moves[event.key];
    if (!next) return;
    event.preventDefault();
    move({ ...next, ratio: Math.min(Math.max(next.ratio, 0), 1) });
  }

  function handleTriggerClick() {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setOpen((value) => !value);
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
      aria-label={labels.title}
      data-open={open}
      data-edge={position.edge}
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
        aria-label={labels.open}
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
        {labels.dragHint}
      </p>
      <div
        ref={panel}
        className="accessibility-toolbar-panel"
        id="accessibility-toolbar-panel"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="accessibility-toolbar-heading">
          <p>{labels.title}</p>
          <button type="button" aria-label={labels.close} onClick={close}>
            <X aria-hidden="true" />
          </button>
        </div>
        <fieldset>
          <legend>{labels.text}</legend>
          <div className="accessibility-toolbar-size">
            {textSizes.map((size) => {
              const Icon = sizeIcons[size];
              return (
                <button
                  key={size}
                  type="button"
                  data-size={size}
                  aria-pressed={preferences.textSize === size}
                  onClick={() =>
                    setPreferences((value) => ({ ...value, textSize: size }))
                  }
                >
                  <Icon aria-hidden="true" />
                  <span>{labels.sizes[size]}</span>
                </button>
              );
            })}
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
          <Contrast aria-hidden="true" />
          <span>{labels.contrast}</span>
          <span aria-hidden="true">
            {preferences.contrast ? labels.on : labels.off}
          </span>
        </button>
        <button
          type="button"
          className="accessibility-toolbar-option"
          aria-pressed={paused}
          onClick={() => onPausedChange(!paused)}
        >
          <Pause aria-hidden="true" />
          <span>{labels.motion}</span>
          <span aria-hidden="true">
            {paused ? labels.motionOff : labels.motionOn}
          </span>
        </button>
        <button
          type="button"
          className="accessibility-toolbar-reset"
          onClick={reset}
        >
          <RotateCcw aria-hidden="true" />
          {labels.reset}
        </button>
      </div>
    </aside>
  );
}

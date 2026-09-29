"use client";

import { RefObject, useEffect, useRef } from "react";
import { preload } from "react-dom";
import { StudioKind, studioPoster } from "@/lib/studio-kinds";

const idle = typeof requestIdleCallback === "function";

const whenIdle = (callback: () => void) =>
  idle
    ? requestIdleCallback(callback, { timeout: 2500 })
    : window.setTimeout(callback, 1200);

const cancelIdle = (handle: number) =>
  idle ? cancelIdleCallback(handle) : window.clearTimeout(handle);

export function StudioSlot({
  kind,
  className = "",
  lazy = false,
}: {
  kind: StudioKind;
  className?: string;
  lazy?: boolean;
}) {
  if (!lazy) preload(studioPoster(kind), { as: "image", fetchPriority: "low" });
  return (
    <div className={`studio-slot ${className}`} data-studio-slot={kind}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={studioPoster(kind)}
        alt=""
        width={480}
        height={480}
        decoding="async"
        loading={lazy ? "lazy" : "eager"}
        fetchPriority={lazy ? "low" : "auto"}
        draggable={false}
      />
    </div>
  );
}

export function useStudioStage(
  host: RefObject<HTMLElement | null>,
  {
    paused,
    progress,
    active,
  }: {
    paused: boolean;
    progress?: () => number;
    active?: () => boolean;
  },
) {
  const motion = useRef(paused);
  const stage = useRef<{ update(): void; destroy(): void } | null>(null);
  const driver = useRef({ progress, active });

  useEffect(() => {
    driver.current = { progress, active };
  });

  useEffect(() => {
    motion.current = paused;
    stage.current?.update();
  }, [paused]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const media = matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let near = false;
    let generation = 0;
    let pending = 0;

    const release = () => {
      stage.current?.destroy();
      stage.current = null;
    };
    const load = async (request: number) => {
      try {
        const { createStage } = await import("@/lib/studio-scene");
        if (request !== generation || stage.current) return;
        const slots = [
          ...element.querySelectorAll<HTMLElement>("[data-studio-slot]"),
        ].map((slot) => ({
          element: slot,
          kind: slot.dataset.studioSlot as StudioKind,
        }));
        const { progress, active } = driver.current;
        stage.current = createStage(element, slots, {
          paused: () => motion.current,
          progress: progress && (() => driver.current.progress?.() ?? 0),
          active: active && (() => driver.current.active?.() ?? true),
        });
      } catch {
        element.dataset.fallback = "true";
      }
    };
    const configure = () => {
      const request = ++generation;
      cancelIdle(pending);
      if (!media.matches) return release();
      if (!near || stage.current) return;
      pending = whenIdle(() => void load(request));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        configure();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(element);
    media.addEventListener("change", configure);

    return () => {
      generation++;
      cancelIdle(pending);
      observer.disconnect();
      media.removeEventListener("change", configure);
      release();
    };
  }, [host]);
}

"use client";

import { useEffect, useRef } from "react";

export function HeroWorld({ paused }: { paused: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const motion = useRef(paused);

  useEffect(() => {
    motion.current = paused;
  }, [paused]);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout>;
    let visible = true;
    let generation = 0;
    const element = mount.current;
    if (!element) return;
    const capable = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const configure = () => {
      const request = ++generation;
      clearTimeout(timer);
      if (!capable.matches) {
        cleanup?.();
        cleanup = undefined;
        delete element.dataset.ready;
        return;
      }
      if (cleanup || !visible) return;
      timer = setTimeout(async () => {
        try {
          const { createWorld } = await import("@/lib/hero-world");
          if (!disposed && request === generation)
            cleanup = createWorld(element, () => motion.current);
        } catch {
          element.dataset.fallback = "true";
        }
      }, 3000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      configure();
    });
    observer.observe(element);
    capable.addEventListener("change", configure);
    configure();
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      capable.removeEventListener("change", configure);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={mount} className="hero-world" aria-hidden="true">
      <div className="world-fallback">
        <span className="fallback-terminal">&gt;_</span>
        <span className="fallback-code">&lt;/&gt;</span>
        <span className="fallback-phone" />
      </div>
    </div>
  );
}

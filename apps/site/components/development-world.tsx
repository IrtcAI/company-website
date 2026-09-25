"use client";

import { useEffect, useRef } from "react";

export function DevelopmentWorld({ paused }: { paused: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const motion = useRef(paused);

  useEffect(() => {
    motion.current = paused;
    window.dispatchEvent(new Event("irtc-motion-change"));
  }, [paused]);

  useEffect(() => {
    const element = mount.current;
    const section = element?.closest<HTMLElement>(".solutions");
    if (!element || !section) return;
    const media = matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    let generation = 0;
    let release: (() => void) | undefined;
    const configure = async () => {
      const request = ++generation;
      if (!media.matches) {
        release?.();
        release = undefined;
        return;
      }
      if (!visible || release) return;
      try {
        const { createDevelopmentWorld } = await import(
          "@/lib/development-world"
        );
        if (request === generation)
          release = createDevelopmentWorld(
            element,
            section,
            () => motion.current,
          );
      } catch {
        element.dataset.fallback = "true";
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        void configure();
      },
      { rootMargin: "200px" },
    );
    observer.observe(section);
    media.addEventListener("change", configure);
    return () => {
      generation++;
      observer.disconnect();
      media.removeEventListener("change", configure);
      release?.();
    };
  }, []);

  return (
    <div className="development-backdrop" aria-hidden="true">
      <div className="development-world" ref={mount} />
    </div>
  );
}

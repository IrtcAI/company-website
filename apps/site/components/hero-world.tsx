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
    if (window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)").matches)
      return;
    const timer = window.setTimeout(async () => {
      try {
        const { createWorld } = await import("@/lib/hero-world");
        if (!disposed && mount.current)
          cleanup = createWorld(mount.current, () => motion.current);
      } catch {
        mount.current?.setAttribute("data-fallback", "true");
      }
    }, 3000);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
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

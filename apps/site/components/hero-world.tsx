"use client";

import { useCallback, useRef } from "react";
import { useShell } from "./shell-provider";
import { StudioSlot, useStudioStage } from "./studio-stage";

export function HeroWorld() {
  const { paused } = useShell();
  const mount = useRef<HTMLDivElement>(null);

  const active = useCallback(() => {
    const story = mount.current?.closest<HTMLElement>(".intro-story");
    return Number(story?.dataset.progress ?? 0) < 0.5;
  }, []);

  useStudioStage(mount, { paused, active });

  return (
    <div ref={mount} className="hero-world studio-world" aria-hidden="true">
      <span className="fallback-terminal">&gt;_</span>
      <StudioSlot kind="phone" className="hero-phone" />
      <StudioSlot kind="browser" className="hero-browser" />
      <StudioSlot kind="robot" className="hero-robot" />
      <StudioSlot kind="database" className="hero-database" />
      <StudioSlot kind="server" className="hero-server" />
    </div>
  );
}

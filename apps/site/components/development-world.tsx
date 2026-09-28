"use client";

import { useCallback, useEffect, useRef } from "react";
import { StudioKind } from "@/lib/studio-kinds";
import { StudioSlot, useStudioStage } from "./studio-stage";

export function DevelopmentWorld({
  paused,
  kind = "browser",
}: {
  paused: boolean;
  kind?: StudioKind;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const frozen = useRef(0);
  const motion = useRef(paused);

  useEffect(() => {
    motion.current = paused;
  }, [paused]);

  const progress = useCallback(() => {
    const element = mount.current;
    const section = element?.parentElement?.parentElement;
    if (!element || !section) return 0;
    if (!motion.current) {
      const bounds = section.getBoundingClientRect();
      frozen.current = Math.max(
        0,
        Math.min(1, (innerHeight - bounds.top) / (bounds.height + innerHeight)),
      );
      element.dataset.progress = frozen.current.toFixed(3);
    }
    return frozen.current;
  }, []);

  useStudioStage(mount, { paused, progress });

  return (
    <div className={`development-backdrop backdrop-${kind}`} aria-hidden="true">
      <div className="development-world" ref={mount}>
        <StudioSlot kind={kind} className="development-slot" lazy />
      </div>
    </div>
  );
}

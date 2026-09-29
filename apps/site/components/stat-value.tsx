"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { formatStat, type Stat } from "@/lib/stats";

const COUNT_UP_MS = 1100;

export function StatValue({ stat, locale }: { stat: Stat; locale: Locale }) {
  const finalText = formatStat(stat, locale);
  const [display, setDisplay] = useState(finalText);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animated.current) return;
          animated.current = true;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / COUNT_UP_MS, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(formatStat(stat, locale, stat.value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [locale, stat]);

  return (
    <span
      ref={ref}
      className="stat-value"
      style={{ minWidth: `${finalText.length}ch` }}
    >
      {display}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { company } from "@/lib/company";
import { formatStat, stats, statsHeading, type Stat } from "@/lib/stats";
import {
  projectLonLat,
  WORLD_LAND_DOTS,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/world-map";

const BELEM = projectLonLat(company.geo.longitude, company.geo.latitude);
const COUNT_UP_MS = 1100;

function StatValue({ stat, locale }: { stat: Stat; locale: Locale }) {
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
            setDisplay(
              formatStat(stat, locale, Math.round(stat.value * eased)),
            );
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

export function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="stats-band" aria-labelledby="stats-heading">
      <svg
        className="stats-map"
        viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
        aria-hidden="true"
      >
        <path className="stats-map-land" d={WORLD_LAND_DOTS} />
        <circle className="stats-map-belem" cx={BELEM[0]} cy={BELEM[1]} r="5" />
      </svg>
      <div className="stats-content section-pad">
        <h2 id="stats-heading" className="sr-only">
          {statsHeading[locale]}
        </h2>
        <dl className="stats-grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.id}>
              <dt>
                <StatValue stat={stat} locale={locale} />
              </dt>
              <dd>{stat.label[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

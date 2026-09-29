import type { Locale } from "@/lib/content";
import { company } from "@/lib/company";
import { stats, statsHeading } from "@/lib/stats";
import { StatValue } from "./stat-value";
import {
  projectLonLat,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/world-map";

const BELEM = projectLonLat(company.geo.longitude, company.geo.latitude);

export function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="stats-band" aria-labelledby="stats-heading">
      <span className="stats-map stats-map-land" aria-hidden="true" />
      <svg
        className="stats-map"
        viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
        aria-hidden="true"
      >
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

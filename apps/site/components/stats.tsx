import type { Locale } from "@/lib/content";
import { stats, statsHeading } from "@/lib/stats";
import { StatValue } from "./stat-value";

export function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="stats-band" aria-labelledby="stats-heading">
      <div className="stats-content section-pad">
        <div className="stats-mark" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="stats-asterisk">
            <path d="M100 18v164M29 59l142 82M29 141l142-82" />
          </svg>
        </div>
        <h2 id="stats-heading" className="stats-heading">
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

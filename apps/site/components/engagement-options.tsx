import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { engagementCopy } from "@/lib/copy/engagement";
import { pagePath } from "@/lib/routes";
import { services } from "@/lib/services";
import "@/styles/engagement.css";

export function EngagementOptions({ locale }: { locale: Locale }) {
  const copy = engagementCopy[locale];
  return (
    <section
      className="engagement section-pad"
      aria-labelledby="engagement-title"
    >
      <h2 id="engagement-title">{copy.title}</h2>
      <p className="engagement-intro">{copy.intro}</p>
      <div className="engagement-grid">
        {copy.items.map((item) => {
          const service = services.find(
            (service) => service.id === item.service,
          )!;
          return (
            <article className="engagement-card" key={item.service}>
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
              <dl>
                <dt>{copy.deliveryLabel}</dt>
                <dd>{item.delivery}</dd>
                <dt>{copy.decisionLabel}</dt>
                <dd>{item.decision}</dd>
              </dl>
              <Link
                className="pill-link"
                href={pagePath(locale, "services", service.copy[locale].slug)}
                aria-label={`${copy.link}: ${item.title}`}
              >
                {copy.link}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

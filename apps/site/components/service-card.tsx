import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "./service-icon";
import { ServiceVisual } from "./service-visual";

export function ServiceCard({
  service,
  locale,
  cta,
}: {
  service: Service;
  locale: Locale;
  cta: string;
}) {
  const copy = service.copy[locale];
  return (
    <Link
      href={pagePath(locale, "services", copy.slug)}
      className="service-card"
      data-reveal
    >
      <span className="service-card-visual">
        <ServiceVisual id={service.id} accent={service.accent} />
        <span className="service-card-icon">
          <ServiceIcon icon={service.icon} />
        </span>
      </span>
      <h3>{copy.title}</h3>
      <p>{copy.summary}</p>
      <span className="service-card-link">
        {cta}
        <ArrowUpRight aria-hidden="true" />
      </span>
    </Link>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { useCaseCopy } from "@/lib/copy/use-case";
import { pagePath } from "@/lib/routes";
import { services } from "@/lib/services";
import "@/styles/service-page.css";
import "@/styles/service-visuals.css";

export function UseCase({ locale }: { locale: Locale }) {
  const copy = useCaseCopy[locale];
  const service = services.find((service) => service.id === copy.service)!;

  return (
    <div className="sp" data-accent="sage">
      <section
        className="sp-section sp-band use-case section-pad"
        aria-labelledby="use-case-title"
      >
        <p className="overline">{copy.label}</p>
        <h2 id="use-case-title">{copy.title}</h2>
        <p className="use-case-intro">{copy.intro}</p>
        <ol className="sp-how">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span className="sp-how-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="use-case-note">{copy.measure}</p>
        <p className="use-case-note">{copy.note}</p>
        <Link
          className="pill-link"
          href={pagePath(locale, "services", service.copy[locale].slug)}
        >
          {copy.link}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}

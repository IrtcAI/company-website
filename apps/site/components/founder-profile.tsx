import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { company } from "@/lib/company";
import { founderCopy } from "@/lib/copy/founder";
import { pagePath, sectionPath } from "@/lib/routes";

export function FounderProfile({ locale }: { locale: Locale }) {
  const copy = founderCopy[locale];
  const home = pagePath(locale, "home");
  const testimonials = sectionPath(locale, "depoimentos");

  return (
    <>
      <nav
        className="breadcrumbs section-pad"
        aria-label={copy.breadcrumbLabel}
      >
        <ol>
          <li>
            <Link href={home}>{copy.breadcrumbHome}</Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight />
          </li>
          <li aria-current="page">{copy.breadcrumbCurrent}</li>
        </ol>
      </nav>
      <section
        className="founder-hero section-pad"
        aria-labelledby="founder-hero-title"
      >
        <figure className="founder-hero-portrait">
          <Image
            src="/founder.webp"
            alt={copy.portraitAlt}
            width={640}
            height={640}
            sizes="(max-width: 767px) 80vw, 420px"
            priority
          />
        </figure>
        <div className="founder-hero-copy">
          <p className="overline">{copy.eyebrow}</p>
          <h1 id="founder-hero-title">{company.founder.name}</h1>
          <p className="founder-hero-role">{copy.role}</p>
          <p className="founder-hero-intro">{copy.intro}</p>
        </div>
      </section>
      <section className="founder-bio section-pad">
        {copy.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section
        className="founder-expertise section-pad"
        aria-labelledby="founder-expertise-title"
      >
        <h2 id="founder-expertise-title">{copy.expertiseTitle}</h2>
        <ul className="founder-expertise-grid">
          {copy.expertise.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section
        className="founder-highlights section-pad"
        aria-labelledby="founder-highlights-title"
      >
        <h2 id="founder-highlights-title">{copy.highlightsTitle}</h2>
        <p className="founder-highlights-intro">{copy.highlightsIntro}</p>
        <ul className="founder-highlights-grid">
          {copy.highlights.map((item) => (
            <li key={item.name}>
              <p className="overline">{item.name}</p>
              <p>{item.text}</p>
              <div className="founder-highlight-metric">
                <strong>{item.metric}</strong>
                <span>{item.metricLabel}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section
        className="founder-testimonials section-pad"
        aria-labelledby="founder-testimonials-title"
      >
        <h2 id="founder-testimonials-title">{copy.testimonialsTitle}</h2>
        <p>{copy.testimonialsText}</p>
        <Link href={testimonials} className="inline-link">
          {copy.testimonialsLink}
        </Link>
      </section>
      <p className="founder-linkedin section-pad">
        <a
          href={company.founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-link"
        >
          {copy.linkedinLabel}
          <span>
            <BriefcaseBusiness aria-hidden="true" />
          </span>
        </a>
      </p>
    </>
  );
}

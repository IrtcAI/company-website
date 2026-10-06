import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { aboutCopy } from "@/lib/copy/about";
import { pagePath } from "@/lib/routes";

export function AboutContent({ locale }: { locale: Locale }) {
  const copy = aboutCopy[locale];
  const home = pagePath(locale, "home");
  const founder = pagePath(locale, "founder");
  const foundationPages = [null, "mission", "vision"] as const;

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
        className="about-intro section-pad"
        aria-labelledby="about-intro-title"
      >
        <p className="overline">{copy.eyebrow}</p>
        <h1 id="about-intro-title">{copy.introTitle}</h1>
        {copy.introText.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section
        className="about-foundations section-pad"
        aria-labelledby="about-foundations-title"
      >
        <h2 id="about-foundations-title">{copy.foundationsTitle}</h2>
        <ul className="about-foundations-grid">
          {copy.foundations.map((item, index) => {
            const page = foundationPages[index];
            return (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {page ? (
                  <Link
                    href={pagePath(locale, page)}
                    className="inline-link"
                    aria-label={`${copy.readMore}: ${item.title}`}
                  >
                    {copy.readMore}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
      <section
        className="about-values section-pad"
        aria-labelledby="about-values-title"
      >
        <h2 id="about-values-title">{copy.valuesTitle}</h2>
        <ul className="about-values-grid">
          {copy.values.map((value) => (
            <li key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
        <Link href={pagePath(locale, "culture")} className="inline-link">
          {copy.cultureLink}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section
        className="about-how section-pad"
        aria-labelledby="about-how-title"
      >
        <h2 id="about-how-title">{copy.howTitle}</h2>
        <p className="about-how-text">{copy.howText}</p>
      </section>
      <section
        className="about-founder-link section-pad"
        aria-labelledby="about-founder-link-title"
      >
        <h2 id="about-founder-link-title">{copy.founderTitle}</h2>
        <p>{copy.founderText}</p>
        <Link href={founder} className="inline-link">
          {copy.founderLink}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}

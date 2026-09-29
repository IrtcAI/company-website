import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { aboutCopy } from "@/lib/copy/about";
import { pagePath } from "@/lib/routes";

export function AboutContent({ locale }: { locale: Locale }) {
  const copy = aboutCopy[locale];
  const origin = content[locale].origin;
  const home = pagePath(locale, "home");
  const founder = pagePath(locale, "founder");

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
        <p>{copy.introText}</p>
      </section>
      <section
        className="about-vision section-pad"
        aria-labelledby="about-vision-title"
      >
        <h2 id="about-vision-title">{copy.visionTitle}</h2>
        <p>{origin.vision}</p>
      </section>
      <section
        className="about-values section-pad"
        aria-labelledby="about-values-title"
      >
        <h2 id="about-values-title">{copy.valuesTitle}</h2>
        <ul className="about-values-grid">
          {copy.values.map((value) => (
            <li key={value.title}>
              <strong>{value.title}</strong>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section
        className="about-how section-pad"
        aria-labelledby="about-how-title"
      >
        <h2 id="about-how-title">{copy.howTitle}</h2>
        <p className="about-how-intro">{copy.howIntro}</p>
        <ol className="about-how-steps">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span className="about-how-index" aria-hidden="true">
                0{index + 1}
              </span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
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

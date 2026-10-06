import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { aboutCopy } from "@/lib/copy/about";
import { cultureCopy, missionCopy, visionCopy } from "@/lib/copy/culture";
import { pagePath, type Page } from "@/lib/routes";
import "@/styles/culture.css";

type BrandPage = "culture" | "mission" | "vision";

const pageLabels = {
  culture: (locale: Locale) => cultureCopy[locale].breadcrumbCurrent,
  mission: (locale: Locale) => missionCopy[locale].breadcrumbCurrent,
  vision: (locale: Locale) => visionCopy[locale].breadcrumbCurrent,
};

const order: BrandPage[] = ["culture", "mission", "vision"];

function staggerStyle(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

function Breadcrumb({
  locale,
  label,
  home,
  current,
}: {
  locale: Locale;
  label: string;
  home: string;
  current: string;
}) {
  return (
    <nav className="breadcrumbs section-pad" aria-label={label}>
      <ol>
        <li>
          <Link href={pagePath(locale, "home")}>{home}</Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight />
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

function Story({
  tag,
  title,
  paragraphs,
  signature,
  className,
}: {
  tag: string;
  title: string;
  paragraphs: string[];
  signature?: string;
  className: string;
}) {
  return (
    <section
      className={`brand-story section-pad ${className}`}
      aria-labelledby={`${className}-title`}
    >
      <div className="brand-story-inner" data-reveal>
        <p className="brand-story-tag">{tag}</p>
        <h2 id={`${className}-title`}>{title}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="brand-story-text">
            {paragraph}
          </p>
        ))}
        {signature ? (
          <p className="brand-story-signature">{signature}</p>
        ) : null}
      </div>
    </section>
  );
}

function Related({
  locale,
  current,
  title,
}: {
  locale: Locale;
  current: BrandPage;
  title: string;
}) {
  const links: { page: Page; label: string }[] = [
    ...order
      .filter((page) => page !== current)
      .map((page) => ({ page, label: pageLabels[page](locale) })),
    { page: "about", label: aboutCopy[locale].breadcrumbCurrent },
  ];

  return (
    <section
      className="brand-related section-pad"
      aria-labelledby={`related-${current}`}
    >
      <h2 id={`related-${current}`}>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.page}>
            <Link href={pagePath(locale, link.page)}>
              {link.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CulturePage({ locale }: { locale: Locale }) {
  const copy = cultureCopy[locale];
  const about = aboutCopy[locale];

  return (
    <>
      <Breadcrumb
        locale={locale}
        label={copy.breadcrumbLabel}
        home={copy.breadcrumbHome}
        current={copy.breadcrumbCurrent}
      />
      <section
        className="brand-hero culture-hero section-pad"
        aria-labelledby="culture-hero-title"
      >
        <span className="culture-hero-ring" aria-hidden="true" />
        <span className="culture-hero-dot" aria-hidden="true" />
        <div data-reveal>
          <p className="overline">{copy.eyebrow}</p>
          <h1 id="culture-hero-title">{copy.title}</h1>
          <p className="brand-hero-intro">{copy.intro}</p>
        </div>
      </section>
      <Story
        className="culture-story"
        tag={copy.storyTag}
        title={copy.storyTitle}
        paragraphs={copy.story}
      />
      <section
        className="culture-practices section-pad"
        aria-labelledby="culture-practices-title"
      >
        <h2 id="culture-practices-title">{copy.practicesTitle}</h2>
        <ol>
          {copy.practices.map((practice, index) => (
            <li key={practice.title} data-reveal style={staggerStyle(index)}>
              <span className="culture-practice-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{practice.title}</h3>
              <p className="culture-practice-line">{practice.line}</p>
              <p>{practice.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="culture-values section-pad"
        aria-labelledby="culture-values-title"
      >
        <h2 id="culture-values-title">{copy.valuesTitle}</h2>
        <p className="brand-lead">{copy.valuesText}</p>
        <ul>
          {about.values.map((value) => (
            <li key={value.title}>{value.title}</li>
          ))}
        </ul>
        <Link href={pagePath(locale, "about")} className="inline-link">
          {copy.valuesLink}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section
        className="culture-ai section-pad"
        aria-labelledby="culture-ai-title"
      >
        <h2 id="culture-ai-title">{copy.aiTitle}</h2>
        <p className="brand-lead">{copy.aiIntro}</p>
        <ul>
          {copy.ai.map((item, index) => (
            <li key={item.title} data-reveal style={staggerStyle(index)}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <Related locale={locale} current="culture" title={copy.relatedTitle} />
    </>
  );
}

export function MissionPage({ locale }: { locale: Locale }) {
  const copy = missionCopy[locale];
  const [purpose, mission] = aboutCopy[locale].foundations;

  return (
    <>
      <Breadcrumb
        locale={locale}
        label={copy.breadcrumbLabel}
        home={copy.breadcrumbHome}
        current={copy.breadcrumbCurrent}
      />
      <section
        className="brand-hero mission-hero section-pad"
        aria-labelledby="mission-hero-title"
      >
        <div data-reveal>
          <p className="overline">{copy.eyebrow}</p>
          <h1 id="mission-hero-title">{copy.title}</h1>
          <p className="brand-hero-intro">{copy.intro}</p>
          <blockquote className="mission-statement">{mission.text}</blockquote>
          <p className="mission-purpose">
            <strong>{copy.purposeLabel}.</strong> {purpose.text}
          </p>
        </div>
      </section>
      <section
        className="mission-path section-pad"
        aria-labelledby="mission-path-title"
      >
        <h2 id="mission-path-title">{copy.pathTitle}</h2>
        <p className="brand-lead">{copy.pathIntro}</p>
        <ol>
          {copy.steps.map((step, index) => (
            <li key={step.title} data-reveal style={staggerStyle(index)}>
              <span className="mission-step-number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="mission-verbs section-pad"
        aria-labelledby="mission-verbs-title"
      >
        <h2 id="mission-verbs-title">{copy.verbsTitle}</h2>
        <ul>
          {copy.verbs.map((verb, index) => (
            <li key={verb.title} data-reveal style={staggerStyle(index)}>
              <h3>{verb.title}</h3>
              <p>{verb.text}</p>
            </li>
          ))}
        </ul>
        <h2 id="mission-commitments-title" className="mission-commitments-h">
          {copy.commitmentsTitle}
        </h2>
        <ul
          className="mission-commitments"
          aria-labelledby="mission-commitments-title"
        >
          {copy.commitments.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <Story
        className="mission-story"
        tag={copy.storyTag}
        title={copy.storyTitle}
        paragraphs={copy.story}
      />
      <Related locale={locale} current="mission" title={copy.relatedTitle} />
    </>
  );
}

export function VisionPage({ locale }: { locale: Locale }) {
  const copy = visionCopy[locale];
  const vision = aboutCopy[locale].foundations[2];

  return (
    <>
      <Breadcrumb
        locale={locale}
        label={copy.breadcrumbLabel}
        home={copy.breadcrumbHome}
        current={copy.breadcrumbCurrent}
      />
      <section
        className="brand-hero vision-hero section-pad"
        aria-labelledby="vision-hero-title"
      >
        <div data-reveal>
          <p className="overline">{copy.eyebrow}</p>
          <h1 id="vision-hero-title">{copy.title}</h1>
          <p className="brand-hero-intro">{copy.intro}</p>
        </div>
        <figure className="vision-horizon">
          <svg
            viewBox="0 0 1200 360"
            role="img"
            aria-label={copy.horizonAlt}
            preserveAspectRatio="xMidYMax slice"
          >
            <rect className="vision-sky" width="1200" height="360" />
            <circle className="vision-sun" cx="820" cy="190" r="74" />
            <path
              className="vision-forest"
              d="M0 212 L40 190 L80 208 L130 176 L180 204 L240 182 L300 206 L360 188 L420 208 L470 192 L540 210 L540 240 L0 240 Z"
            />
            <g className="vision-river">
              <path
                className="vision-wave vision-wave-1"
                d="M-200 232 C-100 220 0 244 100 232 S300 220 400 232 S600 244 700 232 S900 220 1000 232 S1200 244 1300 232 S1500 220 1600 232 V360 H-200 Z"
              />
              <path
                className="vision-wave vision-wave-2"
                d="M-200 268 C-100 256 0 280 100 268 S300 256 400 268 S600 280 700 268 S900 256 1000 268 S1200 280 1300 268 S1500 256 1600 268 V360 H-200 Z"
              />
              <path
                className="vision-wave vision-wave-3"
                d="M-200 304 C-100 292 0 316 100 304 S300 292 400 304 S600 316 700 304 S900 292 1000 304 S1200 316 1300 304 S1500 292 1600 304 V360 H-200 Z"
              />
            </g>
          </svg>
        </figure>
        <blockquote className="vision-statement" data-reveal>
          {vision.text}
        </blockquote>
      </section>
      <section
        className="vision-parts section-pad"
        aria-labelledby="vision-parts-title"
      >
        <h2 id="vision-parts-title">{copy.partsTitle}</h2>
        <ul>
          {copy.parts.map((part, index) => (
            <li key={part.title} data-reveal style={staggerStyle(index)}>
              <h3>{part.title}</h3>
              <p>{part.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <Story
        className="vision-story"
        tag={copy.storyTag}
        title={copy.storyTitle}
        paragraphs={copy.story}
        signature={copy.signature}
      />
      <Related locale={locale} current="vision" title={copy.relatedTitle} />
    </>
  );
}

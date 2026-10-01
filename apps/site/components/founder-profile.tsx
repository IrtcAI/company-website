import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Compass,
  GraduationCap,
  Goal,
  Heart,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import { company } from "@/lib/company";
import { founderCopy } from "@/lib/copy/founder";
import { pagePath } from "@/lib/routes";

const beyondIcons = {
  family: Heart,
  belem: Compass,
  football: Goal,
  mentoring: GraduationCap,
} as const;

function staggerStyle(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

export function FounderProfile({ locale }: { locale: Locale }) {
  const copy = founderCopy[locale];
  const home = pagePath(locale, "home");

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
        <figure className="founder-hero-portrait" data-reveal>
          <span
            className="founder-frame-block founder-frame-coral"
            aria-hidden="true"
          />
          <span
            className="founder-frame-block founder-frame-mint"
            aria-hidden="true"
          />
          <div className="founder-frame-photo">
            <Image
              src="/founder.webp"
              alt={copy.portraitAlt}
              fill
              sizes="(max-width: 767px) 80vw, 420px"
              priority
              className="founder-frame-img"
            />
          </div>
          <span className="founder-frame-stamp" aria-hidden="true">
            irtc
          </span>
          <span className="founder-frame-coordinate" aria-hidden="true">
            01°27′ S · 48°30′ W
          </span>
        </figure>
        <div className="founder-hero-copy" data-reveal>
          <p className="overline">{copy.eyebrow}</p>
          <h1 id="founder-hero-title">
            <span className="founder-signature">{company.founder.name}</span>
          </h1>
          <p className="founder-hero-role">{copy.role}</p>
          <p className="founder-hero-intro">{copy.intro}</p>
        </div>
      </section>
      <section className="founder-bio section-pad" data-reveal>
        {copy.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section
        className="founder-beyond section-pad"
        aria-labelledby="founder-beyond-title"
      >
        <h2 id="founder-beyond-title">{copy.beyondTitle}</h2>
        <ul className="founder-beyond-grid">
          {copy.beyondWork.map((item, index) => {
            const Icon = beyondIcons[item.icon];
            return (
              <li key={item.title} data-reveal style={staggerStyle(index)}>
                <Icon aria-hidden="true" />
                <strong>{item.title}</strong>
                <p>{item.line}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <section
        className="founder-expertise section-pad"
        aria-labelledby="founder-expertise-title"
      >
        <h2 id="founder-expertise-title">{copy.expertiseTitle}</h2>
        <p className="founder-expertise-intro">{copy.expertiseIntro}</p>
        <ul className="founder-expertise-grid">
          {copy.expertise.map((item, index) => (
            <li key={item} data-reveal style={staggerStyle(index)}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

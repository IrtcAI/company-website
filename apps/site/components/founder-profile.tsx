import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Cat,
  ChevronRight,
  Clapperboard,
  ExternalLink,
  Gamepad2,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import { company } from "@/lib/company";
import { founderCopy, type OutsideIcon } from "@/lib/copy/founder";
import { pagePath } from "@/lib/routes";

const outsideIcons: Record<OutsideIcon, typeof Cat> = {
  game: Gamepad2,
  film: Clapperboard,
  cats: Cat,
};

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
              src="/founder-profile.webp"
              alt={copy.portraitAlt}
              width={900}
              height={1190}
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
          <a
            className="founder-linkedin"
            href={company.founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.linkedinLabel}
            <ExternalLink aria-hidden="true" />
            <span className="sr-only"> ({copy.linkedinNewTab})</span>
          </a>
        </div>
      </section>
      <section className="founder-bio section-pad" data-reveal>
        {copy.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section
        className="founder-story section-pad"
        aria-labelledby="founder-story-title"
      >
        <div className="founder-story-head" data-reveal>
          <p className="overline">{copy.storyTag}</p>
          <h2 id="founder-story-title">{copy.storyTitle}</h2>
          <p className="founder-story-lead">{copy.storyLead}</p>
        </div>
        <ol className="founder-story-steps">
          {copy.story.map((block, index) => (
            <li key={block.kicker} data-reveal style={staggerStyle(index)}>
              <span className="founder-story-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{block.kicker}</h3>
              <p>{block.text}</p>
            </li>
          ))}
        </ol>
        <p className="founder-story-closing" data-reveal>
          {copy.storyClosing}
        </p>
      </section>
      <section
        className="founder-outside section-pad"
        aria-labelledby="founder-outside-title"
      >
        <h2 id="founder-outside-title">{copy.outsideTitle}</h2>
        <p className="founder-expertise-intro">{copy.outsideIntro}</p>
        <ul className="founder-outside-grid">
          {copy.outside.map((card, index) => {
            const Icon = outsideIcons[card.icon];
            return (
              <li key={card.title} data-reveal style={staggerStyle(index)}>
                <span className="founder-outside-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
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

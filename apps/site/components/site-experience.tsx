"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Cloud,
  ExternalLink,
  MessageCircle,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import {
  content,
  Locale,
  projectBrands,
  recommendationAuthors,
} from "@/lib/content";
import {
  projectLonLat,
  WORLD_LAND_DOTS,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/world-map";
import { services } from "@/lib/services";
import { HeroWorld } from "./hero-world";
import { ScrollStory } from "./scroll-story";
import { Founder } from "./founder";
import { DevelopmentWorld } from "./development-world";
import { ServiceCard } from "./service-card";
import { ContactCta } from "./contact-cta";
import { useShell } from "./site-shell";
import { pagePath } from "@/lib/routes";

const techNames = [
  "Node.js",
  "Next.js",
  "React",
  "PostgreSQL",
  "Redis",
  "AWS",
  "GitHub",
  "NestJS",
];

const techSlugs = [
  "nodedotjs",
  "nextdotjs",
  "react",
  "postgresql",
  "redis",
  "amazonwebservices",
  "github",
  "nestjs",
];

const BELEM = projectLonLat(-48.4902, -1.4558);
const SAO_PAULO = projectLonLat(-46.63, -23.55);
const NEW_YORK = projectLonLat(-74.01, 40.71);

function originArc(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  bend: number,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / length) * bend;
  const cy = my + (dx / length) * bend;
  return `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`;
}

const ROUTE_SAO_PAULO = originArc(BELEM, SAO_PAULO, 22);
const ROUTE_NEW_YORK = originArc(BELEM, NEW_YORK, -28);

const REACH = (
  [
    [-122.42, 37.77],
    [-79.38, 43.65],
    [-58.38, -34.6],
    [-74.07, 4.71],
    [-9.14, 38.72],
    [-0.13, 51.51],
    [13.4, 52.52],
    [3.38, 6.52],
    [36.82, -1.29],
    [18.42, -33.92],
    [55.27, 25.2],
    [103.82, 1.35],
    [139.69, 35.68],
    [151.21, -33.87],
    [174.76, -36.85],
  ] as const
).map(([lon, lat]) => {
  const point = projectLonLat(lon, lat);
  const length = Math.hypot(point[0] - BELEM[0], point[1] - BELEM[1]);
  return { point, route: originArc(BELEM, point, -length * 0.22) };
});

function SectionLink({
  target,
  children,
  className,
  label,
  current,
}: {
  target: string;
  children: ReactNode;
  className?: string;
  label?: string;
  current?: boolean;
}) {
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const destination = document.getElementById(target);
    if (!destination) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    const story = destination.hasAttribute("data-scroll-stage")
      ? destination.closest<HTMLElement>('.intro-story[data-enhanced="true"]')
      : null;

    if (story)
      window.scrollTo({
        top: story.offsetTop + story.offsetHeight - window.innerHeight,
        behavior,
      });
    else destination.scrollIntoView({ behavior });

    destination.focus({ preventScroll: true });
    event.currentTarget.closest("details")?.removeAttribute("open");
  }

  return (
    <Link
      href="/"
      prefetch={false}
      onClick={navigate}
      className={className}
      aria-label={label}
      aria-current={current ? "location" : undefined}
    >
      {children}
    </Link>
  );
}

function TypedHeadline({
  paused,
  words,
}: {
  paused: boolean;
  words: string[];
}) {
  const [word, setWord] = useState(words[0]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0;
    let length = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (paused || reduced.matches) return;
      const current = words[index];
      length += deleting ? -1 : 1;
      setWord(current.slice(0, length));
      let delay = deleting ? 32 : 85;
      if (length === 0) {
        index = (index + 1) % words.length;
        deleting = false;
        delay = 220;
      } else if (length === current.length) {
        deleting = true;
        delay = 2300;
      }
      timer = setTimeout(tick, delay);
    };

    const restart = () => {
      clearTimeout(timer);
      timer = setTimeout(tick, 6000);
    };

    restart();
    reduced.addEventListener("change", restart);

    return () => {
      clearTimeout(timer);
      reduced.removeEventListener("change", restart);
    };
  }, [paused, words]);

  return (
    <span className="typed-line" aria-hidden="true">
      {word}
      <span className="typing-caret" />
    </span>
  );
}

export function SiteExperience({ locale = "pt-BR" }: { locale?: Locale }) {
  const copy = content[locale];
  const { paused, setPaused } = useShell();

  const [recommendation, setRecommendation] = useState(0);
  const [project, setProject] = useState(0);

  const currentProject = {
    ...projectBrands[project],
    ...copy.projects.cases[project],
  };
  const author = recommendationAuthors[recommendation];
  const contact = pagePath(locale, "contact");

  return (
    <>
      <ScrollStory locale={locale} paused={paused}>
        <section
          className="hero"
          id="inicio"
          tabIndex={-1}
          aria-labelledby="hero-title"
        >
          <HeroWorld paused={paused} />
          <div className="hero-content">
            <p className="eyebrow">
              <span />
              {copy.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              <span>{copy.hero.title}</span>
              <TypedHeadline
                key={locale}
                paused={paused}
                words={copy.hero.words}
              />
              <span className="sr-only">{copy.hero.words.join(" ")}</span>
            </h1>
            <p className="hero-description">{copy.hero.description}</p>
            <Link href={contact} className="hero-start">
              {copy.hero.cta}
              <span>
                <MessageCircle aria-hidden="true" />
              </span>
            </Link>
          </div>
          <div className="hero-bottom">
            <span>{copy.hero.label}</span>
            <SectionLink
              target="manifesto"
              className="scroll-cue"
              label={copy.hero.explore}
            >
              <ArrowDown aria-hidden="true" />
            </SectionLink>
            <button
              className="motion-toggle"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <Play aria-hidden="true" />
              ) : (
                <Pause aria-hidden="true" />
              )}
              {paused ? copy.hero.play : copy.hero.pause}
            </button>
          </div>
        </section>
      </ScrollStory>
      <section className="solutions section-pad" id="servicos" tabIndex={-1}>
        <DevelopmentWorld paused={paused} />
        <div className="section-label">
          <span>{copy.solutions.label}</span>
          <span>{copy.solutions.aside}</span>
        </div>
        <div className="solution-heading">
          <h2 data-reveal>
            {copy.solutions.title}
            <br />
            <span>{copy.solutions.accent}</span>
          </h2>
          <p className="solutions-intro">{copy.solutions.intro}</p>
        </div>
        <div className="service-grid home-service-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
              cta={copy.solutions.cardCta}
            />
          ))}
        </div>
        <Link
          href={pagePath(locale, "services")}
          className="inline-link services-all-link"
        >
          {copy.solutions.allServices}
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <div className="tech-playground">
          <h3>{copy.solutions.techTitle}</h3>
          <div
            className="tech-tokens"
            role="list"
            aria-label={copy.solutions.techTitle}
          >
            {techNames.map((name, index) => (
              <div
                key={name}
                className={`tech-token token-${index}`}
                role="listitem"
              >
                <span className="tech-token-face">
                  {index === 5 ? (
                    <Cloud aria-hidden="true" />
                  ) : (
                    <Image
                      src={`/technologies/${techSlugs[index]}.svg`}
                      alt=""
                      width={40}
                      height={40}
                    />
                  )}
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <ContactCta locale={locale} />
      </section>
      <section className="client-strip" aria-label={copy.clients}>
        <p>{copy.clients}</p>
        <div className="client-names">
          {projectBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noreferrer"
              className={`brand-logo ${brand.theme}`}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={180}
                height={52}
              />
            </a>
          ))}
        </div>
      </section>
      <div className="object-run">
        <DevelopmentWorld paused={paused} kind="database" />
        <section className="projects section-pad" id="projetos" tabIndex={-1}>
          <div className="section-label">
            <span>{copy.projects.label}</span>
            <span>{copy.projects.aside}</span>
          </div>
          <div className="section-title-row" data-reveal>
            <h2>
              {copy.projects.title}
              <br />
              <span>{copy.projects.accent}</span>
            </h2>
            <p>{copy.projects.intro}</p>
          </div>
          <div
            className="project-selector"
            role="group"
            aria-label={copy.projects.choose}
          >
            {projectBrands.map((item, index) => (
              <button
                key={item.name}
                aria-pressed={project === index}
                onClick={() => setProject(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
                <span className="selected-indicator">
                  {project === index ? (
                    <CircleCheck aria-hidden="true" />
                  ) : (
                    <Plus aria-hidden="true" />
                  )}
                </span>
              </button>
            ))}
          </div>
          <article className="project-feature" key={currentProject.name}>
            <div className={`project-visual ${currentProject.theme}`}>
              <div className="project-orb" aria-hidden="true" />
              <a
                className="product-window real-product"
                href={currentProject.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${copy.projects.visit}: ${currentProject.name} (${new URL(currentProject.url).hostname})`}
              >
                <div className="window-bar" aria-hidden="true">
                  <span className="window-dots">● ● ●</span>
                  <span>{new URL(currentProject.url).hostname}</span>
                  <ExternalLink />
                </div>
                <div className="real-product-content">
                  <Image
                    src={currentProject.image}
                    alt={`${currentProject.name} — ${currentProject.category}`}
                    width={900}
                    height={620}
                    sizes="(max-width: 760px) 90vw, 48vw"
                  />
                </div>
              </a>
            </div>
            <div className="project-info">
              <p className="overline">{currentProject.category}</p>
              <h3>{currentProject.title}</h3>
              <p>{currentProject.description}</p>
              <div className="project-result">
                <strong>{currentProject.metric}</strong>
                <span>{currentProject.result}</span>
              </div>
              <p className="project-stack">{currentProject.stack}</p>
              <details className="project-details">
                <summary>
                  {copy.projects.details}
                  <Plus aria-hidden="true" />
                </summary>
                <p>{currentProject.detail}</p>
                <a href={currentProject.url} target="_blank" rel="noreferrer">
                  {copy.projects.visit}
                  <ExternalLink aria-hidden="true" />
                </a>
              </details>
            </div>
          </article>
          <p className="project-source">{copy.projects.source}</p>
        </section>
        <section
          className="testimonials section-pad"
          id="depoimentos"
          tabIndex={-1}
        >
          <div className="section-label">
            <span>{copy.testimonials.label}</span>
          </div>
          <div className="testimonial-layout">
            <div>
              <h2 data-reveal>
                {copy.testimonials.title}
                <br />
                <span>{copy.testimonials.accent}</span>
              </h2>
              <p>{copy.testimonials.intro}</p>
              <div className="testimonial-controls">
                <button
                  aria-label={copy.testimonials.previous}
                  onClick={() =>
                    setRecommendation(
                      (recommendation + recommendationAuthors.length - 1) %
                        recommendationAuthors.length,
                    )
                  }
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <span>
                  0{recommendation + 1} / 0{recommendationAuthors.length}
                </span>
                <button
                  aria-label={copy.testimonials.next}
                  onClick={() =>
                    setRecommendation(
                      (recommendation + 1) % recommendationAuthors.length,
                    )
                  }
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <figure
                className={`quote-card ${recommendation % 2 ? "peach" : "mint"}`}
                key={author.name}
              >
                <MessageCircle className="quote-symbol" aria-hidden="true" />
                <p className="recommendation-summary">
                  {copy.testimonials.summaries[recommendation]}
                </p>
                <figcaption>
                  <span className="quote-avatar" aria-hidden="true">
                    {author.initials}
                  </span>
                  <span>
                    <strong>{author.name}</strong>
                    <span>{author.role}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>
      <div className="object-run">
        <DevelopmentWorld paused={paused} kind="server" />
        <section className="origin section-pad">
          <figure
            className="origin-figure"
            aria-labelledby="origin-map-title"
            aria-describedby="origin-map-description"
          >
            <div className="origin-network" aria-hidden="true">
              <svg
                className="world-map"
                viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
              >
                <path className="world-land" d={WORLD_LAND_DOTS} />
                {REACH.map(({ point, route }) => (
                  <g className="network-reach" key={route}>
                    <path d={route} />
                    <circle cx={point[0]} cy={point[1]} r="3" />
                  </g>
                ))}
                <path className="network-route" d={ROUTE_SAO_PAULO} />
                <path className="network-route route-two" d={ROUTE_NEW_YORK} />
                <circle
                  className="network-pulse"
                  cx={BELEM[0]}
                  cy={BELEM[1]}
                  r="20"
                  style={{ transformOrigin: `${BELEM[0]}px ${BELEM[1]}px` }}
                />
                <circle
                  className="network-hub"
                  cx={BELEM[0]}
                  cy={BELEM[1]}
                  r="6"
                />
                <circle
                  className="network-dest"
                  cx={SAO_PAULO[0]}
                  cy={SAO_PAULO[1]}
                  r="4.5"
                />
                <circle
                  className="network-dest dest-two"
                  cx={NEW_YORK[0]}
                  cy={NEW_YORK[1]}
                  r="4.5"
                />
              </svg>
              <span className="network-coordinates">01°27′ S · 48°30′ W</span>
              <span
                className="network-belem"
                style={{
                  left: `${(BELEM[0] / WORLD_MAP_WIDTH) * 100}%`,
                  top: `${(BELEM[1] / WORLD_MAP_HEIGHT) * 100}%`,
                }}
              >
                Belém
              </span>
            </div>
            <figcaption className="network-caption">
              <strong id="origin-map-title">{copy.origin.mapTitle}</strong>
              <span id="origin-map-description">
                {copy.origin.mapDescription}
              </span>
            </figcaption>
          </figure>
          <div data-reveal>
            <p className="overline">{copy.origin.label}</p>
            <h2>
              {copy.origin.title}
              <br />
              <span>{copy.origin.accent}</span>
            </h2>
            <p>{copy.origin.body}</p>
            <p>{copy.origin.vision}</p>
            <Link href={contact} className="inline-link">
              {copy.origin.cta}
              <MessageCircle aria-hidden="true" />
            </Link>
          </div>
        </section>
        <Founder locale={locale} />
      </div>
    </>
  );
}

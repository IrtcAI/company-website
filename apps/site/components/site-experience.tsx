import Image from "next/image";
import Link from "next/link";
import { Bot, Cloud, MessageCircle, Sparkles } from "lucide-react";
import { content, Locale } from "@/lib/content";
import { pagePath } from "@/lib/routes";
import {
  projectLonLat,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/world-map";
import "@/styles/pillars.css";
import { ContactCta } from "./contact-cta";
import { DevelopmentWorld } from "./development-world";
import { Founder } from "./founder";
import { HomeHero } from "./home-hero";
import { HomePillars } from "./home-pillars";

const focusIcons = [
  <Cloud key="aws" aria-hidden="true" />,
  <Sparkles key="bedrock" aria-hidden="true" />,
  <Bot key="agents" aria-hidden="true" />,
  <Image
    key="mcp"
    src="/technologies/modelcontextprotocol.svg"
    alt=""
    width={40}
    height={40}
  />,
];

const productTech = [
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "PostgreSQL", slug: "postgresql" },
];

const BELEM = projectLonLat(-48.4902, -1.4558);

export function SiteExperience({ locale = "pt-BR" }: { locale?: Locale }) {
  const copy = content[locale];
  const contact = pagePath(locale, "contact");
  const servicesHref = pagePath(locale, "services");

  return (
    <>
      <HomeHero
        copy={{ hero: copy.hero, manifesto: copy.manifesto }}
        contact={contact}
        services={servicesHref}
      />
      <section className="solutions section-pad" id="servicos" tabIndex={-1}>
        <DevelopmentWorld />
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
        </div>
        <HomePillars copy={copy.solutions} href={servicesHref} />
        <div className="tech-playground">
          <h3>{copy.solutions.techTitle}</h3>
          <div
            className="tech-tokens tech-tokens-focus"
            role="list"
            aria-label={copy.solutions.techTitle}
          >
            {copy.solutions.techFocus.map((tech, index) => (
              <div
                key={tech.name}
                className={`tech-token token-${index}`}
                role="listitem"
              >
                <span className="tech-token-face">{focusIcons[index]}</span>
                <strong>{tech.name}</strong>
                <span className="tech-token-role">{tech.role}</span>
              </div>
            ))}
          </div>
          <p className="tech-product-title">
            {copy.solutions.techProductTitle}
          </p>
          <div
            className="tech-tokens tech-tokens-product"
            role="list"
            aria-label={copy.solutions.techProductTitle}
          >
            {productTech.map((tech, index) => (
              <div
                key={tech.name}
                className={`tech-token token-${index}`}
                role="listitem"
              >
                <span className="tech-token-face">
                  <Image
                    src={`/technologies/${tech.slug}.svg`}
                    alt=""
                    width={40}
                    height={40}
                  />
                </span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <ContactCta
          locale={locale}
          title={copy.solutions.cta.title}
          text={copy.solutions.cta.text}
          action={copy.solutions.cta.action}
          irisLabel={copy.solutions.cta.iris}
        />
      </section>
      <div className="object-run">
        <DevelopmentWorld kind="server" />
        <section className="origin section-pad">
          <figure
            className="origin-figure"
            aria-labelledby="origin-map-title"
            aria-describedby="origin-map-description"
          >
            <div className="origin-network" aria-hidden="true">
              <span className="world-land" />
              <svg
                className="world-map"
                viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
                data-reveal
              >
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

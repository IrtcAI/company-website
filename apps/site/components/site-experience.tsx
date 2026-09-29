import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cloud, MessageCircle } from "lucide-react";
import {
  content,
  Locale,
  projectBrands,
  recommendationAuthors,
} from "@/lib/content";
import { pagePath } from "@/lib/routes";
import { services } from "@/lib/services";
import {
  projectLonLat,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/world-map";
import { ContactCta } from "./contact-cta";
import { DevelopmentWorld } from "./development-world";
import { Founder } from "./founder";
import { HomeHero } from "./home-hero";
import { ProjectShowcase } from "./project-showcase";
import { ServiceCard } from "./service-card";
import { Stats } from "./stats";
import { Testimonials } from "./testimonials";

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

export function SiteExperience({ locale = "pt-BR" }: { locale?: Locale }) {
  const copy = content[locale];
  const contact = pagePath(locale, "contact");

  return (
    <>
      <HomeHero
        copy={{ hero: copy.hero, manifesto: copy.manifesto }}
        contact={contact}
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
      <Stats locale={locale} />
      <div className="object-run">
        <DevelopmentWorld kind="database" />
        <ProjectShowcase copy={copy.projects} brands={projectBrands} />
        <Testimonials
          copy={copy.testimonials}
          authors={recommendationAuthors}
        />
      </div>
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
              >
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

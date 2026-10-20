import { addressLines, company, openingHours } from "./company";
import { content, type Locale } from "./content";
import { aboutCopy } from "./copy/about";
import { cultureCopy, missionCopy, visionCopy } from "./copy/culture";
import { founderCopy, founderSectionCopy } from "./copy/founder";
import { homeCopy, pageCopy } from "./copy/pages";
import { servicesPageCopy } from "./copy/services-page";
import {
  absoluteUrl,
  locales,
  markdownPath,
  pagePath,
  type Page,
} from "./routes";
import {
  pillarNames,
  pillars,
  relatedServices,
  serviceSlugs,
  services,
  type Service,
} from "./services";
import { stats, statsHeading, formatStat } from "./stats";

export type SitePage = {
  locale: Locale;
  page: Page;
  path: string;
  slugs?: Record<Locale, string>;
  service?: Service;
};

export type MarkdownPage = SitePage & {
  title: string;
  description: string;
  markdown: string;
};

const pageOrder: Page[] = [
  "home",
  "services",
  "about",
  "founder",
  "culture",
  "mission",
  "vision",
  "contact",
];

export function sitePages(): SitePage[] {
  return pageOrder.flatMap((page) => [
    ...locales.map((locale) => ({
      locale,
      page,
      path: pagePath(locale, page),
    })),
    ...(page === "services"
      ? services.flatMap((service) => {
          const slugs = serviceSlugs(service);
          return locales.map((locale) => ({
            locale,
            page,
            slugs,
            service,
            path: pagePath(locale, page, slugs[locale]),
          }));
        })
      : []),
  ]);
}

function routePath(path: string) {
  return path === "/" ? "/md/index" : `/md${path}`;
}

// Serves each page's Markdown copy at <page>.md, and at the page's own URL when
// the client asks for text/markdown first (coding agents do; browsers never).
export function markdownRewrites() {
  return sitePages().flatMap(({ path }) => [
    { source: markdownPath(path), destination: routePath(path) },
    {
      source: path,
      has: [
        {
          type: "header" as const,
          key: "accept",
          value: "text/markdown.*",
        },
      ],
      destination: routePath(path),
    },
  ]);
}

function heading(level: number, text: string) {
  return `${"#".repeat(level)} ${text}`;
}

function link(label: string, path: string) {
  return `[${label}](${path.startsWith("http") || path.startsWith("mailto:") ? path : absoluteUrl(path)})`;
}

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numbered(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function titled(level: number, items: { title: string; text: string }[]) {
  return items.flatMap((item) => [heading(level, item.title), item.text]);
}

function joined(title: string, accent?: string) {
  return accent ? `${title} ${accent}` : title;
}

function document(...blocks: (string | false | undefined)[]) {
  return `${blocks.filter(Boolean).join("\n\n")}\n`;
}

function home(locale: Locale) {
  const copy = content[locale];
  const founder = founderSectionCopy[locale];
  const { solutions, manifesto, origin, hero } = copy;

  return document(
    heading(1, hero.title),
    hero.eyebrow,
    hero.description,
    heading(2, joined(manifesto.title, manifesto.accent)),
    manifesto.foot,
    ...titled(3, manifesto.points),
    heading(2, joined(solutions.title, solutions.accent)),
    ...solutions.pillars.flatMap((pillar) => [
      heading(3, pillar.name),
      pillar.text,
    ]),
    heading(3, solutions.continuity.name),
    `${solutions.continuity.label}: ${solutions.continuity.text}`,
    link(solutions.allServices, pagePath(locale, "services")),
    heading(3, solutions.techTitle),
    bullets(solutions.techFocus.map((tech) => `${tech.name}: ${tech.role}`)),
    heading(2, solutions.cta.title),
    solutions.cta.text,
    link(solutions.cta.action, pagePath(locale, "contact")),
    heading(2, joined(origin.title, origin.accent)),
    origin.body,
    origin.mapDescription,
    heading(2, joined(founder.title, founder.accent)),
    founder.intro,
    founder.body,
    founder.location,
    link(founder.link, pagePath(locale, "founder")),
  );
}

function serviceItem(locale: Locale, service: Service) {
  const copy = service.copy[locale];
  return `${link(copy.title, pagePath(locale, "services", copy.slug))}: ${copy.summary}`;
}

function servicesIndex(locale: Locale) {
  const copy = servicesPageCopy[locale];

  return document(
    heading(1, pageCopy.services[locale].heading ?? copy.breadcrumbServices),
    copy.intro,
    heading(2, copy.gridTitle),
    ...pillars.flatMap((pillar) => [
      heading(3, pillarNames[pillar]),
      copy.pillarText[pillar],
      bullets(
        services
          .filter((service) => service.pillar === pillar)
          .map((service) => serviceItem(locale, service)),
      ),
    ]),
    heading(2, copy.continuity.name),
    `${copy.continuity.label}: ${copy.continuity.text}`,
    heading(2, copy.techNoteTitle),
    ...(["aws", "bedrock", "mcp"] as const).flatMap((id) => [
      heading(3, copy.stack[id].name),
      copy.stack[id].role,
    ]),
    copy.techNoteText,
  );
}

function servicePage(locale: Locale, service: Service) {
  const copy = service.copy[locale];
  const page = servicesPageCopy[locale];
  const support = service.supportPillars
    ?.map((pillar) => pillarNames[pillar])
    .join(", ");

  return document(
    heading(1, copy.title),
    [
      `${page.pillarLabel}: ${pillarNames[service.pillar]}`,
      support ? `${page.supportPillarLabel}: ${support}` : "",
    ]
      .filter(Boolean)
      .join(" · "),
    copy.intro,
    heading(2, page.whenTitle),
    bullets(copy.problems),
    heading(2, page.whatTitle),
    service.deliverablesLayout === "timeline"
      ? numbered(copy.deliverables)
      : bullets(copy.deliverables),
    heading(2, page.measureTitle),
    bullets(copy.measure),
    page.measureNote,
    heading(2, page.stackTitle),
    ...service.stack.flatMap((id) => [
      heading(3, page.stack[id].name),
      page.stack[id].role,
    ]),
    page.stackNote,
    heading(2, page.howTitle),
    ...titled(3, content[locale].manifesto.points),
    heading(2, page.faqTitle),
    ...copy.faq.flatMap((item) => [heading(3, item.question), item.answer]),
    heading(2, page.relatedTitle),
    bullets(relatedServices(service).map((item) => serviceItem(locale, item))),
  );
}

function about(locale: Locale) {
  const copy = aboutCopy[locale];
  const foundationPages = [null, "mission", "vision"] as const;

  return document(
    heading(1, copy.introTitle),
    ...copy.introText,
    heading(2, copy.foundationsTitle),
    ...copy.foundations.flatMap((item, index) => {
      const page = foundationPages[index];
      return [
        heading(3, item.title),
        item.text,
        page ? link(copy.readMore, pagePath(locale, page)) : "",
      ];
    }),
    heading(2, copy.valuesTitle),
    ...titled(3, copy.values),
    link(copy.cultureLink, pagePath(locale, "culture")),
    heading(2, copy.howTitle),
    copy.howText,
    heading(2, copy.founderTitle),
    copy.founderText,
    link(copy.founderLink, pagePath(locale, "founder")),
    heading(2, copy.galleryTitle),
    copy.galleryIntro,
    stats.length > 0 && heading(2, statsHeading[locale]),
    stats.length > 0 &&
      bullets(
        stats.map(
          (stat) => `${formatStat(stat, locale)}: ${stat.label[locale]}`,
        ),
      ),
  );
}

function founderPage(locale: Locale) {
  const copy = founderCopy[locale];

  return document(
    heading(1, company.founder.name),
    copy.role,
    copy.intro,
    link(copy.linkedinLabel, company.founder.linkedin),
    ...copy.bio,
    heading(2, copy.storyTitle),
    copy.storyLead,
    ...copy.story.flatMap((block, index) => [
      heading(3, `${index + 1}. ${block.kicker}`),
      block.text,
    ]),
    copy.storyClosing,
    heading(2, copy.outsideTitle),
    copy.outsideIntro,
    ...titled(3, copy.outside),
    heading(2, copy.expertiseTitle),
    copy.expertiseIntro,
    bullets(copy.expertise),
  );
}

function related(
  locale: Locale,
  current: "culture" | "mission" | "vision",
  title: string,
) {
  const labels = {
    culture: cultureCopy[locale].breadcrumbCurrent,
    mission: missionCopy[locale].breadcrumbCurrent,
    vision: visionCopy[locale].breadcrumbCurrent,
  };
  const pages = (["culture", "mission", "vision"] as const).filter(
    (page) => page !== current,
  );

  return [
    heading(2, title),
    bullets([
      ...pages.map((page) => link(labels[page], pagePath(locale, page))),
      link(aboutCopy[locale].breadcrumbCurrent, pagePath(locale, "about")),
    ]),
  ];
}

function culture(locale: Locale) {
  const copy = cultureCopy[locale];

  return document(
    heading(1, copy.title),
    copy.intro,
    heading(2, copy.storyTitle),
    ...copy.story,
    heading(2, copy.practicesTitle),
    ...copy.practices.flatMap((practice, index) => [
      heading(3, `${index + 1}. ${practice.title}`),
      practice.line,
      practice.text,
    ]),
    heading(2, copy.valuesTitle),
    copy.valuesText,
    bullets(aboutCopy[locale].values.map((value) => value.title)),
    link(copy.valuesLink, pagePath(locale, "about")),
    heading(2, copy.aiTitle),
    copy.aiIntro,
    ...titled(3, copy.ai),
    ...related(locale, "culture", copy.relatedTitle),
  );
}

function mission(locale: Locale) {
  const copy = missionCopy[locale];
  const [purpose, statement] = aboutCopy[locale].foundations;

  return document(
    heading(1, copy.title),
    copy.intro,
    `> ${statement.text}`,
    `${copy.purposeLabel}: ${purpose.text}`,
    heading(2, copy.pathTitle),
    copy.pathIntro,
    ...copy.steps.flatMap((step, index) => [
      heading(3, `${index + 1}. ${step.title}`),
      step.text,
    ]),
    heading(2, copy.verbsTitle),
    ...titled(3, copy.verbs),
    heading(2, copy.commitmentsTitle),
    ...titled(3, copy.commitments),
    heading(2, copy.storyTitle),
    ...copy.story,
    ...related(locale, "mission", copy.relatedTitle),
  );
}

function vision(locale: Locale) {
  const copy = visionCopy[locale];
  const statement = aboutCopy[locale].foundations[2];

  return document(
    heading(1, copy.title),
    copy.intro,
    `> ${statement.text}`,
    heading(2, copy.partsTitle),
    ...titled(3, copy.parts),
    heading(2, copy.storyTitle),
    ...copy.story,
    copy.signature,
    ...related(locale, "vision", copy.relatedTitle),
  );
}

function contact(locale: Locale) {
  const copy = content[locale].contact;
  const hours = openingHours(locale);

  return document(
    heading(1, joined(copy.title, copy.accent)),
    copy.intro,
    heading(2, copy.irisTitle),
    copy.irisText,
    heading(2, copy.channels),
    bullets([
      link(company.email, `mailto:${company.email}`),
      ...addressLines(locale),
      hours.weekdays,
      hours.weekend,
      ...company.socials.map((social) =>
        link(`${social.name} · ${social.handle}`, social.href),
      ),
    ]),
  );
}

function metadata(site: SitePage): Pick<MarkdownPage, "title" | "description"> {
  const { locale, page, service } = site;
  if (service)
    return {
      title: `${service.copy[locale].title} | IRTC`,
      description: service.copy[locale].summary,
    };
  if (page === "home") return homeCopy[locale];
  return pageCopy[page][locale];
}

function body(site: SitePage) {
  const { locale, page, service } = site;
  if (service) return servicePage(locale, service);

  const builders: Record<Page, (locale: Locale) => string> = {
    home,
    services: servicesIndex,
    about,
    founder: founderPage,
    culture,
    mission,
    vision,
    contact,
  };
  return builders[page](locale);
}

export function markdownPages(): MarkdownPage[] {
  return sitePages().map((site) => {
    const { title, description } = metadata(site);
    return { ...site, title, description, markdown: body(site) };
  });
}

export function markdownPage(path: string): MarkdownPage | undefined {
  return markdownPages().find((page) => page.path === path);
}

import { describe, expect, it, vi } from "vitest";
import LocaleLayout from "@/app/[locale]/layout";
import { GET as robotsGet } from "@/app/robots.txt/route";
import { GET as llmFullGet } from "@/app/llms-full.txt/route";
import { GET as llmsGet } from "@/app/llms.txt/route";
import { GET as llmGet } from "@/app/llm.txt/route";
import sitemap from "@/app/sitemap";
import { addressLines, company } from "@/lib/company";
import {
  absoluteUrl,
  internalRedirects,
  localizedRewrites,
  locales,
  pagePath,
  SITE_URL,
} from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { serviceSlugs, services } from "@/lib/services";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-body" }),
}));

const answerEngineBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Googlebot",
  "Applebot",
  "Amazonbot",
  "Meta-ExternalAgent",
];

describe("page language", () => {
  it("sets the html lang of every locale in the server HTML", async () => {
    for (const locale of locales) {
      const layout = await LocaleLayout({
        children: null,
        params: Promise.resolve({ locale }),
      });
      expect(layout.props.lang).toBe(locale);
    }
  });

  it("serves the pt-BR home from the locale route at /", () => {
    expect(localizedRewrites()).toContainEqual({
      source: "/",
      destination: "/pt-BR",
    });
    expect(internalRedirects()).toContainEqual({
      source: "/pt-BR",
      destination: "/",
      permanent: true,
    });
  });

  it("gives every page the share image", () => {
    const metadata = pageMetadata({
      locale: "es",
      page: "about",
      title: "Nosotros",
      description: "Nosotros",
    });
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/opengraph-image" }),
    ]);
    expect(metadata.twitter?.images).toEqual([
      expect.objectContaining({ url: "/opengraph-image" }),
    ]);
  });
});

describe("robots.txt", () => {
  const trainingBots = [
    "GPTBot",
    "ClaudeBot",
    "Google-Extended",
    "Applebot-Extended",
    "Amazonbot",
    "Meta-ExternalAgent",
    "CCBot",
  ];

  async function groups() {
    return (await robotsGet().text())
      .split(/\n\n+/)
      .filter((block) => /User-Agent:/.test(block));
  }

  it("refuses AI training in the content signal of every group", async () => {
    for (const block of await groups())
      expect(block).toContain(
        "Content-Signal: search=yes, ai-input=yes, ai-train=no",
      );
  });

  it("blocks training crawlers from the whole site", async () => {
    const training = (await groups()).filter((block) =>
      block.includes("User-Agent: GPTBot"),
    );
    expect(training).toHaveLength(1);
    for (const bot of trainingBots)
      expect(training[0]).toMatch(new RegExp(`^User-Agent: ${bot}$`, "m"));
    expect(training[0]).toMatch(/^Disallow: \/$/m);
    expect(training[0]).not.toMatch(/^Allow:/m);
  });

  it("lets search and assistant crawlers read everything but the API", async () => {
    const open = (await groups()).filter(
      (block) => !block.includes("User-Agent: GPTBot"),
    );
    expect(open.some((block) => /^User-Agent: \*$/m.test(block))).toBe(true);
    for (const block of open) {
      expect(block).toMatch(/^Allow: \/$/m);
      expect(block).toMatch(/^Disallow: \/api\/$/m);
    }
  });

  it("names the major AI and search crawlers", async () => {
    const text = await robotsGet().text();
    for (const bot of answerEngineBots)
      expect(text).toMatch(new RegExp(`^User-Agent: ${bot}$`, "m"));
  });

  it("declares the sitemap", async () => {
    expect(await robotsGet().text()).toContain(
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    );
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("includes the home page for every locale", () => {
    for (const locale of locales)
      expect(
        entries.some(
          (entry) => entry.url === absoluteUrl(pagePath(locale, "home")),
        ),
      ).toBe(true);
  });

  it("includes every service in every locale with hreflang alternates", () => {
    for (const service of services) {
      const slugs = serviceSlugs(service);
      for (const locale of locales) {
        const entry = entries.find(
          (candidate) =>
            candidate.url ===
            absoluteUrl(pagePath(locale, "services", slugs[locale])),
        );
        expect(entry).toBeDefined();
        expect(entry?.alternates?.languages).toMatchObject({
          "pt-BR": absoluteUrl(pagePath("pt-BR", "services", slugs["pt-BR"])),
          en: absoluteUrl(pagePath("en", "services", slugs.en)),
          es: absoluteUrl(pagePath("es", "services", slugs.es)),
          "x-default": absoluteUrl(
            pagePath("pt-BR", "services", slugs["pt-BR"]),
          ),
        });
      }
    }
  });

  it("includes the services index, about, founder, culture, mission, vision and contact pages for every locale", () => {
    for (const page of [
      "services",
      "about",
      "founder",
      "culture",
      "mission",
      "vision",
      "contact",
    ] as const) {
      for (const locale of locales)
        expect(
          entries.some(
            (entry) => entry.url === absoluteUrl(pagePath(locale, page)),
          ),
        ).toBe(true);
    }
  });
});

describe("llms.txt", () => {
  it("is served as plain text with the company address, services and technologies", async () => {
    const response = llmsGet();
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );

    const text = await response.text();
    expect(text).toContain(addressLines("en")[0]);
    expect(text).toContain(company.email);
    expect(text).toContain(company.founder.name);

    for (const service of services)
      expect(text).toContain(service.copy.en.title);

    for (const tech of [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Next.js",
      "React",
      "React Native",
      "Vue.js",
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "AWS",
      "GitHub",
    ])
      expect(text).toContain(tech);
  });

  it("lists the culture, mission and vision pages in every locale", async () => {
    const text = await llmsGet().text();
    for (const page of ["culture", "mission", "vision"] as const)
      for (const locale of locales)
        expect(text).toContain(absoluteUrl(pagePath(locale, page)));
  });

  it("no longer claims the site is single-page or that service and founder URLs do not exist", async () => {
    const text = await llmsGet().text();
    expect(text).not.toMatch(/single-page/i);
    expect(text).not.toMatch(/do not exist/i);
  });

  it("keeps the old /llm.txt URL serving the same content", async () => {
    const [legacy, current] = await Promise.all([
      llmGet().text(),
      llmsGet().text(),
    ]);
    expect(legacy).toBe(current);
  });

  it("serves an expanded /llms-full.txt with per-service technologies", async () => {
    const text = await llmFullGet().text();
    expect(text).toContain("Services (full detail)");
    for (const service of services) {
      expect(text).toContain(service.copy.en.title);
      expect(text).toContain(service.technologies[0]);
    }
  });

  it("states the official identity and no removed claims", async () => {
    for (const text of [await llmsGet().text(), await llmFullGet().text()]) {
      expect(text).toContain("Cloud, Software & AI Engineering");
      expect(text).toContain("We engineer what moves your business forward.");
      for (const pillar of [
        "Cloud Engineering",
        "Software Engineering",
        "AI Engineering",
      ])
        expect(text).toContain(pillar);
      expect(text).toContain("worked as a contractor");
      expect(text).toContain("not IRTC case studies or client relationships");
      expect(text).not.toMatch(/software factory|testimonial|São Paulo/i);
    }
  });
});

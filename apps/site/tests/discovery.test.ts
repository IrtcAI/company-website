import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { GET as llmFullGet } from "@/app/llms-full.txt/route";
import { GET as llmsGet } from "@/app/llms.txt/route";
import { GET as llmGet } from "@/app/llm.txt/route";
import sitemap from "@/app/sitemap";
import { addressLines, company } from "@/lib/company";
import { absoluteUrl, locales, pagePath, SITE_URL } from "@/lib/routes";
import { serviceSlugs, services } from "@/lib/services";

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
];

describe("robots", () => {
  const rules = robots();

  it("allows everything and blocks the API by default", () => {
    const wildcard = (
      Array.isArray(rules.rules) ? rules.rules : [rules.rules]
    ).find((rule) => rule.userAgent === "*");
    expect(wildcard).toMatchObject({
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    });
  });

  it("explicitly allows the major AI and search crawlers", () => {
    const agents = (
      Array.isArray(rules.rules) ? rules.rules : [rules.rules]
    ).map((rule) => rule.userAgent);
    for (const bot of answerEngineBots) expect(agents).toContain(bot);
  });

  it("declares the sitemap and host", () => {
    expect(rules.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(rules.host).toBe(SITE_URL);
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

  it("includes the services index, about, founder and contact pages for every locale", () => {
    for (const page of ["services", "about", "founder", "contact"] as const) {
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
      expect(text).not.toMatch(
        /LeafLink|Dasa|Perfect Pay|software factory|testimonial|São Paulo/i,
      );
    }
  });
});

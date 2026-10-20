import { describe, expect, it } from "vitest";
import { GET as robotsGet } from "@/app/robots.txt/route";
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
  "Applebot",
  "Amazonbot",
  "Meta-ExternalAgent",
];

describe("robots.txt", () => {
  it("allows everything, blocks the API and sends content signals in every group", async () => {
    const text = await robotsGet().text();
    const groups = text
      .split(/\n\n+/)
      .filter((block) => /User-Agent:/.test(block));
    expect(groups.length).toBeGreaterThan(1);
    for (const block of groups) {
      expect(block).toContain(
        "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
      );
      expect(block).toContain("Allow: /");
      expect(block).toContain("Disallow: /api/");
    }
    expect(text).toMatch(/^User-Agent: \*$/m);
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
      expect(text).not.toMatch(
        /LeafLink|Dasa|Perfect Pay|software factory|testimonial|São Paulo/i,
      );
    }
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EngagementOptions } from "@/components/engagement-options";
import { ServiceScopeList } from "@/components/service-blocks";
import { UseCase } from "@/components/use-case";
import { content, projectBrands, recommendationAuthors } from "@/lib/content";
import { founderCopy } from "@/lib/copy/founder";
import { engagementCopy } from "@/lib/copy/engagement";
import { serviceScopeCopy } from "@/lib/copy/service-scopes";
import { useCaseCopy } from "@/lib/copy/use-case";
import { knowledgeChunks } from "@/lib/knowledge/sources";
import { markdownPage } from "@/lib/page-markdown";
import { locales, pagePath } from "@/lib/routes";
import { services } from "@/lib/services";
import { stats } from "@/lib/stats";

describe("business positioning", () => {
  it("keeps unsubstantiated company proof unpublished", () => {
    expect(projectBrands).toEqual([]);
    expect(recommendationAuthors).toEqual([]);
    expect(stats).toEqual([]);
    for (const locale of locales) {
      expect(content[locale].projects.cases).toEqual([]);
      expect(content[locale].testimonials.summaries).toEqual([]);
    }
  });

  it.each(locales)(
    "keeps contractor experience attributed to the founder in %s",
    (locale) => {
      const copy = founderCopy[locale];
      const bio = copy.bio.join(" ");
      expect(bio).toContain("contractor");
      for (const company of ["LeafLink", "Dasa", "Perfect Pay"])
        expect(bio).toContain(company);
      expect(bio).toMatch(
        /não são cases nem relações comerciais da IRTC|not IRTC case studies or client relationships|no son casos ni relaciones comerciales de IRTC/,
      );
      const profile = knowledgeChunks(locale).find(
        (chunk) => chunk.id === "founder:profile",
      )!;
      for (const paragraph of copy.bio)
        expect(profile.text).toContain(paragraph);
    },
  );

  it.each(locales)(
    "keeps scoped offers navigable and consistent across channels in %s",
    (locale) => {
      render(<EngagementOptions locale={locale} />);
      const copy = engagementCopy[locale];
      const home = markdownPage(pagePath(locale, "home"))!.markdown;
      const index = markdownPage(pagePath(locale, "services"))!.markdown;
      for (const item of copy.items) {
        const service = services.find(
          (service) => service.id === item.service,
        )!;
        expect(
          screen.getByRole("link", { name: `${copy.link}: ${item.title}` }),
        ).toHaveAttribute(
          "href",
          pagePath(locale, "services", service.copy[locale].slug),
        );
        for (const markdown of [home, index]) {
          expect(markdown).toContain(copy.intro);
          expect(markdown).toContain(item.delivery);
          expect(markdown).toContain(item.decision);
        }
        const chunk = knowledgeChunks(locale).find(
          (chunk) => chunk.id === `engagement:${item.service}`,
        )!;
        expect(chunk.text).toContain(copy.intro);
        expect(chunk.text).toContain(item.delivery);
        expect(chunk.text).toContain(item.decision);
      }
    },
  );
});

describe("featured use case and AWS scopes", () => {
  it.each(locales)(
    "publishes the order-to-billing example as illustrative in %s",
    (locale) => {
      const copy = useCaseCopy[locale];
      render(<UseCase locale={locale} />);
      const home = markdownPage(pagePath(locale, "home"))!.markdown;
      const chunk = knowledgeChunks(locale).find(
        (chunk) => chunk.id === "use-case:order-to-billing",
      )!;

      expect(
        screen.getByRole("heading", { level: 2, name: copy.title }),
      ).toBeVisible();
      expect(screen.getByText(copy.label)).toBeVisible();
      expect(screen.getAllByRole("listitem")).toHaveLength(copy.steps.length);
      expect(screen.getByRole("link", { name: copy.link })).toHaveAttribute(
        "href",
        pagePath(
          locale,
          "services",
          services.find((service) => service.id === "integrations")!.copy[
            locale
          ].slug,
        ),
      );
      for (const text of [home, chunk.text]) {
        expect(text).toContain(copy.title);
        expect(text).toContain(copy.intro);
        expect(text).toContain(copy.note);
        expect(text).toContain(copy.measure);
        for (const step of copy.steps) expect(text).toContain(step.text);
      }
    },
  );

  it.each(locales)(
    "lists DevOps, CloudOps and FinOps with exclusions on the AWS page in %s",
    (locale) => {
      const scopes = serviceScopeCopy[locale].cloud!;
      const cloud = services.find((service) => service.id === "cloud")!;
      render(<ServiceScopeList scopes={scopes} />);
      const markdown = markdownPage(
        pagePath(locale, "services", cloud.copy[locale].slug),
      )!.markdown;

      expect(scopes.items.map((scope) => scope.name)).toEqual([
        "DevOps",
        "CloudOps",
        "FinOps",
      ]);
      for (const scope of scopes.items) {
        expect(
          screen.getByRole("heading", { level: 3, name: scope.title }),
        ).toBeVisible();
        const chunk = knowledgeChunks(locale).find(
          (chunk) =>
            chunk.id === `service:cloud:scope:${scope.name.toLowerCase()}`,
        )!;
        for (const item of [...scope.receives, ...scope.excludes]) {
          expect(screen.getByText(item)).toBeVisible();
          expect(markdown).toContain(item);
          expect(chunk.text).toContain(item);
        }
      }
      for (const other of services.filter((service) => service.id !== "cloud"))
        expect(serviceScopeCopy[locale][other.id]).toBeUndefined();
    },
  );

  it("lists AWS, applied AI and integrations before other services", () => {
    expect(services.slice(0, 3).map((service) => service.id)).toEqual([
      "cloud",
      "applied-ai",
      "integrations",
    ]);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EngagementOptions } from "@/components/engagement-options";
import { content, projectBrands, recommendationAuthors } from "@/lib/content";
import { founderCopy } from "@/lib/copy/founder";
import { engagementCopy } from "@/lib/copy/engagement";
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

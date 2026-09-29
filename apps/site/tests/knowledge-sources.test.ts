import { describe, expect, it } from "vitest";
import { company } from "@/lib/company";
import { founderCopy } from "@/lib/copy/founder";
import {
  allKnowledgeChunks,
  CONTACT_CHUNK_ID,
  knowledgeChunks,
} from "@/lib/knowledge/sources";
import { locales } from "@/lib/routes";
import { services } from "@/lib/services";
import { formatStat, stats } from "@/lib/stats";

const byLocale = Object.fromEntries(
  locales.map((locale) => [locale, knowledgeChunks(locale)] as const),
);

const provisionalStats = stats.filter((stat) =>
  (["projects", "reach", "rating"] as const).includes(
    stat.id as "projects" | "reach" | "rating",
  ),
);

describe("knowledge chunks", () => {
  it("yields the same set of ids for every locale", () => {
    const [first, ...rest] = locales;
    const firstIds = new Set(byLocale[first].map((chunk) => chunk.id));
    for (const locale of rest)
      expect(new Set(byLocale[locale].map((chunk) => chunk.id))).toEqual(
        firstIds,
      );
  });

  it("has unique ids within each locale", () => {
    for (const locale of locales) {
      const ids = byLocale[locale].map((chunk) => chunk.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("gives every service an intro chunk and at least one faq chunk in every locale", () => {
    for (const locale of locales) {
      const ids = new Set(byLocale[locale].map((chunk) => chunk.id));
      for (const service of services) {
        expect(ids.has(`service:${service.id}:intro`)).toBe(true);
        expect(
          [...ids].some((id) => id.startsWith(`service:${service.id}:faq:`)),
        ).toBe(true);
      }
    }
  });

  it("keeps every chunk under 1600 characters", () => {
    for (const chunk of allKnowledgeChunks())
      expect(chunk.text.length).toBeLessThanOrEqual(1600);
  });

  it("never leaks the provisional stats (projects, reach, rating)", () => {
    for (const locale of locales) {
      const provisionalValues = provisionalStats.map((stat) =>
        formatStat(stat, locale),
      );
      for (const chunk of byLocale[locale])
        for (const value of provisionalValues)
          expect(chunk.text).not.toContain(value);
    }
  });

  it("never leaks the founder's beyond-work details", () => {
    for (const locale of locales) {
      const beyondLines = founderCopy[locale].beyondWork.map(
        (item) => item.line,
      );
      for (const chunk of byLocale[locale])
        for (const line of beyondLines) expect(chunk.text).not.toContain(line);
    }
  });

  it("has a contact chunk with the company email in every locale", () => {
    for (const locale of locales) {
      const contact = byLocale[locale].find(
        (chunk) => chunk.id === CONTACT_CHUNK_ID,
      );
      expect(contact).toBeDefined();
      expect(contact?.text).toContain(company.email);
    }
  });

  it("gives every chunk a site-relative href", () => {
    for (const chunk of allKnowledgeChunks())
      expect(chunk.href.startsWith("/")).toBe(true);
  });
});

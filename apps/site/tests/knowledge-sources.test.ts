import { describe, expect, it } from "vitest";
import { company } from "@/lib/company";
import {
  allKnowledgeChunks,
  CONTACT_CHUNK_ID,
  knowledgeChunks,
} from "@/lib/knowledge/sources";
import { locales } from "@/lib/routes";
import { services } from "@/lib/services";

const byLocale = Object.fromEntries(
  locales.map((locale) => [locale, knowledgeChunks(locale)] as const),
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

  it("carries no unapproved figures, client names or personal details", () => {
    const forbidden = [
      /LeafLink/i,
      /Dasa/i,
      /Perfect ?Pay/i,
      /company:experience/,
      /São Paulo/i,
      /\+\s?8 anos|\b8 years|\b4[,.]9\b|\+\s?30 projetos/i,
      /açaí|futebol|football|fútbol|mentoria|mentoring/i,
    ];

    for (const chunk of allKnowledgeChunks())
      for (const pattern of forbidden)
        expect(`${chunk.id} ${chunk.text}`).not.toMatch(pattern);
  });

  it("covers each pillar, Continuous Engineering and the founder in every locale", () => {
    const required = [
      "company:overview",
      "company:origin",
      "company:pillar:cloud",
      "company:pillar:software",
      "company:pillar:ai",
      "company:continuous-engineering",
      "founder:profile",
    ];

    for (const locale of locales) {
      const ids = new Set(byLocale[locale].map((chunk) => chunk.id));
      for (const id of required) expect(ids.has(id)).toBe(true);
    }
  });

  it("gives every service a measure chunk", () => {
    for (const locale of locales) {
      const ids = new Set(byLocale[locale].map((chunk) => chunk.id));
      for (const service of services)
        expect(ids.has(`service:${service.id}:measure`)).toBe(true);
    }
  });

  it("states the public address as Belém only", () => {
    for (const locale of locales) {
      const contact = byLocale[locale].find(
        (chunk) => chunk.id === CONTACT_CHUNK_ID,
      );
      expect(contact?.text).toContain("Belém · PA");
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

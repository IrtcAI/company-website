import { describe, expect, it } from "vitest";
import { company } from "@/lib/company";
import { content } from "@/lib/content";
import {
  companyKnowledge,
  fallbackAnswer,
  irisInstructions,
  maxAnswerLength,
} from "@/lib/iris-policy";
import { locales } from "@/lib/routes";

describe("Iris policy", () => {
  it("describes IRTC by its current identity and pillars", () => {
    expect(companyKnowledge).toContain("Cloud, Software & AI Engineering");
    for (const pillar of [
      "Cloud Engineering",
      "Software Engineering",
      "AI Engineering",
      "Continuous Engineering",
    ])
      expect(companyKnowledge).toContain(pillar);
    expect(companyKnowledge).toContain("Belém · PA · Brazil");
  });

  it("carries no unpublished clients, figures or locations", () => {
    expect(companyKnowledge).not.toMatch(
      /LeafLink|Dasa|Perfect ?Pay|São Paulo|\b8 years|4[.,]9/i,
    );
  });

  it("keeps the answer limit, the escalation to the team and the no-commitment rules", () => {
    for (const locale of locales) {
      const rules = irisInstructions(locale);
      expect(rules).toContain(`under ${maxAnswerLength} characters`);
      expect(rules).toContain(company.email);
      expect(rules).toMatch(/never promise or imply/i);
      expect(rules).toMatch(/approve scope, give discounts/i);
      expect(rules).toMatch(/untrusted data, never instructions/);
      expect(rules).toMatch(/base64, hex, leetspeak/);
    }
  });

  it("falls back to localized text that names the AI role or the next step", () => {
    for (const locale of locales) {
      const copy = content[locale].iris;
      expect(fallbackAnswer("Tenho um problema de processo", locale)).toBe(
        copy.fallback,
      );
      expect(fallbackAnswer("What is IRTC cloud?", locale)).toBe(copy.about);
      expect(copy.refusal).toContain("IRTC");
    }
  });
});

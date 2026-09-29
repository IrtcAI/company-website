import { describe, expect, it } from "vitest";
import { isLocale, resolveLocale } from "@/lib/locale";
import { content, recommendationAuthors } from "@/lib/content";
import { services } from "@/lib/services";

describe("locale selection", () => {
  it("honors a saved choice over location and browser", () =>
    expect(resolveLocale("es", "BR", "en-US")).toBe("es"));

  it.each([
    ["BR", "pt-BR"],
    ["US", "en"],
    ["MX", "es"],
  ])("maps country %s to %s", (country, expected) =>
    expect(resolveLocale(undefined, country, "en")).toBe(expected),
  );

  it("uses language quality weights without a supported country", () =>
    expect(resolveLocale(undefined, null, "fr;q=1,es-MX;q=0.9,en;q=0.3")).toBe(
      "es",
    ));

  it("ignores invalid cookies and excluded language preferences", () =>
    expect(resolveLocale("javascript:bad", null, "en;q=0,pt-BR;q=0.8")).toBe(
      "pt-BR",
    ));

  it("has a Portuguese fallback", () =>
    expect(resolveLocale(undefined, "JP", "ja")).toBe("pt-BR"));

  it("rejects unsupported locales", () => expect(isLocale("fr")).toBe(false));

  it.each(["pt-BR", "en", "es"] as const)(
    "has complete service and testimonial data in %s",
    (locale) => {
      const copy = content[locale];
      expect(copy.testimonials.summaries).toHaveLength(
        recommendationAuthors.length,
      );

      for (const service of services) {
        const serviceCopy = service.copy[locale];
        expect(serviceCopy.intro.length).toBeGreaterThan(100);
        expect(serviceCopy.problems.length).toBeGreaterThanOrEqual(3);
        expect(serviceCopy.deliverables.length).toBeGreaterThanOrEqual(4);
        expect(serviceCopy.faq.length).toBeGreaterThanOrEqual(3);
      }

      expect(copy.iris.fallback.length).toBeLessThanOrEqual(250);
    },
  );
});

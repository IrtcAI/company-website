import { describe, expect, it } from "vitest";
import { isLocale } from "@/lib/locale";
import { content, recommendationAuthors } from "@/lib/content";
import { services } from "@/lib/services";

describe("locales", () => {
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

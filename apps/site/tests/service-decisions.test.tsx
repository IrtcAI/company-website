import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceHow } from "@/components/service-blocks";
import { ContactCta } from "@/components/contact-cta";
import { serviceDecisionCopy } from "@/lib/copy/service-decisions";
import { knowledgeChunks } from "@/lib/knowledge/sources";
import { markdownPage } from "@/lib/page-markdown";
import { locales, pagePath } from "@/lib/routes";
import { relatedServices, services } from "@/lib/services";

for (const locale of locales) {
  describe(`service decision guidance in ${locale}`, () => {
    it.each(["cloud", "modernization", "applied-ai"] as const)(
      "publishes the same %s scope in the page, Markdown and Iris",
      (id) => {
        const decision = serviceDecisionCopy[locale][id]!;
        const service = services.find((service) => service.id === id)!;
        render(
          <>
            <ServiceHow title={decision.title} points={decision.points} />
            <ContactCta locale={locale} service={id} action={decision.action} />
          </>,
        );
        const markdown = markdownPage(
          pagePath(locale, "services", service.copy[locale].slug),
        )!.markdown;
        const knowledge = knowledgeChunks(locale).find(
          (chunk) => chunk.id === `service:${id}:decision`,
        )!;
        expect(
          screen.getByRole("heading", { name: decision.title }),
        ).toBeVisible();
        for (const point of decision.points) {
          expect(screen.getByText(point.text)).toBeVisible();
          expect(markdown).toContain(point.text);
          expect(knowledge.text).toContain(point.text);
        }
        expect(
          screen.getByRole("link", { name: decision.action }),
        ).toHaveAttribute(
          "href",
          `${pagePath(locale, "contact")}?servico=${id}`,
        );
      },
    );
  });
}

it("connects AWS assessment to modernization and AI to its data prerequisites", () => {
  const cloud = services.find((service) => service.id === "cloud")!;
  const ai = services.find((service) => service.id === "applied-ai")!;
  expect(relatedServices(cloud)[0].id).toBe("modernization");
  expect(relatedServices(ai).map((service) => service.id)).toEqual([
    "data",
    "integrations",
    "cloud",
  ]);
  for (const service of services) {
    const ids = relatedServices(service, 20).map((item) => item.id);
    expect(ids).not.toContain(service.id);
    expect(new Set(ids).size).toBe(services.length - 1);
    expect(relatedServices(service, 0)).toEqual([]);
  }
});

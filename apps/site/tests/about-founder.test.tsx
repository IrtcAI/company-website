import { createElement, ImgHTMLAttributes } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AboutContent } from "@/components/about-content";
import { AboutGallery } from "@/components/about-gallery";
import { ContactCta } from "@/components/contact-cta";
import { FounderProfile } from "@/components/founder-profile";
import { Stats } from "@/components/stats";
import { aboutCopy } from "@/lib/copy/about";
import { company } from "@/lib/company";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", props),
}));

describe("founder page", () => {
  it("renders the portrait and the contact call to action", () => {
    render(
      <>
        <FounderProfile locale="pt-BR" />
        <ContactCta locale="pt-BR" />
      </>,
    );

    expect(
      screen.getByRole("img", {
        name: /^Retrato de Iago Rodrigues, fundador da IRTC/,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("heading", { name: "Tem um projeto em mente?" }),
    ).toBeVisible();
  });

  it.each([
    ["pt-BR", "Iago no LinkedIn"],
    ["en", "Iago on LinkedIn"],
    ["es", "Iago en LinkedIn"],
  ] as const)(
    "links to the personal LinkedIn profile in a new tab in %s",
    (locale, label) => {
      render(<FounderProfile locale={locale} />);

      const link = screen.getByRole("link", { name: new RegExp(label) });
      expect(link).toHaveAttribute("href", company.founder.linkedin);
      expect(company.founder.linkedin).toBe(
        "https://www.linkedin.com/in/iago-rodrigues/",
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    },
  );

  it("tells the story and lists the hobbies outside the code", () => {
    render(<FounderProfile locale="pt-BR" />);

    expect(
      screen.getByRole("heading", { name: "O engenheiro fora do expediente" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Fora do código" }),
    ).toBeVisible();
    for (const name of ["Videogame", "Filmes e séries", "Juliette e Luna"])
      expect(screen.getByRole("heading", { name })).toBeVisible();
  });

  it("does not render the testimonials or contributions sections", () => {
    render(<FounderProfile locale="pt-BR" />);

    expect(screen.queryByText("O que colegas dizem")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Contribuições em projetos"),
    ).not.toBeInTheDocument();
  });

  it("shows the official role, the three pillars and no unauthorized personal details", () => {
    render(<FounderProfile locale="pt-BR" />);

    expect(screen.getByText("Founder & Principal Engineer")).toBeVisible();
    expect(screen.getByText("Cloud Engineering")).toBeVisible();
    expect(screen.getByText("Software Engineering")).toBeVisible();
    expect(screen.getByText("AI Engineering")).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Fora do trabalho" }),
    ).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(
      /LeafLink|Dasa|Perfect Pay|futebol|açaí|mentoria|esposa|marido|filhos/i,
    );
  });
});

describe("about page", () => {
  it("renders the gallery with localized alt texts", () => {
    render(<AboutGallery locale="pt-BR" />);

    for (const image of aboutCopy["pt-BR"].gallery)
      expect(screen.getByAltText(image.alt)).toBeVisible();
  });

  it.each(["pt-BR", "en", "es"] as const)(
    "renders the institutional foundations in %s",
    (locale) => {
      render(<AboutContent locale={locale} />);

      const copy = aboutCopy[locale];
      expect(
        screen.getByRole("heading", { level: 1, name: copy.introTitle }),
      ).toBeVisible();
      for (const item of [...copy.foundations, ...copy.values])
        expect(
          screen.getByRole("heading", { level: 3, name: item.title }),
        ).toBeVisible();
      expect(copy.foundations).toHaveLength(3);
      expect(copy.values).toHaveLength(6);
    },
  );

  it("uses the official Brand Book purpose, mission and vision in pt-BR", () => {
    const [purpose, mission, vision] = aboutCopy["pt-BR"].foundations;

    expect(purpose.text).toBe(
      "Ampliar o que empresas e pessoas conseguem fazer com tecnologia que funciona no dia a dia.",
    );
    expect(mission.text).toMatch(/^Resolver problemas de negócio projetando/);
    expect(vision.text).toMatch(
      /^Ser uma referência de engenharia nascida na Amazônia/,
    );
  });
});

describe("stats section", () => {
  it.each(["pt-BR", "en", "es"] as const)(
    "renders nothing in %s while no figure is approved",
    (locale) => {
      const { container } = render(<Stats locale={locale} />);

      expect(container).toBeEmptyDOMElement();
    },
  );
});

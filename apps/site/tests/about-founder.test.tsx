import { createElement, ImgHTMLAttributes } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
        name: "Retrato de Iago Rodrigues, fundador da IRTC",
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("heading", { name: "Tem um projeto em mente?" }),
    ).toBeVisible();
  });

  it("does not render the testimonials, contributions or LinkedIn sections", () => {
    render(<FounderProfile locale="pt-BR" />);

    expect(screen.queryByText("O que colegas dizem")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Contribuições em projetos"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Ver perfil no LinkedIn/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(company.founder.linkedin),
    ).not.toBeInTheDocument();
  });

  it("renders the beyond work section with its items", () => {
    render(<FounderProfile locale="pt-BR" />);

    expect(
      screen.getByRole("heading", { name: "Fora do trabalho" }),
    ).toBeVisible();
    expect(screen.getByText("Família")).toBeVisible();
    expect(screen.getByText("Belém")).toBeVisible();
  });
});

describe("about page", () => {
  it("renders the gallery with localized alt texts", () => {
    render(<AboutGallery locale="pt-BR" />);

    for (const image of aboutCopy["pt-BR"].gallery)
      expect(screen.getByAltText(image.alt)).toBeVisible();
  });
});

describe("stats section", () => {
  it("renders the headline numbers in the server-rendered markup", () => {
    render(<Stats locale="pt-BR" />);

    expect(screen.getByText("+8")).toBeVisible();
    expect(screen.getByText("+30")).toBeVisible();
    expect(screen.getByText("+1 mi")).toBeVisible();
    expect(screen.getByText("4,9/5")).toBeVisible();
  });

  it("uses a decimal point for the English rating", () => {
    render(<Stats locale="en" />);

    expect(screen.getByText("4.9/5")).toBeVisible();
    expect(screen.getByText("+8")).toBeVisible();
  });
});

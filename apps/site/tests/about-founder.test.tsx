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
  it("renders the portrait, the LinkedIn link and the contact call to action", () => {
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
      screen.getByRole("link", { name: /Ver perfil no LinkedIn/ }),
    ).toHaveAttribute("href", company.founder.linkedin);

    expect(
      screen.getByRole("heading", { name: "Tem um projeto em mente?" }),
    ).toBeVisible();
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

    expect(screen.getByText("+10")).toBeVisible();
    expect(screen.getByText("+30")).toBeVisible();
    expect(screen.getByText("+1 mi")).toBeVisible();
    expect(screen.getByText("40%")).toBeVisible();
  });
});

import { createElement, ImgHTMLAttributes } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SiteExperience } from "@/components/site-experience";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", props),
}));
vi.mock("@/components/hero-world", () => ({ HeroWorld: () => null }));
vi.mock("next/dynamic", () => ({ default: () => () => null }));

describe("institutional experience", () => {
  it("introduces solutions before client evidence and projects", () => {
    const { container } = render(<SiteExperience />);
    const sections = [
      ...container.querySelectorAll(
        "#manifesto, #solucoes, .client-strip, #projetos",
      ),
    ];
    expect(sections.map((section) => section.id || section.className)).toEqual([
      "manifesto",
      "solucoes",
      "client-strip",
      "projetos",
    ]);
    expect(screen.getByText("02 / O QUE CONSTRUÍMOS")).toBeVisible();
    expect(screen.getByText("03 / PROJETOS EM OPERAÇÃO")).toBeVisible();
    expect(container.querySelector(".development-backdrop")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
  it("navigates and moves focus without adding a URL fragment", async () => {
    render(<SiteExperience />);
    await userEvent.click(screen.getAllByRole("link", { name: "Projetos" })[0]);
    expect(document.activeElement?.id).toBe("projetos");
    expect(location.hash).toBe("");
    expect(document.querySelectorAll('a[href^="#"]')).toHaveLength(0);
  });
  it("reveals back-to-top and the sticky header after the opening story", async () => {
    type Callback = (
      entries: {
        target: Element;
        isIntersecting: boolean;
        boundingClientRect: { top: number };
      }[],
    ) => void;
    const watchers = new Map<Element, Callback>();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(private callback: Callback) {}
        observe(target: Element) {
          watchers.set(target, this.callback);
        }
        unobserve() {}
        disconnect() {}
      },
    );
    const { container } = render(
      <div className="intro-story">
        <SiteExperience />
      </div>,
    );
    const leave = (target: Element | null) =>
      act(() =>
        watchers.get(target as Element)?.([
          {
            target: target as Element,
            isIntersecting: false,
            boundingClientRect: { top: -100 },
          },
        ]),
      );
    const control = container.querySelector(".back-to-top");
    const header = container.querySelector(".site-header");
    expect(control).toHaveAttribute("data-visible", "false");
    expect(header).toHaveAttribute("data-stuck", "false");
    leave(document.getElementById("inicio"));
    expect(control).toHaveAttribute("data-visible", "true");
    leave(document.querySelector(".intro-story"));
    expect(header).toHaveAttribute("data-stuck", "true");
    await userEvent.click(within(control as HTMLElement).getByRole("link"));
    expect(document.activeElement).toHaveAttribute("id", "conteudo");
    expect(screen.queryByText(/Imagem pública da marca/)).toBeNull();
  });

  it("saves the explicit theme and restores the saved mode", async () => {
    document.documentElement.dataset.theme = "dark";
    render(<SiteExperience />);
    const select = screen.getByLabelText("Aparência");
    await waitFor(() => expect(select).toHaveValue("dark"));
    await userEvent.selectOptions(select, "light");
    expect(localStorage.getItem("irtc-theme")).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    await userEvent.selectOptions(select, "system");
    expect(document.documentElement.dataset.theme).toBe("system");
  });
  it("persists language choice and uses the localized route", async () => {
    render(<SiteExperience />);
    await userEvent.selectOptions(screen.getByLabelText("Idioma"), "es");
    expect(document.cookie).toContain("irtc-locale=es");
    expect(push).toHaveBeenCalledWith("/es", { scroll: false });
  });
  it("renders English content and updates the document language", () => {
    render(<SiteExperience locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Your idea becomes",
    );
    expect(document.documentElement.lang).toBe("en");
  });
  it("cycles all six recommendations and wraps backwards", async () => {
    render(<SiteExperience />);
    const region = document.getElementById("depoimentos")!;
    expect(within(region).getByText("Rafael F. Andrade")).toBeVisible();
    await userEvent.click(
      screen.getByRole("button", { name: "Recomendação anterior" }),
    );
    expect(within(region).getByText("Pedro Felipe")).toBeVisible();
    await userEvent.click(
      screen.getByRole("button", { name: "Próxima recomendação" }),
    );
    expect(within(region).getByText("Rafael F. Andrade")).toBeVisible();
    expect(within(region).queryByText("LinkedIn")).toBeNull();
    expect(
      within(region).queryByRole("link", { name: /recomendações/i }),
    ).toBeNull();
  });
  it("renders the founder portrait and one accessible manifesto", () => {
    render(<SiteExperience />);
    expect(
      screen.getByRole("img", {
        name: "Retrato de Iago Rodrigues, fundador da IRTC",
      }),
    ).toHaveAttribute("loading", "lazy");
    expect(
      screen.getAllByRole("heading", {
        name: /Tecnologia boa\s*resolve de verdade\./,
      }),
    ).toHaveLength(1);
    expect(document.querySelectorAll("#manifesto")).toHaveLength(1);
  });
  it("keeps only one solution accordion open", async () => {
    render(<SiteExperience />);
    const products = screen.getByRole("button", {
      name: /Produtos & plataformas/,
    });
    const systems = screen.getByRole("button", {
      name: /Sistemas & integrações/,
    });
    await userEvent.click(products);
    expect(products).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(systems);
    expect(products).toHaveAttribute("aria-expanded", "false");
    expect(systems).toHaveAttribute("aria-expanded", "true");
  });
  it("switches projects and explains a selected technology", async () => {
    render(<SiteExperience />);
    await userEvent.click(screen.getByRole("button", { name: /Dasa/ }));
    expect(
      screen.getByText("Informação disponível quando ela faz diferença."),
    ).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "PostgreSQL" }));
    expect(
      screen.getByText(/Dados bem estruturados, consultas eficientes/),
    ).toBeVisible();
  });
  it("pauses motion and removes the redundant contact email link", async () => {
    render(<SiteExperience />);
    await userEvent.click(
      screen.getByRole("button", { name: "Pausar animações" }),
    );
    expect(
      screen.getByRole("button", { name: "Ativar animações" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelector("#contato a[href^='mailto:']")).toBeNull();
  });
  it("keeps the form values and reports failed delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    render(<SiteExperience />);
    fireEvent.change(screen.getByLabelText("Seu nome"), {
      target: { value: "Cliente Teste" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Enviar mensagem" }).closest("form")!,
    );
    expect(await screen.findByText(/Não foi possível enviar/)).toBeVisible();
    expect(screen.getByLabelText("Seu nome")).toHaveValue("Cliente Teste");
    expect(screen.queryByText(/Mensagem enviada\./)).toBeNull();
  });
  it("clears the form only after confirmed delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    render(<SiteExperience />);
    fireEvent.change(screen.getByLabelText("Seu nome"), {
      target: { value: "Cliente Teste" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Enviar mensagem" }).closest("form")!,
    );
    expect(await screen.findByText(/Mensagem enviada\./)).toBeVisible();
    expect(screen.getByLabelText("Seu nome")).toHaveValue("");
  });
});

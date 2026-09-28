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
import { ContactForm } from "@/components/contact-form";
import { SiteExperience } from "@/components/site-experience";
import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/lib/content";
import { services } from "@/lib/services";
import ServicePage from "@/app/[locale]/services/[slug]/page";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", props),
}));
vi.mock("@/components/hero-world", () => ({ HeroWorld: () => null }));
vi.mock("next/dynamic", () => ({ default: () => () => null }));

function renderHome(locale: Locale = "pt-BR") {
  return render(
    <SiteShell locale={locale} page="home">
      <SiteExperience locale={locale} />
    </SiteShell>,
  );
}

function renderContact() {
  return render(
    <SiteShell locale="pt-BR" page="contact">
      <ContactForm locale="pt-BR" />
    </SiteShell>,
  );
}

describe("institutional experience", () => {
  it("introduces solutions before client evidence and projects", () => {
    const { container } = renderHome();
    const sections = [
      ...container.querySelectorAll(
        "#manifesto, #servicos, .client-strip, #projetos",
      ),
    ];

    expect(sections.map((section) => section.id || section.className)).toEqual([
      "manifesto",
      "servicos",
      "client-strip",
      "projetos",
    ]);
    expect(screen.getByText("02 / SERVIÇOS")).toBeVisible();
    expect(screen.getByText("03 / PROJETOS EM OPERAÇÃO")).toBeVisible();
    expect(container.querySelector(".development-backdrop")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("navigates and moves focus without adding a URL fragment", async () => {
    renderHome();
    await userEvent.click(screen.getAllByRole("link", { name: "Projetos" })[0]);
    expect(document.activeElement?.id).toBe("projetos");
    expect(location.hash).toBe("");
  });

  it("tracks the visible section, sticks the header and returns to the top", async () => {
    type Callback = (
      entries: {
        target: Element;
        isIntersecting: boolean;
        intersectionRatio: number;
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

    const { container } = renderHome();
    const report = (id: string, isIntersecting: boolean) => {
      const target = document.getElementById(id) as Element;
      act(() =>
        watchers.get(target)?.([
          { target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 },
        ]),
      );
    };

    const header = container.querySelector(".site-header");
    expect(header).toHaveAttribute("data-stuck", "false");
    expect(container.querySelector(".back-to-top")).toBeNull();

    report("projetos", true);
    const [projects] = screen.getAllByRole("link", { name: "Projetos" });
    expect(projects).toHaveAttribute("aria-current", "location");

    act(() => {
      window.scrollY = 400;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-stuck", "true");

    const footer = container.querySelector(".site-footer") as HTMLElement;
    await userEvent.click(
      within(footer).getByRole("link", { name: "Voltar ao início" }),
    );
    expect(document.activeElement).toHaveAttribute("id", "conteudo");
    expect(screen.queryByText(/Imagem pública da marca/)).toBeNull();
  });

  it("saves the explicit theme and restores the saved mode", async () => {
    document.documentElement.dataset.theme = "dark";
    renderHome();
    const select = screen.getByLabelText("Aparência");
    await waitFor(() => expect(select).toHaveValue("dark"));

    await userEvent.selectOptions(select, "light");
    expect(localStorage.getItem("irtc-theme")).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");

    await userEvent.selectOptions(select, "system");
    expect(document.documentElement.dataset.theme).toBe("system");
  });

  it("persists language choice and uses the localized route", async () => {
    renderHome();
    await userEvent.selectOptions(screen.getByLabelText("Idioma"), "es");
    expect(document.cookie).toContain("irtc-locale=es");
    expect(push).toHaveBeenCalledWith("/es", { scroll: false });
  });

  it("renders English content and updates the document language", () => {
    renderHome("en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Your idea becomes",
    );
    expect(document.documentElement.lang).toBe("en");
  });

  it("cycles all six recommendations and wraps backwards", async () => {
    renderHome();
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
    renderHome();

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

  it("links every home service card to its service page", () => {
    const { container } = renderHome();
    const section = container.querySelector("#servicos") as HTMLElement;

    for (const service of services) {
      const slug = service.copy["pt-BR"].slug;
      expect(
        section.querySelector(`a[href="/servicos/${slug}"]`),
      ).not.toBeNull();
    }

    expect(
      within(section).getByRole("link", { name: /Ver todos os serviços/ }),
    ).toHaveAttribute("href", "/servicos");
  });

  it("shows the tools row as a plain, non-interactive list", () => {
    const { container } = renderHome();
    const section = container.querySelector("#servicos") as HTMLElement;

    expect(within(section).getByText("PostgreSQL")).toBeVisible();
    expect(section.querySelectorAll(".tech-token button")).toHaveLength(0);
  });

  it("switches the featured project", async () => {
    renderHome();
    await userEvent.click(screen.getByRole("button", { name: /Dasa/ }));
    expect(
      screen.getByText("Informação disponível quando ela faz diferença."),
    ).toBeVisible();
  });

  it("pauses motion and moves the contact form to its own page", async () => {
    renderHome();
    await userEvent.click(
      screen.getByRole("button", { name: "Pausar animações" }),
    );
    expect(
      screen.getByRole("button", { name: "Ativar animações" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(document.getElementById("contato")).toBeNull();
    expect(
      screen.getByRole("link", { name: /Conte o que você quer construir/ }),
    ).toHaveAttribute("href", "/contato");
  });

  it("keeps the form values and reports failed delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    renderContact();

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

  it("preselects the topic requested by a service page", () => {
    window.history.replaceState(null, "", "/contato?servico=mobile-apps");
    renderContact();
    expect(screen.getByLabelText(/Assunto/)).toHaveValue("mobile-apps");
    expect(
      screen.getByRole("button", { name: /Falar com a Iris/ }),
    ).toBeVisible();
    window.history.replaceState(null, "", "/");
  });

  it("shows the address, hours and every service in the footer", () => {
    const { container } = renderContact();
    const footer = container.querySelector(".site-footer") as HTMLElement;

    expect(within(footer).getByText("Trav. Alferes Costa, 1750")).toBeVisible();
    expect(within(footer).getByText("Sáb e dom: fechado")).toBeVisible();
    expect(
      within(footer).getByRole("link", { name: "Aplicativos para celular" }),
    ).toHaveAttribute("href", "/servicos/aplicativos");
    expect(
      within(footer).getByRole("link", { name: "contato@irtc.com.br" }),
    ).toHaveAttribute("href", "mailto:contato@irtc.com.br");
    for (const link of screen.getAllByRole("link", { name: "Vamos conversar" }))
      expect(link).toHaveAttribute("aria-current", "page");
  });

  it("clears the form only after confirmed delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    renderContact();

    fireEvent.change(screen.getByLabelText("Seu nome"), {
      target: { value: "Cliente Teste" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Enviar mensagem" }).closest("form")!,
    );

    expect(await screen.findByText(/Mensagem enviada\./)).toBeVisible();
    expect(screen.getByLabelText("Seu nome")).toHaveValue("");
  });

  it("renders a service page with its FAQ and a contact call to action", async () => {
    const service = services.find((item) => item.id === "mobile-apps")!;
    const page = await ServicePage({
      params: Promise.resolve({
        locale: "pt-BR",
        slug: service.copy["pt-BR"].slug,
      }),
    });
    render(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: service.copy["pt-BR"].title,
      }),
    ).toBeVisible();
    expect(
      screen.getByText(service.copy["pt-BR"].faq[0].question),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Tem um projeto em mente?" }),
    ).toBeVisible();
  });
});

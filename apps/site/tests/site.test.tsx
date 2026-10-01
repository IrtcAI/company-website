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
import { ContactSection } from "@/components/contact-section";
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
      <ContactSection locale="pt-BR" />
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
    expect(
      screen.getByRole("link", { name: /Conheça a trajetória do Iago/ }),
    ).toHaveAttribute("href", "/fundador");
  });

  it("links the four featured home service cards to their service pages", () => {
    const { container } = renderHome();
    const section = container.querySelector("#servicos") as HTMLElement;
    const featured = [
      "custom-software",
      "web-platforms",
      "mobile-apps",
      "applied-ai",
    ];

    expect(section.querySelectorAll(".service-card")).toHaveLength(4);
    for (const service of services) {
      const slug = service.copy["pt-BR"].slug;
      const card = section.querySelector(`a[href="/servicos/${slug}"]`);
      if (featured.includes(service.id)) expect(card).not.toBeNull();
      else expect(card).toBeNull();
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

  it("shows the header at the top of the page and keeps it without the scroll-story", () => {
    window.scrollY = 0;
    const { container } = renderHome();
    const header = container.querySelector(".site-header") as HTMLElement;
    expect(header).toHaveAttribute("data-visible", "true");

    act(() => {
      window.scrollY = 400;
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-visible", "true");
  });

  it("always shows the header on inner pages", () => {
    const { container } = renderContact();
    expect(container.querySelector(".site-header")).toHaveAttribute(
      "data-visible",
      "true",
    );
  });

  function renderGrowingStory() {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    window.scrollY = 0;
    const { container } = renderHome();
    const header = container.querySelector(".site-header") as HTMLElement;
    const story = container.querySelector(".intro-story") as HTMLElement;
    story.getBoundingClientRect = () => ({ bottom: 400 }) as unknown as DOMRect;
    expect(story).toHaveAttribute("data-enhanced", "true");
    return { header, story };
  }

  it("hides the header while the scroll-story grows and shows it again once it finishes", () => {
    const { header, story } = renderGrowingStory();
    expect(header).toHaveAttribute("data-visible", "true");

    act(() => {
      window.scrollY = 300;
      story.dataset.progress = "0.4";
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-visible", "false");

    act(() => {
      story.dataset.progress = "1";
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-visible", "true");
  });

  it("shows the header once a header control receives focus", () => {
    const { header, story } = renderGrowingStory();
    act(() => {
      window.scrollY = 300;
      story.dataset.progress = "0.4";
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-visible", "false");

    const [projetos] = screen.getAllByRole("link", { name: "Projetos" });
    act(() => projetos.focus());
    expect(header).toHaveAttribute("data-visible", "true");
  });

  it("lists every service plus a link to the services index in the Serviços dropdown", () => {
    const { container } = renderHome();
    const panel = container.querySelector("#services-menu") as HTMLElement;

    for (const service of services) {
      const link = within(panel).getByRole("link", {
        name: new RegExp(service.copy["pt-BR"].title),
      });
      expect(link).toHaveAttribute(
        "href",
        `/servicos/${service.copy["pt-BR"].slug}`,
      );
    }

    expect(
      within(panel).getByRole("link", { name: /Ver todos os serviços/ }),
    ).toHaveAttribute("href", "/servicos");
  });

  it("opens the services dropdown on hover, with a hover-intent delay on close", () => {
    vi.useFakeTimers();
    const { container } = renderHome();
    const nav = container.querySelector(".nav-services") as HTMLElement;
    const toggle = within(nav).getByRole("button");

    expect(toggle).toHaveAttribute("aria-expanded", "false");

    act(() => fireEvent.mouseEnter(nav));
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    act(() => fireEvent.mouseLeave(nav));
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    act(() => vi.advanceTimersByTime(200));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the services dropdown on Escape and refocuses the trigger", () => {
    const { container } = renderHome();
    const nav = container.querySelector(".nav-services") as HTMLElement;
    const trigger = within(nav).getByRole("link", { name: "Serviços" });
    const toggle = within(nav).getByRole("button");

    act(() => fireEvent.mouseEnter(nav));
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    act(() => fireEvent.keyDown(nav, { key: "Escape" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(trigger);
  });

  it("toggles the services dropdown from its disclosure button", async () => {
    const { container } = renderHome();
    const nav = container.querySelector(".nav-services") as HTMLElement;
    const toggle = within(nav).getByRole("button");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("lists services as a nested group in the mobile menu", async () => {
    const { container } = renderHome();
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    const group = container.querySelector(".mobile-services") as HTMLElement;

    expect(
      within(group).getByRole("link", { name: "Serviços" }),
    ).toHaveAttribute("href", "/#servicos");
    const toggle = within(group).getByRole("button");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    for (const service of services)
      expect(
        within(group).getByText(service.copy["pt-BR"].title),
      ).toBeInTheDocument();
  });

  it("opens the mobile menu as a modal and closes it from the X or a link", async () => {
    const { container } = renderHome();
    const open = screen.getByRole("button", { name: "Menu" });
    const panel = container.querySelector(
      "#mobile-menu-panel",
    ) as HTMLDialogElement;

    expect(panel).not.toHaveAttribute("open");
    await userEvent.click(open);
    expect(panel).toHaveAttribute("open");
    expect(open).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(panel).not.toHaveAttribute("open");
    expect(open).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(open);
    await userEvent.click(within(panel).getByRole("link", { name: "Sobre" }));
    expect(panel).not.toHaveAttribute("open");
  });

  it("scrolls to the services section when clicking Serviços on the home page", async () => {
    renderHome();
    await userEvent.click(screen.getAllByRole("link", { name: "Serviços" })[0]);
    expect(document.activeElement?.id).toBe("servicos");
    expect(location.hash).toBe("");
  });

  it("links Serviços to the home section and marks it current on services pages", () => {
    const { container } = render(
      <SiteShell locale="pt-BR" page="services">
        <ContactSection locale="pt-BR" />
      </SiteShell>,
    );
    const link = within(container).getAllByRole("link", {
      name: "Serviços",
    })[0];
    expect(link).toHaveAttribute("href", "/#servicos");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("uses a view transition for the language switch when the browser supports it", async () => {
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();
      return {} as unknown as ViewTransition;
    });
    document.startViewTransition =
      startViewTransition as typeof document.startViewTransition;

    renderHome();
    await userEvent.selectOptions(screen.getByLabelText("Idioma"), "en");

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/en", { scroll: false });

    Reflect.deleteProperty(document, "startViewTransition");
  });
});

import { createElement, ImgHTMLAttributes } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SiteExperience } from "@/components/site-experience";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("next/image", () => ({ default: (props: ImgHTMLAttributes<HTMLImageElement>) => createElement("img", props) }));
vi.mock("@/components/hero-world", () => ({ HeroWorld: () => null }));
vi.mock("next/dynamic", () => ({ default: () => () => null }));

describe("institutional experience", () => {
  it("navigates and moves focus without adding a URL fragment", async () => {
    render(<SiteExperience />);
    await userEvent.click(screen.getAllByRole("link", { name: "Projetos" })[0]);
    expect(document.activeElement?.id).toBe("projetos");
    expect(location.hash).toBe("");
    expect(document.querySelectorAll('a[href^="#"]')).toHaveLength(0);
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
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Ideas, made real.");
    expect(document.documentElement.lang).toBe("en");
  });
  it("cycles all six recommendations and wraps backwards", async () => {
    render(<SiteExperience />);
    const region = document.getElementById("depoimentos")!;
    expect(within(region).getByText("Rafael F. Andrade")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Recomendação anterior" }));
    expect(within(region).getByText("Pedro Felipe")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Próxima recomendação" }));
    expect(within(region).getByText("Rafael F. Andrade")).toBeVisible();
  });
  it("switches projects and explains a selected technology", async () => {
    render(<SiteExperience />);
    await userEvent.click(screen.getByRole("button", { name: /Dasa/ }));
    expect(screen.getByText("Informação disponível quando ela faz diferença.")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "PostgreSQL" }));
    expect(screen.getByText(/Dados bem estruturados, consultas eficientes/)).toBeVisible();
  });
  it("pauses motion and removes the redundant contact email link", async () => {
    render(<SiteExperience />);
    await userEvent.click(screen.getByRole("button", { name: "Pausar animações" }));
    expect(screen.getByRole("button", { name: "Ativar animações" })).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelector("#contato a[href^='mailto:']")).toBeNull();
  });
  it("keeps the form values and reports failed delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    render(<SiteExperience />);
    fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Cliente Teste" } });
    fireEvent.submit(screen.getByRole("button", { name: "Enviar mensagem" }).closest("form")!);
    expect(await screen.findByText(/Não foi possível enviar/)).toBeVisible();
    expect(screen.getByLabelText("Seu nome")).toHaveValue("Cliente Teste");
    expect(screen.queryByText(/Mensagem enviada\./)).toBeNull();
  });
  it("clears the form only after confirmed delivery", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    render(<SiteExperience />);
    fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Cliente Teste" } });
    fireEvent.submit(screen.getByRole("button", { name: "Enviar mensagem" }).closest("form")!);
    expect(await screen.findByText(/Mensagem enviada\./)).toBeVisible();
    expect(screen.getByLabelText("Seu nome")).toHaveValue("");
  });
});

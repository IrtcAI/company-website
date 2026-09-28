import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Iris from "@/components/iris";

describe("Iris dialog", () => {
  it("requires confirmation before closing and preserves a cancelled conversation", async () => {
    const onClose = vi.fn();
    render(<Iris onClose={onClose} />);
    await userEvent.type(screen.getByLabelText("Sua mensagem"), "Minha ideia");
    await userEvent.click(
      screen.getByRole("button", { name: "Fechar conversa" }),
    );
    expect(onClose).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Continuar conversando" }),
    ).toHaveFocus();
    await userEvent.click(
      screen.getByRole("button", { name: "Continuar conversando" }),
    );
    expect(screen.getByLabelText("Sua mensagem")).toHaveValue("Minha ideia");
    await userEvent.click(
      screen.getByRole("button", { name: "Fechar conversa" }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Sim, encerrar" }),
    );
    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("opens confirmation on Escape and toggles fullscreen", async () => {
    render(<Iris onClose={vi.fn()} locale="en" />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open fullscreen" }),
    );
    expect(screen.getByRole("dialog")).toHaveClass("expanded");
    await userEvent.click(
      screen.getByRole("button", { name: "Restore window" }),
    );
    expect(screen.getByRole("dialog")).not.toHaveClass("expanded");
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );
    expect(screen.getByText("End this conversation?")).toBeVisible();
  });
  it("passes the selected language and does not send a client-controlled knowledge base", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({ answer: "Un MVP pequeño." }),
      });
    vi.stubGlobal("fetch", fetchMock);
    render(<Iris onClose={vi.fn()} locale="es" />);
    await userEvent.type(screen.getByLabelText("Tu mensaje"), "Quiero un CRM");
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(await screen.findByText("Un MVP pequeño.")).toBeVisible();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.locale).toBe("es");
    expect(body.knowledge).toBeUndefined();
    expect(body.history).toEqual([]);
  });
  it("sends back only user turns and server-signed answers", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ answer: "Signed answer.", signature: "sig" }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: "rate_limit" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ answer: "Ok." }),
      });
    vi.stubGlobal("fetch", fetchMock);
    render(<Iris onClose={vi.fn()} locale="en" />);
    await userEvent.type(screen.getByLabelText("Your message"), "First");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    await screen.findByText("Signed answer.");
    await userEvent.type(screen.getByLabelText("Your message"), "Second");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(
      await screen.findByText(
        "Too many messages in a short time. Please try again in a few minutes.",
      ),
    ).toBeVisible();
    await userEvent.type(screen.getByLabelText("Your message"), "Third");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    await screen.findByText("Ok.");
    expect(JSON.parse(fetchMock.mock.calls[2][1].body).history).toEqual([
      { role: "user", content: "First" },
      { role: "assistant", content: "Signed answer.", signature: "sig" },
      { role: "user", content: "Second" },
    ]);
  });
  it("retains an approved draft if email delivery fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ answer: "MVP: cadastro e agenda." }),
        })
        .mockResolvedValueOnce({ ok: false }),
    );
    render(<Iris onClose={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Sua mensagem"), "Quero um MVP");
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    await userEvent.click(
      await screen.findByRole("button", { name: "Usar como rascunho" }),
    );
    await userEvent.type(
      screen.getByLabelText("Seu e-mail para retorno"),
      "teste@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Aprovar e enviar por e-mail" }),
    );
    expect(
      await screen.findByText(
        "Não foi possível enviar. Tente novamente em instantes.",
      ),
    ).toBeVisible();
    expect(
      screen.getByLabelText("Seu rascunho de primeira versão"),
    ).toHaveValue("MVP: cadastro e agenda.");
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Aprovar e enviar por e-mail" }),
      ).toBeEnabled(),
    );
  });
});

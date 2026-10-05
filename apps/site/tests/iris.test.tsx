import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Iris from "@/components/iris";
import { content } from "@/lib/content";

describe("Iris dialog", () => {
  it("requires confirmation before closing and preserves a cancelled conversation", async () => {
    const onClose = vi.fn();
    render(
      <Iris
        onClose={onClose}
        labels={content["pt-BR"].iris}
        contactSending={content["pt-BR"].contact.sending}
      />,
    );
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
    render(
      <Iris
        onClose={vi.fn()}
        locale="en"
        labels={content.en.iris}
        contactSending={content.en.contact.sending}
      />,
    );

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
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ answer: "Un MVP pequeño." }),
    });
    vi.stubGlobal("fetch", fetchMock);
    render(
      <Iris
        onClose={vi.fn()}
        locale="es"
        labels={content.es.iris}
        contactSending={content.es.contact.sending}
      />,
    );

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
    render(
      <Iris
        onClose={vi.fn()}
        locale="en"
        labels={content.en.iris}
        contactSending={content.en.contact.sending}
      />,
    );

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
    render(
      <Iris
        onClose={vi.fn()}
        labels={content["pt-BR"].iris}
        contactSending={content["pt-BR"].contact.sending}
      />,
    );

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
      screen.getByLabelText("Rascunho do contexto para a equipe"),
    ).toHaveValue("MVP: cadastro e agenda.");
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Aprovar e enviar por e-mail" }),
      ).toBeEnabled(),
    );
  });
  it("sends on Enter, breaks the line on Shift+Enter and blocks double submit", async () => {
    let resolve: (value: unknown) => void = () => {};
    const fetchMock = vi.fn().mockReturnValue(
      new Promise((done) => {
        resolve = done;
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <Iris
        onClose={vi.fn()}
        labels={content["pt-BR"].iris}
        contactSending={content["pt-BR"].contact.sending}
      />,
    );

    const field = screen.getByLabelText("Sua mensagem");
    await userEvent.type(field, "Linha um{Shift>}{Enter}{/Shift}linha dois");
    expect(field).toHaveValue("Linha um\nlinha dois");
    expect(fetchMock).not.toHaveBeenCalled();

    await userEvent.type(field, "{Enter}");
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("status")).toHaveTextContent(
      content["pt-BR"].iris.thinking,
    );

    await userEvent.type(field, "outra{Enter}");
    expect(fetchMock).toHaveBeenCalledOnce();

    resolve({ ok: true, status: 200, json: async () => ({ answer: "Ok." }) });
    await screen.findByText("Ok.");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
  it("shows a transport error as a notice that cannot become a draft", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    render(
      <Iris
        onClose={vi.fn()}
        labels={content["pt-BR"].iris}
        contactSending={content["pt-BR"].contact.sending}
      />,
    );

    await userEvent.type(screen.getByLabelText("Sua mensagem"), "Oi{Enter}");

    expect(await screen.findByText(content["pt-BR"].iris.error)).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Usar como rascunho" }),
    ).toBeNull();
  });
});

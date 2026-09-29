import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ShellProvider } from "@/components/shell-provider";
import { content } from "@/lib/content";
import { Toaster } from "@/components/toaster";
import { reportHttpError } from "@/lib/toast";

vi.mock("next/dynamic", () => ({ default: () => () => null }));

const consent = { text: "", accept: "", decline: "" };
const toastLabels = {
  network: "",
  rateLimit: "",
  invalid: "",
  server: "",
  dismiss: "",
};

describe("Iris launcher", () => {
  it("keeps the label as its accessible name whether it is compact or expanded", () => {
    render(
      <ShellProvider
        locale="pt-BR"
        launcherLabel="Oi, eu sou a Iris."
        consent={consent}
        toastLabels={toastLabels}
        accessibilityLabels={content.en.accessibility}
        irisLabels={content["pt-BR"].iris}
        contactSending={content["pt-BR"].contact.sending}
      >
        <div />
      </ShellProvider>,
    );

    const launcher = screen.getByRole("button", {
      name: "Oi, eu sou a Iris.",
    });
    expect(launcher).toHaveAttribute("aria-haspopup", "dialog");
    expect(launcher).toHaveAttribute("aria-expanded", "false");
  });

  it("opens Iris and reflects it via aria-expanded", async () => {
    const user = userEvent.setup();
    render(
      <ShellProvider
        locale="en"
        launcherLabel="Hi, I'm Iris."
        consent={consent}
        toastLabels={toastLabels}
        accessibilityLabels={content.en.accessibility}
        irisLabels={content.en.iris}
        contactSending={content.en.contact.sending}
      >
        <div />
      </ShellProvider>,
    );

    const launcher = screen.getByRole("button", { name: "Hi, I'm Iris." });
    await user.click(launcher);

    expect(launcher).toHaveAttribute("aria-expanded", "true");
  });
});

describe("HTTP error toasts", () => {
  const labels = {
    network: "Offline",
    rateLimit: "Slow down",
    invalid: "Check the fields",
    server: "Server failed",
    dismiss: "Dismiss",
  };

  it("maps each failure to its message and lets the visitor dismiss it", async () => {
    const user = userEvent.setup();
    render(<Toaster labels={labels} />);

    act(() => reportHttpError(429));
    act(() => reportHttpError(502));
    act(() => reportHttpError(null));

    const region = screen.getByRole("status", { hidden: true });
    expect(region).toHaveTextContent("Slow down");
    expect(region).toHaveTextContent("Server failed");
    expect(region).toHaveTextContent("Offline");

    await user.click(
      screen.getAllByRole("button", { name: "Dismiss", hidden: true })[0],
    );
    expect(region).not.toHaveTextContent("Slow down");
  });

  it("does not stack the same message twice", () => {
    render(<Toaster labels={labels} />);
    act(() => reportHttpError(400));
    act(() => reportHttpError(422));
    expect(screen.getAllByText("Check the fields")).toHaveLength(1);
  });
});

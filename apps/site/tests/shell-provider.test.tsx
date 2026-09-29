import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ShellProvider } from "@/components/shell-provider";

vi.mock("next/dynamic", () => ({ default: () => () => null }));

const consent = { text: "", accept: "", decline: "" };

describe("Iris launcher", () => {
  it("keeps the label as its accessible name whether it is compact or expanded", () => {
    render(
      <ShellProvider
        locale="pt-BR"
        launcherLabel="Oi, eu sou a Iris."
        consent={consent}
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
      >
        <div />
      </ShellProvider>,
    );

    const launcher = screen.getByRole("button", { name: "Hi, I'm Iris." });
    await user.click(launcher);

    expect(launcher).toHaveAttribute("aria-expanded", "true");
  });
});

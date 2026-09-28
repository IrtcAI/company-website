import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";

describe("accessibility toolbar", () => {
  it("keeps collapsed controls inert and restores saved preferences", async () => {
    localStorage.setItem(
      "irtc-accessibility",
      JSON.stringify({ textSize: "large", contrast: true, motionPaused: true }),
    );
    const onPausedChange = vi.fn();
    render(
      <AccessibilityToolbar
        locale="en"
        paused={false}
        onPausedChange={onPausedChange}
      />,
    );
    expect(
      document.getElementById("accessibility-toolbar-panel"),
    ).toHaveAttribute("inert");
    expect(screen.queryByRole("button", { name: "Larger" })).toBeNull();
    await waitFor(() => {
      expect(onPausedChange).toHaveBeenCalledWith(true);
      expect(document.documentElement.dataset.accessibilityText).toBe("large");
      expect(document.documentElement.dataset.accessibilityContrast).toBe(
        "true",
      );
    });
  });
  it("opens from its visible control and updates text and contrast preferences", async () => {
    const user = userEvent.setup();
    render(
      <AccessibilityToolbar
        locale="en"
        paused={false}
        onPausedChange={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /open accessibility/i }),
    );
    await user.click(screen.getByRole("button", { name: "Larger" }));
    await user.click(screen.getByRole("button", { name: /high contrast/i }));

    expect(document.documentElement.dataset.accessibilityText).toBe("large");
    expect(document.documentElement.dataset.accessibilityContrast).toBe("true");
    expect(
      JSON.parse(localStorage.getItem("irtc-accessibility") || "{}"),
    ).toMatchObject({
      textSize: "large",
      contrast: true,
    });
  });

  it("uses the shared paused state and restores trigger focus when escape closes", async () => {
    const user = userEvent.setup();
    const onPausedChange = vi.fn();
    render(
      <AccessibilityToolbar
        locale="pt-BR"
        paused={false}
        onPausedChange={onPausedChange}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: /abrir opções de acessibilidade/i,
    });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /animações/i }));
    await user.keyboard("{Escape}");

    expect(onPausedChange).toHaveBeenCalledWith(true);
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("restores defaults and supports localized Spanish labels", async () => {
    const user = userEvent.setup();
    const onPausedChange = vi.fn();
    render(
      <AccessibilityToolbar
        locale="es"
        paused
        onPausedChange={onPausedChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /abrir opciones de accesibilidad/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /restablecer preferencias/i }),
    );

    expect(document.documentElement.dataset.accessibilityText).toBe("default");
    expect(document.documentElement.dataset.accessibilityContrast).toBe(
      "false",
    );
    expect(onPausedChange).toHaveBeenCalledWith(false);
  });
});

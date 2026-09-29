import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";

function mockToolbarRect(
  ...rects: Pick<DOMRect, "top" | "left" | "width" | "height">[]
) {
  const spy = vi.spyOn(Element.prototype, "getBoundingClientRect");
  for (const rect of rects) {
    spy.mockReturnValueOnce({
      ...rect,
      bottom: rect.top + rect.height,
      right: rect.left + rect.width,
      x: rect.left,
      y: rect.top,
      toJSON() {
        return this;
      },
    } as DOMRect);
  }
  return spy;
}

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

  it("drags the trigger past the midpoint, snaps to the nearest edge, and persists it", () => {
    vi.stubGlobal("innerWidth", 1024);
    vi.stubGlobal("innerHeight", 768);
    mockToolbarRect(
      { top: 300, left: 10, width: 324, height: 400 },
      { top: 330, left: 700, width: 324, height: 400 },
    );

    render(
      <AccessibilityToolbar
        locale="en"
        paused={false}
        onPausedChange={vi.fn()}
      />,
    );
    const trigger = screen.getByRole("button", {
      name: /open accessibility/i,
    });

    fireEvent.pointerDown(trigger, {
      pointerId: 1,
      clientX: 20,
      clientY: 350,
    });
    fireEvent.pointerMove(trigger, {
      pointerId: 1,
      clientX: 900,
      clientY: 380,
    });
    fireEvent.pointerUp(trigger, { pointerId: 1, clientX: 900, clientY: 380 });
    fireEvent.click(trigger);

    expect(trigger.closest("aside")).toHaveAttribute("data-edge", "right");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      JSON.parse(localStorage.getItem("irtc-accessibility-position") || "{}"),
    ).toMatchObject({ edge: "right", top: 530 });
  });

  it("still opens the panel on a plain click that never crosses the drag threshold", () => {
    mockToolbarRect({ top: 300, left: 10, width: 324, height: 400 });

    render(
      <AccessibilityToolbar
        locale="en"
        paused={false}
        onPausedChange={vi.fn()}
      />,
    );
    const trigger = screen.getByRole("button", {
      name: /open accessibility/i,
    });

    fireEvent.pointerDown(trigger, { pointerId: 1, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(trigger, { pointerId: 1, clientX: 21, clientY: 21 });
    fireEvent.pointerUp(trigger, { pointerId: 1, clientX: 21, clientY: 21 });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("moves the trigger between edges and positions with Alt plus the arrow keys", () => {
    vi.stubGlobal("innerWidth", 1024);
    vi.stubGlobal("innerHeight", 768);
    mockToolbarRect(
      { top: 300, left: 10, width: 324, height: 400 },
      { top: 300, left: 10, width: 324, height: 400 },
    );

    render(
      <AccessibilityToolbar
        locale="en"
        paused={false}
        onPausedChange={vi.fn()}
      />,
    );
    const trigger = screen.getByRole("button", {
      name: /open accessibility/i,
    });
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "ArrowRight", altKey: true });
    expect(trigger.closest("aside")).toHaveAttribute("data-edge", "right");
    expect(
      JSON.parse(localStorage.getItem("irtc-accessibility-position") || "{}"),
    ).toMatchObject({ edge: "right", top: 500 });

    fireEvent.keyDown(trigger, { key: "ArrowDown", altKey: true });
    expect(
      JSON.parse(localStorage.getItem("irtc-accessibility-position") || "{}"),
    ).toMatchObject({ edge: "right", top: 564 });
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";
import { content, type Locale } from "@/lib/content";
import { applyTextScale } from "@/lib/text-scale";

function renderToolbar(
  locale: Locale = "en",
  props: { paused?: boolean; onPausedChange?: (paused: boolean) => void } = {},
) {
  return render(
    <AccessibilityToolbar
      labels={content[locale].accessibility}
      paused={props.paused ?? false}
      onPausedChange={props.onPausedChange ?? vi.fn()}
    />,
  );
}

function savedPosition() {
  return JSON.parse(
    localStorage.getItem("irtc-accessibility-position") || "{}",
  );
}

describe("accessibility toolbar", () => {
  beforeEach(() => {
    vi.stubGlobal("innerWidth", 1000);
    vi.stubGlobal("innerHeight", 800);
  });

  it("keeps collapsed controls inert and restores saved preferences", async () => {
    localStorage.setItem(
      "irtc-accessibility",
      JSON.stringify({ textSize: "extra", contrast: true, motionPaused: true }),
    );
    const onPausedChange = vi.fn();
    renderToolbar("en", { onPausedChange });

    expect(
      document.getElementById("accessibility-toolbar-panel"),
    ).toHaveAttribute("inert");
    expect(screen.queryByRole("button", { name: "Extra" })).toBeNull();
    await waitFor(() => {
      expect(onPausedChange).toHaveBeenCalledWith(true);
      expect(document.documentElement.dataset.accessibilityText).toBe("extra");
      expect(document.documentElement.dataset.accessibilityContrast).toBe(
        "true",
      );
    });
  });

  it("keeps preferences saved by the older two-size toolbar", async () => {
    localStorage.setItem(
      "irtc-accessibility",
      JSON.stringify({ textSize: "large" }),
    );
    renderToolbar();
    await waitFor(() =>
      expect(document.documentElement.dataset.accessibilityText).toBe("large"),
    );
  });

  it("opens on click, not on hover", async () => {
    const user = userEvent.setup();
    renderToolbar();
    const trigger = screen.getByRole("button", { name: /open accessibility/i });

    await user.hover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("offers five text sizes and saves the chosen one with contrast", async () => {
    const user = userEvent.setup();
    renderToolbar();

    await user.click(
      screen.getByRole("button", { name: /open accessibility/i }),
    );
    for (const name of ["Default", "Small", "Medium", "Large", "Extra"])
      expect(screen.getByRole("button", { name })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Medium" }));
    await user.click(screen.getByRole("button", { name: /high contrast/i }));

    expect(screen.getByRole("button", { name: "Medium" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.documentElement.dataset.accessibilityText).toBe("medium");
    expect(document.documentElement.dataset.accessibilityContrast).toBe("true");
    expect(
      JSON.parse(localStorage.getItem("irtc-accessibility") || "{}"),
    ).toMatchObject({ textSize: "medium", contrast: true });
  });

  it("closes when the visitor clicks outside the panel", async () => {
    const user = userEvent.setup();
    renderToolbar();
    const trigger = screen.getByRole("button", { name: /open accessibility/i });

    await user.click(trigger);
    await user.click(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("uses the shared paused state and restores trigger focus when escape closes", async () => {
    const user = userEvent.setup();
    const onPausedChange = vi.fn();
    renderToolbar("pt-BR", { onPausedChange });

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

  it("restores defaults and uses the page's language", async () => {
    const user = userEvent.setup();
    const onPausedChange = vi.fn();
    renderToolbar("es", { paused: true, onPausedChange });

    await user.click(
      screen.getByRole("button", { name: /abrir opciones de accesibilidad/i }),
    );
    expect(screen.getByRole("button", { name: "Mediano" })).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /restablecer preferencias/i }),
    );

    expect(document.documentElement.dataset.accessibilityText).toBe("default");
    expect(document.documentElement.dataset.accessibilityContrast).toBe(
      "false",
    );
    expect(onPausedChange).toHaveBeenCalledWith(false);
  });

  it("snaps a dragged trigger to the nearest edge, including top and bottom", () => {
    renderToolbar();
    const trigger = screen.getByRole("button", { name: /open accessibility/i });

    function drag(x: number, y: number) {
      fireEvent.pointerDown(trigger, {
        pointerId: 1,
        clientX: 20,
        clientY: 400,
      });
      fireEvent.pointerMove(trigger, { pointerId: 1, clientX: x, clientY: y });
      fireEvent.pointerUp(trigger, { pointerId: 1, clientX: x, clientY: y });
      fireEvent.click(trigger);
    }

    drag(950, 200);
    expect(trigger.closest("aside")).toHaveAttribute("data-edge", "right");
    expect(savedPosition()).toEqual({ edge: "right", ratio: 0.25 });

    drag(300, 20);
    expect(trigger.closest("aside")).toHaveAttribute("data-edge", "top");
    expect(savedPosition()).toEqual({ edge: "top", ratio: 0.3 });

    drag(600, 790);
    expect(trigger.closest("aside")).toHaveAttribute("data-edge", "bottom");
    expect(savedPosition()).toEqual({ edge: "bottom", ratio: 0.6 });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("still opens the panel on a plain click that never crosses the drag threshold", () => {
    renderToolbar();
    const trigger = screen.getByRole("button", { name: /open accessibility/i });

    fireEvent.pointerDown(trigger, { pointerId: 1, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(trigger, { pointerId: 1, clientX: 21, clientY: 21 });
    fireEvent.pointerUp(trigger, { pointerId: 1, clientX: 21, clientY: 21 });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("moves along an edge and across edges with Alt plus the arrow keys", () => {
    renderToolbar();
    const trigger = screen.getByRole("button", { name: /open accessibility/i });
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "ArrowDown", altKey: true });
    expect(savedPosition()).toEqual({ edge: "left", ratio: 0.58 });

    fireEvent.keyDown(trigger, { key: "ArrowRight", altKey: true });
    expect(trigger.closest("aside")).toHaveAttribute("data-edge", "right");

    fireEvent.keyDown(trigger, { key: "ArrowUp", altKey: true });
    expect(savedPosition()).toEqual({ edge: "right", ratio: 0.5 });
  });

  it("migrates a position saved in pixels by the older toolbar", async () => {
    localStorage.setItem(
      "irtc-accessibility-position",
      JSON.stringify({ edge: "right", top: 200 }),
    );
    renderToolbar();
    await waitFor(() =>
      expect(
        screen
          .getByRole("button", { name: /open accessibility/i })
          .closest("aside"),
      ).toHaveAttribute("data-edge", "right"),
    );
  });
});

describe("text scaling", () => {
  it("grows body-sized text, leaves headlines alone and restores both", () => {
    document.body.innerHTML = `
      <p id="small" style="font-size: 14px; line-height: 21px">Body copy</p>
      <h1 id="headline" style="font-size: 64px">Headline</h1>
      <svg><text id="svg-text" style="font-size: 12px">3D</text></svg>
    `;
    const small = document.getElementById("small")!;
    const headline = document.getElementById("headline")!;

    applyTextScale(document.body, 1.4);
    expect(small.style.fontSize).toBe("19.6px");
    expect(small.style.lineHeight).toBe("1.5");
    expect(headline.style.fontSize).toBe("64px");
    expect(document.getElementById("svg-text")!.style.fontSize).toBe("12px");

    applyTextScale(document.body, 0.9);
    expect(small.style.fontSize).toBe("12.6px");

    applyTextScale(document.body, 1);
    expect(small.style.fontSize).toBe("14px");
    expect(small.style.lineHeight).toBe("21px");
    expect(small).not.toHaveAttribute("data-a11y-font");
  });
});

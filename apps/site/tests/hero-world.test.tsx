import { existsSync } from "node:fs";
import { join } from "node:path";
import { act, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { HeroWorld } from "@/components/hero-world";
import { ScrollStory } from "@/components/scroll-story";
import { studioKinds, studioPoster } from "@/lib/studio-kinds";

const stage = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("@/lib/studio-scene", () => ({ createStage: stage.create }));

describe("hero artwork", () => {
  it("paints every object from a baked poster before WebGL loads", () => {
    const html = renderToString(<HeroWorld paused={false} />);
    for (const kind of ["phone", "browser", "chip", "database", "server"])
      expect(html).toContain(`data-studio-slot="${kind}"`);
    expect(html).toContain("fallback-terminal");
    expect(html).not.toContain("canvas");
  });

  it("ships a poster for every studio object", () => {
    for (const kind of studioKinds)
      expect(
        existsSync(join(process.cwd(), "public", studioPoster(kind))),
      ).toBe(true);
  });

  it("hands the same slots to the live renderer and idles once the hero fades", async () => {
    vi.useFakeTimers();
    stage.create.mockReturnValue({ update: vi.fn(), destroy: vi.fn() });
    let intersect: (visible: boolean) => void = () => {};
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(
          callback: (entries: { isIntersecting: boolean }[]) => void,
        ) {
          intersect = (visible) => callback([{ isIntersecting: visible }]);
        }
        observe() {}
        disconnect() {}
      },
    );
    const { container } = render(
      <div className="intro-story" data-progress="0">
        <HeroWorld paused={false} />
      </div>,
    );
    const slots = [...container.querySelectorAll("[data-studio-slot]")];
    intersect(true);
    await act(() => vi.advanceTimersByTimeAsync(3000));
    await act(() => vi.dynamicImportSettled());
    const [, handed, options] = stage.create.mock.calls[0];
    expect(handed.map((slot: { element: Element }) => slot.element)).toEqual(
      slots,
    );
    expect(options.active()).toBe(true);
    (container.firstChild as HTMLElement).dataset.progress = "0.7";
    expect(options.active()).toBe(false);
  });

  it("retains one expanding terminal and one copy of its content", () => {
    const { container, rerender } = render(
      <ScrollStory locale="pt-BR" paused={false}>
        <div className="hero" />
      </ScrollStory>,
    );
    const terminal = container.querySelector(".story-screen");
    rerender(
      <ScrollStory locale="pt-BR" paused>
        <div className="hero" />
      </ScrollStory>,
    );
    expect(container.querySelectorAll(".story-screen")).toHaveLength(1);
    expect(container.querySelector(".story-screen")).toBe(terminal);
    expect(container.querySelectorAll("#story-title")).toHaveLength(1);
  });
});

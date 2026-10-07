import { existsSync } from "node:fs";
import { join } from "node:path";
import { act, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { HeroWorld } from "@/components/hero-world";
import { ScrollStory } from "@/components/scroll-story";
import { content } from "@/lib/content";
import { studioKinds, studioPoster } from "@/lib/studio-kinds";
import { Motion } from "./motion";
import { stubWebGL } from "./webgl";

const stage = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("@/lib/studio-scene", () => ({ createStage: stage.create }));

describe("hero artwork", () => {
  it("paints every object from a baked poster before WebGL loads", () => {
    const html = renderToString(<HeroWorld />);
    for (const kind of ["phone", "browser", "database", "server"])
      expect(html).toContain(`data-studio-slot="${kind}"`);
    expect(html).not.toContain('data-studio-slot="robot"');
    expect(html).toContain("fallback-terminal");
    expect(html).not.toContain("canvas");
    expect(html).toContain("/studio/phone-320.webp 320w");
  });

  it("ships a poster for every studio object", () => {
    for (const kind of studioKinds)
      expect(
        existsSync(join(process.cwd(), "public", studioPoster(kind))),
      ).toBe(true);
    for (const kind of studioKinds)
      expect(
        existsSync(join(process.cwd(), "public", "studio", `${kind}-320.webp`)),
      ).toBe(true);
  });

  it("hands the same slots to the live renderer and idles once the hero fades", async () => {
    vi.useFakeTimers();
    stubWebGL();
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
          const previous = intersect;
          intersect = (visible) => {
            previous(visible);
            callback([{ isIntersecting: visible }]);
          };
        }
        observe() {}
        disconnect() {}
      },
    );

    const { container } = render(
      <div className="intro-story" data-progress="0">
        <HeroWorld />
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
      <Motion>
        <ScrollStory copy={content["pt-BR"].manifesto}>
          <div className="hero" />
        </ScrollStory>
      </Motion>,
    );
    const terminal = container.querySelector(".story-screen");

    rerender(
      <Motion paused>
        <ScrollStory copy={content["pt-BR"].manifesto}>
          <div className="hero" />
        </ScrollStory>
      </Motion>,
    );

    expect(container.querySelectorAll(".story-screen")).toHaveLength(1);
    expect(container.querySelector(".story-screen")).toBe(terminal);
    expect(container.querySelectorAll("#story-title")).toHaveLength(1);
  });
});

import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroWorld } from "@/components/hero-world";

const world = vi.hoisted(() => ({ create: vi.fn(), dispose: vi.fn() }));
vi.mock("@/lib/hero-world", () => ({ createWorld: world.create }));

describe("responsive WebGL lifecycle", () => {
  it("does not load WebGL for mobile or reduced motion", async () => {
    vi.useFakeTimers();
    world.create.mockClear();
    render(<HeroWorld paused={false} />);
    await act(() => vi.advanceTimersByTimeAsync(4000));
    expect(world.create).not.toHaveBeenCalled();
  });

  it("releases WebGL when the viewport stops supporting it", async () => {
    vi.useFakeTimers();
    let onChange = () => {};
    const capability = {
      matches: true,
      addEventListener: vi.fn((event: string, callback: () => void) => {
        onChange = callback;
      }),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => capability),
    );
    world.dispose.mockClear();
    world.create.mockImplementation((element: HTMLElement) => {
      element.dataset.ready = "true";
      return world.dispose;
    });
    const { container } = render(<HeroWorld paused={false} />);
    await act(() => vi.advanceTimersByTimeAsync(3000));
    expect(container.firstChild).toHaveAttribute("data-ready", "true");
    capability.matches = false;
    act(onChange);
    expect(world.dispose).toHaveBeenCalledOnce();
    expect(container.firstChild).not.toHaveAttribute("data-ready");
  });
});

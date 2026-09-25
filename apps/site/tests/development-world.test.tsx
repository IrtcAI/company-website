import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DevelopmentWorld } from "@/components/development-world";

const scene = vi.hoisted(() => ({ create: vi.fn(), dispose: vi.fn() }));
vi.mock("@/lib/development-world", () => ({
  createDevelopmentWorld: scene.create,
}));

let intersect: (visible: boolean) => void;
let changeMedia: () => void;
let media: {
  matches: boolean;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
  scene.create.mockReset().mockReturnValue(scene.dispose);
  scene.dispose.mockReset();
  media = {
    matches: true,
    addEventListener: vi.fn((event, callback) => {
      changeMedia = callback;
    }),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => media),
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        intersect = (visible) => callback([{ isIntersecting: visible }]);
      }
      observe() {}
      disconnect() {}
    },
  );
});

function View({ paused = false }: { paused?: boolean }) {
  return (
    <section className="solutions">
      <DevelopmentWorld paused={paused} />
    </section>
  );
}

describe("development background", () => {
  it("loads only near the section and remains decorative", async () => {
    const { container } = render(<View />);
    expect(scene.create).not.toHaveBeenCalled();
    expect(container.querySelector(".development-backdrop")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await act(async () => intersect(true));
    await waitFor(() => expect(scene.create).toHaveBeenCalledTimes(1));
    await act(async () => intersect(true));
    expect(scene.create).toHaveBeenCalledTimes(1);
  });

  it("does not initialize WebGL on mobile or reduced motion", async () => {
    media.matches = false;
    render(<View />);
    await act(async () => intersect(true));
    expect(scene.create).not.toHaveBeenCalled();
  });

  it("passes updated pause state without rebuilding the scene", async () => {
    const { rerender } = render(<View />);
    await act(async () => intersect(true));
    const isPaused = scene.create.mock.calls[0][2];
    expect(isPaused()).toBe(false);
    rerender(<View paused />);
    expect(isPaused()).toBe(true);
    expect(scene.create).toHaveBeenCalledTimes(1);
  });

  it("releases the renderer when the viewport becomes ineligible and on unmount", async () => {
    const { unmount } = render(<View />);
    await act(async () => intersect(true));
    media.matches = false;
    await act(async () => changeMedia());
    expect(scene.dispose).toHaveBeenCalledTimes(1);
    media.matches = true;
    await act(async () => changeMedia());
    expect(scene.create).toHaveBeenCalledTimes(2);
    unmount();
    expect(scene.dispose).toHaveBeenCalledTimes(2);
  });
});

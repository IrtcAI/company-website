import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DevelopmentWorld } from "@/components/development-world";

const stage = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  destroy: vi.fn(),
}));
vi.mock("@/lib/studio-scene", () => ({ createStage: stage.create }));

let intersect: (visible: boolean) => void;
let changeMedia: () => void;
let media: {
  matches: boolean;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
  vi.useFakeTimers();
  stage.create
    .mockReset()
    .mockReturnValue({ update: stage.update, destroy: stage.destroy });
  stage.update.mockReset();
  stage.destroy.mockReset();
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

async function settle() {
  await act(() => vi.advanceTimersByTimeAsync(3000));
  await act(() => vi.dynamicImportSettled());
}

function View({
  paused = false,
  kind,
}: {
  paused?: boolean;
  kind?: "code" | "database" | "server";
}) {
  return (
    <section className="solutions">
      <DevelopmentWorld paused={paused} kind={kind} />
    </section>
  );
}

describe("section objects", () => {
  it("shows a decorative poster and loads WebGL only near the section", async () => {
    const { container } = render(<View kind="database" />);
    expect(container.querySelector(".development-backdrop")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "/studio/database.webp",
    );
    await settle();
    expect(stage.create).not.toHaveBeenCalled();
    intersect(true);
    await settle();
    expect(stage.create).toHaveBeenCalledTimes(1);
    expect(stage.create.mock.calls[0][1]).toEqual([
      expect.objectContaining({ kind: "database" }),
    ]);
    intersect(true);
    await settle();
    expect(stage.create).toHaveBeenCalledTimes(1);
  });

  it("keeps only the poster on mobile or reduced motion", async () => {
    media.matches = false;
    render(<View />);
    intersect(true);
    await settle();
    expect(stage.create).not.toHaveBeenCalled();
  });

  it("freezes scroll progress while paused without rebuilding", async () => {
    const { rerender } = render(<View />);
    intersect(true);
    await settle();
    const { paused, progress } = stage.create.mock.calls[0][2];
    expect(paused()).toBe(false);
    const before = progress();
    rerender(<View paused />);
    expect(paused()).toBe(true);
    expect(stage.update).toHaveBeenCalled();
    expect(progress()).toBe(before);
    expect(stage.create).toHaveBeenCalledTimes(1);
  });

  it("releases the renderer when ineligible and on unmount", async () => {
    const { unmount } = render(<View />);
    intersect(true);
    await settle();
    media.matches = false;
    act(() => changeMedia());
    expect(stage.destroy).toHaveBeenCalledTimes(1);
    media.matches = true;
    act(() => changeMedia());
    await settle();
    expect(stage.create).toHaveBeenCalledTimes(2);
    unmount();
    expect(stage.destroy).toHaveBeenCalledTimes(2);
  });
});

import { describe, expect, it, vi } from "vitest";
import { exceedsLimit } from "@/lib/rate-limit";

describe("request limits", () => {
  it("limits a key and resets after the window", () => {
    vi.useFakeTimers(); vi.setSystemTime(1000);
    expect(exceedsLimit("test-window", 2, 1000)).toBe(false);
    expect(exceedsLimit("test-window", 2, 1000)).toBe(false);
    expect(exceedsLimit("test-window", 2, 1000)).toBe(true);
    expect(exceedsLimit("different-key", 2, 1000)).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(exceedsLimit("test-window", 2, 1000)).toBe(false);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScrollStory } from "@/components/scroll-story";

describe("scroll story", () => {
  it("keeps the full content available without the motion enhancement", () => {
    const { container } = render(
      <ScrollStory locale="pt-BR" paused={false}>
        <div className="hero">Hero</div>
      </ScrollStory>,
    );
    expect(container.firstChild).toHaveAttribute("data-enhanced", "false");
    expect(screen.getByText("Qualidade desde o começo.")).toBeVisible();
  });

  it("disables the pinned scene and restores hero access when paused", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const { container, rerender } = render(
      <ScrollStory locale="en" paused={false}>
        <div className="hero">Hero</div>
      </ScrollStory>,
    );
    expect(container.firstChild).toHaveAttribute("data-enhanced", "true");

    rerender(
      <ScrollStory locale="en" paused>
        <div className="hero">Hero</div>
      </ScrollStory>,
    );
    expect(container.firstChild).toHaveAttribute("data-enhanced", "false");
    expect(container.querySelector<HTMLElement>(".hero")?.inert).toBe(false);
  });
});

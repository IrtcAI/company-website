import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/web-vitals", () => ({ useReportWebVitals: () => {} }));

const labels = {
  text: "Usamos o Google Analytics.",
  accept: "Aceitar",
  decline: "Recusar",
};

async function load(id: string) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GA_ID", id);
  return import("@/components/analytics-consent");
}

describe("analytics consent", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    localStorage.clear();
    document.head
      .querySelectorAll("script[src*=googletagmanager]")
      .forEach((s) => s.remove());
    delete window.gtag;
  });

  it("stays silent without a measurement id", async () => {
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("");
    render(<AnalyticsConsent labels={labels} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByText(labels.text)).toBeNull();
  });

  it("loads Google Analytics only after the visitor accepts", async () => {
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("G-TEST123");
    render(<AnalyticsConsent labels={labels} />);
    expect(document.querySelector("script[src*=googletagmanager]")).toBeNull();

    act(() => vi.advanceTimersByTime(2000));
    vi.useRealTimers();
    await userEvent.click(screen.getByRole("button", { name: "Aceitar" }));

    expect(localStorage.getItem("irtc-analytics-consent")).toBe("granted");
    expect(
      document.querySelector("script[src*=googletagmanager]"),
    ).toHaveAttribute("src", expect.stringContaining("G-TEST123"));
    expect(screen.queryByText(labels.text)).toBeNull();
  });

  it("remembers a refusal and never loads the script", async () => {
    localStorage.setItem("irtc-analytics-consent", "denied");
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("G-TEST123");
    render(<AnalyticsConsent labels={labels} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByText(labels.text)).toBeNull();
    expect(document.querySelector("script[src*=googletagmanager]")).toBeNull();
  });
});

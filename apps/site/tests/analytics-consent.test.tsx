import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/web-vitals", () => ({ useReportWebVitals: () => {} }));
vi.mock("@next/third-parties/google", () => ({
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => (
    <span data-testid="gtm">{gtmId}</span>
  ),
}));

const labels = {
  text: "Usamos o Google Analytics.",
  accept: "Aceitar",
  decline: "Recusar",
};

async function load(id: string) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GTM_ID", id);
  return import("@/components/analytics-consent");
}

describe("analytics consent", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    localStorage.clear();
    delete window.dataLayer;
  });

  it("stays silent without a measurement id", async () => {
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("");
    render(<AnalyticsConsent labels={labels} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByText(labels.text)).toBeNull();
  });

  it("loads Tag Manager only after the visitor accepts", async () => {
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("GTM-TEST123");
    render(<AnalyticsConsent labels={labels} />);
    expect(screen.queryByTestId("gtm")).toBeNull();

    act(() => vi.advanceTimersByTime(2000));
    vi.useRealTimers();
    await userEvent.click(screen.getByRole("button", { name: "Aceitar" }));

    expect(localStorage.getItem("irtc-analytics-consent")).toBe("granted");
    expect(screen.getByTestId("gtm")).toHaveTextContent("GTM-TEST123");
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ 0: "consent", 1: "update" }),
    );
    expect(screen.queryByText(labels.text)).toBeNull();
  });

  it("remembers a refusal and never loads the script", async () => {
    localStorage.setItem("irtc-analytics-consent", "denied");
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("GTM-TEST123");
    render(<AnalyticsConsent labels={labels} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByText(labels.text)).toBeNull();
    expect(screen.queryByTestId("gtm")).toBeNull();
  });

  it("restores Tag Manager on later visits after consent", async () => {
    localStorage.setItem("irtc-analytics-consent", "granted");
    vi.useFakeTimers();
    const { AnalyticsConsent } = await load("GTM-TEST123");
    render(<AnalyticsConsent labels={labels} />);
    act(() => vi.advanceTimersByTime(10));
    expect(screen.getByTestId("gtm")).toBeInTheDocument();
    expect(screen.queryByText(labels.text)).toBeNull();
  });
});

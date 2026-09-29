"use client";

import { useEffect, useState } from "react";
import { useReportWebVitals } from "next/web-vitals";
import {
  CONSENT_EVENT,
  GA_ID,
  loadAnalytics,
  readConsent,
  saveConsent,
  trackEvent,
} from "@/lib/analytics";

export type ConsentLabels = {
  text: string;
  accept: string;
  decline: string;
};

export function ConsentSettings({ children }: { children: string }) {
  if (!GA_ID) return null;

  return (
    <button
      type="button"
      className="consent-settings"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
    >
      {children}
    </button>
  );
}

export function AnalyticsConsent({ labels }: { labels: ConsentLabels }) {
  const [open, setOpen] = useState(false);

  useReportWebVitals((metric) =>
    trackEvent(metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      metric_id: metric.id,
      metric_rating: metric.rating,
      non_interaction: true,
    }),
  );

  useEffect(() => {
    if (!GA_ID) return;

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);

    const consent = readConsent();
    if (consent === "granted") loadAnalytics();
    const timer = consent ? undefined : setTimeout(() => setOpen(true), 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, reopen);
    };
  }, []);

  if (!open) return null;

  function choose(granted: boolean) {
    saveConsent(granted ? "granted" : "denied");
    if (granted) loadAnalytics();
    else window.gtag?.("consent", "update", { analytics_storage: "denied" });
    setOpen(false);
  }

  return (
    <div className="consent" role="region" aria-label={labels.text}>
      <p>{labels.text}</p>
      <div>
        <button type="button" onClick={() => choose(false)}>
          {labels.decline}
        </button>
        <button
          type="button"
          className="consent-accept"
          onClick={() => choose(true)}
        >
          {labels.accept}
        </button>
      </div>
    </div>
  );
}

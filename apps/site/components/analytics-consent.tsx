"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { useReportWebVitals } from "next/web-vitals";
import {
  CONSENT_EVENT,
  GTM_ID,
  readConsent,
  saveConsent,
  trackEvent,
  updateConsent,
} from "@/lib/analytics";

export type ConsentLabels = {
  text: string;
  accept: string;
  decline: string;
};

export function ConsentSettings({ children }: { children: string }) {
  if (!GTM_ID) return null;

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
  const [granted, setGranted] = useState(false);

  useReportWebVitals((metric) =>
    trackEvent("web_vitals", {
      metric_name: metric.name,
      metric_value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      metric_id: metric.id,
      metric_rating: metric.rating,
    }),
  );

  useEffect(() => {
    if (!GTM_ID) return;

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);

    const consent = readConsent();
    const timer = setTimeout(
      () => {
        if (consent === "granted") setGranted(true);
        else if (!consent) setOpen(true);
      },
      consent ? 0 : 1500,
    );

    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, reopen);
    };
  }, []);

  function choose(accepted: boolean) {
    const consent = accepted ? "granted" : "denied";
    saveConsent(consent);
    updateConsent(consent);
    if (accepted) setGranted(true);
    setOpen(false);
  }

  return (
    <>
      {granted ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      {open ? (
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
      ) : null}
    </>
  );
}

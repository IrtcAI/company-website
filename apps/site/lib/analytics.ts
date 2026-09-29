type EventProps = Record<string, string | number | boolean>;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export const CONSENT_KEY = "irtc-analytics-consent";

export const CONSENT_EVENT = "irtc:consent";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {}
}

function dataLayer() {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

export function updateConsent(consent: Consent) {
  // Consent Mode reads gtag-style commands, which must be pushed as the arguments object.
  (function gtag(..._: unknown[]) {
    dataLayer().push(arguments);
  })("consent", "update", {
    analytics_storage: consent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function trackEvent(name: string, props?: EventProps) {
  dataLayer().push({ event: name, ...props });
}

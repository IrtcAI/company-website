export const TOAST_EVENT = "irtc:http-error";

export type ToastLabels = {
  network: string;
  rateLimit: string;
  invalid: string;
  server: string;
  dismiss: string;
};

export function reportHttpError(status: number | null) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: status }));
}

export function toastMessage(labels: ToastLabels, status: number | null) {
  if (status === null) return labels.network;
  if (status === 429) return labels.rateLimit;
  if (status >= 400 && status < 500) return labels.invalid;
  return labels.server;
}

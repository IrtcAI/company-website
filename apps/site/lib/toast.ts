export const TOAST_EVENT = "irtc:toast";

export type ToastLabels = {
  network: string;
  rateLimit: string;
  invalid: string;
  server: string;
  dismiss: string;
};

export type ToastDetail = { status: number | null } | { success: string };

function dispatchToast(detail: ToastDetail) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail }));
}

export function reportHttpError(status: number | null) {
  dispatchToast({ status });
}

export function reportSuccess(message: string) {
  dispatchToast({ success: message });
}

export function toastMessage(labels: ToastLabels, status: number | null) {
  if (status === null) return labels.network;
  if (status === 429) return labels.rateLimit;
  if (status >= 400 && status < 500) return labels.invalid;
  return labels.server;
}

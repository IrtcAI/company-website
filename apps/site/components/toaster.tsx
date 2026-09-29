"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert, X } from "lucide-react";
import { TOAST_EVENT, toastMessage, type ToastLabels } from "@/lib/toast";

const TOAST_DURATION = 7000;

type Toast = { id: number; message: string };

export function Toaster({ labels }: { labels: ToastLabels }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const region = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    function onError(event: Event) {
      const message = toastMessage(labels, (event as CustomEvent).detail);
      const id = ++nextId.current;
      setToasts((current) => [
        ...current.filter((toast) => toast.message !== message),
        { id, message },
      ]);
      setTimeout(
        () =>
          setToasts((current) => current.filter((toast) => toast.id !== id)),
        TOAST_DURATION,
      );
    }

    window.addEventListener(TOAST_EVENT, onError);
    return () => window.removeEventListener(TOAST_EVENT, onError);
  }, [labels]);

  useEffect(() => {
    const element = region.current;
    if (!element || typeof element.showPopover !== "function") return;

    // Re-showing moves the popover to the top of the top layer, so a toast
    // raised while the Iris modal dialog is open still renders above it.
    if (element.matches(":popover-open")) element.hidePopover();
    element.showPopover();
  }, [toasts]);

  return (
    <div ref={region} className="toaster" popover="manual" role="status">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <CircleAlert aria-hidden="true" />
          <p>{toast.message}</p>
          <button
            type="button"
            aria-label={labels.dismiss}
            onClick={() =>
              setToasts((current) =>
                current.filter((item) => item.id !== toast.id),
              )
            }
          >
            <X aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}

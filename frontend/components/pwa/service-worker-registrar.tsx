"use client";

import { useEffect, useState } from "react";

/**
 * Registers the service worker and surfaces an "update available" toast.
 *
 * A new deploy used to sit in the `waiting` worker indefinitely: students kept
 * using the previous cached shell until they force-closed the app. When a new
 * worker has installed, we offer a one-tap reload that sends SKIP_WAITING and
 * reloads once the new controller takes over.
 *
 * All state updates happen in callbacks (never synchronously in the effect
 * body), so this component stays compatible with the React Compiler rules.
 */
export function ServiceWorkerRegistrar() {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;
    let registration: ServiceWorkerRegistration | null = null;

    const onUpdateFound = () => {
      const installing = registration?.installing;
      if (!installing) return;
      installing.addEventListener("statechange", () => {
        if (
          !cancelled &&
          installing.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          setUpdateReady(true);
        }
      });
    };

    const start = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          if (cancelled) return;
          registration = reg;
          if (reg.waiting && navigator.serviceWorker.controller) setUpdateReady(true);
          reg.addEventListener("updatefound", onUpdateFound);
        })
        .catch(() => {
          // Registration is an enhancement: the app still works online.
        });
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      registration?.removeEventListener("updatefound", onUpdateFound);
    };
  }, []);

  const reload = () => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg?.waiting) {
        window.location.reload();
        return;
      }
      let reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloaded) return;
        reloaded = true;
        window.location.reload();
      });
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
    });
  };

  if (!updateReady) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-lg"
    >
      <span>A new version is ready.</span>
      <button
        type="button"
        onClick={reload}
        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
      >
        Reload
      </button>
    </div>
  );
}

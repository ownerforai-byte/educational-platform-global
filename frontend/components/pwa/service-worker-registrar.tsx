"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for offline PWA support.
 * Only runs client-side. Skips registration if already registered.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[PWA] Service worker registered", reg.scope);
          })
          .catch((err) => {
            console.warn("[PWA] Service worker registration failed", err);
          });
      });
    }
  }, []);

  return null;
}

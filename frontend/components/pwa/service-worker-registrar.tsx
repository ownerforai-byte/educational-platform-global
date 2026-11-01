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
                      })
          .catch((err) => {
                      });
      });
    }
  }, []);

  return null;
}

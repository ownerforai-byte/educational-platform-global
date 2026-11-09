"use client";

import { useEffect } from "react";

/**
 * Registers the service worker and applies every new version AUTOMATICALLY.
 *
 * Owner request 2026-11-08: "if a new version is ready then autodeletes all
 * old version -- simply never show previous versions".
 *
 * The old manual update toast and its reload button are gone. As soon as a
 * new worker has installed we send SKIP_WAITING; public/sw.js then deletes
 * EVERY cache from every previous deploy in its `activate` handler and
 * rebuilds a current-only shell; a single `controllerchange` reload puts the
 * student straight on the new build. No previous version is ever shown and no
 * update is left waiting for a tap.
 *
 * All work happens in event callbacks (never synchronously in the effect
 * body), so the React Compiler lint ratchet stays clean.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const sw = navigator.serviceWorker;
    // Only reload when this page was already controlled. On a FIRST install,
    // clients.claim() also fires `controllerchange`; reloading there would
    // bounce the student once for no reason.
    const hadController = Boolean(sw.controller);
    let cancelled = false;
    let reloaded = false;
    let registration: ServiceWorkerRegistration | null = null;

    const applyUpdate = (reg: ServiceWorkerRegistration | null) => {
      if (cancelled || !reg?.waiting || !sw.controller) return;
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
    };

    const onControllerChange = () => {
      if (cancelled || reloaded || !hadController) return;
      reloaded = true;
      window.location.reload();
    };

    const onUpdateFound = () => {
      const installing = registration?.installing;
      if (!installing) return;
      installing.addEventListener("statechange", () => {
        if (cancelled || installing.state !== "installed" || !sw.controller) return;
        applyUpdate(registration);
      });
    };

    const onVisibilityChange = () => {
      // A PWA left open for days never navigates, so ask for an update when
      // the student comes back to the tab.
      if (document.visibilityState === "visible" && registration) {
        void registration.update().catch(() => {});
      }
    };

    const start = () => {
      sw.register("/sw.js")
        .then((reg) => {
          if (cancelled) return;
          registration = reg;
          applyUpdate(reg); // a worker left waiting by an earlier visit
          reg.addEventListener("updatefound", onUpdateFound);
          void reg.update().catch(() => {});
        })
        .catch(() => {
          // Registration is an enhancement: the app still works online.
        });
    };

    sw.addEventListener("controllerchange", onControllerChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sw.removeEventListener("controllerchange", onControllerChange);
      registration?.removeEventListener("updatefound", onUpdateFound);
    };
  }, []);

  return null;
}

import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { ServiceWorkerRegistrar } from "@/components/pwa/service-worker-registrar";

/**
 * Owner request 2026-11-08: a new version must be applied automatically —
 * no toast waiting for a click, and no previous version left on screen.
 */
type Fn = () => void;

function harness() {
  const postMessage = vi.fn();
  const installingListeners: Record<string, Fn[]> = {};
  const regListeners: Record<string, Fn[]> = {};
  const swListeners: Record<string, Fn[]> = {};

  const installing = {
    state: "installing",
    addEventListener: (type: string, fn: Fn) => {
      (installingListeners[type] ??= []).push(fn);
    },
  };
  const registration = {
    waiting: null as { postMessage: typeof postMessage } | null,
    installing,
    addEventListener: (type: string, fn: Fn) => {
      (regListeners[type] ??= []).push(fn);
    },
    removeEventListener: () => {},
    update: () => Promise.resolve(),
  };
  const sw = {
    controller: {} as object, // this page was already controlled
    register: () => Promise.resolve(registration),
    addEventListener: (type: string, fn: Fn) => {
      (swListeners[type] ??= []).push(fn);
    },
    removeEventListener: () => {},
  };
  Object.defineProperty(navigator, "serviceWorker", {
    configurable: true,
    value: sw,
  });
  return { postMessage, registration, installing, installingListeners, regListeners, swListeners };
}

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "serviceWorker");
});

describe("ServiceWorkerRegistrar — automatic new version", () => {
  it("sends SKIP_WAITING by itself when a new worker has installed", async () => {
    const h = harness();
    render(<ServiceWorkerRegistrar />);
    // Covers the case where the component waits for window load.
    window.dispatchEvent(new Event("load"));

    await waitFor(() => expect(h.regListeners.updatefound?.length).toBeGreaterThan(0));

    // A worker reaches `installed` and becomes the waiting worker.
    h.registration.waiting = { postMessage: h.postMessage };
    h.installing.state = "installed";
    for (const fn of h.regListeners.updatefound) fn();
    for (const fn of h.installingListeners.statechange ?? []) fn();

    expect(h.postMessage).toHaveBeenCalledWith({ type: "SKIP_WAITING" });
    // No "A new version is ready / Reload" prompt is rendered.
    expect(screen.queryByText(/new version is ready/i)).toBeNull();
    expect(screen.queryByRole("button", { name: /reload/i })).toBeNull();
  });

  it("applies a worker that was already waiting from an earlier visit", async () => {
    const h = harness();
    h.registration.waiting = { postMessage: h.postMessage };
    render(<ServiceWorkerRegistrar />);
    window.dispatchEvent(new Event("load"));

    await waitFor(() =>
      expect(h.postMessage).toHaveBeenCalledWith({ type: "SKIP_WAITING" }),
    );
  });

  it("registers the controller-change reload listener", async () => {
    const h = harness();
    render(<ServiceWorkerRegistrar />);
    window.dispatchEvent(new Event("load"));
    await waitFor(() => expect(h.swListeners.controllerchange?.length).toBeGreaterThan(0));
  });
});

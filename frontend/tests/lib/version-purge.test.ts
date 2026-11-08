import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";

/**
 * Owner request 2026-11-08: "if a new version is ready then autodeletes all
 * old version -- simply never show previous versions".
 *
 * The regression that mattered: `activate()` used to KEEP the two caches whose
 * names matched CACHE_NAME / DATA_CACHE. Because those names were hardcoded,
 * the next deploy reused them and every stale page/asset from the previous
 * build stayed addressable. These tests run the real public/sw.js in a VM and
 * assert that activation deletes EVERY cache before rebuilding the shell.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");
const SW = read("public/sw.js");

type Listener = (event: { waitUntil: (p: Promise<unknown>) => void }) => void;

function boot(cacheKeys: string[]) {
  const listeners: Record<string, Listener[]> = {};
  const waits: Promise<unknown>[] = [];
  const deleted: string[] = [];
  const added: string[] = [];
  let claimed = false;
  let skippedWaiting = false;

  const cache = {
    add: async (route: string) => {
      added.push(route);
    },
    put: async () => {},
    match: async () => undefined,
  };
  const caches = {
    keys: async () => [...cacheKeys],
    delete: async (key: string) => {
      deleted.push(key);
      return true;
    },
    open: async () => cache,
    match: async () => undefined,
  };
  const self = {
    addEventListener: (type: string, fn: Listener) => {
      (listeners[type] ??= []).push(fn);
    },
    skipWaiting: () => {
      skippedWaiting = true;
      return Promise.resolve();
    },
    clients: {
      claim: () => {
        claimed = true;
        return Promise.resolve();
      },
    },
    location: { origin: "http://localhost:3000" },
    navigator: {},
  };
  class ResponseStub {}

  const sandbox: Record<string, unknown> = {
    self,
    caches,
    URL,
    Promise,
    setTimeout,
    console,
    Response: ResponseStub,
    // Offline in the test: precacheRoutes falls back to the built-in shell
    // list, and cache.add() is a no-op we can count.
    fetch: async () => {
      throw new Error("offline in test");
    },
  };
  vm.createContext(sandbox);
  vm.runInContext(SW, sandbox);

  const fire = async (type: string) => {
    const event = { waitUntil: (p: Promise<unknown>) => waits.push(p) };
    for (const fn of listeners[type] ?? []) fn(event);
    await Promise.allSettled(waits.splice(0));
  };

  return {
    deleted,
    added,
    fire,
    isClaimed: () => claimed,
    didSkipWaiting: () => skippedWaiting,
    listenerTypes: () => Object.keys(listeners),
  };
}

describe("service worker — purge every previous version", () => {
  it("takes over immediately on install without caching a stale shell", async () => {
    const sw = boot(["neb-vault-v8", "neb-data-v8"]);
    await sw.fire("install");
    expect(sw.didSkipWaiting()).toBe(true);
    expect(sw.deleted).toEqual([]);
    expect(sw.added).toEqual([]); // nothing cached until activate purges
  });

  it("deletes ALL caches on activate — including ones with the current names", async () => {
    const keys = [
      "neb-vault-v8",
      "neb-data-v8",
      "neb-vault-v9",
      "neb-data-v9",
      "some-forgotten-old-cache",
    ];
    const sw = boot(keys);
    await sw.fire("activate");
    expect(sw.deleted.sort()).toEqual([...keys].sort());
    expect(sw.added.length).toBeGreaterThan(0); // fresh current-only shell rebuilt
    expect(sw.isClaimed()).toBe(true);
  });

  it("no longer keeps an allowlist of surviving cache names", () => {
    expect(SW).not.toContain("k !== CACHE_NAME");
    expect(SW).toContain("keys.map((key) => caches.delete(key))");
  });

  it("still owns the install/activate/message/fetch handlers", () => {
    const sw = boot([]);
    expect(sw.listenerTypes()).toEqual(
      expect.arrayContaining(["install", "message", "activate", "fetch"]),
    );
  });
});

describe("service worker registrar — automatic, no old version shown", () => {
  const registrar = read("components/pwa/service-worker-registrar.tsx");

  it("removes the manual 'new version is ready / Reload' toast", () => {
    expect(registrar).not.toContain("A new version is ready");
    expect(registrar).not.toContain("useState");
    expect(registrar).not.toContain(">Reload<");
    expect(registrar).toContain("return null;");
  });

  it("auto-applies a new version and reloads once the controller changes", () => {
    expect(registrar).toContain('type: "SKIP_WAITING"');
    expect(registrar).toContain('"controllerchange"');
    expect(registrar).toContain("window.location.reload()");
    expect(registrar).toContain("registration.update()");
    expect(registrar).toContain("hadController");
  });
});

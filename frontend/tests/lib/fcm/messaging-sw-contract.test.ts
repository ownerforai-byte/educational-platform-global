/**
 * Service-worker contract for the automated account-approval push —
 * executes `public/firebase-messaging-sw.js` in a vm sandbox and drives the
 * real handlers:
 *
 *   background/closed (`onBackgroundMessage` / raw `push`):
 *     showNotification(title, body) with the payload data attached
 *   notification click:
 *     open/focus a client at data.deepLink ("/welcome/approved")
 *
 * Shared server contract:
 *   notification: { title: "Your account is approved 🎉", body: "Sign in to start learning." }
 *   data:         { kind: "account_approved", deepLink: "/welcome/approved", userId: "<uid>" }
 */
import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

const SW_SOURCE = readFileSync(
  path.resolve("public/firebase-messaging-sw.js"),
  "utf8",
);

const APPROVAL_PAYLOAD = {
  notification: {
    title: "Your account is approved 🎉",
    body: "Sign in to start learning.",
  },
  data: {
    kind: "account_approved",
    deepLink: "/welcome/approved",
    userId: "uid-42",
  },
};

type ShownNotification = { title: string; options: Record<string, unknown> };

type SwHarness = {
  shown: ShownNotification[];
  backgroundHandler: ((payload: unknown) => unknown) | null;
  listeners: Record<string, Array<(event: unknown) => void>>;
  /** Mutable window list `clients.matchAll` returns — empty it to simulate no open tab. */
  openClients: Array<{ navigate: ReturnType<typeof vi.fn>; focus: ReturnType<typeof vi.fn> }>;
  client: { navigate: ReturnType<typeof vi.fn>; focus: ReturnType<typeof vi.fn> };
  openWindow: ReturnType<typeof vi.fn>;
};

/**
 * Execute the SW source with the globals it may touch mocked out.
 * `withConfig` false registers the SW without `?cfg=` so the raw `push`
 * fallback path is exercised instead of the Firebase SDK handler.
 */
function loadServiceWorker(withConfig: boolean): SwHarness {
  const shown: ShownNotification[] = [];
  const listeners: Record<string, Array<(event: unknown) => void>> = {};
  const client = { navigate: vi.fn(() => Promise.resolve()), focus: vi.fn(() => Promise.resolve()) };
  const openClients = [client];
  const openWindow = vi.fn(() => Promise.resolve());
  let backgroundHandler: ((payload: unknown) => unknown) | null = null;

  const cfgParam = withConfig
    ? Buffer.from(
        JSON.stringify({ apiKey: "k", projectId: "p", appId: "a", messagingSenderId: "s" }),
      ).toString("base64url")
    : null;

  const sandbox = {
    importScripts: () => undefined,
    URL,
    atob: (s: string) => Buffer.from(s, "base64").toString("binary"),
    btoa: (s: string) => Buffer.from(s, "binary").toString("base64"),
    console: { error: () => undefined, log: () => undefined },
    firebase: {
      initializeApp: () => undefined,
      messaging: () => ({
        onBackgroundMessage: (fn: (payload: unknown) => unknown) => {
          backgroundHandler = fn;
        },
      }),
    },
    self: {
      location: {
        href: cfgParam
          ? `https://app.test/firebase-messaging-sw.js?cfg=${cfgParam}`
          : "https://app.test/firebase-messaging-sw.js",
      },
      registration: {
        showNotification: (title: string, options: Record<string, unknown>) => {
          shown.push({ title, options });
          return Promise.resolve();
        },
      },
      addEventListener: (type: string, fn: (event: unknown) => void) => {
        (listeners[type] ??= []).push(fn);
      },
    },
    clients: {
      matchAll: async () => openClients,
      openWindow,
    },
  };

  vm.runInNewContext(SW_SOURCE, sandbox, { filename: "firebase-messaging-sw.js" });
  return { shown, backgroundHandler, listeners, openClients, client, openWindow };
}

/** Fire a notificationclick with the data the shown notification carries. */
async function clickNotification(harness: SwHarness, index = 0): Promise<void> {
  const shown = harness.shown[index];
  const handler = harness.listeners["notificationclick"]?.[0];
  expect(handler).toBeTypeOf("function");
  let waited: Promise<unknown> = Promise.resolve();
  handler({
    notification: { close: vi.fn(), data: shown.options.data },
    waitUntil: (p: Promise<unknown>) => {
      waited = p;
    },
  });
  await waited;
}

describe("firebase-messaging-sw account_approved contract", () => {
  it("onBackgroundMessage shows the approval notification with the deep link in its data", async () => {
    const harness = loadServiceWorker(true);
    expect(harness.backgroundHandler).toBeTypeOf("function");

    await (harness.backgroundHandler as (p: unknown) => Promise<unknown>)(APPROVAL_PAYLOAD);

    expect(harness.shown).toHaveLength(1);
    expect(harness.shown[0].title).toBe("Your account is approved 🎉");
    expect(harness.shown[0].options.body).toBe("Sign in to start learning.");
    expect(harness.shown[0].options.data).toMatchObject({
      kind: "account_approved",
      deepLink: "/welcome/approved",
      userId: "uid-42",
    });
  });

  it("notification click opens/focuses data.deepLink", async () => {
    const harness = loadServiceWorker(true);
    await (harness.backgroundHandler as (p: unknown) => Promise<unknown>)(APPROVAL_PAYLOAD);

    await clickNotification(harness);

    expect(harness.client.navigate).toHaveBeenCalledWith("/welcome/approved");
    expect(harness.client.focus).toHaveBeenCalled();
  });

  it("notification click opens a new window at the deep link when no client exists", async () => {
    const harness = loadServiceWorker(true);
    await (harness.backgroundHandler as (p: unknown) => Promise<unknown>)(APPROVAL_PAYLOAD);
    harness.openClients.length = 0; // no open tab to focus

    await clickNotification(harness);

    expect(harness.openWindow).toHaveBeenCalledWith("/welcome/approved");
  });

  it("raw push fallback shows the same notification when the SDK is unavailable", async () => {
    const harness = loadServiceWorker(false);
    expect(harness.backgroundHandler).toBeNull();

    const pushHandler = harness.listeners["push"]?.[0];
    expect(pushHandler).toBeTypeOf("function");
    let waited: Promise<unknown> = Promise.resolve();
    pushHandler({
      data: { json: () => APPROVAL_PAYLOAD },
      waitUntil: (p: Promise<unknown>) => {
        waited = p;
      },
    });
    await waited;

    expect(harness.shown).toHaveLength(1);
    expect(harness.shown[0].title).toBe("Your account is approved 🎉");
    expect((harness.shown[0].options.data as Record<string, string>).url).toBe(
      "/welcome/approved",
    );
  });

  it("a ready SDK owns push events so nothing is shown twice", async () => {
    const harness = loadServiceWorker(true);
    const pushHandler = harness.listeners["push"]?.[0];
    expect(pushHandler).toBeTypeOf("function");

    pushHandler({
      data: { json: () => APPROVAL_PAYLOAD },
      waitUntil: (p: Promise<unknown>) => void p,
    });

    expect(harness.shown).toHaveLength(0);
  });
});

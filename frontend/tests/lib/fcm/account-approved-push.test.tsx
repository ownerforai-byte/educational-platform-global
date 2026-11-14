/**
 * FCM foreground contract — the automated account-approval push.
 *
 * Shared server contract:
 *   notification: { title: "Your account is approved 🎉", body: "Sign in to start learning." }
 *   data:         { kind: "account_approved", deepLink: "/welcome/approved", userId: "<uid>" }
 *
 * Foreground (`onMessage`): toast + navigate to data.deepLink + refresh the
 * auth session. The handler must never throw, whatever the payload carries.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  toast: vi.fn(),
  pushNotification: vi.fn(),
  registerFcmToken: vi.fn(async (..._args: unknown[]) => ({ ok: true, token: "device-token" })),
  syncFcmToken: vi.fn(async (..._args: unknown[]) => ({ ok: true, token: "device-token", changed: false })),
  startFcmTokenRefresh: vi.fn((..._args: unknown[]) => () => {}),
  onMessageHandlers: [] as Array<(payload: unknown) => void>,
  onMessageUnsub: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push, replace: mocks.replace }),
  usePathname: () => "/welcome/pending",
}));
vi.mock("sonner", () => ({ toast: (...args: unknown[]) => mocks.toast(...args) }));
vi.mock("@/lib/notifications", () => ({
  pushNotification: (...args: unknown[]) => mocks.pushNotification(...args),
}));
vi.mock("@/providers/auth-provider", () => ({
  useAuth: () => ({ user: { id: "u1" }, isLoading: false, refresh: mocks.refresh, logoutUser: vi.fn() }),
}));
vi.mock("@/lib/fcm/config", () => ({
  isFcmConfigured: () => true,
  isFirebaseWebConfigured: () => true,
  readFcmVapidKey: () => "vapid",
  readFirebaseWebConfig: () => ({ apiKey: "k" }),
}));
vi.mock("@/lib/fcm/firebase-app", () => ({
  getFirebaseMessaging: async () => ({ app: "fake" }),
}));
vi.mock("@/lib/fcm/register-token", () => ({
  registerFcmToken: (...args: unknown[]) => mocks.registerFcmToken(...args),
  syncFcmToken: (...args: unknown[]) => mocks.syncFcmToken(...args),
}));
vi.mock("@/lib/fcm/token-refresh", () => ({
  startFcmTokenRefresh: (...args: unknown[]) => mocks.startFcmTokenRefresh(...args),
}));
vi.mock("firebase/messaging", () => ({
  onMessage: (_messaging: unknown, handler: (payload: unknown) => void) => {
    mocks.onMessageHandlers.push(handler);
    return mocks.onMessageUnsub;
  },
}));

import { FcmNotificationListener } from "@/lib/fcm/notification-listener";
import { clearPendingSignup, readAccessOutcome } from "@/features/auth/pending-signup-identity";

/** The exact push payload the server sends on PENDING → ACTIVE. */
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

async function renderListenerAndGetHandler() {
  render(<FcmNotificationListener />);
  await waitFor(() => expect(mocks.onMessageHandlers.length).toBeGreaterThan(0));
  return mocks.onMessageHandlers[mocks.onMessageHandlers.length - 1];
}

beforeEach(() => {
  vi.clearAllMocks();
  clearPendingSignup();
  mocks.onMessageHandlers.length = 0;
});

describe("foreground account_approved handling", () => {
  it("refreshes the session and navigates to data.deepLink", async () => {
    const handler = await renderListenerAndGetHandler();

    handler(APPROVAL_PAYLOAD);

    await waitFor(() => expect(mocks.refresh).toHaveBeenCalled());
    expect(mocks.replace).toHaveBeenCalledWith("/welcome/approved");
    // Cached route hints mirror the server verdict while live gates re-validate.
    expect(readAccessOutcome()).toBe("ACTIVE");
    // The toast + inbox entry still surface the notification itself.
    expect(mocks.toast).toHaveBeenCalledWith(
      "Your account is approved 🎉",
      expect.objectContaining({ description: "Sign in to start learning." }),
    );
    expect(mocks.pushNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        category: "account",
        title: "Your account is approved 🎉",
        body: "Sign in to start learning.",
        href: "/welcome/approved",
      }),
    );
  });

  it("falls back to /welcome/approved when the payload carries no deepLink", async () => {
    const handler = await renderListenerAndGetHandler();

    handler({
      notification: APPROVAL_PAYLOAD.notification,
      data: { kind: "account_approved", userId: "uid-42" },
    });

    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome/approved"));
    expect(mocks.refresh).toHaveBeenCalled();
  });

  it("never auto-navigates for non-approval messages (toast action only)", async () => {
    const handler = await renderListenerAndGetHandler();

    handler({
      notification: { title: "Quiz streak", body: "Nice work." },
      data: { kind: "streak", deepLink: "/home/member" },
    });

    await waitFor(() => expect(mocks.toast).toHaveBeenCalled());
    expect(mocks.replace).not.toHaveBeenCalled();
    expect(mocks.refresh).not.toHaveBeenCalled();
  });

  it("never throws and still navigates when the extras fail", async () => {
    const handler = await renderListenerAndGetHandler();
    mocks.pushNotification.mockImplementation(() => {
      throw new Error("inbox down");
    });
    mocks.toast.mockImplementation(() => {
      throw new Error("toast down");
    });

    expect(() => handler(APPROVAL_PAYLOAD)).not.toThrow();
    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/welcome/approved"));
    expect(mocks.refresh).toHaveBeenCalled();
  });

  it("never throws on a malformed payload", async () => {
    const handler = await renderListenerAndGetHandler();

    expect(() => handler({})).not.toThrow();
    expect(() =>
      handler({ data: { deepLink: "https://evil.example/x?y=1#z" } }),
    ).not.toThrow();
  });
});

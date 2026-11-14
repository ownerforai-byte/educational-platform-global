"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { pushNotification } from "@/lib/notifications";
import {
  APPROVED_ROUTE,
  readStatusToken,
  rememberAccessOutcome,
} from "@/features/auth/pending-signup-identity";
import { useAuth } from "@/providers/auth-provider";
import { isFcmConfigured } from "./config";
import { registerFcmToken, syncFcmToken } from "./register-token";
import { startFcmTokenRefresh } from "./token-refresh";

function deepLinkFromPayload(data: Record<string, string> | undefined): string | null {
  if (!data) return null;
  const raw = data.deepLink || data.url || data.click_action || "";
  if (!raw) return null;
  try {
    if (raw.startsWith("http")) {
      const u = new URL(raw);
      return u.pathname + u.search + u.hash;
    }
  } catch {
    /* ignore */
  }
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function normalizeDeepLink(pathname: string | null | undefined): string {
  return pathname && pathname.startsWith("/") ? pathname : "/home/member";
}

/**
 * Registers the FCM token after login / pending signup, keeps it fresh across
 * FCM token rotation (re-check + re-register on focus / visibility / interval),
 * listens for foreground messages, and deep-links on tap via toast action.
 *
 * Contract constant: the server's approval push carries
 * `data.kind === "account_approved"` with `deepLink: "/welcome/approved"` —
 * `ACCOUNT_APPROVED_KIND` is exported so the handler and its tests share one
 * definition. On that message the listener refreshes the auth session and
 * navigates to the deep link (see the `onMessage` handler below).
 */
export const ACCOUNT_APPROVED_KIND = "account_approved";

export function FcmNotificationListener() {
  const { user, isLoading, refresh } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isFcmConfigured() || isLoading) return;

    const statusToken = readStatusToken();
    const shouldRegister = Boolean(user) || Boolean(statusToken);
    if (!shouldRegister) return;

    // Prompts for permission (when needed) and stores the token for this
    // user. `registerFcmToken` never throws — failures surface as results.
    void registerFcmToken({
      statusToken,
      deepLink: normalizeDeepLink(window.location.pathname),
    });

    // Token-rotation guard: re-checks `getToken` on focus / visibility /
    // interval and re-registers only when the token (or deep link) changed.
    return startFcmTokenRefresh({
      statusToken,
      deepLink: () => normalizeDeepLink(window.location.pathname),
    });
  }, [user, isLoading]);

  // Keep the stored deep link fresh as the user navigates (quiet: never
  // prompts, and re-registers only when something actually changed).
  useEffect(() => {
    if (!isFcmConfigured() || isLoading) return;
    const statusToken = readStatusToken();
    if (!user && !statusToken) return;
    void syncFcmToken({ statusToken, deepLink: normalizeDeepLink(pathname) });
  }, [user, isLoading, pathname]);

  useEffect(() => {
    if (!isFcmConfigured()) return;
    let unsub: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      try {
        const [{ onMessage }, { getFirebaseMessaging }] = await Promise.all([
          import("firebase/messaging"),
          import("./firebase-app"),
        ]);
        const messaging = await getFirebaseMessaging();
        if (!messaging || cancelled) return;

        unsub = onMessage(messaging, (payload) => {
          // The notification path must NEVER break the app — every step is
          // individually guarded, so one failing extra (inbox, toast, router)
          // can never take the others (or the app) down with it.
          const step = (run: () => void) => {
            try {
              run();
            } catch {
              /* never break the app over a push payload */
            }
          };

          const title = payload.notification?.title ?? "Verner";
          const body = payload.notification?.body ?? "Open the app to continue.";
          const data = (payload.data ?? {}) as Record<string, string>;
          const isApproval = data.kind === ACCOUNT_APPROVED_KIND;
          const deepLink =
            deepLinkFromPayload(data) ?? (isApproval ? APPROVED_ROUTE : "/home/member");
          const id = `fcm:${data.requestId ?? data.kind ?? Date.now()}`;

          // ── Contract: automated account approval ────────────────────
          // data.kind === "account_approved" → the background bot just
          // flipped this account to ACTIVE. Refresh the auth session so the
          // UI reflects the new state and move straight to the deep link
          // (data.deepLink → /welcome/approved).
          if (isApproval) {
            step(() => {
              // Mirror the verdict locally so cached route hints agree while
              // the live gates re-validate.
              rememberAccessOutcome("ACTIVE");
              refresh();
              router.replace(deepLink);
            });
          }

          step(() => {
            pushNotification({
              id,
              category: "account",
              title,
              body,
              href: deepLink,
              actionLabel: "Open",
            });
          });

          step(() => {
            toast(title, {
              description: body,
              action: {
                label: "Open",
                onClick: () => router.push(deepLink),
              },
            });
          });
        });
      } catch {
        /* foreground messaging is a bonus — never break the app over it */
      }
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [router, refresh]);

  return null;
}

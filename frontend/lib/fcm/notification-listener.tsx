"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { pushNotification } from "@/lib/notifications";
import { readStatusToken } from "@/features/auth/pending-signup-identity";
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
 */
export function FcmNotificationListener() {
  const { user, isLoading } = useAuth();
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
          const title = payload.notification?.title ?? "Verner";
          const body = payload.notification?.body ?? "Open the app to continue.";
          const data = (payload.data ?? {}) as Record<string, string>;
          const deepLink = deepLinkFromPayload(data) ?? "/home/member";
          const id = `fcm:${data.requestId ?? data.kind ?? Date.now()}`;

          pushNotification({
            id,
            category: "account",
            title,
            body,
            href: deepLink,
            actionLabel: "Open",
          });

          toast(title, {
            description: body,
            action: {
              label: "Open",
              onClick: () => router.push(deepLink),
            },
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
  }, [router]);

  return null;
}

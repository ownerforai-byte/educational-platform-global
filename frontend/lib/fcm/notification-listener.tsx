"use client";

import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { pushNotification } from "@/lib/notifications";
import { readStatusToken } from "@/features/auth/pending-signup-identity";
import { useAuth } from "@/providers/auth-provider";
import { getFirebaseMessaging } from "./firebase-app";
import { isFcmConfigured } from "./config";
import { registerFcmToken } from "./register-token";

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

/**
 * Registers the FCM token after login / pending signup, listens for
 * foreground messages, and deep-links on tap via toast action.
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

    let cancelled = false;
    void (async () => {
      const result = await registerFcmToken({
        statusToken,
        deepLink: pathname?.startsWith("/") ? pathname : "/home/member",
      });
      if (cancelled || !result.ok) return;
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isLoading, pathname]);

  useEffect(() => {
    if (!isFcmConfigured()) return;
    let unsub: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
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
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [router]);

  return null;
}

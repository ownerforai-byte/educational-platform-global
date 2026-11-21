"use client";

import { registerFcmToken } from "@/lib/fcm/register-token";

declare global {
  interface Window {
    __RN_ON_NATIVE_FCM_TOKEN__?: (token: string) => void;
  }
}

/**
 * When the Android WebView shell provides a native FCM token, register it with
 * the same backend store used by web push (Firestore `fcm_tokens`).
 */
export function bindAndroidNativeFcmBridge(): void {
  if (typeof window === "undefined") return;
  window.__RN_ON_NATIVE_FCM_TOKEN__ = (token: string) => {
    if (!token?.trim()) return;
    void registerFcmToken({ token: token.trim() });
  };
}
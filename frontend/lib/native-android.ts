"use client";

declare global {
  interface Window {
    __RN_NATIVE_ANDROID__?: boolean;
    RnNative?: {
      isNativeAndroid?: () => boolean;
      refreshFcmRegistration?: () => void;
      areNotificationsEnabled?: () => boolean;
      openNotificationSettings?: () => void;
    };
  }
}

/** True when running inside the Play Store native shell (WebView). */
export function isAndroidNativeShell(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__RN_NATIVE_ANDROID__ === true) return true;
  try {
    return window.RnNative?.isNativeAndroid?.() === true;
  } catch {
    return false;
  }
}
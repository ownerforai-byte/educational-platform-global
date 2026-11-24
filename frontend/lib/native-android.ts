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

const NATIVE_UA = /RavikisanAndroid\//i;

/**
 * True when running inside the Play Store native shell (WebView).
 *
 * The APK appends {@code RavikisanAndroid/<version>} to the user agent on every
 * request, so the first client paint can detect native before
 * {@code __RN_NATIVE_ANDROID__} is injected (that flag is set only after
 * {@code onPageFinished}, which used to make the site render full browser chrome
 * until a manual reload).
 */
export function isAndroidNativeShell(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__RN_NATIVE_ANDROID__ === true) return true;
  if (typeof navigator !== "undefined" && NATIVE_UA.test(navigator.userAgent)) {
    return true;
  }
  try {
    return window.RnNative?.isNativeAndroid?.() === true;
  } catch {
    return false;
  }
}
"use client";

import { useEffect, useState } from "react";
import { isAndroidNativeShell } from "@/lib/native-android";

/**
 * True when the UI should read as a standalone app surface — no Docs Viewer
 * chrome, no desk framing, no marketing footers. Today: the Play Store WebView
 * shell; extend here if other embed contracts need the same treatment.
 */
export function isStandaloneReaderChrome(): boolean {
  if (typeof window === "undefined") return false;
  return isAndroidNativeShell();
}

/** Re-sync when the WebView injects {@code __RN_NATIVE_ANDROID__} after load. */
export function useStandaloneReaderChrome(): boolean {
  const [standalone, setStandalone] = useState(() => isStandaloneReaderChrome());
  useEffect(() => {
    const sync = () => setStandalone(isStandaloneReaderChrome());
    sync();
    window.addEventListener("rn-native-ready", sync);
    return () => window.removeEventListener("rn-native-ready", sync);
  }, []);
  return standalone;
}
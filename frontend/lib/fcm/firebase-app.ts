"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";
import { readFirebaseWebConfig } from "./config";

let app: FirebaseApp | null = null;
let messaging: Messaging | null = null;

/**
 * Shared Firebase web app, initialized from the NEXT_PUBLIC_* env config only
 * (never hardcoded). Returns null during SSR, when the config is absent, or
 * when initialization fails. `@/lib/firebase/client-auth` reuses this same
 * instance via `getApps()[0]`.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;
  if (app) return app;
  const config = readFirebaseWebConfig();
  if (!config) return null;
  try {
    app = getApps()[0] ?? initializeApp(config);
  } catch {
    app = null;
  }
  return app;
}

/**
 * FCM messaging instance, or null when unavailable: SSR, browsers without
 * push/messaging support, missing Firebase config, or an init failure.
 * Never throws.
 */
export async function getFirebaseMessaging(): Promise<Messaging | null> {
  if (typeof window === "undefined") return null;
  try {
    if (!(await isSupported())) return null;
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    if (!messaging) {
      messaging = getMessaging(firebaseApp);
    }
    return messaging;
  } catch {
    return null;
  }
}

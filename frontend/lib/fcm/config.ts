/**
 * Public Firebase web config for FCM.
 * Values come from NEXT_PUBLIC_* env — never put the service-role key here.
 */
import { getPublicEnv } from "@/lib/env";

export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

export function readFirebaseWebConfig(): FirebaseWebConfig | null {
  const env = getPublicEnv();
  const apiKey = env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  const authDomain = env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  const storageBucket = env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();
  const messagingSenderId = env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim();
  const appId = env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim();
  const measurementId = env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim();

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    ...(measurementId ? { measurementId } : {}),
  };
}

export function readFcmVapidKey(): string | null {
  return getPublicEnv().NEXT_PUBLIC_FIREBASE_VAPID_KEY?.trim() || null;
}

/** Firebase web config present (auth/messaging app can be created). */
export function isFirebaseWebConfigured(): boolean {
  return Boolean(readFirebaseWebConfig());
}

/** Full FCM readiness: web config AND the VAPID key are both set. */
export function isFcmConfigured(): boolean {
  return Boolean(readFirebaseWebConfig() && readFcmVapidKey());
}

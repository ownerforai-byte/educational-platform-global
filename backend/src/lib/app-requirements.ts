import { PUBLIC_SITE_URL } from "../config/env.js";

/** Play Console + in-app support contact (must match play-store/*.md). */
export const APP_SUPPORT_EMAIL = "sahrocky81@gmail.com";

export const ANDROID_PACKAGE_ID = "com.ravikisan.platform";

/** Current Play `versionCode` in android-twa/android/app/build.gradle */
export const MIN_ANDROID_VERSION_CODE = 17;

/**
 * Canonical legal, support, and client requirements exposed at GET /api/v2/meta
 * so web, Android, and Play Console stay aligned on one source of truth.
 */
export function buildAppRequirements() {
  const base = PUBLIC_SITE_URL;
  return {
    appName: "Ravikisan's Platform",
    website: base,
    supportEmail: APP_SUPPORT_EMAIL,
    legal: {
      privacy: `${base}/legal/privacy`,
      terms: `${base}/legal/terms`,
      cookies: `${base}/legal/cookies`,
      purchases: `${base}/legal/purchases`,
      deleteAccount: `${base}/legal/delete-account`,
      dataSafety: `${base}/legal/data-safety`,
    },
    clients: {
      androidPackage: ANDROID_PACKAGE_ID,
      minAndroidVersionCode: MIN_ANDROID_VERSION_CODE,
    },
  } as const;
}

export type AppRequirements = ReturnType<typeof buildAppRequirements>;
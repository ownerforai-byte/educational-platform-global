/**
 * Unified three-tier storage router (free-tier default).
 *
 * - Tier 1 (Supabase): relational only — callers keep using supabaseAdmin.
 * - Tier 2 (Firestore): FCM tokens, notification logs, access sessions.
 * - Tier 3 (R2): all binary uploads.
 *
 * Firebase Storage is not used on free tier (Blaze-only; branch removed).
 */
import { r2Upload, isR2StorageActive, supabaseStorageHealth } from "./r2";
import { firebaseAdminHealth } from "./firebase-admin";
import { classifyBinaryUpload, type StorageProvider } from "./tiers";

export type RoutedUploadResult = {
  path: string;
  publicUrl: string;
  storedIn: StorageProvider;
  tier: 2 | 3;
};

export type RouteUploadInput = {
  path: string;
  contentType: string;
  buffer: Buffer;
};

export async function routeBinaryUpload(
  input: RouteUploadInput,
): Promise<RoutedUploadResult> {
  // Free-tier policy: every binary goes to R2.
  classifyBinaryUpload({
    contentType: input.contentType,
    byteLength: input.buffer.byteLength,
    path: input.path,
  });

  if (!isR2StorageActive()) {
    throw new Error(
      "Tier 3 (Cloudflare R2) is not configured — required on free tier for all file uploads",
    );
  }
  const { url } = await r2Upload(input.path, input.buffer, input.contentType);
  return {
    path: input.path,
    publicUrl: url,
    storedIn: "r2",
    tier: 3,
  };
}

export async function storageTiersHealth(): Promise<{
  plan: "free-tier";
  tier1: {
    provider: "supabase";
    role: string;
    database: string;
    storage: Awaited<ReturnType<typeof supabaseStorageHealth>>;
  };
  tier2: {
    provider: "firebase-firestore";
    role: string;
    admin: ReturnType<typeof firebaseAdminHealth>;
    firebaseStorage: "disabled-on-spark";
  };
  tier3: { provider: "r2"; role: string; configured: boolean };
  routing: {
    binariesNeverUseSupabaseStorage: true;
    allBinariesOnFreeTierGoToR2: true;
    relational: "supabase";
    fcmAndNotificationLogs: "firestore";
  };
}> {
  const storage = await supabaseStorageHealth();
  return {
    plan: "free-tier",
    tier1: {
      provider: "supabase",
      role: "relational CRUD only (no new binary uploads)",
      database: "postgres",
      storage,
    },
    tier2: {
      provider: "firebase-firestore",
      role: "FCM tokens, notification logs, access sessions (Spark)",
      admin: firebaseAdminHealth(),
      firebaseStorage: "disabled-on-spark",
    },
    tier3: {
      provider: "r2",
      role: "all binary uploads (PDFs, images, AV) — 10GB free",
      configured: isR2StorageActive(),
    },
    routing: {
      binariesNeverUseSupabaseStorage: true,
      allBinariesOnFreeTierGoToR2: true,
      relational: "supabase",
      fcmAndNotificationLogs: "firestore",
    },
  };
}

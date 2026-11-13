/**
 * Unified three-tier storage router (free-tier default).
 *
 * - Tier 1 (Supabase): relational only — callers keep using supabaseAdmin.
 * - Tier 2 (Firestore): FCM tokens, notification logs, access sessions.
 * - Tier 3 (R2): all binary uploads on Spark free tier.
 *
 * Firebase Storage stays opt-in (`FIREBASE_STORAGE_ENABLED=true`) because it
 * requires the Blaze plan; Spark projects cannot create a Storage bucket.
 */
import { r2Upload, isR2StorageActive, supabaseStorageHealth } from "./r2";
import { firebaseUpload } from "./firebase-store";
import { firebaseAdminHealth, isFirebaseAdminConfigured } from "./firebase-admin";
import {
  classifyBinaryUpload,
  isFirebaseStorageEnabled,
  type StorageProvider,
} from "./tiers";

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
  const tier = classifyBinaryUpload({
    contentType: input.contentType,
    byteLength: input.buffer.byteLength,
    path: input.path,
  });

  // Free tier (default): everything object-shaped goes to R2.
  if (tier === 3 || !isFirebaseStorageEnabled()) {
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

  // Optional Blaze path: small images → Firebase Storage, with R2 fallback.
  if (isFirebaseAdminConfigured()) {
    try {
      const { url, path } = await firebaseUpload(
        input.path,
        input.buffer,
        input.contentType,
      );
      return { path, publicUrl: url, storedIn: "firebase", tier: 2 };
    } catch (err) {
      if (isR2StorageActive()) {
        const { url } = await r2Upload(input.path, input.buffer, input.contentType);
        return {
          path: input.path,
          publicUrl: url,
          storedIn: "r2",
          tier: 3,
        };
      }
      throw err;
    }
  }

  if (isR2StorageActive()) {
    const { url } = await r2Upload(input.path, input.buffer, input.contentType);
    return {
      path: input.path,
      publicUrl: url,
      storedIn: "r2",
      tier: 3,
    };
  }

  throw new Error("No object store configured (set R2_* for free-tier uploads)");
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
    firebaseStorage: "disabled-on-spark" | "opt-in-blaze";
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
      firebaseStorage: isFirebaseStorageEnabled()
        ? "opt-in-blaze"
        : "disabled-on-spark",
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

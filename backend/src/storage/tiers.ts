/**
 * Three-tier storage classification — free-tier layout (Spark + R2 + Supabase).
 *
 * Tier 1 — Supabase Postgres (≤500MB): relational CRUD only. Never binaries.
 * Tier 2 — Firebase Firestore (Spark free DB quota): FCM tokens, notification
 *          logs, access-session mirrors. Firebase Storage is NOT used on
 *          Spark (requires Blaze); medium files share Tier 3 (R2).
 * Tier 3 — Cloudflare R2 (10GB free): ALL binaries (PDF, images, AV, uploads).
 *
 * Set FIREBASE_STORAGE_ENABLED=true only after upgrading to Blaze if you want
 * medium images on Firebase Storage again.
 */

export type StorageTier = 1 | 2 | 3;
export type StorageProvider = "supabase" | "firebase" | "r2" | "firestore";

export const TIER_PROVIDER = {
  1: "supabase" as const,
  2: "firestore" as const,
  3: "r2" as const,
};

/** True only when explicitly opted into Blaze Firebase Storage. */
export function isFirebaseStorageEnabled(): boolean {
  const raw = (process.env.FIREBASE_STORAGE_ENABLED ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export type UploadClassInput = {
  contentType: string;
  byteLength: number;
  path?: string;
};

/**
 * Binary uploads: free-tier → always Tier 3 (R2).
 * Optional Blaze: small images can use Firebase Storage (Tier 2 object lane).
 */
export function classifyBinaryUpload(input: UploadClassInput): 2 | 3 {
  if (!isFirebaseStorageEnabled()) return 3;

  const mime = input.contentType.toLowerCase().trim();
  const path = (input.path ?? "").toLowerCase();
  const heavy =
    mime === "application/pdf" ||
    mime.startsWith("video/") ||
    mime.startsWith("audio/") ||
    path.endsWith(".pdf") ||
    path.endsWith(".mp4") ||
    path.endsWith(".webm") ||
    path.endsWith(".mp3") ||
    input.byteLength >= 1 * 1024 * 1024;

  if (heavy) return 3;
  if (mime.startsWith("image/")) return 2;
  return 3;
}

export type FirestoreDocKind =
  | "fcm_token"
  | "notification_log"
  | "access_session";

export function classifyRealtimeDoc(_kind: FirestoreDocKind): 2 {
  return 2;
}

export type RelationalKind =
  | "profile"
  | "journey"
  | "quiz_score"
  | "bookmark"
  | "credits"
  | "community"
  | "curriculum";

export function classifyRelational(_kind: RelationalKind): 1 {
  return 1;
}

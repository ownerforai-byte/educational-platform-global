import { getFirestore } from "./firebase-admin";

/**
 * Firestore `profiles` collection (doc id = Firebase uid) — Supabase→Firebase
 * auth migration contract. Keep in sync with firebase/functions/src/firestore.ts
 * (the auto-approval bot) and backend/src/services/auth-profile.ts (the writer).
 */
export const PROFILES_COLLECTION = "profiles";

export type ProfileAccessStatus = "PENDING" | "ACTIVE" | "REJECTED";

/** Contract doc shape — extra fields may exist; these are the shared ones. */
export interface ProfileDoc {
  id: string;
  full_name: string | null;
  email: string | null;
  access_status: ProfileAccessStatus;
  role: string;
  plan: string;
  premium_status: boolean;
  created_at: string;
  [key: string]: unknown;
}

/**
 * Read one `profiles` doc. Returns null when the doc is missing OR Firebase
 * Admin is not configured (callers fall back to the legacy Supabase row).
 */
export async function readProfileDoc(userId: string): Promise<Record<string, unknown> | null> {
  const db = getFirestore();
  if (!db) return null;
  try {
    const snap = await db.collection(PROFILES_COLLECTION).doc(userId).get();
    return snap.exists ? (snap.data() ?? null) : null;
  } catch (err) {
    console.warn(
      "[firebase-store] readProfileDoc failed:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/**
 * Merge-create/update a `profiles` doc. Never overwrites fields it is not
 * given ({ merge: true }), so partial writers (login name refresh, status
 * bumps) cannot clobber the contract fields.
 */
export async function upsertProfileDoc(
  userId: string,
  fields: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  const db = getFirestore();
  if (!db) return { error: null };
  try {
    await db
      .collection(PROFILES_COLLECTION)
      .doc(userId)
      .set({ ...fields, id: userId }, { merge: true });
    return { error: null };
  } catch (err) {
    return { error: { message: err instanceof Error ? err.message : "profile upsert failed" } };
  }
}

/**
 * Update an existing `profiles` doc; a missing doc is a silent no-op (matches
 * the legacy Supabase `update ... eq(id)` semantics).
 */
export async function updateProfileDoc(
  userId: string,
  fields: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  const db = getFirestore();
  if (!db) return { error: null };
  try {
    const ref = db.collection(PROFILES_COLLECTION).doc(userId);
    const snap = await ref.get();
    if (!snap.exists) return { error: null };
    await ref.set(fields, { merge: true });
    return { error: null };
  } catch (err) {
    return { error: { message: err instanceof Error ? err.message : "profile update failed" } };
  }
}

export async function upsertFcmTokenDoc(
  userId: string,
  token: string,
  extra?: Record<string, unknown>,
): Promise<void> {
  const db = getFirestore();
  if (!db) return;
  await db.collection("fcm_tokens").doc(userId).set(
    {
      userId,
      token,
      updatedAt: new Date().toISOString(),
      ...extra,
    },
    { merge: true },
  );
}

export async function appendNotificationLog(entry: {
  userId: string;
  kind: string;
  title: string;
  body: string;
  deepLink?: string;
  requestId?: string;
}): Promise<string | null> {
  const db = getFirestore();
  if (!db) return null;
  const ref = await db.collection("notification_logs").add({
    ...entry,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function upsertAccessSession(entry: {
  requestId: string;
  userId: string;
  status: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  expiresAt?: string | null;
}): Promise<void> {
  const db = getFirestore();
  if (!db) return;
  await db.collection("access_sessions").doc(entry.requestId).set(
    {
      ...entry,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );
}

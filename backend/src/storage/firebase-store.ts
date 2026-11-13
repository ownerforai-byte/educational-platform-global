import { getFirestore, getStorageBucket, isFirebaseAdminConfigured } from "./firebase-admin";

export async function firebaseUpload(
  path: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ url: string; path: string }> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Storage is not configured");
  }
  const bucket = getStorageBucket();
  if (!bucket) throw new Error("Firebase Storage bucket unavailable");

  const key = path.replace(/^\/+/, "");
  const file = bucket.file(`media/${key}`);
  await file.save(buffer, {
    contentType,
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=86400",
      contentType,
    },
  });

  // Prefer a signed URL (works with uniform bucket-level access).
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  return { url, path: `media/${key}` };
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

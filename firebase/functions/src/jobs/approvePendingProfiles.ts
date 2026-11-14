import { logger } from "firebase-functions";
import { type QueryDocumentSnapshot } from "firebase-admin/firestore";
import {
  createdAtMillis,
  getFirestoreAdmin,
  PROFILES_COLLECTION,
  type Profile,
} from "../firestore";

/** New signups stay PENDING exactly this long before auto-approval (300 s = 5 min). */
export const APPROVAL_DELAY_MS = 300_000;

const PAGE_SIZE = 250;
const MAX_PAGES_PER_RUN = 20;

export interface ApprovalSummary {
  scanned: number;
  approved: number;
  skipped: number;
  errors: number;
}

/**
 * Promote due `profiles` docs PENDING → ACTIVE once they are at least
 * 300 s old (by `created_at`).
 *
 * - Idempotent: only docs still `access_status === "PENDING"` are written, so
 *   already-ACTIVE docs are never re-approved and manual REJECTED / ACTIVE
 *   decisions always win.
 * - Tolerant: missing / unparseable `created_at` is logged and skipped (age
 *   unknown → never guess); docs disappearing mid-run are no-ops.
 */
export async function approvePendingProfiles(now = Date.now()): Promise<ApprovalSummary> {
  const db = getFirestoreAdmin();
  const dueBeforeMs = now - APPROVAL_DELAY_MS;
  const summary: ApprovalSummary = { scanned: 0, approved: 0, skipped: 0, errors: 0 };
  let cursor: QueryDocumentSnapshot | null = null;

  for (let page = 0; page < MAX_PAGES_PER_RUN; page += 1) {
    let query = db
      .collection(PROFILES_COLLECTION)
      .where("access_status", "==", "PENDING")
      .limit(PAGE_SIZE);
    if (cursor) query = query.startAfter(cursor);

    const snap = await query.get();
    if (snap.empty) break;

    for (const doc of snap.docs) {
      summary.scanned += 1;
      const createdMs = createdAtMillis(doc.get("created_at"));
      if (createdMs === null) {
        summary.skipped += 1;
        logger.warn("approvePendingProfiles: missing/unparseable created_at, skipping", {
          uid: doc.id,
          created_at: doc.get("created_at") ?? null,
        });
        continue;
      }
      if (createdMs > dueBeforeMs) {
        summary.skipped += 1;
        continue; // Not due yet — the next tick will pick it up.
      }
      try {
        const approved = await approveIfStillPending(doc.ref, dueBeforeMs);
        if (approved) summary.approved += 1;
        else summary.skipped += 1;
      } catch (err) {
        summary.errors += 1;
        logger.error("approvePendingProfiles: failed to approve profile", {
          uid: doc.id,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    cursor = snap.docs[snap.docs.length - 1] ?? null;
    if (snap.size < PAGE_SIZE) break;
  }

  logger.info("approvePendingProfiles: cycle done", {
    ...summary,
    dueBefore: new Date(dueBeforeMs).toISOString(),
  });
  return summary;
}

/**
 * Transactional re-check so a concurrent manual approve/reject between the
 * query and the write can never be overwritten.
 */
async function approveIfStillPending(
  ref: QueryDocumentSnapshot["ref"],
  dueBeforeMs: number,
): Promise<boolean> {
  const db = getFirestoreAdmin();
  return db.runTransaction(async (tx) => {
    const fresh = await tx.get(ref);
    if (!fresh.exists) {
      logger.warn("approvePendingProfiles: profile disappeared mid-run", { uid: ref.id });
      return false;
    }
    const data = fresh.data() as Partial<Profile> | undefined;
    if (!data || data.access_status !== "PENDING") {
      return false; // Already handled elsewhere — idempotent no-op.
    }
    const createdMs = createdAtMillis(data.created_at);
    if (createdMs === null || createdMs > dueBeforeMs) {
      return false;
    }
    tx.update(ref, { access_status: "ACTIVE" });
    logger.info("approvePendingProfiles: approved", {
      uid: ref.id,
      ageSeconds: Math.round((Date.now() - createdMs) / 1000),
    });
    return true;
  });
}

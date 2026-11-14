/**
 * Firestore `profiles` contract + transition merge rules (Supabase→Firebase
 * auth migration): the signup writer must create the exact doc shape the
 * auto-approval Cloud Function consumes, and merged reads must honour the
 * decisive states of both stores while legacy rows are still being migrated.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => {
  const docs = new Map<string, Record<string, unknown>>();
  const rows = new Map<string, Record<string, unknown>>();

  /** Minimal in-memory Firestore (collection("profiles").doc(id).set/get). */
  const firestore = {
    collection: (_name: string) => ({
      doc: (id: string) => ({
        set: async (data: Record<string, unknown>, opts?: { merge?: boolean }) => {
          const current = docs.get(id) ?? {};
          docs.set(id, opts?.merge ? { ...current, ...data } : { ...data });
        },
        get: async () => {
          const data = docs.get(id);
          return { exists: Boolean(data), data: () => data };
        },
      }),
    }),
  };

  /** Minimal stateful Supabase chain over the legacy `profiles` rows. */
  function from(table: string) {
    const filters: Array<[string, unknown[]]> = [];
    let op: { method: string; args: unknown[] } | null = null;
    let single = false;
    const chain: Record<string, unknown> = {};
    for (const m of ["select", "eq", "neq", "in", "order", "limit"]) {
      chain[m] = (...args: unknown[]) => {
        filters.push([m, args]);
        return chain;
      };
    }
    for (const m of ["upsert", "update", "insert", "delete"]) {
      chain[m] = (...args: unknown[]) => {
        op = { method: m, args };
        return chain;
      };
    }
    const resolve = async (): Promise<{ data: unknown; error: unknown }> => {
      if (table !== "profiles") return { data: null, error: null };
      if (op?.method === "upsert") {
        const payload = op.args[0] as Record<string, unknown>;
        const id = String(payload.id);
        rows.set(id, { ...(rows.get(id) ?? {}), ...payload });
        return { data: null, error: null };
      }
      if (op?.method === "update") {
        const patch = op.args[0] as Record<string, unknown>;
        const idFilter = filters.find(([m, args]) => m === "eq" && args[0] === "id");
        const row = idFilter ? rows.get(String(idFilter[1][1])) : undefined;
        if (row) Object.assign(row, patch);
        return { data: row ? [row] : [], error: null };
      }
      let matched = [...rows.values()];
      for (const [m, args] of filters) {
        if (m === "eq") {
          matched = matched.filter((r) => (r as Record<string, unknown>)[args[0] as string] === args[1]);
        }
        if (m === "neq") {
          matched = matched.filter((r) => (r as Record<string, unknown>)[args[0] as string] !== args[1]);
        }
      }
      return { data: single ? matched[0] ?? null : matched, error: null };
    };
    chain.maybeSingle = () => {
      single = true;
      return chain;
    };
    chain.single = () => {
      single = true;
      return chain;
    };
    chain.then = (onF?: (v: unknown) => unknown, onR?: (r: unknown) => unknown) =>
      resolve().then(onF, onR);
    return chain;
  }

  return { docs, rows, firestore, admin: { from } };
});

vi.mock("../../src/storage/firebase-admin", () => ({
  isFirebaseAdminConfigured: () => true,
  getFirebaseInitError: () => null,
  ensureFirebaseAdmin: () => ({}),
  getFirestore: () => h.firestore,
  getStorageBucket: () => null,
  getFirebaseAuth: () => null,
  firebaseAdminHealth: () => ({ configured: true, ready: true, error: null, storageBucket: null }),
}));

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: h.admin,
  createAuthClient: () => h.admin,
}));

import { ensureAuthProfile } from "../../src/services/auth-profile";
import {
  findProfileIdByUsername,
  getProfileAccessRow,
  getProfileById,
  updateProfileFields,
  upsertProfileFields,
} from "../../src/db/repositories/user.repository";
import { profileImagePath } from "../../src/services/profile-image";

const UID = "11111111-1111-4111-8111-111111111111";

beforeEach(() => {
  h.docs.clear();
  h.rows.clear();
});

describe("Firestore profiles contract (signup writer)", () => {
  it("creates the shared-contract doc on signup: PENDING + created_at + tier defaults", async () => {
    await ensureAuthProfile(UID, {
      email: "student@example.com",
      fullName: "Student One",
      isSignup: true,
    });
    const doc = h.docs.get(UID)!;
    expect(doc).toMatchObject({
      id: UID,
      full_name: "Student One",
      email: "student@example.com",
      access_status: "PENDING",
      role: "member",
      plan: "member",
      premium_status: false,
    });
    expect(typeof doc.created_at).toBe("string");
    expect(Number.isNaN(Date.parse(doc.created_at as string))).toBe(false);
  });

  it("owner signups get ACTIVE owner defaults", async () => {
    await ensureAuthProfile(UID, { email: "sahrocky81@gmail.com", isSignup: true });
    expect(h.docs.get(UID)).toMatchObject({
      access_status: "ACTIVE",
      role: "owner",
      plan: "pro",
      premium_status: true,
    });
  });

  it("first-login creation stamps PENDING + created_at so the bot clock runs", async () => {
    await ensureAuthProfile(UID, { email: "student@example.com" });
    const doc = h.docs.get(UID)!;
    expect(doc.access_status).toBe("PENDING");
    expect(typeof doc.created_at).toBe("string");
  });

  it("later logins never restart the clock or reset access_status", async () => {
    await ensureAuthProfile(UID, { email: "student@example.com", fullName: "Student One", isSignup: true });
    const createdAt = h.docs.get(UID)!.created_at;
    h.docs.get(UID)!.access_status = "ACTIVE"; // the bot approved
    await ensureAuthProfile(UID, { email: "student@example.com", fullName: "Renamed" });
    const doc = h.docs.get(UID)!;
    expect(doc.created_at).toBe(createdAt);
    expect(doc.access_status).toBe("ACTIVE");
    expect(doc.full_name).toBe("Renamed");
  });

  it("carries decisive legacy state over when seeding the doc", async () => {
    h.rows.set(UID, { id: UID, access_status: "REJECTED", created_at: "2026-01-01T00:00:00.000Z" });
    await ensureAuthProfile(UID, { email: "student@example.com" });
    expect(h.docs.get(UID)).toMatchObject({
      access_status: "REJECTED",
      created_at: "2026-01-01T00:00:00.000Z",
    });
  });
});

describe("transition merge rules (Firestore ⇄ legacy row)", () => {
  it("bot approval in Firestore wins over a stale legacy PENDING row", async () => {
    h.docs.set(UID, { id: UID, access_status: "ACTIVE", role: "member" });
    h.rows.set(UID, { id: UID, access_status: "PENDING", role: "member" });
    expect((await getProfileAccessRow(UID))?.access_status).toBe("ACTIVE");
  });

  it("a console REJECTED on the legacy row stays a deny over the doc", async () => {
    h.docs.set(UID, { id: UID, access_status: "ACTIVE", role: "member" });
    h.rows.set(UID, { id: UID, access_status: "REJECTED", role: "member" });
    expect((await getProfileAccessRow(UID))?.access_status).toBe("REJECTED");
  });

  it("legacy-only accounts keep reading until backfilled", async () => {
    h.rows.set(UID, {
      id: UID,
      access_status: "ACTIVE",
      role: "plus",
      plan: "plus",
      premium_status: false,
      full_name: "Legacy Name",
    });
    expect(await getProfileAccessRow(UID)).toMatchObject({ access_status: "ACTIVE", role: "plus" });
    const { data } = await getProfileById(UID, "full_name, access_status");
    expect(data).toMatchObject({ full_name: "Legacy Name", access_status: "ACTIVE" });
  });

  it("writes land in Firestore and mirror to the legacy row", async () => {
    await upsertProfileFields(UID, { access_status: "PENDING", role: "member" });
    expect(h.docs.get(UID)).toMatchObject({ id: UID, access_status: "PENDING", role: "member" });
    expect(h.rows.get(UID)).toMatchObject({ id: UID, access_status: "PENDING", role: "member" });

    await updateProfileFields(UID, { full_name: "Mirror Me" });
    expect(h.docs.get(UID)!.full_name).toBe("Mirror Me");
    expect(h.rows.get(UID)!.full_name).toBe("Mirror Me");
  });
});

describe("field-aware identity sync (read-after-write)", () => {
  function seed(doc: Record<string, unknown>, row: Record<string, unknown>) {
    h.docs.set(UID, { id: UID, ...doc });
    h.rows.set(UID, { id: UID, ...row });
  }

  it("partial identity PATCH does not erase unrelated fields or privileged rungs", async () => {
    seed(
      { access_status: "ACTIVE", role: "plus", full_name: "Keep Me", plan: "plus" },
      {
        access_status: "ACTIVE",
        role: "plus",
        full_name: "Keep Me",
        plan: "plus",
        bio: "original bio",
        location: "Kathmandu",
        username: "keeper",
      },
    );
    await updateProfileFields(UID, { location: "Pokhara" });
    expect(h.rows.get(UID)).toMatchObject({
      bio: "original bio",
      location: "Pokhara",
      username: "keeper",
      full_name: "Keep Me",
      role: "plus",
    });
    expect(h.docs.get(UID)).toMatchObject({
      full_name: "Keep Me",
      role: "plus",
      access_status: "ACTIVE",
    });
    expect(h.docs.get(UID)).not.toHaveProperty("location");
    const { data } = await getProfileById(UID, "bio, location, username, role, access_status, full_name");
    expect(data).toMatchObject({
      bio: "original bio",
      location: "Pokhara",
      username: "keeper",
      role: "plus",
      access_status: "ACTIVE",
      full_name: "Keep Me",
    });
  });

  it("stale Firestore identity cannot shadow a Supabase PATCH", async () => {
    seed(
      { full_name: "Old Firestore", bio: "stale-bio", avatar_path: "profiles/old/avatar.webp", role: "member" },
      {
        full_name: "Old Firestore",
        bio: "stale-bio",
        avatar_path: "profiles/old/avatar.webp",
        username: "student",
        role: "member",
      },
    );
    await updateProfileFields(UID, {
      bio: "fresh-bio",
      avatar_path: "profiles/u/avatar-2.webp",
    });
    expect(h.rows.get(UID)!.bio).toBe("fresh-bio");
    expect(h.rows.get(UID)!.avatar_path).toBe("profiles/u/avatar-2.webp");
    expect(h.docs.get(UID)!.bio).toBe("stale-bio");
    const { data } = await getProfileById(UID, "bio, avatar_path, username");
    expect(data).toMatchObject({
      bio: "fresh-bio",
      avatar_path: "profiles/u/avatar-2.webp",
      username: "student",
    });
  });

  it("full_name PATCH writes both stores and reads back the new name", async () => {
    seed({ full_name: "Before", role: "member" }, { full_name: "Before", role: "member" });
    await updateProfileFields(UID, { full_name: "After Patch" });
    expect(h.docs.get(UID)!.full_name).toBe("After Patch");
    expect(h.rows.get(UID)!.full_name).toBe("After Patch");
    const { data } = await getProfileById(UID, "full_name");
    expect(data?.full_name).toBe("After Patch");
  });

  it("username uniqueness ignores the caller's own row", async () => {
    seed({ role: "member" }, { username: "keeper", role: "member" });
    h.rows.set("other", { id: "other", username: "takenname" });
    expect(await findProfileIdByUsername("keeper", UID)).toBeNull();
    expect(await findProfileIdByUsername("takenname", UID)).toMatchObject({ id: "other" });
  });
});

describe("profile image object keys", () => {
  it("versions avatar and cover paths so replacements can be deleted", () => {
    expect(profileImagePath(UID, "avatar", 1)).toBe(`profiles/${UID}/avatar-1.webp`);
    expect(profileImagePath(UID, "cover", 2)).not.toBe(profileImagePath(UID, "cover", 3));
  });
});

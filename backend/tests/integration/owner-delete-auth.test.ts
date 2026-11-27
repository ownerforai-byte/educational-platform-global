import express, { type Express } from "express";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

const revokeFirebaseSessions = vi.fn();
const firebaseDeleteUser = vi.fn();
const deleteSupabaseUser = vi.fn();
const deleteProfile = vi.fn();

vi.mock("../../src/middleware/auth", () => ({
  requireAuth: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    (req as express.Request & { user: unknown }).user = {
      id: "owner-1",
      email: "operator@example.com",
      role: "owner",
    };
    next();
  },
  isOwnerEmail: () => false,
  isOwnerAccount: () => true,
}));

vi.mock("../../src/db/supabase", () => {
  const chain = {
    delete: (...args: unknown[]) => {
      deleteProfile(...args);
      return chain;
    },
    eq: () => chain,
    then: (resolve: (value: { error: null }) => unknown) => Promise.resolve({ error: null }).then(resolve),
  };
  return {
    supabaseAdmin: {
      auth: { admin: { deleteUser: (...args: unknown[]) => deleteSupabaseUser(...args) } },
      from: () => chain,
    },
  };
});

vi.mock("../../src/auth/firebase-admin-auth.js", () => ({
  revokeFirebaseSessions: (...args: unknown[]) => revokeFirebaseSessions(...args),
  firebaseDeleteUser: (...args: unknown[]) => firebaseDeleteUser(...args),
}));

vi.mock("../../src/utils/authEmails", () => ({
  authEmailsById: vi.fn(async () => new Map([["target-user", "target@example.com"]])),
  invalidateAuthEmailsCache: vi.fn(),
}));

import ownerRoutes from "../../src/api/admin/owner.controller";

let server: ReturnType<Express["listen"]>;
let baseUrl: string;

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/owner", ownerRoutes);
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const address = server.address();
      const port = address && typeof address === "object" ? address.port : 0;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

beforeEach(() => {
  vi.clearAllMocks();
  revokeFirebaseSessions.mockResolvedValue(undefined);
  firebaseDeleteUser.mockResolvedValue(true);
  deleteSupabaseUser.mockResolvedValue({ error: null });
});

afterEach(() => {
  delete process.env.USE_FIREBASE_AUTH;
});

describe("owner account deletion", () => {
  test("revokes and deletes the Firebase identity when Firebase auth is active", async () => {
    process.env.USE_FIREBASE_AUTH = "true";

    const res = await fetch(`${baseUrl}/api/owner/users/target-user`, { method: "DELETE" });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, userId: "target-user" });
    expect(revokeFirebaseSessions).toHaveBeenCalledWith("target-user");
    expect(firebaseDeleteUser).toHaveBeenCalledWith("target-user");
    expect(deleteSupabaseUser).not.toHaveBeenCalled();
    expect(deleteProfile).toHaveBeenCalled();
  });

  test("does not delete the profile when Firebase deletion fails", async () => {
    process.env.USE_FIREBASE_AUTH = "true";
    firebaseDeleteUser.mockResolvedValueOnce(false);

    const res = await fetch(`${baseUrl}/api/owner/users/target-user`, { method: "DELETE" });

    expect(res.status).toBe(500);
    expect(deleteSupabaseUser).not.toHaveBeenCalled();
    expect(deleteProfile).not.toHaveBeenCalled();
  });

  test("uses Supabase deletion in legacy auth mode", async () => {
    delete process.env.USE_FIREBASE_AUTH;

    const res = await fetch(`${baseUrl}/api/owner/users/target-user`, { method: "DELETE" });

    expect(res.status).toBe(200);
    expect(deleteSupabaseUser).toHaveBeenCalledWith("target-user");
    expect(revokeFirebaseSessions).not.toHaveBeenCalled();
    expect(firebaseDeleteUser).not.toHaveBeenCalled();
    expect(deleteProfile).toHaveBeenCalled();
  });
});

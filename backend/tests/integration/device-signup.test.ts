import http from "node:http";
import type { AddressInfo } from "node:net";
import { randomUUID } from "node:crypto";
import express from "express";
import cookieParser from "cookie-parser";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// ───────────────────────────────────────────────────────────────────────────
// Stateful supabaseAdmin mock: a real in-test store for guest_chat_usage
// (device bindings) and profiles (access_status) so the multi-step signup →
// block → approve → allow flow runs end to end against the real auth router.
// ───────────────────────────────────────────────────────────────────────────
const h = vi.hoisted(() => {
  const store = {
    usage: new Map<string, { client_key: string; day: string; count: number }>(),
    profiles: new Map<string, { id: string; access_status: string; role: string }>(),
    grants: [] as Array<{ email: string; revoked_at: string | null }>,
  };

  function likeToRegExp(pattern: string): RegExp {
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*");
    return new RegExp(`^${escaped}$`);
  }

  function makeBuilder(table: string) {
    const filters: Array<{ method: string; args: any[] }> = [];
    let op: { method: string; args: any[] } | null = null;
    let single = false;
    const chain: any = {};
    for (const m of ["select", "eq", "neq", "in", "like", "is", "gte", "lte", "lt", "order", "limit"]) {
      chain[m] = (...args: any[]) => {
        filters.push({ method: m, args });
        return chain;
      };
    }
    for (const m of ["insert", "update", "delete", "upsert"]) {
      chain[m] = (...args: any[]) => {
        op = { method: m, args };
        return chain;
      };
    }

    function resolve(): Promise<{ data: any; error: any }> {
      if (op?.method === "upsert" && table === "guest_chat_usage") {
        const row = op.args[0];
        if (!store.usage.has(row.client_key)) store.usage.set(row.client_key, row);
        return Promise.resolve({ data: [row], error: null });
      }
      if (op?.method === "update" && table === "profiles") {
        const patch = op.args[0];
        const idFilter = filters.find((f) => f.method === "eq" && f.args[0] === "id");
        const row = idFilter ? store.profiles.get(idFilter.args[1]) : undefined;
        if (row) Object.assign(row, patch);
        return Promise.resolve({ data: row ? [row] : [], error: null });
      }
      if (table === "guest_chat_usage") {
        let rows = [...store.usage.values()];
        for (const f of filters) {
          if (f.method === "like") {
            const re = likeToRegExp(f.args[1]);
            rows = rows.filter((r) => re.test((r as any)[f.args[0]]));
          }
        }
        return Promise.resolve({ data: rows, error: null });
      }
      if (table === "profiles") {
        let rows = [...store.profiles.values()];
        for (const f of filters) {
          if (f.method === "in") rows = rows.filter((r) => f.args[1].includes((r as any)[f.args[0]]));
          if (f.method === "eq") rows = rows.filter((r) => (r as any)[f.args[0]] === f.args[1]);
        }
        return Promise.resolve({ data: single ? rows[0] ?? null : rows, error: null });
      }
      if (table === "r1_grants") {
        return Promise.resolve({ data: store.grants, error: null });
      }
      return Promise.resolve({ data: single ? null : [], error: null });
    }

    chain.maybeSingle = () => {
      single = true;
      return resolve();
    };
    chain.single = () => {
      single = true;
      return resolve();
    };
    chain.then = (onF?: any, onR?: any) => resolve().then(onF, onR);
    chain.catch = (onR: any) => resolve().catch(onR);
    return chain;
  }

  const signUp = vi.fn(async ({ email }: { email: string }) => {
    const id = randomUUID();
    store.profiles.set(id, { id, access_status: "PENDING", role: "member" });
    return {
      data: {
        user: { id, email },
        session: { access_token: `tok-${id}`, refresh_token: "refresh", expires_in: 3600 },
      },
      error: null,
    };
  });

  const supabaseAdmin: any = {
    auth: {
      signUp,
      signInWithPassword: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      refreshSession: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      admin: { updateUserById: vi.fn() },
    },
    from: (table: string) => makeBuilder(table),
  };

  function reset() {
    store.usage.clear();
    store.profiles.clear();
    store.grants = [];
    signUp.mockClear();
  }

  return { supabaseAdmin, store, reset, signUp };
});

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: h.supabaseAdmin,
  createAuthClient: () => h.supabaseAdmin,
}));

const authRouter = (await import("../../src/api/auth")).default;
const { DEVICE_SIGNUP_LIMIT_MESSAGE, resetDeviceSignupMemory } = await import(
  "../../src/utils/deviceSignup"
);
const { invalidateR1GrantCache } = await import("../../src/utils/r1Grants");

process.env.SUPABASE_SERVICE_ROLE_KEY = "test-device-signup-signing-key";

const servers: Array<http.Server> = [];

async function mount() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/auth", authRouter);
  const server = http.createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;
  return {
    base,
    signup: async (email: string, cookie?: string) => {
      const res = await fetch(`${base}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify({ email, password: "password123", fullName: "Test Student" }),
      });
      const setCookie = res.headers.get("set-cookie") ?? "";
      const deviceCookie = setCookie.split(/,(?=[^;]+=)/).find((c) => c.trim().startsWith("neb-gid="));
      const body = await res.json();
      return { status: res.status, body, deviceCookie: deviceCookie?.trim().split(";")[0] };
    },
  };
}

afterAll(async () => {
  await Promise.all(servers.map((s) => new Promise((resolve) => s.close(resolve))));
});

beforeEach(() => {
  h.reset();
  resetDeviceSignupMemory();
  invalidateR1GrantCache();
});

describe("device signup limit (one account per device without approval)", () => {
  it("first signup is allowed, binds the device, and mints the HttpOnly device cookie", async () => {
    const { signup } = await mount();
    const res = await signup("first@example.com");
    expect(res.status).toBe(200);
    expect(res.body.accessStatus).toBe("PENDING");
    expect(res.body.statusToken).toBeTruthy();
    expect(res.deviceCookie).toMatch(/^neb-gid=[a-f0-9]{16,64}$/);
    expect(h.store.usage.size).toBe(1);
    expect(h.signUp).toHaveBeenCalledTimes(1);
  });

  it("a second signup from the same device is blocked while the first is PENDING", async () => {
    const { signup } = await mount();
    const first = await signup("first@example.com");
    const second = await signup("second@example.com", first.deviceCookie);
    expect(second.status).toBe(403);
    expect(second.body).toEqual({
      error: DEVICE_SIGNUP_LIMIT_MESSAGE,
      code: "DEVICE_SIGNUP_LIMIT",
    });
    expect(DEVICE_SIGNUP_LIMIT_MESSAGE).toBe(
      "Only one account can be created from one device ~ be careful",
    );
    // The blocked attempt never creates an auth user or a second binding.
    expect(h.signUp).toHaveBeenCalledTimes(1);
    expect(h.store.usage.size).toBe(1);
  });

  it("a different device (no cookie) is unaffected by the first device's pending account", async () => {
    const { signup } = await mount();
    await signup("first@example.com");
    const other = await signup("other@example.com");
    expect(other.status).toBe(200);
    expect(other.body.accessStatus).toBe("PENDING");
    expect(h.signUp).toHaveBeenCalledTimes(2);
  });

  it("approving the bound account (ACTIVE) releases the device for another signup", async () => {
    const { signup } = await mount();
    const first = await signup("first@example.com");
    const boundKey = [...h.store.usage.keys()][0];
    const userId = boundKey.slice(boundKey.lastIndexOf(":") + 1);
    h.store.profiles.get(userId)!.access_status = "ACTIVE";

    const second = await signup("second@example.com", first.deviceCookie);
    expect(second.status).toBe(200);
    expect(second.body.accessStatus).toBe("PENDING");
    expect(h.signUp).toHaveBeenCalledTimes(2);
    expect(h.store.usage.size).toBe(2);
  });

  it("a REJECTED bound account still blocks the device (no approval)", async () => {
    const { signup } = await mount();
    const first = await signup("first@example.com");
    const boundKey = [...h.store.usage.keys()][0];
    const userId = boundKey.slice(boundKey.lastIndexOf(":") + 1);
    h.store.profiles.get(userId)!.access_status = "REJECTED";

    const second = await signup("second@example.com", first.deviceCookie);
    expect(second.status).toBe(403);
    expect(second.body.code).toBe("DEVICE_SIGNUP_LIMIT");
  });

  it("an R1-granted (owner pre-approved) email bypasses the device gate", async () => {
    const { signup } = await mount();
    const first = await signup("first@example.com");
    h.store.grants = [{ email: "invited@example.com", revoked_at: null }];
    invalidateR1GrantCache();

    const invited = await signup("invited@example.com", first.deviceCookie);
    expect(invited.status).toBe(200);
    expect(h.signUp).toHaveBeenCalledTimes(2);
  });
});
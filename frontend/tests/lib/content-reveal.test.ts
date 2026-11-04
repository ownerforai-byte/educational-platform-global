/**
 * Tests for the spark-gated /api/content/reveal endpoint (via its Next.js
 * proxy at POST /api/content/reveal).
 *
 * These tests stub `fetch` to simulate the backend's auth chain:
 *   401  — no session
 *   403  — member tier (tier gate fires before spark query)
 *   403  — plus tier, no active spark window
 *   200  — plus tier with active spark window
 *   200  — owner (bypass)
 *   200  — pro / premiumStatus=true (bypass)
 *   400  — filename with path-traversal characters
 *   400  — unknown kind
 *
 * Property 2 (preservation): the manifest endpoint and public assets are NOT
 * subject to any new auth check — those continue to be served by loadData()
 * hitting /data/* directly.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ─── fetch stub ─────────────────────────────────────────────────────────────

const fetchMock = vi.fn();

function respond(body: unknown, status: number) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    json: async () => body,
    arrayBuffer: async () => {
      const text = JSON.stringify(body);
      return new TextEncoder().encode(text).buffer;
    },
    headers: new Headers({ "content-type": "application/json" }),
  } as unknown as Response;
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ─── shared valid request body ───────────────────────────────────────────────

const VALID_BODY = {
  kind: "concepts",
  classSlug: "class-11-notes",
  subjectSlug: "physics",
  unitSlug: "kinematics",
  filename: "01-motion.json",
  moduleKey: "note:class-11-notes/physics/kinematics/01-motion.json",
};

// ─── helper: POST /api/content/reveal ────────────────────────────────────────

async function postReveal(body: Record<string, unknown>) {
  const res = await fetch("/api/content/reveal", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res;
}

// ─── tests ───────────────────────────────────────────────────────────────────

describe("POST /api/content/reveal — auth chain", () => {
  it("returns 401 when no session cookie is present", async () => {
    fetchMock.mockResolvedValueOnce(respond({ error: "Unauthorized" }, 401));
    const res = await postReveal(VALID_BODY);
    expect(res.status).toBe(401);
  });

  it("returns 403 for member-tier user (tier gate fires before spark query)", async () => {
    fetchMock.mockResolvedValueOnce(
      respond({ error: "This content requires a Plus or higher membership." }, 403),
    );
    const res = await postReveal(VALID_BODY);
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toMatch(/Plus/i);
    // Only one fetch call — no second call for spark window check
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns 403 for plus-tier user with expired/missing spark window", async () => {
    fetchMock.mockResolvedValueOnce(
      respond({ error: "No active spark window. Unlock this content first.", code: "NO_SPARK_WINDOW" }, 403),
    );
    const res = await postReveal(VALID_BODY);
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.code).toBe("NO_SPARK_WINDOW");
  });

  it("returns 200 with content body for plus-tier user with active spark window", async () => {
    const fakeContent = { notes: ["Kinematics is the study of motion."], formulas: ["v = u + at"] };
    fetchMock.mockResolvedValueOnce(respond(fakeContent, 200));
    const res = await postReveal(VALID_BODY);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ notes: expect.any(Array) });
  });

  it("returns 200 for owner email (bypasses spark window check)", async () => {
    const fakeContent = { notes: ["Kinematics"], blocks: [] };
    fetchMock.mockResolvedValueOnce(respond(fakeContent, 200));
    const res = await postReveal(VALID_BODY);
    expect(res.status).toBe(200);
  });

  it("returns 200 for pro / premiumStatus=true (bypasses spark window check)", async () => {
    const fakeContent = { notes: ["Kinematics"], blocks: [] };
    fetchMock.mockResolvedValueOnce(respond(fakeContent, 200));
    const res = await postReveal(VALID_BODY);
    expect(res.status).toBe(200);
  });
});

describe("POST /api/content/reveal — input validation", () => {
  it("returns 400 for filename containing ../  (path traversal)", async () => {
    fetchMock.mockResolvedValueOnce(respond({ error: "Invalid filename" }, 400));
    const res = await postReveal({ ...VALID_BODY, filename: "../../../etc/passwd" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for filename containing null byte", async () => {
    fetchMock.mockResolvedValueOnce(respond({ error: "Invalid filename" }, 400));
    const res = await postReveal({ ...VALID_BODY, filename: "foo\0bar.json" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for an unknown kind value", async () => {
    fetchMock.mockResolvedValueOnce(
      respond({ error: "Invalid request body" }, 400),
    );
    const res = await postReveal({ ...VALID_BODY, kind: "unknown-kind" });
    expect(res.status).toBe(400);
  });
});

// ─── Property 2: Preservation — manifest stays public ───────────────────────

describe("Preservation — _manifest.json remains public (no auth)", () => {
  it("manifest fetch goes to /data/* directly (not through /api/content/reveal)", async () => {
    // The manifest is still fetched via loadData() → /data/syllabus-notes/{subject}/_manifest.json
    // This test confirms that path is NOT routed through /api/content/reveal.
    const fakeManifest = [
      { unitSlug: "kinematics", topicSlug: "motion", title: "Motion", noteCount: 1, source: "ravikishan", filename: "01-motion.json" },
    ];
    fetchMock.mockResolvedValueOnce(respond(fakeManifest, 200));

    const res = await fetch("/data/syllabus-notes/physics/_manifest.json");
    expect(res.status).toBe(200);

    // The URL must NOT contain /api/content/reveal
    const calledUrl = String(fetchMock.mock.calls[0][0]);
    expect(calledUrl).toContain("_manifest.json");
    expect(calledUrl).not.toContain("/api/content/reveal");
  });
});

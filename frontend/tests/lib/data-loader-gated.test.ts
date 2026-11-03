import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const apiFetch = vi.fn();
vi.mock("@/lib/api-client", () => ({ apiFetch: (...a: unknown[]) => apiFetch(...a) }));

import { clearDataCache, loadData, prefetchData } from "@/lib/data-loader";
import { gatedRefForDataPath } from "@/lib/content/paths";
import { clearGrant, getGrant, storeGrant } from "@/lib/content/grant-store";

const KEY = "route:/class-11-notes/physics";
const future = () => Math.floor(Date.now() / 1000) + 600;
const NOTE = "syllabus-notes/physics/kinematics/01-x.json";

beforeEach(() => {
  apiFetch.mockReset();
  clearDataCache();
  window.localStorage.clear();
  window.history.pushState({}, "", "/class-11-notes/physics");
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
});
afterEach(() => vi.unstubAllGlobals());

describe("gatedRefForDataPath", () => {
  test("maps note bodies and the PYQ index/manifest", () => {
    expect(gatedRefForDataPath(NOTE)).toEqual({
      kind: "note",
      fields: { subject: "physics", unit: "kinematics", filename: "01-x.json" },
    });
    expect(gatedRefForDataPath("content/_index.json")).toEqual({ kind: "pyq-index", fields: {} });
    expect(gatedRefForDataPath("content/manifest.json")).toEqual({ kind: "pyq-manifest", fields: {} });
  });
  test("metadata and unrelated files stay public", () => {
    expect(gatedRefForDataPath("syllabus-notes/physics/_manifest.json")).toBeNull();
    expect(gatedRefForDataPath("topic-registry.json")).toBeNull();
    expect(gatedRefForDataPath("r-export/manifest.json")).toBeNull();
  });
});

describe("grant store", () => {
  test("returns unexpired grants only and clears", () => {
    storeGrant(KEY, "g1", future());
    expect(getGrant(KEY)).toBe("g1");
    clearGrant(KEY);
    expect(getGrant(KEY)).toBeNull();
    storeGrant(KEY, "old", Math.floor(Date.now() / 1000) - 1);
    expect(getGrant(KEY)).toBeNull();
  });
});

describe("loadData gated routing (browser)", () => {
  test("sends the stored grant to /api/content/reveal", async () => {
    storeGrant(KEY, "grant-1", future());
    apiFetch.mockResolvedValue({ ok: true });
    await expect(loadData(NOTE)).resolves.toEqual({ ok: true });
    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("/api/content/reveal");
    expect((init as RequestInit).headers).toEqual({ "X-Unlock-Grant": "grant-1" });
    expect(JSON.parse((init as RequestInit).body as string)).toEqual({
      kind: "note", subject: "physics", unit: "kinematics", filename: "01-x.json", moduleKey: KEY,
    });
    expect(fetch).not.toHaveBeenCalled(); // never the static URL
  });

  test("no grant: rejects without any request, and does not cache the failure", async () => {
    await expect(loadData(NOTE)).rejects.toThrow(/locked/);
    expect(apiFetch).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
    storeGrant(KEY, "g", future());
    apiFetch.mockResolvedValue({ ok: 1 });
    await expect(loadData(NOTE)).resolves.toEqual({ ok: 1 });
  });

  test("403 from the server rejects (readers show locked/empty state)", async () => {
    storeGrant(KEY, "g", future());
    apiFetch.mockRejectedValue(Object.assign(new Error("Forbidden"), { status: 403 }));
    await expect(loadData(NOTE)).rejects.toThrow("Forbidden");
  });

  test("public metadata still loads from the static path", async () => {
    await loadData("syllabus-notes/physics/_manifest.json");
    expect(apiFetch).not.toHaveBeenCalled();
    expect(fetch).toHaveBeenCalled();
  });

  test("prefetch of a gated body without a grant is a no-op", () => {
    prefetchData(NOTE);
    expect(apiFetch).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
});

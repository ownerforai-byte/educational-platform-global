import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import {
  getJourney,
  getProgress,
  trackTopic,
  updateProgress,
} from "@/lib/api/progress";
import { buildProgressCatalog } from "@/lib/progress/catalog";
import type { JourneyRow } from "@/types/api";

// ─── fetch stub ─────────────────────────────────────────────────────────────

const fetchMock = vi.fn();

function respond(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: "OK",
    json: async () => body,
  } as unknown as Response;
}

/** Body of the nth `POST /api/progress` call, already parsed. */
function postBody(call = 0): Record<string, unknown> {
  const [, init] = fetchMock.mock.calls[call];
  return JSON.parse((init as RequestInit).body as string);
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ─── Fixtures taken from the real syllabus so slugs can never drift ─────────

const catalogue = buildProgressCatalog([]);
const [first, second, third] = catalogue;

function row(entry: (typeof catalogue)[number], status: JourneyRow["status"]): JourneyRow {
  return {
    id: `row-${entry.topicId}`,
    classSlug: entry.classSlug!,
    subjectSlug: entry.subjectSlug!,
    unitSlug: entry.unitSlug!,
    topicSlug: entry.topicSlug!,
    status,
    startedAt: "2026-10-01T00:00:00Z",
    lastViewedAt: "2026-10-04T00:00:00Z",
    viewCount: 3,
    completedAt: status === "completed" ? "2026-10-03T00:00:00Z" : null,
    updatedAt: "2026-10-04T00:00:00Z",
  };
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("progress API client", () => {
  it("reads the journey with a single GET", async () => {
    fetchMock.mockResolvedValue(respond([row(first, "completed")]));

    const rows = await getJourney();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/progress");
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe("completed");
  });

  it("tracks a topic view with its full syllabus path (no status → server default)", async () => {
    fetchMock.mockResolvedValue(respond(row(first, "started")));

    await trackTopic({
      classSlug: first.classSlug!,
      subjectSlug: first.subjectSlug!,
      unitSlug: first.unitSlug!,
      topicSlug: first.topicSlug!,
    });

    expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "POST" });
    expect(postBody()).toEqual({
      classSlug: first.classSlug,
      subjectSlug: first.subjectSlug,
      unitSlug: first.unitSlug,
      topicSlug: first.topicSlug,
    });
  });

  it("maps an explicit toggle onto completed / not_completed intents", async () => {
    fetchMock.mockResolvedValue(respond(row(first, "completed")));
    await updateProgress({ topic_id: first.topicId, completed: true });
    expect(postBody()).toMatchObject({ status: "completed" });

    // Un-checking must be an *explicit* intent: a passive "started" would be
    // refused by the server's no-downgrade rule and leave the UI lying.
    fetchMock.mockResolvedValue(respond(row(first, "started")));
    await updateProgress({ topic_id: first.topicId, completed: false });
    expect(postBody(1)).toMatchObject({ status: "not_completed" });
  });

  it("refuses a legacy numeric topic id without calling the network", async () => {
    await expect(
      updateProgress({ topic_id: "12", completed: true })
    ).rejects.toThrow("Unknown topic reference");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("merges touched rows into the whole syllabus catalogue", async () => {
    fetchMock.mockResolvedValue(
      respond([row(first, "completed"), row(second, "started")])
    );

    const entries = await getProgress();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    // Every syllabus topic is present, not just the tracked ones — that is
    // what stops the page from ever reading "No progress yet" again.
    expect(entries).toHaveLength(catalogue.length);

    const done = entries.find((e) => e.topicId === first.topicId)!;
    expect(done.status).toBe("completed");
    expect(done.completed).toBe(true);
    expect(done.topic?.title).toBeTruthy();

    const reading = entries.find((e) => e.topicId === second.topicId)!;
    expect(reading.status).toBe("in_progress");
    expect(reading.completed).toBe(false);

    const untouched = entries.find((e) => e.topicId === third.topicId)!;
    expect(untouched.status).toBe("not_started");
    expect(untouched.completed).toBe(false);
  });

  it("surfaces 401 as a typed unauthorized error after one refresh attempt", async () => {
    fetchMock
      .mockResolvedValueOnce(respond({ error: "Unauthorized" }, 401))
      .mockResolvedValueOnce(respond({ error: "Unauthorized" }, 401));

    await expect(getJourney()).rejects.toMatchObject({
      status: 401,
      code: "UNAUTHORIZED",
    });
    // original request + refresh attempt, no retry loop
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

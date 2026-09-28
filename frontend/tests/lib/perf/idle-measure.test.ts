import { afterEach, describe, expect, it, vi } from "vitest";
import {
  idleImport,
  idlePrefetchHref,
  idlePreloadImage,
  onIdle,
} from "@/lib/perf/idle";
import {
  PERF_ENABLED,
  clearPerfRecords,
  measurePerf,
  perfSnapshot,
  perfSummary,
  record,
  startPerf,
} from "@/lib/perf/measure";

/** Lets the idle fallback (`setTimeout(task, 0)`) run. */
const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 5));

afterEach(() => {
  vi.restoreAllMocks();
  clearPerfRecords();
  document.head.querySelectorAll("link[data-idle-prefetch]").forEach((node) => node.remove());
});

describe("onIdle", () => {
  it("runs the task asynchronously and can be cancelled", async () => {
    const task = vi.fn();
    const cancel = onIdle(task);
    expect(task).not.toHaveBeenCalled();

    await flush();
    expect(task).toHaveBeenCalledTimes(1);

    const cancelled = vi.fn();
    const cancelSecond = onIdle(cancelled);
    cancelSecond();
    await flush();
    expect(cancelled).not.toHaveBeenCalled();

    cancel();
  });
});

describe("idleImport", () => {
  it("resolves the dynamic import and propagates failures", async () => {
    await expect(idleImport(async () => "loaded")).resolves.toBe("loaded");
    await expect(
      idleImport(async () => {
        throw new Error("chunk failed");
      }),
    ).rejects.toThrow("chunk failed");
  });
});

describe("idlePrefetchHref", () => {
  it("appends a prefetch link and removes it on cancel", async () => {
    const cancel = idlePrefetchHref("/api/r-notes");
    await flush();

    const link = document.head.querySelector("link[data-idle-prefetch]");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("rel")).toBe("prefetch");
    expect(link?.getAttribute("href")).toBe("/api/r-notes");

    cancel();
    expect(document.head.querySelector("link[data-idle-prefetch]")).toBeNull();
  });
});

describe("idlePreloadImage", () => {
  it("never throws, even without a real image pipeline", async () => {
    const cancel = idlePreloadImage("/icon-192.png");
    await flush();
    cancel();
    expect(true).toBe(true);
  });
});

describe("perf measurement helpers", () => {
  it("is enabled outside production builds", () => {
    expect(PERF_ENABLED).toBe(true);
  });

  it("measurePerf returns the task value and records the duration", () => {
    const value = measurePerf("unit-measure", () => 21 * 2);
    expect(value).toBe(42);
    expect(perfSnapshot().some((entry) => entry.name === "unit-measure")).toBe(true);
  });

  it("startPerf returns a stop function that reports milliseconds", () => {
    const stop = startPerf("unit-manual");
    const duration = stop();
    expect(typeof duration).toBe("number");
    expect(duration).toBeGreaterThanOrEqual(0);
    expect(perfSummary().some((row) => row.name === "unit-manual")).toBe(true);
  });

  it("summarizes by label and ignores non-finite durations", () => {
    record("unit-sum", 10);
    record("unit-sum", 30);
    record("unit-bad", Number.NaN);

    const row = perfSummary().find((entry) => entry.name === "unit-sum");
    expect(row?.count).toBe(2);
    expect(row?.avgMs).toBe(20);
    expect(row?.maxMs).toBe(30);
    expect(perfSummary().some((entry) => entry.name === "unit-bad")).toBe(false);
  });

  it("clears the ring buffer", () => {
    record("unit-clear", 1);
    expect(perfSnapshot().length).toBeGreaterThan(0);
    clearPerfRecords();
    expect(perfSnapshot()).toHaveLength(0);
  });
});

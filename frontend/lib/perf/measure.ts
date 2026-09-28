/**
 * lib/perf/measure.ts — ADD-ONLY performance measurement helpers.
 *
 * Dev-only by default: in production every helper degrades to calling the task
 * and nothing else (no marks, no allocations, no logs), so wiring one of these
 * around an existing function cannot slow down the deployed bundle.
 */

/** True in development/test builds; `false` in production. */
export const PERF_ENABLED: boolean = process.env.NODE_ENV !== "production";

/** One recorded measurement. */
export interface PerfRecord {
  name: string;
  durationMs: number;
  at: number;
}

/** Bounded in-memory ring of recent measurements (dev only). */
const records: PerfRecord[] = [];
const MAX_RECORDS = 300;

/** Safe `performance` access (Node < 16 / exotic runtimes have none). */
function perfApi(): Performance | undefined {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance
    : undefined;
}

/** Times a synchronous task and (in dev) records the duration. */
export function measurePerf<T>(name: string, task: () => T): T {
  if (!PERF_ENABLED) return task();
  const api = perfApi();
  const start = api ? api.now() : Date.now();
  try {
    return task();
  } finally {
    record(name, (api ? api.now() : Date.now()) - start);
  }
}

/** Starts a manual timer; the returned function stops it and returns ms. */
export function startPerf(name: string): () => number {
  if (!PERF_ENABLED) return () => 0;
  const api = perfApi();
  const start = api ? api.now() : Date.now();
  return () => {
    const duration = (api ? api.now() : Date.now()) - start;
    record(name, duration);
    return duration;
  };
}

/**
 * Async twin of {@link measurePerf}. In production it is an exact passthrough
 * (`return task()`) with no timing allocation, so wrapping a data loader with
 * it adds nothing to the deployed bundle's hot path.
 */
export async function measurePerfAsync<T>(
  name: string,
  task: () => Promise<T>,
): Promise<T> {
  if (!PERF_ENABLED) return task();
  const api = perfApi();
  const start = api ? api.now() : Date.now();
  try {
    return await task();
  } finally {
    record(name, (api ? api.now() : Date.now()) - start);
  }
}

/** Records a duration measured elsewhere (e.g. `performance.measure`). */
export function record(name: string, durationMs: number): void {
  if (!PERF_ENABLED || !Number.isFinite(durationMs)) return;
  records.push({ name, durationMs, at: Date.now() });
  if (records.length > MAX_RECORDS) records.splice(0, records.length - MAX_RECORDS);
}

/** Snapshot of the recorded measurements (dev only; empty in production). */
export function perfSnapshot(): PerfRecord[] {
  return PERF_ENABLED ? [...records] : [];
}

/** Aggregated stats per label, sorted by total time (dev only). */
export function perfSummary(): Array<{ name: string; count: number; totalMs: number; avgMs: number; maxMs: number }> {
  const grouped = new Map<string, { count: number; totalMs: number; maxMs: number }>();
  for (const entry of perfSnapshot()) {
    const current = grouped.get(entry.name) ?? { count: 0, totalMs: 0, maxMs: 0 };
    current.count += 1;
    current.totalMs += entry.durationMs;
    current.maxMs = Math.max(current.maxMs, entry.durationMs);
    grouped.set(entry.name, current);
  }
  return Array.from(grouped.entries())
    .map(([name, stats]) => ({
      name,
      count: stats.count,
      totalMs: Math.round(stats.totalMs * 100) / 100,
      avgMs: Math.round((stats.totalMs / Math.max(1, stats.count)) * 100) / 100,
      maxMs: Math.round(stats.maxMs * 100) / 100,
    }))
    .sort((a, b) => b.totalMs - a.totalMs);
}

/** Clears the ring (dev only). */
export function clearPerfRecords(): void {
  records.length = 0;
}

/**
 * Lazy per-subject access to the high-yield fact banks, for client components.
 *
 * The eager barrel (`high-yield-topic-facts.ts`) merges ALL subject banks into
 * one array, so any client component importing it evaluates the Physics,
 * Chemistry, Biology, Mathematics and Language banks even when it renders a
 * single topic. This module instead:
 *
 *   1. always includes the tiny curated core bank (5 entries) synchronously;
 *   2. loads a subject's own bank files via dynamic `import()` on first
 *      request, cached at module level for the session;
 *   3. exposes sync getters over "core + whatever is loaded so far", so the
 *      topic page first renders with core facts and hydrates with the full
 *      subject bank as soon as the chunk arrives (the caller re-renders when
 *      `ensureHighYieldForSubject` resolves).
 *
 * Server code, tests and scripts should keep using the eager barrel — they
 * need the full merge anyway and dynamic import adds nothing there.
 */

import { HIGH_YIELD_TOPIC_BANK } from "./high-yield-topic-facts-core";
import {
  filterEntriesForUnit,
  findHighYieldTopicData,
  type HighYieldTopicData,
} from "./high-yield-topic-facts-match";

type BankLoader = () => Promise<HighYieldTopicData[]>;

const languagesLoader: BankLoader = async () =>
  (await import("./high-yield-topic-facts-languages")).HIGH_YIELD_TOPIC_BANK_LANGUAGES;

/** Subject slug → loader for that subject's bank files. */
const SUBJECT_BANK_LOADERS: Record<string, BankLoader> = {
  physics: async () => {
    const [a, b] = await Promise.all([
      import("./high-yield-topic-facts-physics"),
      import("./high-yield-topic-facts-physics-2"),
    ]);
    return [...a.HIGH_YIELD_TOPIC_BANK_PHYSICS, ...b.HIGH_YIELD_TOPIC_BANK_PHYSICS_2];
  },
  chemistry: async () => {
    const [a, b] = await Promise.all([
      import("./high-yield-topic-facts-chemistry"),
      import("./high-yield-topic-facts-chemistry-organic"),
    ]);
    return [...a.HIGH_YIELD_TOPIC_BANK_CHEMISTRY, ...b.HIGH_YIELD_TOPIC_BANK_CHEMISTRY_ORGANIC];
  },
  biology: async () =>
    (await import("./high-yield-topic-facts-biology")).HIGH_YIELD_TOPIC_BANK_BIOLOGY,
  mathematics: async () =>
    (await import("./high-yield-topic-facts-mathematics")).HIGH_YIELD_TOPIC_BANK_MATHEMATICS,
  nepali: languagesLoader,
  english: languagesLoader,
};

const loadedBanks = new Map<string, HighYieldTopicData[]>();
const inflight = new Map<string, Promise<HighYieldTopicData[]>>();

/**
 * Loads (once) and returns a subject's full bank. Safe to call from tests and
 * scripts to warm the cache before sync getters run.
 */
export function ensureHighYieldForSubject(subjectSlug: string): Promise<HighYieldTopicData[]> {
  const key = (subjectSlug || "").toLowerCase();
  const cached = loadedBanks.get(key);
  if (cached) return Promise.resolve(cached);
  const pending = inflight.get(key);
  if (pending) return pending;
  const loader = SUBJECT_BANK_LOADERS[key];
  if (!loader) return Promise.resolve([]);
  const promise = loader().then((bank) => {
    loadedBanks.set(key, bank);
    inflight.delete(key);
    return bank;
  });
  inflight.set(key, promise);
  return promise;
}

/** Fire-and-forget warm-up: call on mount/effect, re-render when it resolves. */
export function preloadHighYieldForSubject(subjectSlug: string): void {
  void ensureHighYieldForSubject(subjectSlug).catch(() => undefined);
}

/**
 * Server/test escape hatch: the eager barrel registers the banks it already
 * merged, so a Node process that imports the barrel never pays a dynamic
 * import for the same data. Client code never reaches the barrel, so its
 * cache is always warmed by `ensureHighYieldForSubject`.
 */
export function registerHighYieldSubjectBank(
  subjectSlug: string,
  bank: HighYieldTopicData[]
): void {
  loadedBanks.set((subjectSlug || "").toLowerCase(), bank);
}

/** Loads every subject bank once — for the audit scripts and test setup. */
export function ensureAllHighYieldBanksLoaded(): Promise<HighYieldTopicData[][]> {
  return Promise.all(Object.keys(SUBJECT_BANK_LOADERS).map(ensureHighYieldForSubject));
}

/** Core entries plus whatever is cached for this subject so far. */
export function getLoadedHighYieldBank(subjectSlug?: string): HighYieldTopicData[] {
  const key = (subjectSlug || "").toLowerCase();
  const extra = key ? (loadedBanks.get(key) ?? []) : [];
  return [...HIGH_YIELD_TOPIC_BANK, ...extra];
}

/** Sync twin of the barrel's `getHighYieldEntriesForUnit`, over loaded banks. */
export function getLoadedHighYieldEntriesForUnit(
  unitId: string,
  subjectSlug?: string
): HighYieldTopicData[] {
  return filterEntriesForUnit(getLoadedHighYieldBank(subjectSlug), unitId, subjectSlug);
}

/** Sync twin of the barrel's `getHighYieldTopicData`, over loaded banks. */
export function getLoadedHighYieldTopicData(
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string,
  unitSlug?: string
): HighYieldTopicData | null {
  return findHighYieldTopicData(
    getLoadedHighYieldBank(subjectSlug),
    subjectSlug,
    topicSlug,
    topicTitle,
    unitSlug
  );
}

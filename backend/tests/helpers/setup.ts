/**
 * Shared Vitest helpers for backend suites.
 * Import from tests under `unit/` or `integration/` as `../helpers/setup.js`
 * (or `../../helpers/setup.js` from `unit/ai/`).
 *
 * Intentionally does **not** import from `vitest` — loading vitest outside the
 * runner context breaks suite registration on this workspace.
 */

type ThenableResult = { data: unknown; error: unknown };

export function makeQueryChain(result: ThenableResult) {
  const chain: Record<string, unknown> = {};
  for (const method of [
    "select",
    "eq",
    "neq",
    "in",
    "like",
    "order",
    "single",
    "maybeSingle",
    "limit",
    "upsert",
    "update",
    "insert",
    "delete",
  ]) {
    chain[method] = () => chain;
  }
  chain.then = (
    onFulfilled?: (value: ThenableResult) => unknown,
    onRejected?: (reason: unknown) => unknown,
  ) => Promise.resolve({ data: result.data, error: result.error }).then(onFulfilled, onRejected);
  return chain;
}

/** Default empty `from()` implementation — pass the mocked supabase `.from`. */
export function stubEmptyFrom(mockedFrom: { mockImplementation: (fn: (table: string) => unknown) => unknown }) {
  mockedFrom.mockImplementation(() => makeQueryChain({ data: [], error: null }));
}

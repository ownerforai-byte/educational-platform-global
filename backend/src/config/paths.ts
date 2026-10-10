/**
 * Path resolution — thin re-export of the canonical resolver.
 *
 * `src/utils/paths.ts` holds the real `resolveDataPath` implementation and is
 * what the API routes already import. This file exists so `config/` is a
 * complete, importable home for configuration; it re-exports rather than
 * re-implements so there is exactly ONE path resolver in the backend and the
 * two import paths can never drift apart.
 */
export { resolveDataPath } from "../utils/paths";

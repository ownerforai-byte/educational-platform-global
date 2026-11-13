/**
 * Resolve FIREBASE_SERVICE_ACCOUNT_PATH from repo root, backend/, or cwd.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(backendRoot, "..");

export function serviceAccountSearchBases() {
  const cwd = process.cwd();
  return [...new Set([cwd, backendRoot, repoRoot, resolve(cwd, "backend"), resolve(repoRoot, "backend")])];
}

export function resolveServiceAccountAbsolute(pathRel) {
  if (!pathRel?.trim()) return null;
  const rel = pathRel.trim();
  for (const base of serviceAccountSearchBases()) {
    const abs = resolve(base, rel);
    if (existsSync(abs)) return abs;
  }
  return null;
}

export function readServiceAccountFromPath(pathRel) {
  const abs = resolveServiceAccountAbsolute(pathRel);
  if (!abs) return null;
  return readFileSync(abs, "utf8");
}

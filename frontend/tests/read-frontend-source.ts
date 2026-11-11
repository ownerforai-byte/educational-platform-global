import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const FE = process.cwd();

/** Phase 5 feature shims under lib/ and components/ → features/*. */
export function resolveFrontendPath(rel: string): string {
  const normalized = rel.replace(/\\/g, "/");
  const candidates = [normalized];
  if (normalized.startsWith("components/lab/")) {
    candidates.push(normalized.replace(/^components\/lab\//, "features/lab/components/"));
  }
  if (normalized.startsWith("lib/ai/")) {
    candidates.push(normalized.replace(/^lib\/ai\//, "features/ai/"));
  }

  for (const relPath of candidates) {
    const shim = path.join(FE, relPath);
    if (!existsSync(shim)) continue;
    const src = readFileSync(shim, "utf8").trim();
    const star = src.match(/^export \* from ["']@\/features\/(.+?)["'];?$/m);
    if (star) {
      const base = path.join(FE, "features", ...star[1].split("/"));
      for (const c of [`${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
        if (existsSync(c)) return c;
      }
    }
    const named = src.match(/^export \{[^}]+\} from ["']@\/features\/(.+?)["'];?$/m);
    if (named) {
      const base = path.join(FE, "features", ...named[1].split("/"));
      for (const c of [`${base}.tsx`, `${base}.ts`]) {
        if (existsSync(c)) return c;
      }
    }
    return shim;
  }

  throw new Error(`readFrontendSource: missing ${rel}`);
}

export function readFrontendSource(rel: string): string {
  return readFileSync(resolveFrontendPath(rel), "utf8");
}

/** Exists on disk (shim or features path) for a @/… import string. */
export function frontendModuleExists(modulePath: string): boolean {
  const rel = modulePath.replace(/^@\//, "").replace(/\\/g, "/");
  const paths = [rel];
  if (rel.startsWith("components/lab/")) {
    paths.push(rel.replace(/^components\/lab\//, "features/lab/components/"));
  }
  for (const r of paths) {
    const base = path.join(FE, r);
    if (existsSync(`${base}.tsx`) || existsSync(`${base}.ts`) || existsSync(base)) {
      return true;
    }
  }
  return false;
}

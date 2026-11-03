import fs from "fs";
import path from "path";

/**
 * Single backend view of frontend/lib/content/gated-kinds.json: the kind ->
 * path table and the gated data root (`gatedDir`, relative to frontend/, NOT
 * under public/). Shared by the reveal route and the AI corpus reader so the
 * location is defined once.
 */

export interface KindSpec {
  base: string;
  segments: string[];
}
export interface GatedTable {
  gatedDir: string;
  kinds: Record<string, KindSpec>;
  publicNames: string[];
}

const TABLE_REL = path.join("frontend", "lib", "content", "gated-kinds.json");
let tableCache: GatedTable | null = null;

export function loadGatedTable(): GatedTable {
  if (tableCache) return tableCache;
  const candidates = [
    path.join(process.cwd(), TABLE_REL),
    path.join(process.cwd(), "..", TABLE_REL),
    path.join(__dirname, "..", "..", "..", TABLE_REL),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      tableCache = JSON.parse(fs.readFileSync(c, "utf8")) as GatedTable;
      return tableCache;
    }
  }
  throw new Error("gated-kinds.json not found");
}

/** Directories that may hold the gated data root, most preferred first. */
export function gatedDataRoots(): string[] {
  const roots: string[] = [];
  if (process.env.CONTENT_GATED_DIR) roots.push(path.resolve(process.env.CONTENT_GATED_DIR));
  const dir = loadGatedTable().gatedDir;
  for (const base of [
    process.cwd(),
    path.join(process.cwd(), ".."),
    path.join(__dirname, "..", "..", ".."),
  ]) {
    roots.push(path.join(base, "frontend", dir));
    roots.push(path.join(base, dir));
  }
  return Array.from(new Set(roots));
}

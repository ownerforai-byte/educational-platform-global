import fs from "fs";
import path from "path";

/**
 * Robustly resolve paths to the content and public/data directory.
 * Works whether running from workspace root or inside backend/.
 */
export function resolveDataPath(...subpaths: string[]): string {
  const candidates = [
    path.join(process.cwd(), "content", ...subpaths),
    path.join(process.cwd(), "..", "content", ...subpaths),
    path.join(process.cwd(), "public", "data", ...subpaths),
    path.join(process.cwd(), "..", "public", "data", ...subpaths),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return candidates[0];
}

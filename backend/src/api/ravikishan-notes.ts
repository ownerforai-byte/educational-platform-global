import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { resolveDataPath } from "../utils/paths";

const router = Router();

/**
 * Unit-slug aliases (keep in sync with frontend: lib/syllabus-notes-manifest.ts).
 * Resolves historical orphan / short-named folders to their canonical syllabus slug.
 * Used when a caller asks for a direct file path e.g.
 *   class-11-notes/chemistry/chemical-bonding/concepts/...
 * which is rewritten to:
 *   class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/...
 */
const UNIT_SLUG_ALIASES: Record<string, string> = {
  // Chemistry: 6 short-name folders → canonical long syllabus names
  "classification-of-elements": "classification-of-elements-and-periodic-table",
  "chemical-bonding": "chemical-bonding-and-shapes-of-molecules",
  "oxidation-reduction": "oxidation-and-reduction",
  "basic-concept-organic": "basic-concept-of-organic-chemistry",
  "fundamental-principles-organic": "fundamental-principles-of-organic-chemistry",
  "modern-manufactures": "modern-chemical-manufactures",

  // Mathematics: limits-and-continuity is subsumed into calculus unit
  "limits-and-continuity": "calculus",

  // Physics: short-form work-energy-power → canonical with "and"
  "work-energy-power": "work-energy-and-power",
};

/**
 * Apply unit-slug alias resolution to a ravikishan relative path.
 * The path pattern we target is:
 *   class-xxx-notes/<subject>/<unitSlug>/...
 * We replace only <unitSlug> if it's an alias, leaving everything else intact.
 */
function applyUnitAliasToPath(relPath: string): string {
  if (!relPath) return relPath;
  const parts = relPath.split(/[\\/]+/).filter(Boolean);
  // Find the subject slug by index 1 (0 = class slug, 1 = subject, 2 = unit)
  // or index 0 if caller omitted leading class slug (unlikely for direct file lookup)
  if (parts.length >= 3) {
    const maybeUnit = parts[2];
    if (UNIT_SLUG_ALIASES[maybeUnit]) {
      parts[2] = UNIT_SLUG_ALIASES[maybeUnit];
      return parts.join("/");
    }
  }
  return relPath;
}

async function loadJsonFile<T>(relPath: string): Promise<T> {
  const filePath = resolveDataPath(relPath);
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

router.get("/", async (req: Request, res: Response) => {
  const rel = req.query.path as string | undefined;

  if (!rel) {
    res.status(400).json({ error: "Missing path parameter" });
    return;
  }

  // Strict path sanitization to prevent path traversal
  const cleanPath = path.normalize(rel).replace(/^(\.\.[\/\\])+/, "").replace(/^[\\\/]+/, "");
  if (cleanPath.includes("..")) {
    res.status(400).json({ error: "Invalid path parameter" });
    return;
  }

  try {
    // 1. First attempt to load from _index.json
    try {
      const index = await loadJsonFile<Record<string, unknown>>("ravikishan/_index.json");
      if (index[cleanPath]) {
        res.json(index[cleanPath]);
        return;
      }
      // Also try the alias-resolved path against the index
      const aliased = applyUnitAliasToPath(cleanPath);
      if (aliased !== cleanPath && index[aliased]) {
        res.json(index[aliased]);
        return;
      }
    } catch {
      // If _index.json is missing or corrupted, continue to direct file load
    }

    // 2. Direct file lookup under content/ravikishan or content/
    //    Try the requested path first, then its alias-resolved variant.
    const candidatePaths: string[] = [];
    const primary = cleanPath.startsWith("ravikishan") ? cleanPath : path.join("ravikishan", cleanPath);
    candidatePaths.push(primary);
    const aliasedClean = applyUnitAliasToPath(cleanPath);
    if (aliasedClean !== cleanPath) {
      candidatePaths.push(
        aliasedClean.startsWith("ravikishan")
          ? aliasedClean
          : path.join("ravikishan", aliasedClean)
      );
    }

    for (const candidate of candidatePaths) {
      const directPath = resolveDataPath(candidate);
      if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
        const fileData = await readFile(directPath, "utf-8");
        res.json(JSON.parse(fileData));
        return;
      }
    }

    res.status(404).json({ error: "Note not found", path: cleanPath });
  } catch (err) {
    console.error("Failed to load ravikishan data:", err);
    res.status(500).json({ error: "Failed to load data" });
  }
});

export default router;

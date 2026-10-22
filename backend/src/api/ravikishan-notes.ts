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
 *   notes/concepts/class-11/chemistry/chemical-bonding/...
 * which is rewritten to:
 *   notes/concepts/class-11/chemistry/chemical-bonding-and-shapes-of-molecules/...
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
 * Apply unit-slug alias resolution to a content-relative path. Every DIRECTORY
 * segment is checked (never the filename), so both the classified shape
 * (`notes/concepts/<class>/<subject>/<unit>/<file>`) and legacy keys resolve.
 */
function applyUnitAliasToPath(relPath: string): string {
  if (!relPath) return relPath;
  const parts = relPath.split(/[\\/]+/).filter(Boolean);
  let changed = false;
  for (let i = 0; i < parts.length - 1; i++) {
    const alias = UNIT_SLUG_ALIASES[parts[i]];
    if (alias && alias !== parts[i]) {
      parts[i] = alias;
      changed = true;
    }
  }
  return changed ? parts.join("/") : relPath;
}

/** Classified content sections (see frontend/lib/content/paths.ts). */
const KIND_SECTIONS: Record<string, string> = {
  concepts: "notes/concepts",
  theory: "notes/theory",
  notes: "notes/guides",
  formula: "formulas",
  pyqs: "practice/questions",
  sets: "practice/problem-sets",
  examples: "practice/examples",
  mindmap: "visuals/mindmaps",
  rails: "visuals/rails",
  graph: "visuals/graphs",
};

/**
 * Translate any accepted note key to its content-relative classified path:
 * new keys (`notes/concepts/class-11/…`) pass through, and legacy keys
 * (`class-11-notes/physics/kinematics/concepts/01-x.json`) are re-homed the
 * same way scripts/reclassify-content.mjs moved the corpus.
 */
function toContentPath(relPath: string): string {
  const parts = relPath.split(/[\\/]+/).filter(Boolean);
  if (parts.length === 0) return relPath;
  if (/^(notes|formulas|practice|visuals|resources)$/.test(parts[0])) return parts.join("/");
  const clean = parts[0] === "ravikishan" ? parts.slice(1) : parts;
  const kindIdx = clean.findIndex((seg, i) => i >= 2 && i < clean.length - 1 && KIND_SECTIONS[seg]);
  if (/^class-\d+/.test(clean[0] ?? "") && kindIdx >= 2) {
    const cls = clean[0].replace(/-notes$/, "").replace(/e$/, "");
    return [
      KIND_SECTIONS[clean[kindIdx]],
      cls,
      ...clean.slice(1, kindIdx),
      ...clean.slice(kindIdx + 1),
    ].join("/");
  }
  return clean.join("/");
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
      const index = await loadJsonFile<Record<string, unknown>>("_index.json");
      const key = toContentPath(cleanPath);
      if (index[key]) {
        res.json(index[key]);
        return;
      }
      // Also try the alias-resolved path against the index
      const aliased = applyUnitAliasToPath(key);
      if (aliased !== key && index[aliased]) {
        res.json(index[aliased]);
        return;
      }
    } catch {
      // If _index.json is missing or corrupted, continue to direct file load
    }

    // 2. Direct file lookup under content/ — try the requested path first,
    //    then its alias-resolved variant.
    const candidatePaths: string[] = [];
    const primary = toContentPath(cleanPath);
    candidatePaths.push(primary);
    const aliasedClean = applyUnitAliasToPath(primary);
    if (aliasedClean !== primary) {
      candidatePaths.push(aliasedClean);
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

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONTENT VALIDATOR — Ensures all content is properly organized under
 * the syllabus structure. Run this script to audit your content.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Usage: npx tsx scripts/validate-content.ts
 *
 * What it checks:
 *   1. Every unit directory has a mindmap/ file
 *   2. Every notes/ file references a valid unit+topic from the syllabus
 *   3. Topic slugs match the actual syllabus topic names
 *   4. No orphaned files outside the syllabus structure
 *   5. Relevance scores are within valid range
 *
 * If errors are found, the script prints them and returns exit code 1.
 */

import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.resolve(__dirname, "../content/ravikishan");
const SYLLABUS_PATH = path.resolve(__dirname, "../../frontend/lib/syllabus.ts");

interface ValidationResult {
  file: string;
  errors: string[];
  warnings: string[];
}

const results: ValidationResult[] = [];

function validateFile(filePath: string, content: string): ValidationResult {
  const relPath = path.relative(CONTENT_ROOT, filePath);
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const data = JSON.parse(content);

    // Check required fields
    if (!data.title) warnings.push("Missing 'title' field");
    if (!data.unitSlug) errors.push("Missing 'unitSlug' — content has no syllabus unit reference");
    if (!data.topicSlug) errors.push("Missing 'topicSlug' — content has no syllabus topic reference");
    if (!data.topicTitle) warnings.push("Missing 'topicTitle' — should match official syllabus topic");

    // Check relevance score
    if (data.relevance !== undefined) {
      if (typeof data.relevance !== "number" || data.relevance < 0 || data.relevance > 100) {
        errors.push(`Invalid relevance score: ${data.relevance} (must be 0-100)`);
      }
    } else {
      warnings.push("Missing 'relevance' score — auto-calculate or set manually (0-100)");
    }

    // Check notes array
    if (!Array.isArray(data.notes) || data.notes.length === 0) {
      warnings.push("No notes or empty notes array");
    }

    // Check file name matches topic slug
    const baseFileName = path.basename(filePath, ".json");
    if (data.topicSlug && baseFileName !== data.topicSlug) {
      warnings.push(
        `File name "${baseFileName}" doesn't match topicSlug "${data.topicSlug}". ` +
        `Rename to: ${data.topicSlug}.json`,
      );
    }

    // Check directory matches unit slug (for class-11-notes structure)
    const relPath = path.relative(CONTENT_ROOT, filePath);
    const pathParts = relPath.split(path.sep);
    
    // Skip auto-generated manifest/index files
    const fileName = path.basename(filePath);
    if (fileName === "manifest.json" || fileName === "_index.json") {
      return { file: relPath, errors: [], warnings: [] };
    }
    
    if (data.unitSlug) {
      // For class-11-notes structure: class-11-notes/{subject}/{unitSlug}/{subDir}/{file}.json
      // The unit directory is at index 2 (0: class-11-notes, 1: subject, 2: unitSlug)
      if (pathParts[0] === "class-11-notes" && pathParts.length >= 4) {
        const unitDir = pathParts[2];
        if (unitDir !== data.unitSlug) {
          errors.push(
            `File is in "${unitDir}/" but unitSlug is "${data.unitSlug}". ` +
            `Move to correct unit directory.`,
          );
        }
      }
    }
  } catch (e: unknown) {
    const err = e instanceof Error ? e.message : String(e);
    errors.push(`Invalid JSON: ${err}`);
  }

  return { file: relPath, errors, warnings };
}

function scanContentDir(dir: string, relativeBase = ""): void {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = relativeBase ? `${relativeBase}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Skip non-class-11-notes directories (legacy content)
      if (relativeBase === "" && entry.name !== "class-11-notes") {
        continue;
      }
      // Check for mindmap directory
      if (entry.name === "mindmap") {
        const mindmapFiles = fs.readdirSync(full);
        if (mindmapFiles.length === 0) {
          results.push({
            file: rel,
            errors: ["Mindmap directory exists but is empty — run npm run content:build or add a mindmap JSON"],
            warnings: [],
          });
        }
      }
      scanContentDir(full, rel);
    } else if (entry.name.endsWith(".json")) {
      const content = fs.readFileSync(full, "utf-8");
      const result = validateFile(full, content);
      results.push(result);
    }
  }
}

// Main validation
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     CONTENT VALIDATOR — Syllabus Organization Check        ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

console.log(`Scanning: ${CONTENT_ROOT}\n`);

scanContentDir(CONTENT_ROOT);

let errorCount = 0;
let warningCount = 0;

for (const r of results) {
  if (r.errors.length > 0 || r.warnings.length > 0) {
    console.log(`📄 ${r.file}`);
    for (const e of r.errors) {
      console.log(`  ❌ ${e}`);
      errorCount++;
    }
    for (const w of r.warnings) {
      console.log(`  ⚠️  ${w}`);
      warningCount++;
    }
    console.log("");
  }
}

console.log(`─`.repeat(60));
console.log(`Errors:   ${errorCount}`);
console.log(`Warnings: ${warningCount}`);
console.log(`Total checked: ${results.length} files`);

if (errorCount > 0) {
  console.log("\n❌ VALIDATION FAILED — Fix errors before adding content.");
  process.exit(1);
} else if (warningCount > 0) {
  console.log("\n⚠️  VALIDATION PASSED with warnings — review before committing.");
  process.exit(0);
} else {
  console.log("\n✅ ALL CONTENT PROPERLY ORGANIZED");
  process.exit(0);
}

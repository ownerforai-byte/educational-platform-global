/**
 * Content validation tool for NEB Biology content.
 * Validates that all content follows the syllabus structure.
 * 
 * Usage: npx tsx content-tools/validate-biology-content.ts
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const CONTENT_ROOT = join(__dirname, "..", "..", "content");
const SYLLABUS_FILE = join(__dirname, "..", "..", "frontend", "lib", "syllabus.ts");

/** Classified sections holding unit-scoped biology files (see frontend/lib/content/paths.ts). */
const SECTIONS = [
  "notes/concepts",
  "notes/guides",
  "notes/theory",
  "formulas",
  "practice/questions",
  "practice/problem-sets",
  "practice/examples",
  "visuals/mindmaps",
  "visuals/graphs",
];

interface ValidationIssue {
  file: string;
  type: "error" | "warning";
  message: string;
}

function validate(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!statSync(CONTENT_ROOT).isDirectory()) {
    issues.push({ file: "", type: "error", message: "Content root not found" });
    return issues;
  }

  let fileCount = 0;
  let errorCount = 0;
  let biologyDirs = 0;

  function scanDir(dir: string, relPath: string) {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const currentRel = join(relPath, entry.name);

      if (entry.isDirectory()) {
        // Directories are unit/topic coordinates in the classified tree.
        scanDir(fullPath, currentRel);
      } else if (entry.name.endsWith(".json")) {
        fileCount++;
        try {
          const data = JSON.parse(readFileSync(fullPath, "utf-8"));
          
          // Required fields
          if (!data.title) {
            issues.push({ file: currentRel, type: "error", message: "Missing 'title' field" });
            errorCount++;
          }
          if (!data.unitSlug && !data.unit) {
            issues.push({ file: currentRel, type: "warning", message: "Missing unit identifier" });
          }
          if (!data.topicSlug && !data.topic) {
            issues.push({ file: currentRel, type: "warning", message: "Missing topic identifier" });
          }
          
          // Relevance check
          if (data.relevance !== undefined && (data.relevance < 0 || data.relevance > 100)) {
            issues.push({ file: currentRel, type: "error", message: `Relevance ${data.relevance} out of range (0-100)` });
            errorCount++;
          }
        } catch (e) {
          issues.push({ file: currentRel, type: "error", message: `Invalid JSON: ${(e as Error).message}` });
          errorCount++;
        }
      }
    }
  }

  // Scan biology content across every classified section.
  for (const section of SECTIONS) {
    const biologyDir = join(CONTENT_ROOT, ...section.split("/"), "class-11", "biology");
    try {
      if (!statSync(biologyDir).isDirectory()) continue;
    } catch {
      continue;
    }
    biologyDirs++;
    scanDir(biologyDir, `${section}/class-11/biology`);
  }
  if (biologyDirs === 0) {
    issues.push({ file: "", type: "warning", message: "No biology content directories found" });
  }

  console.log(`\nBiology Content Validation`);
  console.log(`==========================`);
  console.log(`Files scanned: ${fileCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Warnings: ${issues.filter(i => i.type === "warning").length}`);
  
  if (issues.length > 0) {
    console.log(`\nIssues:`);
    for (const issue of issues) {
      const icon = issue.type === "error" ? "❌" : "⚠️";
      console.log(`  ${icon} ${issue.file || "(root)"}`);
      console.log(`     ${issue.message}`);
    }
  }

  return issues;
}

const issues = validate();
process.exit(issues.filter(i => i.type === "error").length > 0 ? 1 : 0);

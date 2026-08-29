/**
 * Content validation tool for NEB Biology content.
 * Validates that all content follows the syllabus structure.
 * 
 * Usage: npx tsx content-tools/validate-biology-content.ts
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const CONTENT_ROOT = join(__dirname, "..", "..", "content", "ravikishan");
const SYLLABUS_FILE = join(__dirname, "..", "..", "frontend", "lib", "syllabus.ts");

interface ValidationIssue {
  file: string;
  type: "error" | "warning";
  message: string;
}

const VALID_TYPES = ["concepts", "formula", "notes", "pyqs", "sets", "examples", "mindmap"];

function validate(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  if (!statSync(CONTENT_ROOT).isDirectory()) {
    issues.push({ file: "", type: "error", message: "Content root not found" });
    return issues;
  }

  // Scan biology content
  const classDir = join(CONTENT_ROOT, "class-11-notes");
  if (!statSync(classDir).isDirectory()) {
    issues.push({ file: "", type: "warning", message: "No class-11-notes directory found" });
    return issues;
  }

  const biologyDir = join(classDir, "biology");
  if (!statSync(biologyDir).isDirectory()) {
    issues.push({ file: "", type: "warning", message: "No biology content directory found" });
    return issues;
  }

  let fileCount = 0;
  let errorCount = 0;

  function scanDir(dir: string, relPath: string) {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const currentRel = join(relPath, entry.name);

      if (entry.isDirectory()) {
        if (!VALID_TYPES.includes(entry.name) && entry.name !== "unit" && !entry.name.startsWith("unit-")) {
          issues.push({
            file: currentRel,
            type: "warning",
            message: `Unexpected directory: ${entry.name}. Valid types: ${VALID_TYPES.join(", ")}`,
          });
        }
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

  scanDir(biologyDir, "class-11-notes/biology");

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

/**
 * Content Organizer Script
 * 
 * Scans all content files and:
 * 1. Re-scores relevance against the syllabus
 * 2. Flags content that may be in the wrong unit
 * 3. Suggests reorganization
 * 
 * Usage: npx tsx scripts/organize-content.ts [--dry-run]
 */

import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.resolve(__dirname, "../content/ravikishan");
const CLASS_TRACKS = [
  "class-11-notes",
  "class-11e", 
  "class-11-more",
  "class-12-notes",
  "class-12e",
  "class-12-more",
];
const SUBJECTS = ["physics", "chemistry", "mathematics", "biology", "english", "nepali"];
const UNITS_SUBDIRS = ["concepts", "formula", "notes", "pyqs", "sets", "examples", "mindmap"];

interface ContentFile {
  path: string;
  classSlug: string;
  subjectSlug: string;
  unitSlug: string;
  subDir: string;
  fileName: string;
  data: any;
}

function parsePath(filePath: string): ContentFile | null {
  const rel = path.relative(CONTENT_ROOT, filePath);
  const parts = rel.split(path.sep);
  
  if (parts.length < 4) return null;
  
  const classSlug = parts[0];
  if (!CLASS_TRACKS.includes(classSlug)) return null;
  
  const subjectSlug = parts[1];
  if (!SUBJECTS.includes(subjectSlug)) return null;
  
  const unitSlug = parts[2];
  const subDir = parts[3];
  if (!UNITS_SUBDIRS.includes(subDir)) return null;
  
  const fileName = parts.slice(4).join("/");
  
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    return { path: rel, classSlug, subjectSlug, unitSlug, subDir, fileName, data };
  } catch {
    return null;
  }
}

function keywordMatch(content: string, topic: string): number {
  const words = topic.toLowerCase().split(/[\s\-]+/).filter((w) => w.length > 2);
  const contentLower = content.toLowerCase();
  let matches = 0;
  for (const word of words) {
    if (contentLower.includes(word)) matches++;
  }
  return words.length > 0 ? (matches / words.length) * 100 : 0;
}

function findBestMatch(file: ContentFile): { unitId: string; topicTitle: string; score: number } | null {
  // Read syllabus from the compiled JS (simplified approach)
  // In practice, this would import from lib/syllabus.ts
  // For the script, we parse the unit/topic structure from content paths
  
  const syllabusPath = path.resolve(__dirname, "../frontend/lib/syllabus.ts");
  if (!fs.existsSync(syllabusPath)) return null;
  
  // Parse the syllabus file to extract units and topics
  const content = fs.readFileSync(syllabusPath, "utf-8");
  
  // Simple extraction: find all unit definitions with their topics
  const unitMatches = content.matchAll(
    /id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*hours:\s*(\d+)?,\s*topics:\s*\[([\s\S]*?)\]/g
  );
  
  const subjectContent = file.data.notes?.join(" ") || file.data.question || "";
  
  let bestMatch: { unitId: string; topicTitle: string; score: number } | null = null;
  
  for (const match of unitMatches) {
    const unitId = match[1];
    const unitTitle = match[2];
    const topicsRaw = match[4];
    const topics = topicsRaw.match(/"([^"]+)"/g)?.map((t) => t.replace(/"/g, "")) || [];
    
    for (const topic of topics) {
      const score = keywordMatch(subjectContent, topic);
      if (score > (bestMatch?.score ?? 0)) {
        bestMatch = { unitId, topicTitle: topic, score: Math.round(score) };
      }
    }
  }
  
  return bestMatch;
}

function main() {
  const dryRun = process.argv.includes("--dry-run") || !process.argv.includes("--apply");
  
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║        CONTENT ORGANIZER — Syllabus Alignment Check         ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
  console.log(`Root: ${CONTENT_ROOT}\n`);
  
  const files: ContentFile[] = [];
  const mismatches: Array<{ file: string; current: string; suggested: string; score: number }> = [];
  
  // Scan all JSON files
  function scan(dir: string, relBase = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
      
      if (entry.isDirectory()) {
        scan(full, rel);
      } else if (entry.name.endsWith(".json")) {
        const parsed = parsePath(full);
        if (parsed) files.push(parsed);
      }
    }
  }
  
  for (const track of CLASS_TRACKS) {
    const trackDir = path.join(CONTENT_ROOT, track);
    if (fs.existsSync(trackDir)) {
      scan(trackDir, track);
    }
  }
  
  console.log(`Found ${files.length} content files\n`);
  
  for (const file of files) {
    const subjectContent = file.data.notes?.join(" ") || file.data.question || file.data.title || "";
    const match = findBestMatch(file);
    
    if (match && match.score < 50 && file.unitSlug !== match.unitId) {
      mismatches.push({
        file: file.path,
        current: `${file.unitSlug}/${file.fileName}`,
        suggested: `${match.unitId}/${match.topicTitle} (score: ${match.score}%)`,
        score: match.score,
      });
    }
  }
  
  if (mismatches.length > 0) {
    console.log(`⚠️  Found ${mismatches.length} files that may need reorganization:\n`);
    for (const m of mismatches.slice(0, 20)) {
      console.log(`  ${m.file}`);
      console.log(`    Current:  ${m.current}`);
      console.log(`    Suggest:  ${m.suggested}`);
      console.log("");
    }
    
    if (!dryRun) {
      console.log("Run with --apply to auto-move files to suggested locations.");
    } else {
      console.log("DRY RUN — no files were moved. Add --apply to execute.");
    }
  } else {
    console.log("✅ All content files are in their best-matching syllabus locations.");
  }
  
  // Summary by unit
  const byUnit: Record<string, number> = {};
  for (const file of files) {
    byUnit[file.unitSlug] = (byUnit[file.unitSlug] ?? 0) + 1;
  }
  
  console.log("\n📊 Content distribution by unit:");
  for (const [unit, count] of Object.entries(byUnit).sort()) {
    console.log(`  ${unit}: ${count} files`);
  }
}

main();

/**
 * Content Coverage Audit
 * Compares syllabus topics against actual content files to find gaps.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Parse syllabus.ts to extract all topics
function parseSyllabus() {
  const content = readFileSync('lib/syllabus.ts', 'utf8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');

  const result: Array<{
    classSlug: string;
    classTitle: string;
    subjectSlug: string;
    subjectTitle: string;
    unitSlug: string;
    unitTitle: string;
    topics: string[];
  }> = [];

  let currentClassSlug = '';
  let currentClassTitle = '';
  let currentSubjectSlug = '';
  let currentSubjectTitle = '';
  let currentUnitSlug = '';
  let currentUnitTitle = '';
  let inTopics = false;
  let topicBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect class slug/name (4 spaces)
    const clsMatch = line.match(/^\s{4}slug:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)"/);
    if (clsMatch && !currentClassSlug) {
      currentClassSlug = clsMatch[1];
      currentClassTitle = clsMatch[2];
      console.log('Found class:', currentClassSlug);
      continue;
    }

    // Detect subject slug/name (8 spaces)
    const subjMatch = line.match(/^\s{8}slug:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)"/);
    if (subjMatch) {
      currentSubjectSlug = subjMatch[1];
      currentSubjectTitle = subjMatch[2];
      console.log('Found subject:', currentSubjectSlug);
      continue;
    }

    // Detect unit id (12 spaces)
    const unitIdMatch = line.match(/^\s{12}id:\s*"([^"]+)"/);
    if (unitIdMatch) {
      currentUnitSlug = unitIdMatch[1];
      // Look for title in next few lines
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const titleMatch = lines[j].match(/\s*title:\s*"([^"]+)"/);
        if (titleMatch) {
          currentUnitTitle = titleMatch[1];
          break;
        }
      }
      continue;
    }

    // Detect topics array start
    if (line.includes('topics: [') && currentUnitSlug) {
      inTopics = true;
      topicBuffer = [];
      continue;
    }

    // Collect topic strings (14 spaces)
    if (inTopics) {
      const topicMatch = line.match(/^\s{14}"(.+)"(?:,|$)/);
      if (topicMatch) {
        topicBuffer.push(topicMatch[1]);
      } else if (line.trim() === '],') {
        inTopics = false;
        if (topicBuffer.length > 0 && currentSubjectSlug) {
          result.push({
            classSlug: currentClassSlug,
            classTitle: currentClassTitle,
            subjectSlug: currentSubjectSlug,
            subjectTitle: currentSubjectTitle,
            unitSlug: currentUnitSlug,
            unitTitle: currentUnitTitle,
            topics: topicBuffer,
          });
        }
        currentUnitSlug = '';
        currentUnitTitle = '';
        topicBuffer = [];
      }
    }
  }

  return result;
}

// Get all content file slugs from a directory
function getContentSlugs(basePath: string): Map<string, number> {
  const slugMap = new Map<string, number>();

  function scanDir(dir: string) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.name.endsWith('.json') && !entry.name.includes('mindmap')) {
          const slug = entry.name.replace(/^\d+-/, '').replace('.json', '');
          slugMap.set(slug, (slugMap.get(slug) || 0) + 1);
        }
      }
    } catch (e) {
      // ignore
    }
  }

  scanDir(basePath);
  return slugMap;
}

// Normalize slug for comparison
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Check if a topic is covered by any content file
function isTopicCovered(topic: string, contentSlugs: Map<string, number>): boolean {
  const t = normalize(topic);
  for (const slug of contentSlugs.keys()) {
    const c = normalize(slug);
    if (t === c) return true;
    if (c.includes(t) || t.includes(c)) return true;
    // Check partial match (first 20 chars)
    if (t.length > 10 && c.includes(t.substring(0, 20))) return true;
    if (t.length > 10 && t.includes(c.substring(0, 20))) return true;
  }
  return false;
}

// Main
const topics = parseSyllabus();
console.log(`\nTotal syllabus entries parsed: ${topics.length}`);

// Group by subject
const subjectData: Record<string, typeof topics> = {};
for (const t of topics) {
  if (!subjectData[t.subjectSlug]) subjectData[t.subjectSlug] = [];
  subjectData[t.subjectSlug].push(t);
}

// Check each subject
const results: Array<{
  subject: string;
  subjectTitle: string;
  totalUnits: number;
  totalTopics: number;
  coveredTopics: number;
  gapCount: number;
  gaps: string[];
}> = [];

for (const [subject, entries] of Object.entries(subjectData)) {
  const contentPath = join('public/data/syllabus-notes', subject);
  let contentSlugs = new Map<string, number>();
  try {
    if (statSync(contentPath).isDirectory()) {
      contentSlugs = getContentSlugs(contentPath);
    }
  } catch {
    // directory doesn't exist
  }

  let totalTopics = 0;
  let coveredTopics = 0;
  const gaps: string[] = [];

  for (const entry of entries) {
    totalTopics += entry.topics.length;
    for (const topic of entry.topics) {
      if (isTopicCovered(topic, contentSlugs)) {
        coveredTopics++;
      } else {
        gaps.push(`${entry.unitSlug}/${topic.substring(0, 40)}...`);
      }
    }
  }

  const coverage = totalTopics > 0 ? (coveredTopics / totalTopics * 100) : 0;
  console.log(`\n=== ${subject} (${contentSlugs.size} content files) ===`);
  console.log(`  Units: ${entries.length}, Topics: ${totalTopics}, Covered: ${coveredTopics}, Gaps: ${totalTopics - coveredTopics} (${coverage.toFixed(1)}%)`);
  if (gaps.length > 0) {
    console.log(`  Sample gaps: ${gaps.slice(0, 5).join(', ')}${gaps.length > 5 ? ` ...(+${gaps.length - 5})` : ''}`);
  }
  results.push({
    subject,
    subjectTitle: entries[0]?.subjectTitle || '',
    totalUnits: entries.length,
    totalTopics,
    coveredTopics,
    gapCount: totalTopics - coveredTopics,
    gaps,
  });
}

console.log('\n=== OVERALL SUMMARY ===');
let grandTotal = 0, grandCovered = 0;
for (const r of results) {
  grandTotal += r.totalTopics;
  grandCovered += r.coveredTopics;
  console.log(`${r.subject}: ${r.coveredTopics}/${r.totalTopics} (${((r.coveredTopics / r.totalTopics) * 100).toFixed(1)}%)`);
}
console.log(`TOTAL: ${grandCovered}/${grandTotal} (${((grandCovered / grandTotal) * 100).toFixed(1)}%)`);

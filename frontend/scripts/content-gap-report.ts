/**
 * Content Gap Report Generator
 * Analyzes syllabus vs actual content to find gaps.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

interface SyllabusEntry {
  classSlug: string;
  classTitle: string;
  subjectSlug: string;
  subjectTitle: string;
  unitSlug: string;
  unitTitle: string;
  topics: string[];
}

interface ContentFile {
  subject: string;
  unit: string;
  slug: string;
}

function parseSyllabus(): SyllabusEntry[] {
  const content = readFileSync('lib/syllabus.ts', 'utf8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');

  const result: SyllabusEntry[] = [];
  let currentClassSlug = '';
  let currentClassTitle = '';
  let currentSubjectSlug = '';
  let currentSubjectTitle = '';
  let currentUnitSlug = '';
  let currentUnitTitle = '';
  let inTopics = false;
  let topicBuffer: string[] = [];
  let pendingSlugLine = ''; // Store the slug line to match with name

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Class level (4 spaces) - slug on one line, name on next
    const classSlugMatch = line.match(/^\s{4}slug:\s*"([^"]+)"/);
    if (classSlugMatch && lines[i + 1]?.match(/^\s{4}name:/)) {
      currentClassSlug = classSlugMatch[1];
      const nameMatch = lines[i + 1].match(/^\s{4}name:\s*"([^"]+)"/);
      if (nameMatch) currentClassTitle = nameMatch[1];
      continue;
    }

    // Subject level (8 spaces) - slug on one line, name on next
    const subjSlugMatch = line.match(/^\s{8}slug:\s*"([^"]+)"/);
    if (subjSlugMatch && lines[i + 1]?.match(/^\s{8}name:/)) {
      currentSubjectSlug = subjSlugMatch[1];
      const nameMatch = lines[i + 1].match(/^\s{8}name:\s*"([^"]+)"/);
      if (nameMatch) currentSubjectTitle = nameMatch[1];
      continue;
    }

    // Unit level (12 spaces) - id on one line, title on next
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

    // Topics array
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

function getContentFiles(basePath: string): ContentFile[] {
  const files: ContentFile[] = [];

  function scanDir(dir: string, relativePath: string) {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const newRelative = join(relativePath, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath, newRelative);
        } else if (entry.name.endsWith('.json') && !entry.name.includes('mindmap')) {
          const slug = entry.name.replace(/^\d+-/, '').replace('.json', '');
          // newRelative is built with join() which handles platform separators
          const parts = newRelative.split(path.sep);
          files.push({
            subject: parts[0] || '',
            unit: parts[1] || '',
            slug,
          });
        }
      }
    } catch (e) {
      // ignore
    }
  }

  scanDir(basePath, '');
  return files;
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function isTopicCovered(topic: string, contentFiles: ContentFile[]): boolean {
  const t = normalize(topic);
  for (const file of contentFiles) {
    const c = normalize(file.slug);
    if (t === c) return true;
    if (c.includes(t) || t.includes(c)) return true;
    if (t.length > 10 && c.includes(t.substring(0, 20))) return true;
    if (t.length > 10 && t.includes(c.substring(0, 20))) return true;
  }
  return false;
}

// Main
const syllabus = parseSyllabus();
console.log(`Total syllabus entries: ${syllabus.length}`);
console.log(`Total topics: ${syllabus.reduce((acc, e) => acc + e.topics.length, 0)}`);

const contentFiles = getContentFiles('public/data/syllabus-notes');
console.log(`Total content files: ${contentFiles.length}`);

// Group by subject
const subjectEntries = syllabus.reduce<Record<string, SyllabusEntry[]>>((acc, e) => {
  if (!acc[e.subjectSlug]) acc[e.subjectSlug] = [];
  acc[e.subjectSlug].push(e);
  return acc;
}, {});

const subjectContent = contentFiles.reduce<Record<string, ContentFile[]>>((acc, f) => {
  if (!acc[f.subject]) acc[f.subject] = [];
  acc[f.subject].push(f);
  return acc;
}, {});

// Debug: show subject content counts
console.log('\nDEBUG - Subject content counts:');
for (const [subj, files] of Object.entries(subjectContent)) {
  console.log(`  ${subj}: ${files.length} files`);
}

// Generate report
console.log('\n' + '='.repeat(60));
console.log('CONTENT COVERAGE REPORT');
console.log('='.repeat(60) + '\n');

let grandTotal = 0;
let grandCovered = 0;

for (const [subject, entries] of Object.entries(subjectEntries)) {
  const files = subjectContent[subject] || [];
  let totalTopics = 0;
  let coveredTopics = 0;
  const gaps: string[] = [];

  for (const entry of entries) {
    totalTopics += entry.topics.length;
    for (const topic of entry.topics) {
      if (isTopicCovered(topic, files)) {
        coveredTopics++;
      } else {
        gaps.push(`${entry.unitSlug}: ${topic.substring(0, 50)}...`);
      }
    }
  }

  const coverage = totalTopics > 0 ? (coveredTopics / totalTopics * 100) : 0;
  grandTotal += totalTopics;
  grandCovered += coveredTopics;

  console.log(`[${subject.toUpperCase()}]`);
  console.log(`  Content files: ${files.length}`);
  console.log(`  Topics: ${coveredTopics}/${totalTopics} (${coverage.toFixed(1)}% covered)`);
  if (gaps.length > 0) {
    console.log(`  Missing: ${gaps.length} topics`);
    console.log(`  Sample gaps:`);
    for (const gap of gaps.slice(0, 3)) {
      console.log(`    - ${gap}`);
    }
  }
  console.log('');
}

console.log('='.repeat(60));
console.log(`TOTAL: ${grandCovered}/${grandTotal} topics covered (${(grandCovered/grandTotal*100).toFixed(1)}%)`);
console.log(`Missing: ${grandTotal - grandCovered} topics`);
console.log('='.repeat(60));

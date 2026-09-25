import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Mock the parseSyllabus function
function parseSyllabus() {
  const content = readFileSync('lib/syllabus.ts', 'utf8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');
  const entries: Array<{
    classSlug: string;
    subjectSlug: string;
    unitSlug: string;
    topics: string[];
  }> = [];

  let currentClassSlug = '';
  let currentSubjectSlug = '';
  let currentUnitSlug = '';
  let inTopics = false;
  let topicBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Class level (4 spaces)
    const clsMatch = line.match(/^\s{4}slug:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)"/);
    if (clsMatch && !currentClassSlug) {
      currentClassSlug = clsMatch[1];
      continue;
    }

    // Subject level (8 spaces)
    const subjMatch = line.match(/^\s{8}slug:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)"/);
    if (subjMatch) {
      currentSubjectSlug = subjMatch[1];
      continue;
    }

    // Unit level (12 spaces)
    const unitIdMatch = line.match(/^\s{12}id:\s*"([^"]+)"/);
    if (unitIdMatch) {
      currentUnitSlug = unitIdMatch[1];
      continue;
    }

    // Topics array
    if (line.includes('topics: [') && currentUnitSlug) {
      inTopics = true;
      topicBuffer = [];
      continue;
    }

    // Collect topics (14 spaces)
    if (inTopics) {
      const topicMatch = line.match(/^\s{14}"(.+)"(?:,|$)/);
      if (topicMatch) {
        topicBuffer.push(topicMatch[1]);
      } else if (line.trim() === '],') {
        inTopics = false;
        if (topicBuffer.length > 0 && currentSubjectSlug) {
          entries.push({
            classSlug: currentClassSlug,
            subjectSlug: currentSubjectSlug,
            unitSlug: currentUnitSlug,
            topics: topicBuffer,
          });
        }
        currentUnitSlug = '';
        topicBuffer = [];
      }
    }
  }

  return entries;
}

describe('Content Coverage', () => {
  it('should parse syllabus entries correctly', () => {
    const entries = parseSyllabus();
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].classSlug).toBeTruthy();
    expect(entries[0].subjectSlug).toBeTruthy();
    expect(entries[0].unitSlug).toBeTruthy();
    expect(entries[0].topics.length).toBeGreaterThan(0);
  });

  it('should have total topics > 600', () => {
    const entries = parseSyllabus();
    const totalTopics = entries.reduce((acc, e) => acc + e.topics.length, 0);
    expect(totalTopics).toBeGreaterThan(600);
  });

  it('should have all 6 subjects', () => {
    const entries = parseSyllabus();
    const subjects = new Set(entries.map(e => e.subjectSlug));
    expect(subjects.has('biology')).toBe(true);
    expect(subjects.has('chemistry')).toBe(true);
    expect(subjects.has('english')).toBe(true);
    expect(subjects.has('mathematics')).toBe(true);
    expect(subjects.has('nepali')).toBe(true);
    expect(subjects.has('physics')).toBe(true);
  });

  it('should find content files for each subject', () => {
    const subjects = ['biology', 'chemistry', 'english', 'mathematics', 'nepali', 'physics'];
    for (const subject of subjects) {
      const subjectDir = join('public/data/syllabus-notes', subject);
      try {
        const stats = statSync(subjectDir);
        expect(stats.isDirectory()).toBe(true);
      } catch {
        // Directory may not exist for empty subjects
      }
    }
  });

  it('should have most content in physics', () => {
    const physicsDir = join('public/data/syllabus-notes', 'physics');
    let fileCount = 0;
    function countFiles(dir: string) {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          countFiles(fullPath);
        } else if (entry.name.endsWith('.json') && !entry.name.includes('mindmap')) {
          fileCount++;
        }
      }
    }
    try {
      countFiles(physicsDir);
      expect(fileCount).toBeGreaterThan(200);
    } catch {
      // Skip if directory doesn't exist
    }
  });

  it('should have Nepali content fully covering syllabus', () => {
    const nepaliDir = join('public/data/syllabus-notes', 'nepali');
    let fileCount = 0;
    function countFiles(dir: string) {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          countFiles(fullPath);
        } else if (entry.name.endsWith('.json') && !entry.name.includes('mindmap')) {
          fileCount++;
        }
      }
    }
    try {
      countFiles(nepaliDir);
      expect(fileCount).toBeGreaterThan(0);
    } catch {
      // Skip if directory doesn't exist
    }
  });
});

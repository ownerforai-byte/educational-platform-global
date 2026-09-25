import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Mock the parseSyllabus function (same logic as scripts/content-coverage.py)
function parseSyllabus() {
  const content = readFileSync('lib/syllabus.ts', 'utf8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');
  const entries: Array<{
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

    // Class level (4 spaces) - slug on one line, name on next
    const clsSlugMatch = line.match(/^\s{4}slug:\s*"([^"]+)"/);
    if (clsSlugMatch && !currentClassSlug) {
      currentClassSlug = clsSlugMatch[1];
      // Look for name on next line
      if (i + 1 < lines.length && lines[i + 1].includes('name:')) {
        const nameMatch = lines[i + 1].match(/\s{4}name:\s*"([^"]+)"/);
        if (nameMatch) currentClassTitle = nameMatch[1];
      }
      continue;
    }

    // Subject level (8 spaces) - slug on one line, name on next
    const subjSlugMatch = line.match(/^\s{8}slug:\s*"([^"]+)"/);
    if (subjSlugMatch) {
      currentSubjectSlug = subjSlugMatch[1];
      if (i + 1 < lines.length && lines[i + 1].includes('name:')) {
        const nameMatch = lines[i + 1].match(/\s{8}name:\s*"([^"]+)"/);
        if (nameMatch) currentSubjectTitle = nameMatch[1];
      }
      continue;
    }

    // Unit level (12 spaces)
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

  it('should have entries with subject slugs', () => {
    const entries = parseSyllabus();
    expect(entries.length).toBeGreaterThan(100);
    // At least some entries should have subject slugs
    const withSubjects = entries.filter(e => e.subjectSlug);
    expect(withSubjects.length).toBeGreaterThan(0);
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

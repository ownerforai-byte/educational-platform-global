/**
 * Mindmap Generator Script
 * Parses syllabus.ts and generates mindmap.json files for all units.
 * Run with: node generate-mindmaps.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse syllabus.ts to extract units
function parseSyllabus(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract the SYLLABUS constant content
  const syllabusMatch = content.match(/export const SYLLABUS[\s\S]*?=\s*\[([\s\S]*?)\]\s*;/);
  if (!syllabusMatch) {
    console.error('Could not find SYLLABUS in syllabus.ts');
    process.exit(1);
  }

  const lines = syllabusMatch[1].split('\n');
  const units = [];
  
  let currentClass = null;
  let currentSubject = null;
  let inTopics = false;
  let currentUnit = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect class start
    if (line.includes('slug:') && line.includes('class-')) {
      const match = line.match(/slug:\s*"([^"]+)"/);
      if (match) {
        currentClass = { slug: match[1] };
      }
      continue;
    }
    
    // Detect subject start (slug appears after class context)
    if (line.includes('slug:') && !line.includes('class-') && !inTopics) {
      // Check if this is a new subject by looking at the context
      // Subject slugs come after "subjects:" or at the top level of a class
      const match = line.match(/slug:\s*"([^"]+)"/);
      if (match) {
        currentSubject = { slug: match[1], class: currentClass };
      }
      continue;
    }
    
    // Detect unit start (id inside a unit block)
    if (line.match(/^id:\s*"([^"]+)"/) && line.includes('"id":') === false) {
      const match = line.match(/^id:\s*"([^"]+)"/);
      const titleLine = lines[i + 1] || '';
      const titleMatch = titleLine.match(/title:\s*"([^"]+)"/);
      if (match && titleMatch) {
        currentUnit = {
          id: match[1],
          title: titleMatch[1],
          topics: [],
          subject: currentSubject,
          class: currentClass
        };
        units.push(currentUnit);
        continue;
      }
    }
    
    // Detect topics array start
    if (line.startsWith('topics: [')) {
      inTopics = true;
      continue;
    }
    
    // Collect topics
    if (inTopics && currentUnit) {
      if (line === '],') {
        inTopics = false;
        continue;
      }
      const topicMatch = line.match(/"([^"]+)"/);
      if (topicMatch) {
        currentUnit.topics.push(topicMatch[1]);
      }
    }
  }

  return units;
}

// Parse a topic string and extract sub-topics
function parseTopicSubtopics(topic) {
  const subTopics = [];

  // Check for parenthetical content that indicates sub-items
  const parenMatch = topic.match(/(.+?)\s*[:：]\s*(.+)$/);
  if (parenMatch) {
    const main = parenMatch[1].trim();
    const details = parenMatch[2].trim();
    const items = details.split(/,\s*(?![^()]*\))/).filter(s => s.trim());
    if (items.length > 1) {
      subTopics.push(main);
      items.forEach(item => {
        const clean = item.trim().replace(/^[{(]+|[)}]+$/g, '').trim();
        if (clean) subTopics.push(clean);
      });
      return subTopics;
    }
  }

  // Check for semicolon-separated items
  const semiSplit = topic.split(/;\s*/).filter(s => s.trim().length > 5);
  if (semiSplit.length > 1) {
    return semiSplit.map(s => s.trim());
  }

  // Check for "and" or "or" separators
  const andSplit = topic.split(/\s+(?:and|or|plus)\s+/i).filter(s => s.trim().length > 3);
  if (andSplit.length > 1) {
    return andSplit.map(s => s.trim());
  }

  return [topic.trim()];
}

// Create mindmap nodes from topic and subtopics
function createMindmapNodes(topics) {
  const children = [];

  for (const topic of topics) {
    const subtopics = parseTopicSubtopics(topic);

    if (subtopics.length > 1) {
      const child = {
        id: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30),
        label: subtopics[0],
        children: subtopics.slice(1).map((sub, idx) => ({
          id: `${subtopics[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-sub-${idx}`,
          label: sub
        }))
      };
      children.push(child);
    } else {
      const cleanTopic = topic.replace(/^[A-Z][a-z]+:/, '').trim();
      const child = {
        id: cleanTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
        label: cleanTopic
      };

      if (topic.includes('(') && !topic.includes(':')) {
        const match = topic.match(/([^()]+)\(([^)]+)\)/);
        if (match) {
          child.children = match[2].split(',').map((s, idx) => ({
            id: `${child.id}-item-${idx}`,
            label: s.trim()
          }));
        }
      }

      children.push(child);
    }
  }

  return children;
}

// Generate mindmap for a unit
function generateMindmap(unit) {
  const topicSlug = `${unit.id}-mindmap`;
  const root = {
    id: 'root',
    label: unit.title,
    children: createMindmapNodes(unit.topics)
  };

  return {
    title: `${unit.title} Mindmap`,
    unitSlug: unit.id,
    topicSlug: topicSlug,
    topicTitle: `${unit.title} — interactive concept map`,
    relevance: 1,
    root: root
  };
}

// Main execution
function main() {
  const syllabusPath = path.join(__dirname, 'lib', 'syllabus.ts');
  const outputPath = path.join(__dirname, 'content', 'ravikishan');

  console.log('Parsing syllabus...');
  const units = parseSyllabus(syllabusPath);
  console.log(`Found ${units.length} units`);

  let created = 0;
  let skipped = 0;

  for (const unit of units) {
    if (!unit.subject || !unit.class) {
      console.warn(`Skipping unit ${unit.id}: missing subject/class`);
      continue;
    }

    const dir = path.join(
      outputPath,
      unit.class.slug,
      unit.subject.slug,
      unit.id,
      'mindmap'
    );

    fs.mkdirSync(dir, { recursive: true });

    const mindmap = generateMindmap(unit);
    const filePath = path.join(dir, 'mindmap.json');

    if (fs.existsSync(filePath)) {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (existing.root && existing.root.label === unit.title) {
        console.log(`  ✓ Already up-to-date: ${unit.id}`);
        skipped++;
        continue;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(mindmap, null, 2), 'utf8');
    console.log(`  ✓ Created: ${unit.id}`);
    created++;
  }

  console.log(`\nDone! Created ${created} mindmaps, skipped ${skipped} existing.`);
}

main();

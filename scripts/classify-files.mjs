#!/usr/bin/env node
/**
 * scripts/classify-files.mjs
 *
 * Lightweight validator and classifier tool for files in the repository.
 * Helps agents instantly know whether a file is an [IMPORTANT CORE FILE] or a [CONTENT FILE],
 * and verifies that CORE_FILES.md references valid files.
 *
 * Usage:
 *   node scripts/classify-files.mjs <file-path> ...
 *   node scripts/classify-files.mjs --check-core
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

export const CORE_PATTERNS = [
  /^CORE_FILES\.md$/,
  /^AGENTS\.md$/,
  /^AGENT_RULES\.md$/,
  /^project-conductor\.md$/,
  /^PROJECT_STATUS\.md$/,
  /^SYSTEM_WORK_TRACKER\.md$/,
  /^BRANCHES\.md$/,
  /^CLAUDE\.md$/,
  /^package\.json$/,
  /^frontend\/package\.json$/,
  /^backend\/package\.json$/,
  /^frontend\/lib\/navigation\.ts$/,
  /^frontend\/lib\/site-index\.ts$/,
  /^frontend\/lib\/syllabus\.ts$/,
  /^frontend\/lib\/note-routes\.ts$/,
  /^frontend\/lib\/lab-registry\.tsx$/,
  /^frontend\/lib\/graphs\.ts$/,
  /^frontend\/lib\/pyq-bank\.ts$/,
  /^frontend\/lib\/formula-sheet\.ts$/,
  /^frontend\/app\/\(app\)\/layout\.tsx$/,
  /^frontend\/components\/layout\/app-shell\.tsx$/,
  /^backend\/src\/app\.ts$/,
  /^backend\/src\/index\.ts$/,
  /^backend\/src\/middleware\//,
  /^backend\/src\/config\//,
  /^backend\/src\/ai\/service\.ts$/,
  /^backend\/src\/ai\/prompts\.ts$/,
  /^frontend\/lib\/ai\/prompts\.ts$/,
  /^frontend\/features\/credits\/constants\.ts$/
];

export const CONTENT_PATTERNS = [
  /^content\//,
  /^frontend\/public\/data\//,
  /^public\/data\//,
  /\.json$/
];

/**
 * Classifies a file relative to project root.
 */
export function classifyFile(relPath) {
  const norm = relPath.replace(/\\/g, '/').replace(/^\.\//, '');

  for (const pattern of CORE_PATTERNS) {
    if (pattern.test(norm)) {
      return {
        path: norm,
        category: 'IMPORTANT CORE FILE',
        description: 'Core architectural, routing, config, or system registry file'
      };
    }
  }

  for (const pattern of CONTENT_PATTERNS) {
    if (pattern.test(norm)) {
      return {
        path: norm,
        category: 'CONTENT FILE',
        description: 'Data payload, topic JSON, syllabus note, or content asset (can be ignored unless asked)'
      };
    }
  }

  // Fallback heuristics: app routes, components, APIs are architectural/feature files
  if (norm.startsWith('frontend/app/') || norm.startsWith('backend/src/api/') || norm.startsWith('frontend/components/')) {
    return {
      path: norm,
      category: 'FEATURE / ROUTING FILE',
      description: 'Platform route or component file'
    };
  }

  return {
    path: norm,
    category: 'SUPPORT FILE',
    description: 'Script, test, or config file'
  };
}

function checkCoreFiles() {
  const coreFilePath = path.join(ROOT, 'CORE_FILES.md');
  if (!fs.existsSync(coreFilePath)) {
    console.error('❌ CORE_FILES.md not found in project root!');
    process.exit(1);
  }

  const content = fs.readFileSync(coreFilePath, 'utf8');
  const pathRegex = /`([a-zA-Z0-9_./\-()]+)`/g;
  let match;
  const verifiedPaths = [];
  const missingPaths = [];

  while ((match = pathRegex.exec(content)) !== null) {
    const rawPath = match[1];
    // Check if it's a file path in repo
    if (rawPath.includes('/') || rawPath.endsWith('.md') || rawPath.endsWith('.ts') || rawPath.endsWith('.tsx') || rawPath.endsWith('.json')) {
      const full = path.join(ROOT, rawPath);
      if (fs.existsSync(full)) {
        verifiedPaths.push(rawPath);
      } else if (!rawPath.includes('*') && !rawPath.includes('<') && !rawPath.includes('...') && !rawPath.startsWith('/')) {
        // Exclude wildcards/placeholders/URL routes
        missingPaths.push(rawPath);
      }
    }
  }

  console.log(`✅ CORE_FILES.md verified. Found ${verifiedPaths.length} existing reference paths.`);
  if (missingPaths.length > 0) {
    console.warn(`⚠️ Warning: ${missingPaths.length} paths mentioned in CORE_FILES.md do not exist:`, missingPaths);
  }
}

// CLI handler
const args = process.argv.slice(2);
if (args.includes('--check-core')) {
  checkCoreFiles();
} else if (args.length > 0) {
  for (const arg of args) {
    const res = classifyFile(arg);
    console.log(`[${res.category}] ${res.path} — ${res.description}`);
  }
} else {
  console.log('Usage: node scripts/classify-files.mjs <file-paths...> | --check-core');
}

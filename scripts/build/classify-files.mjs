#!/usr/bin/env node
/**
 * scripts/classify-files.mjs
 *
 * Classifies repository paths as [IMPORTANT CORE FILE] or [CONTENT FILE].
 * The --all mode inventories paths only (never reads payload contents), so
 * agents can understand repository shape without opening the curriculum corpus.
 *
 * Usage:
 *   node scripts/classify-files.mjs <file-path> ...
 *   node scripts/classify-files.mjs --all
 *   node scripts/classify-files.mjs --all --list
 *   node scripts/classify-files.mjs --check-core
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const CORE_PATTERNS = [
  /^CORE_FILES\.md$/,
  /^AGENTS\.md$/,
  /^AGENT_RULES\.md$/,
  /^project-conductor\.md$/,
  /^PROJECT_STATUS\.md$/,
  /^SYSTEM_WORK_TRACKER\.md$/,
  /^BRANCHES\.md$/,
  /^CLAUDE\.md$/,
  /^frontend\/AGENTS\.md$/,
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
  /^frontend\/lib\/physics-xi-academic\.ts$/,
  /^frontend\/lib\/ui\/subject-visuals\.ts$/,
  /^frontend\/app\/\(app\)\/layout\.tsx$/,
  /^frontend\/app\/auth\/callback\/page\.tsx$/,
  /^frontend\/providers\/auth-provider\.tsx$/,
  /^frontend\/features\/auth\/components\/require-approval\.tsx$/,
  /^frontend\/features\/credits\/route-gate\.tsx$/,
  /^frontend\/components\/layout\/app-shell\.tsx$/,
  /^frontend\/components\/navigation\/back-button\.tsx$/,
  /^backend\/src\/app\.ts$/,
  /^backend\/src\/index\.ts$/,
  /^backend\/src\/middleware\//,
  /^backend\/src\/config\//,
  /^backend\/src\/ai\/service\.ts$/,
  /^backend\/src\/ai\/prompts\.ts$/,
  /^frontend\/lib\/ai\/prompts\.ts$/,
  /^frontend\/features\/credits\/constants\.ts$/,
  /^backend\/src\/ai\/figure-draw\.ts$/,
  /^backend\/src\/ai\/image-gen\.ts$/,
  /^frontend\/lib\/ai\/subject-classrooms\.ts$/,
  /^frontend\/lib\/sections\.ts$/,
  /^frontend\/lib\/access-level\.ts$/,
  /^frontend\/components\/ai\/diagram-studio\.tsx$/,
  /^frontend\/components\/ai\/subject-classroom\.tsx$/,
  /^frontend\/components\/content\/section-tier-gate\.tsx$/,
  /^frontend\/components\/home\/home-sections\.tsx$/
];

export const CONTENT_PATTERNS = [
  /^content\//,
  /^backend\/kb\//,
  /^backend\/\.ocr-v2\//,
  /^backend\/corpus\//,
  /^backend\/sources\/(books|quiz|reference)\//,
  /^frontend\/public\/data\//,
  /^frontend\/public\/materials\//,
  /^frontend\/public\/resources\//,
  /^backend\/data\//,
  /^public\/data\//,
  /^public\/(images|figures|diagrams)\//,
  /^frontend\/public\/(images|figures|diagrams|materials|resources)\//,
  /^backend\/public\/assets\//
];

/** Classify a repository-relative file path into the documented two classes. */
export function classifyFile(relPath) {
  const norm = relPath.replace(/\\/g, '/').replace(/^\.\//, '');
  if (CONTENT_PATTERNS.some((pattern) => pattern.test(norm))) {
    return {
      path: norm,
      category: 'CONTENT FILE',
      description: 'Learner-facing data payload; inspect only when explicitly needed'
    };
  }
  return {
    path: norm,
    category: 'IMPORTANT CORE FILE',
    description: 'Platform source, route, test, script, configuration, or documentation'
  };
}

function listRepositoryPaths() {
  try {
    const output = execFileSync('git', ['-C', ROOT, 'ls-files', '-co', '--exclude-standard', '-z'], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024
    });
    return [...new Set(output.split('\0').filter(Boolean))].sort();
  } catch (error) {
    console.error(`Could not list Git paths: ${error.message}`);
    process.exit(1);
  }
}

function inventoryAll(listEveryPath = false) {
  const paths = listRepositoryPaths();
  const counts = { 'IMPORTANT CORE FILE': 0, 'CONTENT FILE': 0 };
  const examples = { 'IMPORTANT CORE FILE': [], 'CONTENT FILE': [] };
  const byRoot = new Map();

  for (const filePath of paths) {
    const result = classifyFile(filePath);
    counts[result.category] += 1;
    if (examples[result.category].length < 8) examples[result.category].push(filePath);
    if (listEveryPath) console.log(`[${result.category}] ${filePath}`);

    const root = filePath.split('/')[0] ?? '(root files)';
    const group = byRoot.get(root) ?? { files: 0, core: 0, content: 0 };
    group.files += 1;
    group[result.category === 'CONTENT FILE' ? 'content' : 'core'] += 1;
    byRoot.set(root, group);
  }

  console.log(`Classified ${paths.length} tracked/non-ignored untracked paths (path inventory only; file contents were not read).`);
  for (const category of ['IMPORTANT CORE FILE', 'CONTENT FILE']) {
    console.log(`\n[${category}] ${counts[category]} files`);
    for (const filePath of examples[category]) console.log(`  ${filePath}`);
    if (counts[category] > examples[category].length) console.log(`  … ${counts[category] - examples[category].length} more`);
  }
  console.log('\n[TOP-LEVEL DIRECTORY INVENTORY]');
  for (const [root, group] of [...byRoot].sort((a, b) => b[1].files - a[1].files)) {
    console.log(`  ${root}: ${group.files} total (${group.content} content, ${group.core} core)`);
  }
}

function checkCoreFiles() {
  const coreFilePath = path.join(ROOT, 'CORE_FILES.md');
  if (!fs.existsSync(coreFilePath)) {
    console.error('❌ CORE_FILES.md not found in project root!');
    process.exit(1);
  }

  const content = fs.readFileSync(coreFilePath, 'utf8');
  const pathRegex = /`([a-zA-Z0-9_./()-]+)`/g;
  let match;
  const verifiedPaths = [];
  const missingPaths = [];

  while ((match = pathRegex.exec(content)) !== null) {
    const rawPath = match[1];
    if (rawPath.includes('/') || rawPath.endsWith('.md') || rawPath.endsWith('.ts') || rawPath.endsWith('.tsx') || rawPath.endsWith('.json')) {
      const full = path.join(ROOT, rawPath);
      if (fs.existsSync(full)) {
        verifiedPaths.push(rawPath);
      } else if (!rawPath.includes('*') && !rawPath.includes('<') && !rawPath.includes('...') && !rawPath.startsWith('/')) {
        missingPaths.push(rawPath);
      }
    }
  }

  console.log(`✅ CORE_FILES.md verified. Found ${verifiedPaths.length} existing reference paths.`);
  if (missingPaths.length > 0) {
    console.warn(`⚠️ Warning: ${missingPaths.length} paths mentioned in CORE_FILES.md do not exist:`, missingPaths);
  }
}

const args = process.argv.slice(2);
if (args.includes('--check-core')) {
  checkCoreFiles();
} else if (args.includes('--all')) {
  inventoryAll(args.includes('--list'));
} else if (args.length > 0) {
  for (const arg of args) {
    const res = classifyFile(arg);
    console.log(`[${res.category}] ${res.path} — ${res.description}`);
  }
} else {
  console.log('Usage: node scripts/classify-files.mjs <file-paths...> | --all [--list] | --check-core');
}

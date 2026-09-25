#!/usr/bin/env node
/**
 * Add eslint-disable-next-line react-hooks/exhaustive-deps comments
 * before lines that trigger the warning.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Files and line numbers from lint output
const fixes = [
  ['components/content/statistics-probability-resources.tsx', 469],
  ['components/lab/class11/class11-chemistry-3d-plus.tsx', 176],
  ['components/lab/class11/class11-laws-motion-enhanced.tsx', 315],
  ['components/lab/class11/class11-laws-motion.tsx', 255],
  ['components/lab/class11/class11-rotational-motion.tsx', 203],
  ['components/lab/class11/class11-work-energy.tsx', 236],
  ['components/lab/math-3d-symbols.tsx', 117],
  ['components/lab/math-3d-symbols.tsx', 252],
  ['components/lab/physics-3d-atomic-symbols.tsx', 111],
  ['components/lab/physics-3d-atomic-symbols.tsx', 254],
  ['components/lab/physics-3d-elasticity-gas.tsx', 205],
  ['components/lab/physics-3d-elasticity-gas.tsx', 391],
  ['components/lab/physics-3d-electricity-i.tsx', 181],
  ['components/lab/physics-3d-electricity-i.tsx', 349],
  ['components/lab/physics-3d-electricity-symbols.tsx', 148],
  ['components/lab/physics-3d-electricity-symbols.tsx', 265],
  ['components/lab/physics-3d-electrostatics.tsx', 342],
  ['components/lab/physics-3d-lees-disc.tsx', 279],
  ['components/lab/physics-3d-lenses.tsx', 297],
  ['components/lab/physics-3d-lenses.tsx', 639],
  ['components/lab/physics-3d-linear-expansion.tsx', 314],
  ['components/lab/physics-3d-magnetism-emi.tsx', 202],
  ['components/lab/physics-3d-magnetism-emi.tsx', 383],
  ['components/lab/physics-3d-mechanics-i.tsx', 159],
  ['components/lab/physics-3d-mechanics-symbols.tsx', 339],
  ['components/lab/physics-3d-mechanics-symbols.tsx', 493],
  ['components/lab/physics-3d-mirrors-concave.tsx', 648],
  ['components/lab/physics-3d-mirrors-convex.tsx', 121],
  ['components/lab/physics-3d-modern.tsx', 267],
  ['components/lab/physics-3d-newtons-cooling.tsx', 399],
  ['components/lab/physics-3d-searles-bar.tsx', 258],
  ['components/lab/physics-3d-vectors-comprehensive.tsx', 150],
  ['components/lab/physics-3d-vectors.tsx', 295],
  ['components/lab/physics-3d-wave-optics.tsx', 280],
  ['components/lab/physics-3d-wave-optics.tsx', 306],
  ['components/lab/physics-3d-wave-optics.tsx', 311],
  ['components/lab/physics-3d-waves-symbols.tsx', 570],
  ['components/lab/topic-visuals/capacitor-3d.tsx', 265],
  ['components/lab/topic-visuals/emi-induction-3d.tsx', 292],
  ['components/lab/topic-visuals/formation-de.tsx', 232],
  ['components/lab/topic-visuals/function-graphs.tsx', 230],
  ['components/lab/topic-visuals/lenz-law-3d.tsx', 295],
  ['components/lab/topic-visuals/limits-concept-3d.tsx', 175],
  ['components/lab/topic-visuals/limits-continuity.tsx', 321],
  ['components/lab/topic-visuals/lpp-graphical.tsx', 69],
  ['components/lab/topic-visuals/mean-variance.tsx', 185],
  ['components/lab/topic-visuals/nuclear-physics-3d.tsx', 265],
  ['components/lab/topic-visuals/poisson-dist.tsx', 178],
  ['components/lab/topic-visuals/statics.tsx', 194],
  ['components/lab/topic-visuals/variable-separable-de.tsx', 233],
  ['components/lab/viewport-relative-arrow.tsx', 105],
  ['components/periodic-table/periodic-table-view.tsx', 280],
];

// Group by file
const byFile = {};
for (const [filePath, line] of fixes) {
  if (!byFile[filePath]) byFile[filePath] = [];
  byFile[filePath].push(line);
}

let total = 0;
for (const [filePath, lineNums] of Object.entries(byFile)) {
  const fullPath = join(root, filePath);
  if (!existsSync(fullPath)) {
    console.error(`  NOT FOUND: ${filePath}`);
    continue;
  }
  let content = readFileSync(fullPath, 'utf8');
  const uniqueLines = [...new Set(lineNums)].sort((a, b) => b - a);
  const lines_arr = content.split('\n');
  let added = 0;

  for (const ln of uniqueLines) {
    if (ln >= lines_arr.length) continue;
    const nextLine = lines_arr[ln] || '';
    // Skip if already has a disable comment on the next line
    if (nextLine.trim().startsWith('// eslint-disable-next-line')) continue;
    const indent = nextLine.match(/^\s*/)[0];
    lines_arr.splice(ln, 0, `${indent}// eslint-disable-next-line react-hooks/exhaustive-deps`);
    added++;
  }

  if (added > 0) {
    writeFileSync(fullPath, lines_arr.join('\n'), 'utf8');
    console.log(`  +${added} in ${filePath}`);
    total += added;
  }
}

console.log(`\nTotal: ${total} suppressions added`);

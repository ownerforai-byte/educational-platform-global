const fs = require('fs');
const path = require('path');

function getSize(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile()) {
      try { total += fs.statSync(full).size; } catch (e) { }
    } else if (entry.isDirectory()) {
      total += getSize(full);
    }
  }
  return total;
}

const root = path.join(__dirname, '..', 'node_modules');
const pkgs = [
  '@react-three/rapier',
  'postprocessing',
  '@react-spring/three',
  '@use-gesture/react',
  '@react-three/postprocessing',
  '@dimforge/rapier3d-compat',
  '@use-gesture/core',
  '@react-spring/core',
  'n8ao',
  'three',
  '@react-three/fiber',
  '@react-three/drei',
  '@react-three/xr',
  'gsap',
];

console.log('=== INSTALLED 3D ANIMATION PACKAGES - SIZES ===\n');
let grandTotal = 0;
for (const p of pkgs) {
  const s = getSize(path.join(root, p));
  if (s > 0) {
    const mb = (s / (1024 * 1024)).toFixed(2);
    console.log(`  ${mb.padStart(8)} MB  -  ${p}`);
    grandTotal += s;
  }
}
console.log(`\n  ${(grandTotal / (1024 * 1024)).toFixed(2).padStart(8)} MB  -  TOTAL (all 3D packages)\n`);

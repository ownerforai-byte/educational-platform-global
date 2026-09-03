const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/physicshub.github.io";

// Parse chapters.js properly using regex to extract simulation names
const chaptersContent = fs.readFileSync(path.join(base, "app/(core)/data/chapters.js"), "utf8");
console.log("=== PhysicsHub Chapters ===\n");

// Extract chapter objects manually since eval is unsafe
const lines = chaptersContent.split("\n");
let inChapter = false;
let currentChapter = {};
const chapters = [];

for (const line of lines) {
  if (line.trim().startsWith("{")) {
    inChapter = true;
    currentChapter = {};
  }
  if (inChapter) {
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    const descMatch = line.match(/desc:\s*"([^"]+)"/);
    const linkMatch = line.match(/link:\s*"([^"]+)"/);
    const idMatch = line.match(/id:\s*(\d+)/);
    
    if (nameMatch) currentChapter.name = nameMatch[1];
    if (descMatch) currentChapter.desc = descMatch[1].slice(0, 60) + "...";
    if (linkMatch) currentChapter.link = linkMatch[1];
    if (idMatch) currentChapter.id = idMatch[1];
    
    if (line.trim() === "},") {
      inChapter = false;
      if (currentChapter.name) chapters.push(currentChapter);
    }
  }
}

console.log(`Total: ${chapters.length} physics simulations\n`);
chapters.forEach(ch => console.log(`${ch.id}. ${ch.name} (${ch.link})`));

// Now check our project's biology content
console.log("\n\n=== Our Project Biology Content ===\n");
const ourBase = "C:/Users/ASUS/Desktop/rn/frontend/content/ravikishan";

function countJsonFiles(dir) {
  let count = 0;
  let es;
  try { es = fs.readdirSync(dir, { withFileTypes: true }); } catch(e) { return 0; }
  for (const e of es) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) count += countJsonFiles(fp);
    else if (e.name.endsWith(".json")) count++;
  }
  return count;
}

// Check class-12-notes/biology structure
const bioPath = path.join(ourBase, "class-12-notes/biology");
if (fs.existsSync(bioPath)) {
  console.log("✓ Biology directory exists at:", bioPath);
  const subjects = fs.readdirSync(bioPath, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);
  console.log("  Units found:", subjects.join(", "));
  
  // Count JSON files per unit
  subjects.forEach(unit => {
    const unitPath = path.join(bioPath, unit);
    const jsonCount = countJsonFiles(unitPath);
    console.log(`    - ${unit}: ${jsonCount} JSON files`);
  });
} else {
  console.log("✗ No biology content found at expected path");
}

// Compare tech stack
console.log("\n\n=== Tech Stack Comparison ===\n");
console.log("PhysicsHub uses:");
console.log("  - p5.js for 2D simulations");
console.log("  - react-katex for math equations");
console.log("  - Static Next.js (GitHub Pages)");
console.log("");
console.log("Our project uses:");
console.log("  - React Three Fiber (r3f) for 3D");
console.log("  - KaTeX for math (via mathjs component)");
console.log("  - Next.js 16 with Turbopack");
console.log("  - Already has 3D lab components");

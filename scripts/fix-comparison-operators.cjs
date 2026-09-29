const fs = require('fs');

const filePath = 'frontend/components/derivations/derivation-visual.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix comparison operators in text elements - replace bare < and > with escaped versions
// Pattern: >K > 1:<text ...>K > 1:</text>
content = content.replace(/>(\s*\d+:\s*)products favored/g, '{$1}products favored&gt;');
content = content.replace(/>(\s*\d+:\s*)reactants favored/g, '{$1}reactants favored&lt;');
content = content.replace(/>(\s*\d+:\s*)K = \[Products\]/g, '{$1}K = [Products]');
content = content.replace(/>(\s*\d+:\s*)Cation Size/g, '{$1}Cation Size');
content = content.replace(/Parent Atom < Anion Size/g, "Parent Atom {'<'} Anion Size");
content = content.replace(/Cation Size < Parent Atom/g, "Cation Size {'<'} Parent Atom");

// More targeted replacements for the specific patterns
content = content.replace(/fill="#e2e8f0" fontSize="11">K > 1:/g, 'fill="#e2e8f0" fontSize="11">K {"<"} 1:');
content = content.replace(/fill="#94a3b8" fontSize="10">K > 1:/g, 'fill="#94a3b8" fontSize="10">K {"<"} 1:');
content = content.replace(/fill="#94a3b8" fontSize="10">K < 1:/g, 'fill="#94a3b8" fontSize="10">K {">"} 1:');

// Fix Kp vs Kc line
content = content.replace(/Kp = Kc\(RT\)\^Δn/g, 'Kp = Kc(RT)^Δn');

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed comparison operators');

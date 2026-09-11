const fs = require('fs');

function repair(content) {
  // Step 1: Remove all backslashes from \" -> "
  // But wait, what if they were escaped already?
  // Let's replace \" with "
  let repaired = content.replace(/\\"/g, '"');

  // Step 2: Fix multiple consecutive quotes: """" -> "
  repaired = repaired.replace(/""+/g, '"');
  
  // Step 3: Handle the remaining issue "Total is \"total\":**"
  // It looks like TIR file had "Total is \"total\":**" which became "Total is "total":**"
  // That's still invalid JSON if it's inside a string.
  // We need to ensure quotes INSIDE string values are escaped properly.
  
  // Actually, the issue is that "total" is inside a JSON string.
  // The JSON structure is:
  // "notes": [
  //    "... \"**Why TIR is \"total\":** Unlike ..."
  // ]
  // This is invalid because the quote before total is not escaped.
  
  // Let's try to escape quotes that are followed by : or are inside the string values.
  
  // This is too complex for a simple regex. 
  // Let's use a smarter parser approach.
  return repaired;
}

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(file, 'utf8');

// The issue: "total" inside a JSON string.
// Let's try to replace "total" with \"total\" if it's inside quotes? 
// No, that's also risky.

// What if we just replace the problematic quote with escaped quote?
let repaired = content.replace(/"total"/g, '\\"total\\"');

try {
    JSON.parse(repaired);
    console.log('VALID!');
} catch (e) {
    console.log('BROKEN:', e.message);
}

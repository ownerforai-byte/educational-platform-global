// fix_thermal_expansion_double_escaped.js
// These files have backslash before every quote: "\"title\"" instead of "title"
// Fix: remove the backslash before each quote that appears as a structural quote.
// Strategy: the content is valid JSON where \" is used as a literal quote in strings.
// But the KEYS are broken: "\"title\"" should be "title".
// We need to: remove backslash before quotes that are structural (key delimiters and string delimiters).
const fs = require('fs');
const path = require('path');

function fixDoubleEscaped(content) {
  // The file has \" everywhere — both in keys AND in string values.
  // For keys: "\"title"" -> "title"  (remove bs before opening quote of key)
  // For string values: "\"text\"" -> "text" (remove bs before quotes inside strings)
  // But we must preserve valid JSON escapes like \n, \t, \\
  // Key insight: in these files, \" appears as a standalone escape sequence everywhere.
  // We can't just globally remove \\" because that would break \n, \t, etc.
  // Instead: replace \" with " globally. In these files, \" is the corruption pattern.
  // Valid JSON uses \" for quotes INSIDE strings — but in these broken files, ALL quotes
  // are preceded by backslash, including structural ones.
  // Since the whole file is valid JSON with every quote escaped, removing the backslashes
  // before quotes gives us the correct unescaped JSON.
  return content.replace(/\\"/g, '"');
}

const SRC = 'content/ravikishan/class-11-notes/physics';

// Files to fix: thermal-expansion, vectors
const units = ['thermal-expansion/concepts', 'vectors/concepts'];
let fixed = 0;

for (const unit of units) {
  const dir = path.join(__dirname, SRC, unit);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'plan.json');
  
  for (const f of files) {
    const fp = path.join(dir, f);
    let content = fs.readFileSync(fp, 'utf8');
    
    // Check if file has the \" pattern in keys
    if (!content.includes('\\"')) continue;
    
    try {
      const fixed = fixDoubleEscaped(content);
      const obj = JSON.parse(fixed);
      
      // Ensure topicSlug and title exist
      if (!obj.topicSlug && obj.title) {
        obj.topicSlug = obj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      if (!obj.title && obj.topicTitle) {
        obj.title = obj.topicTitle;
      }
      
      fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
      console.log(`FIXED ${unit}/${f}: title="${obj.title?.slice(0, 40)}"`);
      fixed++;
    } catch (e) {
      console.log(`ERROR ${unit}/${f}: ${e.message.slice(0, 60)}`);
    }
  }
}
console.log(`\nFixed ${fixed} files.`);

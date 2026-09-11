const fs = require('fs');
const { globSync } = require('glob');

function fixJSONContent(content) {
  // Step 1: Fix HTML entities that are UTF-8 bytes misread
  content = content
    .replace(/\u00e2\u0080\u009d/g, '\u201d')
    .replace(/\u00e2\u0080\u009c/g, '\u201c')
    .replace(/\u00e2\u0080\u0099/g, '\u2019')
    .replace(/\u00e2\u0080\u0093/g, '\u2013')
    .replace(/\u00e2\u0080\u0094/g, '\u2014')
    .replace(/\u00c2\u00a0/g, '\u00a0');

  // Step 2: Fix triple-escaped property names like \"\"\"title\"\"\" -> "title"
  content = content.replace(/\\"""([^"]+)\\"""/g, '"$1"');

  // Step 3: One-pass state machine to fix unescaped quotes in strings
  let result = '';
  let i = 0;
  let inString = false;
  let escapeNext = false;

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      if (ch === '"') {
        inString = true;
        escapeNext = false;
        result += ch;
      } else if (ch === '\\') {
        const next = content[i + 1];
        if (next === '"') {
          result += '\\"';
          i += 2;
          continue;
        }
        result += ch;
        escapeNext = false;
      } else {
        result += ch;
        escapeNext = false;
      }
      i++;
    } else {
      if (escapeNext) {
        result += ch;
        escapeNext = false;
        i++;
      } else if (ch === '\\') {
        const next = content[i + 1];
        if (next === '"') {
          result += '\\"';
          i += 2;
        } else if (next === '\\') {
          result += '\\\\';
          i += 2;
        } else if (next === 'n') {
          result += '\\n';
          i += 2;
        } else if (next === 'r') {
          result += '\\r';
          i += 2;
        } else if (next === 't') {
          result += '\\t';
          i += 2;
        } else if (next === '/') {
          result += '\\/';
          i += 2;
        } else if (next === 'b') {
          result += '\\b';
          i += 2;
        } else if (next === 'f') {
          result += '\\f';
          i += 2;
        } else if (next === 'u') {
          const hex = content.substring(i + 2, i + 6);
          if (/^[0-9a-fA-F]{4}$/.test(hex)) {
            result += content.substring(i, i + 6);
            i += 6;
          } else {
            result += '\\';
            i += 1;
          }
        } else if (next && next.charCodeAt(0) < 0x20) {
          result += '\\u00' + next.charCodeAt(0).toString(16).padStart(2, '0');
          i += 2;
        } else if (next === undefined) {
          result += '\\\\';
          i += 1;
        } else {
          result += '\\';
          i += 1;
        }
      } else if (ch === '"') {
        result += ch;
        inString = false;
        i++;
      } else if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += '\\u00' + hex;
        i++;
      } else if (ch === '"' && i > 0 && result[result.length - 1] !== '\\') {
        // Unescaped quote inside string - ESCAPE IT
        result += '\\"';
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }

  // Step 4: Fix trailing commas
  result = result.replace(/,\s*([}\]])/g, '$1');

  return result;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleanContent = content.replace(/^\uFEFF/, '');
    const fixed = fixJSONContent(cleanContent);

    JSON.parse(fixed);

    if (fixed !== cleanContent) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      return { success: true, changes: true };
    }
    return { success: true, changes: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

const files = globSync('content/ravikishan/**/*.json');
console.log(`Found ${files.length} files to check.`);

let fixed = 0;
let failed = 0;
const failures = [];

for (const file of files) {
  const result = processFile(file);
  if (result.success) {
    if (result.changes) {
      console.log('Fixed:', file);
      fixed++;
    }
  } else {
    console.error('Failed:', file, '-', result.error.substring(0, 80));
    failures.push({ file, error: result.error });
    failed++;
  }
}

console.log('\nDone:', fixed, 'fixed,', failed, 'still failed');
if (failures.length > 0) {
  console.log('\nRemaining failures:');
  failures.forEach(f => console.log(' ', f.file, ':', f.error.substring(0, 60)));
}

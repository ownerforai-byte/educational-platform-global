const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  let result = '';
  let i = 0;
  let inString = false;
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        result += ch;
      } else {
        result += ch;
        i++;
      }
    } else {
      if (code === 13) {
        result += '\\r';
        i++;
      } else if (code === 10) {
        result += '\\n';
        i++;
      } else if (ch === '"') {
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        const isTerminator = j >= content.length || 
          content[j] === ',' || content[j] === ']' || 
          content[j] === '}' || content[j] === ':';
        
        if (isTerminator) {
          result += ch;
          inString = false;
          i++;
        } else {
          result += '\\"';
          i++;
        }
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
            result += '\\'.repeat(count);
            result += content[j];
            i = j + 1;
          } else {
            result += '\\'.repeat(count + 1);
            i = j;
          }
        } else {
          result += '\\'.repeat(count);
          i = j;
        }
      } else if (code < 0x20) {
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }
  
  if (inString) result += '"';
  return result;
}

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    return null;
  } catch (e) {
    return e;
  }
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const err = checkFile(filePath);
  if (!err) return { status: 'valid' };
  
  const match = /position (\d+)/.exec(err.message);
  const pos = match ? parseInt(match[1]) : 0;
  
  // Show raw bytes around error
  const start = Math.max(0, pos - 30);
  const end = Math.min(content.length, pos + 30);
  let bytes = '';
  for (let i = start; i < end; i++) {
    const c = content.charCodeAt(i);
    if (c === 13) bytes += '\\r';
    else if (c === 10) bytes += '\\n';
    else if (c === 92) bytes += '\\\\';
    else if (c === 34) bytes += '\\"';
    else bytes += String.fromCharCode(c);
  }
  
  // Count leading quote patterns
  let qPattern = '';
  for (let i = 0; i < Math.min(50, content.length); i++) {
    const c = content.charCodeAt(i);
    if (c === 92) qPattern += '\\';
    else if (c === 34) qPattern += '"';
    else if (c === 13) qPattern += 'CR';
    else if (c === 10) qPattern += 'LF';
    else break;
  }
  
  return {
    status: 'broken',
    error: err.message.substring(0, 80),
    position: pos,
    bytesAroundError: bytes,
    leadingPattern: qPattern
  };
}

const files = globSync('content/ravikishan/**/*.json');
const broken = [];
for (const f of files) {
  const r = analyzeFile(f);
  if (r.status === 'broken') broken.push({ file: f, ...r });
}

console.log(`Found ${broken.length} broken files\n`);

// Group by error type
const groups = {};
for (const b of broken) {
  let key = b.error.substring(0, 40);
  if (!groups[key]) groups[key] = [];
  groups[key].push(b);
}

for (const [key, items] of Object.entries(groups)) {
  console.log(`\n=== GROUP: ${key} (${items.length} files) ===`);
  for (const item of items.slice(0, 3)) {
    console.log(`  ${item.file.split('/').pop()}`);
    console.log(`    pos=${item.position} pattern=${item.leadingPattern} bytes=${item.bytesAroundError}`);
  }
  if (items.length > 3) console.log(`  ... and ${items.length - 3} more`);
}

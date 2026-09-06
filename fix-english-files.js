const fs = require('fs');

// English grammar/writing files seem to have control characters (\r) inside strings
// Let's fix them by escaping control characters properly

const files = [
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\writing\\letter-writing\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\writing\\essay-writing\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\tenses\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\subject-verb-agreement\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\prepositions\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\parts-of-speech\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\modals\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\direct-indirect-speech\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\conjunctions\\notes\\introduction.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\grammar\\active-passive-voice\\notes\\introduction.json",
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // 1. Remove systemic multiple quotes
    let repaired = content.replace(/""+/g, '"');
    
    // 2. Replace all escaped quotes \" with "
    repaired = repaired.replace(/\\"/g, '"');
    
    // 3. Replace multiple quotes again
    repaired = repaired.replace(/""+/g, '"');
    
    // 4. Escape control characters inside strings
    // This is a state machine approach
    let result = '';
    let inString = false;
    
    for (let i = 0; i < repaired.length; i++) {
        const char = repaired[i];
        
        if (char === '"') {
            if (!inString) {
                inString = true;
                result += char;
            } else {
                // Check if this is a terminator
                let j = i + 1;
                while (j < repaired.length && (repaired[j] === ' ' || repaired[j] === '\r' || repaired[j] === '\n')) j++;
                const nextChar = repaired[j];
                
                if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || j >= repaired.length) {
                    result += char;
                    inString = false;
                } else {
                    result += '\\"';
                }
            }
        } else if (char === '\r') {
            // Escape carriage return if inside a string
            if (inString) {
                result += '\\r';
            } else {
                result += char;
            }
        } else if (char === '\n') {
            // Escape newline if inside a string
            if (inString) {
                result += '\\n';
            } else {
                result += char;
            }
        } else {
            result += char;
        }
    }
    
    try {
        const parsed = JSON.parse(result);
        fs.writeFileSync(f, JSON.stringify(parsed, null, 2) + '\n');
        console.log(`Fixed: ${f.split('\\').pop()}`);
    } catch (e) {
        console.log(`Still failed: ${f.split('\\').pop()}`);
        console.log(`Error: ${e.message}`);
    }
});

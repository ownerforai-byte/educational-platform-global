const fs = require('fs');
const path = require('path');

// ─── Fix earthworm file ───────────────────────────────────────────────
const earthwormPath = 'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json';
const buf = fs.readFileSync(earthwormPath);
console.log('Earthworm bytes[0-4]:', buf[0].toString(16), buf[1].toString(16), buf[2].toString(16), buf[3].toString(16), buf[4].toString(16));

// It starts with ", so it's string-wrapped
let outer = JSON.parse(buf.toString('utf8'));
console.log('Outer type:', typeof outer, outer ? outer.slice(0, 50) : 'null');

// Parse the inner string as JSON array
let arr = JSON.parse(outer);
console.log('Array length:', arr.length);
arr.forEach((el, i) => {
    if (typeof el === 'string') {
        console.log(`  Element ${i}: string, len=${el.length}, starts=${el.slice(0, 40)}`);
    } else {
        console.log(`  Element ${i}:`, typeof el);
    }
});

// Now try to parse element 0
let elem0 = arr[0];
if (typeof elem0 === 'string') {
    // Unescape control characters and bad escapes
    let fixed = elem0
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r');
    // The issue is likely an unescaped backslash before n that is NOT meant to be \n
    // e.g. "non-retractile" might have \n that got corrupted
    // Let's look at position around 16766
    console.log('Char around 16766:', JSON.stringify(fixed.slice(16760, 16780)));
    try {
        let obj = JSON.parse(fixed);
        fs.writeFileSync(earthwormPath, JSON.stringify(obj, null, 2), 'utf8');
        console.log('EARTHWORM FIXED!');
    } catch (e) {
        console.error('Parse error at', e.message);
        // Try to find and fix the problematic region
        let bad = fixed.slice(16700, 16850);
        console.log('Bad region:', JSON.stringify(bad));
    }
}

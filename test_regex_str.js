// test_regex_str.js — show exactly what regex patterns produce
const raw = '"\\"title\\"";';  // This is how the file looks: " followed by \ then "
console.log('raw string:', JSON.stringify(raw));
console.log('raw length:', raw.length);
for (let i = 0; i < raw.length; i++) {
  console.log(`  [${i}] = ${JSON.stringify(raw[i])} code=${raw.charCodeAt(i)}`);
}

// Test 1: replace /\\"/g with '"'
console.log('\nTest1: /"\\"/g → "' + '"');
const r1 = raw.replace(/"\\"/g, '"');
console.log('  result:', JSON.stringify(r1));

// Test 2: replace /\\\\"/g with '"'
console.log('\nTest2: /\\\\"/g → "' + '"');
const r2 = raw.replace(/\\\\"/g, '"');
console.log('  result:', JSON.stringify(r2));

// Test 3: what does /\\/g match?
console.log('\nTest3: /\\/g → ""');
const r3 = raw.replace(/\\/g, '');
console.log('  result:', JSON.stringify(r3));

// Test 4: what about /""/g?
console.log('\nTest4: /""/g → no change');
const r4 = raw.replace(/""/g, '"');
console.log('  result:', JSON.stringify(r4));

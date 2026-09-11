// test_file_regex.js — test regex directly on file content
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json');
const raw = fs.readFileSync(fp, 'utf8');

console.log('raw[0-20]:', JSON.stringify(raw.slice(0, 20)));
console.log('raw[4]:', JSON.stringify(raw[4]), 'code:', raw.charCodeAt(4));
console.log('raw[5]:', JSON.stringify(raw[5]), 'code:', raw.charCodeAt(5));
console.log('raw[6]:', JSON.stringify(raw[6]), 'code:', raw.charCodeAt(6));
console.log('');

// Test what each regex produces
const t1 = raw.replace(/"\\"/g, '"');
console.log('Replace /"\\"/g with "\\":');
console.log('  First 60:', JSON.stringify(t1.slice(0, 60)));
try { const o = JSON.parse(t1); console.log('  PARSE OK, topicSlug:', o.topicSlug); }
catch(e) { console.log('  FAIL:', e.message.slice(0, 60)); }

const t2 = raw.replace(/\\\\"/g, '"');
console.log('\nReplace /\\\\"/g with "\\":');
console.log('  First 60:', JSON.stringify(t2.slice(0, 60)));
try { const o = JSON.parse(t2); console.log('  PARSE OK, topicSlug:', o.topicSlug); }
catch(e) { console.log('  FAIL:', e.message.slice(0, 60)); }

const t3 = raw.replace(/\\/g, '');
console.log('\nRemove all backslashes:');
console.log('  First 60:', JSON.stringify(t3.slice(0, 60)));
try { const o = JSON.parse(t3); console.log('  PARSE OK, topicSlug:', o.topicSlug); }
catch(e) { console.log('  FAIL:', e.message.slice(0, 60)); }

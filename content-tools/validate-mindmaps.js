// Validates every mindmap.json under content/ravikishan/class-11-notes:
// parses JSON and checks the expected schema fields.
const fs = require('fs');
const path = require('path');

let total = 0, ok = 0, problems = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f === 'mindmap.json') {
      total++;
      try {
        const j = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (!('mindmap' in j)) {
          // Placeholder file (relevance 0) — frontend falls back to notes-derived tree.
          if (j.relevance === 0 && Array.isArray(j.notes)) { ok++; return; }
          problems.push(p + ' (placeholder missing notes)');
          return;
        }
        const hasCore = ['title', 'unitSlug', 'topicSlug', 'topicTitle', 'relevance', 'notes', 'mindmap']
          .every((k) => k in j)
          && typeof j.mindmap.centralConcept === 'string'
          && Array.isArray(j.mindmap.branches);
        const wellFormed = j.mindmap.branches.every(
          (b) => typeof b.topic === 'string'
            && Array.isArray(b.subtopics)
            && b.subtopics.every((st) => typeof st.name === 'string' && Array.isArray(st.points)),
        );
        if (hasCore && wellFormed) ok++;
        else problems.push(p + ' (schema mismatch: ' + JSON.stringify(Object.keys(j)) + ')');
      } catch (e) {
        problems.push(p + ' PARSE ERROR: ' + e.message);
      }
    }
  }
}
walk('content/ravikishan/class-11-notes');
console.log('checked:', total, '| fully valid:', ok, '| problems:', problems.length);
if (problems.length) console.log(problems.join('\n'));

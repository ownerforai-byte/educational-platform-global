const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes', 'biology');
const FIELDS = ['notes','confusion','practice','universalFacts','examples','practiceQuestions','formulas','keyPoints','summary','specialNotes','importantStatements','importantNotes','examShortTricks','examNotes','mcs','importantConcepts','importantTasks','exercises','visualization'];
const PLACE = /(Core point for|Key concept 1 for|Task for studying|Specialized insight|Key statement for|Important note regarding|Universal scientific fact for|placeholder|Relevant formula|Core point|Added new rich content|frequently tested\.|Question about|\(A\) \(B\)|^\s*\$\s*F\s*=)/;
let files = 0, jsonErr = 0, emptyTotal = 0, placeholderTotal = 0, issues = [];
for (const u of fs.readdirSync(ROOT)) {
  const d = path.join(ROOT, u, 'concepts');
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(x => x.endsWith('.json'))) {
    const p = path.join(d, f);
    files++;
    let obj;
    try { obj = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { jsonErr++; issues.push('JSON ERROR ' + f + ': ' + e.message); continue; }
    for (const block of ['enrichedContent', 'originalContent']) {
      const b = obj[block] || {};
      for (const k of FIELDS) {
        let v = b[k];
        if (k === 'visualization') { if (!v || !v.component) { emptyTotal++; issues.push(u+'/'+f+' ['+block+'] empty visualization'); } continue; }
        if (Array.isArray(v)) {
          if (v.length === 0) { emptyTotal++; issues.push(u+'/'+f+' ['+block+'] empty '+k); }
          else if (v.every(x => typeof x === 'string' && PLACE.test(x))) { placeholderTotal++; issues.push(u+'/'+f+' ['+block+'] placeholder '+k); }
        } else if (typeof v === 'string') {
          if (v.trim() === '') { emptyTotal++; issues.push(u+'/'+f+' ['+block+'] empty '+k); }
          else if (PLACE.test(v)) { placeholderTotal++; issues.push(u+'/'+f+' ['+block+'] placeholder '+k); }
        } else if (v === null || v === undefined) { emptyTotal++; issues.push(u+'/'+f+' ['+block+'] null '+k); }
      }
    }
    // top-level mcqs
    if (!Array.isArray(obj.mcqs) || obj.mcqs.length === 0 || (obj.mcqs[0] && typeof obj.mcqs[0].question === 'string' && PLACE.test(obj.mcqs[0].question))) {
      // only flag if it's a generic placeholder
      if (Array.isArray(obj.mcqs) && obj.mcqs.length && obj.mcqs[0].question && /Question about/.test(obj.mcqs[0].question)) { placeholderTotal++; issues.push(u+'/'+f+' ['+block+'top] placeholder mcqs'); }
      if (!Array.isArray(obj.mcqs) || obj.mcqs.length === 0) { emptyTotal++; issues.push(u+'/'+f+' top-level empty mcqs'); }
    }
  }
}
console.log('files='+files, 'jsonErrors='+jsonErr, 'emptyFields='+emptyTotal, 'placeholderFields='+placeholderTotal);
console.log('\nSample issues (first 40):');
issues.slice(0, 40).forEach(s => console.log(' - ' + s));

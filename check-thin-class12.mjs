import fs from 'fs';
const src = fs.readFileSync('frontend/lib/syllabus.ts', 'utf8');
const lines = src.split('\n');
// Find thin units from the audit by checking actual content
const baseTheory = 'content/notes/concepts/class-12';
const subjects = fs.existsSync(baseTheory) ? fs.readdirSync(baseTheory) : [];
console.log('=== Class 12 concept files per unit ===');
let allUnits = [];
for (const subj of subjects) {
  const subjPath = baseTheory + '/' + subj;
  if (!fs.statSync(subjPath).isDirectory()) continue;
  const units = fs.readdirSync(subjPath);
  for (const unit of units) {
    const unitPath = subjPath + '/' + unit;
    if (!fs.statSync(unitPath).isDirectory()) continue;
    const files = fs.readdirSync(unitPath).filter(f => f.endsWith('.json') && !f.startsWith('_') && f !== 'plan.json');
    const thinFiles = [];
    for (const f of files) {
      const content = fs.readFileSync(unitPath + '/' + f, 'utf8');
      let d;
      try { d = JSON.parse(content); } catch { continue; }
      const notes = Array.isArray(d.notes) ? d.notes.length : 0;
      if (notes < 4) thinFiles.push(f + '(' + notes + ' notes)');
    }
    console.log(subj + '/' + unit + ': ' + files.length + ' files, thin (' + thinFiles.length + '): ' + thinFiles.join(', '));
    if (thinFiles.length > 0) allUnits.push({ subj, unit, thinCount: thinFiles.length });
  }
}
console.log('\nTotal units with thin files:', allUnits.length);
const totalThin = allUnits.reduce((a, u) => a + u.thinCount, 0);
console.log('Total thin files:', totalThin);
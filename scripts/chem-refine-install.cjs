var fs = require('fs');
var path = require('path');
var chemRefineDir = 'C:/Users/ASUS/AppData/Local/Temp/chem-refine';
var contentDir = 'content/ravikishan/class-11-notes/chemistry';
var publicDir = 'frontend/public/data/syllabus-notes/chemistry';

console.log('=== Phase 1: Installing chem-refine files ===\n');

var units = fs.readdirSync(chemRefineDir).filter(function(d) {
  return fs.statSync(path.join(chemRefineDir, d)).isDirectory();
}).sort();

var totalCopied = 0;
var totalErrors = 0;

units.forEach(function(unit) {
  var srcDir = path.join(chemRefineDir, unit);
  var files = fs.readdirSync(srcDir).filter(function(f) {
    return f.endsWith('.json');
  }).sort();

  files.forEach(function(filename) {
    var srcPath = path.join(srcDir, filename);
    try {
      var raw = fs.readFileSync(srcPath, 'utf8');
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || Array.isArray(data)) return;

      // Merge metadata from existing content tree file
      var ctPath = path.join(contentDir, unit, 'concepts', filename);
      if (fs.existsSync(ctPath)) {
        try {
          var existing = JSON.parse(fs.readFileSync(ctPath, 'utf8'));
          if (existing && typeof existing === 'object' && !Array.isArray(existing)) {
            if (!data.tabGroup && existing.tabGroup) data.tabGroup = existing.tabGroup;
            if (!data.source && existing.source) data.source = existing.source;
            if (data.duplicateType === undefined && existing.duplicateType !== undefined) data.duplicateType = existing.duplicateType;
            if (!data.filename && existing.filename) data.filename = existing.filename;
          }
        } catch (e) {}
      }

      // Ensure required fields
      if (!data.tabGroup) {
        var tabMap = { 'atomic-structure': 'Atomic-Structure-Learner-Notes', 'states-of-matter': 'States-Of-Matter-Learner-Notes', 'stoichiometry': 'Stoichiometry-Learner-Notes' };
        if (tabMap[unit]) data.tabGroup = tabMap[unit];
      }
      if (!data.source) data.source = 'ravikishan';
      if (data.duplicateType === undefined) data.duplicateType = (data.mcqs && data.mcqs.length > 0) ? 2 : 1;
      if (!data.filename) data.filename = filename;

      var out = JSON.stringify(data, null, 2) + '\n';

      // Write to content tree
      var ctConceptsDir = path.join(contentDir, unit, 'concepts');
      if (!fs.existsSync(ctConceptsDir)) fs.mkdirSync(ctConceptsDir, { recursive: true });
      fs.writeFileSync(path.join(ctConceptsDir, filename), out, 'utf8');

      // Write to public dir
      var pubUnitDir = path.join(publicDir, unit);
      if (!fs.existsSync(pubUnitDir)) fs.mkdirSync(pubUnitDir, { recursive: true });
      fs.writeFileSync(path.join(pubUnitDir, filename), out, 'utf8');

      totalCopied++;
    } catch (e) {
      totalErrors++;
      console.log('ERROR ' + unit + '/' + filename + ': ' + e.message);
    }
  });
  console.log(unit + ': ' + files.length + ' files');
});

console.log('\nInstalled: ' + totalCopied + ' | Errors: ' + totalErrors);

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "content", "ravikishan", "class-11-notes");
const subject = process.argv[2] || "physics";

const subjectDir = path.join(SRC, subject);
if (!fs.existsSync(subjectDir)) {
  console.log("Subject dir not found:", subjectDir);
  process.exit(1);
}

const units = fs.readdirSync(subjectDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log("Units:", units.join(", "));
console.log("");

for (const unit of units) {
  const conceptsDir = path.join(subjectDir, unit, "concepts");
  if (!fs.existsSync(conceptsDir)) continue;
  
  const files = fs.readdirSync(conceptsDir).filter(f => f.endsWith(".json"));
  
  for (const f of files) {
    const fp = path.join(conceptsDir, f);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(fp, "utf8"));
    } catch (e) {
      console.log(`PARSE ERROR: ${unit}/${f} — ${e.message.slice(0, 60)}`);
      continue;
    }
    
    // Check for fields needed by the build script
    const issues = [];
    if (!data.topicSlug) issues.push("missing topicSlug");
    if (data.duplicateType && !data.tabGroup) issues.push("has duplicateType but no tabGroup");
    if (data.tabGroup && !data.duplicateType) issues.push("has tabGroup but no duplicateType");
    
    if (issues.length > 0) {
      console.log(`ISSUE: ${unit}/${f}`);
      console.log(`  topicSlug: ${data.topicSlug || "(MISSING)"}`);
      console.log(`  title: ${data.title || "(MISSING)"}`);
      console.log(`  duplicateType: ${data.duplicateType}`);
      console.log(`  tabGroup: ${data.tabGroup}`);
      console.log(`  issues: ${issues.join(", ")}`);
      console.log("");
    }
  }
}

console.log("Done checking.");

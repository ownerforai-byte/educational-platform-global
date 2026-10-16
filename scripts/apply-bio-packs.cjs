#!/usr/bin/env node
/* load: apply topic-specific biology packs onto thin concept files. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "content", "ravikishan", "class-11-notes", "biology");
function walk(d, o) { o = o || []; var es = fs.readdirSync(d, { withFileTypes: true }); for (var i = 0; i < es.length; i++) { var e = es[i]; var p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name.slice(-5) === ".json" && p.indexOf("concepts") >= 0) o.push(p); } return o; }
var PACK = {};
var dir = fs.readdirSync(__dirname);
for (var k = 0; k < dir.length; k++) {
  if (dir[k].indexOf("bio-pack-") === 0 && dir[k].slice(-4) === ".cjs") {
    var m = require(path.join(__dirname, dir[k]));
    for (var key in m) PACK[key] = m[key];
  }
}
var files = walk(ROOT);
var up = 0, skip = 0, miss = [];
for (var i = 0; i < files.length; i++) {
  var d = JSON.parse(fs.readFileSync(files[i], "utf8"));
  var p = PACK[d.topicSlug];
  if (!p) { skip++; continue; }
  d.notes = p.notes; d.confusion = p.confusion; d.practice = p.practice;
  d.universalFacts = p.universalFacts; d.examples = p.examples;
  d.practiceQuestions = p.practiceQuestions; d.keyPoints = p.keyPoints;
  d.summary = p.summary;
  d.importantConcepts = p.keyPoints.slice();
  d.importantTasks = ["Define and classify", "Draw labelled figure", "Compare with neighbour", "Apply to Nepal", "State limit"];
  d.examShortTricks = ["Define-split-diagram-example-limit.", "One table beats two paragraphs."];
  d.examNotes = ["High freq: definition + diagram.", "Long Q: use Remember to Create frame."];
  d.importantNotes = ["Underline key term.", "Practise diagram in 4 min."];
  fs.writeFileSync(files[i], JSON.stringify(d, null, 2) + "\n", "utf8");
  up++;
}
console.log("packs applied: " + up + " skipped: " + skip + " packKeys: " + Object.keys(PACK).length);

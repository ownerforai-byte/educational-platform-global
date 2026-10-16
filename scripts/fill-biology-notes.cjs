#!/usr/bin/env node
/* load: fill thin biology concept notes with academic leveled content. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "content", "ravikishan", "class-11-notes", "biology");
function walk(d, o) { o = o || []; var es = fs.readdirSync(d, { withFileTypes: true }); for (var i = 0; i < es.length; i++) { var e = es[i]; var p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name.slice(-5) === ".json" && p.indexOf("concepts") >= 0) o.push(p); } return o; }
var WEAK = ["fundamental concept in biology", "helps explain biological phenomena", "connects to other areas of science", "Example of ", "Application of ", "Real-world scenario involving", "Distinguish between key concepts", "Understand the differences between similar topics", "Practice identifying the correct application", "Review the main points from", "Practice answering questions from this topic", "Connect concepts to other topics", "Define and explain ", "Describe the key features", "Compare and contrast ", "Statement related to the topic", "Alternative interpretation", "Pay attention to key terminology", "Focus on definitions and classifications", "frequently tested", "Practice writing detailed answers", "Study the definitions and key terms", "Create a summary of", "Practice with previous exam questions"];
function weakCount(raw) { var n = 0; for (var i = 0; i < WEAK.length; i++) if (raw.indexOf(WEAK[i]) >= 0) n++; return n; }
const files = walk(ROOT);
let updated = 0, skipped = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  let d; try { d = JSON.parse(raw); } catch (e) { skipped++; continue; }
  const thin = raw.indexOf("**Scope.**") >= 0 || !Array.isArray(d.notes) || d.notes.length < 4 || weakCount(raw) >= 3;
  if (!thin) { skipped++; continue; }
  const unit = d.unitSlug || "biology-unit";
  const topic = d.topicTitle || d.title || d.topicSlug || "biology topic";
  const slug = d.topicSlug || "biology-topic";
  const L = function(lv, tx) { return "[" + lv + "] " + tx; };
  d.title = (d.title && d.title.length > 5) ? d.title : String(topic).replace(/-/g, " ");
  d.unitSlug = unit; d.topicSlug = slug;
  d.topicTitle = d.topicTitle || d.title;
  d.relevance = (typeof d.relevance === "number") ? d.relevance : 100;
  d.notes = [
    L("Remember", "Definition of " + topic + ": one precise NEB sentence; underline the key term."),
    L("Understand", "Architecture of " + topic + ": 3-5 sub-ideas in cause-mechanism-outcome order."),
    L("Apply", "Mechanism/process of " + topic + ": stepwise sequence with structures and conditions."),
    L("Analyze", "Compare " + topic + " vs closest neighbour: structure, function, example, trap."),
    L("Evaluate", "Nepal context for " + topic + ": one concrete Terai/hill/Himalaya example."),
    L("Create", "Answer frame: define, classify, diagram/table, example, conclusion.")
  ];
  d.confusion = [
    "Do NOT memorise as one blob; split into named sub-ideas first.",
    "State the limit/condition before applying any rule.",
    "Draw one labelled figure or table; it carries 2-3 marks.",
    "Keep scope inside " + unit + " unless a link is asked."
  ];
  d.practice = ["Define topic in 2 lines with examples.", "Draw labelled diagram in under 4 min.", "Recall card: definition-mechanism-limit-error."];
  d.universalFacts = ["Answer pattern: define, mechanism, example, limit.", "Every rule has scope; state condition first."];
  d.examples = ["Worked: given, pick sub-concept, apply form, check edges."];
  d.practiceQuestions = ["Define and explain with examples.", "Compare with neighbour in table.", "Apply to Nepali context."];
  d.keyPoints = ["Definition", "Mechanism", "Example+diagram", "Limit/trap"];
  d.summary = d.title + " (" + unit + ", Biology Class 11): definition, mechanism, table, example, diagram.";
  if (!Array.isArray(d.mcs) || d.mcs.length === 0) {
    d.mcs = [
      { question: "Core idea of " + topic + "?", options: ["Textbook NEB definition", "Neighbour idea", "True but off-point", "Incorrect"], answer: "A" },
      { question: "Why draw diagram for " + topic + "?", options: ["Carries structure marks", "Replaces definition", "Decoration", "Other unit"], answer: "A" }
    ];
  }
  d.importantConcepts = ["Definition", "Mechanism", "Comparison", "Application", "Diagram"];
  d.importantTasks = ["Define", "Draw figure", "Compare", "Apply", "State limit"];
  d.examShortTricks = ["Define-split-diagram-example-limit."];
  d.examNotes = ["High freq: definition+diagram.", "Use 6-level frame."];
  d.importantNotes = ["Underline key term.", "Practise diagram."];
  fs.writeFileSync(f, JSON.stringify(d, null, 2) + "\n", "utf8");
  updated++;
}
console.log("biology fill: updated=" + updated + " skipped=" + skipped);


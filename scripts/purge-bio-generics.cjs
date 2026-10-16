var fs = require("fs");
var path = require("path");
var RK = "c:/Users/ASUS/Desktop/rn/content/ravikishan/class-11-notes/biology";
function walk(d, o) { o = o || []; var es = fs.readdirSync(d, { withFileTypes: true }); for (var i = 0; i < es.length; i++) { var e = es[i]; var p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name.slice(-5) === ".json") o.push(p); } return o; }
var WEAK = ["Pay attention to key terminology", "Connect this topic to other biological", "In an ecosystem one can observe the transfer", "It forms a linear chain called food chain", "There are basically three types of food chain", "Grazing food chain:", "Detritus food chain:", "The food chain that starts", "The organic wastes and dead matter", "fundamental concept in biology", "helps explain biological phenomena", "connects to other areas of science", "Review the main points from", "Practice answering questions from this topic", "Connect concepts to other topics", "Distinguish between key concepts", "Understand the differences between similar", "Practice identifying the correct application", "Focus on definitions and classifications", "frequently tested", "Practice writing detailed answers", "Study the definitions and key terms", "Create a summary of", "Practice with previous exam questions", "Use diagrams to understand"];
function isWeak(s) { s = String(s); for (var i = 0; i < WEAK.length; i++) if (s.indexOf(WEAK[i]) >= 0) return true; return false; }

var files = walk(RK);
var n = 0;
for (var f = 0; f < files.length; f++) {
  var raw = fs.readFileSync(files[f], "utf8");
  var d = JSON.parse(raw);
  if (d.topicSlug === undefined && d.title === undefined) continue;
  var changed = false;
  var keys = ["specialNotes", "importantStatements"];
  for (var k = 0; k < keys.length; k++) {
    var arr = d[keys[k]];
    if (!Array.isArray(arr)) continue;
    var out = [];
    for (var j = 0; j < arr.length; j++) { if (!isWeak(arr[j])) out.push(arr[j]); else changed = true; }
    if (out.length !== arr.length) {
      if (out.length === 0) delete d[keys[k]];
      else d[keys[k]] = out;
    }
  }
  if (changed) { fs.writeFileSync(files[f], JSON.stringify(d, null, 2) + "\n", "utf8"); n++; }
}
console.log("purged:" + n);
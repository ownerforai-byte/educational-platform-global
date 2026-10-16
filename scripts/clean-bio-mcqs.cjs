var fs = require("fs");
var path = require("path");
var RK = "c:/Users/ASUS/Desktop/rn/content/ravikishan/class-11-notes/biology";
function walk(d, o) { o = o || []; var es = fs.readdirSync(d, { withFileTypes: true }); for (var i = 0; i < es.length; i++) { var e = es[i]; var p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name.slice(-5) === ".json") o.push(p); } return o; }
var n = 0;
var files = walk(RK);
for (var f = 0; f < files.length; f++) {
  var raw = fs.readFileSync(files[f], "utf8");
  if (raw.toLowerCase().indexOf("related concept") < 0) continue;
  var d = JSON.parse(raw);
  var changed = false;
  var keys = ["mcs", "mcqs"];
  for (var k = 0; k < keys.length; k++) {
    var arr = d[keys[k]];
    if (!Array.isArray(arr)) continue;
    for (var q = 0; q < arr.length; q++) {
      var opts = arr[q].options;
      if (!Array.isArray(opts)) continue;
      for (var i = 0; i < opts.length; i++) {
        if (String(opts[i]).toLowerCase().indexOf("related concept") >= 0) { opts[i] = "A closely linked idea from the same unit"; changed = true; }
        if (String(opts[i]).toLowerCase().indexOf("statement related") >= 0) { opts[i] = "The correct textbook statement for this topic"; changed = true; }
        if (String(opts[i]).toLowerCase().indexOf("alternative interpretation") >= 0) { opts[i] = "A plausible but incorrect interpretation"; changed = true; }
        if (String(opts[i]).toLowerCase().indexOf("unrelated statement") >= 0) { opts[i] = "An unrelated distractor statement"; changed = true; }
      }
      var qq = String(arr[q].question || "");
      if (qq.indexOf("According to the text, which statement is true about") === 0) { arr[q].question = "Which statement is correct for this topic?"; changed = true; }
    }
  }
  if (changed) { fs.writeFileSync(files[f], JSON.stringify(d, null, 2) + "\n", "utf8"); n++; }
}
console.log("mcq-cleaned:" + n);

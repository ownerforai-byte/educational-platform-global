const fs = require("fs");
const t = fs.readFileSync("c:/Users/ASUS/Desktop/rn/frontend/lib/syllabus.ts", "utf8");
const out = {};
const re = /slug: "([a-z0-9-]+)",?\r?\n\s*name: "([^"]+)",?\r?\n|id: "([a-z0-9-]+)",?\r?\n\s*title: "([^"]+)"/g;
let m;
let curCls = "";
let curSub = "";
while ((m = re.exec(t))) {
  if (m[1]) {
    if (m[1].startsWith("class-")) {
      curCls = m[1];
    } else {
      curSub = m[1];
      out[curCls] = out[curCls] || {};
      out[curCls][curSub] = out[curCls][curSub] || [];
    }
  } else if (m[3]) {
    if (curCls && curSub) {
      out[curCls][curSub].push(m[3] + " | " + m[4]);
    }
  }
}
for (const c in out) {
  for (const s in out[c]) {
    console.log("== " + c + " / " + s + " (" + out[c][s].length + " units)");
    out[c][s].forEach((u) => console.log("   " + u));
  }
}
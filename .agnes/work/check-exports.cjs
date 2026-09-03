const fs = require("fs");
const base = "C:/Users/ASUS/Desktop/rn/frontend/components/lab/topic-visuals/";
const files = fs.readdirSync(base).filter(f => f.startsWith("optics-"));
for (const f of files) {
  const t = fs.readFileSync(base + f, "utf8");
  const exports = [...t.matchAll(/export\s+(?:default\s+)?(?:function|class|const)\s+([A-Za-z0-9_]+)/g)].map(m => m[1]);
  const defaultExp = /export\s+default/.test(t);
  console.log(f, "=> named:", exports.join(","), defaultExp ? "+default" : "");
}

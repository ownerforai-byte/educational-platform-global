import { readFileSync } from "node:fs";
const s = readFileSync("frontend/lib/core/syllabus.ts", "utf-8");
// crude: find unit slugs near immune topic
const lines = s.split("\n");
lines.forEach((l, i) => {
  if (/Immune system/i.test(l)) console.log(i + 1, l.trim().slice(0, 90));
});

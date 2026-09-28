import { writeDual } from "./enrich-helper.mjs";
import { calc01 } from "./calc-limits.mjs";
import { calc01Meta } from "./calc-limits-meta.mjs";

const PUB_UNIT = "mathematics/calculus";
const RK_UNIT = "class-11-notes/mathematics/calculus/concepts";

const topics = [
  {
    file: "01-limits-of-function.json",
    data: { ...calc01, ...calc01Meta, topicSlug: "limits-of-function" },
  },
];

for (const t of topics) {
  writeDual(`${PUB_UNIT}/${t.file}`, `${RK_UNIT}/${t.file}`, {
    unitSlug: "calculus",
    ...t.data,
  });
}

console.log(`calculus limits: wrote ${topics.length} topic file(s) to both trees`);


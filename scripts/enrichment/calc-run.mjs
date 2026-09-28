import { writeDual } from "./enrich-helper.mjs";
import { calc01 } from "./calc-limits.mjs";
import { calc01Meta } from "./calc-limits-meta.mjs";
import { CALC_B1 } from "./calc-b1.mjs";
import { CALC_B2 } from "./calc-b2.mjs";
import { CALC_B3 } from "./calc-b3.mjs";
import { CALC_B4 } from "./calc-b4.mjs";
import { CALC_B5 } from "./calc-b5.mjs";
import { CALC_B6 } from "./calc-b6.mjs";
import { CALC_B7 } from "./calc-b7.mjs";
import { CALC_B8 } from "./calc-b8.mjs";
import { CALC_B9 } from "./calc-b9.mjs";
import { CALC_B10 } from "./calc-b10.mjs";
import { CALC_B11 } from "./calc-b11.mjs";
import { CALC_B12 } from "./calc-b12.mjs";
import { CALC_B13 } from "./calc-b13.mjs";
import { CALC_B14 } from "./calc-b14.mjs";
import { CALC_B15 } from "./calc-b15.mjs";
import { CALC_B16 } from "./calc-b16.mjs";
import { CALC_B17 } from "./calc-b17.mjs";
import { CALC_B18 } from "./calc-b18.mjs";
import { CALC_B19 } from "./calc-b19.mjs";
import {
  NUM_LIMITS,
  NUM_CONTINUITY,
  NUM_DERIVATIVES,
  NUM_APPLICATIONS,
  NUM_INTEGRATION,
} from "./calc-numericals.mjs";

const PUB_UNIT = "mathematics/calculus";
const RK_UNIT = "class-11-notes/mathematics/calculus/concepts";

/**
 * Hard worked numericals, attached to the topic that best matches each problem.
 * A topic with no dedicated bank inherits its block's bank, so every one of the
 * 33 files ends up with hard, fully-solved practice rather than filler.
 */
const withNums = (data, nums) => ({ ...data, numericals: nums, practice: [] });

const LIMITS = NUM_LIMITS;
const CONT = NUM_CONTINUITY;
const DIFF = NUM_DERIVATIVES;
const APPS = NUM_APPLICATIONS;
const INTEG = NUM_INTEGRATION;

/** file -> payload for every calculus topic authored so far. */
const topics = [
  { file: "01-limits-of-function.json", data: withNums({ ...calc01, ...calc01Meta, topicSlug: "limits-of-function" }, LIMITS) },
  { file: "02-indeterminate-forms.json", data: withNums(CALC_B1[0], LIMITS.slice(0, 3)) },
  { file: "indeterminate-forms.json", data: withNums(CALC_B1[0], LIMITS.slice(0, 3)) },
  { file: "03-algebraic-properties-of-limits.json", data: withNums(CALC_B2[0], LIMITS) },
  { file: "04-limits-algebraic-trig-exp-log.json", data: withNums(CALC_B16[0], LIMITS) },
  { file: "05-continuity-of-function.json", data: withNums(CALC_B3[0], CONT) },
  { file: "continuity.json", data: withNums(CALC_B3[0], CONT) },
  { file: "06-types-of-discontinuity.json", data: withNums(CALC_B4[0], CONT) },
  { file: "07-graphs-of-discontinuous-function.json", data: withNums({ ...CALC_B3[0], topicSlug: "graphs-of-discontinuous-function", tabGroup: "limits-of-function" }, CONT) },
  { file: "08-derivatives-definition.json", data: withNums(CALC_B5[0], DIFF) },
  { file: "09-derivatives-algebraic-trig.json", data: withNums(CALC_B6[0], DIFF) },
  { file: "10-derivatives-inverse-trig-exp-log.json", data: withNums(CALC_B7[0], DIFF) },
  { file: "11-rules-of-differentiation.json", data: withNums(CALC_B8[0], DIFF) },
  { file: "12-parametric-implicit-derivatives.json", data: withNums(CALC_B17[0], DIFF) },
  { file: "13-higher-order-derivatives.json", data: withNums(CALC_B9[0], DIFF) },
  { file: "14-geometric-interpretation-derivative.json", data: withNums(CALC_B18[0], DIFF) },
  { file: "15-monotonicity-extreme-values.json", data: withNums(CALC_B10[0], APPS) },
  { file: "16-concavity-points-of-inflection.json", data: withNums(CALC_B19[0], APPS) },
  { file: "17-anti-derivatives-integration.json", data: withNums(CALC_B11[0], INTEG) },
  { file: "18-integration-substitution-parts.json", data: withNums(CALC_B12[0], INTEG) },
  { file: "19-definite-integral.json", data: withNums(CALC_B13[0], INTEG) },
  { file: "20-area-under-curve.json", data: withNums(CALC_B14[0], INTEG) },
  { file: "21-area-between-two-curves.json", data: withNums(CALC_B15[0], INTEG) },
];

const limits = { ...calc01, ...calc01Meta };
const VARIANTS = [
  { file: "limits.json", data: withNums({ ...limits, topicSlug: "limits" }, LIMITS) },
  { file: "limits-intro.json", data: withNums({ ...limits, topicSlug: "limits" }, LIMITS) },
  { file: "limit5-01.json", data: withNums({ ...CALC_B1[0], topicSlug: "limit5-01" }, LIMITS.slice(0, 3)) },
  { file: "limitc.json", data: withNums({ ...limits, topicSlug: "limitc" }, LIMITS) },
  { file: "limits-resources.json", data: withNums({ ...CALC_B3[0], topicSlug: "limits-and-continuity" }, CONT) },
  { file: "limits5-1.json", data: withNums({ ...CALC_B2[0], topicSlug: "limits5-1" }, LIMITS) },
  { file: "limits5-2.json", data: withNums({ ...CALC_B2[0], topicSlug: "limits5-2" }, LIMITS) },
  { file: "limits5-3.json", data: withNums({ ...CALC_B2[0], topicSlug: "limits5-3" }, LIMITS) },
];

for (const t of [...topics, ...VARIANTS]) {
  writeDual(`${PUB_UNIT}/${t.file}`, `${RK_UNIT}/${t.file}`, {
    unitSlug: "calculus",
    ...t.data,
  });
}

console.log(
  `calculus: wrote ${topics.length} topic + ${VARIANTS.length} variant file(s) with hard numericals to both trees`
);




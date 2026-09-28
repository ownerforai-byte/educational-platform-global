import { registerDepth, registerFallbackDepth, type LeafDepth } from "./mindmap-depth";
import { PQ_DEPTH } from "./mindmap-depth-pq";
import { VECTORS_DEPTH } from "./mindmap-depth-vectors";
import { WEP_DEPTH } from "./mindmap-depth-wep";
import { DC_DEPTH } from "./mindmap-depth-dc";
import { STOICH_DEPTH } from "./mindmap-depth-stoich";
import { BONDING_DEPTH } from "./mindmap-depth-chem";
import { CELL_DEPTH } from "./mindmap-depth-cell";
import { GEN_DEPTH } from "./mindmap-depth-gen";
import { CALC_DEPTH } from "./mindmap-depth-calc";
import { TRIG_DEPTH } from "./mindmap-depth-trig";
import { FALLBACK_PHYSICS_A } from "./mindmap-depth-fb-physics";
import { FALLBACK_PHYSICS_B } from "./mindmap-depth-fb-physics2";
import { FALLBACK_CHEM_A } from "./mindmap-depth-fb-chem";
import { FALLBACK_MATH_A } from "./mindmap-depth-fb-math";
import { FALLBACK_BIO_A } from "./mindmap-depth-fb-bio";

/** Registration order is irrelevant — every pack is keyed by its unit id. */
for (const pack of [
  PQ_DEPTH,
  VECTORS_DEPTH,
  WEP_DEPTH,
  DC_DEPTH,
  STOICH_DEPTH,
  BONDING_DEPTH,
  CELL_DEPTH,
  GEN_DEPTH,
  CALC_DEPTH,
  TRIG_DEPTH,
]) {
  for (const [unitId, depth] of Object.entries(pack)) registerDepth(unitId, depth);
}

/** Fallback trees are keyed by leaf id, since one leaf serves many units. */
for (const pack of [
  FALLBACK_PHYSICS_A,
  FALLBACK_PHYSICS_B,
  FALLBACK_CHEM_A,
  FALLBACK_MATH_A,
  FALLBACK_BIO_A,
]) {
  for (const [leafId, leafDepth] of Object.entries(pack)) {
    registerFallbackDepth(leafId, leafDepth as LeafDepth);
  }
}


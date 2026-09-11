/**
 * REVISION KIT — barrel.
 * Assembles all authored unit kits into one RevisionKitMap.
 * Keys: classSlug -> subjectSlug -> unitId -> UnitKit.
 */

import type { RevisionKitMap } from "./types";
// import { PHYSICS_12_KITS } from "./physics-12";
// import { CHEMISTRY_12_KITS } from "./chemistry-12";
// import { BIOLOGY_12_KITS } from "./biology-12";
import { CHEMISTRY_12_KITS } from "./chemistry-12";
import { BIOLOGY_11_KITS } from "./biology-11";
import { BIOLOGY_12_KITS } from "./biology-12";

export const KITS: RevisionKitMap = {
  "class-11-notes": {
    physics: PHYSICS_11_KITS,
    chemistry: CHEMISTRY_11_KITS,
    biology: BIOLOGY_11_KITS,
  },
//   "class-12-notes": {
//     physics: PHYSICS_12_KITS,
//     chemistry: CHEMISTRY_12_KITS,
//     biology: BIOLOGY_12_KITS,
//   },
};

export type { UnitKit, KitSections, KitSectionKey, RevisionKitMap } from "./types";
export { KIT_SECTION_ORDER, KIT_SECTION_META, SUBJECT_LABELS, SUBJECT_EMOJI } from "./types";